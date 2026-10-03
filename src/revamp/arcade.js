import {load,saveArcade} from '../progress/store.js';
import {DERIVATIVE_BANK,shuffled} from './derivative-bank.js';

if(!document.querySelector('link[data-bp-arcade]')){
  const link=document.createElement('link');
  link.rel='stylesheet';
  link.href='src/styles/revamp/arcade.css?v=choice-1';
  link.dataset.bpArcade='1';
  document.head.appendChild(link);
}

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const route=()=>((location.hash.slice(1)||'home').split('?')[0].split('/')[0]||'home');
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const reducedMotion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;

function tone(freq=440,duration=.05,volume=.025){
  if(localStorage.getItem('bp-arcade-sound')==='off')return;
  try{
    const Ctx=window.AudioContext||window.webkitAudioContext;
    if(!Ctx)return;
    const ctx=window.__bpArcadeAudio||(window.__bpArcadeAudio=new Ctx());
    const osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.frequency.value=freq;osc.type='sine';gain.gain.value=volume;
    osc.connect(gain);gain.connect(ctx.destination);osc.start();gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+duration);osc.stop(ctx.currentTime+duration);
  }catch{}
}

function markup(p){
  const dashBest=Number(p.arcade?.derivativeDash||0),birdBest=Number(p.arcade?.bird||0);
  return `<div class="bp-arcade-page__world">
    <section class="bp-arcade-hero" aria-labelledby="bp-arcade-title">
      <div class="bp-arcade-hero__shade"></div>
      <div class="bp-arcade-hero__copy">
        <div class="eyebrow">THE NEON BREAK ROOM</div>
        <h1 id="bp-arcade-title">Study break.<br><em>Score chase.</em></h1>
        <p>Two rebuilt Brainpower mini-games with proper start states, pause controls, mobile input, difficulty tuning and local personal bests.</p>
        <div class="bp-arcade-hero__actions">
          <button class="btn primary" type="button" data-arcade-select="dash">Play Derivative Dash</button>
          <button class="btn ghost" type="button" data-arcade-select="bird">Play Brainpower Bird</button>
        </div>
        <div class="bp-arcade-hero__stats" aria-label="Arcade personal bests">
          <span><small>DERIVATIVE BEST</small><b data-dash-best>${dashBest}</b></span>
          <span><small>BIRD BEST</small><b data-bird-best>${birdBest}</b></span>
          <span><small>PROGRESS XP</small><b>Separate</b></span>
        </div>
      </div>
    </section>

    <section class="bp-arcade-hub" aria-label="Choose an arcade game">
      <div class="bp-arcade-hub__intro">
        <div><div class="eyebrow dark">CHOOSE A CABINET</div><h2>Built to be replayed, not farmed.</h2><p>Arcade scores stay separate from academic XP, so games remain a break rather than the fastest route through Progress.</p></div>
        <button class="bp-arcade-sound" type="button" aria-pressed="${localStorage.getItem('bp-arcade-sound')!=='off'}" title="Toggle arcade sound"><span aria-hidden="true">♪</span><b>${localStorage.getItem('bp-arcade-sound')==='off'?'Sound off':'Sound on'}</b></button>
      </div>
      <div class="bp-arcade-cabinets">
        <button class="bp-cabinet is-active" type="button" data-arcade-select="dash" aria-pressed="true">
          <span class="bp-cabinet__number">01</span><span class="bp-cabinet__icon">ƒ′</span>
          <span class="bp-cabinet__copy"><small>60-SECOND SPRINT</small><strong>Derivative Dash</strong><em>Four close answers. One derivative. Keep the streak alive.</em></span>
          <span class="bp-cabinet__best">Best <b data-dash-best>${dashBest}</b></span>
        </button>
        <button class="bp-cabinet" type="button" data-arcade-select="bird" aria-pressed="false">
          <span class="bp-cabinet__number">02</span><span class="bp-cabinet__icon">↗</span>
          <span class="bp-cabinet__copy"><small>ENDLESS FLIGHT</small><strong>Brainpower Bird</strong><em>Fly Brainy through SACs, exams and domain errors.</em></span>
          <span class="bp-cabinet__best">Best <b data-bird-best>${birdBest}</b></span>
        </button>
      </div>
    </section>

    <section class="bp-arcade-machine is-active" data-arcade-game="dash" aria-labelledby="dash-title">
      <header class="bp-machine-head">
        <div><small>GAME 01</small><h2 id="dash-title">Derivative Dash</h2><p>Four near-identical answers. Watch the sign, power and inner derivative.</p></div>
        <div class="bp-machine-hud" aria-label="Derivative Dash statistics">
          <span><small>SCORE</small><b id="bp-dash-score">0</b></span>
          <span><small>COMBO</small><b id="bp-dash-combo">×1</b></span>
          <span><small>TIME</small><b id="bp-dash-time">60</b></span>
          <span><small>BEST</small><b id="bp-dash-best">${dashBest}</b></span>
        </div>
      </header>
      <div class="bp-dash-arena">
        <div class="bp-dash-lanes" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        <div class="bp-dash-card">
          <div class="bp-dash-card__meta"><span id="bp-dash-tag">READY</span><span id="bp-dash-streak">0 streak</span></div>
          <div class="bp-dash-question" id="bp-dash-question">Press start to enter the run.</div>
          <div class="bp-dash-choice-guide" id="bp-dash-choice-guide">Choose the derivative · Tap or press <kbd>1</kbd>–<kbd>4</kbd> · <kbd>P</kbd> to pause</div>
          <div class="bp-dash-choices" id="bp-dash-choices" role="group" aria-label="Choose the correct derivative" aria-describedby="bp-dash-choice-guide"></div>
          <div class="bp-dash-meter"><i id="bp-dash-meter"></i></div>
          <p class="bp-dash-message" id="bp-dash-message" aria-live="polite">Correct answers build a multiplier up to ×5. Wrong answers cost 2 seconds.</p>
          <div class="bp-dash-controls"><button class="btn light" id="bp-dash-start" type="button">Start 60-second run</button><button class="btn ghost" id="bp-dash-pause" type="button" disabled>Pause</button></div>
        </div>
      </div>
    </section>

    <section class="bp-arcade-machine" data-arcade-game="bird" aria-labelledby="bird-title" hidden>
      <header class="bp-machine-head">
        <div><small>GAME 02</small><h2 id="bird-title">Brainpower Bird</h2><p>Space, click, tap or the mobile flap control. Chill mode is deliberately forgiving.</p></div>
        <div class="bp-machine-hud" aria-label="Brainpower Bird statistics">
          <span><small>SCORE</small><b id="bp-bird-score">0</b></span>
          <span><small>LIVES</small><b id="bp-bird-lives">3</b></span>
          <span><small>BEST</small><b id="bp-bird-best">${birdBest}</b></span>
        </div>
      </header>
      <div class="bp-bird-toolbar">
        <label>Difficulty<select id="bp-bird-difficulty"><option value="chill">Chill — wider gaps, 3 lives</option><option value="standard">Standard — 2 lives</option><option value="chaos">Chaos — one life</option></select></label>
        <button class="btn ghost" id="bp-bird-pause" type="button" disabled>Pause</button>
      </div>
      <div class="bp-bird-frame">
        <canvas id="bp-bird-canvas" width="1080" height="540" role="img" aria-label="Brainpower Bird playfield. Fly through gaps between academic obstacles."></canvas>
        <div class="bp-bird-overlay" id="bp-bird-overlay">
          <div class="bp-bird-overlay__panel">
            <img src="public/brand/brainy.svg" alt="" aria-hidden="true">
            <small>ENDLESS FLIGHT</small><h3 id="bp-bird-overlay-title">Ready for take-off?</h3>
            <p id="bp-bird-overlay-copy">Avoid SACs, exams and domain errors. Chill mode gives you room to learn the rhythm.</p>
            <button class="btn primary" id="bp-bird-start" type="button">Start flight</button>
            <span>Space / click / tap to flap · P to pause</span>
          </div>
        </div>
      </div>
      <button class="bp-bird-flap" id="bp-bird-flap" type="button" aria-label="Flap Brainy">FLAP <span>↑</span></button>
    </section>

    <section class="bp-arcade-footnote">
      <div><small>ACADEMIC PROGRESS</small><h3>Games are intentionally separate.</h3><p>Personal bests are saved locally, but Arcade does not award course mastery or inflate XP.</p></div>
      <a class="btn ghost" href="#practice">Back to training →</a>
    </section>
  </div>`;
}

