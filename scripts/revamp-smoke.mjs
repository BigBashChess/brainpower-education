import {existsSync,readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';

const required=[
  'index.html',
  'src/main.js',
  'src/components.js',
  'src/revamp/runtime.js',
  'src/revamp/update-log.js',
  'src/revamp/learn.js',
  'src/styles/revamp/tokens.css',
  'src/styles/revamp/base.css',
  'src/styles/revamp/shell.css',
  'src/styles/revamp/home.css',
  'src/styles/revamp/learn.css',
  'src/styles/revamp/art.css',
  'src/styles/revamp/exam-season.css',
  'src/styles/revamp/overlays.css',
  'public/brand/brainpower-logo.jpg',
  'public/art/home/hero-study-room.webp',
  'public/art/learn/learn-hero.webp'
];

const failures=[];
for(const file of required)if(!existsSync(file))failures.push(`Missing required file: ${file}`);

const index=readFileSync('index.html','utf8');
for(const file of required.filter(x=>x.startsWith('src/'))){
  if(!index.includes(file) && !['src/components.js'].includes(file))failures.push(`index.html does not reference: ${file}`);
}

const scripts=[
  'src/main.js','src/components.js','src/pre1-overhaul.js','src/pre1-safety.js','src/release-candidate.js',
  'src/mock-exams-2026.js','src/revamp/runtime.js','src/revamp/update-log.js','src/revamp/learn.js','src/revamp/page-transitions.js'
];
for(const file of scripts){
  if(!existsSync(file)){failures.push(`Cannot syntax-check missing file: ${file}`);continue}
  try{execFileSync(process.execPath,['--check',file],{stdio:'pipe'})}
  catch(err){failures.push(`JavaScript syntax error in ${file}: ${String(err.stderr||err.message).trim()}`)}
}

const runtime=readFileSync('src/revamp/runtime.js','utf8');
if(!runtime.includes('data-update-log-open'))failures.push('Home update-log trigger is missing.');
if(!runtime.includes('courseProgress'))failures.push('Home course progress logic is missing.');

const shell=readFileSync('src/styles/revamp/shell.css','utf8');
if(!shell.includes('.bp-mobile-dock'))failures.push('Mobile primary navigation styles are missing.');

const home=readFileSync('src/styles/revamp/home.css','utf8');
if(!home.includes('@media(max-width:650px)'))failures.push('Home mobile breakpoint is missing.');
if(/brainy-scatter|brainy-companion/.test(home))failures.push('Legacy scattered Brainy styling leaked into revamp Home.');

const learnJs=readFileSync('src/revamp/learn.js','utf8');
if(!learnJs.includes('bp-learn-pathways'))failures.push('Learn pathway system is missing.');
if(!learnJs.includes('courseMastery'))failures.push('Learn page is not connected to live mastery data.');
if(!learnJs.includes("route()!=='learn'"))failures.push('Learn revamp route guard is missing.');

const learnCss=readFileSync('src/styles/revamp/learn.css','utf8');
if(!learnCss.includes("public/art/learn/learn-hero.webp"))failures.push('Learn page is not bound to its local generated hero artwork.');
if(!learnCss.includes('@media(max-width:650px)'))failures.push('Learn mobile breakpoint is missing.');

if(failures.length){
  console.error('\nRevamp smoke check failed:\n- '+failures.join('\n- '));
  process.exit(1);
}
console.log(`Revamp smoke check passed (${required.length} required files; ${scripts.length} JS files syntax-checked).`);
