import {tests,testById} from '../data/tests.js';
import {courses,courseById} from '../data/courses.js';
import {mockExams2026} from '../data/mock-exams.js';
import {load,addScore,isBookmarked,toggleBookmark} from '../progress/store.js';

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const routeParts=()=>((location.hash.slice(1)||'home').split('?')[0]).split('/').filter(Boolean);
const fmtMinutes=n=>!Number.isFinite(Number(n))||Number(n)<=0?'':Number(n)%60===0?`${Number(n)/60} hr${Number(n)===60?'':'s'}`:`${Number(n)} min`;
const hasValue=n=>Number.isFinite(Number(n))&&Number(n)>0;
const hasScheme=t=>Boolean(t.solutionFile);
const examCompatible=t=>hasValue(t.minutes)&&Boolean(t.file);
const bestScore=(t,p=load())=>{const rows=p.scores.filter(x=>x.testId===t.id&&x.max>0);return rows.length?Math.max(...rows.map(x=>Math.round(x.score/x.max*100))):null};
const schemeCount=()=>tests.filter(hasScheme).length;
const safeUrl=v=>esc(v||'#');
const subjectIcon=t=>t.course?.startsWith('specialist')?'Σ':t.course?.startsWith('physics')?'λ':t.course?.startsWith('methods')?'ƒ':'◆';

const categoryDefs=[
  ['all','All assessments'],
  ['mock','2026 mocks'],
  ['methods-12','Methods 1/2'],
  ['methods-34','Methods 3/4'],
  ['specialist-12','Specialist 1/2'],
  ['specialist-34','Specialist 3/4'],
  ['physics-12','Physics'],
  ['other','Other']
];

let cleanupFns=[];
let clock=null;
let activeRoute='';
const clean=()=>{cleanupFns.splice(0).forEach(fn=>{try{fn()}catch{}});clearInterval(clock);clock=null;document.body.classList.remove('bp-exam-active');};
const listen=(target,event,fn,opts)=>{target?.addEventListener(event,fn,opts);cleanupFns.push(()=>target?.removeEventListener(event,fn,opts))};

function setTestsNavActive(){
  $$('.bp-nav a,.bp-mobile-dock a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#tests'));
  document.body.dataset.route='tests';
}

function metadataChips(t,{full=false}={}){
  const rows=[];
  if(t.subject)rows.push(['Subject',`${t.subject}${t.units?` • Units ${t.units}`:''}`]);
  if(t.year)rows.push(['Year',String(t.year)]);
  if(t.tech)rows.push(['Conditions',t.tech]);
  if(hasValue(t.reading))rows.push(['Reading',`${t.reading} min`]);
  if(hasValue(t.minutes))rows.push(['Writing',fmtMinutes(t.minutes)]);
  if(hasValue(t.marks))rows.push(['Marks',String(t.marks)]);
  if(hasValue(t.questions))rows.push(['Questions',String(t.questions)]);
  if(t.difficulty)rows.push(['Difficulty',t.difficulty]);
  if(full)rows.push(['Marking scheme',hasScheme(t)?'Available':'Not currently published']);
  return rows.map(([k,v])=>`<span><small>${esc(k)}</small><b>${esc(v)}</b></span>`).join('');
}

function statusBadge(t){
  if(t.metadataStatus==='verified')return '<span class="bp-assessment-badge is-verified">Verified metadata</span>';
  return '<span class="bp-assessment-badge">Partial metadata</span>';
}

function coverMarkup(t,cls='bp-assessment-cover'){
  return `<div class="${cls}" data-test-cover><img src="${safeUrl(t.thumbnail)}" alt="Preview for ${esc(t.title)}" loading="lazy"><div class="bp-assessment-cover__fallback" aria-hidden="true"><span>${subjectIcon(t)}</span><small>BRAINPOWER ASSESSMENT</small></div></div>`;
}

