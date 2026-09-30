import {header,footer,questionCard,testCard,resourceCard} from './components.js';
import {homePage,learnPage,coursePage,lessonPage,practicePage,testsPage,testPage,examPage,resourcesPage,toolsPage,arcadePage,progressPage,aboutPage,searchPage,notFoundPage,searchResultsMarkup} from './pages.js';
import {practiceQuestions,questionById} from './data/questions.js';
import {courses} from './data/courses.js';
import {tests} from './data/tests.js';
import {resources} from './data/resources.js';
import {checkAnswer,parseRouteQuery,qs,qsa,renderMathString,routeTo,clamp} from './utils.js';
import {awardQuestion,completeLesson,addScore,toggleBookmark,load,saveArcade,resetProgress,isBookmarked} from './progress/store.js';

const app=document.querySelector('#app');
let cleanups=[];
const addCleanup=fn=>cleanups.push(fn);
function cleanup(){cleanups.forEach(fn=>{try{fn()}catch{}});cleanups=[]}

function currentPage(){
  const {parts,params}=parseRouteQuery(); const [base,id]=parts;
  switch(base){
    case 'home': return homePage();
    case 'learn': return learnPage();
    case 'course': return coursePage(id);
    case 'lesson': return lessonPage(id);
    case 'practice': return practicePage(params);
    case 'tests': return testsPage();
    case 'test': return testPage(id);
    case 'exam': return examPage(id);
    case 'resources': return resourcesPage(params);
    case 'tools': return toolsPage();
    case 'arcade': return arcadePage();
    case 'progress': return progressPage();
    case 'about': return aboutPage();
    case 'search': return searchPage();
    default: return notFoundPage();
  }
}

function render(){
  cleanup();
  const {parts}=parseRouteQuery(); const base=parts[0]||'home';
  const page=currentPage();
  if(base==='exam') app.innerHTML=page;
  else app.innerHTML=`<div class="shell">${header(base)}<main>${page}</main>${footer()}</div>`;
  bindCommon();
  bindQuestions();
  bindRoute(base);
  window.scrollTo({top:0,behavior:'instant'});
}

function bindBookmarks(){qsa('.bookmark').forEach(btn=>{if(btn.dataset.bookmark&&isBookmarked(btn.dataset.bookmark))btn.textContent='★ Saved';btn.addEventListener('click',()=>{const id=btn.dataset.bookmark;toggleBookmark(id);btn.textContent=isBookmarked(id)?'★ Saved':'☆ Save'})})}

function bindCommon(){
  const theme=qs('#theme-toggle');
  theme?.addEventListener('click',()=>{document.documentElement.classList.toggle('dark');localStorage.setItem('bp-theme',document.documentElement.classList.contains('dark')?'dark':'light')});
  const menu=qs('#menu-toggle'), mobile=qs('#mobile-nav');
  menu?.addEventListener('click',()=>{mobile.hidden=!mobile.hidden});
  qsa('#mobile-nav a').forEach(a=>a.addEventListener('click',()=>{mobile.hidden=true}));
  bindBookmarks();
}

