import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import {SITE} from '../src/data/site.js';
const base='https://bigbashchess.github.io/brainpower-education/',out='qa-production',problems=[];
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const cdp=await page.context().newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
page.on('pageerror',e=>problems.push(e.message));
page.on('response',r=>{if(r.status()===404&&r.url().startsWith(base))problems.push('404: '+r.url())});
async function open(hash){await page.goto(base+hash,{waitUntil:'domcontentloaded',timeout:60000});await page.waitForFunction(()=>document.querySelector('main')&&!document.body.dataset.bpRoutePending&&!document.querySelector('.bp-route-loader.is-active'),{timeout:30000});await page.waitForTimeout(600)}
let deployed=false;
for(let attempt=0;attempt<30;attempt++){
 await page.goto(base+`?release=${encodeURIComponent(process.env.DEPLOYED_SHA||SITE.version)}&attempt=${attempt}#home`,{waitUntil:'domcontentloaded',timeout:60000});
 try{await page.locator('footer').getByText('v'+SITE.version,{exact:false}).waitFor({timeout:5000});await page.waitForFunction(()=>{const preview=document.querySelector('.bp-home-daily [data-math-preview]');return preview&&getComputedStyle(preview).color==='rgb(23, 54, 74)'},{timeout:5000});deployed=true;break}catch{await page.waitForTimeout(5000)}
}
if(!deployed)throw new Error('Expected release did not become available on Pages.');
await open('#home');
if(await page.locator('[data-learning-state="fresh"]').count()!==1)problems.push('Fresh Home has no truthful first step.');
const before=await page.evaluate(()=>({height:document.documentElement.scrollHeight,width:document.querySelector('main').getBoundingClientRect().width}));
await page.evaluate(()=>window.scrollTo({top:450,behavior:'instant'}));
const steady=await page.evaluate(async()=>{const main=document.querySelector('main'),clock=document.querySelector('[data-mock-countdown]'),initial=clock?.textContent,scroll=scrollY;let moved=false,entrances=0;const start=e=>{if(e.target===main)entrances++};main.addEventListener('animationstart',start);for(let i=0;i<80;i++){await new Promise(r=>setTimeout(r,40));if(getComputedStyle(main).transform!=='none'||Math.abs(scrollY-scroll)>1)moved=true}main.removeEventListener('animationstart',start);return {moved,entrances,ticked:clock?.textContent!==initial}});
if(steady.moved||steady.entrances||!steady.ticked)problems.push('Live countdown moved the page: '+JSON.stringify(steady));
await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:out+'/home-desktop.png'});
await open('#learn');
const first=await page.locator('.bp-learn-hero__actions a').first().getAttribute('href');await open(first);
const lesson=await page.locator('h1').first().innerText();await open('#home');
if(await page.locator('.bp-home-resume').getAttribute('href')!==first)problems.push('Live Home did not resume the visited lesson.');
await open('#progress');
if(await page.locator('.bp-progress-hero__brainy img').getAttribute('src')!=='public/brand/brainy.svg')problems.push('Progress does not render canonical Brainy.');
await page.screenshot({path:out+'/progress.png'});
await open('#arcade');await page.locator('#bp-dash-start').click();await page.waitForSelector('.bp-dash-choice');
if(await page.locator('.bp-dash-choice').count()!==4)problems.push('Derivative Dash is not four-choice.');
await page.locator('#bp-dash-pause').click();await page.screenshot({path:out+'/arcade.png'});
await open('#home');
const daily=page.locator('.question-card').first(),answer=await daily.locator('[data-math-input]').count();
if(answer){await daily.locator('[data-math-input]').fill('999999');if(await daily.locator('[data-math-preview]').evaluate(el=>getComputedStyle(el).color)!=='rgb(23, 54, 74)')problems.push('Live Daily formatted answer is too pale on its white paper.');await daily.locator('.check-answer').click()}else await daily.locator('[data-choice]').first().click();
await page.reload({waitUntil:'domcontentloaded'});await page.waitForSelector('[data-question-retry]');
if(!(await daily.locator('[data-question-status]').innerText()).includes('Saved answer restored'))problems.push('Live Daily answer did not restore.');
await daily.screenshot({path:out+'/daily-saved.png'});
await page.setViewportSize({width:390,height:844});await open('#home');
if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2))problems.push('Live mobile Home overflows.');
await page.screenshot({path:out+'/home-mobile.png'});
const report={status:problems.length?'FAIL':'PASS',sha:process.env.DEPLOYED_SHA,version:SITE.version,lesson,steady,before,url:base+'#home',problems};
await fs.writeFile(out+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await browser.close();if(problems.length)process.exit(1);
