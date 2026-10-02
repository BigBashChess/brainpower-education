const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

/* Upgrade the plain fallback immediately, before the app finishes rendering. */
function enhanceBoot(){
  const boot=$('.boot');if(!boot||boot.dataset.enhanced)return;
  boot.dataset.enhanced='1';boot.classList.add('bp-boot');
  boot.innerHTML=`<div class="bp-boot-inner"><div class="bp-boot-mark" aria-hidden="true">B</div><div class="bp-boot-title">Brainpower</div><div class="bp-boot-sub">Education</div><div class="bp-boot-track"><div class="bp-boot-bar"></div></div><div class="bp-boot-tip">Building your learning space…</div></div>`;
  const tips=['Building your learning space…','Warming up the neurons…','Loading lessons and practice…','Preparing maximum brainpower…'];let i=0;
  boot._tipTimer=setInterval(()=>{const t=$('.bp-boot-tip',boot);if(t)t.textContent=tips[++i%tips.length]},720);
}
enhanceBoot();

function cleanTestPreviews(){
  $$('.pdf-cover-wrap').forEach(w=>{w.classList.add('bp-clean-cover');const f=$('iframe',w);if(f){f.scrolling='no';f.setAttribute('scrolling','no')}});
}
function brainy(){
  const b=$('#brainy-companion'),img=b?.querySelector('img');if(!b||!img)return;
  img.src='public/brand/brainy.svg';img.dataset.moodSrc='public/brand/brainy.svg';b.classList.add('brainy-v1');
  const route=(location.hash.slice(1)||'home').split('/')[0];b.dataset.scene=location.hash.includes('physics-12')?'physics':route;
}
function reactToCorrect(){const b=$('#brainy-companion');if(!b)return;b.classList.remove('brainy-win');void b.offsetWidth;b.classList.add('brainy-win');setTimeout(()=>b.classList.remove('brainy-win'),1500)}
let seen=new WeakSet();
function watchCorrect(){$$('.feedback.good:not([hidden])').forEach(x=>{if(seen.has(x))return;seen.add(x);reactToCorrect()})}
function run(){cleanTestPreviews();brainy();watchCorrect()}
const app=$('#app');
if(app)new MutationObserver(()=>queueMicrotask(run)).observe(app,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
addEventListener('hashchange',()=>setTimeout(run,20));setTimeout(run,30);
