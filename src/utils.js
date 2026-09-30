import {courses} from './data/courses.js';
import {lessons} from './data/lessons.js';
import {questions} from './data/questions.js';

export const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function renderMathString(input=''){
  const s=String(input);
  if(!window.katex) return s;
  return s.replace(/\$\$([\s\S]+?)\$\$/g,(_,x)=>safeKatex(x,true)).replace(/\$([^$]+?)\$/g,(_,x)=>safeKatex(x,false));
}
function safeKatex(tex,displayMode){try{return window.katex.renderToString(tex,{throwOnError:false,displayMode})}catch{return esc(tex)}}

export function routeTo(path){location.hash=path.startsWith('#')?path:`#${path}`}
export function routeParts(){const raw=location.hash.replace(/^#/,'')||'home';return raw.split('/').filter(Boolean)}
export function qs(sel,root=document){return root.querySelector(sel)}
export function qsa(sel,root=document){return [...root.querySelectorAll(sel)]}
export function clamp(n,min,max){return Math.min(max,Math.max(min,n))}

const norm=s=>String(s??'').toLowerCase().replace(/\s+/g,'').replace(/\\left|\\right/g,'').replace(/[{}]/g,'').replace(/\*/g,'').replace(/−/g,'-');
export function checkAnswer(q,value){
  const raw=String(value??'').trim();
  if(q.type==='numeric'){
    const a=Number(raw), b=Number(q.answer);
    if(Number.isFinite(a)&&Number.isFinite(b)) return Math.abs(a-b)<=Number(q.tolerance??1e-9);
  }
  const allowed=[...(q.answers||[]),...(q.answer!==undefined?[q.answer]:[])].map(norm);
  return allowed.includes(norm(raw));
}

export function todayKey(){return new Date().toISOString().slice(0,10)}
export function dailyIndex(length){const d=new Date();const start=Date.UTC(d.getUTCFullYear(),0,0);const diff=Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate())-start;return Math.floor(diff/86400000)%length}
export function fmtDate(iso){try{return new Intl.DateTimeFormat('en-AU',{day:'numeric',month:'short',year:'numeric'}).format(new Date(iso))}catch{return iso}}

export function topicMastery(courseId,topicId,progress){
  const ls=lessons.filter(l=>l.course===courseId&&l.topic===topicId);
  if(!ls.length)return null;
  const done=ls.filter(l=>progress.completedLessons.includes(l.id)).length;
  return Math.round(done/ls.length*100);
}
export function courseMastery(courseId,progress){
  const c=courses.find(x=>x.id===courseId); if(!c)return 0;
  const values=c.topics.map(t=>topicMastery(courseId,t.id,progress)).filter(v=>v!==null);
  return values.length?Math.round(values.reduce((a,b)=>a+b,0)/values.length):0;
}
export function firstIncompleteLesson(courseId,progress){return lessons.find(l=>l.course===courseId&&!progress.completedLessons.includes(l.id))||lessons.find(l=>l.course===courseId)}
export function searchEverything(term,tests,resources){
  const q=term.trim().toLowerCase(); if(!q)return [];
  const out=[];
  courses.forEach(c=>{if(`${c.title} ${c.short} ${c.desc}`.toLowerCase().includes(q))out.push({type:'Course',title:c.title,sub:c.desc,go:`course/${c.id}`})});
  lessons.forEach(l=>{if(`${l.title} ${l.summary} ${l.topic}`.toLowerCase().includes(q))out.push({type:'Lesson',title:l.title,sub:courses.find(c=>c.id===l.course)?.short||'',go:`lesson/${l.id}`})});
  questions.filter(x=>!x.daily).forEach(x=>{if(`${x.prompt} ${x.topicLabel} ${x.difficulty}`.toLowerCase().includes(q))out.push({type:'Question',title:x.topicLabel,sub:x.difficulty,go:`practice?focus=${x.id}`})});
  tests.forEach(t=>{if(`${t.title} ${t.subject} ${t.topics.join(' ')}`.toLowerCase().includes(q))out.push({type:'Test',title:t.title,sub:`${t.subject} ${t.units}`,go:`test/${t.id}`})});
  resources.forEach(r=>{if(`${r.title} ${r.type} ${r.topics.join(' ')}`.toLowerCase().includes(q))out.push({type:'Resource',title:r.title,sub:r.type,go:`resources?focus=${r.id}`})});
  return out.slice(0,40);
}

export function parseRouteQuery(){const raw=location.hash.replace(/^#/,'')||'home';const [path,query='']=raw.split('?');return {parts:path.split('/').filter(Boolean),params:new URLSearchParams(query)}}
