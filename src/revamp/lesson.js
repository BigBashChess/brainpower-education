import {courseById} from '../data/courses.js';
import {lessonById,lessonsForCourse,lessonsForTopic} from '../data/lessons.js';
import {load} from '../progress/store.js';

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));
const lessonRoute=()=>{const raw=(location.hash.slice(1)||'').split('?')[0].split('/').filter(Boolean);return raw[0]==='lesson'?raw[1]||'':null};

const HERO_ART={
  'methods-12':'public/art/courses/methods-12-hero.webp',
  'methods-34':'public/art/courses/methods-34-hero.webp',
  'specialist-12':'public/art/courses/specialist-12-hero.webp',
  'specialist-34':'public/art/courses/specialist-34-hero.webp',
  'physics-12':'public/art/courses/physics-12-hero.webp'
};
const COURSE_SYMBOL={'methods-12':'ƒ','methods-34':'∫','specialist-12':'Σ','specialist-34':'∇','physics-12':'λ'};

let activeId=null;
let cleanups=[];
function addCleanup(fn){cleanups.push(fn)}
function teardown(){
  cleanups.splice(0).forEach(fn=>{try{fn()}catch{}});
  document.body.classList.remove('bp-lesson-focus');
  document.body.removeAttribute('data-lesson-course');
  document.body.removeAttribute('data-lesson-topic');
  activeId=null;
}

function compactLessonNav(lesson,course,progress){
  const topic=course.topics.find(t=>t.id===lesson.topic);
  const rows=lessonsForTopic(course.id,lesson.topic);
  const all=lessonsForCourse(course.id);
  const courseIndex=all.findIndex(x=>x.id===lesson.id);
  return `<div class="bp-lesson-side__course"><a href="#course/${course.id}">← Course map</a><span>${esc(course.short)}</span></div>
    <div class="bp-lesson-side__chapter"><small>CHAPTER</small><h3>${esc(topic?.title||lesson.topic)}</h3><p>${rows.length} lesson${rows.length===1?'':'s'} • Lesson ${courseIndex+1} of ${all.length} overall</p></div>
    <nav class="bp-lesson-side__lessons" aria-label="Lessons in this chapter">${rows.map((x,i)=>`<a href="#lesson/${x.id}" class="${x.id===lesson.id?'is-active':''} ${progress.completedLessons.includes(x.id)?'is-done':''}"><span>${progress.completedLessons.includes(x.id)?'✓':String(i+1).padStart(2,'0')}</span><strong>${esc(x.title)}</strong>${x.kind==='Checkpoint'?'<i>Checkpoint</i>':''}</a>`).join('')}</nav>
    <div class="bp-lesson-side__outline"><small>ON THIS LESSON</small><div data-lesson-outline></div></div>
    <a class="bp-lesson-side__practice" href="#practice?course=${course.id}&topic=${lesson.topic}"><span>Topic practice</span><strong>Open question bank →</strong></a>`;
}

function sectionLabel(block,index){
  const kicker=$('.block-kicker',block)?.textContent?.trim()||`Section ${index+1}`;
  const cleaned=kicker.replace(/^\d+\s*[•·-]\s*/,'').trim();
  return cleaned.charAt(0)+cleaned.slice(1).toLowerCase();
}

function buildOutline(content){
  const blocks=[...$$('.lesson-block',content),$('.lesson-complete',content)].filter(Boolean);
  const outline=[];
  blocks.forEach((block,i)=>{
    const id=`lesson-section-${i+1}`;
    block.id=id;
    const label=block.classList.contains('lesson-complete')?'Mastery gate':sectionLabel(block,i);
    outline.push({id,label,el:block});
  });
  return outline;
}

function renderRibbon(lesson,course,index,total,progress){
  const qDone=lesson.questions.filter(id=>progress.correctQuestions.includes(id)).length;
  const pct=lesson.questions.length?Math.round(qDone/lesson.questions.length*100):100;
  return `<div class="bp-lesson-ribbon" data-lesson-ribbon>
    <div class="bp-lesson-ribbon__inner">
      <a class="bp-lesson-ribbon__course" href="#course/${course.id}"><span>${COURSE_SYMBOL[course.id]||'◆'}</span><div><small>${esc(course.short)}</small><strong>Lesson ${index+1} / ${total}</strong></div></a>
      <div class="bp-lesson-ribbon__read"><span>Reading progress</span><div><i data-reading-progress></i></div><b data-reading-percent>0%</b></div>
      <div class="bp-lesson-ribbon__mastery"><span>Required practice</span><div><i data-mastery-progress style="width:${pct}%"></i></div><b data-mastery-count>${qDone}/${lesson.questions.length}</b></div>
      <div class="bp-lesson-ribbon__actions"><button type="button" data-lesson-map>Lesson map</button><button type="button" data-focus-mode>Focus mode</button></div>
    </div>
  </div>`;
}

