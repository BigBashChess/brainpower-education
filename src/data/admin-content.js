// Brainpower authored/admin extension content.
import {methods12ExpansionQuestions} from './expansion-methods12.js';
import {methods34ExpansionQuestions} from './expansion-methods34.js';
import {specialist12ExpansionQuestions} from './expansion-specialist12.js';
import {specialist34ExpansionQuestions} from './expansion-specialist34.js';
export const adminTests=[{id:'number-and-proof-blackburn-lip-sync-scandal',title:'Number and Proof - Blackburn Lip Sync Scandal',subject:'Specialist Mathematics',units:'1 & 2',course:'specialist-12',topics:['Number and Proof'],difficulty:'Advanced',tech:'Tech-free',year:2026,reading:5,minutes:50,marks:31,questions:7,file:'public/resources/specialist-12/tests/proof-2026.pdf',solutionFile:'public/resources/specialist-12/solutions/proof-2026-solutions.pdf',thumbnail:'public/thumbnails/specialist-12-test.svg',description:'Number and Proof practice assessment.',dateAdded:'2026-09-30'}];
export const adminResources=[{id:'res-number-and-proof-blackburn-lip-sync-scandal',title:'Number and Proof - Blackburn Lip Sync Scandal',type:'Practice Test',course:'specialist-12',subject:'Specialist Mathematics',units:'1 & 2',topics:['Number and Proof'],difficulty:'Advanced',thumbnail:'public/thumbnails/specialist-12-test.svg',file:'public/resources/specialist-12/tests/proof-2026.pdf',description:'Number and Proof practice assessment.'}];
// Registered through the existing extension hook so the core question bank stays stable.
export const adminQuestions=[...methods12ExpansionQuestions,...methods34ExpansionQuestions,...specialist12ExpansionQuestions,...specialist34ExpansionQuestions];
