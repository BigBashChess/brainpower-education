const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const lines={
  idle:['I am monitoring the mathematical situation.','Hydration check. Then back to it.','One clean solution beats five rushed ones.','I have detected suspicious levels of contemplation.'],
  lesson:['Read the why, not only the formula.','Worked example first. Heroics later.','If you can explain it without the page, you own it.'],
  practice:['No random guessing. Brainy sees all.','Wrong is temporary. Unexplained wrong is expensive.','Exact values are beautiful. Protect them.'],
  tests:['Timer on. Marking scheme closed. Become the examiner’s problem.','Read the command word twice.','If the paper looks cursed, start with what you know.'],
  resources:['The Vault has been restocked. Civilisation survives.','Save the useful ones before your Downloads folder eats them.'],
  physics:['Units. Units. Units. I cannot stress this enough.','Draw the diagram before attacking the algebra.','Physics is maths with consequences.']
};
const pick=a=>a[Math.floor(Math.random()*a.length)];
function say(text,mood='talk',ms=4300){const b=$('#brainy-companion');if(!b)return;b.classList.remove('brainy-bounce','brainy-spin','brainy-celebrate','brainy-sleep');void b.offsetWidth;b.classList.add(`brainy-${mood}`,'open');$('.brainy-say',b).textContent=text;clearTimeout(b._plusTimer);b._plusTimer=setTimeout(()=>b.classList.remove('open',`brainy-${mood}`),ms)}
function context(){const hash=location.hash; if(hash.includes('physics-12'))return lines.physics;if(hash.startsWith('#lesson'))return lines.lesson;if(hash.startsWith('#practice'))return lines.practice;if(hash.startsWith('#tests')||hash.startsWith('#test/'))return lines.tests;if(hash.startsWith('#resources'))return lines.resources;return lines.idle}
function bind(){const b=$('#brainy-companion');if(!b||b.dataset.plus)return;b.dataset.plus='1';const img=$('img',b);img.addEventListener('dblclick',e=>{e.preventDefault();say('DOUBLE CLICK DETECTED. MAXIMUM BRAINPOWER.', 'spin',3000)});img.addEventListener('contextmenu',e=>{e.preventDefault();say('You have discovered the forbidden Brainy menu. There is no menu.','bounce')});let presses=0;img.addEventListener('click',()=>{presses++;say(pick(context()),presses%5===0?'spin':'bounce');if(presses===10)say('Ten clicks. I am beginning to think you are avoiding the lesson.','spin',5200)});}
function react(){bind();const route=location.hash;if(route.startsWith('#lesson/'))setTimeout(()=>say(pick(context()),'bounce'),1000);if(route.includes('physics-12'))setTimeout(()=>say(pick(lines.physics),'bounce'),1300)}
// Celebrate real progress by observing existing feedback/completion UI rather than changing learning logic.
const app=$('#app');if(app)new MutationObserver(muts=>{react();for(const m of muts){for(const n of m.addedNodes){if(!(n instanceof HTMLElement))continue;const txt=n.textContent||'';if(/correct|mastery secured|completed/i.test(txt)&&txt.length<500)say('YES. Neurons have been successfully deployed.','celebrate',3500)}}}).observe(app,{childList:true,subtree:true});
addEventListener('hashchange',()=>setTimeout(react,100));
setInterval(()=>{if(document.hidden)return;const b=$('#brainy-companion');if(b&&!b.classList.contains('open')&&Math.random()<.35)say(pick(context()),'talk',3500)},45000);
setTimeout(react,1200);
