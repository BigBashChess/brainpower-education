import {courses,courseById} from '../data/courses.js';
import {lessons,lessonsForCourse} from '../data/lessons.js';
import {practiceQuestions} from '../data/questions.js';
import {tests} from '../data/tests.js';
import {load,levelForXp} from '../progress/store.js';
import {learningAction} from '../progress/learning-state.js';
import {courseMastery} from '../utils.js';

const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const route=()=>((location.hash.slice(1)||'home').split(/[/?]/)[0]||'home');

function courseStats(c,p){
  const rows=lessonsForCourse(c.id);
  const done=rows.filter(l=>p.completedLessons.includes(l.id)).length;
  const qs=practiceQuestions.filter(q=>q.course===c.id);
  const solved=qs.filter(q=>p.correctQuestions.includes(q.id)).length;
  const action=learningAction(p,c.id),next=action.lesson;
  return {rows,done,action,questions:qs.length,solved,next,mastery:courseMastery(c.id,p),tests:tests.filter(t=>t.course===c.id).length};
}

function courseCard(c,p){
  const s=courseStats(c,p);
  const icon=c.accent==='specialist'?'Σ':c.accent==='physics'?'λ':'ƒ';
  const level=c.short.includes('3/4')?'Units 3 & 4':c.short.includes('1/2')?'Units 1 & 2':'';
  return `<article class="bp-learn-course bp-learn-course--${c.accent}">
    <div class="bp-learn-course__top"><div class="bp-learn-course__icon">${icon}</div><div><small>${esc(c.short)}</small><h3>${esc(c.title)}</h3></div></div>
    <p>${esc(c.desc)}</p>
    <div class="bp-learn-course__progress"><div><span>Course mastery</span><b>${s.mastery}%</b></div><div class="bp-learn-course__bar"><i style="width:${s.mastery}%"></i></div></div>
    <div class="bp-learn-course__stats"><span><b>${s.done}/${s.rows.length}</b><small>lessons</small></span><span><b>${s.solved}/${s.questions}</b><small>questions</small></span><span><b>${s.tests}</b><small>tests</small></span></div>
    <div class="bp-learn-course__actions"><a class="btn primary" href="#course/${c.id}">Open pathway →</a><a class="bp-learn-course__continue" href="${s.action.href}">${esc(s.action.label)}</a></div>
  </article>`;
}

function familyBlock(name,kicker,copy,rows,p,accent){
  return `<section class="bp-learn-family bp-learn-family--${accent}">
    <div class="bp-learn-family__head"><div><small>${kicker}</small><h2>${name}</h2><p>${copy}</p></div><span class="bp-learn-family__count">${rows.length} ${rows.length===1?'pathway':'pathways'}</span></div>
    <div class="bp-learn-family__grid">${rows.map(c=>courseCard(c,p)).join('')}</div>
  </section>`;
}

