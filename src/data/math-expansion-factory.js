// Pre-1.0 mathematics expansion. Each row supplies authored theory, a worked idea and
// a content-specific diagnostic; the factory adds a consistent five-question mastery set.
const topicNames={functions:'Functions',algebra:'Algebra','exp-log':'Exponentials & Logarithms',trig:'Trigonometry',differentiation:'Differentiation',integration:'Integration',probability:'Probability',applications:'Applications of Calculus','random-variables':'Random Variables','exam-prep':'Exam Preparation','number-proof':'Number & Proof',vectors:'Vectors',complex:'Complex Numbers',calculus:'Calculus',kinematics:'Kinematics','differential-equations':'Differential Equations',statistics:'Probability & Statistics',mechanics:'Mechanics'};
const genericWrong=['Substitute immediately without identifying the structure.','Assume the result is valid for every real number without checking restrictions.','Round at the beginning and use the rounded value as exact.'];
const choice=(id,course,topic,difficulty,prompt,answer,choices,solution,xp=12)=>({id,course,topic,topicLabel:topicNames[topic]||topic,difficulty,type:'choice',prompt,answer,choices:[answer,...choices.filter(x=>x!==answer)].slice(0,4),solution,xp});
export function buildExpansion(course,prefix,rows){
 const lessons=[],questions=[];
 rows.forEach((r,i)=>{
  const id=`${prefix}-${String(i+1).padStart(2,'0')}`;
  const qids=[1,2,3,4,5].map(n=>`${id}-q${n}`);
  const explanation=`${r.theory} ${r.why||'The important exam skill is to connect the representation, algebra and restrictions rather than treating the rule as an isolated formula.'} Before calculating, state what is known, what is required and which conditions make the method valid.`;
  const worked=[`Identify the structure: ${r.method||r.title}.`,r.example,`Check restrictions, exactness, sign and whether the result answers the original question.`];
  lessons.push({id,course,topic:r.topic,title:r.title,minutes:r.minutes||16,difficulty:r.difficulty||'VCAA',xp:70,summary:r.summary||r.theory.split('.')[0]+'.',explanation,formula:r.formula||'',worked,questions:qids,objectives:[`Explain the central idea behind ${r.title.toLowerCase()}`,`Apply the method in an unfamiliar VCAA-style setting`,`Check and justify the final result`],prerequisites:r.prerequisites||[],notes:[r.trap||'Do not let correct algebra hide an invalid domain, sign, unit or assumption.'],kind:'Lesson',masteryTarget:100});
  const c=r.check;
  questions.push(choice(qids[0],course,r.topic,'Core',c.q,c.a,c.w,c.s||`The defining idea is ${c.a}.`,10));
  const formulaAnswer=r.formula?`Use ${r.formula} after identifying the relevant quantities and restrictions.`:`Translate the problem into the defining relationship before manipulating it.`;
  questions.push(choice(qids[1],course,r.topic,'VCAA',`Which approach is best for a ${r.title} problem?`,formulaAnswer,genericWrong,`Method selection comes before substitution. ${formulaAnswer}`,12));
  questions.push(choice(qids[2],course,r.topic,'VCAA',`A student is working on ${r.title}. Which line is the strongest piece of mathematical reasoning?`,r.example,[`The answer must be positive because most textbook answers are positive.`,`The graph/formula can be used without checking its domain.`,`A decimal approximation is automatically more accurate than an exact value.`],`A strong solution makes the mathematical step explicit: ${r.example}`,12));
  const trap=r.trap||'Failing to check restrictions or interpret the result.';
  questions.push(choice(qids[3],course,r.topic,'Advanced',`Which error is most important to avoid in ${r.title}?`,trap,[`Writing one extra line of valid working.`,`Keeping an exact value until the final line.`,`Checking the result against the original conditions.`],`This is a common source of lost marks: ${trap}`,14));
  questions.push(choice(qids[4],course,r.topic,'Advanced',`The wording of a problem about ${r.title} is unfamiliar. What should you do first?`,`Strip away the context, identify the same underlying mathematical structure, then apply the method.`,[`Look for a memorised question with identical wording.`,`Use every formula from the topic and see which produces a plausible number.`,`Skip directly to numerical substitution.`],`Transfer questions change the surface context, not the underlying mathematics.`,14));
 });
 return {lessons,questions};
}
