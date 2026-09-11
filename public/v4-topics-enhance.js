/* v4 Topics integration: lightweight progress history + accessible view transitions. */
(() => {
  'use strict';
  if(window.__CANON_V4_TOPICS_ENHANCE__)return;window.__CANON_V4_TOPICS_ENHANCE__=true;
  const P=()=>window.CanonV4Progress;
  const topicRoot=()=>document.querySelector('#pv-topics,#panel-topics');
  function prepare(){
    const content=topicRoot()?.querySelector('#ct-content');
    if(content){content.setAttribute('role','region');content.setAttribute('aria-label','Topics reference results');content.setAttribute('aria-live','polite');content.setAttribute('aria-atomic','false');}
  }
  function focusNewContent(preferArticle=false){
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      const root=topicRoot();if(!root)return;
      const target=(preferArticle?root.querySelector('.ct-article h3'):null)||root.querySelector('#ct-content h3,#ct-content h4,.ct-hero h2');
      if(target){target.setAttribute('tabindex','-1');target.focus();}
      prepare();
    }));
  }
  document.addEventListener('click',e=>{
    const topic=e.target.closest?.('[data-topic]');
    if(topic&&topicRoot()?.contains(topic)){
      const id=topic.dataset.topic;if(id)P()?.recentTopic?.(id);
      focusNewContent(true);return;
    }
    const view=e.target.closest?.('[data-view],[data-kind],[data-query]');
    if(view&&topicRoot()?.contains(view))focusNewContent(false);
  });
  document.addEventListener('submit',e=>{
    if(e.target?.id==='ct-search-form')focusNewContent(false);
  });
  const observer=new MutationObserver(()=>prepare());
  if(document.documentElement)observer.observe(document.documentElement,{childList:true,subtree:true});
  prepare();
})();
