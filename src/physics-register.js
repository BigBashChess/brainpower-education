import {questions,practiceQuestions} from './data/questions.js';
import {physicsQuestions} from './data/physics-questions.js';
import {physicsDepthQuestions} from './data/physics-depth-questions.js';
import {physicsLessons} from './data/physics-lessons.js';
import {enrichPhysicsLesson} from './data/physics-depth.js';
// lessons.js holds the same lesson object references, so enriching them here upgrades
// every Physics lesson without duplicating the 64-item curriculum definition.
for(const lesson of physicsLessons)Object.assign(lesson,enrichPhysicsLesson(lesson));
const known=new Set(questions.map(q=>q.id));
for(const q of [...physicsQuestions,...physicsDepthQuestions]){if(!known.has(q.id)){questions.push(q);practiceQuestions.push(q);known.add(q.id)}}
