import {chromium} from 'playwright';
import fs from 'node:fs/promises';

const base='http://127.0.0.1:8000/';
const out='qa-b2-courses';
const courses=['methods-12','methods-34','specialist-12','specialist-34','physics-12'];
const problems=[];
await fs.mkdir(out,{recursive:true});

const browser=await chromium.launch({headless:true});

async function waitForCourseReady(page){
  await page.waitForSelector('.bp-course-page',{timeout:10000});
  await page.waitForSelector('.bp-course-hero__art',{timeout:10000});
  await page.waitForFunction(()=>{
    const loader=document.querySelector('.bp-route-loader');
    return !loader||!loader.classList.contains('is-active');
  },{timeout:4000});
  await page.waitForTimeout(120);
}

async function openCourse(id,{width=1440,height=900,fullPage=false,name=`${id}-${width}x${height}`}={}){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
  const errors=[];
  page.on('pageerror',e=>errors.push(`pageerror: ${e.message}`));
  page.on('console',msg=>{if(msg.type()==='error')errors.push(`console: ${msg.text()}`)});
  await page.goto(`${base}#course/${id}`,{waitUntil:'networkidle'});
  await waitForCourseReady(page);
  const checks=await page.evaluate(()=>({
    h1:document.querySelector('.bp-course-hero h1')?.textContent?.trim()||'',
    chapters:document.querySelectorAll('.bp-chapter').length,
    openChapters:document.querySelectorAll('.bp-chapter[open]').length,
    lessons:document.querySelectorAll('.bp-course-lesson').length,
    assessments:document.querySelectorAll('.bp-course-assessment').length,
    resourceSections:document.querySelectorAll('.bp-course-support').length,
    art:getComputedStyle(document.querySelector('.bp-course-hero__art')).backgroundImage,
    bodyWidth:document.body.scrollWidth,
    viewport:innerWidth,
    oldCourseCards:document.querySelectorAll('.course-map-card,.course-status').length
  }));
  if(!checks.h1)problems.push(`${id}: missing course h1`);
  if(checks.chapters<4)problems.push(`${id}: only ${checks.chapters} chapters rendered`);
  if(checks.openChapters<1)problems.push(`${id}: no chapter opens by default`);
  if(checks.lessons<1)problems.push(`${id}: no lesson rows rendered`);
  if(checks.resourceSections!==2)problems.push(`${id}: expected 2 support sections, got ${checks.resourceSections}`);
  if(!checks.art.includes('/public/art/courses/')||checks.art.includes('cloudfront'))problems.push(`${id}: hero is not using local production artwork (${checks.art})`);
  if(checks.bodyWidth>checks.viewport+2)problems.push(`${id} ${width}px: horizontal overflow ${checks.bodyWidth-checks.viewport}px`);
  if(checks.oldCourseCards)problems.push(`${id}: legacy course UI still present`);
  if(errors.length)problems.push(`${id}: browser errors: ${errors.join(' | ')}`);
  await page.screenshot({path:`${out}/${name}.png`,fullPage});
  await page.close();
  return checks;
}

for(const id of courses)await openCourse(id,{name:`${id}-desktop`});
await openCourse('methods-12',{width:1024,height:768,name:'methods-12-tablet'});
await openCourse('specialist-34',{width:768,height:1024,name:'specialist-34-tablet-portrait'});
await openCourse('methods-12',{width:390,height:844,name:'methods-12-mobile'});
await openCourse('physics-12',{width:360,height:800,name:'physics-12-mobile'});
await openCourse('methods-12',{width:1440,height:900,fullPage:true,name:'methods-12-full'});

// Verify the completed-course state with real course lesson ids rather than fake markup.
{
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  await page.goto(base,{waitUntil:'networkidle'});
  const ids=await page.evaluate(async()=>{const m=await import('./src/data/lessons.js');return m.lessons.filter(x=>x.course==='methods-12').map(x=>x.id)});
  await page.evaluate(ids=>localStorage.setItem('brainpower-progress-v3',JSON.stringify({xp:4500,completedLessons:ids,correctQuestions:[],attemptedQuestions:{},scores:[],bookmarks:[],streak:12,lastActive:null,activityDays:[],arcade:{derivativeDash:0,bird:0}})),ids);
  await page.goto(`${base}#course/methods-12`,{waitUntil:'networkidle'});
  await waitForCourseReady(page);
  await page.waitForSelector('.bp-course-mastered');
  const mastered=await page.locator('.bp-course-mastered').isVisible();
  const masteryText=await page.locator('.bp-course-progress-ring strong').textContent();
  if(!mastered||masteryText?.trim()!=='100%')problems.push(`methods-12 complete-state failed (${mastered}, ${masteryText})`);
  await page.screenshot({path:`${out}/methods-12-complete-state.png`,fullPage:false});
  await page.close();
}

await browser.close();
const report={generatedAt:new Date().toISOString(),courses,problems,status:problems.length?'FAIL':'PASS'};
await fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(problems.length)process.exit(1);
