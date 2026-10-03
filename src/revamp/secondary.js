import {courses} from '../data/courses.js';
import {lessons} from '../data/lessons.js';
import {practiceQuestions} from '../data/questions.js';
import {tests} from '../data/tests.js';
import {resources} from '../data/resources.js';
import {SITE,WHATS_NEW} from '../data/site.js';
import {load} from '../progress/store.js';

if(!document.querySelector('link[data-bp-secondary]')){
  const link=document.createElement('link');
  link.rel='stylesheet';
  link.href='src/styles/revamp/secondary.css';
  link.dataset.bpSecondary='1';
  document.head.appendChild(link);
}

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const routeInfo=()=>{const raw=location.hash.slice(1)||'home';const [path,query='']=raw.split('?');const parts=path.split('/').filter(Boolean);return {base:parts[0]||'home',parts,params:new URLSearchParams(query)}};
const known=new Set(['home','learn','course','diagnostic','lesson','practice','tests','test','exam','resources','tools','arcade','admin','progress','about','search']);
const courseName=id=>courses.find(c=>c.id===id)?.short||id;

function aboutMarkup(){
  const p=load();
  const latest=WHATS_NEW[0];
  const complete=courses.filter(c=>lessons.filter(l=>l.course===c.id).every(l=>p.completedLessons.includes(l.id))).length;
  return `<div class="bp-about-page">
    <section class="bp-about-hero" aria-labelledby="bp-about-title">
      <div class="bp-about-hero__copy">
        <div class="eyebrow">THE BRAINPOWER STORY</div>
        <h1 id="bp-about-title">Built for the work<br><em>between knowing and mastering.</em></h1>
        <p>Brainpower Education is an independent VCE learning platform connecting lessons, targeted practice, formal assessment, resources and progress into one study environment.</p>
        <div class="bp-about-hero__actions"><a class="btn primary" href="#learn">Explore the five pathways</a><a class="btn ghost" href="#search">Search Brainpower</a></div>
        <div class="bp-about-hero__facts"><span><b>${courses.length}</b><small>course pathways</small></span><span><b>${lessons.length}</b><small>lessons</small></span><span><b>${practiceQuestions.length}</b><small>practice questions</small></span></div>
      </div>
    </section>

    <section class="bp-about-section bp-about-intro">
      <div class="bp-about-statement"><div class="eyebrow dark">WHY IT EXISTS</div><h2>Not another folder full of PDFs.</h2><p>Brainpower is designed around one continuous learning loop. Learn the idea properly, practise it under increasing pressure, test it formally, review what went wrong, then use Progress to decide what deserves attention next.</p><p>The interface can have personality without lowering the academic standard. Cinematic pages create atmosphere; lesson and exam interfaces become quieter when concentration matters.</p></div>
      <aside class="bp-about-manifesto"><small>THE LEARNING LOOP</small><ol><li><span>01</span><b>Learn</b><em>Build the concept and method.</em></li><li><span>02</span><b>Practise</b><em>Transfer it to unfamiliar questions.</em></li><li><span>03</span><b>Test</b><em>Work under formal conditions.</em></li><li><span>04</span><b>Review</b><em>Find the actual weakness.</em></li><li><span>05</span><b>Progress</b><em>Choose the next useful action.</em></li></ol></aside>
    </section>

    <section class="bp-about-section">
      <div class="bp-about-heading"><div><div class="eyebrow dark">CURRENT ACADEMIC WORLD</div><h2>Five pathways. One system.</h2></div><p>Each course connects its chapter map to lessons, practice and progress rather than behaving like an isolated subject tile.</p></div>
      <div class="bp-about-courses">${courses.map((c,i)=>{const total=lessons.filter(l=>l.course===c.id).length;const done=lessons.filter(l=>l.course===c.id&&p.completedLessons.includes(l.id)).length;return `<a href="#course/${c.id}" class="bp-about-course" data-subject="${c.id.includes('specialist')?'specialist':c.id.includes('physics')?'physics':'methods'}"><span>${String(i+1).padStart(2,'0')}</span><div><small>${esc(c.short)}</small><strong>${esc(c.title||c.short)}</strong><em>${done}/${total} mastered on this browser</em></div><b>→</b></a>`}).join('')}</div>
    </section>

    <section class="bp-about-section bp-about-principles">
      <div class="bp-about-heading"><div><div class="eyebrow dark">ACADEMIC STANDARD</div><h2>Difficulty comes from thinking.</h2></div><p>For formal VCE mathematics assessment, the current VCAA Study Design is the content boundary. Harder work should use deeper reasoning, connections and unusual applications — not quietly move off-study-design.</p></div>
      <div class="bp-principle-grid">
        <article><span>01</span><h3>Teach before testing</h3><p>Lessons should contain enough explanation, intuition and worked reasoning to genuinely teach the idea before asking for mastery.</p></article>
        <article><span>02</span><h3>Assessment stays credible</h3><p>Exam Mode, marking schemes, conditions and metadata are treated as formal academic tools rather than gamified decoration.</p></article>
        <article><span>03</span><h3>Progress means evidence</h3><p>Opening a lesson is not mastery. Solved questions, completed lessons and recorded assessments drive the local student record.</p></article>
        <article><span>04</span><h3>Personality has boundaries</h3><p>Brainy, generated environments and Arcade add character where useful; sustained reading and assessment stay calm.</p></article>
      </div>
    </section>

    <section class="bp-about-section bp-about-brainy">
      <div class="bp-about-brainy__mascot"><img src="public/brand/brainy.svg" alt="Brainy, Brainpower Education's open-book mascot"></div>
      <div><div class="eyebrow dark">MEET BRAINY</div><h2>A guide, not a lecturer.</h2><p>Brainy is the study partner and emotional feedback layer of the platform: focused during tests, thoughtful around hints, celebratory at meaningful milestones, and energetic in Arcade. The character stays the same open-book mascot across every environment.</p><p>Brainy should never compete with the mathematics or physics on screen. When concentration matters, the mascot steps back.</p></div>
    </section>

    <section class="bp-about-section bp-about-system">
      <div class="bp-about-heading"><div><div class="eyebrow dark">HOW THE PRODUCT IS BUILT</div><h2>Artwork creates the world. Interface carries the truth.</h2></div></div>
      <div class="bp-about-system__grid"><article><b>Generated environments</b><p>Atmosphere, setting, lighting and contextual Brainy scenes.</p></article><article><b>Real HTML interface</b><p>Questions, marks, timers, navigation, course names and progress data stay accessible and editable.</p></article><article><b>Local-first progress</b><p>Your current study record is stored in this browser. ${p.xp} XP and ${p.completedLessons.length} mastered lessons are currently recorded here.</p></article><article><b>Static, fast delivery</b><p>No account is required for the current core experience, keeping the platform quick to open and simple to use.</p></article></div>
    </section>

    <section class="bp-about-section bp-about-independence">
      <div><div class="eyebrow dark">INDEPENDENCE</div><h2>Brainpower is not VCAA.</h2><p>Brainpower Education is an independent education platform. References to VCAA conventions, study-design boundaries and examination styles describe alignment choices; they do not imply official endorsement or affiliation.</p></div>
      <div class="bp-about-release"><small>LATEST PLATFORM NOTE</small><b>${esc(latest?.title||'Brainpower update')}</b><p>${esc(latest?.text||'The platform continues to evolve through reviewed releases.')}</p><button class="btn ghost" type="button" data-open-update-log>Open update log</button></div>
    </section>

    <section class="bp-about-section bp-about-connect">
      <div><div class="eyebrow">KEEP IN THE LOOP</div><h2>Brainpower community</h2><p>Platform updates, new assessments and community discussion live outside the study interface.</p></div>
      <div><a class="btn light" href="${esc(SITE.instagram)}" target="_blank" rel="noopener">Instagram ↗</a><a class="btn outline-light" href="${esc(SITE.discord)}" target="_blank" rel="noopener">Discord ↗</a></div>
    </section>
  </div>`;
}

