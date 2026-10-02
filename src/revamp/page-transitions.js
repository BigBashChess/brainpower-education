const routeCopy={
  home:['Returning home…','Brainpower Education'],
  learn:['Opening your pathways…','Courses'],
  course:['Loading course pathway…','Course'],
  diagnostic:['Preparing your diagnostic…','Diagnostic'],
  lesson:['Opening your lesson…','Learn'],
  practice:['Building your practice space…','Practice'],
  tests:['Preparing the Test Centre…','Tests'],
  test:['Opening assessment…','Test Centre'],
  exam:['Entering Exam Mode…','Focus'],
  resources:['Opening the Brainpower library…','Resources'],
  tools:['Powering up the lab…','Tools'],
  arcade:['Loading the arcade…','Arcade'],
  progress:['Updating your dashboard…','Progress'],
  about:['Opening Brainpower…','About'],
  search:['Opening search…','Search'],
  admin:['Opening Admin Studio…','Admin']
};

let overlay=null;
let hideTimer=null;
let lastHash=location.hash||'#home';

function routeFromHash(hash){
  const clean=(hash||'#home').replace(/^#/,'').split('?')[0];
  return clean.split('/')[0]||'home';
}

function ensureOverlay(){
  if(overlay?.isConnected)return overlay;
  overlay=document.createElement('div');
  overlay.className='bp-route-loader';
  overlay.setAttribute('aria-hidden','true');
  overlay.innerHTML=`
    <div class="bp-route-loader__glow" aria-hidden="true"></div>
    <div class="bp-route-loader__inner" role="status" aria-live="polite">
      <div class="bp-route-loader__logo"><img src="public/brand/brainpower-logo.jpg" alt=""></div>
      <div class="bp-route-loader__brand">BRAINPOWER <span>EDUCATION</span></div>
      <div class="bp-route-loader__message">Opening your study space…</div>
      <div class="bp-route-loader__track"><div class="bp-route-loader__bar"></div></div>
      <div class="bp-route-loader__destination">Loading</div>
    </div>`;
  document.body.appendChild(overlay);
  return overlay;
}

function hideLoader(){
  if(!overlay)return;
  overlay.classList.remove('is-active');
  overlay.setAttribute('aria-hidden','true');
  document.body.classList.remove('bp-route-loading');
}

function showLoader(hash){
  const el=ensureOverlay();
  const route=routeFromHash(hash);
  const [message,destination]=routeCopy[route]||['Opening page…','Brainpower'];
  const messageEl=el.querySelector('.bp-route-loader__message');
  const destinationEl=el.querySelector('.bp-route-loader__destination');
  if(messageEl)messageEl.textContent=message;
  if(destinationEl)destinationEl.textContent=destination;

  clearTimeout(hideTimer);
  el.classList.remove('is-active');
  // Force a fresh transition even when users move through pages rapidly.
  void el.offsetWidth;
  el.classList.add('is-active');
  el.setAttribute('aria-hidden','false');
  document.body.classList.add('bp-route-loading');

  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  hideTimer=setTimeout(hideLoader,reduced?180:560);
}

// This module is loaded before main.js. Its hashchange listener therefore activates
// the overlay before the router replaces #app, so page swaps are never exposed as a flash.
addEventListener('hashchange',()=>{
  const next=location.hash||'#home';
  if(next===lastHash)return;
  lastHash=next;
  showLoader(next);
});

// Expose a tiny hook for future non-hash navigations without coupling the router to this file.
window.BrainpowerPageTransition={show:()=>showLoader(location.hash||'#home'),hide:hideLoader};
