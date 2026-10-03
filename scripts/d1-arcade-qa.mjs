import {chromium} from 'playwright';
import fs from 'node:fs/promises';

const base='http://127.0.0.1:8000/';
const out='qa-d1-arcade';
const problems=[];
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});

async function correctIndex(page){
  const id=await page.locator('#bp-dash-question').getAttribute('data-question-id');
  const {DERIVATIVE_BANK}=await import('../src/revamp/derivative-bank.js');
  const tex=DERIVATIVE_BANK.find(q=>q.id===id).choices.find(c=>c.correct).latex;
  return page.locator('.bp-dash-choice').evaluateAll((buttons,tex)=>buttons.findIndex(b=>b.querySelector('annotation[encoding="application/x-tex"]')?.textContent===tex),tex);
}

async function auditBank(page){
  const failures=await page.evaluate(async()=>{
    const {DERIVATIVE_BANK}=await import('./src/revamp/derivative-bank.js');
    const errors=[];
    if(!window.math||!window.katex)return ['Maths renderer/engine unavailable for bank verification'];
    const samples=[.43,.73,1.37,2.19,2.83];
    const equal=(a,b)=>samples.every(x=>Math.abs(a.evaluate({x})-b.evaluate({x}))<1e-8*Math.max(1,Math.abs(a.evaluate({x})),Math.abs(b.evaluate({x}))));
    for(const q of DERIVATIVE_BANK){
      if(q.choices.length!==4||q.choices.filter(c=>c.correct).length!==1)errors.push(`${q.id}: expected four choices and exactly one answer`);
      try{
        window.katex.renderToString(q.latex,{throwOnError:true});
        const derivative=window.math.derivative(q.f,'x').compile();
        const compiled=q.choices.map(c=>window.math.compile(c.value));
        q.choices.forEach((c,i)=>{
          window.katex.renderToString(c.latex,{throwOnError:true});
          if(equal(derivative,compiled[i])!==!!c.correct)errors.push(`${q.id}: incorrect answer key for ${c.value}`);
          for(let j=0;j<i;j++)if(equal(compiled[i],compiled[j]))errors.push(`${q.id}: equivalent answer options`);
        });
      }catch(e){errors.push(`${q.id}: ${e.message}`)}
    }
    return errors;
  });
  problems.push(...failures);
}

