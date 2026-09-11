/* v4 branch preview integration.
   Adds Topics as a real tab and exposes the v4 curriculum behind Learn without modifying the large legacy index source. */
(() => {
  'use strict';
  if(window.__CANON_V4_PREVIEW__)return;window.__CANON_V4_PREVIEW__=true;
  const ready=()=>document.querySelector('.tabs')&&document.querySelector('#panel-learn');
  let tries=0;
  function boot(){
    if(!ready()){if(++tries<300)setTimeout(boot,25);return;}
    ensureTopicsTab();
    ensureV4Toggle();
  }
  function ensureTopicsTab(){
    if(document.getElementById('tab-topics'))return;
    const tabs=document.querySelector('.tabs'),verses=document.getElementById('tab-verses');
    const b=document.createElement('button');b.className='tab';b.type='button';b.role='tab';b.id='tab-topics';b.dataset.tab='topics';b.setAttribute('aria-controls','panel-topics');b.setAttribute('aria-selected','false');b.textContent='Topics';
    verses?.after(b)||tabs.append(b);
    const main=document.querySelector('main'),panel=document.createElement('section');panel.className='panel wrap';panel.id='panel-topics';panel.role='tabpanel';panel.setAttribute('aria-labelledby','tab-topics');panel.hidden=true;main.append(panel);
    b.addEventListener('click',()=>openTopics());
  }
  function openTopics(){
    try{window.S&&(S.tab='topics');}catch{}
    document.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-selected',String(x.id==='tab-topics')));
    ['play','explore','learn','verses'].forEach(k=>{const p=document.getElementById('panel-'+k);if(p){p.dataset.open='0';p.hidden=true;}});
    const p=document.getElementById('panel-topics');p.hidden=false;p.dataset.open='1';
    if(window.CanonTopics?.mount)window.CanonTopics.mount(p);else p.innerHTML='<div class="v4-topic-empty">Topics is still loading…</div>';
    window.scrollTo({top:document.querySelector('.tabbar')?.offsetTop||0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  }
  function ensureV4Toggle(){
    const panel=document.getElementById('panel-learn');if(!panel||document.getElementById('v4-preview-switch'))return;
    const wrap=document.createElement('div');wrap.id='v4-preview-switch';wrap.className='wrap';wrap.style.cssText='padding-top:14px;display:flex;justify-content:flex-end';
    wrap.innerHTML='<button type="button" class="v4-btn v4-btn--secondary" id="v4-preview-button">Preview redesigned v4 course</button>';
    panel.before(wrap);
    wrap.querySelector('button').addEventListener('click',()=>{
      panel.hidden=false;panel.dataset.open='1';
      if(window.CanonV4?.mount)window.CanonV4.mount(panel);
      wrap.querySelector('button').textContent='v4 curriculum preview active';
    });
  }
  document.addEventListener('click',e=>{
    const tab=e.target.closest?.('.tab[data-tab]');
    if(tab&&tab.dataset.tab!=='topics'){
      const p=document.getElementById('panel-topics');if(p){p.hidden=true;p.dataset.open='0';}
    }
  });
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
