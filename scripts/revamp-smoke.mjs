import {existsSync,readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {SITE,WHATS_NEW} from '../src/data/site.js';

const required=[
  'index.html','src/main.js','src/components.js','src/data/site.js',
  'src/revamp/page-transitions.js','src/revamp/runtime.js','src/revamp/update-log.js','src/revamp/learn.js','src/revamp/course-overview.js','src/revamp/lesson.js','src/revamp/practice.js','src/revamp/assessment.js','src/revamp/resources-tools.js','src/revamp/progress.js','src/revamp/arcade.js','src/revamp/secondary.js','src/revamp/motion.js',
  'src/styles/revamp/tokens.css','src/styles/revamp/components.css','src/styles/revamp/base.css','src/styles/revamp/shell.css','src/styles/revamp/home.css','src/styles/revamp/learn.css','src/styles/revamp/learn-route.css','src/styles/revamp/course-overview.css','src/styles/revamp/lesson.css','src/styles/revamp/practice.css','src/styles/revamp/assessment.css','src/styles/revamp/resources-tools.css','src/styles/revamp/progress.css','src/styles/revamp/arcade.css','src/styles/revamp/secondary.css','src/styles/revamp/motion.css','src/styles/revamp/art.css','src/styles/revamp/exam-season.css','src/styles/revamp/overlays.css',
  'public/brand/brainpower-logo.jpg','public/brand/brainy.svg','public/art/home/hero-study-room.webp','public/art/learn/learn-hero.webp','public/art/arcade/hero-arcade.webp','public/art/about/hero-about.webp'
];
const failures=[];
for(const file of required)if(!existsSync(file))failures.push(`Missing required file: ${file}`);

const index=readFileSync('index.html','utf8');
const runtime=readFileSync('src/revamp/runtime.js','utf8');
const runtimeLoadedModules={
  'src/revamp/learn.js':"'./learn.js'",
  'src/revamp/course-overview.js':"'./course-overview.js'",
  'src/revamp/lesson.js':"'./lesson.js'",
  'src/revamp/practice.js':"'./practice.js'",
  'src/revamp/assessment.js':"'./assessment.js'",
  'src/revamp/resources-tools.js':"'./resources-tools.js'",
  'src/revamp/progress.js':"'./progress.js'",
  'src/revamp/arcade.js':"'./arcade.js'",
  'src/revamp/secondary.js':"'./secondary.js'"
};
const routeModules=readFileSync('src/revamp/route-modules.js','utf8');
const routeLoadedStyles={
  'src/styles/revamp/resources-tools.css':['src/revamp/resources-tools.js','resources-tools.css'],
  'src/styles/revamp/progress.css':['src/revamp/progress.js','progress.css'],
  'src/styles/revamp/arcade.css':['src/revamp/arcade.js','arcade.css'],
  'src/styles/revamp/secondary.css':['src/revamp/secondary.js','secondary.css']
};

for(const file of required.filter(x=>x.startsWith('src/revamp/')||x.startsWith('src/styles/revamp/'))){
  if(index.includes(file))continue;
  if(runtimeLoadedModules[file]){
    if(!routeModules.includes(runtimeLoadedModules[file]))failures.push(`Runtime does not import required module: ${file}`);
    continue;
  }
  if(routeLoadedStyles[file]){
    const [owner,needle]=routeLoadedStyles[file];
    if(!existsSync(owner)||!readFileSync(owner,'utf8').includes(needle))failures.push(`Route module ${owner} does not load required stylesheet: ${file}`);
    continue;
  }
  failures.push(`index.html does not reference: ${file}`);
}

const scripts=required.filter(x=>x.endsWith('.js'));
for(const file of scripts){
  try{execFileSync(process.execPath,['--check',file],{stdio:'pipe'})}
  catch(err){failures.push(`JavaScript syntax error in ${file}: ${String(err.stderr||err.message).trim()}`)}
}

const checks=[
  ['src/revamp/runtime.js','courseProgress','Home course progress logic'],
  ['src/revamp/update-log.js','aria-modal','accessible update-log dialog'],
  ['src/revamp/learn.js','courseMastery','Learn live mastery'],
  ['src/revamp/course-overview.js','chapter','course chapter system'],
  ['src/revamp/lesson.js','data-focus-mode','lesson focus mode'],
  ['src/revamp/practice.js','session','Practice session system'],
  ['src/revamp/assessment.js','Exam','assessment revamp'],
  ['src/revamp/resources-tools.js','bp-lab','Resources/Tools revamp'],
  ['src/revamp/progress.js','observatory','Progress observatory'],
  ['src/revamp/arcade.js','Derivative','Arcade rebuild'],
  ['src/revamp/secondary.js','bp-command','command search'],
  ['src/revamp/motion.js','prefers-reduced-motion','reduced-motion support']
];
for(const [file,needle,label] of checks)if(!readFileSync(file,'utf8').includes(needle))failures.push(`Missing ${label} marker in ${file}`);

const site=readFileSync('src/data/site.js','utf8');
const pkg=JSON.parse(readFileSync('package.json','utf8'));
if(!/^\d+\.\d+\.\d+$/.test(SITE.version))failures.push('A valid semantic version is required.');
if(SITE.revampStatus!=='complete'&&!SITE.version.startsWith('0.'))failures.push('Keep the public version below 1.0 until revamp acceptance is complete.');
if(pkg.version!==SITE.version)failures.push(`Package version ${pkg.version} differs from SITE.version ${SITE.version}.`);
if(!WHATS_NEW[0]?.title.startsWith(`${SITE.version}:`))failures.push('Newest update-log entry does not describe the current release.');
if(!readFileSync('README.md','utf8').startsWith(`# Brainpower Education — v${SITE.version}\n`))failures.push('README release heading differs from SITE.version.');
if(!site.includes('Brainpower Learning World'))failures.push('Brainpower Learning World launch note is missing.');
const components=readFileSync('src/components.js','utf8');
if(!components.includes('v${SITE.version}'))failures.push('Global footer does not surface SITE.version.');
const art=readFileSync('src/styles/revamp/art.css','utf8');
for(const file of ['hero-study-room.webp','methods-gateway.webp','specialist-gateway.webp','physics-gateway.webp'])if(!art.includes(file))failures.push(`Home local-art binding missing: ${file}`);
if(/brainy-scatter|brainy-companion/.test(readFileSync('src/styles/revamp/home.css','utf8')))failures.push('Legacy scattered Brainy styling leaked into Home.');

if(failures.length){console.error('\nRevamp smoke check failed:\n- '+failures.join('\n- '));process.exit(1)}
console.log(`Revamp v${SITE.version} smoke passed (${required.length} required files; ${scripts.length} route modules syntax-checked).`);
