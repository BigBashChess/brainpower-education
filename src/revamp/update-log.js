import {WHATS_NEW} from '../data/site.js';

const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let modal=null,lastFocus=null,keyHandler=null;

function closeLog(){
  if(!modal)return;
  document.querySelector('.shell')?.removeAttribute('inert');
  document.body.classList.remove('bp-modal-open');
  document.removeEventListener('keydown',keyHandler);
  modal.remove();modal=null;
  if(lastFocus?.isConnected)lastFocus.focus({preventScroll:true});
}

function trapFocus(e){
  if(e.key==='Escape'){e.preventDefault();closeLog();return}
  if(e.key!=='Tab'||!modal)return;
  const focusable=[...modal.querySelectorAll('button,a,[tabindex]:not([tabindex="-1"])')].filter(el=>!el.disabled&&el.offsetParent!==null);
  if(!focusable.length)return;
  const first=focusable[0],last=focusable[focusable.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus({preventScroll:true})}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus({preventScroll:true})}
}

function openLog(trigger){
  if(modal)return;
  lastFocus=trigger||document.activeElement;
  modal=document.createElement('div');
  modal.className='bp-modal-backdrop';
  modal.innerHTML=`<section class="bp-update-log" role="dialog" aria-modal="true" aria-labelledby="bp-update-log-title">
    <header class="bp-update-log__header"><div><small>CHANGELOG</small><h2 id="bp-update-log-title">Brainpower update log</h2><p>The recent build history, newest first.</p></div><button class="bp-modal-close" type="button" data-update-log-close aria-label="Close update log">×</button></header>
    <div class="bp-update-log__list">${WHATS_NEW.map((item,i)=>`<article${i===0?' class="latest"':''}><div><time>${esc(item.date)}</time>${i===0?'<span>Latest</span>':''}</div><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join('')}</div>
    <footer class="bp-update-log__footer"><span>${WHATS_NEW.length} logged updates</span><button class="btn primary" type="button" data-update-log-close>Done</button></footer>
  </section>`;
  document.body.appendChild(modal);
  document.body.classList.add('bp-modal-open');
  document.querySelector('.shell')?.setAttribute('inert','');
  modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('[data-update-log-close]'))closeLog()});
  keyHandler=trapFocus;document.addEventListener('keydown',keyHandler);
  requestAnimationFrame(()=>modal?.querySelector('.bp-modal-close')?.focus({preventScroll:true}));
}

function bind(){
  document.querySelectorAll('[data-update-log-open],[data-open-update-log]').forEach(btn=>{
    if(btn.dataset.updateLogBound)return;
    btn.dataset.updateLogBound='1';
    btn.addEventListener('click',()=>openLog(btn));
  });
}

const app=$('#app');if(app)new MutationObserver(()=>queueMicrotask(bind)).observe(app,{childList:true,subtree:true});
addEventListener('hashchange',()=>{closeLog();setTimeout(bind,0)});
bind();
