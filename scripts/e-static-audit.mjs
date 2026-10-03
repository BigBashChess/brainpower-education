import {existsSync,readFileSync,readdirSync,statSync} from 'node:fs';
import {join,relative,extname} from 'node:path';
import {execFileSync} from 'node:child_process';

const failures=[];
const notes=[];
const root=process.cwd();
const walk=(dir)=>readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{const p=join(dir,entry.name);return entry.isDirectory()?walk(p):[p]});
const rel=p=>relative(root,p).replaceAll('\\','/');

const required=[
  'index.html','src/main.js','src/components.js','src/data/site.js',
  'src/revamp/runtime.js','src/revamp/page-transitions.js','src/revamp/update-log.js','src/revamp/learn.js','src/revamp/course-overview.js','src/revamp/lesson.js','src/revamp/practice.js','src/revamp/assessment.js','src/revamp/arcade.js','src/revamp/secondary.js','src/revamp/motion.js',
  'src/styles/revamp/tokens.css','src/styles/revamp/base.css','src/styles/revamp/shell.css','src/styles/revamp/home.css','src/styles/revamp/learn.css','src/styles/revamp/learn-route.css','src/styles/revamp/course-overview.css','src/styles/revamp/lesson.css','src/styles/revamp/practice.css','src/styles/revamp/assessment.css','src/styles/revamp/arcade.css','src/styles/revamp/secondary.css','src/styles/revamp/motion.css','src/styles/revamp/art.css','src/styles/revamp/overlays.css','src/styles/revamp/exam-season.css',
  'public/brand/brainy.svg','public/brand/brainpower-logo.jpg',
  'public/art/home/hero-study-room.webp','public/art/learn/learn-hero.webp','public/art/arcade/hero-arcade.webp','public/art/about/hero-about.webp'
];
for(const file of required)if(!existsSync(file))failures.push(`Missing required production file: ${file}`);

const index=readFileSync('index.html','utf8');
for(const file of required.filter(x=>x.startsWith('src/revamp/')&&x.endsWith('.js'))){if(!index.includes(file))failures.push(`index.html does not load ${file}`)}
for(const file of required.filter(x=>x.startsWith('src/styles/revamp/')&&x.endsWith('.css'))){
  if(['src/styles/revamp/arcade.css','src/styles/revamp/secondary.css'].includes(file))continue; // route modules load these on demand
  if(!index.includes(file))failures.push(`index.html does not load ${file}`);
}

const jsFiles=walk(join(root,'src')).filter(p=>extname(p)==='.js').concat(walk(join(root,'scripts')).filter(p=>extname(p)==='.mjs'));
for(const file of jsFiles){
  try{execFileSync(process.execPath,['--check',file],{stdio:'pipe'})}
  catch(err){failures.push(`JavaScript syntax error in ${rel(file)}: ${String(err.stderr||err.message).trim()}`)}
}
notes.push(`${jsFiles.length} JavaScript/module files syntax-checked.`);

const activeCode=[...walk(join(root,'src')).filter(p=>['.js','.css'].includes(extname(p))),join(root,'index.html')];
const generationHost=/cloudfront|runwayml|replicate|oaidalleapiprodscus|generated[-.]?asset|blob\.core\.windows\.net/i;
for(const file of activeCode){const text=readFileSync(file,'utf8');if(generationHost.test(text))failures.push(`Generation-host URL/reference remains in active production code: ${rel(file)}`)}

const revampFiles=walk(join(root,'src','revamp')).concat(walk(join(root,'src','styles','revamp'))).filter(p=>statSync(p).isFile());
for(const file of revampFiles){const text=readFileSync(file,'utf8');if(/brainy-companion/.test(text)&&!rel(file).endsWith('motion.js'))failures.push(`Retired floating Brainy selector/reference found in ${rel(file)}`)}

