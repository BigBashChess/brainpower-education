import {courseById} from '../data/courses.js';
import {lessonsForCourse,lessonsForTopic} from '../data/lessons.js';
import {practiceQuestions} from '../data/questions.js';
import {tests} from '../data/tests.js';
import {resources} from '../data/resources.js';
import {load} from '../progress/store.js';
import {courseMastery,topicMastery} from '../utils.js';

const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const courseRoute=()=>{const raw=(location.hash.slice(1)||'').split('?')[0].split('/').filter(Boolean);return raw[0]==='course'?raw[1]||'':null};

// Review assets generated specifically for B2. Before production merge these are replaced
// with repository-owned compressed files under public/art/courses/.
const HERO_ART={
  'methods-12':'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image/images/d58e363c-fe63-4f10-934c-76edd160c47f/910b04ce-7671-4461-8669-4adfd0e826d4/A_single_standalone_ultra_wide_cinematic_hero_illustration_f.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMmUyMjY0MzY1YTc5MTY0ZSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MTAyMDIxNH0.5KyGiYwTSBNAZzQ6PdXtQVmhSOfAsS2jWZGIfQn9HiM',
  'methods-34':'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image/images/485ad00e-0d91-4b48-99ba-d25858436403/96cbdb36-b1a8-4d8a-96c5-e38a24706bf2/A_single_standalone_ultra_wide_cinematic_hero_illustration_f.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiN2ZlYWUwNGYxZmY0NTliNyIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MTA4MTY3OX0.E3s3n9J4d-8eZ3L6Q2e7GvLAdPtQxVpJtyrMQuobVFI',
  'specialist-12':'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image/images/439e5c39-920d-4029-9b4a-ac4a61f48412/df566122-4f50-4c4a-8557-f9ea9ce1fdea/A_single_standalone_ultra_wide_cinematic_hero_illustration_f.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiODM2ODU3MTkzNGY5MmU3OSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MTA1NjUzN30.ne41z0vsTyNLKCiW9nNYrmIF2JqrFdhb3hNb36BLrOM',
  'specialist-34':'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image/images/72b87e83-0508-4084-b483-96e36fb9be56/5dc91cd1-37b5-4f09-9bd9-d8c4e2bb02f5/A_single_standalone_ultra_wide_cinematic_hero_illustration_f.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiOTI0MTU4NWQ5OTVmN2ViYyIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MTA2Nzk5N30.75xggjnYq4Mf0VsUrjK8WJ6kaVYEnYGFt0jaolBmvBo',
  'physics-12':'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image/images/153aae3b-427a-42cc-b126-f5341f1c3184/02a0ac8d-bcab-4187-ba6b-f629e7b4612b/A_single_standalone_ultra_wide_cinematic_hero_illustration_f.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZjAxYzg3NjljOGQ0ZWYwMiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MTA3MzUxM30.4OCoyXfz9oZ0wYtHDCQodpM0qryrBY_MUfcgNDilKq4'
};

const COURSE_TONE={
  'methods-12':{kicker:'MATHEMATICAL METHODS • UNITS 1 & 2',strap:'Build the language of functions, algebra, calculus and probability with a structured path from fundamentals to demanding application.',symbol:'ƒ'},
  'methods-34':{kicker:'MATHEMATICAL METHODS • UNITS 3 & 4',strap:'Turn core techniques into fast, precise VCAA-level reasoning across functions, calculus, probability and exam preparation.',symbol:'∫'},
  'specialist-12':{kicker:'SPECIALIST MATHEMATICS • UNITS 1 & 2',strap:'Develop the proof, algebra, trigonometry, vectors, complex numbers, calculus and kinematics foundations Specialist demands.',symbol:'Σ'},
  'specialist-34':{kicker:'SPECIALIST MATHEMATICS • UNITS 3 & 4',strap:'Connect complex numbers, vectors, calculus, differential equations, statistics and mechanics at full Specialist depth.',symbol:'∇'},
  'physics-12':{kicker:'VCE PHYSICS • UNITS 1 & 2',strap:'Understand the physics first, then apply it through calculations, modelling and practical reasoning across four Areas of Study.',symbol:'λ'}
};

