import {chromium} from 'playwright';
import fs from 'node:fs/promises';

const base='http://127.0.0.1:8000/';
const out='qa-c2-resources-tools';
const problems=[];
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});

async function shot(hash,name,width=1440,height=900,fullPage=false){
  const page=await browser.newPage({viewport:{width,height}});
  const errors=[];
  page.on('pageerror',e=>errors.push(`pageerror:${e.message}`));
  page.on('response',r=>{if(r.status()===404)errors.push(`404:${r.url()}`)});
  await page.goto(`${base}${hash}`,{waitUntil:'networkidle'});
  await page.waitForTimeout(700);
  const state=await page.evaluate(()=>({
    route:location.hash,
    hero:!!document.querySelector('.bp-utility-hero'),
    resources:document.querySelectorAll('.bp-archive-card').length,
    tools:document.querySelectorAll('.bp-lab-card').length,
    css:[...document.styleSheets].some(s=>String(s.href||'').includes('resources-tools.css')),
    width:document.body.scrollWidth,
    viewport:innerWidth,
    brainy:document.querySelector('.bp-utility-hero__brainy img')?.getAttribute('src')||'',
    bg:getComputedStyle(document.querySelector('.bp-utility-hero')||document.body,'::before').backgroundImage
  }));
  if(!state.hero)problems.push(`${hash}: utility hero missing`);
  if(!state.css)problems.push(`${hash}: C2 stylesheet missing`);
  if(state.width>state.viewport+2)problems.push(`${hash} ${width}px: horizontal overflow ${state.width-state.viewport}`);
  if(!state.brainy.includes('brainy-'))problems.push(`${hash}: canonical Brainy state not present`);
  if(!state.bg.includes('public/art/'))problems.push(`${hash}: local hero artwork not applied (${state.bg})`);
  if(hash==='#resources'&&state.resources<1)problems.push('resources: archive cards missing');
  if(hash==='#tools'&&state.tools!==6)problems.push(`tools: expected 6 cards, got ${state.tools}`);
  if(errors.length)problems.push(`${hash}: ${[...new Set(errors)].join(' | ')}`);
  await page.screenshot({path:`${out}/${name}.png`,fullPage});
  return page;
}

let p=await shot('#resources','resources-desktop');
// Filter re-render must keep enhanced card styling.
await p.fill('#vault-search','motion');await p.waitForTimeout(250);
const filtered=await p.evaluate(()=>({cards:document.querySelectorAll('.resource-card').length,enhanced:[...document.querySelectorAll('.resource-card')].every(x=>x.classList.contains('bp-archive-card'))}));
if(filtered.cards<1||!filtered.enhanced)problems.push(`resources filter redraw lost enhancement: ${JSON.stringify(filtered)}`);
await p.screenshot({path:`${out}/resources-filtered.png`});
await p.close();

p=await shot('#resources','resources-mobile',390,844);await p.close();
p=await shot('#resources','resources-full',1440,900,true);await p.close();

p=await shot('#tools','tools-desktop');
await p.fill('#pct-mark','42');await p.fill('#pct-total','50');await p.click('#pct-calc');
let result=await p.locator('#pct-result').textContent();if(result.trim()!=='84.0%')problems.push(`percentage calculator failed: ${result}`);
await p.fill('#target-percent','75');await p.fill('#target-total','80');await p.click('#target-calc');
result=await p.locator('#target-result').textContent();if(!result.includes('60 / 80'))problems.push(`target calculator failed: ${result}`);
await p.fill('#vec-x','3');await p.fill('#vec-y','4');await p.click('#vector-draw');
result=await p.locator('#vector-info').textContent();if(!result.includes('5.000'))problems.push(`vector tool failed: ${result}`);
await p.screenshot({path:`${out}/tools-functional.png`});await p.close();
p=await shot('#tools','tools-mobile',390,844);await p.close();
p=await shot('#tools','tools-full',1440,900,true);await p.close();

await browser.close();
const report={generatedAt:new Date().toISOString(),status:problems.length?'FAIL':'PASS',problems};
await fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(problems.length)process.exit(1);