function testCard(t){
  const p=load(),best=bestScore(t,p),scheme=hasScheme(t),compatible=examCompatible(t);
  return `<article class="bp-assessment-card" data-assessment-card data-test-id="${esc(t.id)}" data-course="${esc(t.course||'other')}" data-tech="${esc(t.tech||'')}" data-scheme="${scheme?'yes':'no'}">
    ${coverMarkup(t)}
    <div class="bp-assessment-card__body">
      <div class="bp-assessment-card__top"><div><span>${esc(courseById(t.course)?.short||t.subject||'Other')}</span>${statusBadge(t)}</div>${best!=null?`<b class="bp-assessment-best">Best ${best}%</b>`:''}</div>
      <h3>${esc(t.title)}</h3><p>${esc(t.description||'Brainpower practice assessment.')}</p>
      <div class="bp-assessment-card__meta">${metadataChips(t)}</div>
      <div class="bp-assessment-card__topics">${(t.topics||[]).slice(0,4).map(x=>`<span>${esc(x)}</span>`).join('')}</div>
      <div class="bp-assessment-card__actions">${compatible?`<a class="btn primary" href="#exam/${esc(t.id)}">Exam Mode →</a>`:''}<a class="btn ghost" href="#test/${esc(t.id)}">View</a><a class="bp-assessment-download" href="${safeUrl(t.file)}" download>Download ↓</a></div>
    </div>
  </article>`;
}

const pad=n=>String(Math.max(0,n)).padStart(2,'0');
function countdownHTML(date){
  const ms=new Date(date)-Date.now();
  if(ms<=0)return '<b class="bp-mock-live">Exam date reached</b>';
  const total=Math.floor(ms/1000),days=Math.floor(total/86400),hours=Math.floor(total%86400/3600),mins=Math.floor(total%3600/60),secs=total%60;
  return `<span><b>${days}</b><small>DAYS</small></span><span><b>${pad(hours)}</b><small>HRS</small></span><span><b>${pad(mins)}</b><small>MIN</small></span><span><b>${pad(secs)}</b><small>SEC</small></span>`;
}
function mockSeriesMarkup(){
  return `<section class="bp-mock-series" data-mock-series><div class="bp-mock-series__head"><div><small>2026 MOCK EXAMINATION SERIES</small><h2>Four papers. Four real deadlines.</h2><p>The Brainpower Methods and Specialist mock series, tied to the corresponding published VCAA examination dates.</p></div><span>Melbourne time</span></div><div class="bp-mock-series__grid">${mockExams2026.map((m,i)=>`<article><div class="bp-mock-series__index" aria-hidden="true">0${i+1}</div><small>${esc(m.subject)}</small><h3>${esc(m.exam)}</h3><p>${esc(m.tech)} • ${m.marks} marks • ${esc(fmtMinutes(m.minutes))}</p><div class="bp-mock-series__date">${new Intl.DateTimeFormat('en-AU',{weekday:'short',day:'numeric',month:'short',hour:'numeric',minute:'2-digit',timeZone:'Australia/Melbourne'}).format(new Date(m.date))}</div><div class="bp-mock-series__countdown" data-c1-countdown="${esc(m.date)}">${countdownHTML(m.date)}</div><a href="${safeUrl(m.drive)}" target="_blank" rel="noopener">Open mock examination ↗</a></article>`).join('')}</div></section>`;
}
function startMockClock(root){
  clearInterval(clock);const tick=()=>$$('[data-c1-countdown]',root).forEach(el=>el.innerHTML=countdownHTML(el.dataset.c1Countdown));tick();clock=setInterval(tick,1000);
  cleanupFns.push(()=>clearInterval(clock));
}

