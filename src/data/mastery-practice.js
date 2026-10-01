// Pre-1.0 mastery layer: every lesson gets a deterministic 5-question mastery set.
// These questions deliberately test recognition, method, misconception, transfer and verification.
const hash=s=>[...s].reduce((a,c)=>((a*31+c.charCodeAt(0))>>>0),2166136261);
const pick=(arr,n,seed)=>{if(!arr.length)return[];const out=[];for(let i=0;i<n;i++)out.push(arr[(seed+i*7)%arr.length]);return out};
const escMath=s=>String(s||'').replace(/\$/g,'');

export function masteryQuestionsForLesson(l,topicTitle='this topic'){
  const h=hash(l.id), relation=l.formula||l.summary, steps=(l.worked||[]).filter(Boolean);
  const recognition=[
    `Which first move best matches ${l.title}?`,
    `A question is testing ${l.title}. What should you identify before calculating?`,
    `Which approach is most defensible when a problem has the structure from this lesson?`
  ];
  const correctFirst=steps[0]||`Identify the relevant structure and quantities before choosing a formula.`;
  const distractFirst=[`Substitute every number immediately, before deciding what each quantity means.`,`Choose the longest available formula because it contains more variables.`,`Round all values first and then decide which model applies.`];
  const q1={id:`mastery-${l.id}-1`,course:l.course,topic:l.topic,topicLabel:topicTitle,difficulty:'VCAA',type:'choice',prompt:recognition[h%recognition.length],answer:correctFirst,choices:[correctFirst,...pick(distractFirst,3,h+2)],solution:`The strongest first step is: ${correctFirst} This keeps the reasoning tied to the structure of the problem.`,xp:8,lessonMastery:true};

  const q2Correct=`Use ${relation} only after checking what each symbol or term represents.`;
  const q2={id:`mastery-${l.id}-2`,course:l.course,topic:l.topic,topicLabel:topicTitle,difficulty:'VCAA',type:'choice',prompt:`Which statement best describes how to use the core relation in ${l.title}?`,answer:q2Correct,choices:[q2Correct,`Memorise ${relation} and substitute without checking conditions.`,`The relation is only useful when every quantity is already numerical.`,`The relation removes the need to interpret the final answer.`],solution:`A formula is a model of a relationship, not a substitute for interpretation. Check its quantities and conditions first.`,xp:8,lessonMastery:true};

  const misconception=l.notes?.[0]||`A correct-looking calculation can still be wrong if the model, restriction, sign, units or domain is wrong.`;
  const q3Correct=`Check the model's assumptions, restrictions, signs and units before accepting the result.`;
  const q3={id:`mastery-${l.id}-3`,course:l.course,topic:l.topic,topicLabel:topicTitle,difficulty:'Advanced',type:'choice',prompt:`A student gets a plausible numerical/algebraic answer in ${l.title}. What is the best next check?`,answer:q3Correct,choices:[q3Correct,`Accept it because plausible answers do not need verification.`,`Change the answer to a simpler value.`,`Repeat only the final arithmetic operation.`],solution:`Verification is part of the mathematics. ${misconception}`,xp:10,lessonMastery:true};

  const transferCorrect=`Translate the unfamiliar context into the same underlying ${l.title} structure, then apply the method.`;
  const q4={id:`mastery-${l.id}-4`,course:l.course,topic:l.topic,topicLabel:topicTitle,difficulty:'Advanced',type:'choice',prompt:`The surface context changes, but the underlying mathematics/physics is the same as this lesson. What should you do?`,answer:transferCorrect,choices:[transferCorrect,`Discard the method because the wording is different.`,`Search for a formula containing every word in the question.`,`Ignore the context and manipulate symbols without defining them.`],solution:`Transfer means recognising invariant structure beneath different wording or contexts.`,xp:10,lessonMastery:true};

  const finalStep=steps.at(-1)||`Interpret the result in the original problem and check that it is reasonable.`;
  const q5Correct=finalStep;
  const q5={id:`mastery-${l.id}-5`,course:l.course,topic:l.topic,topicLabel:topicTitle,difficulty:'Advanced',type:'choice',prompt:`Which finishing step best demonstrates mastery rather than mere calculation?`,answer:q5Correct,choices:[q5Correct,`Stop as soon as the calculator or algebra gives an output.`,`Remove units/restrictions so the answer looks cleaner.`,`Replace an exact result with an early rounded approximation regardless of the question.`],solution:`A strong solution closes the loop: ${finalStep}`,xp:10,lessonMastery:true};
  return [q1,q2,q3,q4,q5];
}
