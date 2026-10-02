import {load} from '../progress/store.js';
import {courses} from '../data/courses.js';
import {lessonsForCourse} from '../data/lessons.js';
import {practiceQuestions} from '../data/questions.js';
import {courseMastery} from '../utils.js';

if(!document.querySelector('link[data-bp-progress]')){
  const link=document.createElement('link');link.rel='stylesheet';link.href='src/styles/revamp/progress.css';link.dataset.bpProgress='1';document.head.appendChild(link);
}
const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const route=()=>((location.hash.slice(1)||'home').split('?')[0].split('/')[0]||'home');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function courseRows(p){return courses.map(c=>{
  const lessons=lessonsForCourse(c.id),done=lessons.filter(l=>p.completedLessons.includes(l.id)).length;
  const q=practiceQuestions.filter(x=>x.course===c.id),solved=q.filter(x=>p.correctQuestions.includes(x.id)).length;
  const unresolved=q.filter(x=>p.attemptedQuestions?.[x.id]&&!p.correctQuestions.includes(x.id)).length;
  return {c,done,total:lessons.length,solved,qTotal:q.length,unresolved,mastery:courseMastery(c.id,p)};
})}
function activeDays(p){
  const set=new Set((p.activityDays||[]).map(String));const now=new Date();const rows=[];
  for(let i=13;i>=0;i--){const d=new Date(now);d.setDate(now.getDate()-i);const iso=d.toISOString().slice(0,10);rows.push({iso,day:d.toLocaleDateString('en-AU',{weekday:'short'}).slice(0,1),active:set.has(iso)})}
  return rows;
}
function levelInfo(p){const level=Math.max(1,Math.floor((Number(p.xp)||0)/250)+1),prev=(level-1)*250,next=level*250,pct=Math.max(0,Math.min(100,Math.round(((p.xp-prev)/(next-prev))*100)));return {level,prev,next,pct,left:Math.max(0,next-p.xp)}}

function enhance(main){
  const p=load(),rows=courseRows(p),lvl=levelInfo(p);
  main.className='bp-progress-page';
  const head=$('.page-head',main);if(head){
    head.classList.add('bp-progress-hero');
    const inner=$('.page-head-inner',head),copy=inner?.firstElementChild;
    if(copy){
      $('.eyebrow',copy).textContent='YOUR BRAINPOWER OBSERVATORY';
      $('h1',copy).textContent='See what is actually improving.';
      $('p',copy).textContent='Mastery, consistency, assessment history and the next useful move — all from progress saved on this browser.';
      copy.insertAdjacentHTML('beforeend',`<div class="bp-progress-hero__level"><span>LEVEL <b>${lvl.level}</b></span><div><i style="width:${lvl.pct}%"></i></div><small>${lvl.left} XP to Level ${lvl.level+1}</small></div><div class="bp-progress-hero__chips"><span><b>${p.xp}</b> XP</span><span><b>${p.streak||0}</b> day streak</span><span><b>${p.completedLessons.length}</b> lessons</span><span><b>${p.correctQuestions.length}</b> solved</span></div>`);
    }
    inner?.insertAdjacentHTML('beforeend','<div class="bp-progress-hero__brainy" aria-hidden="true"><img src="public/brand/brainy-celebrate.svg" alt=""></div>');
  }

  const section=$('.section',main);if(!section)return;section.classList.add('bp-observatory');
  const banner=$('.profile-banner',section);if(banner)banner.classList.add('bp-observatory__profile');
  const actions=$('.next-actions',section);if(actions)actions.classList.add('bp-observatory__actions');
  const grid=$('.dashboard-grid',section);if(grid)grid.classList.add('bp-observatory__grid');
  $$('.dashboard-card',section).forEach(x=>x.classList.add('bp-observatory-card'));
  $$('.next-action',section).forEach(x=>x.classList.add('bp-observatory-action'));
  $$('.mastery-row',section).forEach(x=>x.classList.add('bp-orbit-row'));
  $$('.achievement',section).forEach(x=>x.classList.add('bp-achievement'));

  if(!$('.bp-progress-pulse',section)){
    const days=activeDays(p),strongest=[...rows].sort((a,b)=>b.mastery-a.mastery)[0],review=[...rows].sort((a,b)=>b.unresolved-a.unresolved)[0];
    const pulse=`<div class="bp-progress-pulse">
      <article class="bp-pulse-card"><small>14-DAY STUDY PULSE</small><div class="bp-pulse-days">${days.map(d=>`<span class="${d.active?'is-active':''}" title="${d.iso}"><i></i><b>${d.day}</b></span>`).join('')}</div><p>${days.filter(d=>d.active).length} active day${days.filter(d=>d.active).length===1?'':'s'} in the last two weeks.</p></article>
      <article class="bp-pulse-card"><small>STRONGEST SIGNAL</small><h3>${esc(strongest?.c.short||'Start a course')}</h3><strong>${strongest?.mastery||0}% mastery</strong><a href="#course/${strongest?.c.id||'methods-12'}">Open pathway →</a></article>
      <article class="bp-pulse-card"><small>REVIEW PRESSURE</small><h3>${review?.unresolved?esc(review.c.short):'Clear'}</h3><strong>${review?.unresolved||0} unresolved</strong><a href="#practice?course=${review?.c.id||'all'}">Review questions →</a></article>
    </div>`;
    (actions||banner)?.insertAdjacentHTML('afterend',pulse);
  }

  // Replace vague legacy "four pathways" label with the real current course count.
  const masteryCard=$('.dashboard-card',section);const heading=masteryCard?.querySelector('h3');if(heading)heading.textContent=`Your ${rows.length} pathways`;
  const reset=$('#reset-progress',section);if(reset){reset.classList.add('bp-progress-reset');reset.insertAdjacentHTML('beforebegin','<p class="bp-progress-reset-note">Progress lives only in this browser. Resetting is permanent.</p>')}
}

function apply(){if(route()!=='progress')return;const main=$('main');if(!main||main.dataset.bpProgress==='1')return;main.dataset.bpProgress='1';enhance(main)}
let queued=false;const queue=()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;apply()})};
const app=$('#app');if(app)new MutationObserver(queue).observe(app,{childList:true,subtree:true});addEventListener('hashchange',()=>setTimeout(apply,0));apply();
