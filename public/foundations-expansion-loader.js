/* Static-host loader for the Canonical Shelf curriculum.
   Builds the stable curriculum/runtime, then mounts the current application experience. */
(() => {
  'use strict';
  if (window.__CANON_EXPANSION_LOADER__) return;
  window.__CANON_EXPANSION_LOADER__ = true;

  const STYLES = ['v4-design-system.css','v4-integrated.css','v5-shell.css','v5-pages.css','v5-mobile-bible.css','v5-learning-experience.css','v5-onboarding.css','v5-compact-bible.css','v5-blueprint-r3.css'];
  const FILES = [
    'foundations-expansion-core.js','foundations-units-02-08.js','foundations-units-09-16.js','foundations-skill-source.js','foundations-skill-curriculum.js','foundations-expansion-meta.js','foundations-expansion-finalize.js',
    'v4-course-map.js','v4-guided-visual-rules.js','v4-curriculum-migration.js','v4-visuals.js','v4-games.js','v4-guided-game-adapter.js','v4-progress-migration.js','v4-guided-shell.js',
    'v4-mastery-content.js','v4-mastery-story.js','v4-mastery-order.js','v4-mastery-groups.js','v4-mastery-chrono.js','v4-mastery-content-profiles.js','v4-mastery-themes.js','v4-mastery-verses.js','v4-mastery-manifest.js',
    'topics-data.js','topics-extended.js','v4-topic-bridge.js','topics.js','v4-topics-enhance.js',
    'v4-app-integrated.js','v4-shell-bridge.js','v5-shell.js','v5-pages.js','v5-book-study-data.js','v5-mobile-bible.js','v5-bible-fixes.js','v5-learning-experience.js','v5-inline-scripture.js','v5-bible-continuity.js','v5-progress-adapter.js','v5-guided-tour.js'
  ];
  const script = document.currentScript;
  const base = script?.src ? new URL('.', script.src) : new URL('./', location.href);
  const ready = () => !!(window.FOUNDATIONS_DATA && window.Foundations);

  const loadStyle = src => new Promise((resolve,reject) => {
    const href=new URL(src,base).href;
    if(document.querySelector(`link[data-canon-v4-style="${src}"]`)) return resolve();
    const el=document.createElement('link');el.rel='stylesheet';el.href=href;el.dataset.canonV4Style=src;
    el.onload=resolve;el.onerror=()=>reject(new Error(`Failed to load ${src}`));document.head.appendChild(el);
  });
  const loadStyles = srcs => Promise.all(srcs.map(loadStyle));

  /* Download dependent classic scripts concurrently while preserving execution order. */
  const loadScriptsInOrder = srcs => Promise.all(srcs.map(src => new Promise((resolve,reject) => {
    const existing=document.querySelector(`script[data-canon-expansion-src="${src}"]`);if(existing){if(existing.dataset.loaded==='1')return resolve();existing.addEventListener('load',resolve,{once:true});existing.addEventListener('error',()=>reject(new Error(`Failed to load ${src}`)),{once:true});return;}
    const el=document.createElement('script');el.src=new URL(src,base).href;el.async=false;el.dataset.canonExpansion='1';el.dataset.canonExpansionSrc=src;
    el.onload=()=>{el.dataset.loaded='1';resolve()};el.onerror=()=>reject(new Error(`Failed to load ${src}`));document.head.appendChild(el);
  })));

  let attempts=0,bootTimer=null;
  function showBootStatus(message,failed=false){
    let el=document.getElementById('canon-boot-status');
    if(!message){el?.remove();return;}
    if(!el){el=document.createElement('div');el.id='canon-boot-status';el.setAttribute('role',failed?'alert':'status');el.setAttribute('aria-live',failed?'assertive':'polite');el.style.cssText='position:fixed;inset:auto 0 0 0;padding:.65em 1em;font:14px/1.4 system-ui,sans-serif;background:#171a1d;color:#fff;text-align:center;z-index:2147482000';document.body.appendChild(el)}
    el.textContent=message;
  }

  async function boot(){
    if(window.__CANON_EXPANSION_BOOTED__||window.__CANON_EXPANSION_FAILED__) return;
    if(!ready()){
      attempts+=1;
      if(attempts===40) showBootStatus('Still opening the course…');
      if(attempts>400){window.__CANON_EXPANSION_FAILED__=true;console.error('Canonical Shelf curriculum expansion could not find the baseline Foundations app.');showBootStatus('The course could not open. Reload the page to try again.',true);return;}
      bootTimer=setTimeout(boot,25);return;
    }
    window.__CANON_EXPANSION_BOOTED__=true;clearTimeout(bootTimer);
    try{await loadStyles(STYLES);await loadScriptsInOrder(FILES);showBootStatus(null)}
    catch(err){window.__CANON_EXPANSION_BOOTED__=false;window.__CANON_EXPANSION_FAILED__=true;console.error('Canonical Shelf curriculum failed to load.',err);showBootStatus('The course could not load completely. Your saved progress has not been changed. Reload to try again.',true)}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
