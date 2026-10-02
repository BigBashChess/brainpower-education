import {resources} from '../data/resources.js';
import {courses} from '../data/courses.js';
import {load} from '../progress/store.js';

if(!document.querySelector('link[data-bp-resources-tools]')){
  const link=document.createElement('link');
  link.rel='stylesheet';
  link.href='src/styles/revamp/resources-tools.css';
  link.dataset.bpResourcesTools='1';
  document.head.appendChild(link);
}

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const route=()=>((location.hash.slice(1)||'home').split('?')[0].split('/')[0]||'home');

const RESOURCE_TYPES=[...new Set(resources.map(r=>r.type))];
const COURSE_NAME=id=>courses.find(c=>c.id===id)?.short||'Other';

function resourceStats(){
  const p=load();
  const saved=resources.filter(r=>p.bookmarks?.includes(r.id)).length;
  return {total:resources.length,types:RESOURCE_TYPES.length,saved};
}

function setHero(main,kind){
  const head=$('.page-head',main); if(!head)return;
  head.classList.add('bp-utility-hero',`bp-utility-hero--${kind}`);
  const inner=$('.page-head-inner',head); if(!inner)return;
  const copy=inner.firstElementChild;
  const title=$('h1',copy),desc=$('p',copy),eyebrow=$('.eyebrow',copy);
  if(kind==='resources'){
    eyebrow.textContent='THE BRAINPOWER ARCHIVE';
    title.textContent='Find the exact resource you need.';
    desc.textContent='Tests, marking schemes, revision packs and challenge material — organised as one searchable study archive.';
    const st=resourceStats();
    copy.insertAdjacentHTML('beforeend',`<div class="bp-utility-hero__stats"><span><b>${st.total}</b> resources</span><span><b>${st.types}</b> formats</span><span><b>${st.saved}</b> saved</span></div><div class="bp-utility-hero__actions"><a class="btn primary" href="#tests">Open Test Centre →</a><a class="btn ghost" href="#practice">Practice instead</a></div>`);
  }else{
    eyebrow.textContent='BRAINPOWER LAB';
    title.textContent='Small tools. Zero friction.';
    desc.textContent='Fast browser utilities for checking scores, exact values, vectors, focus sessions and instant practice.';
    copy.insertAdjacentHTML('beforeend',`<div class="bp-utility-hero__stats"><span><b>6</b> live utilities</span><span><b>0</b> accounts needed</span><span><b>100%</b> in-browser</span></div><div class="bp-utility-hero__actions"><a class="btn primary" href="#practice">Start practice →</a><a class="btn ghost" href="#resources">Open archive</a></div>`);
  }
  inner.insertAdjacentHTML('beforeend',`<div class="bp-utility-hero__brainy" aria-hidden="true"><img src="public/brand/${kind==='resources'?'brainy-study.svg':'brainy-thinking.svg'}" alt=""></div>`);
}

function decorateResourceCards(main){
  const list=$('#vault-list',main);if(!list)return;
  list.classList.add('bp-archive__grid');
  $$('.resource-card',list).forEach((card,i)=>{
    card.classList.add('bp-archive-card');
    if(card.dataset.bpArchiveDecorated==='1')return;
    card.dataset.bpArchiveDecorated='1';
    const id=card.dataset.resource;
    const r=resources.find(x=>x.id===id);
    if(!r)return;
    card.dataset.type=r.type;
    card.dataset.course=r.course;
    const img=$('img',card); if(img){img.loading='lazy';img.decoding='async'}
    const body=card.lastElementChild;
    body?.insertAdjacentHTML('afterbegin',`<div class="bp-archive-card__index">${String(i+1).padStart(2,'0')}</div>`);
    $('.meta',card)?.insertAdjacentHTML('beforebegin',`<div class="bp-archive-card__course">${esc(COURSE_NAME(r.course))}</div>`);
  });
}

function enhanceResources(main){
  main.className='bp-resources-page';
  setHero(main,'resources');
  const section=$('.vault-section',main); if(!section)return;
  section.classList.add('bp-archive');
  const top=$('.vault-topline',section), filters=$('.filter-panel',section), note=$('.vault-note',section);
  if(top){
    top.classList.add('bp-archive__top');
    if(!$('.bp-archive__intro',top))top.querySelector('h2')?.insertAdjacentHTML('afterend','<p class="bp-archive__intro">Search by title or topic, then narrow by format and course. Saved items stay on this device.</p>');
  }
  filters?.classList.add('bp-archive__filters');
  note?.classList.add('bp-archive__note');
  decorateResourceCards(main);

  const chipHost=$('.vault-type-chips',section);
  if(chipHost&&!$('[data-bp-saved]',chipHost)){
    chipHost.insertAdjacentHTML('beforeend','<button class="vault-chip bp-saved-chip" type="button" data-bp-saved>★ Saved</button>');
    $('[data-bp-saved]',chipHost).addEventListener('click',()=>{
      const p=load(),saved=new Set(p.bookmarks||[]),list=$('#vault-list',main);
      const cards=$$('.resource-card',list);
      cards.forEach(c=>c.hidden=!saved.has(c.dataset.resource));
      const count=$('#vault-count',section);if(count)count.textContent=cards.filter(c=>!c.hidden).length;
      $$('.vault-chip',chipHost).forEach(x=>x.classList.toggle('active',x.dataset.bpSaved!==undefined));
    });
  }
}

function enhanceTools(main){
  main.className='bp-tools-page';
  setHero(main,'tools');
  const section=$('.section',main); if(!section)return;
  section.classList.add('bp-lab');
  const grid=$('.tool-grid',section); if(!grid)return;
  grid.classList.add('bp-lab__grid');
  const names=['Score converter','Target planner','Exact trig desk','Random drill','Focus timer','Vector bench'];
  const descriptions=[
    'Turn a raw mark into a percentage instantly.',
    'Work backwards from the percentage you want.',
    'Keep standard-angle values one tap away.',
    'Pull a question straight from the live bank.',
    'Protect one clean 25-minute study block.',
    'See a 2D vector, direction and magnitude.'
  ];
  $$('.tool-card',grid).forEach((card,i)=>{
    card.classList.add('bp-lab-card');
    if(card.dataset.bpLabDecorated==='1')return;
    card.dataset.bpLabDecorated='1';
    card.insertAdjacentHTML('afterbegin',`<div class="bp-lab-card__top"><span>${String(i+1).padStart(2,'0')}</span><small>${esc(names[i]||'Study tool')}</small></div>`);
    const p=$('p',card);if(p)p.textContent=descriptions[i]||p.textContent;
  });
  if(!$('.bp-lab__rail',section))section.insertAdjacentHTML('afterbegin',`<div class="bp-lab__rail"><div><span>LAB MODE</span><b>Pick a utility and keep moving.</b></div><div class="bp-lab__rail-links"><a href="#practice">Question bank</a><a href="#tests">Assessments</a><a href="#resources">Archive</a></div></div>`);
}

function apply(){
  const r=route();
  if(!['resources','tools'].includes(r))return;
  const main=$('main');if(!main)return;
  if(main.dataset.bpUtility===r){if(r==='resources')decorateResourceCards(main);return}
  main.dataset.bpUtility=r;
  if(r==='resources')enhanceResources(main);else enhanceTools(main);
}

let queued=false;
const queue=()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;apply()})};
const app=$('#app');if(app)new MutationObserver(queue).observe(app,{childList:true,subtree:true});
addEventListener('hashchange',()=>setTimeout(apply,0));
apply();
