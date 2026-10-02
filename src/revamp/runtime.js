import {courses,courseById} from '../data/courses.js';
import {lessons,lessonsForCourse} from '../data/lessons.js';
import {WHATS_NEW} from '../data/site.js';
import {load} from '../progress/store.js';
import {courseMastery} from '../utils.js';

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const baseRoute=()=>((location.hash.slice(1)||'home').split(/[/?]/)[0]||'home');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function nextLesson(progress){return lessons.find(l=>!progress.completedLessons.includes(l.id))||lessons[0]}
function courseProgress(course,progress){
  const rows=lessonsForCourse(course.id);
  const done=rows.filter(l=>progress.completedLessons.includes(l.id)).length;
  const pct=courseMastery(course.id,progress);
  return {rows,done,pct,next:rows.find(l=>!progress.completedLessons.includes(l.id))||rows[0]};
}
function sectionByEyebrow(text){return $$('.section').find(s=>$('.eyebrow',s)?.textContent.trim().toUpperCase()===text)}
function sectionHead(eyebrow,title,copy,right=''){return `<div class="bp-home-section__head"><div><small>${eyebrow}</small><h2>${title}</h2><p>${copy}</p></div>${right}</div>`}

function buildHero(progress){
  const next=nextLesson(progress);
  return `<div class="bp-home-hero__art" aria-hidden="true"></div><div class="bp-home-hero__inner">
    <div class="bp-home-hero__copy">
      <div class="bp-home-kicker">Welcome to</div>
      <h1>Brainpower <em>Education</em></h1>
      <p>VCE Mathematics, Physics and serious practice — connected in one immersive study environment.</p>
      <div class="bp-home-actions"><a class="btn primary large" href="#lesson/${next?.id||''}">Continue Learning →</a><a class="btn secondary large" href="#learn">Explore Courses</a></div>
      <div class="bp-home-proof"><span>Structured mastery courses</span><span>Formal Brainpower assessments</span><span>Progress saved locally</span></div>
    </div>
    <div class="bp-home-subjects" aria-label="Featured subjects">
      <a class="bp-home-subject bp-home-subject--methods" href="#course/methods-12"><div class="bp-home-subject__copy"><span class="bp-home-subject__eyebrow">MATHEMATICAL</span><h2>Methods</h2><p>Units 1 & 2 • Units 3 & 4</p><span class="bp-home-subject__cta">Enter pathway →</span></div></a>
      <a class="bp-home-subject bp-home-subject--specialist" href="#course/specialist-12"><div class="bp-home-subject__copy"><span class="bp-home-subject__eyebrow">SPECIALIST</span><h2>Mathematics</h2><p>Units 1 & 2 • Units 3 & 4</p><span class="bp-home-subject__cta">Enter pathway →</span></div></a>
      <a class="bp-home-subject bp-home-subject--physics" href="#course/physics-12"><div class="bp-home-subject__copy"><span class="bp-home-subject__eyebrow">VCE</span><h2>Physics</h2><p>Units 1 & 2 • Four Areas of Study</p><span class="bp-home-subject__cta">Enter pathway →</span></div></a>
    </div>
  </div>`;
}

function buildQuick(){
  const rows=[['#learn','▣','Lessons','Structured learning paths'],['#practice','✎','Practice','Target topics or mix questions'],['#tests','▤','Test Centre','Formal Brainpower assessments'],['#resources','▰','Resources','Notes, sheets and references'],['#arcade','◆','Arcade','A deliberate study break']];
  return `<div class="bp-home-quick__inner"><div class="bp-home-section-label"><strong>Quick Access</strong><span>Jump straight back into the platform</span></div><div class="bp-home-quick__grid">${rows.map(([href,icon,title,copy])=>`<a class="bp-home-quick-card" href="${href}"><span class="bp-home-quick-card__icon">${icon}</span><span><strong>${title}</strong><small>${copy}</small></span><span>›</span></a>`).join('')}</div></div>`;
}

function buildDashboard(progress){
  const next=nextLesson(progress),course=courseById(next?.course),cp=course?courseProgress(course,progress):null;
  return `<section class="bp-home-dashboard" data-revamp-dashboard>
    <a class="bp-home-resume" href="#lesson/${next?.id||''}"><div><small>PICK UP WHERE YOU LEFT OFF</small><h3>${esc(next?.title||'Start your first lesson')}</h3><p>${course?esc(course.short):'Brainpower course'}${next?.minutes?` • ${next.minutes} min`:''}${next?.difficulty?` • ${esc(next.difficulty)}`:''}</p><div class="bp-home-resume__progress"><span style="width:${cp?.pct||0}%"></span></div></div><span class="bp-home-resume__arrow">→</span></a>
    <div class="bp-home-explore"><small>EXPLORE ALL SUBJECTS</small><div class="bp-home-explore__grid"><a href="#course/methods-12"><b>ƒ</b><span>Methods 1/2</span></a><a href="#course/specialist-12"><b>Σ</b><span>Specialist 1/2</span></a><a href="#course/physics-12"><b>λ</b><span>Physics 1/2</span></a><a href="#learn"><b>＋</b><span>All courses</span></a></div></div>
  </section>`;
}