function createDash(main){
  const scoreEl=$('#bp-dash-score',main),comboEl=$('#bp-dash-combo',main),timeEl=$('#bp-dash-time',main),bestEl=$('#bp-dash-best',main),tagEl=$('#bp-dash-tag',main),streakEl=$('#bp-dash-streak',main),questionEl=$('#bp-dash-question',main),choicesEl=$('#bp-dash-choices',main),meter=$('#bp-dash-meter',main),message=$('#bp-dash-message',main),start=$('#bp-dash-start',main),pause=$('#bp-dash-pause',main);
  const panel=choicesEl.closest('[data-arcade-game]');
  let running=false,paused=false,locked=false,score=0,streak=0,time=60,timer=null,advanceTimer=null,current=null,options=[],deck=[],lastId=null;
  const multiplier=()=>Math.min(5,1+Math.floor(streak/3));
  const paint=()=>{scoreEl.textContent=score;comboEl.textContent=`×${multiplier()}`;timeEl.textContent=time;streakEl.textContent=`${streak} streak`;meter.style.width=`${Math.min(100,(streak%3)/3*100)}%`;};
  const typeset=(el,latex,fallback)=>{
    el.textContent=fallback;
    if(window.katex)window.katex.render(latex,el,{throwOnError:false,output:'htmlAndMathml'});
  };
  const enableChoices=()=>$$('button',choicesEl).forEach(btn=>btn.disabled=!running||paused||locked);
  const focusChoice=()=>{if(!panel.hidden)$('button',choicesEl)?.focus({preventScroll:true})};
  const next=()=>{
    clearTimeout(advanceTimer);advanceTimer=null;
    if(!running||paused)return;
    if(!deck.length){
      deck=shuffled(DERIVATIVE_BANK);
      if(deck[0].id===lastId)[deck[0],deck[1]]=[deck[1],deck[0]];
    }
    current=deck.shift();lastId=current.id;options=shuffled(current.choices);locked=false;
    questionEl.dataset.questionId=current.id;
    typeset(questionEl,`\\frac{\\mathrm d}{\\mathrm dx}\\left(${current.latex}\\right)`,`d/dx (${current.f})`);
    tagEl.textContent=current.tag;
    choicesEl.replaceChildren();
    options.forEach((option,i)=>{
      const button=document.createElement('button');
      button.type='button';button.className='bp-dash-choice';button.dataset.choice=i;
      const number=document.createElement('span');number.className='bp-dash-choice__key';number.textContent=i+1;number.setAttribute('aria-hidden','true');
      const formula=document.createElement('span');formula.className='bp-dash-choice__formula';
      typeset(formula,option.latex,option.value);
      const result=document.createElement('span');result.className='bp-dash-choice__result';
      button.append(number,formula,result);choicesEl.appendChild(button);
    });
    enableChoices();focusChoice();
  };
  const finish=()=>{
    if(!running&&!timer)return;
    running=false;paused=false;locked=true;clearInterval(timer);clearTimeout(advanceTimer);timer=null;advanceTimer=null;
    enableChoices();pause.disabled=true;pause.textContent='Pause';start.hidden=false;start.textContent='Run it again';questionEl.textContent='RUN COMPLETE';
    const saved=saveArcade('derivativeDash',score),best=Number(saved.arcade?.derivativeDash||score);
    bestEl.textContent=best;$$('[data-dash-best]',main).forEach(x=>x.textContent=best);
    message.textContent=score===best&&score>0?`Final score ${score}. New personal best.`:`Final score ${score}. Best ${best}.`;
    tone(520,.08,.03);start.focus({preventScroll:true});
  };
  const tick=()=>{if(!running||paused)return;time=Math.max(0,time-1);paint();if(time<=0)finish();};
  const startRun=()=>{
    clearInterval(timer);clearTimeout(advanceTimer);score=0;streak=0;time=60;deck=[];running=true;paused=false;locked=false;
    pause.disabled=false;pause.textContent='Pause';start.hidden=true;message.textContent='Pick the exact derivative.';
    paint();next();timer=setInterval(tick,1000);tone(660,.06,.025);
  };
  const check=index=>{
    if(!running||paused||locked||!current||!options[index])return;
    locked=true;enableChoices();
    const selected=options[index];
    $$('button',choicesEl).forEach((button,i)=>{
      if(options[i].correct){button.classList.add('is-correct');$('.bp-dash-choice__result',button).textContent='Correct'}
      else if(i===index){button.classList.add('is-wrong');$('.bp-dash-choice__result',button).textContent='Missed'}
    });
    if(selected.correct){
      const points=multiplier();score+=points;streak++;
      message.textContent=streak>=3?`Correct · +${points} · ×${multiplier()} combo active.`:`Correct · +${points}.`;
      tone(760,.045,.025);
    }else{
      streak=0;time=Math.max(0,time-2);
      message.textContent=`Missed · −2 seconds. ${selected.mistake}`;tone(190,.08,.02);
    }
    paint();if(time<=0)finish();else advanceTimer=setTimeout(next,450);
  };
  const togglePause=()=>{
    if(!running)return;
    paused=!paused;pause.textContent=paused?'Resume':'Pause';
    if(paused){clearTimeout(advanceTimer);advanceTimer=null;message.textContent='Run paused.'}
    else{message.textContent='Back in.';if(locked)advanceTimer=setTimeout(next,450);else focusChoice()}
    enableChoices();
  };
  const key=e=>{
    if(route()!=='arcade'||panel.hidden||!running||e.repeat||e.ctrlKey||e.metaKey||e.altKey)return;
    if(e.target?.matches('input,textarea,select'))return;
    if(/^[1-4]$/.test(e.key)){e.preventDefault();check(Number(e.key)-1)}
    else if(e.key.toLowerCase()==='p'){e.preventDefault();togglePause()}
  };
  start.addEventListener('click',startRun);pause.addEventListener('click',togglePause);
  choicesEl.addEventListener('click',e=>{const btn=e.target.closest('[data-choice]');if(btn)check(Number(btn.dataset.choice))});
  window.addEventListener('keydown',key);paint();
  return {stop(){clearInterval(timer);clearTimeout(advanceTimer);running=false;window.removeEventListener('keydown',key)},pause(){if(running&&!paused)togglePause()},isRunning:()=>running};
}

