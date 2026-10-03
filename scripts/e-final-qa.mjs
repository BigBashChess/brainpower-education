import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import {SITE,WHATS_NEW} from '../src/data/site.js';

const base='http://127.0.0.1:8000/';
const out='qa-e-final';
const problems=[];
const notes=[];
await fs.mkdir(out,{recursive:true});

const browser=await chromium.launch({headless:true});

async function catalogue(){
  const page=await browser.newPage({viewport:{width:1280,height:800}});
  await page.goto(base,{waitUntil:'domcontentloaded',timeout:20000});
  await page.waitForTimeout(500);
  const data=await page.evaluate(async()=>{
    const [{courses},{lessons},{practiceQuestions},{tests},{resources}]=await Promise.all([
      import('./src/data/courses.js'),import('./src/data/lessons.js'),import('./src/data/questions.js'),import('./src/data/tests.js'),import('./src/data/resources.js')
    ]);
    const courseIds=courses.map(c=>c.id);
    return {
      courses:courseIds,
      reps:courseIds.map(course=>lessons.find(l=>l.course===course)).filter(Boolean).map(l=>({id:l.id,course:l.course,title:l.title})),
      diagnostic:courseIds[0]||null,
      firstTest:tests[0]?.id||null,
      examTest:tests.find(t=>Number(t.minutes)>0)?.id||null,
      questionCount:practiceQuestions.length,
      lessonCount:lessons.length,
      testCount:tests.length,
      resourceCount:resources.length,
      integrity:{
        duplicateCourseIds:courseIds.filter((id,i,a)=>a.indexOf(id)!==i),
        duplicateLessonIds:lessons.map(x=>x.id).filter((id,i,a)=>a.indexOf(id)!==i),
        duplicateQuestionIds:practiceQuestions.map(x=>x.id).filter((id,i,a)=>a.indexOf(id)!==i),
        duplicateTestIds:tests.map(x=>x.id).filter((id,i,a)=>a.indexOf(id)!==i),
        duplicateResourceIds:resources.map(x=>x.id).filter((id,i,a)=>a.indexOf(id)!==i),
        orphanLessons:lessons.filter(x=>!courseIds.includes(x.course)).map(x=>x.id),
        orphanQuestions:practiceQuestions.filter(x=>!courseIds.includes(x.course)&&x.course!=='other').map(x=>x.id),
        orphanTests:tests.filter(x=>!courseIds.includes(x.course)&&x.course!=='other').map(x=>x.id),
        orphanResources:resources.filter(x=>!courseIds.includes(x.course)&&x.course!=='other').map(x=>x.id),
        assetPaths:[...new Set(tests.flatMap(t=>[t.file,t.solutionFile,t.thumbnail]).concat(resources.flatMap(r=>[r.file,r.thumbnail])).filter(Boolean))]
      }
    };
  });
  await page.close();
  return data;
}

