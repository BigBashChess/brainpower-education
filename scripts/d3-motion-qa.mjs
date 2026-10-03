import {chromium} from 'playwright';
import fs from 'node:fs/promises';

const base='http://127.0.0.1:8000/';
const out='qa-d3-motion';
const problems=[];
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});

async function pageAt(name,width,height,reducedMotion='no-preference'){
  const page=await browser.newPage({viewport:{width,height},reducedMotion});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()===404&&!r.url().includes('favicon'))errors.push(`404:${r.url()}`)});
  return {name,page,errors,width,height};
}
function errors(ctx){if(ctx.errors.length)problems.push(`${ctx.name}: ${[...new Set(ctx.errors)].join(' | ')}`)}
async function overflow(ctx){const x=await ctx.page.evaluate(()=>Math.max(document.body.scrollWidth,document.documentElement.scrollWidth)-innerWidth);if(x>2)problems.push(`${ctx.name}: horizontal overflow ${x}px`)}

let ctx=await pageAt('home-motion',1440,900),page=ctx.page;
await page.goto(`${base}#home`,{waitUntil:'networkidle'});await page.waitForTimeout(450);
let state=await page.evaluate(()=>({
  css:[...document.styleSheets].some(s=>String(s.href||'').includes('motion.css')),
  api:typeof window.BrainpowerMotion?.refresh==='function',
  reveal:document.querySelectorAll('.bp-motion-reveal').length,
  companion:!!document.querySelector('.brainy-companion'),
  route:document.body.dataset.route
}));
if(!state.css||!state.api||state.reveal<1||state.companion||state.route!=='home')problems.push(`home-motion: motion system incomplete ${JSON.stringify(state)}`);
await page.screenshot({path:`${out}/home-motion.png`});await overflow(ctx);errors(ctx);

// A real route change must show the branded loader with canonical Brainy.
await page.evaluate(()=>location.hash='#about');
await page.waitForSelector('.bp-route-loader.is-active',{timeout:2000});
state=await page.evaluate(()=>({src:document.querySelector('.bp-route-loader__brainy')?.getAttribute('src'),hidden:document.querySelector('.bp-route-loader')?.getAttribute('aria-hidden')}));
if(state.src!=='public/brand/brainy.svg'||state.hidden!=='false')problems.push('home-motion: route loader lacks purposeful canonical Brainy');
await page.waitForSelector('.bp-about-page',{timeout:5000});await page.waitForTimeout(700);
if(await page.locator('.bp-route-loader.is-active').count())problems.push('home-motion: loader stayed active after transition window');
await page.close();

ctx=await pageAt('about-brainy',1024,768);page=ctx.page;
await page.goto(`${base}#about`,{waitUntil:'networkidle'});await page.waitForTimeout(500);
state=await page.evaluate(()=>({
  purposeful:document.querySelector('.bp-about-brainy__mascot')?.classList.contains('bp-brainy-purposeful'),
  src:document.querySelector('.bp-about-brainy__mascot img')?.getAttribute('src'),
  visible:[...document.querySelectorAll('.bp-motion-reveal')].some(el=>el.classList.contains('is-visible'))
}));
if(!state.purposeful||state.src!=='public/brand/brainy.svg'||!state.visible)problems.push(`about-brainy: purposeful state missing ${JSON.stringify(state)}`);
await page.screenshot({path:`${out}/about-brainy.png`,fullPage:true});await overflow(ctx);errors(ctx);await page.close();

// Exam Mode must stay still: no scroll-reveal choreography and no decorative mascot injection.
ctx=await pageAt('exam-still',1280,800);page=ctx.page;
await page.goto(`${base}#exam`,{waitUntil:'networkidle'});await page.waitForTimeout(350);
state=await page.evaluate(()=>({route:document.body.dataset.route,reveals:document.querySelectorAll('.bp-motion-reveal:not(.is-visible)').length,brainy:document.querySelectorAll('.bp-exam-page img[src*="brainy"]').length}));
if(state.route!=='exam'||state.reveals>0||state.brainy>0)problems.push(`exam-still: focus-mode motion rule failed ${JSON.stringify(state)}`);
await overflow(ctx);errors(ctx);await page.close();

// Reduced-motion users receive static states.
ctx=await pageAt('reduced-motion',390,844,'reduce');page=ctx.page;
await page.goto(`${base}#about`,{waitUntil:'networkidle'});await page.waitForTimeout(250);
state=await page.evaluate(()=>({
  hidden:[...document.querySelectorAll('.bp-motion-reveal')].filter(el=>getComputedStyle(el).opacity==='0').length,
  animation:getComputedStyle(document.querySelector('.bp-about-brainy__mascot img')).animationName
}));
if(state.hidden||state.animation!=='none')problems.push(`reduced-motion: animated state survived ${JSON.stringify(state)}`);
await page.screenshot({path:`${out}/reduced-motion.png`});await overflow(ctx);errors(ctx);await page.close();

await browser.close();
const report={generatedAt:new Date().toISOString(),status:problems.length?'FAIL':'PASS',problems};
await fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(problems.length)process.exit(1);