function createBird(main){
  const canvas=$('#bp-bird-canvas',main),ctx=canvas?.getContext('2d');
  if(!canvas||!ctx)return {stop(){},pause(){},isRunning:()=>false};
  const overlay=$('#bp-bird-overlay',main),overlayTitle=$('#bp-bird-overlay-title',main),overlayCopy=$('#bp-bird-overlay-copy',main),start=$('#bp-bird-start',main),pauseBtn=$('#bp-bird-pause',main),flapBtn=$('#bp-bird-flap',main),difficulty=$('#bp-bird-difficulty',main),scoreEl=$('#bp-bird-score',main),livesEl=$('#bp-bird-lives',main),bestEl=$('#bp-bird-best',main);
  const W=1080,H=540;
  const configs={
    chill:{gap:238,speed:.245,gravity:.00145,flap:-.56,lives:3,spacing:430},
    standard:{gap:190,speed:.295,gravity:.00162,flap:-.60,lives:2,spacing:390},
    chaos:{gap:154,speed:.35,gravity:.00178,flap:-.64,lives:1,spacing:355}
  };
  const labels=['SAC','EXAM','CAS ERROR','DOMAIN ERROR','PROOF'];
  let raf=0,running=false,paused=false,last=0,score=0,lives=3,bird=null,gates=[],invincible=0,nextSpawn=0;
  const brainy=new Image();brainy.src='public/brand/brainy.svg';
  const cfg=()=>configs[difficulty.value]||configs.chill;
  const paintHud=()=>{scoreEl.textContent=score;livesEl.textContent=lives;};
  const reset=()=>{bird={x:190,y:H/2,vy:0,r:26,tilt:0};gates=[];score=0;lives=cfg().lives;invincible=0;nextSpawn=W+130;last=0;paintHud();};
  const flap=()=>{if(running&&!paused){bird.vy=cfg().flap;tone(510,.025,.012)}};
  const spawn=()=>{const c=cfg(),margin=c.gap/2+58,mid=margin+Math.random()*(H-2*margin);gates.push({x:W+80,w:90,top:mid-c.gap/2,bottom:mid+c.gap/2,label:labels[Math.floor(Math.random()*labels.length)],passed:false});nextSpawn=c.spacing;};
  const hit=g=>{const r=bird.r*.7;return bird.x+r>g.x&&bird.x-r<g.x+g.w&&(bird.y-r<g.top||bird.y+r>g.bottom)};
  const loseLife=()=>{if(invincible>0)return false;lives--;paintHud();tone(145,.12,.025);if(lives<=0)return true;bird.y=H/2;bird.vy=0;invincible=1000;gates=gates.filter(g=>g.x>bird.x+90);return false;};
  function drawBackground(){
    const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#07152a');g.addColorStop(.55,'#0b2850');g.addColorStop(1,'#140d2b');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='rgba(92,190,255,.12)';ctx.lineWidth=1;const offset=(score*18)%60;for(let x=-60+offset;x<W+60;x+=60){ctx.beginPath();ctx.moveTo(x,H);ctx.lineTo(x+210,0);ctx.stroke()}
    ctx.fillStyle='rgba(108,92,255,.22)';for(let i=0;i<18;i++){const x=(i*113+score*7)%W,y=54+(i%5)*91;ctx.beginPath();ctx.arc(x,y,1.8+(i%3),0,Math.PI*2);ctx.fill()}
    ctx.fillStyle='rgba(255,255,255,.045)';ctx.fillRect(0,H-54,W,54);
  }
  function drawGate(g){
    const grad=ctx.createLinearGradient(g.x,0,g.x+g.w,0);grad.addColorStop(0,'#1b3157');grad.addColorStop(.5,'#314ca2');grad.addColorStop(1,'#162544');ctx.fillStyle=grad;
    ctx.fillRect(g.x,0,g.w,g.top);ctx.fillRect(g.x,g.bottom,g.w,H-g.bottom);
    ctx.shadowColor='rgba(105,112,255,.7)';ctx.shadowBlur=18;ctx.fillStyle='#7184ff';ctx.fillRect(g.x-4,g.top-10,g.w+8,10);ctx.fillRect(g.x-4,g.bottom,g.w+8,10);ctx.shadowBlur=0;
    ctx.fillStyle='#dbe8ff';ctx.font='800 14px system-ui';ctx.textAlign='center';ctx.save();ctx.translate(g.x+g.w/2,Math.max(28,g.top-24));ctx.rotate(-Math.PI/2);ctx.fillText(g.label,0,0);ctx.restore();
  }
  function drawBird(){
    ctx.save();ctx.translate(bird.x,bird.y);ctx.rotate(clamp(bird.vy*.45,-.28,.5));ctx.globalAlpha=invincible>0&&Math.floor(invincible/90)%2===0?.38:1;
    if(brainy.complete&&brainy.naturalWidth){const size=74;ctx.drawImage(brainy,-size/2,-size/2,size,size)}else{
      ctx.fillStyle='#fff3d2';ctx.strokeStyle='#0b2b4e';ctx.lineWidth=5;ctx.beginPath();ctx.roundRect(-30,-22,60,44,10);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(0,-18);ctx.lineTo(0,18);ctx.stroke();ctx.fillStyle='#0b2b4e';ctx.beginPath();ctx.arc(-12,-4,3.5,0,Math.PI*2);ctx.arc(12,-4,3.5,0,Math.PI*2);ctx.fill();
    }
    ctx.restore();
  }
  function draw(){drawBackground();gates.forEach(drawGate);drawBird();ctx.fillStyle='rgba(5,10,23,.62)';ctx.fillRect(18,18,188,44);ctx.fillStyle='#f5f8ff';ctx.font='800 17px system-ui';ctx.textAlign='left';ctx.fillText(`Score ${score}`,34,46);ctx.fillStyle='#ffc4d7';ctx.fillText(`Lives ${'♥'.repeat(lives)}`,112,46);}
  const gameOver=()=>{running=false;paused=false;cancelAnimationFrame(raf);pauseBtn.disabled=true;difficulty.disabled=false;const saved=saveArcade('bird',score),best=Number(saved.arcade?.bird||score);bestEl.textContent=best;$$('[data-bird-best]',main).forEach(x=>x.textContent=best);overlay.hidden=false;overlayTitle.textContent=score===best&&score>0?'New flight record.':'Flight over.';overlayCopy.textContent=score===0?'The first obstacle remains undefeated.':`You cleared ${score} academic obstacle${score===1?'':'s'}. Best ${best}.`;start.textContent='Fly again';tone(260,.12,.025);};
  function loop(ts){
    if(!running)return;
    if(paused){last=ts;raf=requestAnimationFrame(loop);return}
    const dt=Math.min(34,ts-last||16);last=ts;const c=cfg();invincible=Math.max(0,invincible-dt);bird.vy+=c.gravity*dt;bird.y+=bird.vy*dt;nextSpawn-=c.speed*dt;if(nextSpawn<=0)spawn();
    gates.forEach(g=>{g.x-=c.speed*dt;if(!g.passed&&g.x+g.w<bird.x){g.passed=true;score++;paintHud();tone(650,.03,.012)}});gates=gates.filter(g=>g.x>-120);
    const collision=bird.y-bird.r<0||bird.y+bird.r>H||gates.some(hit);if(collision&&invincible<=0&&loseLife()){draw();gameOver();return}draw();raf=requestAnimationFrame(loop);
  }
  const startGame=()=>{reset();overlay.hidden=true;difficulty.disabled=true;pauseBtn.disabled=false;pauseBtn.textContent='Pause';running=true;paused=false;raf=requestAnimationFrame(loop);tone(620,.055,.02);};
  const togglePause=()=>{if(!running)return;paused=!paused;pauseBtn.textContent=paused?'Resume':'Pause';overlay.hidden=!paused;if(paused){overlayTitle.textContent='Paused';overlayCopy.textContent='Your flight is frozen. Resume when ready.';start.hidden=true}else{start.hidden=false;overlay.hidden=true}};
  start.addEventListener('click',()=>{start.hidden=false;startGame()});pauseBtn.addEventListener('click',togglePause);flapBtn.addEventListener('pointerdown',e=>{e.preventDefault();flap()});canvas.addEventListener('pointerdown',e=>{e.preventDefault();flap()});
  const key=e=>{if(route()!=='arcade'||canvas.closest('[data-arcade-game]').hidden)return;if(e.code==='Space'&&running){e.preventDefault();flap()}if(e.key.toLowerCase()==='p'&&running){e.preventDefault();togglePause()}};window.addEventListener('keydown',key);reset();draw();
  return {stop(){running=false;cancelAnimationFrame(raf);window.removeEventListener('keydown',key);difficulty.disabled=false;},pause(){if(running&&!paused)togglePause()},isRunning:()=>running};
}

