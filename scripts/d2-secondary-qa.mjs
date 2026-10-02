import {chromium} from 'playwright';
import fs from 'node:fs/promises';

const base='http://127.0.0.1:8000/';
const out='qa-d2-secondary';
const problems=[];
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});

async function makePage(name,width,height){
  const page=await browser.newPage({viewport:{width,height}});
  const errors=[];
  page.on('pageerror',e=>errors.push(`pageerror:${e.message}`));
  page.on('response',r=>{if(r.status()===404)errors.push(`404:${r.url()}`)});
  return {page,errors,name,width,height};
}
function checkErrors(ctx){
  const unique=[...new Set(ctx.errors.filter(e=>!e.includes('favicon')) )];
  if(unique.length)problems.push(`${ctx.name}: ${unique.join(' | ')}`);
}
async function checkOverflow(ctx){
  const v=await ctx.page.evaluate(()=>({body:document.body.scrollWidth,doc:document.documentElement.scrollWidth,viewport:innerWidth}));
  if(Math.max(v.body,v.doc)>v.viewport+2)problems.push(`${ctx.name}: horizontal overflow ${Math.max(v.body,v.doc)-v.viewport}px`);
}

async function openAbout(name,width,height,fullPage=false){
  const ctx=await makePage(name,width,height),{page}=ctx;
  await page.goto(`${base}#about`,{waitUntil:'networkidle'});
  await page.waitForSelector('.bp-about-page',{timeout:10000});
  await page.waitForTimeout(350);
  const state=await page.evaluate(()=>({
    courses:document.querySelectorAll('.bp-about-course').length,
    physics:document.body.innerText.includes('Physics'),
    independence:document.body.innerText.includes('Brainpower is not VCAA.'),
    stale:document.body.innerText.includes('focuses on Mathematical Methods and Specialist Mathematics'),
    css:[...document.styleSheets].some(s=>String(s.href||'').includes('secondary.css')),
    hero:getComputedStyle(document.querySelector('.bp-about-hero')).backgroundImage,
    mascot:document.querySelector('.bp-about-brainy img')?.getAttribute('src'),
    oldPage:!!document.querySelector('.about-hero:not(.bp-about-hero)')
  }));
  if(state.courses!==5)problems.push(`${name}: expected 5 course rows, got ${state.courses}`);
  if(!state.physics)problems.push(`${name}: Physics missing from About`);
  if(!state.independence)problems.push(`${name}: independence disclaimer missing`);
  if(state.stale)problems.push(`${name}: stale pre-Physics About copy survived`);
  if(!state.css)problems.push(`${name}: secondary stylesheet not loaded`);
  if(!state.hero.includes('public/art/about/hero-about.webp'))problems.push(`${name}: local About hero not active (${state.hero})`);
  if(state.mascot!=='public/brand/brainy.svg')problems.push(`${name}: canonical Brainy mascot not used`);
  if(state.oldPage)problems.push(`${name}: legacy About hero survived`);
  await checkOverflow(ctx);checkErrors(ctx);
  await page.screenshot({path:`${out}/${name}.png`,fullPage});
  return ctx;
}

let ctx=await openAbout('about-desktop',1440,900,false);let page=ctx.page;
// Dynamically inserted update-log trigger must open the existing accessible modal.
await page.click('[data-open-update-log]');
await page.waitForSelector('.bp-update-log[role="dialog"]',{timeout:5000});
const modal=await page.evaluate(()=>({open:!!document.querySelector('.bp-update-log'),body:document.body.classList.contains('bp-modal-open'),inert:document.querySelector('.shell')?.hasAttribute('inert')}));
if(!modal.open||!modal.body||!modal.inert)problems.push('about-desktop: update log modal did not enter accessible modal state');
await page.keyboard.press('Escape');await page.waitForTimeout(120);
if(await page.locator('.bp-update-log').count())problems.push('about-desktop: update log did not close with Escape');
await page.close();
ctx=await openAbout('about-tablet',1024,768,false);await ctx.page.close();
ctx=await openAbout('about-mobile',390,844,false);await ctx.page.close();
ctx=await openAbout('about-full',1440,900,true);await ctx.page.close();

