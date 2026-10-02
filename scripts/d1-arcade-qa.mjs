import {chromium} from 'playwright';
import fs from 'node:fs/promises';

const base='http://127.0.0.1:8000/';
const out='qa-d1-arcade';
const problems=[];
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});

const answers={
  'd/dx (x³)':'3*x^2','d/dx (5x⁴)':'20*x^3','d/dx (4x² − 3x)':'8*x-3','d/dx (x⁵ + x)':'5*x^4+1','d/dx (x⁻²)':'-2*x^-3','d/dx (√x)':'1/(2*sqrt(x))','d/dx (sin x)':'cos(x)','d/dx (cos x)':'-sin(x)','d/dx (tan x)':'sec(x)^2','d/dx (eˣ)':'exp(x)','d/dx (e²ˣ)':'2*exp(2*x)','d/dx (ln x)':'1/x','d/dx (ln(3x+1))':'3/(3*x+1)','d/dx ((2x+1)³)':'6*(2*x+1)^2','d/dx (sin(2x))':'2*cos(2*x)','d/dx (cos(x²))':'-2*x*sin(x^2)','d/dx (e^(x²))':'2*x*exp(x^2)','d/dx (x sin x)':'sin(x)+x*cos(x)','d/dx (x²eˣ)':'2*x*exp(x)+x^2*exp(x)','d/dx ((x+1)/(x−1))':'-2/(x-1)^2','d/dx (1/(x²+1))':'-2*x/(x^2+1)^2','d/dx (x ln x)':'ln(x)+1','d/dx (sin²x)':'2*sin(x)*cos(x)','d/dx (√(2x+1))':'1/sqrt(2*x+1)'
};

async function seed(page){
  await page.goto(base,{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>localStorage.setItem('brainpower-progress-v3',JSON.stringify({xp:560,completedLessons:[],correctQuestions:[],attemptedQuestions:{},scores:[],bookmarks:[],streak:2,lastActive:null,activityDays:[],arcade:{derivativeDash:7,bird:4}})));
}

async function openArcade(name,width,height,fullPage=false){
  const page=await browser.newPage({viewport:{width,height}});
  const errors=[];
  page.on('pageerror',e=>errors.push(`pageerror:${e.message}`));
  page.on('response',r=>{if(r.status()===404)errors.push(`404:${r.url()}`)});
  await seed(page);
  await page.goto(`${base}#arcade`,{waitUntil:'networkidle'});
  await page.waitForSelector('.bp-arcade-page__world',{timeout:10000});
  await page.waitForTimeout(450);
  const state=await page.evaluate(()=>({
    hero:!!document.querySelector('.bp-arcade-hero'),
    cabinets:document.querySelectorAll('.bp-cabinet').length,
    machines:document.querySelectorAll('[data-arcade-game]').length,
    canvas:!!document.querySelector('#bp-bird-canvas'),
    flapDisplay:getComputedStyle(document.querySelector('#bp-bird-flap')).display,
    css:[...document.styleSheets].some(s=>String(s.href||'').includes('arcade.css')),
    oldOverhaul:[...document.scripts].some(s=>String(s.src||'').includes('pre1-overhaul.js')),
    bg:getComputedStyle(document.querySelector('.bp-arcade-hero')).backgroundImage,
    width:document.body.scrollWidth,viewport:innerWidth
  }));
  if(!state.hero||state.cabinets!==2||state.machines!==2||!state.canvas)problems.push(`${name}: Arcade structure incomplete`);
  if(!state.css)problems.push(`${name}: Arcade stylesheet missing`);
  if(state.oldOverhaul)problems.push(`${name}: legacy pre1-overhaul.js still loaded`);
  if(!state.bg.includes('public/art/arcade/hero-arcade.webp'))problems.push(`${name}: local Arcade hero not active (${state.bg})`);
  if(state.width>state.viewport+2)problems.push(`${name}: horizontal overflow ${state.width-state.viewport}px`);
  if(width<=700&&state.flapDisplay==='none')problems.push(`${name}: mobile flap control hidden`);
  if(width>700&&state.flapDisplay!=='none')problems.push(`${name}: desktop flap control unexpectedly visible`);
  if(errors.length)problems.push(`${name}: ${[...new Set(errors)].join(' | ')}`);
  await page.screenshot({path:`${out}/${name}.png`,fullPage});
  return {page,errors};
}

let x=await openArcade('arcade-desktop',1440,900,false);let page=x.page;
// Derivative Dash should start, accept a correct answer, increment score and pause/resume.
await page.click('#bp-dash-start');
await page.waitForTimeout(120);
const prompt=(await page.locator('#bp-dash-question').textContent())?.trim();
const answer=answers[prompt];
if(!answer)problems.push(`dash: unmapped prompt ${prompt}`);
else{
  await page.fill('#bp-dash-answer',answer);
  await page.press('#bp-dash-answer','Enter');
  await page.waitForTimeout(100);
  const score=Number(await page.locator('#bp-dash-score').textContent());
  if(score<1)problems.push('dash: correct answer did not increase score');
}
await page.click('#bp-dash-pause');
const paused=await page.locator('#bp-dash-pause').textContent();if(!paused.includes('Resume'))problems.push('dash: pause control did not enter paused state');
await page.click('#bp-dash-pause');
await page.screenshot({path:`${out}/dash-active.png`});
// Sound toggle should be persistent and explicit.
await page.click('.bp-arcade-sound');
const sound=await page.evaluate(()=>localStorage.getItem('bp-arcade-sound'));if(sound!=='off')problems.push(`sound: expected off, got ${sound}`);
// Switch to Bird, start, flap, pause and resume.
await page.click('[data-arcade-select="bird"].bp-cabinet');
await page.waitForTimeout(250);
if(await page.locator('[data-arcade-game="bird"]').isHidden())problems.push('bird: game did not become active');
await page.click('#bp-bird-start');await page.waitForTimeout(180);await page.press('body','Space');await page.waitForTimeout(120);
if(await page.locator('#bp-bird-overlay').isVisible())problems.push('bird: start overlay remained visible');
await page.press('body','p');await page.waitForTimeout(80);
const birdPause=await page.locator('#bp-bird-pause').textContent();if(!birdPause.includes('Resume'))problems.push('bird: keyboard pause did not work');
await page.press('body','p');await page.waitForTimeout(80);
await page.screenshot({path:`${out}/bird-active.png`});
await page.close();

x=await openArcade('arcade-tablet',1024,768,false);await x.page.close();
x=await openArcade('arcade-mobile',390,844,false);page=x.page;
await page.click('[data-arcade-select="bird"].bp-cabinet');await page.waitForTimeout(150);await page.click('#bp-bird-start');await page.waitForTimeout(150);await page.click('#bp-bird-flap');await page.waitForTimeout(100);await page.screenshot({path:`${out}/bird-mobile-active.png`});await page.close();
x=await openArcade('arcade-full',1440,900,true);await x.page.close();

await browser.close();
const report={generatedAt:new Date().toISOString(),status:problems.length?'FAIL':'PASS',problems};
await fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(problems.length)process.exit(1);
