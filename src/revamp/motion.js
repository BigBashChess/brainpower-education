const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const route=()=>((location.hash.slice(1)||'home').split(/[/?]/)[0]||'home');

const revealSelectors=[
  '.bp-home-dashboard','.bp-home-section','.bp-learn-pathways','.bp-course-map','.bp-practice-builder',
  '.bp-test-library','.bp-resource-workspace','.bp-tools-grid','.bp-progress-grid','.bp-about-section',
  '.bp-command-layout','.bp-arcade-games'
];
const purposefulBrainySelectors=[
  '.bp-about-brainy__mascot','.bp-state-card__art','.bp-route-loader__inner','.bp-boot__inner',
  '[data-brainy-state]'
];

let revealObserver=null;
let clearEnterTimer=null;
let feedbackObserver=null;

function markPurposefulBrainy(root=document){
  purposefulBrainySelectors.forEach(sel=>$$(`${sel}`,root).forEach(slot=>{
    if(!slot.querySelector('img[src*="brainy"]'))return;
    slot.classList.add('bp-brainy-purposeful');
    if(slot.dataset.brainyPrepared==='1')return;
    slot.dataset.brainyPrepared='1';
    slot.classList.add('bp-brainy-enter');
    setTimeout(()=>slot.classList.remove('bp-brainy-enter'),520);
  }));
}

function prepareReveals(){
  revealObserver?.disconnect();
  revealObserver=null;
  const base=route();
  // Focus modes stay still: lesson and exam content should not scroll-animate.
  if(reduced()||['lesson','exam'].includes(base)){
    $$('.bp-motion-reveal').forEach(el=>el.classList.add('is-visible'));
    return;
  }
  const candidates=revealSelectors.flatMap(sel=>$$(sel)).filter((el,i,a)=>a.indexOf(el)===i);
  candidates.forEach(el=>el.classList.add('bp-motion-reveal'));
  revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('is-visible');
      revealObserver?.unobserve(entry.target);
    });
  },{rootMargin:'0px 0px -5% 0px',threshold:.04});
  candidates.forEach(el=>revealObserver.observe(el));
}

function enterPage(){
  const main=$('main');
  if(!main||route()==='exam'||reduced())return;
  main.classList.remove('bp-motion-enter');
  void main.offsetWidth;
  main.classList.add('bp-motion-enter');
  clearTimeout(clearEnterTimer);
  clearEnterTimer=setTimeout(()=>main.classList.remove('bp-motion-enter'),320);
}

function animateFeedback(root=document){
  $$('.feedback:not([hidden])',root).forEach(el=>{
    if(el.dataset.motionSeen==='1')return;
    el.dataset.motionSeen='1';
    el.classList.add('bp-feedback-arrived');
    setTimeout(()=>el.classList.remove('bp-feedback-arrived'),420);
  });
}

function observeFeedback(){
  feedbackObserver?.disconnect();
  feedbackObserver=new MutationObserver(records=>records.forEach(record=>{
    const target=record.target.nodeType===1?record.target:record.target.parentElement;
    animateFeedback(target?.closest?.('.question-card,.bp-practice-page,.bp-lesson-page')||document);
    if(record.type==='childList')markPurposefulBrainy(target?.closest?.('main')||document);
  }));
  const app=$('#app');
  // Do not observe generic class mutations here. The motion layer itself changes classes for
  // page entrances, reveals and feedback; watching those classes would recursively schedule
  // more motion forever. Feedback visibility already exposes the semantic `hidden` mutation.
  if(app)feedbackObserver.observe(app,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
}

function apply(){
  document.body.dataset.route=route();
  markPurposefulBrainy();
  animateFeedback();
  prepareReveals();
  enterPage();
}

let queued=false;
function queueApply(){
  if(queued)return;
  queued=true;
  requestAnimationFrame(()=>{queued=false;apply()});
}

addEventListener('hashchange',queueApply);
addEventListener('pageshow',queueApply);
new MutationObserver(queueApply).observe($('#app')||document.body,{childList:true,subtree:true});
observeFeedback();
queueApply();

window.BrainpowerMotion={
  react(selector,state='focus'){
    const slot=$(selector);if(!slot)return false;
    slot.dataset.brainyState=state;slot.classList.add('bp-brainy-purposeful','bp-brainy-react');
    setTimeout(()=>slot.classList.remove('bp-brainy-react'),650);return true;
  },
  refresh:queueApply
};
