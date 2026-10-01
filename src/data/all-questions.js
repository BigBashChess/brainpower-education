import {questions as legacyQuestions} from './questions.js';
import {physicsQuestions} from './physics-questions.js';
export const questions=[...legacyQuestions,...physicsQuestions];
export const questionById=id=>questions.find(q=>q.id===id);
export const dailyQuestions=questions.filter(q=>q.daily);
export const practiceQuestions=questions.filter(q=>!q.daily);
