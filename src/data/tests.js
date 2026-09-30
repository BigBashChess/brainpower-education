import {adminTests} from './admin-content.js';

export const baseTests = [
  {
    id:'kinematics-party-quiz-showdown',
    title:'Kinematics - Party Quiz Showdown',
    subject:'Specialist Mathematics', units:'1 & 2', course:'specialist-12',
    topics:['Kinematics'], difficulty:'Advanced', tech:'Tech-free', year:2026,
    reading:5, minutes:50, marks:25, questions:5,
    file:'public/resources/specialist-12/tests/kinematics-party-quiz-showdown.pdf',
    solutionFile:'public/resources/specialist-12/tests/kinematics-party-quiz-showdown.pdf#page=8',
    thumbnail:'public/thumbnails/kinematics-party-quiz-showdown.jpg',
    description:'A five-question kinematics assessment covering position, velocity, acceleration, displacement and total distance. Includes an assessment guide / marking scheme in the same PDF.',
    dateAdded:'2026-09-29'
  }
];
export const tests = [...baseTests,...adminTests];
export const testById = id => tests.find(t=>t.id===id);