function enhance(main){
  const p=load();main.className='bp-arcade-page';main.innerHTML=markup(p);
  const dash=createDash(main),bird=createBird(main);
  let active='dash';
  const select=game=>{
    active=game==='bird'?'bird':'dash';
    $$('[data-arcade-select]',main).forEach(btn=>{const on=btn.dataset.arcadeSelect===active;btn.classList.toggle('is-active',on);if(btn.classList.contains('bp-cabinet'))btn.setAttribute('aria-pressed',String(on))});
    $$('[data-arcade-game]',main).forEach(panel=>{const on=panel.dataset.arcadeGame===active;panel.classList.toggle('is-active',on);panel.hidden=!on});
    if(active==='dash'&&bird.isRunning())bird.pause();
    if(active==='bird'&&dash.isRunning())dash.pause();
    const panel=$(`[data-arcade-game="${active}"]`,main);panel?.scrollIntoView({behavior:reducedMotion()?'auto':'smooth',block:'start'});
  };
  $$('[data-arcade-select]',main).forEach(btn=>btn.addEventListener('click',()=>select(btn.dataset.arcadeSelect)));
  const sound=$('.bp-arcade-sound',main);sound?.addEventListener('click',()=>{const on=localStorage.getItem('bp-arcade-sound')!=='off';localStorage.setItem('bp-arcade-sound',on?'off':'on');sound.setAttribute('aria-pressed',String(!on));$('b',sound).textContent=on?'Sound off':'Sound on';if(!on)tone(580,.05,.02)});
  return ()=>{dash.stop();bird.stop()};
}

let teardown=null,queued=false;
function apply(){
  if(route()!=='arcade'){if(teardown){teardown();teardown=null}return}
  const main=$('main');if(!main||main.dataset.bpArcade==='1')return;
  if(teardown)teardown();main.dataset.bpArcade='1';teardown=enhance(main);
}
function queue(){if(queued)return;queued=true;queueMicrotask(()=>{queued=false;apply()})}
const app=$('#app');if(app)new MutationObserver(queue).observe(app,{childList:true,subtree:true});addEventListener('hashchange',()=>setTimeout(apply,0));apply();
