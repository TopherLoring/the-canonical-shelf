/* Static-host loader for the Canonical Shelf curriculum.
   Builds the stable v4 curriculum/runtime, then mounts the complete v5 application experience. */
(() => {
  'use strict';
  if (window.__CANON_EXPANSION_LOADER__) return;
  window.__CANON_EXPANSION_LOADER__ = true;

  const STYLES = ['v4-design-system.css','v4-integrated.css','v5-shell.css','v5-pages.css'];
  const FILES = [
    'foundations-expansion-core.js','foundations-units-02-08.js','foundations-units-09-16.js','foundations-skill-source.js','foundations-skill-curriculum.js','foundations-expansion-meta.js','foundations-expansion-finalize.js',
    'v4-course-map.js','v4-guided-visual-rules.js','v4-curriculum-migration.js','v4-visuals.js','v4-games.js','v4-guided-game-adapter.js','v4-progress-migration.js','v4-guided-shell.js',
    'v4-mastery-content.js','v4-mastery-story.js','v4-mastery-order.js','v4-mastery-groups.js','v4-mastery-chrono.js','v4-mastery-content-profiles.js','v4-mastery-themes.js','v4-mastery-verses.js','v4-mastery-manifest.js',
    'topics-data.js','topics-extended.js','v4-topic-bridge.js','topics.js','v4-topics-enhance.js',
    'v4-app-integrated.js','v4-shell-bridge.js','v5-shell.js','v5-pages.js','v5-faith.js'
  ];
  const script = document.currentScript;
  const base = script?.src ? new URL('.', script.src) : new URL('./', location.href);
  const ready = () => !!(window.FOUNDATIONS_DATA && window.Foundations);
  const loadStyle = src => new Promise((resolve,reject) => {const href=new URL(src,base).href;if(document.querySelector(`link[data-canon-v4-style="${src}"]`))return resolve();const el=document.createElement('link');el.rel='stylesheet';el.href=href;el.dataset.canonV4Style=src;el.onload=resolve;el.onerror=()=>reject(new Error(`Failed to load ${src}`));document.head.appendChild(el)});
  const load = src => new Promise((resolve,reject) => {const el=document.createElement('script');el.src=new URL(src,base).href;el.async=false;el.dataset.canonExpansion='1';el.onload=resolve;el.onerror=()=>reject(new Error(`Failed to load ${src}`));document.head.appendChild(el)});
  let attempts=0;
  async function boot(){if(window.__CANON_EXPANSION_BOOTED__)return;if(!ready()){attempts+=1;if(attempts>400){console.error('Canonical Shelf curriculum expansion could not find the baseline Foundations app.');return}setTimeout(boot,25);return}window.__CANON_EXPANSION_BOOTED__=true;try{for(const style of STYLES)await loadStyle(style);for(const file of FILES)await load(file)}catch(err){window.__CANON_EXPANSION_BOOTED__=false;console.error('Canonical Shelf curriculum failed to load.',err)}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
