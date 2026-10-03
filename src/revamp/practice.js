import {courses,courseById} from '../data/courses.js';
import {practiceQuestions,questionById} from '../data/questions.js';
import {lessonsForTopic} from '../data/lessons.js';
import {questionCard} from '../components.js';
import {checkAnswer,renderMathString,answerPreview} from '../utils.js';
import {load,awardQuestion,questionActivityLabel} from '../progress/store.js';

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const route=()=>{const raw=(location.hash.slice(1)||'').split('?')[0].split('/').filter(Boolean);return raw[0]||'home'};
const params=()=>new URLSearchParams((location.hash.split('?')[1]||''));
const shuffle=rows=>{const a=[...rows];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const difficultyRank={Core:1,VCAA:2,Advanced:3,Separator:4};

const ART={
  methods:'public/art/courses/methods-34-hero.webp',
  specialist:'public/art/courses/specialist-34-hero.webp',
  physics:'public/art/courses/physics-12-hero.webp'
};

let active=false;
let timer=null;
let session=null;
let cleanups=[];
function addCleanup(fn){cleanups.push(fn)}
function teardown(){
  cleanups.splice(0).forEach(fn=>{try{fn()}catch{}});
  clearInterval(timer);timer=null;session=null;active=false;
  document.body.classList.remove('bp-practice-session-open');
}

function progressStats(){
  const p=load();
  const ids=new Set(practiceQuestions.map(q=>q.id));
  const solved=p.correctQuestions.filter(id=>ids.has(id)).length;
  const attempted=Object.keys(p.attemptedQuestions||{}).filter(id=>ids.has(id)).length;
  const unresolved=practiceQuestions.filter(q=>p.attemptedQuestions?.[q.id]&&!p.correctQuestions.includes(q.id)).length;
  const attempts=practiceQuestions.reduce((n,q)=>n+Number(p.attemptedQuestions?.[q.id]||0),0);
  const pct=practiceQuestions.length?Math.round(solved/practiceQuestions.length*100):0;
  return {p,solved,attempted,unresolved,attempts,pct};
}

function decorateHero(main){
  const head=$('.page-head',main);if(!head)return;
  head.classList.add('bp-practice-hero');
  const urls=Object.fromEntries(Object.entries(ART).map(([k,v])=>[k,new URL(v,document.baseURI).href]));
  head.style.setProperty('--practice-art-methods',`url("${urls.methods}")`);
  head.style.setProperty('--practice-art-specialist',`url("${urls.specialist}")`);
  head.style.setProperty('--practice-art-physics',`url("${urls.physics}")`);
  head.insertAdjacentHTML('afterbegin',`<div class="bp-practice-hero__art" aria-hidden="true"><i></i><i></i><i></i></div><div class="bp-practice-hero__veil" aria-hidden="true"></div>`);
  const copy=$('.page-head-inner>div:first-child',head);
  if(copy){
    const eyebrow=$('.eyebrow',copy);if(eyebrow)eyebrow.textContent='PRACTICE TRAINING ROOM';
    const title=$('h1',copy);if(title)title.textContent='Train exactly what you need.';
    const p=$('p',copy);if(p)p.textContent='Build a targeted set, revisit misses, run a separator sprint or browse the full question bank. Every solved question feeds your real Brainpower progress.';
  }
  const s=progressStats();
  $('.page-head-inner',head)?.insertAdjacentHTML('beforeend',`<div class="bp-practice-hero__status" data-practice-hero-status><small>YOUR BANK</small><strong>${s.solved}<span> / ${practiceQuestions.length}</span></strong><p>questions solved</p><div><i style="width:${s.pct}%"></i></div><b>${s.pct}% bank mastery</b></div>`);
}

function builderMarkup(){
  const q=params(),presetCourse=q.get('course')||'all',presetTopic=q.get('topic')||'all';
  return `<section class="bp-practice-builder" data-practice-builder>
    <div class="bp-practice-builder__head"><div><small>SESSION BUILDER</small><h2>Build a drill, not a random pile.</h2><p>Choose the exact course, topic, level and length. Brainpower pulls a fresh shuffled set from the real bank.</p></div><div class="bp-practice-builder__badge"><span>01</span><b>Configure</b></div></div>
    <div class="bp-practice-builder__grid">
      <label><span>Course</span><select id="bp-session-course"><option value="all">Mixed courses</option>${courses.map(c=>`<option value="${c.id}" ${presetCourse===c.id?'selected':''}>${esc(c.short)}</option>`).join('')}</select></label>
      <label><span>Topic</span><select id="bp-session-topic" data-preset="${esc(presetTopic)}"><option value="all">Mixed topics</option></select></label>
      <label><span>Difficulty</span><select id="bp-session-difficulty"><option value="all">Mixed difficulty</option><option>Core</option><option>VCAA</option><option>Advanced</option><option>Separator</option></select></label>
      <label><span>Questions</span><select id="bp-session-count"><option value="5">5 — quick drill</option><option value="10" selected>10 — standard</option><option value="15">15 — deep set</option><option value="20">20 — endurance</option></select></label>
      <label><span>Source</span><select id="bp-session-source"><option value="all">Whole bank</option><option value="unresolved">Attempted but unsolved</option><option value="unsolved">Not yet solved</option><option value="solved">Solved revision</option></select></label>
      <label><span>Timing</span><select id="bp-session-time"><option value="0">Untimed</option><option value="auto">Auto — 2 min/question</option><option value="10">10 minutes</option><option value="20">20 minutes</option><option value="30">30 minutes</option></select></label>
    </div>
    <div class="bp-practice-builder__availability"><div><span data-builder-count>0</span><small>questions currently match</small></div><div data-builder-message>Adjust the filters, then start when ready.</div><button class="btn primary" type="button" data-start-session>Start practice session →</button></div>
  </section>`;
}

function presetMarkup(){
  const s=progressStats();
  return `<section class="bp-practice-presets"><div class="bp-practice-presets__head"><div><small>SMART STARTS</small><h2>Or start immediately.</h2></div><p>Useful presets based on the question bank you already have.</p></div><div class="bp-practice-presets__grid">
    <button type="button" data-preset-session="quick"><span>05</span><small>QUICK 5</small><strong>Mixed warm-up</strong><p>Five shuffled questions across the bank. Good when you only have ten minutes.</p><i>Start →</i></button>
    <button type="button" data-preset-session="misses" ${s.unresolved?'':'disabled'}><span>${String(Math.min(s.unresolved,99)).padStart(2,'0')}</span><small>REVISIT</small><strong>Clean up your misses</strong><p>${s.unresolved?`${s.unresolved} attempted question${s.unresolved===1?' is':'s are'} still unresolved.`:'No unresolved questions right now.'}</p><i>${s.unresolved?'Start →':'Clear ✓'}</i></button>
    <button type="button" data-preset-session="separator"><span>Σ</span><small>SEPARATOR</small><strong>Hardest available set</strong><p>Up to ten Separator questions, shuffled across the current bank.</p><i>Start →</i></button>
  </div></section>`;
}

function insightsMarkup(){
  const s=progressStats();
  const courseRows=courses.map(c=>{
    const rows=practiceQuestions.filter(q=>q.course===c.id),done=rows.filter(q=>s.p.correctQuestions.includes(q.id)).length,pct=rows.length?Math.round(done/rows.length*100):0;
    return {c,rows:rows.length,done,pct};
  }).filter(x=>x.rows);
  const weakest=[...courseRows].sort((a,b)=>a.pct-b.pct)[0];
  return `<section class="bp-practice-insights"><div class="bp-practice-insights__copy"><small>TRAINING SNAPSHOT</small><h2>${s.solved} solved. ${s.unresolved} still worth revisiting.</h2><p>${weakest?`Your lowest current course-bank coverage is ${esc(weakest.c.short)} at ${weakest.pct}%. This is only question-bank coverage, not a predicted VCE score.`:'Start solving questions and this area will become useful.'}</p><a href="#progress">Open full progress dashboard →</a></div><div class="bp-practice-insights__courses">${courseRows.map(({c,done,rows,pct})=>`<a href="#practice?course=${c.id}" class="bp-practice-coursebar"><div><strong>${esc(c.short)}</strong><span>${done}/${rows}</span></div><div><i style="width:${pct}%"></i></div><small>${pct}% solved</small></a>`).join('')}</div></section>`;
}

function restructure(main){
  const section=$('.practice-section',main);if(!section)return null;
  section.classList.add('bp-practice-stage');
  const summary=$('.practice-summary',section),modes=$('.practice-modes',section),filters=$('.filter-panel',section),resultsHead=$('.practice-results-head',section),list=$('#practice-list',section);
  if(!summary||!modes||!filters||!resultsHead||!list)return null;
  summary.classList.add('bp-practice-kpis');
  modes.classList.add('bp-practice-bankmodes');
  filters.classList.add('bp-practice-bankfilters');
  resultsHead.classList.add('bp-practice-bankhead');
  list.classList.add('bp-practice-bankgrid');

  const hub=document.createElement('div');hub.className='bp-practice-hub';hub.dataset.practiceHub='';
  hub.innerHTML=`<div class="bp-practice-tabs" role="tablist" aria-label="Practice view"><button class="is-active" type="button" id="bp-practice-builder-tab" role="tab" aria-controls="bp-practice-builder-panel" aria-selected="true" data-practice-tab="builder">Build session</button><button type="button" id="bp-practice-bank-tab" role="tab" aria-controls="bp-practice-bank-panel" aria-selected="false" tabindex="-1" data-practice-tab="bank">Browse bank</button></div><div class="bp-practice-tabpanel is-active" id="bp-practice-builder-panel" role="tabpanel" aria-labelledby="bp-practice-builder-tab" data-practice-panel="builder">${builderMarkup()}${presetMarkup()}${insightsMarkup()}</div><div class="bp-practice-tabpanel" id="bp-practice-bank-panel" role="tabpanel" aria-labelledby="bp-practice-bank-tab" data-practice-panel="bank"><div class="bp-practice-bankintro"><div><small>FULL QUESTION BANK</small><h2>Browse, search and solve directly.</h2><p>Use this when you want a specific question rather than a structured session.</p></div><span>${practiceQuestions.length} questions</span></div></div>`;
  section.insertBefore(hub,summary);
  hub.addEventListener('keydown',e=>{const tab=e.target.closest('[data-practice-tab]');if(!tab||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const name=e.key==='Home'?'builder':e.key==='End'?'bank':tab.dataset.practiceTab==='builder'?'bank':'builder';setTab(hub,name);hub.querySelector(`[data-practice-tab="${name}"]`).focus()});
  const builderPanel=$('[data-practice-panel="builder"]',hub),bankPanel=$('[data-practice-panel="bank"]',hub);
  builderPanel.insertBefore(summary,$('.bp-practice-builder',builderPanel));
  bankPanel.append(modes,filters,resultsHead,list);
  const sessionHost=document.createElement('div');sessionHost.className='bp-practice-session';sessionHost.dataset.practiceSession='';sessionHost.hidden=true;section.append(sessionHost);
  return {section,hub,builderPanel,bankPanel,sessionHost,list};
}

function setTab(root,name){
  $$('[data-practice-tab]',root).forEach(b=>{const selected=b.dataset.practiceTab===name;b.classList.toggle('is-active',selected);b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1});
  $$('[data-practice-panel]',root).forEach(p=>p.classList.toggle('is-active',p.dataset.practicePanel===name));
}

function builderRows(root){
  const course=$('#bp-session-course',root)?.value||'all';
  const topic=$('#bp-session-topic',root)?.value||'all';
  const diff=$('#bp-session-difficulty',root)?.value||'all';
  const source=$('#bp-session-source',root)?.value||'all';
  const p=load();
  return practiceQuestions.filter(q=>(course==='all'||q.course===course)&&(topic==='all'||q.topic===topic)&&(diff==='all'||q.difficulty===diff)&&(source==='all'||(source==='unresolved'&&p.attemptedQuestions?.[q.id]&&!p.correctQuestions.includes(q.id))||(source==='unsolved'&&!p.correctQuestions.includes(q.id))||(source==='solved'&&p.correctQuestions.includes(q.id))));
}

function refreshBuilderTopics(root){
  const course=$('#bp-session-course',root),topic=$('#bp-session-topic',root);if(!course||!topic)return;
  const request=topic.dataset.preset||topic.value||'all';
  const rows=practiceQuestions.filter(q=>course.value==='all'||q.course===course.value);
  const topics=[...new Map(rows.map(q=>[q.topic,q.topicLabel||q.topic])).entries()];
  topic.innerHTML='<option value="all">Mixed topics</option>'+topics.map(([id,label])=>`<option value="${esc(id)}">${esc(label)}</option>`).join('');
  if([...topic.options].some(o=>o.value===request))topic.value=request;
  topic.dataset.preset='';
}

function refreshBuilderAvailability(root){
  const rows=builderRows(root),count=$('[data-builder-count]',root),message=$('[data-builder-message]',root),start=$('[data-start-session]',root),requested=Number($('#bp-session-count',root)?.value||10);
  if(count)count.textContent=rows.length;
  if(start)start.disabled=!rows.length;
  if(message)message.textContent=!rows.length?'No questions match this combination. Broaden one filter.':rows.length<requested?`Only ${rows.length} match, so the session will use all of them.`:`${requested} will be shuffled from these ${rows.length}.`;
}

function sessionSettings(root,override={}){
  const rows=override.ids?practiceQuestions.filter(q=>override.ids.includes(q.id)):builderRows(root);
  const count=override.count??Number($('#bp-session-count',root)?.value||10);
  const selected=override.ids?rows:shuffle(rows).slice(0,Math.min(count,rows.length));
  const timeRaw=override.time??$('#bp-session-time',root)?.value??'0';
  const minutes=timeRaw==='auto'?selected.length*2:Number(timeRaw||0);
  return {questions:selected,timeMinutes:minutes,label:override.label||'Custom session'};
}

function courseNameFor(q){return courseById(q.course)?.short||q.course}
function sessionScore(){
  const rows=session?.results||[];
  const firstCorrect=rows.filter(r=>r.correct).length;
  const resolved=rows.filter(r=>r.correct||r.resolved).length;
  return {firstCorrect,resolved,total:session?.questions.length||0};
}

function paintSessionHeader(host){
  if(!session)return;
  const {index,questions}=session,q=questions[index],answered=session.results.some(r=>r.id===q?.id),score=sessionScore();
  const pct=questions.length?Math.round(index/questions.length*100):0;
  const counter=$('[data-session-position]',host);if(counter)counter.textContent=`${Math.min(index+1,questions.length)} / ${questions.length}`;
  const bar=$('[data-session-progress]',host);if(bar)bar.style.width=`${pct}%`;
  const live=$('[data-session-live-score]',host);if(live)live.textContent=`${score.firstCorrect} first-try correct`;
  const skip=$('[data-session-skip]',host);if(skip)skip.disabled=answered;
}

function paintTimer(host){
  const el=$('[data-session-timer]',host);if(!el||!session)return;
  if(!session.timeLimit){el.textContent='Untimed';return}
  const n=Math.max(0,session.remaining),m=Math.floor(n/60),s=n%60;el.textContent=`${m}:${String(s).padStart(2,'0')}`;
  el.classList.toggle('is-low',n<=120);
}

function startTimer(host){
  clearInterval(timer);timer=null;if(!session?.timeLimit)return;
  timer=setInterval(()=>{if(!session||session.finished)return;session.remaining-=1;paintTimer(host);if(session.remaining<=0)finishSession(host,true)},1000);
}

function bindSessionQuestion(host,q){
  const card=$(`[data-question="${CSS.escape(q.id)}"]`,host);if(!card)return;
  const fb=$('.feedback',card),input=$('[data-math-input]',card),preview=$('[data-math-preview]',card);
  const existing=session.results.find(r=>r.id===q.id);
  const updatePreview=()=>{if(preview)preview.innerHTML=answerPreview(input?.value||'')};
  const lock=()=>{$$('.choice',card).forEach(b=>b.disabled=true);if(input)input.disabled=true;$$('[data-math-insert]',card).forEach(b=>b.disabled=true);const check=$('.check-answer',card);if(check)check.disabled=true};
  const showAdvance=(result,ok)=>{
    const last=session.index===session.questions.length-1;
    const retry=!ok&&!result.retried;
    fb.insertAdjacentHTML('beforeend',`<div class="bp-session-feedback-actions">${retry?'<button class="btn ghost small" type="button" data-session-retry>Try once more</button>':''}<button class="btn primary small" type="button" data-session-next>${last?'Finish session':'Next question →'}</button></div>`);
    $('[data-session-retry]',fb)?.addEventListener('click',()=>{result.retried=true;renderSessionQuestion(host,true)});
    $('[data-session-next]',fb)?.addEventListener('click',()=>{if(last)finishSession(host,false);else{session.index+=1;renderSessionQuestion(host)}});
  };
  const submit=value=>{
    if(card.dataset.submitted==='1')return;
    if(!String(value??'').trim()){const status=$('[data-question-status]',card);if(status)status.textContent='Enter an answer before checking.';input?.focus();return}
    card.dataset.submitted='1';
    const ok=checkAnswer(q,value),progress=awardQuestion(q.id,q.xp||10,ok,value);lock();
    const status=$('[data-question-status]',card);if(status)status.textContent=`${questionActivityLabel(q.id,progress)} · Answer saved on this device`;
    let result=session.results.find(r=>r.id===q.id);
    if(!result){result={id:q.id,correct:ok,resolved:ok,retried:false,skipped:false};session.results.push(result)}
    else if(result.retried){result.resolved=ok}
    fb.hidden=false;fb.className=`feedback ${ok?'good':'bad'}`;
    fb.innerHTML=ok?`<strong>✓ Correct.</strong> ${renderMathString(q.solution)} <span class="feedback-xp">${progress.questionActivity[q.id].earnedXp?`+${progress.questionActivity[q.id].earnedXp} XP`:'XP already earned'}</span>`:`<strong>Not quite.</strong> ${renderMathString(q.solution)}`;
    showAdvance(result,ok);paintSessionHeader(host);refreshLiveStats();
  };
  $('.check-answer',card)?.addEventListener('click',()=>submit(input?.value||''));
  input?.addEventListener('keydown',e=>{if(e.key==='Enter')submit(e.currentTarget.value)});
  input?.addEventListener('input',updatePreview);
  $$('[data-math-insert]',card).forEach(btn=>btn.addEventListener('click',()=>{if(!input)return;const ins=btn.dataset.mathInsert||'',start=input.selectionStart??input.value.length,end=input.selectionEnd??start;input.value=input.value.slice(0,start)+ins+input.value.slice(end);const pos=start+ins.length-Number(btn.dataset.back||0);input.focus();input.setSelectionRange(pos,pos);updatePreview()}));
  $$('[data-choice]',card).forEach(btn=>btn.addEventListener('click',()=>{$$('[data-choice]',card).forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');submit(btn.dataset.choice)}));
  updatePreview();
  if(existing?.retried){card.insertAdjacentHTML('afterbegin','<div class="bp-session-retry-note">Second attempt — your first-try score is already recorded.</div>')}
}

function renderSessionQuestion(host,retry=false){
  if(!session)return;const q=session.questions[session.index];if(!q)return;
  const body=$('[data-session-question]',host);if(!body)return;
  body.innerHTML=`<div class="bp-session-questionmeta"><span>${esc(courseNameFor(q))}</span><span>${esc(q.topicLabel||q.topic)}</span><span class="is-${String(q.difficulty).toLowerCase()}">${esc(q.difficulty)}</span></div>${questionCard(q)}`;
  bindSessionQuestion(host,q);paintSessionHeader(host);
  if(!retry)body.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
}

function startSession(host,settings){
  if(!settings.questions.length)return;
  const hub=$('[data-practice-hub]');
  session={questions:settings.questions,index:0,results:[],startedAt:Date.now(),finished:false,timeLimit:settings.timeMinutes*60,remaining:settings.timeMinutes*60,label:settings.label};
  document.body.classList.add('bp-practice-session-open');if(hub)hub.hidden=true;host.hidden=false;
  host.innerHTML=`<div class="bp-session-shell">
    <header class="bp-session-header"><button type="button" data-session-exit>← Exit</button><div class="bp-session-header__progress"><div><span>${esc(settings.label)}</span><b data-session-position>1 / ${settings.questions.length}</b></div><div><i data-session-progress></i></div></div><div class="bp-session-header__score"><small data-session-live-score>0 first-try correct</small><strong data-session-timer>${settings.timeMinutes?`${settings.timeMinutes}:00`:'Untimed'}</strong></div></header>
    <main class="bp-session-work"><div class="bp-session-work__label"><span>QUESTION</span><b data-session-position-big>01</b></div><div data-session-question></div><div class="bp-session-nav"><button class="btn ghost" type="button" data-session-skip>Skip this question</button></div></main>
  </div>`;
  $('[data-session-exit]',host)?.addEventListener('click',()=>{if(session?.results.length&&!confirm('Exit this practice session? Your solved-question progress is saved, but this session summary will be lost.'))return;closeSession(host)});
  $('[data-session-skip]',host)?.addEventListener('click',()=>{const q=session.questions[session.index];if(!session.results.some(r=>r.id===q.id))session.results.push({id:q.id,correct:false,resolved:false,retried:false,skipped:true});if(session.index===session.questions.length-1)finishSession(host,false);else{session.index+=1;renderSessionQuestion(host)}});
  const onKey=e=>{if(e.key==='Escape'&&document.body.classList.contains('bp-practice-session-open'))$('[data-session-exit]',host)?.click()};
  addEventListener('keydown',onKey);addCleanup(()=>removeEventListener('keydown',onKey));
  renderSessionQuestion(host);paintTimer(host);startTimer(host);
}

function closeSession(host){
  clearInterval(timer);timer=null;session=null;document.body.classList.remove('bp-practice-session-open');host.hidden=true;host.innerHTML='';const hub=$('[data-practice-hub]');if(hub)hub.hidden=false;window.scrollTo({top:$('.bp-practice-stage')?.offsetTop||0,behavior:'smooth'});
}

function topicBreakdown(){
  if(!session)return[];
  const map=new Map();
  session.questions.forEach(q=>{const k=q.topicLabel||q.topic,v=map.get(k)||{topic:k,total:0,correct:0};v.total++;const r=session.results.find(x=>x.id===q.id);if(r?.correct)v.correct++;map.set(k,v)});
  return [...map.values()].sort((a,b)=>(a.correct/a.total)-(b.correct/b.total));
}

function finishSession(host,timedOut){
  if(!session||session.finished)return;session.finished=true;clearInterval(timer);timer=null;
  // Any untouched questions count as unanswered for this session, but are not written as attempts.
  session.questions.forEach(q=>{if(!session.results.some(r=>r.id===q.id))session.results.push({id:q.id,correct:false,resolved:false,retried:false,skipped:true})});
  const score=sessionScore(),elapsed=Math.max(1,Math.round((Date.now()-session.startedAt)/1000)),mins=Math.floor(elapsed/60),secs=elapsed%60;
  const missed=session.results.filter(r=>!r.resolved).map(r=>r.id),breakdown=topicBreakdown();
  host.innerHTML=`<div class="bp-session-review"><div class="bp-session-review__hero"><small>${timedOut?'TIME EXPIRED':'SESSION COMPLETE'}</small><h2>${score.firstCorrect}/${score.total} first-try correct</h2><p>${score.resolved===score.firstCorrect?`${score.resolved} questions solved during this session.`:`${score.resolved} of ${score.total} were solved by the end after retries.`} Time used: ${mins}:${String(secs).padStart(2,'0')}.</p><div class="bp-session-review__ring" style="--score:${score.total?Math.round(score.firstCorrect/score.total*100):0}"><strong>${score.total?Math.round(score.firstCorrect/score.total*100):0}%</strong><span>first try</span></div></div>
    <div class="bp-session-review__grid"><section><small>TOPIC BREAKDOWN</small><h3>Where the set was won or lost</h3><div class="bp-session-topicrows">${breakdown.map(x=>{const pct=Math.round(x.correct/x.total*100);return `<div><div><b>${esc(x.topic)}</b><span>${x.correct}/${x.total}</span></div><div><i style="width:${pct}%"></i></div></div>`}).join('')}</div></section><section><small>NEXT ACTION</small><h3>${missed.length?'Turn the misses into the next set.':'Clean set. Increase the difficulty.'}</h3><p>${missed.length?`${missed.length} question${missed.length===1?' remains':'s remain'} unresolved from this session.`:'You solved every question in the set. Try Advanced/Separator difficulty or a longer session.'}</p><div class="bp-session-review__actions">${missed.length?'<button class="btn primary" type="button" data-review-retry>Retry unresolved →</button>':'<button class="btn primary" type="button" data-review-harder>Build a harder set →</button>'}<button class="btn ghost" type="button" data-review-builder>Back to builder</button></div></section></div>
    <section class="bp-session-review__misses"><div><small>REVIEW</small><h3>${missed.length?'Unresolved questions':'No unresolved questions'}</h3></div>${missed.length?`<div>${missed.slice(0,8).map(id=>{const q=questionById(id);return q?`<article><span>${esc(courseNameFor(q))}</span><b>${esc(q.topicLabel||q.topic)}</b><small>${esc(q.difficulty)}</small></article>`:''}).join('')}</div>`:'<p>This session is clear. Your solved progress has already been saved.</p>'}</section>
  </div>`;
  $('[data-review-retry]',host)?.addEventListener('click',()=>startSession(host,sessionSettings(document,{ids:missed,count:missed.length,time:'0',label:'Retry unresolved'})));
  $('[data-review-harder]',host)?.addEventListener('click',()=>{closeSession(host);const root=$('[data-practice-hub]');if(root){$('#bp-session-difficulty',root).value='Advanced';refreshBuilderAvailability(root);root.scrollIntoView({behavior:'smooth'})}});
  $('[data-review-builder]',host)?.addEventListener('click',()=>closeSession(host));
  refreshLiveStats();window.scrollTo({top:$('.bp-practice-stage')?.offsetTop||0,behavior:'smooth'});
}

function refreshLiveStats(){
  const s=progressStats();
  const hero=$('[data-practice-hero-status]');if(hero){$('strong',hero).innerHTML=`${s.solved}<span> / ${practiceQuestions.length}</span>`;$('p',hero).textContent='questions solved';$('div i',hero).style.width=`${s.pct}%`;$('b',hero).textContent=`${s.pct}% bank mastery`}
  const cards=$$('.bp-practice-kpis .practice-kpi');
  const values=[s.solved,s.attempted,s.unresolved,s.attempts];cards.forEach((card,i)=>{const b=$('b',card);if(b)b.textContent=values[i]??b.textContent});
}

function bindHub(parts){
  const {hub,sessionHost,list}=parts;
  $$('[data-practice-tab]',hub).forEach(btn=>btn.addEventListener('click',()=>setTab(hub,btn.dataset.practiceTab)));
  const focus=list.dataset.focus||'';if(focus)setTab(hub,'bank');

  const course=$('#bp-session-course',hub),topic=$('#bp-session-topic',hub);
  refreshBuilderTopics(hub);refreshBuilderAvailability(hub);
  course?.addEventListener('change',()=>{refreshBuilderTopics(hub);refreshBuilderAvailability(hub)});
  [topic,$('#bp-session-difficulty',hub),$('#bp-session-count',hub),$('#bp-session-source',hub),$('#bp-session-time',hub)].filter(Boolean).forEach(el=>el.addEventListener('change',()=>refreshBuilderAvailability(hub)));
  $('[data-start-session]',hub)?.addEventListener('click',()=>startSession(sessionHost,sessionSettings(hub,{label:'Custom session'})));
  $$('[data-preset-session]',hub).forEach(btn=>btn.addEventListener('click',()=>{
    const kind=btn.dataset.presetSession,p=load();let settings;
    if(kind==='quick')settings={questions:shuffle(practiceQuestions).slice(0,5),timeMinutes:0,label:'Quick 5'};
    if(kind==='misses'){const rows=practiceQuestions.filter(q=>p.attemptedQuestions?.[q.id]&&!p.correctQuestions.includes(q.id));settings={questions:shuffle(rows).slice(0,Math.min(10,rows.length)),timeMinutes:0,label:'Revisit misses'}}
    if(kind==='separator'){const rows=practiceQuestions.filter(q=>q.difficulty==='Separator');settings={questions:shuffle(rows).slice(0,Math.min(10,rows.length)),timeMinutes:0,label:'Separator sprint'}}
    if(settings?.questions.length)startSession(sessionHost,settings);
  }));
  list.addEventListener('click',()=>setTimeout(refreshLiveStats,60),true);
}

function enhance(){
  if(route()!=='practice'){if(active)teardown();return}
  const main=$('main');if(!main||main.dataset.revampPractice==='1')return;
  main.dataset.revampPractice='1';main.className='bp-practice-page';active=true;
  decorateHero(main);
  const parts=restructure(main);if(!parts)return;
  bindHub(parts);refreshLiveStats();
}

let queued=false;
function queue(){if(queued)return;queued=true;queueMicrotask(()=>{queued=false;enhance()})}
const app=$('#app');if(app)new MutationObserver(queue).observe(app,{childList:true,subtree:true});
addEventListener('hashchange',()=>setTimeout(enhance,0));
enhance();
