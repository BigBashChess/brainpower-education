import {courses} from './data/courses.js';
import {lessons} from './data/lessons.js';
import {questions} from './data/questions.js';

export const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Formula-only buttons need an explicit name as well as their accessible MathML.
export function mathChoiceLabel(value){
  const names={ge:'greater than or equal to',geq:'greater than or equal to',le:'less than or equal to',leq:'less than or equal to',ne:'not equal to',neq:'not equal to',pm:'plus or minus',times:'times',cdot:'times',pi:'pi',sqrt:'square root',infty:'infinity',theta:'theta',lambda:'lambda',alpha:'alpha',beta:'beta',sin:'sine',cos:'cosine',tan:'tangent',ln:'natural log',log:'log',left:'',right:'',text:'',mathrm:''};
  return String(value).replace(/\$/g,'').replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g,'($1) over ($2)').replace(/\\([a-zA-Z]+)/g,(_,name)=>` ${names[name]??name} `).replace(/[{}]/g,'').replace(/\s+/g,' ').trim();
}

export function renderMathString(input=''){
  const s=String(input);
  if(!window.katex) return s;
  return s.replace(/\$\$([\s\S]+?)\$\$/g,(_,x)=>safeKatex(x,true)).replace(/\$([^$]+?)\$/g,(_,x)=>safeKatex(x,false));
}
function safeKatex(tex,displayMode){try{return window.katex.renderToString(tex,{throwOnError:false,displayMode})}catch{return esc(tex)}}

export function answerPreview(input=''){
  const raw=String(input||'').trim();
  if(!raw)return '<span class="math-preview-empty">Your formatted answer appears here</span>';
  try{
    if(window.math){
      const cleaned=raw.replace(/√/g,'sqrt').replace(/π/g,'pi').replace(/\bln\b/g,'log');
      const tex=window.math.parse(cleaned).toTex({parenthesis:'keep'}).replace(/\\log/g,'\\ln');
      return window.katex?safeKatex(tex,false):esc(raw);
    }
  }catch{}
  return window.katex?safeKatex(`\\text{${raw.replace(/[{}]/g,'')}}`,false):esc(raw);
}

export function routeTo(path){location.hash=path.startsWith('#')?path:`#${path}`}
export function routeParts(){const raw=location.hash.replace(/^#/,'')||'home';return raw.split('/').filter(Boolean)}
export function qs(sel,root=document){return root.querySelector(sel)}
export function qsa(sel,root=document){return [...root.querySelectorAll(sel)]}
export function clamp(n,min,max){return Math.min(max,Math.max(min,n))}

const norm=s=>String(s??'').toLowerCase().replace(/\s+/g,'').replace(/\\left|\\right/g,'').replace(/[{}]/g,'').replace(/\*/g,'').replace(/−/g,'-').replace(/π/g,'pi').replace(/\\pi/g,'pi').replace(/\\sqrt/g,'sqrt').replace(/\\sin/g,'sin').replace(/\\cos/g,'cos').replace(/\\tan/g,'tan').replace(/\\ln/g,'ln');
function mathExpr(s){return String(s??'').trim().replace(/π/g,'pi').replace(/\\pi/g,'pi').replace(/√/g,'sqrt').replace(/\\sqrt\{([^{}]+)\}/g,'sqrt($1)').replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g,'(($1)/($2))').replace(/\\sin/g,'sin').replace(/\\cos/g,'cos').replace(/\\tan/g,'tan').replace(/\\ln/g,'log').replace(/\bln\b/g,'log').replace(/\|([^|]+)\|/g,'abs($1)');}
function closeEnough(a,b,tol=1e-9){return Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b));}
function symbolicEquivalent(a,b){
  if(!window.math)return false;
  try{
    const A=mathExpr(a),B=mathExpr(b);
    const simplified=window.math.simplify(`(${A})-(${B})`).toString();
    if(simplified==='0')return true;
    const vars=['x','t','y'];
    const samples=[0.37,0.83,1.41,2.17,-0.61];
    let checked=0;
    for(const v of samples){
      const scope={x:v,t:v+0.4,y:v+1.7,e:Math.E,pi:Math.PI};
      try{
        const av=window.math.evaluate(A,scope),bv=window.math.evaluate(B,scope);
        if(typeof av==='number'&&typeof bv==='number'&&Number.isFinite(av)&&Number.isFinite(bv)){
          checked++; if(!closeEnough(av,bv,1e-7))return false;
        }
      }catch{}
    }
    return checked>=2;
  }catch{return false}
}
export function checkAnswer(q,value){
  const raw=String(value??'').trim();
  if(!raw)return false;
  if(q.type==='numeric'){
    try{
      const a=window.math?Number(window.math.evaluate(mathExpr(raw))):Number(raw), b=window.math?Number(window.math.evaluate(mathExpr(q.answer))):Number(q.answer);
      if(Number.isFinite(a)&&Number.isFinite(b)) return Math.abs(a-b)<=Number(q.tolerance??1e-9)*Math.max(1,Math.abs(b));
    }catch{
      const a=Number(raw),b=Number(q.answer);if(Number.isFinite(a)&&Number.isFinite(b))return Math.abs(a-b)<=Number(q.tolerance??1e-9);
    }
  }
  const candidates=[...(q.answers||[]),...(q.answer!==undefined?[q.answer]:[])];
  if(candidates.map(norm).includes(norm(raw)))return true;
  return candidates.some(ans=>symbolicEquivalent(raw,ans));
}

export function todayKey(){return new Date().toISOString().slice(0,10)}
export function dailyIndex(length){const d=new Date();const start=Date.UTC(d.getFullYear(),0,0);const diff=Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())-start;return Math.floor(diff/86400000)%length}
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
  return out.slice(0,60);
}

export function parseRouteQuery(){const raw=location.hash.replace(/^#/,'')||'home';const [path,query='']=raw.split('?');return {parts:path.split('/').filter(Boolean),params:new URLSearchParams(query)}}
