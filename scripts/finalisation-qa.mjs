import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const base='http://127.0.0.1:8000/',out='qa-finalisation',problems=[],notes=[],cssSelectors=new Set();
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const assert=(ok,message)=>{if(!ok)problems.push(message)};
async function ready(page,hash){if(page.url()===base+hash)await page.reload({waitUntil:'domcontentloaded'});else await page.goto(base+hash,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>document.querySelector('main')&&!document.body.dataset.bpRoutePending&&!document.querySelector('.bp-route-loader.is-active')); await page.waitForTimeout(300)}
const context=await browser.newContext({viewport:{width:1280,height:800},reducedMotion:'reduce'}),page=await context.newPage();
await ready(page,'#home');
const data=await page.evaluate(async()=>{const {courses}=await import('./src/data/courses.js'),{lessons}=await import('./src/data/lessons.js'),{tests}=await import('./src/data/tests.js');return {courses,lessons,tests}});
const key='brainpower-progress-v3';
async function seed(progress={}){await page.evaluate(({key,progress})=>localStorage.setItem(key,JSON.stringify(progress)),{key,progress})}
assert(await page.locator('[data-learning-state="fresh"]').count()===1,'Fresh Home must offer a first step, not fabricated history.');
assert(await page.locator('.bp-home-actions a').first().innerText()==='Start Learning →','Fresh hero must say Start Learning.');
const sample=data.lessons.find(l=>l.course==='physics-12'&&l.kind!=='Checkpoint');
await ready(page,`#lesson/${sample.id}`);await ready(page,'#home');
assert(await page.locator('.bp-home-resume').getAttribute('href')===`#lesson/${sample.id}`,'Home must resume the actual most recent unfinished lesson.');
const visited=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
assert(visited.xp===0&&visited.completedLessons.length===0,'Opening a lesson must not award XP or completion.');
await ready(page,'#learn');assert(await page.locator('.bp-learn-hero__actions a').first().getAttribute('href')===`#lesson/${sample.id}`,'Learn and Home must share the same resume target.');
for(const c of data.courses){
 const rows=data.lessons.filter(l=>l.course===c.id),recent=rows[Math.min(2,rows.length-1)];
 await seed({lessonVisits:[{id:recent.id,at:'2026-10-03T01:00:00Z'}],completedLessons:[]});
 await ready(page,`#course/${c.id}`);assert(await page.locator('.bp-course-hero__actions a').first().getAttribute('href')===`#lesson/${recent.id}`,`${c.id}: course must resume a visited lesson before an untouched earlier one.`);
 await seed({completedLessons:rows.map(l=>l.id),lessonCompletedAt:Object.fromEntries(rows.map(l=>[l.id,'2026-10-03T01:00:00Z']))});
 await ready(page,`#course/${c.id}`);assert((await page.locator('.bp-course-hero__actions a').first().innerText()).includes('Review mastered course'),`${c.id}: completed course must offer review.`);assert(await page.locator('.bp-course-mastered img[src="public/brand/brainy.svg"]').count()===1,`${c.id}: completion must use canonical Brainy.`);
}
await seed({completedLessons:data.lessons.map(l=>l.id)});await ready(page,'#home');assert(await page.locator('[data-learning-state="complete"]').count()===1,'All-complete Home must offer review, not restart lesson one.');
await seed({completedLessons:[sample.id]});await ready(page,'#home');const recommended=await page.locator('.bp-home-resume').getAttribute('href');assert(recommended===`#lesson/${data.lessons.find(l=>l.course===sample.course&&l.id!==sample.id).id}`,'Legacy progress should continue in the last completed course.');
notes.push('First visit, real visits without XP, legacy progress, all five course resume/completion states and all-complete Home verified.');
await seed();
const exam=data.tests.find(t=>t.questions>2&&t.minutes>0),examKey=`brainpower-exam-session-v1:${exam.id}`;
await ready(page,`#exam/${exam.id}`);await page.locator('[data-exam-begin]').click();
await page.locator('[data-tracker-answered]').click();await page.locator('[data-tracker-flagged]').click();await page.locator('[data-tracker-notes]').fill('Recheck units in the final line.');
await page.locator('[data-exam-question="1"]').click();await page.keyboard.press('Alt+ArrowRight');assert(await page.locator('[data-tracker-current]').innerText()==='2','Alt+Right must move the manual question tracker.');
await page.keyboard.press('Alt+a');await page.reload({waitUntil:'domcontentloaded'});await page.waitForSelector('[data-exam-return]');
await page.locator('[data-exam-question="1"]').click();assert(await page.locator('[data-tracker-notes]').inputValue()==='Recheck units in the final line.','Paper notes must survive refresh.');
assert(await page.locator('[data-tracker-answered]').getAttribute('aria-pressed')==='true','Answered state must survive refresh.');assert(await page.locator('[data-tracker-flagged]').getAttribute('aria-pressed')==='true','Review flags must survive refresh.');
await page.locator('[data-exam-finish]').click();assert(Number(await page.locator('[data-confirm-unanswered]').innerText())===exam.questions-2,'Finish confirmation must show the actual manual unanswered count.');assert(await page.locator('[data-confirm-flagged]').innerText()==='1','Finish confirmation must show saved review flags.');
await page.getByRole('button',{name:'Keep working'}).click();assert(!await page.locator('[data-exam-confirm]').evaluate(el=>el.open),'Cancel must retain the exam attempt.');
await page.locator('[data-exam-finish]').click();await page.locator('[data-confirm-finish]').click();await page.locator('[data-exam-save-score]').click();assert(!(await page.locator('[data-exam-score-message]').innerText()).includes('Saved:'),'An empty manual score must not silently save zero.');
await page.locator('[data-exam-score]').fill('0');await page.locator('[data-exam-save-score]').click();assert((await page.locator('[data-exam-score-message]').innerText()).includes('Saved: 0/'),'An explicit zero is a valid score.');
notes.push('Exam question navigation, keyboard shortcuts, answered/flagged states, notes, refresh, finish/cancel and explicit manual score entry verified.');
// Collect shared selectors against settled DOM, including inactive state variants.
async function collect(page){const selectors=await page.evaluate(()=>{const sheet=[...document.styleSheets].find(s=>s.href?.includes('/revamp/components.css'));const found=[];const states=/\.(?:dark|active|selected|solved|done|earned|good|bad|open|correct|incorrect|is-active|is-complete|is-current)(?=[\s.:#\[>+~,]|$)/g;function scan(rules){for(const rule of rules){if(rule.selectorText){for(const selector of rule.selectorText.split(',')){const probe=selector.replace(states,'').replace(/::?[\w-]+(?:\([^)]*\))?/g,'').trim();try{if(probe&&document.querySelector(probe))found.push(selector.trim())}catch{found.push(selector.trim())}}}else if(rule.cssRules)scan(rule.cssRules)}}if(sheet)scan(sheet.cssRules);return found});selectors.forEach(s=>cssSelectors.add(s))}
const routes=['#home','#learn',...data.courses.map(c=>`#course/${c.id}`),...data.courses.map(c=>`#lesson/${data.lessons.find(l=>l.course===c.id).id}`),'#practice','#tests',`#test/${exam.id}`,`#exam/${exam.id}`,'#resources','#tools','#progress','#arcade','#about','#search',`#diagnostic/${data.courses[0].id}`,'#admin','#missing','#course/missing','#lesson/missing','#test/missing'];
const accessibility=[];
for(const hash of routes){await ready(page,hash);await collect(page);await fs.writeFile(`${out}/shared-selectors.json`,JSON.stringify([...cssSelectors].sort(),null,2));{
 await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});const results=await page.evaluate(async()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']},rules:{}}));const violations=results.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,html:n.html,summary:n.failureSummary}))}));accessibility.push({hash,violations});for(const v of violations)assert(false,`${hash}: accessibility ${v.id}: ${JSON.stringify(v.nodes.map(n=>n.target))}`);
 }}
await fs.writeFile(`${out}/shared-selectors.json`,JSON.stringify([...cssSelectors].sort(),null,2));await fs.writeFile(`${out}/accessibility.json`,JSON.stringify(accessibility,null,2));
await ready(page,'#progress');await page.screenshot({path:`${out}/progress-final.png`});
// 200% reflow: a 1280px window exposes 640 CSS pixels at full browser zoom.
await page.setViewportSize({width:640,height:450});for(const hash of routes.filter(h=>!['#admin','#missing'].includes(h))){await ready(page,hash);const bounds=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth}));assert(bounds.width<=bounds.viewport+2,`${hash}: 200% reflow overflow ${bounds.width-bounds.viewport}px`)}
notes.push('Keyboard/form/ARIA audit and 200% reflow checked across major routes. Background-art contrast is reviewed visually alongside screenshots.');
// First-visit routes must not fetch games or the admin ZIP vendor on Home/Learn.
for(const hash of ['#home','#learn']){const cold=await browser.newContext(),p=await cold.newPage(),requested=[];p.on('request',r=>requested.push(r.url()));await ready(p,hash);assert(!requested.some(u=>/\/revamp\/arcade\.js|derivative-bank|jszip/.test(u)),`${hash}: unrelated game/ZIP code was fetched.`);await cold.close()}
// Constrained network + CPU: record layout shift and long tasks, verify the actual primary action.
const perfPage=await context.newPage(),cdp=await context.newCDPSession(perfPage);await cdp.send('Network.enable');await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:100000});await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
await perfPage.addInitScript(()=>{window.bpPerf={cls:0,longTasks:[]};new PerformanceObserver(list=>list.getEntries().forEach(e=>{if(!e.hadRecentInput)window.bpPerf.cls+=e.value})).observe({type:'layout-shift',buffered:true});new PerformanceObserver(list=>list.getEntries().forEach(e=>window.bpPerf.longTasks.push(Math.round(e.duration)))).observe({type:'longtask',buffered:true})});
await perfPage.goto(base+'#home',{waitUntil:'domcontentloaded',timeout:60000});await perfPage.locator('.bp-home-actions a').first().waitFor({state:'visible',timeout:30000});await perfPage.waitForTimeout(2000);const perf=await perfPage.evaluate(()=>({...window.bpPerf,paint:performance.getEntriesByType('paint').map(e=>({name:e.name,ms:Math.round(e.startTime)})),resources:performance.getEntriesByType('resource').filter(e=>e.transferSize>0).map(e=>({name:e.name.split('/').at(-1),bytes:e.transferSize}))}));assert(perf.cls<=.1,`Constrained Home CLS ${perf.cls} exceeds .1.`);notes.push(`Constrained Home: CLS ${perf.cls.toFixed(4)}, paint ${JSON.stringify(perf.paint)}, longest task ${Math.max(0,...perf.longTasks)} ms.`);await fs.writeFile(`${out}/performance.json`,JSON.stringify(perf,null,2));await perfPage.screenshot({path:`${out}/home-pre1.png`});await perfPage.screenshot({path:`${out}/home-full.png`,fullPage:true});await perfPage.close();
await page.setViewportSize({width:390,height:844});await page.evaluate(key=>localStorage.removeItem(key),examKey);await ready(page,`#exam/${exam.id}`);await page.locator('[data-exam-begin]').click();await page.locator('[data-tracker-flagged]').click();await page.screenshot({path:`${out}/exam-tracker-mobile.png`});
await browser.close();const report={status:problems.length?'FAIL':'PASS',notes,problems};await fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(problems.length)process.exit(1);
