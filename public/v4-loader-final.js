/* Complete v4 branch preview loader. */
(() => {
  'use strict';
  if(window.__CANON_V4_FINAL_LOADER__)return;window.__CANON_V4_FINAL_LOADER__=true;
  const script=document.currentScript,base=script?.src?new URL('.',script.src):new URL('./',location.href);
  const css=['v4-design-system.css'];
  const js=[
    'v4-course-map.js','v4-course-map-fixed.js','v4-visuals.js','v4-games.js',
    'v4-mastery-content.js','v4-mastery-story.js','v4-mastery-order.js','v4-mastery-groups.js','v4-mastery-chrono.js','v4-mastery-content-profiles.js','v4-mastery-themes.js','v4-mastery-verses.js','v4-mastery-manifest.js',
    'v4-guided-visual-rules.js','v4-progress-migration.js',
    'topics-data.js','v4-topic-bridge.js','topics.js',
    'v4-app.js','v4-preview.js'
  ];
  function style(src){return new Promise((res,rej)=>{if(document.querySelector(`link[data-canon-v4-final="${src}"]`))return res();const el=document.createElement('link');el.rel='stylesheet';el.href=new URL(src,base).href;el.dataset.canonV4Final=src;el.onload=res;el.onerror=()=>rej(Error(`Failed to load ${src}`));document.head.append(el);});}
  function load(src){return new Promise((res,rej)=>{if(document.querySelector(`script[data-canon-v4-final="${src}"]`))return res();const el=document.createElement('script');el.src=new URL(src,base).href;el.async=false;el.dataset.canonV4Final=src;el.onload=res;el.onerror=()=>rej(Error(`Failed to load ${src}`));document.head.append(el);});}
  async function boot(){try{for(const f of css)await style(f);for(const f of js)await load(f);console.info('Canonical Shelf v4 preview ready');}catch(err){console.error('Canonical Shelf v4 preview failed',err);}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
