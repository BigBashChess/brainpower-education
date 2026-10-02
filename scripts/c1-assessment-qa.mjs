import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const base='http://127.0.0.1:8000/';
const out='qa-c1-assessment';
const problems=[];
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});

async function ctx(viewport={width:1440,height:900}){
  const page=await browser.newPage({viewport});const errors=[];
  page.on('pageerror',e=>errors.push(`pageerror: ${e.message}`));
  page.on('console',m=>{if(m.type()==='error')errors.push(`console: ${m.text()}`)});
  page.on('response',r=>{if(r.status()===404)errors.push(`404: ${r.url()}`)});
  return {page,errors};
}

async function checkCentre(viewport,name,fullPage=false){
  const {page,errors}=await ctx(viewport);await page.goto(base+'#tests',{waitUntil:'networkidle'});await page.waitForSelector('.bp-assessment-page');await page.waitForSelector('[data-test-grid]');await page.waitForTimeout(700);
  const state=await page.evaluate(()=>({hero:!!document.querySelector('.bp-assessment-hero'),mocks:document.querySelectorAll('[data-mock-series] article').length,cards:document.querySelectorAll('[data-assessment-card]').length,tabs:document.querySelectorAll('[data-test-category]').length,nullText:/\bnull\b/i.test(document.querySelector('main')?.innerText||''),width:document.body.scrollWidth,viewport:innerWidth,heroBg:getComputedStyle(document.querySelector('.bp-assessment-hero__art')).backgroundImage}));
  if(!state.hero||state.mocks!==4||state.cards<5||state.tabs<8)problems.push(`${name}: incomplete centre ${JSON.stringify(state)}`);
  if(state.nullText)problems.push(`${name}: visible null metadata`);
  if(state.width>state.viewport+2)problems.push(`${name}: horizontal overflow ${state.width-state.viewport}px`);
  if(!state.heroBg.includes('public/art/assessment/test-centre-hero.webp'))problems.push(`${name}: local Test Centre art missing ${state.heroBg}`);
  if(errors.length)problems.push(`${name}: ${[...new Set(errors)].join(' | ')}`);
  await page.screenshot({path:`${out}/${name}.png`,fullPage});await page.close();
}
await checkCentre({width:1440,height:900},'test-centre-desktop');
await checkCentre({width:1024,height:768},'test-centre-tablet');
await checkCentre({width:390,height:844},'test-centre-mobile');
await checkCentre({width:1440,height:900},'test-centre-full',true);

// Course/scheme filtering and mock tab.
{
  const {page,errors}=await ctx();await page.goto(base+'#tests',{waitUntil:'networkidle'});await page.waitForSelector('[data-test-category="specialist-12"]');await page.waitForTimeout(400);
  await page.click('[data-test-category="specialist-12"]');
  await page.selectOption('[data-test-scheme]','yes');
  const filtered=await page.evaluate(()=>({shown:[...document.querySelectorAll('[data-assessment-card]')].filter(x=>!x.hidden).map(x=>x.dataset.course),count:Number(document.querySelector('[data-test-visible]')?.textContent||0)}));
  if(filtered.count<1||filtered.shown.some(x=>x!=='specialist-12'))problems.push(`centre filtering failed ${JSON.stringify(filtered)}`);
  await page.click('[data-test-category="mock"]');const mock=await page.evaluate(()=>({count:Number(document.querySelector('[data-test-visible]')?.textContent||0),focused:document.querySelector('[data-mock-series]')?.classList.contains('is-filter-focus'),cards:[...document.querySelectorAll('[data-assessment-card]')].filter(x=>!x.hidden).length}));
  if(mock.count!==4||!mock.focused||mock.cards!==0)problems.push(`mock tab failed ${JSON.stringify(mock)}`);
  if(errors.length)problems.push(`filter state: ${[...new Set(errors)].join(' | ')}`);await page.close();
}

// Verified test detail: only known metadata, scheme, no embedded PDF scrollbar viewer.
{
  const {page,errors}=await ctx();await page.goto(base+'#test/kinematics-party-quiz-showdown',{waitUntil:'networkidle'});await page.waitForSelector('.bp-test-detail-page');await page.waitForTimeout(500);
  const s=await page.evaluate(()=>({title:document.querySelector('.bp-test-detail-hero h1')?.textContent,meta:document.querySelector('.bp-test-detail-meta')?.innerText,scheme:!!document.querySelector('.bp-test-scheme a'),iframe:document.querySelectorAll('.bp-test-detail-page iframe').length,exam:document.querySelector('.bp-test-detail-hero a[href^="#exam/"]')?.getAttribute('href'),nullText:/\bnull\b/i.test(document.querySelector('main')?.innerText||''),width:document.body.scrollWidth,viewport:innerWidth}));
  if(!s.title||!s.meta?.includes('25')||!s.scheme||s.iframe||!s.exam||s.nullText)problems.push(`verified test detail failed ${JSON.stringify(s)}`);
  if(s.width>s.viewport+2)problems.push(`verified test detail overflow ${s.width-s.viewport}px`);
  await page.screenshot({path:`${out}/test-detail-verified.png`,fullPage:true});if(errors.length)problems.push(`verified detail errors: ${[...new Set(errors)].join(' | ')}`);await page.close();
}

