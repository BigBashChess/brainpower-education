import {header,footer,questionCard,testCard,resourceCard} from './components.js';
import {homePage,learnPage,coursePage,diagnosticPage,lessonPage,practicePage,testsPage,testPage,examPage,resourcesPage,toolsPage,arcadePage,adminPage,progressPage,aboutPage,searchPage,notFoundPage,searchResultsMarkup} from './pages.js';
import {practiceQuestions,questionById} from './data/questions.js';
import {courses} from './data/courses.js';
import {lessonById} from './data/lessons.js';
import {tests} from './data/tests.js';
import {resources} from './data/resources.js';
import {checkAnswer,parseRouteQuery,qs,qsa,renderMathString,routeTo,clamp,answerPreview} from './utils.js';
import {awardQuestion,completeLesson,addScore,toggleBookmark,load,visitLesson,saveArcade,resetProgress,isBookmarked} from './progress/store.js';
import {ADMIN_USERNAME,ADMIN_PASSWORD_SHA256,ADMIN_SESSION_KEY,ADMIN_DRAFT_KEY} from './data/admin.js';
import {adminTests,adminResources,adminQuestions} from './data/admin-content.js';

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
    case 'diagnostic': return diagnosticPage(id);
    case 'lesson': return lessonPage(id);
    case 'practice': return practicePage(params);
    case 'tests': return testsPage();
    case 'test': return testPage(id);
    case 'exam': return examPage(id);
    case 'resources': return resourcesPage(params);
    case 'tools': return toolsPage();
    case 'arcade': return arcadePage();
    case 'admin': return adminPage();
    case 'progress': return progressPage();
    case 'about': return aboutPage();
    case 'search': return searchPage();
    default: return notFoundPage();
  }
}

