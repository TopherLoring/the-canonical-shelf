/* Canonical Shelf v4 shell bridge.
   Reuses the established full-app navigation/reader while replacing the old Learn surface with v4 Course. */
(() => {
  'use strict';
  if(window.__CANON_V4_SHELL_BRIDGE__)return;window.__CANON_V4_SHELL_BRIDGE__=true;
  const legacyRenderLearn=typeof window.renderLearn==='function'?window.renderLearn:null;
  function host(){return document.getElementById('panel-learn');}
  function mountCourse(){
    const panel=host();
    if(!panel)return;
    if(!window.CanonV4Integrated){legacyRenderLearn?.();return;}
    window.CanonV4Integrated.mount(panel);
    panel.dataset.v4Course='1';
  }
  function prepareShell(){
    const tab=document.getElementById('tab-learn');
    if(tab){
      tab.textContent='Course';
      tab.setAttribute('aria-label','Course');
      if(!tab.dataset.v4CourseBound){tab.dataset.v4CourseBound='1';tab.addEventListener('click',()=>setTimeout(mountCourse,0));}
    }
    const ret=document.getElementById('foundations-return');if(ret)ret.hidden=true;
    const eyebrow=document.querySelector('.masthead .eyebrow');
    if(eyebrow)eyebrow.innerHTML='<b>66 books</b> · Full Bible reader · 25-unit course · Practice · Topics';
    document.documentElement.dataset.canonV4Shell='1';
  }
  prepareShell();
  window.renderLearn=mountCourse;
  if(document.getElementById('tab-learn')?.getAttribute('aria-selected')==='true')mountCourse();
  window.CanonV4Shell={mountCourse};
})();
