/* Canonical Shelf v4 branch loader. Loads after the existing app/expansion and keeps v4 isolated. */
(() => {
  'use strict';
  if(window.__CANON_V4_LOADER__)return;window.__CANON_V4_LOADER__=true;
  const script=document.currentScript,base=script?.src?new URL('.',script.src):new URL('./',location.href);
  const css=['v4-design-system.css'];
  const js=['v4-course-map.js','v4-visuals.js','v4-games.js','v4-mastery-content.js','topics-data.js','topics.js','v4-app.js','v4-preview.js'];
  function style(src){return new Promise((resolve,reject)=>{if(document.querySelector(`link[data-canon-v4="${src}"]`))return resolve();const el=document.createElement('link');el.rel='stylesheet';el.href=new URL(src,base).href;el.dataset.canonV4=src;el.onload=resolve;el.onerror=()=>reject(Error(`Failed to load ${src}`));document.head.append(el);});}
  function load(src){return new Promise((resolve,reject)=>{if(document.querySelector(`script[data-canon-v4="${src}"]`))return resolve();const el=document.createElement('script');el.src=new URL(src,base).href;el.async=false;el.dataset.canonV4=src;el.onload=resolve;el.onerror=()=>reject(Error(`Failed to load ${src}`));document.head.append(el);});}
  async function boot(){try{for(const f of css)await style(f);for(const f of js)await load(f);}catch(err){console.error('Canonical Shelf v4 preview failed to load',err);}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
