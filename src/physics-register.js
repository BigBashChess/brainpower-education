import {questions,practiceQuestions} from './data/questions.js';
import {physicsQuestions} from './data/physics-questions.js';
import {physicsDepthQuestions} from './data/physics-depth-questions.js';
const known=new Set(questions.map(q=>q.id));
for(const q of [...physicsQuestions,...physicsDepthQuestions]){if(!known.has(q.id)){questions.push(q);practiceQuestions.push(q);known.add(q.id)}}