function testsMarkup(){
  const p=load(),attempts=p.scores.length,compatible=tests.filter(examCompatible).length;
  return `<section class="bp-assessment-hero"><div class="bp-assessment-hero__art" aria-hidden="true"></div><div class="bp-assessment-hero__veil" aria-hidden="true"></div><div class="bp-assessment-hero__inner"><div><small>TEST CENTRE</small><h1>When practice becomes performance.</h1><p>Formal Brainpower assessments, mock examinations and a distraction-free Exam Mode. Sit the paper properly, mark it with evidence, then use the result to decide what comes next.</p><div class="bp-assessment-hero__actions"><a class="btn primary" href="#tests" data-scroll-library>Browse assessments ↓</a><a class="btn secondary" href="#practice">Warm up first</a></div></div><aside><small>ASSESSMENT LIBRARY</small><strong>${tests.length}</strong><span>published assessments</span><div><b>${compatible}</b><small>Exam Mode ready</small></div><div><b>${schemeCount()}</b><small>marking schemes</small></div><div><b>${attempts}</b><small>recorded attempts</small></div></aside></div></section>
    <section class="bp-assessment-stage"><div class="bp-assessment-principles"><div><span>01</span><b>Sit it properly</b><p>Use the listed conditions and real timing.</p></div><div><span>02</span><b>Mark with evidence</b><p>Solutions stay separate from the attempt.</p></div><div><span>03</span><b>Review the result</b><p>Saved scores feed your Progress dashboard.</p></div></div>
    ${mockSeriesMarkup()}
    <section class="bp-assessment-library" id="assessment-library"><div class="bp-assessment-library__head"><div><small>ASSESSMENT LIBRARY</small><h2>Find the paper you actually need.</h2><p>Unknown source metadata is deliberately hidden rather than guessed.</p></div><span><b data-test-visible>${tests.length}</b> shown</span></div>
      <div class="bp-assessment-tabs" role="group" aria-label="Assessment categories">${categoryDefs.map(([id,label],i)=>`<button type="button" class="${i===0?'is-active':''}" data-test-category="${id}">${esc(label)}</button>`).join('')}</div>
      <div class="bp-assessment-filters"><label><span>Search</span><input type="search" data-test-search placeholder="Title, topic or subject…"></label><label><span>Conditions</span><select data-test-tech><option value="all">All conditions</option>${[...new Set(tests.map(t=>t.tech).filter(Boolean))].map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}</select></label><label><span>Marking scheme</span><select data-test-scheme><option value="all">Any status</option><option value="yes">Available</option><option value="no">Not published</option></select></label><label><span>Difficulty</span><select data-test-difficulty><option value="all">Any difficulty</option>${[...new Set(tests.map(t=>t.difficulty).filter(Boolean))].map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}</select></label></div>
      <div class="bp-assessment-grid" data-test-grid>${tests.map(testCard).join('')}</div><div class="bp-assessment-empty" data-test-empty hidden><span>∅</span><h3>No assessment matches that filter.</h3><p>Clear a filter or choose a broader course category.</p></div>
    </section></section>`;
}

function bindCoverFallbacks(root){
  $$('[data-test-cover] img',root).forEach(img=>{const fail=()=>img.closest('[data-test-cover]')?.classList.add('is-fallback');img.addEventListener('error',fail,{once:true});cleanupFns.push(()=>img.removeEventListener('error',fail));if(img.complete&&img.naturalWidth===0)fail()});
}
function bindLibrary(main){
  const grid=$('[data-test-grid]',main),search=$('[data-test-search]',main),tech=$('[data-test-tech]',main),scheme=$('[data-test-scheme]',main),diff=$('[data-test-difficulty]',main),visible=$('[data-test-visible]',main),empty=$('[data-test-empty]',main);let category='all';
  const filter=()=>{
    const term=(search?.value||'').trim().toLowerCase(),tv=tech?.value||'all',sv=scheme?.value||'all',dv=diff?.value||'all';
    const isMock=category==='mock';
    $('[data-mock-series]',main)?.classList.toggle('is-filter-focus',isMock);
    let count=0;
    $$('[data-assessment-card]',grid).forEach(card=>{
      const t=testById(card.dataset.testId);let course=card.dataset.course||'other';if(!courseById(course))course='other';
      const categoryOk=category==='all'||(!isMock&&course===category);
      const text=`${t?.title||''} ${t?.subject||''} ${(t?.topics||[]).join(' ')}`.toLowerCase();
      const ok=!isMock&&categoryOk&&(tv==='all'||card.dataset.tech===tv)&&(sv==='all'||card.dataset.scheme===sv)&&(dv==='all'||t?.difficulty===dv)&&(!term||text.includes(term));
      card.hidden=!ok;if(ok)count++;
    });
    if(isMock){count=mockExams2026.length;document.querySelector('[data-mock-series]')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}
    if(visible)visible.textContent=count;if(empty)empty.hidden=count>0||isMock;
  };
  $$('[data-test-category]',main).forEach(btn=>listen(btn,'click',()=>{category=btn.dataset.testCategory;$$('[data-test-category]',main).forEach(x=>x.classList.toggle('is-active',x===btn));filter()}));
  [search,tech,scheme,diff].forEach(el=>listen(el,el?.tagName==='INPUT'?'input':'change',filter));
  listen($('[data-scroll-library]',main),'click',e=>{e.preventDefault();$('#assessment-library',main)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})});
  filter();
}

function renderTests(main){
  main.className='bp-assessment-page';main.innerHTML=testsMarkup();setTestsNavActive();bindCoverFallbacks(main);bindLibrary(main);startMockClock(main);
}