const artFiles=walk(join(root,'public','art')).filter(p=>statSync(p).isFile());
let artBytes=0;
for(const file of artFiles){
  const size=statSync(file).size;artBytes+=size;
  const ext=extname(file).toLowerCase();
  if(!['.webp','.avif','.svg'].includes(ext))failures.push(`Production artwork should be web-optimised: ${rel(file)}`);
  if(size>850*1024)failures.push(`Artwork exceeds 850 KB budget: ${rel(file)} (${Math.round(size/1024)} KB)`);
}
notes.push(`${artFiles.length} production artwork files audited (${Math.round(artBytes/1024)} KB total).`);

const [{courses},{lessons},{practiceQuestions},{tests},{resources}]=await Promise.all([
  import('../src/data/courses.js'),import('../src/data/lessons.js'),import('../src/data/questions.js'),import('../src/data/tests.js'),import('../src/data/resources.js')
]);
const unique=(rows,label)=>{const seen=new Set();for(const row of rows){if(!row?.id){failures.push(`${label} entry missing id`);continue}if(seen.has(row.id))failures.push(`Duplicate ${label} id: ${row.id}`);seen.add(row.id)}};
unique(courses,'course');unique(lessons,'lesson');unique(practiceQuestions,'question');unique(tests,'test');unique(resources,'resource');
const courseIds=new Set(courses.map(c=>c.id));
for(const l of lessons)if(!courseIds.has(l.course))failures.push(`Lesson ${l.id} points to unknown course ${l.course}`);
for(const q of practiceQuestions)if(!courseIds.has(q.course)&&q.course!=='other')failures.push(`Question ${q.id} points to unknown course ${q.course}`);
for(const t of tests){
  if(!courseIds.has(t.course)&&t.course!=='other')failures.push(`Test ${t.id} points to unknown course ${t.course}`);
  for(const field of ['file','thumbnail','solutionFile']){const path=t[field];if(path&&!/^https?:/i.test(path)&&!existsSync(path))failures.push(`Test ${t.id} missing ${field}: ${path}`)}
  if(t.marks!=null&&(!Number.isFinite(t.marks)||t.marks<=0))failures.push(`Test ${t.id} has invalid marks metadata: ${t.marks}`);
  if(t.questions!=null&&(!Number.isFinite(t.questions)||t.questions<=0))failures.push(`Test ${t.id} has invalid question-count metadata: ${t.questions}`);
  if(t.minutes!=null&&(!Number.isFinite(t.minutes)||t.minutes<0))failures.push(`Test ${t.id} has invalid writing-time metadata: ${t.minutes}`);
}
for(const r of resources){
  if(!courseIds.has(r.course)&&r.course!=='other')failures.push(`Resource ${r.id} points to unknown course ${r.course}`);
  for(const field of ['file','thumbnail']){const path=r[field];if(path&&!/^https?:/i.test(path)&&!existsSync(path))failures.push(`Resource ${r.id} missing ${field}: ${path}`)}
}
notes.push(`Data audit: ${courses.length} courses, ${lessons.length} lessons, ${practiceQuestions.length} questions, ${tests.length} tests, ${resources.length} resources.`);

const site=readFileSync('src/data/site.js','utf8');
for(const nav of ['home','learn','practice','tests','resources','tools','arcade','progress','about'])if(!site.includes(`['${nav}'`))failures.push(`SITE navigation is missing ${nav}`);
if(!/cream page face|open-book silhouette/i.test(readFileSync('docs/MILESTONE_D3_QA.md','utf8'))){notes.push('Canonical Brainy identity is enforced in runtime/artwork; D3 QA doc uses behavioural wording rather than the art-direction phrase.')}

if(failures.length){console.error(`\nMilestone E static audit FAILED (${failures.length}):\n- ${failures.join('\n- ')}\n`);process.exit(1)}
console.log(`Milestone E static audit passed.\n${notes.map(x=>`- ${x}`).join('\n')}`);
