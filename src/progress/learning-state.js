import {lessons,lessonsForCourse,lessonById} from '../data/lessons.js';

// The same next-step policy is used by Home, Learn and course control rooms.
// Visits are reading history, never mastery or XP. Old progress remains valid.
export function learningAction(progress,courseId){
  const rows=courseId?lessonsForCourse(courseId):lessons;
  const completed=new Set(progress.completedLessons||[]);
  const visits=(progress.lessonVisits||[]).map(x=>lessonById(x.id)).filter(l=>l&&(!courseId||l.course===courseId));
  const recent=visits.find(l=>!completed.has(l.id));
  const legacy=(progress.completedLessons||[]).map(lessonById).filter(l=>l&&(!courseId||l.course===courseId)).at(-1);
  const anchor=visits[0]||legacy;
  const next=recent||(anchor?rows.find(l=>l.course===anchor.course&&!completed.has(l.id)):null)||rows.find(l=>!completed.has(l.id));
  const started=visits.length>0||Boolean(legacy);
  if(!next)return {kind:'complete',lesson:null,href:courseId?`#practice?course=${courseId}`:'#progress',label:courseId?'Review mastered course →':'Review your progress →',title:'All available lessons complete'};
  const kind=recent?'resume':started?'next':'fresh';
  return {kind,lesson:next,href:`#lesson/${next.id}`,label:`${kind==='fresh'?'Start':kind==='resume'?'Continue':'Next:'} ${next.title} →`,title:next.title};
}

export function courseCompletedAt(courseId,progress){
  const rows=lessonsForCourse(courseId);
  if(!rows.length||rows.some(l=>!progress.completedLessons.includes(l.id)))return null;
  const dates=rows.map(l=>progress.lessonCompletedAt?.[l.id]).filter(Boolean);
  // Historical completions were not timestamped; do not invent a date for them.
  return dates.length===rows.length?dates.sort().at(-1):null;
}