const data=await catalogue();
// Release details must be visible to students, and the update log must keep keyboard focus usable.
for(const [name,width,height] of [['desktop',1280,800],['mobile',390,844]]){
  const context=await browser.newContext({viewport:{width,height}});
  const page=await context.newPage();
  try{
    await page.goto(`${base}#home`,{waitUntil:'networkidle',timeout:20000});
    const trigger=page.locator('[data-update-log-open]');
    await trigger.waitFor({state:'visible'});
    const footer=await page.locator('.bp-footer__base').innerText();
    if(!footer.includes(`v${SITE.version}`))problems.push(`Release ${name}: footer version differs from ${SITE.version}.`);
    const widthClosed=await page.locator('main').evaluate(el=>el.getBoundingClientRect().width);
    await trigger.click();
    const dialog=page.getByRole('dialog',{name:'Brainpower update log'});
    await dialog.waitFor({state:'visible'});
    await dialog.evaluate(async el=>{
      await Promise.all([...el.getAnimations(),...el.parentElement.getAnimations()].map(animation=>animation.finished.catch(()=>{})));
    });
    const bounds=await dialog.boundingBox();
    if(!bounds||bounds.y<0||bounds.y+bounds.height>height+1)problems.push(`Release ${name}: settled update log is clipped ${JSON.stringify(bounds)}.`);
    const widthOpen=await page.locator('main').evaluate(el=>el.getBoundingClientRect().width);
    if(Math.abs(widthOpen-widthClosed)>1)problems.push(`Release ${name}: update log changes page width by ${widthOpen-widthClosed}px.`);
    const latest=await dialog.locator('article.latest h3').innerText();
    if(latest!==WHATS_NEW[0].title)problems.push(`Release ${name}: newest update-log entry differs from the current release.`);
    if(!await dialog.getByRole('button',{name:'Close update log'}).evaluate(el=>el===document.activeElement))problems.push(`Release ${name}: dialog does not receive keyboard focus.`);
    await page.screenshot({path:`${out}/release-log-${name}.png`});
    await page.keyboard.press('Escape');
    await dialog.waitFor({state:'detached'});
    if(!await trigger.evaluate(el=>el===document.activeElement))problems.push(`Release ${name}: Escape does not return focus to the update-log trigger.`);
  }catch(error){problems.push(`Release ${name}: ${error.message}`)}
  finally{await context.close()}
}
notes.push(`Release ${SITE.version}: footer/update-log and Escape/focus checked on desktop/mobile.`);
for(const [name,rows] of Object.entries(data.integrity)){
  if(name==='assetPaths')continue;
  if(rows.length)problems.push(`Data integrity: ${name}: ${rows.join(', ')}`);
}
if(data.courses.length!==5)problems.push(`Expected 5 live courses, found ${data.courses.length}`);
if(!data.reps.length)problems.push('No representative lessons found.');
if(!data.firstTest)problems.push('No test available for Test Detail QA.');
if(!data.examTest)problems.push('No timed test available for Exam Mode QA.');

// Verify every locally referenced test/resource file and thumbnail can be served.
{
  const page=await browser.newPage({viewport:{width:1000,height:700}});
  await page.goto(base,{waitUntil:'domcontentloaded',timeout:20000});
  const checks=await page.evaluate(async paths=>{
    const out=[];
    for(const path of paths){
      if(/^https?:/i.test(path)){out.push({path,status:'external'});continue}
      try{const r=await fetch(new URL(path,document.baseURI),{method:'HEAD',cache:'no-store'});out.push({path,status:r.status,ok:r.ok})}
      catch(e){out.push({path,status:'error',error:String(e)})}
    }
    return out;
  },data.integrity.assetPaths);
  for(const row of checks)if(row.status!=='external'&&!row.ok)problems.push(`Broken catalogue asset: ${row.path} (${row.status})`);
  notes.push(`Catalogue asset audit: ${checks.length} file/thumbnail references checked.`);
  await page.close();
}

const remoteGeneration=/cloudfront|runway|replicate|oaidalleapiprodscus|openai.*blob|generated[-.]?asset/i;
const routeResults=[];