function render(){
  cleanup();
  const {parts}=parseRouteQuery(); const base=parts[0]||'home';
  if(base==='lesson'&&lessonById(parts[1]))visitLesson(parts[1]);
  const page=currentPage();
  if(base==='exam'&&tests.some(t=>t.id===parts[1])) app.innerHTML=page;
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
    const fb=qs('.feedback',card), input=qs('[data-math-input]',card), preview=qs('[data-math-preview]',card);
    const updatePreview=()=>{if(preview)preview.innerHTML=answerPreview(input?.value||'')};
    const submit=value=>{
      const ok=checkAnswer(q,value); awardQuestion(q.id,q.xp||10,ok);
      qsa('.choice',card).forEach(b=>b.disabled=true);
      if(input)input.disabled=true;
      qsa('[data-math-insert]',card).forEach(b=>b.disabled=true);
      const check=qs('.check-answer',card); if(check)check.disabled=true;
      fb.hidden=false; fb.className=`feedback ${ok?'good':'bad'}`;
      fb.innerHTML=ok?`<strong>✓ Correct.</strong> ${renderMathString(q.solution)} <span class="feedback-xp">+${q.xp||10} XP</span>`:`<strong>Not quite.</strong> ${renderMathString(q.solution)}`;
    };
    qs('.check-answer',card)?.addEventListener('click',()=>submit(input?.value||''));
    input?.addEventListener('keydown',e=>{if(e.key==='Enter')submit(e.currentTarget.value)});
    input?.addEventListener('input',updatePreview);
    qsa('[data-math-insert]',card).forEach(btn=>btn.addEventListener('click',()=>{
      if(!input)return; const ins=btn.dataset.mathInsert||''; const start=input.selectionStart??input.value.length,end=input.selectionEnd??start;
      input.value=input.value.slice(0,start)+ins+input.value.slice(end);
      const pos=start+ins.length-Number(btn.dataset.back||0); input.focus(); input.setSelectionRange(pos,pos); updatePreview();
    }));
    qsa('[data-choice]',card).forEach(btn=>btn.addEventListener('click',()=>{qsa('[data-choice]',card).forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');submit(btn.dataset.choice)}));
    updatePreview();
  });
}


function bindRoute(base){
  if(base==='lesson') bindLesson();
  if(base==='practice') bindPractice();
  if(base==='tests') bindTests();
  if(base==='exam') bindExam();
  if(base==='resources') bindResources();
  if(base==='tools') bindTools();
  if(base==='admin') bindAdmin();
  if(base==='progress') bindProgress();
  if(base==='search') bindSearch();
}

function bindLesson(){
  qs('.complete-lesson')?.addEventListener('click',e=>{completeLesson(e.currentTarget.dataset.lesson,Number(e.currentTarget.dataset.xp||40));render()});
}

function bindPractice(){
  const search=qs('#practice-search'), course=qs('#practice-course'), topic=qs('#practice-topic'), diff=qs('#practice-difficulty'), list=qs('#practice-list'), count=qs('#practice-count'), label=qs('#practice-mode-label');
  const focus=list?.dataset.focus||''; let mode='all'; let shuffled=false;
  const p=load();
  function updateTopics(){
    const c=course.value; const topics=[...new Map(practiceQuestions.filter(q=>c==='all'||q.course===c).map(q=>[q.topic,q.topicLabel])).entries()];
    const requested=topic.dataset.preset||topic.value; topic.innerHTML='<option value="all">All topics</option>'+topics.map(([id,title])=>`<option value="${id}">${title}</option>`).join('');
    if([...topic.options].some(o=>o.value===requested))topic.value=requested; topic.dataset.preset='';
  }
  const shuffleRows=rows=>{const a=[...rows];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  function filter(){
    const term=search.value.trim().toLowerCase(), c=course.value, t=topic.value, d=diff.value;
    let matches=practiceQuestions.filter(q=>(c==='all'||q.course===c)&&(t==='all'||q.topic===t)&&(d==='all'||q.difficulty===d)&&(!term||`${q.prompt} ${q.topicLabel} ${q.difficulty}`.toLowerCase().includes(term)));
    if(mode==='unresolved')matches=matches.filter(q=>p.attemptedQuestions?.[q.id]&&!p.correctQuestions.includes(q.id));
    if(mode==='separator')matches=matches.filter(q=>q.difficulty==='Separator');
    if(shuffled||mode==='quick')matches=shuffleRows(matches);
    if(mode==='quick')matches=matches.slice(0,5);
    count.textContent=matches.length; label.textContent={all:'Full bank',quick:'Quick 5',unresolved:'Revisit misses',separator:'Separator only'}[mode];
    list.innerHTML=matches.length?matches.map(q=>questionCard(q)).join(''):`<div class="empty-state"><div class="empty-icon">∅</div><h3>No matching questions</h3><p>${mode==='unresolved'?'You have no unresolved questions in this filter.':'Try clearing one of your filters.'}</p></div>`;
    bindQuestions(list);
    if(focus){const target=qs(`[data-question="${CSS.escape(focus)}"]`,list);target?.scrollIntoView({behavior:'smooth',block:'center'});target?.classList.add('focus-flash')}
  }
  qsa('[data-practice-mode]').forEach(btn=>btn.addEventListener('click',()=>{qsa('[data-practice-mode]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');mode=btn.dataset.practiceMode;filter()}));
  qs('#practice-shuffle')?.addEventListener('click',()=>{shuffled=true;filter()});
  qs('#practice-reset')?.addEventListener('click',()=>{search.value='';course.value='all';diff.value='all';mode='all';shuffled=false;qsa('[data-practice-mode]').forEach(x=>x.classList.toggle('active',x.dataset.practiceMode==='all'));updateTopics();topic.value='all';filter()});
  updateTopics(); filter();
  course.addEventListener('change',()=>{updateTopics();filter()}); topic.addEventListener('change',filter); diff.addEventListener('change',filter); search.addEventListener('input',filter);
}

function bindTests(){
  const s=qs('#test-search'),c=qs('#test-course'),d=qs('#test-diff'),tech=qs('#test-tech'),list=qs('#test-list'),count=qs('#test-count');
  const filter=()=>{const term=s.value.toLowerCase(),cv=c.value,dv=d.value,tv=tech.value;const rows=tests.filter(t=>(cv==='all'||t.course===cv)&&(dv==='all'||t.difficulty===dv)&&(tv==='all'||t.tech===tv)&&(!term||`${t.title} ${t.topics.join(' ')} ${t.subject}`.toLowerCase().includes(term)));count.textContent=rows.length;list.innerHTML=rows.length?rows.map(testCard).join(''):'<div class="empty-state"><h3>No matching tests yet</h3><p>Try a broader filter. The library will grow as new Brainpower assessments are added.</p></div>'};
  s.addEventListener('input',filter);c.addEventListener('change',filter);d.addEventListener('change',filter);tech.addEventListener('change',filter);
}

function bindResources(){
  const s=qs('#vault-search'),t=qs('#vault-type'),c=qs('#vault-course'),sort=qs('#vault-sort'),list=qs('#vault-list'),count=qs('#vault-count'); const focus=list?.dataset.focus||'';
  const filter=()=>{const term=s.value.toLowerCase(),tv=t.value,cv=c.value;let rows=resources.filter(r=>(tv==='all'||r.type===tv)&&(cv==='all'||r.course===cv)&&(!term||`${r.title} ${r.type} ${r.topics.join(' ')}`.toLowerCase().includes(term)));rows=[...rows].sort((a,b)=>sort.value==='type'?a.type.localeCompare(b.type)||a.title.localeCompare(b.title):a.title.localeCompare(b.title));count.textContent=rows.length;list.innerHTML=rows.length?rows.map(resourceCard).join(''):'<div class="empty-state"><h3>No matching resources</h3><p>Try another search term or clear a filter.</p></div>';bindBookmarks();if(focus)qs(`[data-resource="${CSS.escape(focus)}"]`,list)?.scrollIntoView({behavior:'smooth',block:'center'})};
  qsa('[data-vault-type]').forEach(btn=>btn.addEventListener('click',()=>{qsa('[data-vault-type]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');t.value=btn.dataset.vaultType;filter()}));
  s.addEventListener('input',filter);t.addEventListener('change',()=>{qsa('[data-vault-type]').forEach(x=>x.classList.toggle('active',x.dataset.vaultType===t.value));filter()});c.addEventListener('change',filter);sort.addEventListener('change',filter);filter();
}

function bindExam(){
  const begin=qs('#exam-begin'),rules=qs('#exam-rules'),workspace=qs('#exam-workspace'),finished=qs('#exam-finished'),start=qs('#exam-start'),pause=qs('#exam-pause'),reset=null,skip=qs('#exam-skip-reading'),finish=qs('#exam-finish'),display=qs('#exam-timer'),label=qs('#timer-label'),phaseEl=qs('#exam-phase'),help=qs('#phase-help');
  const reading=Number(start?.dataset.reading||0)*60, writing=Number(start?.dataset.writing||0)*60;
  let phase='reading',remain=reading,timer=null,running=false,started=false;
  const format=n=>`${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`;
  function paint(){if(!display)return;display.textContent=format(remain);phaseEl.textContent=started?(phase==='reading'?'READING':'WRITING'):'READY';label.textContent=phase==='reading'?'Reading time':'Writing time';help.textContent=!started?'Start when you are ready.':phase==='reading'?'Do not begin writing until reading time finishes.':'Writing time is running.';if(skip)skip.hidden=phase!=='reading'}
  function stop(){clearInterval(timer);timer=null;running=false;if(pause)pause.disabled=true}
  function tick(){remain--;if(remain<=0){if(phase==='reading'){phase='writing';remain=writing;paint()}else{remain=0;stop();paint();phaseEl.textContent='TIME';help.textContent='Writing time has finished.'}}else paint()}
  function play(){if(running)return;started=true;running=true;if(start)start.textContent='Resume';if(pause)pause.disabled=false;timer=setInterval(tick,1000);paint()}
  begin?.addEventListener('click',()=>{rules.hidden=true;workspace.hidden=false;play()});
  start?.addEventListener('click',play);
  pause?.addEventListener('click',()=>{if(!running)return;stop();help.textContent='Timer paused.'});
  skip?.addEventListener('click',()=>{stop();phase='writing';remain=writing;started=true;paint();play()});
  finish?.addEventListener('click',()=>{if(!confirm('Finish this test? The marking scheme will become available.'))return;stop();workspace.hidden=true;finished.hidden=false;phaseEl.textContent='FINISHED'});
  qs('#save-score')?.addEventListener('click',e=>{const input=qs('#exam-score'),score=Number(input.value),max=Number(e.currentTarget.dataset.max),msg=qs('#score-message');if(!Number.isFinite(score)||score<0||score>max){msg.innerHTML='<div class="feedback bad">Enter a valid score.</div>';return}addScore(e.currentTarget.dataset.test,score,max);msg.innerHTML=`<div class="feedback good"><strong>Saved.</strong> ${score}/${max} = ${Math.round(score/max*100)}%. Your dashboard has been updated.</div>`});
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

function slugify(value){return String(value||'item').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80)||'item'}
async function sha256(text){const data=new TextEncoder().encode(text);const hash=await crypto.subtle.digest('SHA-256',data);return [...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,'0')).join('')}
function adminDrafts(){try{return JSON.parse(localStorage.getItem(ADMIN_DRAFT_KEY)||'{"tests":[],"resources":[],"questions":[]}')}catch{return {tests:[],resources:[],questions:[]}}}
function saveAdminDrafts(d){localStorage.setItem(ADMIN_DRAFT_KEY,JSON.stringify(d))}
function bindAdmin(){
  const login=qs('#admin-login-form');
  if(login){login.addEventListener('submit',async e=>{e.preventDefault();const u=qs('#admin-username').value.trim(),p=qs('#admin-password').value,msg=qs('#admin-login-message');if(u===ADMIN_USERNAME&&await sha256(p)===ADMIN_PASSWORD_SHA256){sessionStorage.setItem(ADMIN_SESSION_KEY,'1');render()}else msg.innerHTML='<div class="feedback bad"><strong>Access denied.</strong> Check the admin username and password.</div>'});return}
  if(sessionStorage.getItem(ADMIN_SESSION_KEY)!=='1')return;
  qs('#admin-logout')?.addEventListener('click',()=>{sessionStorage.removeItem(ADMIN_SESSION_KEY);render()});
  window.__bpAdminFiles=window.__bpAdminFiles||new Map();
  const drafts=adminDrafts();
  const drawDrafts=()=>{const count=drafts.tests.length+drafts.resources.length+drafts.questions.length;const countEl=qs('#admin-draft-count');if(countEl)countEl.textContent=count;const list=qs('#admin-draft-list');if(!list)return;const rows=[...drafts.tests.map(x=>['Test',x.title]),...drafts.resources.map(x=>[x.type,x.title]),...drafts.questions.map(x=>['Question',x.topicLabel])];list.innerHTML=rows.length?rows.map(([type,title])=>`<div><span>${type}</span><b>${title}</b></div>`).join(''):'<p class="muted">No drafts yet.</p>'};
  const qCourse=qs('#admin-question-course'),qTopic=qs('#admin-question-topic');
  const updateTopics=()=>{const c=courses.find(x=>x.id===qCourse.value)||courses[0];qTopic.innerHTML=c.topics.map(t=>`<option value="${t.id}" data-label="${t.title}">${t.title}</option>`).join('')};qCourse?.addEventListener('change',updateTopics);updateTopics();
  qs('#admin-add-test')?.addEventListener('click',()=>{const title=qs('#admin-test-title').value.trim(),course=qs('#admin-test-course').value,topic=qs('#admin-test-topic').value.trim(),file=qs('#admin-test-file').files[0],sol=qs('#admin-solution-file').files[0],thumb=qs('#admin-thumbnail-file').files[0],msg=qs('#admin-test-message');if(!title||!topic||!file){msg.innerHTML='<div class="feedback bad">Title, topic and test PDF are required.</div>';return}const slug=slugify(title),c=courses.find(x=>x.id===course),draftId=`test-${Date.now()}`;const testPath=`public/resources/${course}/tests/${slug}.pdf`,solPath=sol?`public/resources/${course}/solutions/${slug}-solutions.pdf`:testPath,thumbPath=thumb?`public/thumbnails/${slug}.${(thumb.name.split('.').pop()||'jpg').toLowerCase()}`:'public/brand/brainpower-logo.jpg';const item={id:slug,title,subject:c.short.startsWith('Methods')?'Mathematical Methods':'Specialist Mathematics',units:c.short.includes('1/2')?'1 & 2':'3 & 4',course,topics:[topic],difficulty:qs('#admin-test-difficulty').value,tech:qs('#admin-test-tech').value,year:new Date().getFullYear(),reading:Number(qs('#admin-test-reading').value||0),minutes:Number(qs('#admin-test-writing').value||0),marks:Number(qs('#admin-test-marks').value||0),questions:Number(qs('#admin-test-questions').value||0),file:testPath,solutionFile:solPath,thumbnail:thumbPath,description:qs('#admin-test-description').value.trim()||`${topic} practice assessment.`,dateAdded:new Date().toISOString().slice(0,10),_draftId:draftId};drafts.tests.push(item);window.__bpAdminFiles.set(draftId,{test:file,solution:sol,thumbnail:thumb,testPath,solPath,thumbPath});saveAdminDrafts(drafts);drawDrafts();msg.innerHTML='<div class="feedback good">Added to the local publish pack.</div>'});
  qs('#admin-add-resource')?.addEventListener('click',()=>{const title=qs('#admin-resource-title').value.trim(),course=qs('#admin-resource-course').value,topic=qs('#admin-resource-topic').value.trim(),file=qs('#admin-resource-file').files[0],msg=qs('#admin-resource-message');if(!title||!topic||!file){msg.innerHTML='<div class="feedback bad">Title, topic and file are required.</div>';return}const slug=slugify(title),type=qs('#admin-resource-type').value,folder=type==='Worksheet'?'worksheets':type==='Solutions'?'solutions':'notes',path=`public/resources/${course}/${folder}/${slug}.pdf`,c=courses.find(x=>x.id===course),draftId=`resource-${Date.now()}`;const item={id:`res-${slug}`,title,type,course,subject:c.short.startsWith('Methods')?'Mathematical Methods':'Specialist Mathematics',units:c.short.includes('1/2')?'1 & 2':'3 & 4',topics:[topic],difficulty:qs('#admin-resource-difficulty').value,file:path,thumbnail:'public/brand/brainpower-logo.jpg',description:qs('#admin-resource-description').value.trim()||`${topic} ${type.toLowerCase()}.`,_draftId:draftId};drafts.resources.push(item);window.__bpAdminFiles.set(draftId,{resource:file,path});saveAdminDrafts(drafts);drawDrafts();msg.innerHTML='<div class="feedback good">Added to the local publish pack.</div>'});
  qs('#admin-add-question')?.addEventListener('click',()=>{const course=qCourse.value,topic=qTopic.value,label=qTopic.selectedOptions[0]?.dataset.label||topic,prompt=qs('#admin-question-prompt').value.trim(),answer=qs('#admin-question-answer').value.trim(),solution=qs('#admin-question-solution').value.trim(),msg=qs('#admin-question-message');if(!prompt||!answer||!solution){msg.innerHTML='<div class="feedback bad">Question, accepted answer and solution are required.</div>';return}drafts.questions.push({id:`admin-${slugify(course)}-${Date.now()}`,course,topic,topicLabel:label,difficulty:qs('#admin-question-difficulty').value,type:qs('#admin-question-type').value,prompt,answer,solution,xp:qs('#admin-question-difficulty').value==='Separator'?25:14});saveAdminDrafts(drafts);drawDrafts();msg.innerHTML='<div class="feedback good">Question added to the local publish pack.</div>'});
  qs('#admin-clear-drafts')?.addEventListener('click',()=>{if(confirm('Clear all local Admin Studio drafts?')){drafts.tests=[];drafts.resources=[];drafts.questions=[];window.__bpAdminFiles.clear();saveAdminDrafts(drafts);drawDrafts()}});
  qs('#admin-export')?.addEventListener('click',async()=>{if(!window.JSZip){alert('ZIP library has not loaded yet. Refresh the page and try again.');return}const zip=new window.JSZip();const clean=x=>{const y={...x};delete y._draftId;return y};const testsOut=[...adminTests,...drafts.tests.map(clean)],questionsOut=[...adminQuestions,...drafts.questions.map(clean)];const resourcesFromTests=drafts.tests.flatMap(t=>{const x=clean(t);const base={course:x.course,subject:x.subject,units:x.units,topics:x.topics,difficulty:x.difficulty,thumbnail:x.thumbnail};const rows=[{id:`res-${x.id}`,title:x.title,type:'Practice Test',...base,file:x.file,description:x.description}];if(x.solutionFile&&x.solutionFile!==x.file)rows.push({id:`res-${x.id}-solutions`,title:`${x.title}: Solutions`,type:'Solutions',...base,file:x.solutionFile,description:`Solutions and marking material for ${x.title}.`});return rows});const resourcesOut=[...adminResources,...drafts.resources.map(clean),...resourcesFromTests];const js=`// Generated by Brainpower Admin Studio V5\nexport const adminTests = ${JSON.stringify(testsOut,null,2)};\nexport const adminResources = ${JSON.stringify(resourcesOut,null,2)};\nexport const adminQuestions = ${JSON.stringify(questionsOut,null,2)};\n`;zip.file('src/data/admin-content.js',js);let missing=0;for(const t of drafts.tests){const f=window.__bpAdminFiles.get(t._draftId);if(f?.test)zip.file(f.testPath,f.test);else missing++;if(f?.solution)zip.file(f.solPath,f.solution);if(f?.thumbnail)zip.file(f.thumbPath,f.thumbnail)}for(const r of drafts.resources){const f=window.__bpAdminFiles.get(r._draftId);if(f?.resource)zip.file(f.path,f.resource);else missing++}zip.file('PUBLISH_README.txt','Upload the contents of this ZIP over the root of your Brainpower Education GitHub repository. Keep the same folder structure. GitHub Pages will redeploy automatically.\n'+(missing?`WARNING: ${missing} attached file(s) were not available in this browser session and must be uploaded separately.\n`:''));const blob=await zip.generateAsync({type:'blob'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`brainpower-publish-pack-${new Date().toISOString().slice(0,10)}.zip`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)});
  drawDrafts();
}

function bindProgress(){
  qs('#reset-progress')?.addEventListener('click',()=>{if(confirm('Reset all locally saved Brainpower progress on this browser?')){resetProgress();render()}});
}
function bindSearch(){const input=qs('#global-search'),out=qs('#search-results');const update=()=>out.innerHTML=searchResultsMarkup(input.value);input?.addEventListener('input',update);input?.focus()}

if(localStorage.getItem('bp-theme')==='dark')document.documentElement.classList.add('dark');
window.addEventListener('hashchange',render);
if(!location.hash)history.replaceState(null,'','#home');
render();
