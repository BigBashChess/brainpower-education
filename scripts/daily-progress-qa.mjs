import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const base='http://127.0.0.1:8000/',out='qa-daily',key='brainpower-progress-v3',problems=[],notes=[];
await fs.mkdir(out,{recursive:true});const browser=await chromium.launch({headless:true});
const assert=(ok,msg)=>{if(!ok)problems.push(msg)};
const context=await browser.newContext({timezoneId:'Australia/Sydney',viewport:{width:1280,height:800},reducedMotion:'reduce'}),page=await context.newPage();
page.on('pageerror',e=>problems.push(e.message));
async function ready(hash='#home'){await page.goto(base+hash,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>document.querySelector('main')&&!document.body.dataset.bpRoutePending);await page.waitForTimeout(250)}
await ready();const questions=await page.evaluate(async()=>[...(await import('./src/data/questions.js')).dailyQuestions]);await context.close();
for(let index=0;index<questions.length;index++){
 const q={...questions[index],answer:questions[index].answer??questions[index].answers?.[0]},ctx=await browser.newContext({timezoneId:'Australia/Sydney',viewport:{width:390,height:844},reducedMotion:'reduce'});
 const day=index||questions.length,now=new Date(`2026-01-${String(day).padStart(2,'0')}T02:00:00+11:00`).getTime();
 await ctx.addInitScript(now=>{const NativeDate=Date;window.Date=class extends NativeDate{constructor(...args){super(...(args.length?args:[now]))}static now(){return now}}},now);
 const p=await ctx.newPage();p.on('pageerror',e=>problems.push(e.message));
 const open=async(hash='#home')=>{await p.goto(base+hash,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>document.querySelector('main')&&!document.body.dataset.bpRoutePending);await p.waitForTimeout(200)};
 await open();const card=p.locator(`[data-question="${q.id}"]`);assert(await card.count()===1,`${q.id}: correct daily selection for local day`);
 const progress=()=>p.evaluate(key=>JSON.parse(localStorage.getItem(key)||'{}'),key);
 const answer=async value=>{if(q.type==='choice')await card.locator('[data-choice]').filter({hasText:''}).evaluateAll((buttons,value)=>buttons.find(b=>b.dataset.choice===value)?.click(),value);else{await card.locator('[data-math-input]').fill(value);await card.locator('.check-answer').click()}};
 if(q.type!=='choice'){
  await card.locator('.check-answer').click();assert(!(await progress()).attemptedQuestions?.[q.id],`${q.id}: blank is not an attempt`);
  await card.locator('[data-math-input]').fill('sqrt(3)/2');await open('#learn');await open();assert(await card.locator('[data-math-input]').inputValue()==='sqrt(3)/2',`${q.id}: draft survives route navigation`);
  await p.reload();await card.waitFor();assert(await card.locator('[data-math-input]').inputValue()==='sqrt(3)/2',`${q.id}: draft survives reload`);assert((await progress()).xp===0,`${q.id}: drafts grant no XP`);
 }
 const wrong=q.type==='choice'?q.choices.find(c=>c!==q.answer):'999999';await answer(wrong);assert((await progress()).questionActivity[q.id].correct===false,`${q.id}: incorrect result saved`);
 await p.reload();await card.waitFor();assert(await card.locator('.feedback.bad').count()===1,`${q.id}: incorrect feedback restored`);
 await card.locator('[data-question-retry]').click();await answer(q.answer);const solved=await progress();assert(solved.xp===(q.xp||10),`${q.id}: correct answer earns XP once`);assert(solved.attemptedQuestions[q.id]===2,`${q.id}: attempts counted once`);
 assert((await card.locator('[data-question-status]').innerText()).includes('Solved today'),`${q.id}: recent solved label`);
 await p.reload();await card.waitFor();assert(await card.locator('.feedback.good').count()===1,`${q.id}: correct result restored`);
 if(q.type==='choice')assert(await card.locator('.choice.selected').getAttribute('data-choice')===q.answer,`${q.id}: saved choice restored`);else assert(await card.locator('[data-math-input]').inputValue()===q.answer,`${q.id}: saved answer restored`);
 await card.locator('[data-question-retry]').click();await answer(q.answer);assert((await progress()).xp===solved.xp,`${q.id}: retry cannot duplicate XP`);assert((await card.locator('.feedback').innerText()).includes('XP already earned'),`${q.id}: repeat feedback does not claim extra XP`);
 if(index===0){await p.addScriptTag({path:'node_modules/axe-core/axe.min.js'});const violations=await p.evaluate(async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>v.id));assert(!violations.length,'Saved Daily mobile AA: '+violations.join(','));await p.screenshot({path:out+'/daily-saved-mobile.png',fullPage:true})}
 assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),`${q.id}: mobile reflow`);
 await ctx.close();
}
const bank=await browser.newContext(),bp=await bank.newPage();await bp.goto(base+'#practice');await bp.waitForSelector('[data-practice-tab="bank"]');await bp.locator('[data-practice-tab="bank"]').click();
const choice=await bp.evaluate(async()=> (await import('./src/data/questions.js')).practiceQuestions.find(q=>q.type==='choice'));
let bc=bp.locator(`[data-question="${choice.id}"]`);await bc.locator('[data-choice]').evaluateAll((buttons,value)=>buttons.find(b=>b.dataset.choice===value).click(),choice.answer);
await bp.reload();await bp.waitForSelector('[data-practice-tab="bank"]');await bp.locator('[data-practice-tab="bank"]').click();assert(await bc.locator('.choice.selected').getAttribute('data-choice')===choice.answer,'Bank choice answer restores selected option');
await bc.locator('[data-question-retry]').click();await bc.locator('[data-choice]').evaluateAll((buttons,value)=>buttons.find(b=>b.dataset.choice===value).click(),choice.answer);assert((await bc.locator('.feedback').innerText()).includes('XP already earned'),'Repeated choice gives honest XP feedback');
await bp.locator('[data-practice-tab="builder"]').click();await bp.locator('#bp-session-count').selectOption('5');await bp.locator('[data-start-session]').click();await bp.waitForSelector('.bp-session-work .question-card');const sessionId=await bp.locator('.bp-session-work [data-question]').getAttribute('data-question');await bp.evaluate(async id=>{const {questionById}=await import('./src/data/questions.js'),{awardQuestion}=await import('./src/progress/store.js');const q=questionById(id);awardQuestion(id,q.xp||10,true,q.answer??q.answers?.[0])},sessionId);
// Restart a new session with saved results for every possible question; it must still ask a fresh question.
await bp.evaluate(async()=>{const {practiceQuestions}=await import('./src/data/questions.js'),{load}=await import('./src/progress/store.js');const p=load();for(const q of practiceQuestions)p.questionActivity[q.id]={submitted:true,correct:true,answer:String(q.answer??q.answers?.[0]??''),lastAttemptAt:new Date().toISOString()};localStorage.setItem('brainpower-progress-v3',JSON.stringify(p))});await bp.goto(base+'#learn');await bp.goto(base+'#practice');await bp.waitForSelector('[data-start-session]');await bp.locator('#bp-session-count').selectOption('5');await bp.locator('[data-start-session]').click();await bp.waitForSelector('.bp-session-work .question-card');
const fresh=bp.locator('.bp-session-work .question-card');assert(!await fresh.locator('.feedback').isVisible(),'Fresh session does not restore old feedback');const controls=fresh.locator('[data-math-input],.choice');assert(await controls.first().isEnabled(),'Fresh session controls remain enabled');if(await fresh.locator('[data-math-input]').count())assert(await fresh.locator('[data-math-input]').inputValue()==='','Fresh session answer starts empty');
await bank.close();
const legacy=await browser.newContext(),lp=await legacy.newPage();await lp.goto(base+'#home');await lp.evaluate(({key,id})=>localStorage.setItem(key,JSON.stringify({xp:10,correctQuestions:[id],attemptedQuestions:{[id]:1}})),{key,id:questions[0].id});
const labels=await lp.evaluate(async id=>{const store=await import('./src/progress/store.js');return {label:store.questionActivityLabel(id),today:store.localDay(new Date('2026-01-01T00:00:00')),yesterday:store.questionActivityLabel(id,{correctQuestions:[id],attemptedQuestions:{[id]:1},questionActivity:{[id]:{correct:true,lastAttemptAt:new Date(Date.now()-86400000).toISOString()}}})}},questions[0].id);
assert(labels.label==='Solved previously','Legacy progress must not invent a recent date');assert(labels.yesterday==='Solved yesterday','Yesterday label must match local calendar');
notes.push(`All ${questions.length} rotating Daily problems checked: drafts, missed/correct answers, refresh, navigation, recent dates, retries, single XP award and mobile reflow.`);
await browser.close();const report={status:problems.length?'FAIL':'PASS',notes,problems};await fs.writeFile(out+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(problems.length)process.exit(1);
