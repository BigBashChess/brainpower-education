import {chromium} from 'playwright';
import fs from 'node:fs/promises';

const base='http://127.0.0.1:8000/';
const out='qa-b3-lessons';
const problems=[];
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});

async function getLessonFixtures(){
  const page=await browser.newPage();
  await page.goto(base,{waitUntil:'networkidle'});
  const rows=await page.evaluate(async()=>{
    const m=await import('./src/data/lessons.js');
    const courses=['methods-12','methods-34','specialist-12','specialist-34','physics-12'];
    return {
      reps:courses.map(course=>m.lessons.find(x=>x.course===course)).filter(Boolean).map(x=>({id:x.id,course:x.course,title:x.title,questions:x.questions})),
      checkpoint:m.lessons.find(x=>x.kind==='Checkpoint')?.id||null
    };
  });
  await page.close();
  return rows;
}

const fixtures=await getLessonFixtures();

async function openLesson(row,{width=1440,height=900,name=`${row.course}-desktop`,fullPage=false}={}){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
  const errors=[];
  page.on('pageerror',e=>errors.push(`pageerror: ${e.message}`));
  page.on('console',msg=>{if(msg.type()==='error')errors.push(`console: ${msg.text()}`)});
  await page.goto(`${base}#lesson/${row.id}`,{waitUntil:'networkidle'});
  await page.waitForSelector('.bp-lesson-page',{timeout:10000});
  await page.waitForSelector('.bp-lesson-ribbon',{timeout:10000});
  await page.waitForTimeout(700);
  const checks=await page.evaluate(()=>({
    h1:document.querySelector('.bp-lesson-hero h1')?.textContent?.trim()||'',
    ribbon:!!document.querySelector('.bp-lesson-ribbon'),
    side:!!document.querySelector('.bp-lesson-side'),
    blocks:document.querySelectorAll('.bp-lesson-reader .lesson-block').length,
    outline:document.querySelectorAll('[data-outline-link]').length,
    questions:document.querySelectorAll('.bp-lesson-question').length,
    hero:getComputedStyle(document.querySelector('.bp-lesson-hero')).getPropertyValue('--lesson-art'),
    bodyWidth:document.body.scrollWidth,
    viewport:innerWidth,
    oldNav:document.querySelectorAll('.lesson-nav-list').length
  }));
  if(!checks.h1)problems.push(`${row.id}: missing lesson h1`);
  if(!checks.ribbon||!checks.side)problems.push(`${row.id}: B3 lesson chrome missing`);
  if(checks.blocks<4)problems.push(`${row.id}: only ${checks.blocks} lesson blocks rendered`);
  if(checks.outline<4)problems.push(`${row.id}: outline has only ${checks.outline} sections`);
  if(checks.questions<1&&row.questions?.length)problems.push(`${row.id}: required questions missing`);
  if(!checks.hero.includes('public/art/courses/')||checks.hero.includes('cloudfront'))problems.push(`${row.id}: lesson hero not using local course art (${checks.hero})`);
  if(checks.bodyWidth>checks.viewport+2)problems.push(`${row.id} ${width}px: horizontal overflow ${checks.bodyWidth-checks.viewport}px`);
  if(checks.oldNav)problems.push(`${row.id}: legacy lesson nav remains`);
  if(errors.length)problems.push(`${row.id}: browser errors: ${errors.join(' | ')}`);
  await page.screenshot({path:`${out}/${name}.png`,fullPage});
  await page.close();
}

for(const row of fixtures.reps)await openLesson(row,{});
await openLesson(fixtures.reps[0],{width:1024,height:768,name:'methods-12-tablet'});
await openLesson(fixtures.reps[3],{width:768,height:1024,name:'specialist-34-tablet-portrait'});
await openLesson(fixtures.reps[0],{width:390,height:844,name:'methods-12-mobile'});
await openLesson(fixtures.reps[4],{width:360,height:800,name:'physics-12-mobile'});
await openLesson(fixtures.reps[0],{width:1440,height:900,name:'methods-12-full',fullPage:true});

// Focus mode: it must remove navigation chrome without changing the lesson route.
{
  const row=fixtures.reps[1],page=await browser.newPage({viewport:{width:1440,height:900}});
  await page.goto(`${base}#lesson/${row.id}`,{waitUntil:'networkidle'});await page.waitForSelector('[data-focus-mode]');await page.waitForTimeout(650);
  await page.click('[data-focus-mode]');
  const state=await page.evaluate(()=>({focus:document.body.classList.contains('bp-lesson-focus'),header:getComputedStyle(document.querySelector('.bp-topbar')).display,side:getComputedStyle(document.querySelector('.bp-lesson-side')).display,route:location.hash}));
  if(!state.focus||state.header!=='none'||state.side!=='none'||!state.route.startsWith('#lesson/'))problems.push(`focus mode failed: ${JSON.stringify(state)}`);
  await page.screenshot({path:`${out}/methods-34-focus-mode.png`,fullPage:false});await page.close();
}

// Mobile lesson map must be explicit rather than hover-only.
{
  const row=fixtures.reps[2],page=await browser.newPage({viewport:{width:390,height:844}});
  await page.goto(`${base}#lesson/${row.id}`,{waitUntil:'networkidle'});await page.waitForSelector('[data-lesson-map]');await page.waitForTimeout(650);await page.click('[data-lesson-map]');
  const open=await page.locator('.bp-lesson-side').evaluate(el=>el.classList.contains('is-open')&&getComputedStyle(el).display!=='none');
  if(!open)problems.push(`${row.id}: mobile lesson map did not open`);
  await page.screenshot({path:`${out}/specialist-12-mobile-map.png`,fullPage:false});await page.close();
}

// Ready-to-complete state: required practice solved, lesson not yet marked complete.
{
  const row=fixtures.reps.find(x=>x.questions?.length)||fixtures.reps[0];
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  await page.goto(base,{waitUntil:'networkidle'});
  await page.evaluate(qs=>localStorage.setItem('brainpower-progress-v3',JSON.stringify({xp:250,completedLessons:[],correctQuestions:qs,attemptedQuestions:Object.fromEntries(qs.map(x=>[x,1])),scores:[],bookmarks:[],streak:3,lastActive:null,activityDays:[],arcade:{derivativeDash:0,bird:0}})),row.questions);
  await page.goto(`${base}#lesson/${row.id}`,{waitUntil:'networkidle'});await page.waitForSelector('.complete-lesson');await page.waitForTimeout(650);
  const state=await page.evaluate(()=>({disabled:document.querySelector('.complete-lesson')?.disabled,text:document.querySelector('.complete-lesson')?.textContent?.trim(),ready:document.querySelector('.lesson-complete')?.classList.contains('is-ready'),count:document.querySelector('[data-mastery-count]')?.textContent}));
  if(state.disabled||!state.ready||!state.text?.startsWith('Complete'))problems.push(`${row.id}: ready mastery gate failed ${JSON.stringify(state)}`);
  await page.screenshot({path:`${out}/lesson-ready-to-complete.png`,fullPage:false});await page.close();
}

await browser.close();
const report={generatedAt:new Date().toISOString(),fixtures,problems,status:problems.length?'FAIL':'PASS'};
await fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(problems.length)process.exit(1);
