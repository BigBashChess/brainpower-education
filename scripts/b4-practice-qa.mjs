import {chromium} from 'playwright';
import fs from 'node:fs/promises';

const base='http://127.0.0.1:8000/';
const out='qa-b4-practice';
const problems=[];
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});

async function pageWith(viewport={width:1440,height:900}){
  const page=await browser.newPage({viewport});
  const errors=[];
  page.on('pageerror',e=>errors.push(`pageerror: ${e.message}`));
  page.on('console',m=>{if(m.type()==='error')errors.push(`console: ${m.text()}`)});
  page.on('response',r=>{if(r.status()===404)errors.push(`404: ${r.url()}`)});
  return {page,errors};
}

async function checkPractice(viewport,name,hash='#practice'){
  const {page,errors}=await pageWith(viewport);
  await page.goto(base+hash,{waitUntil:'networkidle'});
  await page.waitForSelector('.bp-practice-page',{timeout:10000});
  await page.waitForSelector('[data-practice-builder]',{timeout:10000});
  await page.waitForTimeout(500);
  const state=await page.evaluate(()=>({
    hero:!!document.querySelector('.bp-practice-hero'),
    builder:!!document.querySelector('[data-practice-builder]'),
    presets:document.querySelectorAll('[data-preset-session]').length,
    bankTabs:document.querySelectorAll('[data-practice-tab]').length,
    bodyWidth:document.body.scrollWidth,
    viewport:innerWidth,
    art:getComputedStyle(document.querySelector('.bp-practice-hero')).getPropertyValue('--practice-art-methods'),
    count:Number(document.querySelector('[data-builder-count]')?.textContent||0)
  }));
  if(!state.hero||!state.builder||state.presets<3||state.bankTabs<2)problems.push(`${name}: practice shell incomplete ${JSON.stringify(state)}`);
  if(state.count<1)problems.push(`${name}: builder has no available questions`);
  if(!state.art.includes('public/art/courses/')||state.art.includes('cloudfront'))problems.push(`${name}: hero art is not local course art (${state.art})`);
  if(state.bodyWidth>state.viewport+2)problems.push(`${name}: horizontal overflow ${state.bodyWidth-state.viewport}px`);
  if(errors.length)problems.push(`${name}: ${[...new Set(errors)].join(' | ')}`);
  await page.screenshot({path:`${out}/${name}.png`,fullPage:name.includes('full')});
  await page.close();
}

await checkPractice({width:1440,height:900},'practice-desktop');
await checkPractice({width:1024,height:768},'practice-tablet');
await checkPractice({width:390,height:844},'practice-mobile');
await checkPractice({width:1440,height:900},'practice-full', '#practice?course=specialist-34');

// Query presets must flow into the new builder.
{
  const {page,errors}=await pageWith({width:1440,height:900});
  await page.goto(base+'#practice?course=specialist-34',{waitUntil:'networkidle'});
  await page.waitForSelector('#bp-session-course');await page.waitForTimeout(400);
  const value=await page.$eval('#bp-session-course',el=>el.value);
  if(value!=='specialist-34')problems.push(`query preset: expected specialist-34, got ${value}`);
  if(errors.length)problems.push(`query preset browser errors: ${errors.join(' | ')}`);
  await page.close();
}

// Bank tab must preserve and expose the existing bank/filter engine.
{
  const {page,errors}=await pageWith({width:1440,height:900});
  await page.goto(base+'#practice',{waitUntil:'networkidle'});await page.waitForSelector('[data-practice-tab="bank"]');await page.waitForTimeout(400);
  await page.click('[data-practice-tab="bank"]');
  await page.fill('#practice-search','integration');await page.waitForTimeout(200);
  const state=await page.evaluate(()=>({panel:document.querySelector('[data-practice-panel="bank"]')?.classList.contains('is-active'),count:Number(document.querySelector('#practice-count')?.textContent||0),cards:document.querySelectorAll('#practice-list .question-card').length}));
  if(!state.panel||state.count<1||state.cards!==state.count)problems.push(`bank tab/filter failed ${JSON.stringify(state)}`);
  await page.screenshot({path:`${out}/practice-bank-filtered.png`,fullPage:false});
  if(errors.length)problems.push(`bank tab browser errors: ${errors.join(' | ')}`);
  await page.close();
}

