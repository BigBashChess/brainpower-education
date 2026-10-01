const reduceMotion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;

export function mountExperience(){
  if(reduceMotion()) return ()=>{};
  const clean=[];

  // Ambient mathematical canvas — subtle until the user interacts.
  const canvas=document.createElement('canvas');
  canvas.className='math-ambient'; canvas.setAttribute('aria-hidden','true'); document.body.appendChild(canvas);
  const ctx=canvas.getContext('2d'); let raf=0, mx=innerWidth*.5,my=innerHeight*.35;
  const glyphs=['∫','Σ','π','i','ƒ','∂','∞','√','θ','eˣ'];
  const pts=Array.from({length:24},(_,i)=>({x:Math.random(),y:Math.random(),s:16+Math.random()*34,g:glyphs[i%glyphs.length],v:.00004+Math.random()*.00008,p:Math.random()*6.28}));
  const resize=()=>{canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)};
  const move=e=>{mx=e.clientX;my=e.clientY}; addEventListener('resize',resize); addEventListener('pointermove',move,{passive:true}); resize();
  const draw=t=>{ctx.clearRect(0,0,innerWidth,innerHeight);ctx.textAlign='center';ctx.textBaseline='middle';for(const p of pts){const x=p.x*innerWidth+Math.sin(t*p.v+p.p)*22,y=p.y*innerHeight+Math.cos(t*p.v*.7+p.p)*18;const d=Math.hypot(x-mx,y-my);const a=Math.max(.018,.09-d/4500);ctx.fillStyle=`rgba(13,111,184,${a})`;ctx.font=`600 ${p.s}px Georgia`;ctx.fillText(p.g,x,y)}raf=requestAnimationFrame(draw)};raf=requestAnimationFrame(draw);
  clean.push(()=>{cancelAnimationFrame(raf);canvas.remove();removeEventListener('resize',resize);removeEventListener('pointermove',move)});

  // Cursor spotlight and card tilt.
  const root=document.documentElement;
  const spotlight=e=>{root.style.setProperty('--mx',e.clientX+'px');root.style.setProperty('--my',e.clientY+'px')}; addEventListener('pointermove',spotlight,{passive:true}); clean.push(()=>removeEventListener('pointermove',spotlight));
  document.querySelectorAll('.card,.test-card,.course-card,.flow-step,.topic-node').forEach(el=>{
    const on=e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.setProperty('--rx',`${-y*2.4}deg`);el.style.setProperty('--ry',`${x*3}deg`)};
    const off=()=>{el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')};el.addEventListener('pointermove',on);el.addEventListener('pointerleave',off);clean.push(()=>{el.removeEventListener('pointermove',on);el.removeEventListener('pointerleave',off)})
  });

  // Reveal choreography.
  const targets=[...document.querySelectorAll('.section-title,.card,.test-card,.course-card,.topic-node,.news-grid article,.flow-step')];targets.forEach((el,i)=>{el.classList.add('reveal-item');el.style.setProperty('--reveal-delay',`${Math.min(i%6,5)*45}ms`)});
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -30px'});targets.forEach(x=>io.observe(x));clean.push(()=>io.disconnect());

  // Hero symbols react to pointer instead of sitting still.
  document.querySelectorAll('.floating-math').forEach((el,i)=>{const f=e=>{const x=(e.clientX/innerWidth-.5)*(8+i*4),y=(e.clientY/innerHeight-.5)*(8+i*3);el.style.transform=`translate3d(${x}px,${y}px,0) rotate(${x*.5}deg)`};addEventListener('pointermove',f,{passive:true});clean.push(()=>removeEventListener('pointermove',f))});

  return ()=>clean.forEach(fn=>{try{fn()}catch{}});
}