function statsFor(course,p){
  const rows=lessonsForCourse(course.id);
  const done=rows.filter(l=>p.completedLessons.includes(l.id)).length;
  const qs=practiceQuestions.filter(q=>q.course===course.id);
  const solved=qs.filter(q=>p.correctQuestions.includes(q.id)).length;
  const courseTests=tests.filter(t=>t.course===course.id);
  const next=rows.find(l=>!p.completedLessons.includes(l.id))||null;
  const mastery=courseMastery(course.id,p);
  const currentTopic=next?.topic||course.topics[course.topics.length-1]?.id||'';
  const scores=p.scores.filter(s=>courseTests.some(t=>t.id===s.testId));
  return {rows,done,qs,solved,courseTests,next,mastery,currentTopic,scores,complete:rows.length>0&&done===rows.length};
}

function nextAction(course,s){
  if(s.complete)return {href:`#practice?course=${course.id}`,label:'Review mastered course →',sub:'All lessons complete'};
  if(!s.next)return {href:`#course/${course.id}`,label:'Explore course →',sub:'Course ready'};
  const first=s.done===0;
  return {href:`#lesson/${s.next.id}`,label:`${first?'Start':'Continue'} ${s.next.title} →`,sub:`${s.next.minutes||8} min • ${s.next.difficulty||'Core'}`};
}

function scoreLabel(score){return score.max?`${score.score}/${score.max} • ${Math.round(score.score/score.max*100)}%`:`${score.score}`}
function formatDate(iso){try{return new Intl.DateTimeFormat('en-AU',{day:'numeric',month:'short',year:'numeric'}).format(new Date(iso))}catch{return ''}}

function chapterCard(course,topic,index,p,s){
  const rows=lessonsForTopic(course.id,topic.id);
  const done=rows.filter(l=>p.completedLessons.includes(l.id)).length;
  const mastery=topicMastery(course.id,topic.id,p)??0;
  const current=topic.id===s.currentTopic&&!s.complete;
  const complete=rows.length>0&&done===rows.length;
  const topicQs=practiceQuestions.filter(q=>q.course===course.id&&q.topic===topic.id);
  const solved=topicQs.filter(q=>p.correctQuestions.includes(q.id)).length;
  const status=complete?'Mastered':current?'Current chapter':done?'In progress':'Ready';
  return `<details class="bp-chapter ${complete?'is-complete':''} ${current?'is-current':''}" ${current||index===0&&s.done===0?'open':''}>
    <summary>
      <span class="bp-chapter__number">${String(index+1).padStart(2,'0')}</span>
      <div class="bp-chapter__summary"><div class="bp-chapter__eyebrow"><span>${status}</span><i>${done}/${rows.length} lessons</i></div><h3>${esc(topic.title)}</h3><div class="bp-chapter__progress"><span style="width:${mastery}%"></span></div></div>
      <div class="bp-chapter__score"><strong>${mastery}%</strong><span>mastery</span></div>
      <span class="bp-chapter__chevron" aria-hidden="true">⌄</span>
    </summary>
    <div class="bp-chapter__body">
      <div class="bp-chapter__lessons">${rows.map((l,i)=>lessonRow(l,p,s,index,i)).join('')}</div>
      <div class="bp-chapter__practice"><div><small>TOPIC PRACTICE</small><strong>${solved}/${topicQs.length} questions solved</strong></div><a href="#practice?course=${course.id}&topic=${topic.id}">${topicQs.length?'Practise this chapter':'Open practice'} →</a></div>
    </div>
  </details>`;
}

function lessonRow(l,p,s,chapterIndex,lessonIndex){
  const done=p.completedLessons.includes(l.id),current=s.next?.id===l.id;
  const state=done?'Complete':current?'Next':'Available';
  return `<a class="bp-course-lesson ${done?'is-complete':''} ${current?'is-current':''}" href="#lesson/${l.id}">
    <span class="bp-course-lesson__status">${done?'✓':String(lessonIndex+1).padStart(2,'0')}</span>
    <span class="bp-course-lesson__copy"><small>${state} • Chapter ${chapterIndex+1}</small><strong>${esc(l.title)}</strong><i>${esc(l.summary||'')}</i></span>
    <span class="bp-course-lesson__meta">${l.minutes||8} min<br><b>${esc(l.difficulty||'Core')}</b></span><span class="bp-course-lesson__arrow">→</span>
  </a>`;
}