const STATIC_TOOLS=[
  {title:'Percentage Calculator',sub:'Convert marks to percentages.',go:'tools',tokens:'percent percentage marks score calculator maths'},
  {title:'Target Score Calculator',sub:'Find the mark required for a target percentage.',go:'tools',tokens:'target score mark percentage calculator'},
  {title:'Exact Trig Values',sub:'Reference exact common-angle trig values.',go:'tools',tokens:'trig sine cosine tangent exact values maths'},
  {title:'Random Practice',sub:'Pull a random question from the bank.',go:'tools',tokens:'random practice question selector'},
  {title:'Focus Timer',sub:'Run a simple local study timer.',go:'tools',tokens:'timer focus pomodoro study'},
  {title:'Vector Visualiser',sub:'Plot a 2D vector and inspect its magnitude.',go:'tools',tokens:'vector visualiser magnitude components specialist'}
];

function topicItems(){
  const seen=new Set(),items=[];
  courses.forEach(c=>(c.topics||[]).forEach(t=>{const key=`${c.id}:${t.id}`;if(seen.has(key))return;seen.add(key);items.push({type:'Topic',group:'Learn',title:t.title,sub:c.short,go:`practice?course=${c.id}&topic=${t.id}`,tokens:`${t.title} ${c.short} ${c.title||''} ${t.id}`})}));
  return items;
}
function searchIndex(){
  return [
    ...courses.map(c=>({type:'Course',group:'Learn',title:c.title||c.short,sub:c.short,go:`course/${c.id}`,tokens:`${c.id} ${c.short} ${(c.topics||[]).map(t=>t.title).join(' ')}`})),
    ...topicItems(),
    ...lessons.map(l=>({type:'Lesson',group:'Learn',title:l.title,sub:`${courseName(l.course)} · ${l.minutes||'—'} min`,go:`lesson/${l.id}`,tokens:`${l.title} ${l.topic} ${courseName(l.course)} ${l.difficulty||''}`})),
    ...tests.map(t=>({type:'Test',group:'Tests',title:t.title,sub:`${t.subject} · ${t.topics?.join(', ')||''}`,go:`test/${t.id}`,tokens:`${t.title} ${t.subject} ${t.course} ${t.topics?.join(' ')||''} ${t.difficulty||''} ${t.tech||''}`})),
    ...resources.map(r=>({type:'Resource',group:'Resources',title:r.title,sub:`${r.type} · ${courseName(r.course)}`,go:`resources?focus=${encodeURIComponent(r.id)}`,tokens:`${r.title} ${r.type} ${r.course} ${r.topics?.join(' ')||''}`})),
    ...STATIC_TOOLS.map(t=>({type:'Tool',group:'Tools',...t}))
  ];
}
const INDEX=searchIndex();
const synonyms={spesh:'specialist',spec:'specialist',diff:'differential derivative differentiation',calc:'calculus',prob:'probability',stats:'statistics',phys:'physics',kin:'kinematics',int:'integration integral',methods:'mathematical methods'};
function normalise(text){return String(text||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()}
function queryTerms(q){return normalise(q).split(/\s+/).filter(Boolean).flatMap(t=>[t,...normalise(synonyms[t]||'').split(/\s+/).filter(Boolean)])}
function rank(item,q){
  const query=normalise(q),terms=queryTerms(q),title=normalise(item.title),hay=normalise(`${item.title} ${item.sub||''} ${item.tokens||''}`);
  if(!query)return 0;
  let score=0;
  if(title===query)score+=120;
  if(title.startsWith(query))score+=70;
  if(title.includes(query))score+=45;
  for(const term of terms){if(title.split(' ').some(w=>w.startsWith(term)))score+=16;else if(hay.includes(term))score+=8;else if(term.length>=4&&hay.split(' ').some(w=>w.includes(term)||term.includes(w)))score+=3;}
  if(terms.every(t=>hay.includes(t)||normalise(synonyms[t]||'').split(' ').some(x=>x&&hay.includes(x))))score+=18;
  return score;
}
function resultsFor(q,group='All'){
  if(!q.trim())return [];
  return INDEX.map(x=>({...x,_score:rank(x,q)})).filter(x=>x._score>0&&(group==='All'||x.group===group)).sort((a,b)=>b._score-a._score||a.title.localeCompare(b.title)).slice(0,32);
}

function searchMarkup(initial=''){
  const p=load(),next=lessons.find(l=>!p.completedLessons.includes(l.id));
  return `<div class="bp-search-page">
    <section class="bp-search-hero" aria-labelledby="bp-search-title">
      <div class="eyebrow">COMMAND CENTRE</div><h1 id="bp-search-title">Find anything.<br><em>Then get back to work.</em></h1><p>Search courses, topics, lessons, assessments, resources and tools from one keyboard-first command centre.</p>
      <div class="bp-command-search"><span aria-hidden="true">⌕</span><label class="sr-only" for="bp-command-input">Search Brainpower</label><input id="bp-command-input" type="search" autocomplete="off" value="${esc(initial)}" placeholder="Try “diff calc”, “spesh vectors” or “kinematics”…"><kbd>/</kbd></div>
      <div class="bp-command-meta"><span>${INDEX.length} indexed destinations</span><span>↑ ↓ to move</span><span>Enter to open</span><span>Esc to clear</span></div>
    </section>
    <section class="bp-search-workspace">
      <div class="bp-command-groups" role="tablist" aria-label="Search result category">${['All','Learn','Tests','Resources','Tools'].map((g,i)=>`<button type="button" role="tab" aria-selected="${i===0}" data-command-group="${g}" class="${i===0?'is-active':''}">${g}</button>`).join('')}</div>
      <div class="bp-command-layout">
        <main class="bp-command-results" id="bp-command-results" aria-live="polite"></main>
        <aside class="bp-command-side">
          <div class="bp-command-side__card"><small>QUICK COMMANDS</small>${next?`<a href="#lesson/${next.id}"><span>↗</span><div><b>Continue lesson</b><em>${esc(next.title)}</em></div></a>`:''}<a href="#practice"><span>⌁</span><div><b>Open Practice</b><em>Build a focused session</em></div></a><a href="#tests"><span>□</span><div><b>Open Test Centre</b><em>Formal assessments</em></div></a><a href="#progress"><span>◎</span><div><b>Open Progress</b><em>Your local study record</em></div></a></div>
          <div class="bp-command-side__card"><small>SEARCH TIPS</small><p>Abbreviations work too. Try <b>spesh vectors</b>, <b>diff calc</b>, <b>prob</b>, or a test title.</p></div>
        </aside>
      </div>
    </section>
  </div>`;
}

function notFoundMarkup(){
  const {base}=routeInfo();
  return `<div class="bp-state-page"><section class="bp-state-card" role="main"><div class="bp-state-card__art"><img src="public/brand/brainy.svg" alt="" aria-hidden="true"><span>404</span></div><div class="eyebrow dark">ROUTE NOT FOUND</div><h1>That page escaped the domain.</h1><p><code>#${esc(base)}</code> is not a current Brainpower destination. Use search to find the lesson, assessment or resource you were looking for.</p><div class="bp-state-actions"><a class="btn primary" href="#search">Search Brainpower</a><a class="btn ghost" href="#home">Back home</a></div><div class="bp-state-shortcuts"><a href="#learn">Learn</a><a href="#practice">Practice</a><a href="#tests">Tests</a><a href="#resources">Resources</a></div></section></div>`;
}

let activeSearchCleanup=null;
function bindCommandSearch(root){
  activeSearchCleanup?.();
  const input=$('#bp-command-input',root),out=$('#bp-command-results',root),tabs=$$('[data-command-group]',root);
  if(!input||!out)return;
  let group='All',selected=-1;
  const render=()=>{
    const q=input.value.trim(),rows=resultsFor(q,group);selected=-1;
    if(!q){out.innerHTML=`<div class="bp-command-empty is-idle"><div class="bp-command-empty__mark">/</div><h2>Start typing.</h2><p>Brainpower will search ${courses.length} courses, ${lessons.length} lessons, ${tests.length} tests, ${resources.length} resources and the current toolset.</p><div class="bp-command-suggestions"><button data-search-suggestion="integration">integration</button><button data-search-suggestion="spesh vectors">spesh vectors</button><button data-search-suggestion="kinematics">kinematics</button><button data-search-suggestion="probability">probability</button></div></div>`;}
    else if(!rows.length){out.innerHTML=`<div class="bp-command-empty"><div class="bp-command-empty__mark">?</div><h2>No match for “${esc(q)}”.</h2><p>Try a broader topic name or search all categories.</p><button class="btn ghost" data-command-broaden type="button">Search all categories</button></div>`;}
    else{out.innerHTML=`<div class="bp-command-summary"><b>${rows.length}</b><span>best match${rows.length===1?'':'es'}${group==='All'?'':` in ${group}`}</span></div><div class="bp-command-list">${rows.map((r,i)=>`<a href="#${r.go}" class="bp-command-result" data-result-index="${i}"><span class="bp-command-result__type">${esc(r.type)}</span><div><strong>${esc(r.title)}</strong><small>${esc(r.sub||'')}</small></div><b>→</b></a>`).join('')}</div>`;}
    $$('[data-search-suggestion]',out).forEach(b=>b.addEventListener('click',()=>{input.value=b.dataset.searchSuggestion;render();input.focus()}));
    $('[data-command-broaden]',out)?.addEventListener('click',()=>{group='All';tabs.forEach(t=>{const on=t.dataset.commandGroup==='All';t.classList.toggle('is-active',on);t.setAttribute('aria-selected',String(on))});render()});
  };
  const select=i=>{const rows=$$('.bp-command-result',out);if(!rows.length)return;selected=(i+rows.length)%rows.length;rows.forEach((r,j)=>r.classList.toggle('is-selected',j===selected));rows[selected].scrollIntoView({block:'nearest'});};
  const key=e=>{if(e.key==='ArrowDown'){e.preventDefault();select(selected+1)}else if(e.key==='ArrowUp'){e.preventDefault();select(selected-1)}else if(e.key==='Enter'&&selected>=0){e.preventDefault();$('.bp-command-result.is-selected',out)?.click()}else if(e.key==='Escape'&&input.value){e.preventDefault();input.value='';render()}};
  input.addEventListener('input',render);input.addEventListener('keydown',key);
  tabs.forEach(t=>t.addEventListener('click',()=>{group=t.dataset.commandGroup;tabs.forEach(x=>{const on=x===t;x.classList.toggle('is-active',on);x.setAttribute('aria-selected',String(on))});render();input.focus()}));
  render();requestAnimationFrame(()=>input.focus({preventScroll:true}));
  activeSearchCleanup=()=>{input.removeEventListener('keydown',key);activeSearchCleanup=null};
}

let queued=false;
function apply(){
  const {base,params}=routeInfo();
  const main=$('main');if(!main)return;
  if(base==='about'&&main.dataset.bpSecondary!=='about'){
    main.dataset.bpSecondary='about';main.className='bp-secondary-main';main.innerHTML=aboutMarkup();
  }else if(base==='search'&&main.dataset.bpSecondary!=='search'){
    main.dataset.bpSecondary='search';main.className='bp-secondary-main';const initial=params.get('q')||'';main.innerHTML=searchMarkup(initial);bindCommandSearch(main);
  }else if(!known.has(base)&&main.dataset.bpSecondary!=='404'){
    main.dataset.bpSecondary='404';main.className='bp-secondary-main';main.innerHTML=notFoundMarkup();
  }
}
function queue(){if(queued)return;queued=true;queueMicrotask(()=>{queued=false;apply()})}
const app=$('#app');if(app)new MutationObserver(queue).observe(app,{childList:true,subtree:true});
addEventListener('hashchange',()=>setTimeout(apply,0));
addEventListener('keydown',e=>{
  if(e.key!=='/'||e.metaKey||e.ctrlKey||e.altKey)return;
  const tag=e.target?.tagName?.toLowerCase();if(tag==='input'||tag==='textarea'||e.target?.isContentEditable)return;
  e.preventDefault();
  if(routeInfo().base==='search')$('#bp-command-input')?.focus();else location.hash='search';
});
apply();