function historyMarkup(t,p){
  const rows=p.scores.filter(x=>x.testId===t.id).slice(0,5);if(!rows.length)return '';
  return `<section class="bp-test-history"><div><small>YOUR ATTEMPTS</small><h2>Recorded results</h2></div><div>${rows.map(x=>`<span><b>${Math.round(x.score/x.max*100)}%</b><small>${x.score}/${x.max} • ${new Intl.DateTimeFormat('en-AU',{day:'numeric',month:'short',year:'numeric'}).format(new Date(x.date))}</small></span>`).join('')}</div><a href="#progress">Open Progress →</a></section>`;
}
function testDetailMarkup(t){
  const p=load(),compatible=examCompatible(t),saved=isBookmarked(`test:${t.id}`),best=bestScore(t,p),scheme=hasScheme(t);
  return `<section class="bp-test-detail-hero"><div><a href="#tests">← Test Centre</a><small>${esc(courseById(t.course)?.short||t.subject||'Assessment')}</small><h1>${esc(t.title)}</h1><p>${esc(t.description||'Brainpower practice assessment.')}</p><div class="bp-test-detail-hero__badges">${statusBadge(t)}${best!=null?`<span class="bp-assessment-badge is-score">Best ${best}%</span>`:''}${scheme?'<span class="bp-assessment-badge is-scheme">Marking scheme available</span>':'<span class="bp-assessment-badge">No marking scheme published</span>'}</div><div class="bp-test-detail-hero__actions">${compatible?`<a class="btn primary" href="#exam/${esc(t.id)}">Start Exam Mode →</a>`:''}<a class="btn secondary" href="${safeUrl(t.file)}" target="_blank" rel="noopener">Open paper ↗</a><a class="btn secondary" href="${safeUrl(t.file)}" download>Download ↓</a></div></div>${coverMarkup(t,'bp-test-detail-cover')}</section>
    <section class="bp-test-detail-stage"><div class="bp-test-detail-grid"><main><section class="bp-test-overview"><div><small>ASSESSMENT DETAILS</small><h2>Know the conditions before you start.</h2></div><div class="bp-test-detail-meta">${metadataChips(t,{full:true})}</div></section><section class="bp-test-preview"><div><small>PAPER PREVIEW</small><h2>Preview without the tiny embedded PDF viewer.</h2><p>The cover/first-page preview stays clean here. Open the full paper in a browser tab or download it when you are ready to work.</p></div>${coverMarkup(t,'bp-test-preview__paper')}<div class="bp-test-preview__actions"><a class="btn primary" href="${safeUrl(t.file)}" target="_blank" rel="noopener">Open full paper ↗</a><a class="btn ghost" href="${safeUrl(t.file)}" download>Download PDF</a></div></section>${historyMarkup(t,p)}</main><aside><section><small>TOPICS</small><div class="bp-test-topics">${(t.topics||[]).map(x=>`<a href="#practice?course=${esc(t.course)}">${esc(x)} <b>→</b></a>`).join('')}</div></section><section><small>BEFORE THE CLOCK</small><ol><li>Check the technology conditions.</li><li>Have permitted materials ready.</li><li>Use reading time properly.</li><li>Do not open solutions until you finish.</li></ol></section>${scheme?`<section class="bp-test-scheme"><small>MARKING SCHEME</small><p>Available, but deliberately kept separate from the paper.</p><a href="${safeUrl(t.solutionFile)}" target="_blank" rel="noopener">Open marking scheme ↗</a></section>`:`<section class="bp-test-scheme is-unavailable"><small>MARKING SCHEME</small><p>A marking scheme is not currently published for this assessment. Brainpower will not fabricate one.</p></section>`}<button type="button" class="bp-test-save" data-test-bookmark="test:${esc(t.id)}">${saved?'★ Saved':'☆ Save assessment'}</button></aside></div></section>`;
}
function bindTestDetail(main,t){
  bindCoverFallbacks(main);const btn=$('[data-test-bookmark]',main);listen(btn,'click',()=>{toggleBookmark(btn.dataset.testBookmark);btn.textContent=isBookmarked(btn.dataset.testBookmark)?'★ Saved':'☆ Save assessment'});
}
function renderTest(main,id){
  const t=testById(id);if(!t)return;main.className='bp-assessment-page bp-test-detail-page';main.innerHTML=testDetailMarkup(t);setTestsNavActive();bindTestDetail(main,t);
}

