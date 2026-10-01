import {questions,practiceQuestions} from './data/questions.js';
import {physicsQuestions} from './data/physics-questions.js';
const known=new Set(questions.map(q=>q.id));
for(const q of physicsQuestions){if(!known.has(q.id)){questions.push(q);practiceQuestions.push(q);known.add(q.id)}}
