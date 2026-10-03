import {SITE} from './data/site.js';
import {lessonsForCourse} from './data/lessons.js';
import {renderMathString,courseMastery,firstIncompleteLesson,esc,mathChoiceLabel} from './utils.js';
import {isBookmarked,load,questionActivityLabel} from './progress/store.js';

export const icon=(name)=>{
  const icons={
    search:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.7-3.7"></path></svg>',
    theme:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.8 6.8 0 0 0 21 12.8Z"></path></svg>',
    menu:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>',
    home:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-7 9 7v9H7v-6h10v6"></path></svg>',
    learn:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22V5.5Z"></path><path d="M4 19a3 3 0 0 1 3-3h13"></path></svg>',
    practice:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>',
    tests:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v4h3v14H4V7h3Z"></path><path d="M8 11h8M8 15h8"></path></svg>',
    resources:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h7l2 3h9v12H3Z"></path></svg>',
    arcade:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="4"></rect><path d="M7 11v5M4.5 13.5h5M16 12h.01M18 15h.01M9 7V4h6"></path></svg>',
    progress:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"></path></svg>'
  };
  return icons[name]||icons.home;
};

export function header(route){
  const nav=SITE.nav.map(([r,n])=>`<a class="${route===r?'active':''}" href="#${r}">${n}</a>`).join('');
  const secondary=SITE.nav.filter(([r])=>!['home','learn','practice','tests','progress'].includes(r)).map(([r,n])=>`<a class="${route===r?'active':''}" href="#${r}">${n}</a>`).join('');
  const dock=[['home','Home','home'],['learn','Learn','learn'],['practice','Practice','practice'],['tests','Tests','tests'],['progress','Progress','progress']].map(([r,n,i])=>`<a class="${route===r?'active':''}" href="#${r}">${icon(i)}<span>${n}</span></a>`).join('');
  return `<header class="bp-topbar" data-shell-header>
    <div class="bp-topbar__inner">
      <a class="bp-brand" href="#home" aria-label="Brainpower Education home">
        <span class="bp-brand__mark"><img src="public/brand/brainpower-logo.jpg" alt=""></span>
        <span class="bp-brand__copy"><strong>BRAINPOWER</strong><small>EDUCATION</small></span>
      </a>
      <nav class="bp-nav" aria-label="Main navigation">${nav}</nav>
      <div class="bp-top-actions">
        <a class="bp-shell-action bp-shell-action--search" href="#search" aria-label="Search Brainpower">${icon('search')}<span>Search</span></a>
        <button class="bp-shell-action" id="theme-toggle" type="button" aria-label="Toggle colour theme">${icon('theme')}</button>
        <button class="bp-shell-action bp-menu-button" id="menu-toggle" type="button" aria-label="Open more navigation" aria-controls="mobile-nav" aria-expanded="false">${icon('menu')}</button>
      </div>
    </div>
  </header>
  <div class="bp-mobile-sheet" id="mobile-nav" hidden><div class="bp-mobile-sheet__grid">${secondary}</div></div>
  <nav class="bp-mobile-dock" aria-label="Mobile primary navigation">${dock}</nav>`;
}

export function footer(){return `<footer class="bp-footer"><div class="bp-footer__inner"><div class="bp-footer__brand"><img src="public/brand/brainpower-logo.jpg" alt=""><div><strong>BRAINPOWER EDUCATION</strong><p>A connected VCE study environment for learning, practice, assessments, resources and progress.</p></div></div><div class="bp-footer__col"><b>Study</b><a href="#learn">Courses</a><a href="#practice">Practice</a><a href="#tests">Test Centre</a><a href="#resources">Resources</a></div><div class="bp-footer__col"><b>Explore</b><a href="#tools">Tools</a><a href="#arcade">Arcade</a><a href="#progress">Progress</a><a href="#search">Search</a></div><div class="bp-footer__col"><b>Brainpower</b><a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram ↗</a><a href="${SITE.discord}" target="_blank" rel="noopener">Discord ↗</a><a href="#about">About</a><span>Independent VCE education platform</span></div></div><div class="bp-footer__base"><span>Brainpower Education • v${SITE.version} • 2026</span><span>Learn → Practise → Test → Review → Progress</span></div></footer>`}

