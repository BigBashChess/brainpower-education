import {tests} from './data/tests.js';

const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const byId=id=>tests.find(t=>t.id===id);
const coverSrc=t=>`${t.file}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH`;

function testForElement(el){
  const card=el.closest('.test-card,.featured-test,.cover-card');
  const href=card?.querySelector('a[href^="#test/"]')?.getAttribute('href')||'';
  let id=href.startsWith('#test/')?href.slice(6).split('?')[0]:'';
  if(!id&&location.hash.startsWith('#test/'))id=location.hash.slice(6).split('?')[0];
  if(!id&&card){const title=card.querySelector('h2,h3')?.textContent?.trim();if(title) return tests.find(t=>t.title===title)}
  return byId(id);
}
function installPdfCovers(){
  $$('.test-card>img.test-thumb,.featured-test>img,.cover-card>img').forEach(img=>{
    if(img.dataset.realCover==='1')return;
    const t=testForElement(img); if(!t?.file?.toLowerCase().endsWith('.pdf'))return;
    const wrap=document.createElement('div');wrap.className='pdf-cover-wrap';wrap.setAttribute('aria-label',`First page preview of ${t.title}`);
    const frame=document.createElement('iframe');frame.className='pdf-cover-preview';frame.src=coverSrc(t);frame.title=`First page of ${t.title}`;frame.tabIndex=-1;frame.loading='lazy';
    wrap.appendChild(frame);img.replaceWith(wrap);
  });
}

const moods={
  home:['public/brand/brainy.svg','study'],learn:['public/brand/brainy-study.svg','study'],course:['public/brand/brainy-study.svg','study'],lesson:['public/brand/brainy-study.svg','study'],practice:['public/brand/brainy-thinking.svg','thinking'],tests:['public/brand/brainy-test.svg','test'],test:['public/brand/brainy-test.svg','test'],exam:['public/brand/brainy-test.svg','test'],resources:['public/brand/brainy-study.svg','study'],tools:['public/brand/brainy-thinking.svg','thinking'],arcade:['public/brand/brainy-celebrate.svg','celebrate'],progress:['public/brand/brainy-celebrate.svg','celebrate']
};
function brainyMood(){
  const b=$('#brainy-companion'),img=b?.querySelector('img');if(!b||!img)return;
  const route=(location.hash.slice(1)||'home').split('/')[0];
  const physics=location.hash.includes('physics-12');const [src,mood]=physics?['public/brand/brainy-physics.svg','physics']:(moods[route]||['public/brand/brainy.svg','study']);
  if(img.dataset.moodSrc===src)return;img.dataset.moodSrc=src;b.classList.add('mood-swap');
  [...b.classList].filter(c=>c.startsWith('brainy-')&&!['brainy-companion'].includes(c)).forEach(c=>b.classList.remove(c));
  b.classList.add(`brainy-${mood}`);img.src=src;setTimeout(()=>b.classList.remove('mood-swap'),380);
}
function celebrateCorrect(){
  const b=$('#brainy-companion'),img=b?.querySelector('img');if(!b||!img)return;
  const old=img.src,oldMood=img.dataset.moodSrc;img.src='public/brand/brainy-celebrate.svg';b.classList.add('brainy-celebrate');
  setTimeout(()=>{img.src=oldMood||old;b.classList.remove('brainy-celebrate');brainyMood()},1800);
}
let seenFeedback=new WeakSet();
function watchFeedback(){
  $$('.feedback.good:not([hidden])').forEach(f=>{if(seenFeedback.has(f))return;seenFeedback.add(f);celebrateCorrect()});
}
function run(){installPdfCovers();brainyMood();watchFeedback()}
const app=$('#app');if(app)new MutationObserver(()=>queueMicrotask(run)).observe(app,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
addEventListener('hashchange',()=>setTimeout(run,30));setTimeout(run,50);
