// Route-only features are fetched on first use, rather than every landing visit.
const loaded=new Map();
const routes={learn:'./learn.js',course:'./course-overview.js',lesson:'./lesson.js',practice:'./practice.js',tests:'./assessment.js',test:'./assessment.js',exam:'./assessment.js',arcade:'./arcade.js',resources:'./resources-tools.js',tools:'./resources-tools.js',progress:'./progress.js',about:'./secondary.js',search:'./secondary.js',diagnostic:'./secondary.js',admin:'./secondary.js'};
const known=new Set(['home','learn','course','lesson','practice','tests','test','exam',...Object.keys(routes)]);
let generation=0;
async function ensureRoute(){
  const currentGeneration=++generation;
  const route=(location.hash.slice(1)||'home').split(/[/?]/)[0];
  const path=routes[route]||(!known.has(route)?'./secondary.js':null);
  if(path&&!loaded.has(path)){document.body.dataset.bpRoutePending='true';window.BrainpowerPageTransition?.show();loaded.set(path,import(path).catch(error=>{loaded.delete(path);console.error('Unable to load route features',error)}));}
  if(path){await loaded.get(path);if(currentGeneration===generation){delete document.body.dataset.bpRoutePending;window.BrainpowerPageTransition?.hide();}}
  if(route==='admin'&&!document.querySelector('script[data-bp-admin-zip]')){
    const script=document.createElement('script');script.src='https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';script.dataset.bpAdminZip='1';script.async=true;document.head.appendChild(script);
  }
}
addEventListener('hashchange',ensureRoute);ensureRoute();