function decorateHero(head,lesson,course,topicTitle,index,total){
  if(!head)return;
  head.classList.add('bp-lesson-hero');
  const art=HERO_ART[course.id];
  const artUrl=art?new URL(art,document.baseURI).href:'';
  head.style.setProperty('--lesson-art',`url("${artUrl}")`);
  head.insertAdjacentHTML('afterbegin','<div class="bp-lesson-hero__art" aria-hidden="true"></div><div class="bp-lesson-hero__shade" aria-hidden="true"></div>');
  const copy=$('.page-head-inner>div',head);
  if(copy){
    copy.insertAdjacentHTML('afterbegin',`<a class="bp-lesson-breadcrumb" href="#course/${course.id}">← ${esc(course.short)} course map</a>`);
    const eyebrow=$('.eyebrow',copy);if(eyebrow)eyebrow.textContent=`${topicTitle} • ${lesson.kind||'Lesson'}`;
    copy.insertAdjacentHTML('beforeend',`<div class="bp-lesson-hero__meta"><span>Lesson ${index+1} of ${total}</span><span>${lesson.minutes||8} min core</span><span>${esc(lesson.difficulty||'Core')}</span><span>+${lesson.xp||40} XP</span></div>`);
  }
  const actions=$('.head-actions',head);
  if(actions){actions.classList.add('bp-lesson-hero__actions');actions.insertAdjacentHTML('beforeend','<button class="btn secondary" type="button" data-focus-mode-hero>Enter focus mode</button>')}
}

function updateLiveMastery(lesson,root){
  const p=load();
  const qTotal=lesson.questions.length;
  const qDone=lesson.questions.filter(id=>p.correctQuestions.includes(id)).length;
  const ready=qDone===qTotal;
  const done=p.completedLessons.includes(lesson.id);
  const pct=qTotal?Math.round(qDone/qTotal*100):100;
  const bar=$('[data-mastery-progress]',root);if(bar)bar.style.width=`${pct}%`;
  const count=$('[data-mastery-count]',root);if(count)count.textContent=`${qDone}/${qTotal}`;
  const complete=$('.complete-lesson',root);
  if(complete&&!done){
    complete.disabled=!ready;
    complete.textContent=ready?`Complete ${(lesson.kind||'lesson').toLowerCase()} +${lesson.xp||40} XP`:'Mastery locked';
  }
  const gate=$('.lesson-complete',root);
  if(gate&&!done){
    gate.classList.toggle('is-ready',ready);
    const title=$('h3',gate),paragraph=$('p',gate);
    if(title)title.textContent=ready?'Ready to lock it in':'Not mastered yet';
    if(paragraph)paragraph.textContent=ready?'Every required question is solved. Complete the lesson when you can also explain the retrieval checks without looking back.':`You still need ${qTotal-qDone} correct required answer${qTotal-qDone===1?'':'s'}. Brainpower only counts the lesson once the required practice is complete.`;
  }
}

function bindFocus(root){
  const buttons=[$('[data-focus-mode]',root),$('[data-focus-mode-hero]',root)].filter(Boolean);
  const paint=()=>buttons.forEach(b=>b.textContent=document.body.classList.contains('bp-lesson-focus')?'Exit focus':'Focus mode');
  const toggle=()=>{document.body.classList.toggle('bp-lesson-focus');paint()};
  buttons.forEach(b=>b.addEventListener('click',toggle));
  const onKey=e=>{if(e.key==='Escape'&&document.body.classList.contains('bp-lesson-focus')){document.body.classList.remove('bp-lesson-focus');paint()}};
  addEventListener('keydown',onKey);addCleanup(()=>removeEventListener('keydown',onKey));
  paint();
}

function bindMap(root){
  const btn=$('[data-lesson-map]',root),side=$('.lesson-nav',root);if(!btn||!side)return;
  const close=()=>{side.classList.remove('is-open');btn.setAttribute('aria-expanded','false')};
  btn.setAttribute('aria-expanded','false');
  btn.addEventListener('click',()=>{const open=side.classList.toggle('is-open');btn.setAttribute('aria-expanded',String(open))});
  side.addEventListener('click',e=>{if(e.target.closest('a')&&matchMedia('(max-width: 920px)').matches)close()});
}

