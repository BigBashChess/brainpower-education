import {tests} from './data/tests.js';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
function currentTest(){const m=(location.hash||'').match(/^#(?:test|exam)\/([^?]+)/);return m?tests.find(t=>t.id===m[1]):null}
function sanitize(){
  // Never expose dead solution links.
  $$('a').forEach(a=>{const href=a.getAttribute('href');if(!href||href==='undefined'||href==='null'){if(/marking scheme/i.test(a.textContent))a.remove()}});
  // Older detail templates printed null literally. Replace it with an honest state until the source paper is audited.
  $$('.test-info dd').forEach(dd=>{if(['null','undefined','0 min','0'].includes(dd.textContent.trim()))dd.textContent='See paper'});
  const t=currentTest();if(!t)return;
  const complete=Number(t.minutes)>0&&Number(t.marks)>0;
  if(!complete){
    $$(`a[href="#exam/${CSS.escape(t.id)}"]`).forEach(a=>{a.classList.add('disabled');a.removeAttribute('href');a.title='Exam Mode will unlock after this paper’s metadata audit is complete.';a.textContent='Exam Mode — metadata pending'});
    if(location.hash.startsWith('#exam/')){const rules=$('#exam-rules');if(rules)rules.innerHTML=`<div><div class="eyebrow dark">METADATA AUDIT PENDING</div><h1>${t.title}</h1><p>This paper is available to download, but Brainpower will not invent timing or mark data. Exam Mode is disabled until the source paper has been verified.</p><a class="btn primary" href="#test/${t.id}">Back to test</a></div>`}
  }
}
const app=$('#app');new MutationObserver(()=>queueMicrotask(sanitize)).observe(app,{childList:true});addEventListener('hashchange',()=>setTimeout(sanitize,0));setTimeout(sanitize,0);
