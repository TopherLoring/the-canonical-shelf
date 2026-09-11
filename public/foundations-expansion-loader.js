/* Static-host loader for the Canonical Shelf integrated curriculum.
   v4 redesign branch also loads the curated Topics reference desk. */
(() => {
  'use strict';
  if (window.__CANON_EXPANSION_LOADER__) return;
  window.__CANON_EXPANSION_LOADER__ = true;

  const FILES = [
    'foundations-expansion-core.js',
    'foundations-units-02-08.js',
    'foundations-units-09-16.js',
    'foundations-skill-source.js',
    'foundations-skill-curriculum.js',
    'foundations-expansion-meta.js',
    'foundations-expansion-finalize.js',
    'topics-data.js',
    'topics.js'
  ];
  const script = document.currentScript;
  const base = script?.src ? new URL('.', script.src) : new URL('./', location.href);

  const ready = () => !!(window.FOUNDATIONS_DATA && window.Foundations);
  const load = src => new Promise((resolve,reject) => {
    const el=document.createElement('script');
    el.src=new URL(src,base).href;
    el.async=false;
    el.dataset.canonExpansion='1';
    el.onload=resolve;
    el.onerror=()=>reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(el);
  });

  let attempts=0;
  async function boot(){
    if(window.__CANON_EXPANSION_BOOTED__) return;
    if(!ready()){
      attempts+=1;
      if(attempts>400){
        console.error('Canonical Shelf curriculum expansion could not find the baseline Foundations app.');
        return;
      }
      setTimeout(boot,25);
      return;
    }
    window.__CANON_EXPANSION_BOOTED__=true;
    try{
      for(const file of FILES) await load(file);
    }catch(err){
      window.__CANON_EXPANSION_BOOTED__=false;
      console.error('Canonical Shelf curriculum expansion failed to load.',err);
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
