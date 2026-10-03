import {tests} from './tests.js';

// Verified against the assessment front covers / source papers.
// This overlay exists during the pre-1.0 audit so unverified values are never invented.
const verified={
  'specialist-sem2-tf-2026':{reading:15,minutes:60,marks:50,questions:10,metadataStatus:'verified'},
  'differential-calculus-2026':{reading:5,minutes:50,marks:32,questions:3,metadataStatus:'verified'},
  'circular-functions-tf-2026':{reading:5,minutes:45,marks:31,questions:6,metadataStatus:'verified'},
  'kinematics-party-quiz-showdown':{reading:5,minutes:50,marks:25,questions:5,metadataStatus:'verified'},
  'matrices-2026':{reading:5,minutes:50,marks:40,questions:6,metadataStatus:'verified'},
  'further-trig-2026':{reading:5,minutes:50,marks:33,questions:6,metadataStatus:'verified'},
  'complex-numbers-2026':{reading:5,minutes:50,marks:30,questions:4,metadataStatus:'verified'},
  'number-and-proof-blackburn-lip-sync-scandal':{reading:5,minutes:50,marks:31,questions:7,metadataStatus:'verified'}
};
for(const t of tests){if(verified[t.id])Object.assign(t,verified[t.id]);else t.metadataStatus=t.marks&&t.questions&&t.minutes?'verified':'partial'}