async function openSearch(name,width,height){
  const ctx=await makePage(name,width,height),{page}=ctx;
  await page.goto(`${base}#search`,{waitUntil:'networkidle'});
  await page.waitForSelector('#bp-command-input',{timeout:10000});
  await page.waitForTimeout(250);
  const state=await page.evaluate(()=>({
    css:[...document.styleSheets].some(s=>String(s.href||'').includes('secondary.css')),
    groups:document.querySelectorAll('[data-command-group]').length,
    old:!!document.querySelector('.search-page:not(.bp-search-page)'),
    focused:document.activeElement?.id
  }));
  if(!state.css||state.groups!==5||state.old)problems.push(`${name}: command centre structure incorrect`);
  if(state.focused!=='bp-command-input')problems.push(`${name}: search input not focused on entry`);
  await checkOverflow(ctx);checkErrors(ctx);
  return ctx;
}

ctx=await openSearch('search-desktop',1440,900);page=ctx.page;
await page.fill('#bp-command-input','diff calc');await page.waitForTimeout(150);
let text=await page.locator('#bp-command-results').innerText();
if(!/differential|derivative|calculus/i.test(text))problems.push('search-desktop: “diff calc” produced no calculus/differentiation match');
if(!(await page.locator('.bp-command-result').count()))problems.push('search-desktop: no result rows for “diff calc”');
await page.fill('#bp-command-input','spesh vectors');await page.waitForTimeout(150);
text=await page.locator('#bp-command-results').innerText();
if(!/vector/i.test(text)||!/specialist|spesh/i.test(text))problems.push('search-desktop: “spesh vectors” fuzzy search failed');
// Keyboard result selection should visibly select and Enter should navigate.
await page.press('#bp-command-input','ArrowDown');
if(!(await page.locator('.bp-command-result.is-selected').count()))problems.push('search-desktop: ArrowDown did not select a result');
const before=page.url();await page.press('#bp-command-input','Enter');await page.waitForTimeout(700);
if(page.url()===before||page.url().endsWith('#search'))problems.push('search-desktop: Enter did not open selected result');
await page.goto(`${base}#search`,{waitUntil:'networkidle'});await page.waitForSelector('#bp-command-input');
await page.fill('#bp-command-input','formula');await page.click('[data-command-group="Resources"]');await page.waitForTimeout(120);
const types=await page.locator('.bp-command-result__type').allTextContents();
if(types.length&&types.some(t=>t.trim()!=='Resource'))problems.push(`search-desktop: Resources filter leaked other result types (${types.join(',')})`);
await page.screenshot({path:`${out}/search-desktop.png`});
await checkOverflow(ctx);checkErrors(ctx);await page.close();

ctx=await openSearch('search-mobile',390,844);page=ctx.page;
await page.fill('#bp-command-input','kinematics');await page.waitForTimeout(120);if(!(await page.locator('.bp-command-result').count()))problems.push('search-mobile: kinematics returned no results');
await page.screenshot({path:`${out}/search-mobile.png`,fullPage:true});await checkOverflow(ctx);checkErrors(ctx);await page.close();

// Global / shortcut should route to command centre from Home.
ctx=await makePage('search-shortcut',1280,800);page=ctx.page;
await page.goto(`${base}#home`,{waitUntil:'networkidle'});await page.keyboard.press('/');await page.waitForURL(/#search/,{timeout:5000});await page.waitForSelector('#bp-command-input');
if((await page.evaluate(()=>document.activeElement?.id))!=='bp-command-input')problems.push('search-shortcut: / routed to Search but input did not receive focus');
checkErrors(ctx);await page.close();

// Unknown routes should get a deliberate state instead of the old generic 404.
ctx=await makePage('not-found',1024,768);page=ctx.page;
await page.goto(`${base}#definitely-not-a-route`,{waitUntil:'networkidle'});await page.waitForSelector('.bp-state-page',{timeout:10000});
const nf=await page.evaluate(()=>({title:document.querySelector('.bp-state-card h1')?.textContent,search:document.querySelector('.bp-state-actions a[href="#search"]')?.textContent,home:document.querySelector('.bp-state-actions a[href="#home"]')?.textContent,brainy:document.querySelector('.bp-state-card__art img')?.getAttribute('src')}));
if(!nf.title?.includes('escaped the domain')||!nf.search||!nf.home||nf.brainy!=='public/brand/brainy.svg')problems.push('not-found: deliberate 404 state incomplete');
await page.screenshot({path:`${out}/not-found.png`});await checkOverflow(ctx);checkErrors(ctx);await page.close();

await browser.close();
const report={generatedAt:new Date().toISOString(),status:problems.length?'FAIL':'PASS',problems};
await fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(problems.length)process.exit(1);
