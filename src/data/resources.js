import {adminResources} from './admin-content.js';

export const baseResources = [
  {id:'res-kin-test',title:'Kinematics - Party Quiz Showdown',type:'Practice Test',course:'specialist-12',subject:'Specialist Mathematics',units:'1 & 2',topics:['Kinematics'],difficulty:'Advanced',file:'public/resources/specialist-12/tests/kinematics-party-quiz-showdown.pdf',thumbnail:'public/thumbnails/kinematics-party-quiz-showdown.jpg',description:'50-minute, 25-mark tech-free kinematics assessment.'},
  {id:'res-kin-marking',title:'Kinematics - Party Quiz Showdown: Assessment Guide',type:'Solutions',course:'specialist-12',subject:'Specialist Mathematics',units:'1 & 2',topics:['Kinematics'],difficulty:'Advanced',file:'public/resources/specialist-12/tests/kinematics-party-quiz-showdown.pdf#page=8',thumbnail:'public/thumbnails/kinematics-party-quiz-showdown.jpg',description:'Mark allocation and worked assessment guide included from page 8 of the assessment PDF.'}
];
export const resources = [...baseResources,...adminResources];