function insightPanel(course,p,s){
  const topicRows=course.topics.map(t=>({topic:t,mastery:topicMastery(course.id,t.id,p)??0}));
  const weakest=[...topicRows].sort((a,b)=>a.mastery-b.mastery).slice(0,3);
  const latest=s.scores.slice(0,3);
  return `<aside class="bp-course-aside">
    <section class="bp-course-aside__card bp-course-control"><small>COURSE CONTROL ROOM</small><h3>${s.complete?'Course mastered':'What matters next'}</h3>
      ${s.complete?`<div class="bp-course-mastered"><span>★</span><strong>100% lesson completion</strong><p>Keep it sharp with mixed practice and formal assessments.</p></div>`:`<a class="bp-course-next" href="#lesson/${s.next?.id||''}"><span>Next lesson</span><strong>${esc(s.next?.title||'Start learning')}</strong><i>${s.next?.minutes||8} min • ${esc(s.next?.difficulty||'Core')} →</i></a>`}
      <div class="bp-course-mini-stats"><span><b>${s.done}/${s.rows.length}</b><i>lessons</i></span><span><b>${s.solved}/${s.qs.length}</b><i>questions</i></span><span><b>${s.courseTests.length}</b><i>tests</i></span></div>
    </section>
    <section class="bp-course-aside__card"><small>${s.complete?'REVIEW MAP':'NEEDS ATTENTION'}</small><h3>${s.complete?'Keep mastery durable':'Lowest chapter mastery'}</h3><div class="bp-course-weak">${weakest.map(x=>`<a href="#practice?course=${course.id}&topic=${x.topic.id}"><span>${esc(x.topic.title)}</span><b>${x.mastery}%</b></a>`).join('')}</div></section>
    <section class="bp-course-aside__card"><small>RECENT TEST RESULTS</small><h3>${latest.length?'Your latest scores':'No course scores yet'}</h3>${latest.length?`<div class="bp-course-results">${latest.map(x=>{const t=s.courseTests.find(t=>t.id===x.testId);return `<a href="#test/${x.testId}"><span>${esc(t?.title||'Assessment')}</span><b>${scoreLabel(x)}</b><i>${formatDate(x.date)}</i></a>`}).join('')}</div>`:`<p class="bp-course-aside__muted">When you save an Exam Mode score, it will appear here.</p><a class="bp-course-aside__link" href="#tests">Find an assessment →</a>`}</section>
  </aside>`;
}

function assessmentCards(course,s){
  const rows=s.courseTests.slice(0,4);
  if(!rows.length)return `<div class="bp-course-empty"><strong>No formal assessments linked yet.</strong><span>The course content is available now; its assessment library can grow independently.</span></div>`;
  return rows.map(t=>`<a class="bp-course-assessment" href="#test/${t.id}"><div><small>${esc(t.tech||'Assessment')}</small><h3>${esc(t.title)}</h3><p>${esc(t.description||'Brainpower course assessment.')}</p></div><footer><span>${t.reading?`${t.reading} min reading • `:''}${t.minutes?`${t.minutes} min writing`:''}</span><b>Open test →</b></footer></a>`).join('');
}

function resourceCards(course){
  const rows=resources.filter(r=>r.course===course.id&&r.type!=='Practice Test').slice(0,4);
  if(!rows.length)return `<div class="bp-course-empty"><strong>No separate course resources yet.</strong><span>Use the lesson theory, question bank and Test Centre while the resource library expands.</span></div>`;
  return rows.map(r=>`<a class="bp-course-resource" href="#resources?focus=${r.id}"><span>${esc(r.type)}</span><strong>${esc(r.title)}</strong><p>${esc(r.description||'Course resource')}</p><i>Open resource →</i></a>`).join('');
}