function bindQuestions(root=document){
  qsa('[data-question]',root).forEach(card=>{
    if(card.dataset.bound==='1')return; card.dataset.bound='1';
    const q=questionById(card.dataset.question); if(!q)return;
    const fb=qs('.feedback',card);
    const submit=value=>{
      const ok=checkAnswer(q,value); awardQuestion(q.id,q.xp||10,ok);
      qsa('.choice',card).forEach(b=>b.disabled=true);
      const input=qs('input',card); if(input)input.disabled=true;
      const check=qs('.check-answer',card); if(check)check.disabled=true;
      fb.hidden=false; fb.className=`feedback ${ok?'good':'bad'}`;
      fb.innerHTML=ok?`<strong>✓ Correct.</strong> ${renderMathString(q.solution)} <span class="feedback-xp">+${q.xp||10} XP</span>`:`<strong>Not quite.</strong> ${renderMathString(q.solution)}`;
    };
    qs('.check-answer',card)?.addEventListener('click',()=>submit(qs('input',card)?.value||''));
    qs('input',card)?.addEventListener('keydown',e=>{if(e.key==='Enter')submit(e.currentTarget.value)});
    qsa('[data-choice]',card).forEach(btn=>btn.addEventListener('click',()=>{qsa('[data-choice]',card).forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');submit(btn.dataset.choice)}));
  });
}

function bindRoute(base){
  if(base==='lesson') bindLesson();
  if(base==='practice') bindPractice();
  if(base==='tests') bindTests();
  if(base==='exam') bindExam();
  if(base==='resources') bindResources();
  if(base==='tools') bindTools();
  if(base==='arcade') bindArcade();
  if(base==='progress') bindProgress();
  if(base==='search') bindSearch();
}

function bindLesson(){
  qs('.complete-lesson')?.addEventListener('click',e=>{completeLesson(e.currentTarget.dataset.lesson,Number(e.currentTarget.dataset.xp||40));render()});
}

function bindPractice(){
  const search=qs('#practice-search'), course=qs('#practice-course'), topic=qs('#practice-topic'), diff=qs('#practice-difficulty'), list=qs('#practice-list'), count=qs('#practice-count');
  const focus=list?.dataset.focus||'';
  function updateTopics(){
    const c=course.value; const topics=[...new Map(practiceQuestions.filter(q=>c==='all'||q.course===c).map(q=>[q.topic,q.topicLabel])).entries()];
    const old=topic.value; topic.innerHTML='<option value="all">All topics</option>'+topics.map(([id,label])=>`<option value="${id}">${label}</option>`).join('');
    if([...topic.options].some(o=>o.value===old))topic.value=old;
  }
  function filter(){
    const term=search.value.trim().toLowerCase(), c=course.value, t=topic.value, d=diff.value;
    const matches=practiceQuestions.filter(q=>(c==='all'||q.course===c)&&(t==='all'||q.topic===t)&&(d==='all'||q.difficulty===d)&&(!term||`${q.prompt} ${q.topicLabel} ${q.difficulty}`.toLowerCase().includes(term)));
    count.textContent=matches.length;
    list.innerHTML=matches.length?matches.map(q=>questionCard(q)).join(''):`<div class="empty-state"><div class="empty-icon">∅</div><h3>No matching questions</h3><p>Try clearing one of your filters.</p></div>`;
    bindQuestions(list);
    if(focus){const target=qs(`[data-question="${CSS.escape(focus)}"]`,list);target?.scrollIntoView({behavior:'smooth',block:'center'});target?.classList.add('focus-flash')}
  }
  updateTopics(); filter();
  course.addEventListener('change',()=>{updateTopics();filter()}); topic.addEventListener('change',filter); diff.addEventListener('change',filter); search.addEventListener('input',filter);
}

function bindTests(){
  const s=qs('#test-search'),c=qs('#test-course'),d=qs('#test-diff'),list=qs('#test-list');
  const filter=()=>{const term=s.value.toLowerCase(),cv=c.value,dv=d.value;const rows=tests.filter(t=>(cv==='all'||t.course===cv)&&(dv==='all'||t.difficulty===dv)&&(!term||`${t.title} ${t.topics.join(' ')} ${t.subject}`.toLowerCase().includes(term)));list.innerHTML=rows.length?rows.map(testCard).join(''):'<div class="empty-state"><h3>No matching tests yet</h3><p>The library will grow as new Brainpower assessments are added.</p></div>'};
  s.addEventListener('input',filter);c.addEventListener('change',filter);d.addEventListener('change',filter);
}

function bindResources(){
  const s=qs('#vault-search'),t=qs('#vault-type'),c=qs('#vault-course'),list=qs('#vault-list'); const focus=list?.dataset.focus||'';
  const filter=()=>{const term=s.value.toLowerCase(),tv=t.value,cv=c.value;const rows=resources.filter(r=>(tv==='all'||r.type===tv)&&(cv==='all'||r.course===cv)&&(!term||`${r.title} ${r.type} ${r.topics.join(' ')}`.toLowerCase().includes(term)));list.innerHTML=rows.length?rows.map(resourceCard).join(''):'<div class="empty-state"><h3>No matching resources</h3><p>Try another search term.</p></div>';bindBookmarks();if(focus)qs(`[data-resource="${CSS.escape(focus)}"]`,list)?.scrollIntoView({behavior:'smooth',block:'center'})};
  s.addEventListener('input',filter);t.addEventListener('change',filter);c.addEventListener('change',filter);
}

function bindExam(){
  const start=qs('#exam-start'),pause=qs('#exam-pause'),reset=qs('#exam-reset'),display=qs('#exam-timer'),label=qs('#timer-label'),phaseEl=qs('#exam-phase'),help=qs('#phase-help');
  const reading=Number(start?.dataset.reading||0)*60, writing=Number(start?.dataset.writing||0)*60;
  let phase='reading',remain=reading,timer=null,running=false,started=false;
  const format=n=>`${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`;
  function paint(){display.textContent=format(remain);phaseEl.textContent=started?(phase==='reading'?'READING':'WRITING'):'READY';label.textContent=phase==='reading'?'Reading time':'Writing time';help.textContent=!started?'Start when you are ready. Reading time will run first.':phase==='reading'?'Do not begin writing until reading time finishes.':'Writing time is running.'}
  function tick(){remain--;if(remain<=0){if(phase==='reading'){phase='writing';remain=writing;paint()}else{clearInterval(timer);timer=null;running=false;remain=0;paint();phaseEl.textContent='TIME';help.textContent='Writing time has finished.'}}else paint()}
  function play(){if(running)return;started=true;running=true;start.textContent='Resume';pause.disabled=false;timer=setInterval(tick,1000);paint()}
  start?.addEventListener('click',play); pause?.addEventListener('click',()=>{if(!running)return;clearInterval(timer);timer=null;running=false;pause.disabled=true;help.textContent='Timer paused.'}); reset?.addEventListener('click',()=>{clearInterval(timer);timer=null;running=false;started=false;phase='reading';remain=reading;start.textContent='Start test';pause.disabled=true;paint()});
  qs('#save-score')?.addEventListener('click',e=>{const input=qs('#exam-score'),score=Number(input.value),max=Number(e.currentTarget.dataset.max),msg=qs('#score-message');if(!Number.isFinite(score)||score<0||score>max){msg.innerHTML='<div class="feedback bad">Enter a valid score.</div>';return}addScore(e.currentTarget.dataset.test,score,max);msg.innerHTML=`<div class="feedback good"><strong>Saved.</strong> ${score}/${max} = ${Math.round(score/max*100)}%.</div>`});
  paint(); addCleanup(()=>clearInterval(timer));
}

function bindTools(){
  qs('#pct-calc')?.addEventListener('click',()=>{const a=Number(qs('#pct-mark').value),b=Number(qs('#pct-total').value);qs('#pct-result').textContent=Number.isFinite(a)&&b>0?`${(a/b*100).toFixed(1)}%`:'—'});
  qs('#target-calc')?.addEventListener('click',()=>{const pct=Number(qs('#target-percent').value),total=Number(qs('#target-total').value);qs('#target-result').textContent=Number.isFinite(pct)&&pct>=0&&Number.isFinite(total)&&total>0?`${Math.ceil(total*pct/100)} / ${total}`:'—'});
  const trig={0:['0','1','0'],30:['1/2','√3/2','√3/3'],45:['√2/2','√2/2','1'],60:['√3/2','1/2','√3'],90:['1','0','undefined']};
  const trigSelect=qs('#trig-angle'),trigOut=qs('#trig-result');const updateTrig=()=>{const [s,c,t]=trig[trigSelect.value];trigOut.innerHTML=`<span>sin <b>${s}</b></span><span>cos <b>${c}</b></span><span>tan <b>${t}</b></span>`};trigSelect?.addEventListener('change',updateTrig);updateTrig();
  qs('#random-question')?.addEventListener('click',()=>{const q=practiceQuestions[Math.floor(Math.random()*practiceQuestions.length)];const box=qs('#random-question-box');box.innerHTML=questionCard(q,{compact:true});bindQuestions(box)});
  let studyRemain=25*60,studyTimer=null;const clock=qs('#study-clock');const studyPaint=()=>clock.textContent=`${Math.floor(studyRemain/60)}:${String(studyRemain%60).padStart(2,'0')}`;qs('#study-start')?.addEventListener('click',e=>{if(studyTimer){clearInterval(studyTimer);studyTimer=null;e.currentTarget.textContent='Start';return}e.currentTarget.textContent='Pause';studyTimer=setInterval(()=>{studyRemain=Math.max(0,studyRemain-1);studyPaint();if(!studyRemain){clearInterval(studyTimer);studyTimer=null;e.currentTarget.textContent='Start'}},1000)});qs('#study-reset')?.addEventListener('click',()=>{clearInterval(studyTimer);studyTimer=null;studyRemain=25*60;studyPaint();qs('#study-start').textContent='Start'});addCleanup(()=>clearInterval(studyTimer));studyPaint();
  const drawVector=()=>{const x=clamp(Number(qs('#vec-x').value)||0,-20,20),y=clamp(Number(qs('#vec-y').value)||0,-20,20),svg=qs('#vector-svg');const mag=Math.hypot(x,y);const scale=mag?60/Math.max(5,mag):10;const ox=120,oy=90,ex=ox+x*scale,ey=oy-y*scale;svg.innerHTML=`<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="currentColor"></path></marker></defs><line x1="15" y1="90" x2="225" y2="90" class="axis"/><line x1="120" y1="15" x2="120" y2="165" class="axis"/><line x1="${ox}" y1="${oy}" x2="${ex}" y2="${ey}" class="vector" marker-end="url(#arrow)"/><circle cx="${ex}" cy="${ey}" r="4" class="vector-point"/>`;qs('#vector-info').textContent=`v = (${x}, ${y}) • |v| = ${mag.toFixed(3)}`};qs('#vector-draw')?.addEventListener('click',drawVector);drawVector();
}

function bindArcade(){
  bindDerivativeDash(); bindBird();
}

function bindDerivativeDash(){
  const bank=[
    ['d/dx (x³)','3x^2'],['d/dx (5x⁴)','20x^3'],['d/dx (sin x)','cosx'],['d/dx (e^x)','e^x'],['d/dx (4x² - 3x)','8x-3'],['d/dx ((2x+1)³)','6(2x+1)^2'],['d/dx (ln x)','1/x'],['d/dx (x⁵ + x)','5x^4+1']
  ];
  let active=false,score=0,lives=3,streak=0,current=null;
  const q=qs('#dash-question'),ans=qs('#dash-answer'),submit=qs('#dash-submit'),msg=qs('#dash-message'),scoreEl=qs('#dash-score'),lifeEl=qs('#dash-lives'),streakEl=qs('#dash-streak'),start=qs('#dash-start');
  const norm=s=>String(s).toLowerCase().replace(/\s+/g,'').replace(/\*/g,'');
  const next=()=>{current=bank[Math.floor(Math.random()*bank.length)];q.textContent=current[0];ans.value='';ans.focus()};
  const paint=()=>{scoreEl.textContent=score;streakEl.textContent=streak;lifeEl.textContent='♥'.repeat(lives)+'♡'.repeat(3-lives)};
  const end=()=>{active=false;ans.disabled=true;submit.disabled=true;start.hidden=false;start.textContent='Play again';q.textContent='Game over';msg.textContent=`Final score: ${score}.`;saveArcade('derivativeDash',score)};
  const check=()=>{if(!active)return;if(norm(ans.value)===norm(current[1])){score++;streak++;msg.textContent=streak>=3?`Correct - ${streak} in a row!`:'Correct.'}else{lives--;streak=0;msg.textContent=`Missed. Answer: ${current[1]}`}paint();if(lives<=0)end();else next()};
  start?.addEventListener('click',()=>{active=true;score=0;lives=3;streak=0;ans.disabled=false;submit.disabled=false;start.hidden=true;msg.textContent='Go.';paint();next()});submit?.addEventListener('click',check);ans?.addEventListener('keydown',e=>{if(e.key==='Enter')check()});
}

function bindBird(){
  const canvas=qs('#bird-canvas'); if(!canvas)return; const ctx=canvas.getContext('2d');const overlay=qs('#bird-overlay'),start=qs('#bird-start');
  let raf=0,running=false,last=0,score=0,bird,obstacles=[];const labels=['SAC','EXAM 1','EXAM 2','CAS ERROR','DOMAIN'];
  function reset(){bird={x:150,y:180,vy:0,r:16};obstacles=[];score=0;last=0}
  function flap(){if(running)bird.vy=-6.2}
  function spawn(){const gap=128;const mid=80+Math.random()*200;obstacles.push({x:740,w:72,top:mid-gap/2,bottom:mid+gap/2,label:labels[Math.floor(Math.random()*labels.length)],counted:false})}
  function hit(o){return bird.x+bird.r>o.x&&bird.x-bird.r<o.x+o.w&&(bird.y-bird.r<o.top||bird.y+bird.r>o.bottom)}
  function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);const grad=ctx.createLinearGradient(0,0,0,360);grad.addColorStop(0,'#0c4776');grad.addColorStop(1,'#08283f');ctx.fillStyle=grad;ctx.fillRect(0,0,720,360);ctx.fillStyle='rgba(255,255,255,.08)';for(let i=0;i<12;i++){ctx.beginPath();ctx.arc((i*83+score*5)%760,35+(i%4)*78,2,0,Math.PI*2);ctx.fill()}ctx.fillStyle='#ff6255';ctx.beginPath();ctx.arc(bird.x,bird.y,bird.r,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.font='900 16px system-ui';ctx.textAlign='center';ctx.fillText('B',bird.x,bird.y+6);obstacles.forEach(o=>{ctx.fillStyle='#e7eef5';ctx.fillRect(o.x,0,o.w,o.top);ctx.fillRect(o.x,o.bottom,o.w,360-o.bottom);ctx.fillStyle='#082f50';ctx.font='800 11px system-ui';ctx.save();ctx.translate(o.x+o.w/2,Math.max(24,o.top-20));ctx.rotate(-Math.PI/2);ctx.fillText(o.label,0,0);ctx.restore();});ctx.fillStyle='#fff';ctx.textAlign='left';ctx.font='800 17px system-ui';ctx.fillText(`Score ${score}`,18,28)}
  function gameOver(){running=false;cancelAnimationFrame(raf);saveArcade('bird',score);overlay.hidden=false;overlay.querySelector('h3').textContent=`Study score: ${Math.max(23,Math.min(50,23+score))}`;overlay.querySelector('p').textContent=score===0?'Statistically impressive.':`You cleared ${score} academic obstacle${score===1?'':'s'}.`;start.textContent='Try again'}
  function loop(ts){if(!running)return;const dt=Math.min(32,ts-last||16);last=ts;bird.vy+=0.0009*dt*16;bird.y+=bird.vy*dt/16;if(!obstacles.length||obstacles.at(-1).x<480)spawn();obstacles.forEach(o=>{o.x-=3.1*dt/16;if(!o.counted&&o.x+o.w<bird.x){o.counted=true;score++}});obstacles=obstacles.filter(o=>o.x>-100);if(bird.y-bird.r<0||bird.y+bird.r>360||obstacles.some(hit)){draw();gameOver();return}draw();raf=requestAnimationFrame(loop)}
  start?.addEventListener('click',()=>{reset();overlay.hidden=true;running=true;raf=requestAnimationFrame(loop)});canvas.addEventListener('pointerdown',flap);const key=e=>{if(e.code==='Space'&&running){e.preventDefault();flap()}};window.addEventListener('keydown',key);addCleanup(()=>{cancelAnimationFrame(raf);window.removeEventListener('keydown',key)});reset();draw();
}

function bindProgress(){
  qs('#reset-progress')?.addEventListener('click',()=>{if(confirm('Reset all locally saved Brainpower progress on this browser?')){resetProgress();render()}});
}
function bindSearch(){const input=qs('#global-search'),out=qs('#search-results');const update=()=>out.innerHTML=searchResultsMarkup(input.value);input?.addEventListener('input',update);input?.focus()}

if(localStorage.getItem('bp-theme')==='dark')document.documentElement.classList.add('dark');
window.addEventListener('hashchange',render);
if(!location.hash)history.replaceState(null,'','#home');
render();
// If KaTeX arrives a fraction later, repaint once so raw delimiters never linger.
setTimeout(()=>{if(window.katex)render()},250);
