import {adminResources} from './admin-content.js';
import {baseTests} from './tests.js';

const testResources=baseTests.map(t=>({id:`vault-test-${t.id}`,title:t.title,type:'Practice Test',course:t.course,subject:t.subject,units:t.units,topics:t.topics,difficulty:t.difficulty,file:t.file,thumbnail:t.thumbnail,description:t.description}));
const solutionResources=baseTests.filter(t=>t.solutionFile).map(t=>({id:`vault-sol-${t.id}`,title:`${t.title} — Marking Scheme`,type:'Solutions',course:t.course,subject:t.subject,units:t.units,topics:t.topics,difficulty:t.difficulty,file:t.solutionFile,thumbnail:t.thumbnail,description:`Marking scheme and worked solutions for ${t.title}.`}));

export const baseResources = [
  ...testResources,
  ...solutionResources,
  {id:'res-physics-motion-revision',title:'Physics Motion — Assessment + Solutions Pair',type:'Revision Pack',course:'physics-12',subject:'Physics',units:'1 & 2',topics:['Motion','Kinematics'],difficulty:'Advanced',file:'public/resources/physics-12/tests/motion-2026.pdf',thumbnail:'public/thumbnails/physics-12-test.svg',description:'Use the Motion practice assessment with its linked marking scheme as a complete revision cycle.'},
  {id:'res-partial-fraction-bee',title:'Partial Fraction Bee Challenge',type:'Challenge',course:'other',subject:'Other',units:'',topics:['Partial Fractions'],difficulty:'Advanced',file:'public/resources/other/tests/partial-fraction-bee-2026.pdf',thumbnail:'public/thumbnails/other-test.svg',description:'A 63-mark partial-fractions challenge for fluency and speed.'}
];
export const resources = [...baseResources,...adminResources];