async function auditRoute(hash,name,{width=1440,height=900,screenshot=false,fullPage=false,reduced=false,seed=false}={}){
  const context=await browser.newContext({viewport:{width,height},reducedMotion:reduced?'reduce':'no-preference'});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(`pageerror: ${e.message}`));
  page.on('response',r=>{if(r.status()===404&&r.url().startsWith(base))errors.push(`404: ${r.url()}`)});
  await page.goto(base,{waitUntil:'domcontentloaded',timeout:20000});
  if(seed){
    await page.evaluate(()=>localStorage.setItem('brainpower-progress-v3',JSON.stringify({
      xp:1280,completedLessons:[],correctQuestions:[],attemptedQuestions:{},scores:[],bookmarks:[],streak:6,lastActive:new Date().toISOString(),activityDays:[new Date().toISOString().slice(0,10)],arcade:{derivativeDash:18,bird:11}
    })));
  }
  await page.evaluate(h=>{location.hash=h},hash);
  await page.waitForTimeout(reduced?450:1050);
  await page.waitForFunction(()=>document.querySelector('main')||document.querySelector('.bp-exam-page'),null,{timeout:10000}).catch(()=>{});
  const result=await page.evaluate(({expectedHash,reduced})=>{
    const visible=el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0};
    const ids=[...document.querySelectorAll('[id]')].map(x=>x.id).filter(Boolean);
    const dup=[...new Set(ids.filter((id,i)=>ids.indexOf(id)!==i))];
    const broken=[...document.images].filter(img=>img.complete&&img.naturalWidth===0).map(img=>img.getAttribute('src'));
    const generated=[];
    for(const el of document.querySelectorAll('[class*="hero"],[class*="world"],[class*="art"]')){
      const bg=getComputedStyle(el).backgroundImage;
      if(bg&&bg!=='none'&&/url\(/.test(bg))generated.push(bg);
    }
    const headings=[...document.querySelectorAll('h1,h2')].filter(visible).map(x=>x.textContent.trim()).filter(Boolean);
    const main=document.querySelector('main')||document.querySelector('.bp-exam-page')||document.body;
    const html=(main.innerText||'');
    const badMetadata=/\bnull\s+(marks?|questions?|minutes?)\b/i.test(html)||/\bundefined\s+(marks?|questions?|minutes?)\b/i.test(html);
    const controls=[...main.querySelectorAll('input,select,textarea')].filter(visible).filter(x=>x.type!=='hidden');
    const unnamed=controls.filter(el=>{
      if(el.getAttribute('aria-label')||el.getAttribute('aria-labelledby'))return false;
      if(el.labels?.length)return false;
      if(el.closest('label'))return false;
      // Legacy compact utilities still use descriptive placeholders; flag only controls with neither.
      if(el.getAttribute('placeholder'))return false;
      return true;
    }).map(el=>`${el.tagName.toLowerCase()}#${el.id||'(no-id)'}`);
    const revealHidden=[...document.querySelectorAll('.bp-reveal,.bp-page-enter')].filter(el=>getComputedStyle(el).opacity==='0').length;
    return {
      hash:location.hash,
      route:document.body.dataset.route||'',
      headings,
      duplicateIds:dup,
      brokenImages:broken,
      oldBrainy:document.querySelectorAll('.brainy-companion').length,
      width:document.documentElement.scrollWidth,
      viewport:innerWidth,
      remoteBackgrounds:generated.filter(x=>/cloudfront|runway|replicate|oaidalleapiprodscus|openai.*blob|generated[-.]?asset/i.test(x)),
      badMetadata,
      unnamedControls:unnamed,
      reducedHidden:reduced?revealHidden:0,
      loaderVisible:!!document.querySelector('.bp-route-loader.is-active'),
      expectedHash
    };
  },{expectedHash:hash,reduced});
  if(!result.headings.length)problems.push(`${name}: no visible H1/H2 heading`);
  if(result.width>result.viewport+2)problems.push(`${name} ${width}px: horizontal overflow ${result.width-result.viewport}px`);
  if(result.duplicateIds.length)problems.push(`${name}: duplicate DOM ids: ${result.duplicateIds.join(', ')}`);
  if(result.brokenImages.length)problems.push(`${name}: broken images: ${result.brokenImages.join(', ')}`);
  if(result.oldBrainy)problems.push(`${name}: retired floating Brainy companion returned`);
  if(result.remoteBackgrounds.some(x=>remoteGeneration.test(x)))problems.push(`${name}: generation-host artwork dependency: ${result.remoteBackgrounds.join(' | ')}`);
  if(result.badMetadata)problems.push(`${name}: visible null/undefined assessment metadata`);
  if(result.unnamedControls.length)problems.push(`${name}: unnamed form controls: ${result.unnamedControls.join(', ')}`);
  if(reduced&&result.reducedHidden)problems.push(`${name}: reduced-motion mode leaves ${result.reducedHidden} reveal elements hidden`);
  if(result.loaderVisible)problems.push(`${name}: route loader was still active after settling`);
  if(errors.length)problems.push(`${name}: browser errors: ${[...new Set(errors)].join(' | ')}`);
  routeResults.push({name,width,height,...result,errors});
  if(screenshot)await page.screenshot({path:`${out}/${name}.png`,fullPage});
  await context.close();
}