function bindReadingProgress(content,root){
  const bar=$('[data-reading-progress]',root),pctEl=$('[data-reading-percent]',root);if(!bar||!pctEl)return;
  const update=()=>{
    const rect=content.getBoundingClientRect();
    const start=scrollY+rect.top-150;
    const end=start+content.offsetHeight-innerHeight*.45;
    const pct=Math.max(0,Math.min(100,Math.round((scrollY-start)/Math.max(1,end-start)*100)));
    bar.style.width=`${pct}%`;pctEl.textContent=`${pct}%`;
  };
  addEventListener('scroll',update,{passive:true});addEventListener('resize',update,{passive:true});
  addCleanup(()=>{removeEventListener('scroll',update);removeEventListener('resize',update)});update();
}

function bindOutline(outline,root){
  const host=$('[data-lesson-outline]',root);if(!host)return;
  host.innerHTML=outline.map((x,i)=>`<a href="#${x.id}" data-outline-link="${x.id}"><span>${String(i+1).padStart(2,'0')}</span>${esc(x.label)}</a>`).join('');
  host.addEventListener('click',e=>{const link=e.target.closest('a');if(!link)return;e.preventDefault();document.getElementById(link.getAttribute('href').slice(1))?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})});
  if(!('IntersectionObserver'in window))return;
  const io=new IntersectionObserver(entries=>{
    const visible=entries.filter(x=>x.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
    if(!visible)return;
    $$('[data-outline-link]',host).forEach(a=>a.classList.toggle('is-active',a.dataset.outlineLink===visible.target.id));
  },{rootMargin:'-22% 0px -65% 0px',threshold:[0,.2,.6]});
  outline.forEach(x=>io.observe(x.el));addCleanup(()=>io.disconnect());
}

function enhanceLesson(){
  const id=lessonRoute(),main=$('main');
  if(!id){if(activeId)teardown();return}
  const lesson=lessonById(id),course=lesson?courseById(lesson.course):null;
  if(!lesson||!course||!main)return;
  if(main.dataset.revampLesson===id)return;
  teardown();activeId=id;main.dataset.revampLesson=id;
  main.className=`bp-lesson-page bp-lesson-page--${course.accent}`;
  document.body.dataset.lessonCourse=course.id;document.body.dataset.lessonTopic=lesson.topic;

  const all=lessonsForCourse(course.id),index=all.findIndex(x=>x.id===lesson.id),progress=load();
  const topicTitle=course.topics.find(t=>t.id===lesson.topic)?.title||lesson.topic;
  const head=$('.page-head',main),section=$('.deep-lesson',main),content=$('.lesson-content',section),side=$('.lesson-nav',section);
  if(!section||!content||!side)return;

  decorateHero(head,lesson,course,topicTitle,index,all.length);
  section.classList.add('bp-lesson-stage');
  section.insertAdjacentHTML('beforebegin',renderRibbon(lesson,course,index,all.length,progress));
  side.className='lesson-nav bp-lesson-side';
  side.innerHTML=compactLessonNav(lesson,course,progress);
  content.classList.add('bp-lesson-reader');
  const outline=buildOutline(content);

  const brief=$('.lesson-brief-grid',content);if(brief)brief.classList.add('bp-lesson-briefing');
  const meta=$('.lesson-meta',content);if(meta)meta.classList.add('bp-lesson-meta');
  $$('.lesson-block',content).forEach((block,i)=>block.style.setProperty('--lesson-section-index',i+1));
  $$('.question-card',content).forEach(q=>q.classList.add('bp-lesson-question'));
  const complete=$('.lesson-complete',content);if(complete)complete.classList.add('bp-lesson-gate');

  bindFocus(main);bindMap(main);bindReadingProgress(content,main);bindOutline(outline,main);
  const refresh=()=>setTimeout(()=>updateLiveMastery(lesson,main),40);
  content.addEventListener('click',refresh,true);content.addEventListener('keydown',e=>{if(e.key==='Enter')refresh()},true);
  updateLiveMastery(lesson,main);
}

let queued=false;
function apply(){queued=false;enhanceLesson()}
function queueApply(){if(queued)return;queued=true;queueMicrotask(apply)}
const app=$('#app');if(app)new MutationObserver(queueApply).observe(app,{childList:true,subtree:true});
addEventListener('hashchange',()=>setTimeout(apply,0));
apply();