function buildCourses(progress){return `${sectionHead('COURSES','Five serious learning pathways','Start from the beginning, resume an active course or jump straight to a topic.',`<a class="btn ghost" href="#learn">Open Learn →</a>`)}<div class="bp-home-courses">${courses.map(c=>{const cp=courseProgress(c,progress);const icon=c.accent==='specialist'?'Σ':c.accent==='physics'?'λ':'ƒ';return `<a class="bp-home-course ${c.accent}" href="#course/${c.id}"><span class="bp-home-course__icon">${icon}</span><h3>${esc(c.title)}</h3><p>${esc(c.desc)}</p><div class="bp-home-course__meta"><span><b>${cp.done}/${cp.rows.length}</b><i>lessons</i></span><div class="bp-home-course__bar"><i style="width:${cp.pct}%"></i></div><span><b>${cp.pct}%</b><i>mastery</i></span></div></a>`}).join('')}</div>`}

function buildTestPortal(){return `<div class="bp-home-test-portal"><div><small>TEST CENTRE</small><h2>Ready to test it properly?</h2><p>Open the complete Brainpower assessment library, including mock examinations, topic tests, marking schemes and Exam Mode where supported.</p></div><a class="btn primary large" href="#tests">Explore the Test Centre →</a></div>`}
function buildNews(){return `${sectionHead("WHAT'S NEW",'Recent Brainpower releases','Only the latest meaningful platform changes live on Home.',`<button class="btn ghost" type="button" data-update-log-open>Full update log</button>`)}<div class="bp-home-news">${WHATS_NEW.slice(0,3).map(n=>`<article><small>${esc(n.date)}</small><h3>${esc(n.title)}</h3><p>${esc(n.text)}</p></article>`).join('')}</div>`}

function applyHome(){
  const main=$('main'); if(!main)return;
  const route=baseRoute();
  document.body.dataset.route=route;
  if(route!=='home'){main.classList.remove('bp-home');return}
  main.classList.add('bp-home');
  const progress=load();

  const hero=$('.hero',main);
  if(hero&&!hero.dataset.revamp){hero.dataset.revamp='1';hero.className='bp-home-hero';hero.innerHTML=buildHero(progress);bindParallax(hero)}

  const quick=$('.quick-stats',main);
  if(quick&&!quick.dataset.revamp){quick.dataset.revamp='1';quick.className='bp-home-quick';quick.innerHTML=buildQuick();quick.insertAdjacentHTML('afterend',buildDashboard(progress))}

  const learn=sectionByEyebrow('LEARN');
  if(learn&&!learn.dataset.revamp){learn.dataset.revamp='1';learn.className='bp-home-section';learn.innerHTML=buildCourses(progress)}

  const daily=sectionByEyebrow('DAILY BRAINPOWER');
  if(daily&&!daily.dataset.revamp){daily.dataset.revamp='1';daily.className='bp-home-section';const head=$('.section-title',daily);if(head)head.className='bp-home-section__head';const layout=$('.daily-layout',daily);if(layout)layout.classList.add('bp-home-daily');const aside=$('.daily-side',daily);if(aside){aside.classList.remove('card');aside.classList.add('bp-home-daily__aside')}}

  const tests=sectionByEyebrow('TEST CENTRE');
  if(tests&&!tests.dataset.revamp){tests.dataset.revamp='1';tests.className='bp-home-section';tests.innerHTML=buildTestPortal()}

  const news=sectionByEyebrow("WHAT'S NEW");
  if(news&&!news.dataset.revamp){news.dataset.revamp='1';news.className='bp-home-section';news.innerHTML=buildNews()}

  const community=$('.community-strip',main);
  if(community&&!community.dataset.revamp){community.dataset.revamp='1';community.className='bp-home-community';const actions=$('.hero-actions',community);if(actions)actions.className='bp-home-community__actions'}
}

function bindParallax(hero){
  if(hero.dataset.parallaxBound)return;hero.dataset.parallaxBound='1';
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--home-x',((e.clientX-r.left)/r.width-.5).toFixed(3));hero.style.setProperty('--home-y',((e.clientY-r.top)/r.height-.5).toFixed(3))});
  hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--home-x','0');hero.style.setProperty('--home-y','0')});
}

function applyShell(){
  document.body.dataset.route=baseRoute();
  const header=$('[data-shell-header]');if(header)header.classList.toggle('is-scrolled',scrollY>12);
  const menu=$('#menu-toggle'),sheet=$('#mobile-nav');
  if(menu&&sheet&&!menu.dataset.revampBound){menu.dataset.revampBound='1';menu.addEventListener('click',()=>queueMicrotask(()=>menu.setAttribute('aria-expanded',String(!sheet.hidden))))}
}

let queued=false;
function apply(){queued=false;applyShell();applyHome()}
function queueApply(){if(queued)return;queued=true;queueMicrotask(apply)}

addEventListener('scroll',()=>{const header=$('[data-shell-header]');if(header)header.classList.toggle('is-scrolled',scrollY>12)},{passive:true});
addEventListener('hashchange',queueApply);
new MutationObserver(queueApply).observe($('#app')||document.body,{childList:true,subtree:true});
apply();