function renderLearn(){
  if(route()!=='learn')return;
  const main=$('main'); if(!main||main.dataset.revampLearn==='1')return;
  main.dataset.revampLearn='1';
  main.classList.add('bp-learn-page');

  const p=load();
  const level=levelForXp(p.xp);
  const completed=p.completedLessons.length;
  const solved=p.correctQuestions.length;
  const action=learningAction(p),next=action.lesson;
  const nextCourse=next?courseById(next.course):null;
  const allMastery=Math.round(courses.reduce((sum,c)=>sum+courseMastery(c.id,p),0)/Math.max(courses.length,1));
  const methods=courses.filter(c=>c.accent==='methods');
  const specialist=courses.filter(c=>c.accent==='specialist');
  const physics=courses.filter(c=>c.accent==='physics');

  main.innerHTML=`
  <section class="bp-learn-hero">
    <div class="bp-learn-hero__art" aria-hidden="true"></div>
    <div class="bp-learn-hero__shade" aria-hidden="true"></div>
    <div class="bp-learn-hero__inner">
      <div class="bp-learn-hero__copy">
        <div class="bp-learn-kicker">LEARN</div>
        <h1>Choose a pathway.<br><em>Build real mastery.</em></h1>
        <p>Five structured VCE courses connect explanation, worked examples, practice, checkpoints and formal assessment into one learning system.</p>
        <div class="bp-learn-hero__actions"><a class="btn primary large" href="${action.href}">${action.kind==='fresh'?'Start learning →':action.kind==='complete'?'Review progress →':'Continue learning →'}</a><a class="btn secondary large" href="#progress">View progress</a></div>
        <div class="bp-learn-hero__meta"><span>${courses.length} course pathways</span><span>${lessons.length} lessons</span><span>${practiceQuestions.length} practice questions</span></div>
      </div>
      <aside class="bp-learn-resume">
        <small>${action.kind==='fresh'?'YOUR FIRST STEP':action.kind==='complete'?'PATHWAYS COMPLETE':'YOUR NEXT STEP'}</small>
        <div class="bp-learn-resume__icon">${nextCourse?.accent==='specialist'?'Σ':nextCourse?.accent==='physics'?'λ':'ƒ'}</div>
        <h2>${esc(action.title)}</h2>
        <p>${esc(nextCourse?.short||'Brainpower')} ${next?.minutes?`• ${next.minutes} min`:''} ${next?.difficulty?`• ${esc(next.difficulty)}`:''}</p>
        <a href="${action.href}">${action.kind==='complete'?'Review progress':action.kind==='fresh'?'Start lesson':'Open lesson'} <span>→</span></a>
      </aside>
    </div>
  </section>

  <section class="bp-learn-snapshot">
    <div class="bp-learn-snapshot__intro"><small>YOUR LEARNING SNAPSHOT</small><h2>Everything you do feeds one progress system.</h2><p>Lessons, question-bank work and formal tests all contribute to your course picture.</p></div>
    <div class="bp-learn-metric"><strong>${allMastery}%</strong><span>overall mastery</span></div>
    <div class="bp-learn-metric"><strong>${completed}</strong><span>lessons completed</span></div>
    <div class="bp-learn-metric"><strong>${solved}</strong><span>questions solved</span></div>
    <div class="bp-learn-metric"><strong>${p.streak}</strong><span>day streak</span></div>
    <div class="bp-learn-metric"><strong>LVL ${level}</strong><span>${p.xp} XP earned</span></div>
  </section>

  <section class="bp-learn-pathways">
    <div class="bp-learn-section-head"><div><small>PATHWAYS</small><h2>Pick the course that matches where you are.</h2><p>The visual system changes by subject, but the mastery standard stays consistent.</p></div><a class="btn ghost" href="#practice">Jump to practice →</a></div>
    ${familyBlock('Mathematical Methods','FUNCTIONS • CALCULUS • PROBABILITY','Build the core mathematical language of VCE, then push it into exam-level application and interpretation.',methods,p,'methods')}
    ${familyBlock('Specialist Mathematics','PROOF • COMPLEX • VECTORS • CALCULUS','A more rigorous pathway built around deeper structure, multi-step reasoning and high-end VCAA-style separation.',specialist,p,'specialist')}
    ${familyBlock('Physics','LIGHT • NUCLEAR • ELECTRICITY • MOTION','A concept-first Physics pathway organised by VCAA Areas of Study, with modelling, calculations and practical reasoning.',physics,p,'physics')}
  </section>

  <section class="bp-learn-system">
    <div class="bp-learn-section-head"><div><small>THE BRAINPOWER LOOP</small><h2>Learn → Practise → Test → Review.</h2><p>Use the whole system for a new topic, or jump directly to the stage you need.</p></div></div>
    <div class="bp-learn-flow">
      <a href="#learn"><span>01</span><div><b>Understand</b><p>Build intuition, definitions, derivations and worked examples.</p></div><i>→</i></a>
      <a href="#practice"><span>02</span><div><b>Practise</b><p>Target a topic, difficulty or weak area with the question bank.</p></div><i>→</i></a>
      <a href="#tests"><span>03</span><div><b>Test</b><p>Use formal assessments and Exam Mode under pressure.</p></div><i>→</i></a>
      <a href="#progress"><span>04</span><div><b>Review</b><p>See mastery, test history and the next useful move.</p></div><i>→</i></a>
    </div>
  </section>`;

  const hero=$('.bp-learn-hero',main);
  if(hero&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--learn-x',((e.clientX-r.left)/r.width-.5).toFixed(3));hero.style.setProperty('--learn-y',((e.clientY-r.top)/r.height-.5).toFixed(3))});
    hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--learn-x','0');hero.style.setProperty('--learn-y','0')});
  }
}

function apply(){renderLearn()}
const app=$('#app');if(app)new MutationObserver(()=>queueMicrotask(apply)).observe(app,{childList:true,subtree:true});
addEventListener('hashchange',()=>setTimeout(apply,0));
apply();