// Partial metadata must never render null/undefined and must explain absent scheme.
{
  const {page,errors}=await ctx({width:390,height:844});await page.goto(base+'#test/methods-sem2-tf-2026',{waitUntil:'networkidle'});await page.waitForSelector('.bp-test-detail-page');await page.waitForTimeout(400);
  const text=await page.locator('main.bp-test-detail-page').innerText();if(/\b(null|undefined)\b/i.test(text)||!text.includes('not currently published'))problems.push('partial detail exposes unknown metadata or lacks transparent scheme state');
  await page.screenshot({path:`${out}/test-detail-partial-mobile.png`,fullPage:true});if(errors.length)problems.push(`partial detail errors: ${[...new Set(errors)].join(' | ')}`);await page.close();
}

// Exam state: persist a paused writing session, resume, reload, and finish with transparent PDF limitations.
{
  const id='kinematics-party-quiz-showdown',key=`brainpower-exam-session-v1:${id}`;const {page,errors}=await ctx();
  await page.goto(base,{waitUntil:'networkidle'});await page.evaluate(({key})=>localStorage.setItem(key,JSON.stringify({phase:'writing',remaining:300,running:false,endAt:null,started:true,finished:false})),{key});
  await page.goto(base+`#exam/${id}`,{waitUntil:'networkidle'});await page.waitForSelector('[data-exam-shell]');await page.waitForTimeout(350);
  let state=await page.evaluate(()=>({phase:document.querySelector('[data-exam-phase]')?.textContent,clock:document.querySelector('[data-exam-clock]')?.textContent,oldTop:!!document.querySelector('.bp-topbar'),work:!document.querySelector('[data-exam-work]')?.hidden}));
  if(state.phase!=='WRITING'||state.clock!=='5:00'||state.oldTop||!state.work)problems.push(`exam restore failed ${JSON.stringify(state)}`);
  await page.click('[data-exam-toggle]');await page.waitForTimeout(1100);await page.reload({waitUntil:'networkidle'});await page.waitForSelector('[data-exam-clock]');await page.waitForTimeout(250);
  state=await page.evaluate(()=>({phase:document.querySelector('[data-exam-phase]')?.textContent,seconds:document.querySelector('[data-exam-clock]')?.textContent}));
  if(state.phase!=='WRITING'||state.seconds==='5:00')problems.push(`running exam did not persist elapsed time ${JSON.stringify(state)}`);
  await page.click('[data-exam-finish]');await page.waitForSelector('[data-exam-confirm][open]');const confirm=await page.locator('[data-exam-confirm]').innerText();if(!confirm.includes('Unknown')||!confirm.includes('PDF-only'))problems.push('finish confirmation does not disclose unknown unfinished/flagged state');
  await page.click('[data-confirm-finish]');await page.waitForSelector('[data-exam-finished]:not([hidden])');await page.fill('[data-exam-score]','20');await page.click('[data-exam-save-score]');const msg=await page.locator('[data-exam-score-message]').innerText();if(!msg.includes('Saved'))problems.push('manual exam score did not save');
  await page.screenshot({path:`${out}/exam-finished.png`,fullPage:false});if(errors.length)problems.push(`exam state errors: ${[...new Set(errors)].join(' | ')}`);await page.close();
}

// Mobile exam workspace must remain usable and non-overflowing.
{
  const id='differential-calculus-2026',key=`brainpower-exam-session-v1:${id}`;const {page,errors}=await ctx({width:390,height:844});await page.goto(base,{waitUntil:'networkidle'});await page.evaluate(({key})=>localStorage.setItem(key,JSON.stringify({phase:'writing',remaining:600,running:false,endAt:null,started:true,finished:false})),{key});await page.goto(base+`#exam/${id}`,{waitUntil:'networkidle'});await page.waitForSelector('[data-exam-work]');await page.waitForTimeout(300);const s=await page.evaluate(()=>({width:document.body.scrollWidth,viewport:innerWidth,clock:!!document.querySelector('[data-exam-clock]'),paper:!!document.querySelector('.bp-exam-paper iframe')}));if(!s.clock||!s.paper||s.width>s.viewport+2)problems.push(`mobile exam failed ${JSON.stringify(s)}`);await page.screenshot({path:`${out}/exam-mobile.png`});if(errors.length)problems.push(`mobile exam errors: ${[...new Set(errors)].join(' | ')}`);await page.close();
}

await browser.close();const report={generatedAt:new Date().toISOString(),status:problems.length?'FAIL':'PASS',problems};await fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(problems.length)process.exit(1);
