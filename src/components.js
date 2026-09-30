import {SITE} from './data/site.js';
import {lessonsForCourse} from './data/lessons.js';
import {renderMathString,courseMastery,firstIncompleteLesson,esc} from './utils.js';
import {isBookmarked} from './progress/store.js';

export function header(route){
  return `<header class="topbar">
    <a class="brand" href="#home" aria-label="Brainpower Education home"><img src="public/brand/brainpower-logo.jpg" alt="Brainpower Education logo"><span><b>BRAINPOWER</b><small>EDUCATION</small></span></a>
    <nav class="nav" aria-label="Main navigation">${SITE.nav.map(([r,n])=>`<a class="${route===r?'active':''}" href="#${r}">${n}</a>`).join('')}</nav>
    <div class="top-actions"><a class="iconbtn" href="#search" aria-label="Search">⌕</a><button class="iconbtn" id="theme-toggle" type="button" aria-label="Toggle colour theme">◐</button><button class="iconbtn mobile-only" id="menu-toggle" type="button" aria-label="Open navigation">☰</button></div>
  </header><div class="mobile-nav" id="mobile-nav" hidden>${SITE.nav.map(([r,n])=>`<a href="#${r}">${n}</a>`).join('')}</div>`;
}
export function footer(){return `<footer class="footer"><div class="footer-brand"><img src="public/brand/brainpower-logo.jpg" alt=""><div><strong>BRAINPOWER EDUCATION</strong><p>Learn. Practise. Test. Master.</p></div></div><div><b>Platform</b><a href="#learn">Courses</a><a href="#practice">Practice</a><a href="#tests">Practice Tests</a><a href="#resources">The Vault</a><a href="#arcade">Arcade</a></div><div><b>Brainpower</b><a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram ↗</a><a href="${SITE.discord}" target="_blank" rel="noopener">Discord ↗</a><a href="#about">About</a><a href="#about">Report an issue</a></div><div><b>About this build</b><p>Static, no AI, no paywall. Progress is stored in this browser.</p><small>Brainpower Education • 2026</small></div></footer>`}
export const pageHead=(eyebrow,title,desc,actions='')=>`<section class="page-head"><div class="page-head-inner"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${desc}</p></div>${actions?`<div class="head-actions">${actions}</div>`:''}</div></section>`;
export const tag=(text,kind='')=>`<span class="tag ${kind}">${text}</span>`;
export const progressBar=(value,label='')=>`<div class="progress-wrap">${label?`<div class="progress-label"><span>${label}</span><b>${value}%</b></div>`:''}<div class="progress"><span style="width:${value}%"></span></div></div>`;

export function courseCard(c,p){const m=courseMastery(c.id,p), next=firstIncompleteLesson(c.id,p), count=lessonsForCourse(c.id).length;return `<article class="course-card card ${c.accent}"><div class="course-top"><div class="course-icon">${c.short.includes('Specialist')?'Σ':'ƒ'}</div><div>${tag(c.short)}<h3>${c.title}</h3></div></div><p>${c.desc}</p>${progressBar(m,'Mastery')}<div class="card-meta"><span>${count} lessons available</span><span>${c.topics.length} topic paths</span></div><div class="card-actions"><a class="btn ghost" href="#course/${c.id}">View course</a>${next?`<a class="btn primary small" href="#lesson/${next.id}">Continue →</a>`:''}</div></article>`}

export function questionCard(q,{compact=false}={}){
  const prompt=renderMathString(q.prompt);
  return `<article class="question-card card${compact?' compact':''}" data-question="${q.id}"><div class="question-head"><div>${tag(q.topicLabel||q.topic)} ${tag(q.difficulty,q.difficulty==='Separator'?'danger':'')}</div><span class="xp">+${q.xp||10} XP</span></div><div class="question-prompt">${prompt}</div>${q.type==='choice'?`<div class="choice-list">${q.choices.map(c=>`<button class="choice" type="button" data-choice="${esc(c)}">${renderMathString(c)}</button>`).join('')}</div>`:`<div class="answer-row"><input type="text" autocomplete="off" inputmode="${q.type==='numeric'?'decimal':'text'}" placeholder="Enter answer" aria-label="Answer"><button class="btn primary check-answer" type="button">Check</button></div>`}<div class="feedback" hidden aria-live="polite"></div></article>`
}

export function testCard(t){return `<article class="test-card card"><img class="test-thumb" src="${t.thumbnail}" alt="Cover preview for ${esc(t.title)}"><div class="test-main"><div class="tagrow">${tag(`${t.subject} ${t.units}`)} ${tag(t.difficulty)} ${tag(t.tech)}</div><h3>${t.title}</h3><p>${t.description}</p><div class="meta"><span>◷ ${t.reading}+${t.minutes} min</span><span>✎ ${t.marks} marks</span><span>▦ ${t.questions} questions</span><span>${t.year}</span></div></div><div class="test-actions"><a class="btn ghost" href="#test/${t.id}">View test</a><a class="btn primary" href="${t.file}" download>Download</a></div></article>`}

export function resourceCard(r){const booked=isBookmarked(r.id);return `<article class="resource-card card" data-resource="${r.id}"><img src="${r.thumbnail}" alt=""><div><div class="tagrow">${tag(r.type)} ${tag(r.difficulty||'')}</div><h3>${r.title}</h3><p>${r.description}</p><div class="meta"><span>${r.subject} ${r.units}</span><span>${r.topics.join(', ')}</span></div><div class="card-actions"><a class="btn primary small" href="${r.file}" target="_blank" rel="noopener">Open</a><a class="btn ghost small" href="${r.file}" download>Download</a><button class="btn ghost small bookmark" type="button" data-bookmark="${r.id}">${booked?'★ Saved':'☆ Save'}</button></div></div></article>`}

export function emptyState(title,text,action=''){return `<div class="empty-state"><div class="empty-icon">∅</div><h3>${title}</h3><p>${text}</p>${action}</div>`}
