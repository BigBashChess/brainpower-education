const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

/* Test cards: keep the real PDF first page, but do not embed the browser PDF viewer.
   The native viewer caused scrollbars and, because the old image occupied a grid column,
   pushed the test copy underneath the preview. */
function cleanTestPreviews(){
  $$('.pdf-cover-wrap').forEach(w=>{
    w.classList.add('bp-clean-cover');
    const f=$('iframe',w);if(f){f.scrolling='no';f.setAttribute('scrolling','no');}
  });
}

/* Brainy: one canonical mascot asset. Animation is applied to the mascot itself instead
   of swapping to rough alternate SVG drawings. */
function brainy(){
  const b=$('#brainy-companion'),img=b?.querySelector('img');if(!b||!img)return;
  img.src='public/brand/brainy.svg';
  img.dataset.moodSrc='public/brand/brainy.svg';
  b.classList.add('brainy-v1');
  const route=(location.hash.slice(1)||'home').split('/')[0];
  b.dataset.scene=location.hash.includes('physics-12')?'physics':route;
}
function reactToCorrect(){
  const b=$('#brainy-companion');if(!b)return;
  b.classList.remove('brainy-win');void b.offsetWidth;b.classList.add('brainy-win');
  setTimeout(()=>b.classList.remove('brainy-win'),1500);
}
let seen=new WeakSet();
function watchCorrect(){
  $$('.feedback.good:not([hidden])').forEach(x=>{if(seen.has(x))return;seen.add(x);reactToCorrect()});
}
function run(){cleanTestPreviews();brainy();watchCorrect()}
const app=$('#app');if(app)new MutationObserver(()=>queueMicrotask(run)).observe(app,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
addEventListener('hashchange',()=>setTimeout(run,20));setTimeout(run,30);
