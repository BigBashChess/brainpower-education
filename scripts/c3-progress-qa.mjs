import {chromium} from 'playwright';
import fs from 'node:fs/promises';

const base='http://127.0.0.1:8000/';
const out='qa-c3-progress';
const problems=[];
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});

async function seed(page){
  await page.goto(base,{waitUntil:'networkidle'});
  const data=await page.evaluate(async()=>{
    const lm=await import('./src/data/lessons.js');
    const qm=await import('./src/data/questions.js');
    const tm=await import('./src/data/tests.js');
    const lessons=lm.lessons.slice(0,12).map(x=>x.id);
    const qs=qm.practiceQuestions.slice(0,18);
    const correct=qs.slice(0,11).map(x=>x.id);
    const attempted=Object.fromEntries(qs.map((x,i)=>[x.id,i<11?1:2]));
    const test=tm.tests.find(x=>Number(x.marks)>0);
    const now=new Date();
    const activityDays=[];for(let i=0;i<14;i+=2){const d=new Date(now);d.setDate(now.getDate()-i);activityDays.push(d.toISOString().slice(0,10));}
    const progress={xp:830,completedLessons:lessons,correctQuestions:correct,attemptedQuestions:attempted,scores:test?[{testId:test.id,score:Math.round(test.marks*.72),max:test.marks,date:new Date().toISOString()}]:[],bookmarks:[],streak:5,lastActive:new Date().toISOString(),activityDays,arcade:{derivativeDash:4,bird:3}};
    localStorage.setItem('brainpower-progress-v3',JSON.stringify(progress));
    return {testId:test?.id||null};
  });
  return data;
}

async function shot(name,width=1440,height=900,fullPage=false,seeded=true){
  const page=await browser.newPage({viewport:{width,height}});
  const errors=[];page.on('pageerror',e=>errors.push(`pageerror:${e.message}`));page.on('response',r=>{if(r.status()===404)errors.push(`404:${r.url()}`)});
  if(seeded)await seed(page);
  await page.goto(`${base}#progress`,{waitUntil:'networkidle'});await page.waitForTimeout(750);
  const state=await page.evaluate(()=>({
    hero:!!document.querySelector('.bp-progress-hero'),
    pulse:!!document.querySelector('.bp-progress-pulse'),
    pathways:document.querySelectorAll('.bp-orbit-row').length,
    achievements:document.querySelectorAll('.bp-achievement').length,
    reset:!!document.querySelector('#reset-progress'),
    css:[...document.styleSheets].some(s=>String(s.href||'').includes('progress.css')),
    brainy:document.querySelector('.bp-progress-hero__brainy img')?.getAttribute('src')||'',
    bg:getComputedStyle(document.querySelector('.bp-progress-hero')||document.body,'::before').backgroundImage,
    title:document.querySelector('.bp-progress-hero h1')?.textContent?.trim()||'',
    level:document.querySelector('.bp-progress-hero__level')?.textContent||'',
    width:document.body.scrollWidth,viewport:innerWidth
  }));
  if(!state.hero||!state.pulse)problems.push(`${name}: C3 hero/pulse missing`);
  if(!state.css)problems.push(`${name}: Progress stylesheet missing`);
  if(state.pathways!==5)problems.push(`${name}: expected 5 pathway rows, got ${state.pathways}`);
  if(state.achievements<1)problems.push(`${name}: achievements missing`);
  if(!state.reset)problems.push(`${name}: reset control missing`);
  if(!(state.brainy.endsWith('/brainy.svg')||state.brainy==='public/brand/brainy.svg'))problems.push(`${name}: canonical Brainy state missing (${state.brainy})`);
  if(!state.bg.includes('public/art/progress/progress-hero.webp'))problems.push(`${name}: local progress art missing (${state.bg})`);
  if(!state.title.includes('actually improving'))problems.push(`${name}: C3 title missing`);
  if(seeded&&!state.level.includes('LEVEL'))problems.push(`${name}: level state missing`);
  if(state.width>state.viewport+2)problems.push(`${name}: horizontal overflow ${state.width-state.viewport}px`);
  if(errors.length)problems.push(`${name}: ${[...new Set(errors)].join(' | ')}`);
  await page.screenshot({path:`${out}/${name}.png`,fullPage});
  return page;
}

let p=await shot('progress-desktop');await p.close();
p=await shot('progress-tablet',1024,768);await p.close();
p=await shot('progress-mobile',390,844);await p.close();
p=await shot('progress-full',1440,900,true);await p.close();
p=await shot('progress-fresh',1440,900,false,false);await p.close();

// Reset must still use the original application behaviour and clear local progress.
p=await shot('progress-before-reset',900,760,false,true);
p.on('dialog',dialog=>dialog.accept());
await p.click('#reset-progress');await p.waitForTimeout(500);
const cleared=await p.evaluate(()=>{try{const x=JSON.parse(localStorage.getItem('brainpower-progress-v3')||'{}');return Number(x.xp||0)===0&&(x.completedLessons||[]).length===0&&(x.correctQuestions||[]).length===0}catch{return false}});
if(!cleared)problems.push('progress reset no longer clears saved state');
await p.screenshot({path:`${out}/progress-after-reset.png`});await p.close();

await browser.close();
const report={generatedAt:new Date().toISOString(),status:problems.length?'FAIL':'PASS',problems};
await fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));if(problems.length)process.exit(1);
