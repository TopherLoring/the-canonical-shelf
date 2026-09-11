/* Authoritative complete v4 loader for the redesign branch. */
(() => {
  'use strict';
  if(window.__CANON_V4_COMPLETE_LOADER__)return;window.__CANON_V4_COMPLETE_LOADER__=true;
  const script=document.currentScript,base=script?.src?new URL('.',script.src):new URL('./',location.href);
  const css=['v4-design-system.css'];
  const js=[
    'v4-course-map.js',
    'v4-visuals.js','v4-games.js','v4-guided-game-adapter.js',
    'v4-mastery-content.js','v4-mastery-story.js','v4-mastery-order.js','v4-mastery-groups.js','v4-mastery-chrono.js','v4-mastery-content-profiles.js','v4-mastery-themes.js','v4-mastery-verses.js','v4-mastery-manifest.js',
    'v4-guided-visual-rules.js','v4-curriculum-migration.js','v4-progress-migration.js',
    'topics-data.js','topics-extended.js','v4-topic-bridge.js','topics.js',
    'v4-guided-shell.js','v4-app-integrated.js'
  ];
  const addStyle=src=>new Promise((res,rej)=>{if(document.querySelector(`link[data-canon-v4="${src}"]`))return res();const el=document.createElement('link');el.rel='stylesheet';el.href=new URL(src,base).href;el.dataset.canonV4=src;el.onload=res;el.onerror=()=>rej(Error(`Failed ${src}`));document.head.appendChild(el);});
  const addScript=src=>new Promise((res,rej)=>{if(document.querySelector(`script[data-canon-v4="${src}"]`))return res();const el=document.createElement('script');el.src=new URL(src,base).href;el.async=false;el.dataset.canonV4=src;el.onload=res;el.onerror=()=>rej(Error(`Failed ${src}`));document.head.appendChild(el);});
  async function boot(){try{for(const f of css)await addStyle(f);for(const f of js)await addScript(f);console.info('Canonical Shelf v4 complete layer ready');}catch(err){console.error('Canonical Shelf v4 complete layer failed',err);}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