async function seed(page){
  await page.goto(base,{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>localStorage.setItem('brainpower-progress-v3',JSON.stringify({xp:560,completedLessons:[],correctQuestions:[],attemptedQuestions:{},scores:[],bookmarks:[],streak:2,lastActive:null,activityDays:[],arcade:{derivativeDash:7,bird:4}})));
}

async function openArcade(name,width,height,fullPage=false){
  const page=await browser.newPage({viewport:{width,height},hasTouch:width<=700});
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
  // Ghost controls must remain legible on Arcade's dark surfaces, even in light theme.
  const contrast=await page.locator('.bp-arcade-page__world .btn.ghost').evaluateAll(buttons=>{
    const rgb=s=>(s.match(/[\d.]+/g)||[]).map(Number);
    const luminance=c=>c.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
    return buttons.filter(b=>!b.disabled).map(b=>{
      const style=getComputedStyle(b),fg=rgb(style.color);
      let bg=[255,255,255];
      const chain=[];for(let el=b;el;el=el.parentElement)chain.unshift(el);
      chain.forEach(el=>{const c=rgb(getComputedStyle(el).backgroundColor),a=c[3]??1;if(c.length>=3)bg=bg.map((v,i)=>c[i]*a+v*(1-a))});
      const f=luminance(fg),s=luminance(bg);
      return {label:b.textContent.trim(),ratio:(Math.max(f,s)+.05)/(Math.min(f,s)+.05)};
    });
  });
  contrast.filter(x=>x.ratio<4.5).forEach(x=>problems.push(`${name}: ${x.label} contrast ${x.ratio.toFixed(2)}:1`));
  if(width<=700&&state.flapDisplay==='none')problems.push(`${name}: mobile flap control hidden`);
  if(width>700&&state.flapDisplay!=='none')problems.push(`${name}: desktop flap control unexpectedly visible`);
  if(errors.length)problems.push(`${name}: ${[...new Set(errors)].join(' | ')}`);
  await page.screenshot({path:`${out}/${name}.png`,fullPage});
  return {page,errors};
}

let x=await openArcade('arcade-desktop',1440,900,false);let page=x.page;
// Audit every correct answer and distractor independently using symbolic differentiation.
await auditBank(page);
await page.clock.install();
await page.clock.pauseAt(await page.evaluate(()=>Date.now()));
await page.click('#bp-dash-start');
if(await page.locator('#bp-dash-start').isVisible())problems.push('dash: start button remains visible during a run');
if(await page.locator('#bp-dash-answer').count())problems.push('dash: typed input remains');
if(await page.locator('.bp-dash-choice:enabled').count()!==4)problems.push('dash: expected four enabled choices');
const correct=await correctIndex(page);
if(correct<0)throw new Error('Correct typeset answer not present');
await page.keyboard.press(String(correct+1));
if(Number(await page.locator('#bp-dash-score').textContent())!==1)problems.push('dash: keyboard answer did not increment score');
await page.keyboard.press(String(correct+1));
if(Number(await page.locator('#bp-dash-score').textContent())!==1)problems.push('dash: repeated input double-scored a question');
if(await page.locator('.bp-dash-choice:enabled').count())problems.push('dash: answered choices remain enabled');
await page.clock.runFor(500);
const right=await correctIndex(page),wrong=(right+1)%4;
const timeBefore=Number(await page.locator('#bp-dash-time').textContent());
await page.locator('.bp-dash-choice').nth(wrong).click();
if(Number(await page.locator('#bp-dash-time').textContent())!==timeBefore-2)problems.push('dash: wrong answer did not cost exactly two seconds');
if(await page.locator('.bp-dash-choice.is-correct').count()!==1||await page.locator('.bp-dash-choice.is-wrong').count()!==1)problems.push('dash: incorrect feedback did not show the correct choice');
if(!await page.locator('#bp-dash-message').textContent())problems.push('dash: mistake explanation missing');
await page.click('#bp-dash-pause');
const paused=await page.locator('#bp-dash-pause').textContent();if(!paused.includes('Resume'))problems.push('dash: pause control did not enter paused state');
if(await page.locator('#bp-dash-start').isVisible())problems.push('dash: start button remains visible while paused');
const questionId=await page.locator('#bp-dash-question').getAttribute('data-question-id');
const frozen=await page.locator('#bp-dash-time').textContent();
await page.clock.runFor(2000);
await page.keyboard.press('1');
if(await page.locator('#bp-dash-time').textContent()!==frozen||await page.locator('#bp-dash-question').getAttribute('data-question-id')!==questionId)problems.push('dash: timer/question changed while paused');
await page.keyboard.press('p');
await page.clock.runFor(500);
if(await page.locator('.bp-dash-choice:enabled').count()!==4)problems.push('dash: resume did not unlock the next question');
await page.screenshot({path:`${out}/dash-active.png`});
// Verify combo progression, finish, saved best and restarting with a clean score.
for(let i=0;i<4;i++){
  await page.locator('.bp-dash-choice').nth(await correctIndex(page)).click();
  await page.clock.runFor(500);
}
if(Number(await page.locator('#bp-dash-score').textContent())!==6)problems.push('dash: combo scoring failed');
await page.clock.runFor(61000);
if(!await page.locator('#bp-dash-start').isVisible()||await page.locator('.bp-dash-choice:enabled').count())problems.push('dash: finish state failed');
const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('brainpower-progress-v3')));
if(saved.arcade.derivativeDash!==7||saved.xp!==560)problems.push('dash: personal best/academic XP changed incorrectly');
await page.click('#bp-dash-start');
if(Number(await page.locator('#bp-dash-score').textContent())!==0||await page.locator('.bp-dash-choice:enabled').count()!==4)problems.push('dash: restart failed');
await page.clock.resume();
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
if(await page.locator('#bp-bird-start').isVisible())problems.push('bird: restart button remains visible while paused');
await page.press('body','p');await page.waitForTimeout(80);
await page.screenshot({path:`${out}/bird-active.png`});
await page.close();

x=await openArcade('arcade-tablet',1024,768,false);await x.page.close();
x=await openArcade('arcade-mobile',390,844,false);page=x.page;
await page.click('#bp-dash-start');
const mobileAnswer=await correctIndex(page);
await page.locator('.bp-dash-choice').nth(mobileAnswer).tap();
if(Number(await page.locator('#bp-dash-score').textContent())!==1)problems.push('dash: mobile tap did not increment score');
await page.waitForTimeout(500);
await page.screenshot({path:`${out}/dash-mobile-active.png`});
const touchSizes=await page.locator('.bp-dash-choice').evaluateAll(buttons=>buttons.map(b=>({width:b.getBoundingClientRect().width,height:b.getBoundingClientRect().height})));
if(touchSizes.some(s=>s.width<44||s.height<44))problems.push('dash: choice touch targets too small');
await page.click('[data-arcade-select="bird"].bp-cabinet');
const dashTime=await page.locator('#bp-dash-time').textContent();
await page.click('[data-arcade-select="bird"].bp-cabinet');await page.waitForTimeout(1100);
if(await page.locator('#bp-dash-time').textContent()!==dashTime)problems.push('dash: selecting Bird twice resumed the hidden run');
await page.click('[data-arcade-select="bird"].bp-cabinet');await page.waitForTimeout(150);await page.click('#bp-bird-start');await page.waitForTimeout(150);await page.click('#bp-bird-flap');await page.waitForTimeout(100);await page.screenshot({path:`${out}/bird-mobile-active.png`});await page.close();
x=await openArcade('arcade-full',1440,900,true);await x.page.close();

await browser.close();
const report={generatedAt:new Date().toISOString(),status:problems.length?'FAIL':'PASS',problems};
await fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(problems.length)process.exit(1);