const examKey=id=>`brainpower-exam-session-v1:${id}`;
function readExamState(t){
  const base={phase:'ready',remaining:Math.max(0,Number(t.reading||0)*60),questionStates:{},activeQuestion:1,running:false,endAt:null,started:false,finished:false};
  try{const raw=JSON.parse(localStorage.getItem(examKey(t.id))||'{}');const s={...base,...raw};return reconcileExamState(t,s)}catch{return base}
}
function writeExamState(t,s){localStorage.setItem(examKey(t.id),JSON.stringify({...s,updatedAt:Date.now()}));}
function reconcileExamState(t,s){
  if(!s.running||!s.endAt||s.finished)return s;
  let remain=Math.ceil((Number(s.endAt)-Date.now())/1000);
  if(remain>0){s.remaining=remain;return s}
  if(s.phase==='reading'){
    const spill=-remain;s.phase='writing';s.started=true;s.remaining=Math.max(0,Number(t.minutes||0)*60-spill);s.endAt=Date.now()+s.remaining*1000;s.running=s.remaining>0;if(!s.running)s.phase='time';
  }else{s.remaining=0;s.running=false;s.phase='time'}
  return s;
}
function examTime(n){n=Math.max(0,Math.ceil(Number(n)||0));return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`}
function phaseLabel(s){return s.finished?'FINISHED':s.phase==='ready'?'READY':s.phase==='reading'?'READING':s.phase==='writing'?'WRITING':s.phase==='time'?'TIME':'PAUSED'}
function questionCount(t){return Number.isInteger(t.questions)&&t.questions>0?t.questions:0}
function trackerCounts(t,s){const rows=Object.values(s.questionStates||{});return {unanswered:Math.max(0,questionCount(t)-rows.filter(x=>x.answered).length),flagged:rows.filter(x=>x.flagged).length}}
function trackerMarkup(t,s){
  const count=questionCount(t);if(!count)return '<aside class="bp-exam-tracker"><h2>Paper checklist unavailable</h2><p>The number of questions is not verified. Check your paper before finishing.</p></aside>';
  return `<aside class="bp-exam-tracker" aria-label="Paper question tracker"><header><small>PAPER CHECKLIST</small><h2>Question <span data-tracker-current>1</span> of ${count}</h2><p>Mark your paper manually. This checklist does not read answers or move the PDF.</p></header><nav aria-label="Question navigator">${Array.from({length:count},(_,i)=>`<button type="button" data-exam-question="${i+1}" aria-label="Question ${i+1}">${i+1}</button>`).join('')}</nav><div class="bp-exam-tracker__legend"><span>✓ Answered</span><span>⚑ Flagged</span><span>○ Unanswered</span></div><div class="bp-exam-tracker__actions"><button type="button" data-tracker-previous aria-label="Previous question">← Previous</button><button type="button" data-tracker-next aria-label="Next question">Next →</button><button type="button" data-tracker-answered aria-pressed="false">Mark answered</button><button type="button" data-tracker-flagged aria-pressed="false">Flag for review</button></div><label class="bp-exam-tracker__notes"><span>Question notes — saved on this browser</span><textarea data-tracker-notes rows="3" maxlength="2000" placeholder="Working reminder or what to revisit…"></textarea></label><p data-tracker-summary role="status" aria-live="polite"></p><small>Keyboard: Alt + ← / → to move; Alt + A to mark answered; Alt + F to flag.</small></aside>`;
}

function examMarkup(t,s){
  const marksKnown=hasValue(t.marks),scheme=hasScheme(t),reading=hasValue(t.reading);
  return `<section class="bp-exam-shell" data-exam-shell><header class="bp-exam-header"><a href="#test/${esc(t.id)}">← Exit</a><div><small>${esc(t.subject)}${t.units?` • Units ${esc(t.units)}`:''}</small><strong>${esc(t.title)}</strong></div><span data-exam-phase>${phaseLabel(s)}</span></header>
    <main class="bp-exam-main"><section class="bp-exam-start" data-exam-start ${s.started||s.finished?'hidden':''}><div><small>EXAM MODE</small><h1>${esc(t.title)}</h1><p>A restrained attempt environment. The paper stays visible, solutions stay hidden, and your reading/writing clock can survive a refresh.</p><div class="bp-exam-start__stats">${reading?`<span><b>${t.reading} min</b><small>reading</small></span>`:''}<span><b>${fmtMinutes(t.minutes)||'Untimed'}</b><small>writing</small></span>${marksKnown?`<span><b>${t.marks}</b><small>marks</small></span>`:''}<span><b>${esc(t.tech||'Check paper')}</b><small>conditions</small></span></div><div class="bp-exam-start__notice"><b>Before you begin</b><p>Open permitted materials now. Brainpower cannot read answers inside a PDF paper; use the saved paper checklist to track your work and review flags.</p></div><button type="button" class="btn primary large" data-exam-begin>${reading?'Begin reading time →':'Begin writing time →'}</button></div></section>
      ${s.started&&!s.finished?'<aside class="bp-exam-restored" data-exam-restored><b>Your saved attempt is ready.</b><p>The clock and paper checklist have been restored from this browser.</p><button type="button" class="btn secondary" data-exam-return>Return to paper</button></aside>':''}<section class="bp-exam-work" data-exam-work ${!s.started||s.finished?'hidden':''}><div class="bp-exam-control"><div class="bp-exam-clock"><small data-exam-clock-label>${s.phase==='reading'?'Reading time':'Writing time'}</small><strong role="timer" aria-label="Exam time remaining" data-exam-clock>${examTime(s.remaining)}</strong><span data-exam-help>${s.running?'Timer running.':'Timer paused.'}</span></div><div class="bp-exam-control__actions"><button type="button" data-exam-toggle>${s.running?'Pause':'Resume'}</button>${reading?'<button type="button" data-exam-skip>Start writing now</button>':''}<button type="button" data-exam-finish>Finish attempt</button></div></div><div class="bp-exam-workspace">${trackerMarkup(t,s)}<div class="bp-exam-paper"><iframe src="${safeUrl(t.file)}#toolbar=0&navpanes=0" title="${esc(t.title)}"></iframe></div></div><p class="bp-exam-time-status" role="status" aria-live="polite" data-exam-time-status></p></section>
      <section class="bp-exam-finished" data-exam-finished ${!s.finished?'hidden':''}><div><small>ATTEMPT FINISHED</small><h1>Mark it with evidence.</h1><p>Your timed attempt is closed. Use the published marking scheme if one exists, then record the score only when the source paper provides a known total mark.</p>${marksKnown?`<div class="bp-exam-score"><label><span>Your score</span><input type="number" min="0" max="${t.marks}" data-exam-score placeholder="0–${t.marks}"></label><span>/ ${t.marks}</span><button type="button" data-exam-save-score>Save result</button><div data-exam-score-message aria-live="polite"></div></div>`:`<div class="bp-exam-score-unavailable"><b>Score entry unavailable</b><p>The total mark is not verified in Brainpower metadata, so a percentage will not be fabricated.</p></div>`}<div class="bp-exam-finished__actions">${scheme?`<a class="btn primary" href="${safeUrl(t.solutionFile)}" target="_blank" rel="noopener">Open marking scheme ↗</a>`:''}<a class="btn ghost" href="#test/${esc(t.id)}">Back to assessment</a><a class="btn ghost" href="#progress">Progress dashboard</a><button type="button" class="btn ghost" data-exam-reset>Reset attempt</button></div></div></section>
    </main>
    <dialog class="bp-exam-confirm" data-exam-confirm><form method="dialog"><small>FINISH ATTEMPT?</small><h2>Check the paper before you stop the clock.</h2><p data-exam-confirm-copy></p><div class="bp-exam-confirm__facts"><span><b data-confirm-time>${examTime(s.remaining)}</b><small>time remaining</small></span><span><b data-confirm-unanswered>Unknown</b><small>unanswered on checklist</small></span><span><b data-confirm-flagged>Unknown</b><small>flagged on checklist</small></span></div><p class="bp-exam-confirm__note">Checklist counts reflect your manual marks. Check the paper too; answers inside a PDF cannot be inspected.</p><div><button value="cancel" class="btn ghost">Keep working</button><button value="finish" class="btn primary" data-confirm-finish>Finish now</button></div></form></dialog>
  </section>`;
}

function bindExam(main,t,state){
  document.body.classList.add('bp-exam-active');
  const shell=$('[data-exam-shell]',main),start=$('[data-exam-start]',shell),work=$('[data-exam-work]',shell),finished=$('[data-exam-finished]',shell),phase=$('[data-exam-phase]',shell),clockEl=$('[data-exam-clock]',shell),clockLabel=$('[data-exam-clock-label]',shell),help=$('[data-exam-help]',shell),toggle=$('[data-exam-toggle]',shell),skip=$('[data-exam-skip]',shell),dialog=$('[data-exam-confirm]',shell);
  let s=state;
  const count=questionCount(t);
  s.questionStates=s.questionStates&&typeof s.questionStates==='object'?s.questionStates:{};
  s.activeQuestion=Math.max(1,Math.min(count||1,Number(s.activeQuestion)||1));
  const current=()=>s.questionStates[s.activeQuestion]||{answered:false,flagged:false,notes:''};
  const paintTracker=()=>{
    if(!count)return;
    const row=current();
    $('[data-tracker-current]',shell).textContent=s.activeQuestion;
    $$('[data-exam-question]',shell).forEach(b=>{const n=Number(b.dataset.examQuestion),item=s.questionStates[n]||{};b.textContent=`${n}${item.answered?' ✓':''}${item.flagged?' ⚑':''}`;b.setAttribute('aria-label',`Question ${n}, ${item.answered?'answered':'unanswered'}${item.flagged?', flagged for review':''}`);b.setAttribute('aria-current',n===s.activeQuestion?'step':'false');b.classList.toggle('is-answered',Boolean(item.answered));b.classList.toggle('is-flagged',Boolean(item.flagged))});
    const answered=$('[data-tracker-answered]',shell),flagged=$('[data-tracker-flagged]',shell);
    answered.setAttribute('aria-pressed',String(Boolean(row.answered)));answered.textContent=row.answered?'Mark unanswered':'Mark answered';
    flagged.setAttribute('aria-pressed',String(Boolean(row.flagged)));flagged.textContent=row.flagged?'Remove review flag':'Flag for review';
    $('[data-tracker-notes]',shell).value=row.notes||'';
    $('[data-tracker-previous]',shell).disabled=s.activeQuestion===1;$('[data-tracker-next]',shell).disabled=s.activeQuestion===count;
    const counts=trackerCounts(t,s);$('[data-tracker-summary]',shell).textContent=`${counts.unanswered} unanswered • ${counts.flagged} flagged for review`;
  };
  const select=n=>{s.activeQuestion=Math.max(1,Math.min(count,n));paintTracker();persist()};
  const mark=key=>{s.questionStates[s.activeQuestion]={...current(),[key]:!current()[key]};paintTracker();persist()};
  $$('[data-exam-question]',shell).forEach(b=>listen(b,'click',()=>select(Number(b.dataset.examQuestion))));
  listen($('[data-tracker-next]',shell),'click',()=>select(s.activeQuestion+1));listen($('[data-tracker-previous]',shell),'click',()=>select(s.activeQuestion-1));
  listen($('[data-tracker-answered]',shell),'click',()=>mark('answered'));listen($('[data-tracker-flagged]',shell),'click',()=>mark('flagged'));
  listen($('[data-tracker-notes]',shell),'input',e=>{s.questionStates[s.activeQuestion]={...current(),notes:e.target.value};persist()});
  listen(window,'keydown',e=>{if(!count||work.hidden||dialog.open||e.target.closest?.('input,textarea,select')||!e.altKey)return;const key=e.key.toLowerCase();if(['arrowleft','arrowright','a','f'].includes(key)){e.preventDefault();if(key==='arrowleft')select(s.activeQuestion-1);else if(key==='arrowright')select(s.activeQuestion+1);else mark(key==='a'?'answered':'flagged')}});
  let lastWarning='';

  const persist=()=>writeExamState(t,s);
  const paint=()=>{
    s=reconcileExamState(t,s);if(phase)phase.textContent=phaseLabel(s);if(clockEl){clockEl.textContent=examTime(s.remaining);clockEl.setAttribute('aria-label',`${s.phase==='reading'?'Reading':'Writing'} time remaining ${examTime(s.remaining)}`)}if(clockLabel)clockLabel.textContent=s.phase==='reading'?'Reading time':'Writing time';if(help)help.textContent=s.phase==='time'?'Writing time has finished.':s.running?'Timer running.':'Timer paused.';if(toggle)toggle.textContent=s.running?'Pause':'Resume';if(skip)skip.hidden=s.phase!=='reading';if(s.phase==='writing'&&s.running){const warning=s.remaining<=60?'One minute of writing time remains.':s.remaining<=300?'Five minutes or less of writing time remain.':'';if(warning&&warning!==lastWarning){$('[data-exam-time-status]',shell).textContent=warning;lastWarning=warning}}
    persist();
  };
  const run=()=>{clearInterval(clock);clock=setInterval(()=>{s=reconcileExamState(t,s);paint();if(!s.running)clearInterval(clock)},1000)};
  const begin=()=>{s.started=true;s.phase=hasValue(t.reading)?'reading':'writing';s.remaining=(s.phase==='reading'?Number(t.reading):Number(t.minutes))*60;s.running=true;s.endAt=Date.now()+s.remaining*1000;start.hidden=true;work.hidden=false;paint();run()};
  listen($('[data-exam-begin]',shell),'click',begin);
  listen($('[data-exam-return]',shell),'click',()=>{$('[data-exam-restored]',shell).hidden=true;$('[data-tracker-answered]',shell)?.focus({preventScroll:true});work.scrollIntoView({block:'start',behavior:'instant'})});
  listen(toggle,'click',()=>{s=reconcileExamState(t,s);if(s.running){s.remaining=Math.max(0,Math.ceil((s.endAt-Date.now())/1000));s.running=false;s.endAt=null;clearInterval(clock)}else if(s.remaining>0){s.running=true;s.endAt=Date.now()+s.remaining*1000;run()}paint()});
  listen(skip,'click',()=>{s.phase='writing';s.remaining=Number(t.minutes||0)*60;s.running=true;s.endAt=Date.now()+s.remaining*1000;paint();run()});
  listen($('[data-exam-finish]',shell),'click',()=>{s=reconcileExamState(t,s);$('[data-confirm-time]',dialog).textContent=examTime(s.remaining);$('[data-exam-confirm-copy]',dialog).textContent=`You still have ${examTime(s.remaining)} on the clock. Check your paper and saved checklist before finishing.`;const counts=trackerCounts(t,s);$('[data-confirm-unanswered]',dialog).textContent=count?counts.unanswered:'Unknown';$('[data-confirm-flagged]',dialog).textContent=count?counts.flagged:'Unknown';dialog.showModal()});
  listen(dialog,'close',()=>{if(dialog.returnValue!=='finish')return;s=reconcileExamState(t,s);s.running=false;s.finished=true;s.endAt=null;clearInterval(clock);work.hidden=true;finished.hidden=false;phase.textContent='FINISHED';persist()});
  listen($('[data-exam-save-score]',shell),'click',()=>{const input=$('[data-exam-score]',shell),msg=$('[data-exam-score-message]',shell),score=Number(input?.value),max=Number(t.marks);if(!input?.value.trim()||!Number.isFinite(score)||score<0||score>max){if(msg)msg.innerHTML='<span class="is-bad">Enter a score within the verified mark range.</span>';return}addScore(t.id,score,max);if(msg)msg.innerHTML=`<span class="is-good">Saved: ${score}/${max} (${Math.round(score/max*100)}%).</span>`});
  listen($('[data-exam-reset]',shell),'click',()=>{localStorage.removeItem(examKey(t.id));location.hash=`#exam/${t.id}`;location.reload()});
  const onVis=()=>{if(!document.hidden){s=reconcileExamState(t,s);paint()}};listen(document,'visibilitychange',onVis);
  if(s.running)run();paint();paintTracker();
}
function renderExam(id){
  const t=testById(id),app=$('#app');if(!t||!app)return;clean();activeRoute=`exam/${id}`;const s=readExamState(t);app.innerHTML=examMarkup(t,s);bindExam(app,t,s);
}

function apply(){
  const [base,id]=routeParts(),key=`${base}/${id||''}`;
  if(key===activeRoute&&((base==='exam'&&$('[data-exam-shell]'))||(base!=='exam'&&$('main')?.dataset.c1Assessment===key)))return;
  clean();activeRoute=key;
  if(base==='tests'){const main=$('main');if(main){main.dataset.c1Assessment=key;renderTests(main)}}
  else if(base==='test'){const main=$('main');if(main){main.dataset.c1Assessment=key;renderTest(main,id)}}
  else if(base==='exam')renderExam(id);
}

let queued=false;function queue(){if(queued)return;queued=true;queueMicrotask(()=>{queued=false;apply()})}
const app=$('#app');if(app)new MutationObserver(queue).observe(app,{childList:true,subtree:true});
listen(window,'hashchange',()=>setTimeout(apply,0));
apply();