// Full session flow: timed start, wrong first attempt, one retry, then skip to review.
{
  const {page,errors}=await pageWith({width:1440,height:900});
  await page.goto(base+'#practice',{waitUntil:'networkidle'});await page.waitForSelector('[data-start-session]');await page.waitForTimeout(400);
  await page.selectOption('#bp-session-count','5');
  await page.selectOption('#bp-session-time','10');
  await page.click('[data-start-session]');
  await page.waitForSelector('.bp-session-shell');
  let state=await page.evaluate(()=>({open:document.body.classList.contains('bp-practice-session-open'),timer:document.querySelector('[data-session-timer]')?.textContent,header:document.querySelector('.bp-topbar')?getComputedStyle(document.querySelector('.bp-topbar')).display:null,q:document.querySelector('.bp-session-work .question-card')?.dataset.question,bodyWidth:document.body.scrollWidth,viewport:innerWidth}));
  if(!state.open||!/^10:00|9:5\d$/.test(state.timer||'')||state.header!=='none'||!state.q)problems.push(`session start failed ${JSON.stringify(state)}`);
  if(state.bodyWidth>state.viewport+2)problems.push(`session desktop overflow ${state.bodyWidth-state.viewport}px`);

  const q=await page.evaluate(async()=>{const id=document.querySelector('.bp-session-work .question-card')?.dataset.question;const m=await import('./src/data/questions.js');return m.practiceQuestions.find(x=>x.id===id)});
  if(!q)problems.push('session: could not resolve active question data');
  else {
    if(q.type==='choice'){
      const correctIndex=q.choices.findIndex(x=>x===q.answer);
      const wrongIndex=correctIndex===0?1:0;
      await page.locator('[data-choice]').nth(wrongIndex).click();
      await page.waitForSelector('[data-session-retry]',{timeout:5000});
      await page.click('[data-session-retry]');
      await page.waitForSelector('.bp-session-retry-note');
      await page.locator('[data-choice]').nth(correctIndex).click();
    }else{
      await page.fill('[data-math-input]','__definitely_wrong__');await page.click('.check-answer');
      await page.waitForSelector('[data-session-retry]',{timeout:5000});
      await page.click('[data-session-retry]');
      await page.waitForSelector('.bp-session-retry-note');
      const ans=q.answer??q.answers?.[0];await page.fill('[data-math-input]',String(ans));await page.click('.check-answer');
    }
    await page.waitForSelector('[data-session-next]',{timeout:5000});
    await page.click('[data-session-next]');
  }
  // Skip remaining questions until the review screen appears.
  for(let i=0;i<6;i++){
    if(await page.locator('.bp-session-review').count())break;
    const skip=page.locator('[data-session-skip]');if(await skip.count())await skip.click();
    await page.waitForTimeout(120);
  }
  await page.waitForSelector('.bp-session-review',{timeout:5000});
  const review=await page.evaluate(()=>({title:document.querySelector('.bp-session-review__hero h2')?.textContent,topicRows:document.querySelectorAll('.bp-session-topicrows>div').length,builder:!!document.querySelector('[data-review-builder]')}));
  if(!review.title||review.topicRows<1||!review.builder)problems.push(`session review incomplete ${JSON.stringify(review)}`);
  await page.screenshot({path:`${out}/practice-session-review.png`,fullPage:false});
  if(errors.length)problems.push(`session browser errors: ${[...new Set(errors)].join(' | ')}`);
  await page.close();
}

// Mobile session should remain usable with no horizontal overflow.
{
  const {page,errors}=await pageWith({width:390,height:844});
  await page.goto(base+'#practice',{waitUntil:'networkidle'});await page.waitForSelector('[data-preset-session="quick"]');await page.waitForTimeout(400);await page.click('[data-preset-session="quick"]');await page.waitForSelector('.bp-session-shell');
  const s=await page.evaluate(()=>({width:document.body.scrollWidth,viewport:innerWidth,question:!!document.querySelector('.bp-session-work .question-card'),header:!!document.querySelector('.bp-session-header')}));
  if(!s.question||!s.header||s.width>s.viewport+2)problems.push(`mobile session failed ${JSON.stringify(s)}`);
  await page.screenshot({path:`${out}/practice-mobile-session.png`,fullPage:false});
  if(errors.length)problems.push(`mobile session browser errors: ${[...new Set(errors)].join(' | ')}`);
  await page.close();
}

await browser.close();
const report={generatedAt:new Date().toISOString(),status:problems.length?'FAIL':'PASS',problems};
await fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(problems.length)process.exit(1);