function renderCourse(){
  const id=courseRoute();
  if(!id){document.body.removeAttribute('data-course-id');return}
  const course=courseById(id),main=$('main');
  if(!course||!main||main.dataset.revampCourse===id)return;
  const p=load(),s=statsFor(course,p),tone=COURSE_TONE[id]||{kicker:course.short,strap:course.desc,symbol:'◆'},action=nextAction(course,s);
  document.body.dataset.courseId=id;
  main.dataset.revampCourse=id;
  main.className=`bp-course-page bp-course-page--${course.accent}`;
  main.innerHTML=`
    <section class="bp-course-hero">
      <div class="bp-course-hero__art" aria-hidden="true"></div><div class="bp-course-hero__shade" aria-hidden="true"></div>
      <div class="bp-course-hero__inner">
        <div class="bp-course-hero__copy"><a class="bp-course-breadcrumb" href="#learn">← All pathways</a><small>${tone.kicker}</small><h1>${esc(course.title)}</h1><p>${tone.strap}</p><div class="bp-course-hero__actions"><a class="btn primary large" href="${action.href}">${esc(action.label)}</a><a class="btn secondary large" href="#diagnostic/${course.id}">Take diagnostic</a></div><div class="bp-course-hero__micro"><span>${course.topics.length} chapters</span><span>${s.rows.length} lessons</span><span>${s.qs.length} practice questions</span><span>${s.courseTests.length} formal tests</span></div></div>
        <aside class="bp-course-progress-card"><div class="bp-course-progress-card__top"><span>${tone.symbol}</span><small>COURSE PROGRESS</small></div><div class="bp-course-progress-ring" style="--value:${s.mastery}"><strong>${s.mastery}%</strong><span>mastery</span></div><div class="bp-course-progress-card__current"><small>${s.complete?'STATUS':'CURRENT CHAPTER'}</small><strong>${s.complete?'All chapters complete':esc(course.topics.find(t=>t.id===s.currentTopic)?.title||'Start here')}</strong><span>${action.sub}</span></div></aside>
      </div>
    </section>
    <section class="bp-course-overview-strip"><div><small>LESSONS</small><strong>${s.done}<span> / ${s.rows.length}</span></strong></div><div><small>PRACTICE</small><strong>${s.solved}<span> / ${s.qs.length}</span></strong></div><div><small>COURSE MASTERY</small><strong>${s.mastery}<span>%</span></strong></div><div><small>FORMAL TESTS</small><strong>${s.courseTests.length}</strong></div><a href="#progress">Open dashboard →</a></section>
    <div class="bp-course-layout">
      <section class="bp-course-map"><header class="bp-course-section-head"><div><small>COURSE MAP</small><h2>Work chapter by chapter.</h2><p>Open a chapter to see its lessons. Nothing is artificially locked — move where the work is most useful.</p></div><a class="btn ghost" href="#practice?course=${course.id}">Mixed course practice →</a></header><div class="bp-course-chapters">${course.topics.map((t,i)=>chapterCard(course,t,i,p,s)).join('')}</div></section>
      ${insightPanel(course,p,s)}
    </div>
    <section class="bp-course-support"><header class="bp-course-section-head"><div><small>ASSESSMENTS</small><h2>Test the course under pressure.</h2><p>Formal Brainpower assessments connected directly to this pathway.</p></div><a class="btn ghost" href="#tests">Full Test Centre →</a></header><div class="bp-course-assessment-grid">${assessmentCards(course,s)}</div></section>
    <section class="bp-course-support bp-course-support--resources"><header class="bp-course-section-head"><div><small>COURSE RESOURCES</small><h2>Everything linked to this pathway.</h2><p>Marking schemes, revision packs and reference material when available.</p></div><a class="btn ghost" href="#resources">Resource library →</a></header><div class="bp-course-resource-grid">${resourceCards(course)}</div></section>`;
  const art=$('.bp-course-hero__art',main);if(art&&HERO_ART[id])art.style.backgroundImage=`url("${HERO_ART[id]}")`;
  const hero=$('.bp-course-hero',main);
  if(hero&&!matchMedia('(prefers-reduced-motion: reduce)').matches){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--course-x',((e.clientX-r.left)/r.width-.5).toFixed(3));hero.style.setProperty('--course-y',((e.clientY-r.top)/r.height-.5).toFixed(3))});hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--course-x','0');hero.style.setProperty('--course-y','0')})}
}

let queued=false;
function apply(){queued=false;renderCourse()}
function queueApply(){if(queued)return;queued=true;queueMicrotask(apply)}
const app=$('#app');if(app)new MutationObserver(queueApply).observe(app,{childList:true,subtree:true});
addEventListener('hashchange',()=>setTimeout(apply,0));
apply();
