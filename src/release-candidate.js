import {tests} from './data/tests.js';

const byId=id=>tests.find(t=>t.id===id);
const complete=t=>!!t&&Number(t.minutes)>0&&Number(t.marks)>0&&Number(t.questions)>0;
const fallbackFor=t=>{
  const c=t?.course||'';
  if(c==='methods-34')return 'public/thumbnails/methods-34-test.svg';
  if(c==='specialist-12')return 'public/thumbnails/specialist-12-test.svg';
  if(c==='physics-12')return 'public/thumbnails/physics-12-test.svg';
  if(c==='other')return 'public/thumbnails/other-test.svg';
  return 'public/thumbnails/methods-12-test.svg';
};

function polishImages(){
  document.querySelectorAll('img').forEach(img=>{
    if(img.dataset.bpFallback)return;
    img.dataset.bpFallback='ready';
    img.addEventListener('error',()=>{
      if(img.dataset.bpFallback==='used')return;
      img.dataset.bpFallback='used';
      const card=img.closest('.test-card,.featured-test,.cover-card');
      const link=card?.querySelector('a[href^="#test/"]');
      const id=link?.getAttribute('href')?.split('/')[1];
      img.src=fallbackFor(byId(id));
    },{once:true});
  });
}

function polishMetadata(){
  // Featured test: omit unknown values rather than printing null/undefined.
  document.querySelectorAll('.featured-test-meta span').forEach(span=>{
    if(/\b(null|undefined|NaN)\b/i.test(span.textContent))span.classList.add('metadata-pending');
  });
  // Detail page: safety layer may label unknown values "See paper". Omit those rows entirely.
  document.querySelectorAll('.test-info dl > div').forEach(row=>{
    const dd=row.querySelector('dd');
    if(dd&&/^(null|undefined|see paper|0(?: min)?)$/i.test(dd.textContent.trim()))row.classList.add('metadata-pending');
  });
  // Exam Mode only exists when timing, marks and question count are actually audited.
  document.querySelectorAll('a[href^="#exam/"]').forEach(a=>{
    const id=a.getAttribute('href').slice('#exam/'.length).split('?')[0];
    const t=byId(id);
    if(!complete(t)){
      a.removeAttribute('href');
      a.classList.add('exam-disabled');
      a.setAttribute('aria-disabled','true');
      a.title='Exam Mode unlocks when timing, marks and question count are verified.';
      if(/exam mode/i.test(a.textContent))a.textContent='Exam Mode — audit pending';
    }
  });
}

function polishCopy(){
  // Old internal V-number language should not leak into the 0.x public release line.
  document.querySelectorAll('main p, main h1, main h2, main h3, main span').forEach(el=>{
    if(el.children.length)return;
    if(el.textContent.includes('V7'))el.textContent=el.textContent.replaceAll('V7','0.7');
    if(el.textContent.includes('V8'))el.textContent=el.textContent.replaceAll('V8','0.8');
  });
}

function run(){polishImages();polishMetadata();polishCopy()}
const app=document.querySelector('#app');
if(app)new MutationObserver(()=>queueMicrotask(run)).observe(app,{childList:true,subtree:true});
addEventListener('hashchange',()=>setTimeout(run,0));
setTimeout(run,0);
