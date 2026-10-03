const KEY='brainpower-progress-v3';
const blank=()=>({xp:0,lessonVisits:[],lessonCompletedAt:{},completedLessons:[],correctQuestions:[],attemptedQuestions:{},questionActivity:{},scores:[],bookmarks:[],streak:0,lastActive:null,activityDays:[],arcade:{derivativeDash:0,bird:0}});
export function load(){try{return {...blank(),...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return blank()}}
function persist(p){localStorage.setItem(KEY,JSON.stringify(p));return p}
export function localDay(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`}
function touch(p){const today=localDay();if(p.lastActive!==today){const y=new Date();y.setDate(y.getDate()-1);p.streak=p.lastActive===localDay(y)?p.streak+1:1;p.lastActive=today;if(!p.activityDays.includes(today))p.activityDays.push(today)}return p}
export function saveQuestionDraft(id,answer){const p=load(),old=p.questionActivity[id]||{};p.questionActivity[id]={...old,draft:String(answer),draftSavedAt:new Date().toISOString(),submitted:false};return persist(p)}
export function awardQuestion(id,xp=10,correct=true,answer){const p=touch(load());p.attemptedQuestions[id]=(p.attemptedQuestions[id]||0)+1;const earned=correct&&!p.correctQuestions.includes(id)?xp:0;if(earned){p.correctQuestions.push(id);p.xp+=earned}const at=new Date().toISOString(),old=p.questionActivity[id]||{};p.questionActivity[id]={...old,lastAttemptAt:at,...(correct?{lastCorrectAt:at}:{}),...(answer!==undefined?{answer:String(answer),draft:String(answer),correct,submitted:true,earnedXp:earned}:{} )};return persist(p)}
export function questionActivityLabel(id,p=load()){const activity=p.questionActivity[id],at=activity?.lastAttemptAt;if(at&&!Number.isNaN(Date.parse(at))){const date=new Date(at),y=new Date();y.setDate(y.getDate()-1);const when=localDay(date)===localDay()?'today':localDay(date)===localDay(y)?'yesterday':`on ${date.toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'})}`;return `${activity.correct===true?'Solved':'Attempted'} ${when}` }return p.correctQuestions.includes(id)?'Solved previously':p.attemptedQuestions[id]?'Attempted previously':''}
export function visitLesson(id){const p=load();p.lessonVisits=[{id,at:new Date().toISOString()},...(p.lessonVisits||[]).filter(x=>x.id!==id)].slice(0,30);return persist(p)}
export function completeLesson(id,xp=40){const p=touch(load());if(!p.completedLessons.includes(id)){p.completedLessons.push(id);p.lessonCompletedAt={...p.lessonCompletedAt,[id]:new Date().toISOString()};p.xp+=xp}return persist(p)}
export function addScore(testId,score,max){const p=touch(load());p.scores.unshift({testId,score,max,date:new Date().toISOString()});p.scores=p.scores.slice(0,30);return persist(p)}
export function toggleBookmark(id){const p=load();p.bookmarks=p.bookmarks.includes(id)?p.bookmarks.filter(x=>x!==id):[...p.bookmarks,id];return persist(p)}
export function isBookmarked(id){return load().bookmarks.includes(id)}
export function saveArcade(game,score){const p=touch(load());p.arcade[game]=Math.max(Number(p.arcade[game]||0),Number(score||0));return persist(p)}
export function resetProgress(){localStorage.removeItem(KEY)}
export function levelForXp(xp){return Math.floor(xp/250)+1}