export const pageHead=(eyebrow,title,desc,actions='')=>`<section class="page-head"><div class="page-head-inner"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${desc}</p></div>${actions?`<div class="head-actions">${actions}</div>`:''}</div></section>`;
export const tag=(text,kind='')=>text?`<span class="tag ${kind}">${text}</span>`:'';
export const progressBar=(value,label='')=>`<div class="progress-wrap">${label?`<div class="progress-label"><span>${label}</span><b>${value}%</b></div>`:''}<div class="progress"><span style="width:${value}%"></span></div></div>`;
export function courseCard(c,p){const m=courseMastery(c.id,p),next=firstIncompleteLesson(c.id,p),count=lessonsForCourse(c.id).length;return `<article class="course-card card ${c.accent}"><div class="course-top"><div class="course-icon">${c.short.includes('Specialist')?'Σ':'ƒ'}</div><div>${tag(c.short)}<h3>${c.title}</h3></div></div><p>${c.desc}</p>${progressBar(m,'Mastery')}<div class="card-meta"><span>${count} lessons available</span><span>${c.topics.length} topic paths</span></div><div class="card-actions"><a class="btn ghost" href="#course/${c.id}">View course</a>${next?`<a class="btn primary small" href="#lesson/${next.id}">Continue →</a>`:''}</div></article>`}
export function questionCard(q,{compact=false}={}){const prompt=renderMathString(q.prompt),p=load(),solved=p.correctQuestions.includes(q.id),attempts=Number(p.attemptedQuestions?.[q.id]||0);return `<article class="question-card card${compact?' compact':''}${solved?' solved':''}" data-question="${q.id}"><div class="question-head"><div>${tag(q.topicLabel||q.topic)} ${tag(q.difficulty,q.difficulty==='Separator'?'danger':'')} ${solved?tag('Solved','success'):attempts?tag(`${attempts} attempt${attempts===1?'':'s'}`):''}</div><span class="xp">${solved?'XP earned':`+${q.xp||10} XP`}</span></div><p class="question-save-status" data-question-status aria-live="polite">${esc(questionActivityLabel(q.id,p)||'Your answer is saved on this device.')}</p><div class="question-prompt">${prompt}</div>${q.type==='choice'?`<div class="choice-list">${q.choices.map(c=>`<button class="choice" type="button" aria-label="${esc(mathChoiceLabel(c))}" data-choice="${esc(c)}">${renderMathString(c)}</button>`).join('')}</div>`:`<div class="math-answer-shell"><div class="math-preview" data-math-preview><span class="math-preview-empty">Your formatted answer appears here</span></div><div class="answer-row"><input class="math-answer" data-math-input type="text" autocomplete="off" inputmode="text" placeholder="e.g. sqrt(3)/2 or 2x^2-5" aria-label="Mathematical answer"><button class="btn primary check-answer" type="button">Check</button></div><div class="math-keyboard" aria-label="Maths keyboard">${[['√','sqrt(',1],['x²','^2',0],['xⁿ','^',0],['π','pi',0],['÷','/',0],['sin','sin(',1],['cos','cos(',1],['tan','tan(',1],['ln','ln(',1],['|x|','abs(',1],['i','i',0],['( )','(',1]].map(([label,ins,back])=>`<button type="button" data-math-insert="${ins}" data-back="${back}">${label}</button>`).join('')}</div><small class="math-input-help">Type normal maths. Equivalent algebraic forms are accepted when the browser maths engine can verify them.</small></div>`}<div class="feedback" hidden aria-live="polite"></div></article>`}
export function testCard(t){const p=load(),rows=p.scores.filter(s=>s.testId===t.id),best=rows.length?Math.max(...rows.map(s=>Math.round(s.score/s.max*100))):null,meta=[];if(Number.isFinite(t.minutes)&&t.minutes>0)meta.push(`<span>◷ ${t.reading?`${t.reading} min reading • `:''}${t.minutes} min writing</span>`);if(Number.isFinite(t.marks)&&t.marks>0)meta.push(`<span>✎ ${t.marks} marks</span>`);if(Number.isFinite(t.questions)&&t.questions>0)meta.push(`<span>▦ ${t.questions} questions</span>`);if(t.year)meta.push(`<span>${t.year}</span>`);return `<article class="test-card card"><img class="test-thumb" src="${t.thumbnail}" alt="Cover preview for ${esc(t.title)}"><div class="test-main"><div class="tagrow">${tag(`${t.subject}${t.units?` ${t.units}`:''}`)} ${tag(t.difficulty)} ${tag(t.tech)} ${best!=null?tag(`Best ${best}%`,'success'):''}</div><h3>${t.title}</h3><p>${t.description}</p><div class="meta">${meta.join('')}</div></div><div class="test-actions"><a class="btn ghost" href="#test/${t.id}">View test</a>${t.minutes>0?`<a class="btn primary" href="#exam/${t.id}">Exam Mode</a>`:''}<a class="text-link" href="${t.file}" download>Download ↓</a></div></article>`}
export function resourceCard(r){const booked=isBookmarked(r.id);return `<article class="resource-card card" data-resource="${r.id}"><img src="${r.thumbnail}" alt=""><div><div class="tagrow">${tag(r.type)} ${tag(r.difficulty||'')}</div><h3>${r.title}</h3><p>${r.description}</p><div class="meta"><span>${r.subject} ${r.units}</span><span>${r.topics.join(', ')}</span></div><div class="card-actions"><a class="btn primary small" href="${r.file}" target="_blank" rel="noopener">Open</a><a class="btn ghost small" href="${r.file}" download>Download</a><button class="btn ghost small bookmark" type="button" data-bookmark="${r.id}">${booked?'★ Saved':'☆ Save'}</button></div></div></article>`}
export function emptyState(title,text,action=''){return `<div class="empty-state"><div class="empty-icon">∅</div><h3>${title}</h3><p>${text}</p>${action}</div>`}