const desktop=[
  ['#home','home-desktop',true],['#learn','learn-desktop',false],
  ...data.courses.map((id,i)=>[`#course/${id}`,`course-${id}`,i===0]),
  ...data.reps.map((l,i)=>[`#lesson/${l.id}`,`lesson-${l.course}`,i===0]),
  [`#diagnostic/${data.diagnostic}`,'diagnostic-desktop',false],
  ['#practice','practice-desktop',true],['#tests','tests-desktop',true],
  [`#test/${data.firstTest}`,'test-detail-desktop',false],[`#exam/${data.examTest}`,'exam-desktop',true],
  ['#resources','resources-desktop',true],['#tools','tools-desktop',false],['#arcade','arcade-desktop',true],
  ['#progress','progress-desktop',true],['#about','about-desktop',true],['#search','search-desktop',true],
  ['#admin','admin-gate-desktop',false],['#this-route-does-not-exist','not-found-desktop',false]
];
for(const [hash,name,shot] of desktop)await auditRoute(hash,name,{screenshot:shot,fullPage:shot});

const mobile=[
  ['#home','home-mobile'],['#learn','learn-mobile'],[`#lesson/${data.reps[0]?.id}`,'lesson-mobile'],['#practice','practice-mobile'],
  ['#tests','tests-mobile'],[`#exam/${data.examTest}`,'exam-mobile'],['#resources','resources-mobile'],['#tools','tools-mobile'],
  ['#arcade','arcade-mobile'],['#progress','progress-mobile'],['#about','about-mobile'],['#search','search-mobile']
];
for(const [hash,name] of mobile)await auditRoute(hash,name,{width:390,height:844,screenshot:['home-mobile','lesson-mobile','exam-mobile','search-mobile'].includes(name)});

for(const [hash,name] of [['#lesson/'+data.reps[0]?.id,'lesson-tablet'],['#exam/'+data.examTest,'exam-tablet'],['#progress','progress-tablet']]){
  await auditRoute(hash,name,{width:834,height:1194});
}

await auditRoute('#about','about-reduced-motion',{width:1280,height:800,reduced:true});
await auditRoute('#progress','progress-seeded',{width:1440,height:900,seed:true});

// Keyboard command-centre sanity: slash focuses search; arrows/Enter can navigate a result.
{
  const context=await browser.newContext({viewport:{width:1280,height:800}});
  const page=await context.newPage();
  await page.goto(`${base}#home`,{waitUntil:'domcontentloaded',timeout:20000});await page.waitForTimeout(900);
  await page.keyboard.press('/');await page.waitForTimeout(850);
  const focused=await page.evaluate(()=>({hash:location.hash,id:document.activeElement?.id||''}));
  if(!focused.hash.startsWith('#search')||focused.id!=='bp-command-input')problems.push(`Search shortcut failed: ${JSON.stringify(focused)}`);
  await page.keyboard.type('kinematics');await page.waitForTimeout(250);
  const count=await page.locator('.bp-command-result').count();
  if(count<1)problems.push('Search command centre returned no result for “kinematics”.');
  else{
    await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter');await page.waitForTimeout(800);
    const navigated=await page.evaluate(()=>location.hash);
    if(navigated.startsWith('#search'))problems.push('Search Enter command did not open the selected result.');
  }
  await context.close();
}

await browser.close();

const report={generatedAt:new Date().toISOString(),status:problems.length?'FAIL':'PASS',counts:{courses:data.courses.length,lessons:data.lessonCount,questions:data.questionCount,tests:data.testCount,resources:data.resourceCount,routesAudited:routeResults.length,assetPaths:data.integrity.assetPaths.length},notes,problems,routes:routeResults};
await fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
await fs.writeFile(`${out}/summary.txt`,`${report.status}\n${JSON.stringify(report.counts,null,2)}\n${problems.length?problems.join('\n'):'0 problems'}\n`);
console.log(JSON.stringify({status:report.status,counts:report.counts,notes,problems},null,2));
if(problems.length)process.exit(1);
