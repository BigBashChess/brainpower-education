import {WHATS_NEW} from './data/site.js';

const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
let observer;

function updateModal(){
  let modal=document.querySelector('#update-log-modal');
  if(modal)return modal;
  modal=document.createElement('dialog');
  modal.id='update-log-modal';
  modal.className='bp-modal';
  modal.innerHTML=`<div class="bp-modal-head"><div><small>CHANGELOG</small><h2>Brainpower update log</h2></div><button class="modal-close" aria-label="Close update log">×</button></div><div class="bp-modal-list">${WHATS_NEW.map((n,i)=>`<article><div class="update-index">${String(i+1).padStart(2,'0')}</div><div><small>${esc(n.date)}</small><h3>${esc(n.title)}</h3><p>${esc(n.text)}</p></div></article>`).join('')}</div>`;
  document.body.appendChild(modal);
  modal.querySelector('.modal-close').onclick=()=>modal.close();
  modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
  return modal;
}

function enhanceHome(){
  if(location.hash && !location.hash.startsWith('#home'))return;
  const testHeading=[...document.querySelectorAll('.section-title h2')].find(x=>x.textContent.includes('Real Brainpower assessments'));
  if(testHeading){
    testHeading.textContent='Latest releases';
    const section=testHeading.closest('.section');
    const desc=section?.querySelector('.section-title p');
    if(desc)desc.textContent='The newest Brainpower assessments. The full library lives in the Test Centre.';
    const cards=[...section.querySelectorAll('.test-card')];
    cards.forEach((c,i)=>c.classList.toggle('home-test-hidden',i>=3));
  }
  const news=document.querySelector('.dark-section');
  if(news){
    const cards=[...news.querySelectorAll('.news-grid article')];
    cards.forEach((c,i)=>c.classList.toggle('home-news-hidden',i>=3));
    if(!news.querySelector('.update-log-button')){
      const btn=document.createElement('button');
      btn.className='btn update-log-button'; btn.textContent='View full update log';
      btn.onclick=()=>updateModal().showModal();
      news.appendChild(btn);
    }
  }
}

function reveal(){
  observer?.disconnect();
  observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -35px'});
  document.querySelectorAll('main .section, main .card, main .course-card, main .test-card, main .topic-node, main .flow-step, main .resource-card').forEach((el,i)=>{
    if(el.classList.contains('home-test-hidden')||el.classList.contains('home-news-hidden'))return;
    el.classList.add('reveal-item'); el.style.setProperty('--reveal-delay',`${Math.min(i%5,4)*45}ms`); observer.observe(el);
  });
}

function pointerEffects(){
  document.querySelectorAll('.course-card,.test-card,.flow-step,.topic-node,.resource-card').forEach(card=>{
    if(card.dataset.motionBound)return; card.dataset.motionBound='1';
    card.addEventListener('pointermove',e=>{if(matchMedia('(hover:hover)').matches){const r=card.getBoundingClientRect();card.style.setProperty('--mx',`${e.clientX-r.left}px`);card.style.setProperty('--my',`${e.clientY-r.top}px`)}});
  });
}

function enhance(){
  requestAnimationFrame(()=>{enhanceHome();reveal();pointerEffects()});
}

const root=document.querySelector('#app');
if(root)new MutationObserver(enhance).observe(root,{childList:true,subtree:false});
window.addEventListener('hashchange',enhance);
enhance();
