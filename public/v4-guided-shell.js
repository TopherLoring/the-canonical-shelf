/* Premium v4 renderer for guided lesson objects from FOUNDATIONS_DATA. */
window.CanonV4Guided=(()=>{
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const V=()=>window.CanonV4Visuals,G=()=>window.CanonV4Games,A=()=>window.CanonV4GuidedAdapter,P=()=>window.CanonV4Progress;
  let host=null,lesson=null,session=null,index=0,options={},reviewing=false;
  const isDone=()=>!!P()?.state?.lessons?.[lesson?.id]?.done;
  function visualFor(l){return l.v4Visual||window.CANON_V4_GUIDED_VISUALS?.byUnit?.[l.unit]||null;}
  function vocab(l){return Object.entries(l.vocab||{}).map(([k,v])=>`<details><summary>${esc(k)}</summary><p>${esc(v)}</p></details>`).join('');}
  function focusPrimary(){requestAnimationFrame(()=>host?.querySelector('[data-guided-focus]')?.focus());}
  function focusGameTitle(){requestAnimationFrame(()=>host?.querySelector('#v4-game-title')?.focus());}
  function restoreGameFocus(action,data={}){
    requestAnimationFrame(()=>{
      let target=null;
      if(['check','hint','choice'].includes(action))target=host?.querySelector('[data-game-feedback]');
      if(!target&&(action==='up'||action==='down')&&data.item!==undefined)target=host?.querySelector(`[data-game-action="${action}"][data-item="${data.item}"]`);
      if(!target&&action==='place'&&data.i!==undefined)target=host?.querySelector(`[data-game-action="unplace"][data-i="${data.i}"]`);
      if(!target&&action==='unplace'&&data.i!==undefined)target=host?.querySelector(`[data-game-action="place"][data-i="${data.i}"]`);
      if(!target&&action==='match')target=host?.querySelector(`[data-game-action="match"][data-left="${data.left}"][data-right="${data.right}"]`);
      if(!target&&action==='context')target=host?.querySelector(`[data-game-action="context"][data-field="${data.field}"][data-choice="${data.choice}"]`);
      if(!target&&['single','node'].includes(action)&&data.i!==undefined)target=host?.querySelector(`[data-game-action="${action}"][data-i="${data.i}"]`);
      if(!target)target=host?.querySelector('[data-game-action="next"],[data-game-action="check"],#v4-game-title');
      target?.focus();
    });
  }
  function backButton(){return options.onBack?'<button class="v4-btn v4-btn--secondary" data-guided="back">← Unit</button>':'';}
  function renderLesson(l,target,opts){
    host=typeof target==='string'?document.querySelector(target):target;lesson=l;session=null;index=0;reviewing=false;
    if(opts!==undefined)options=opts||{};
    if(!host||!l)return;
    const visual=visualFor(l),done=isDone();
    host.innerHTML=`<article class="v4-lesson">${backButton()}<header class="v4-lesson__head"><p class="v4-eyebrow">Guided lesson${done?' · complete':''} · ${esc(l.reading||'')}</p><h2 tabindex="-1" data-guided-focus>${esc(l.title)}</h2><p class="v4-objective">${esc(l.objective)}</p></header>${visual?V().render(visual):''}<div class="v4-prose">${(l.body||[]).map(p=>`<p>${esc(p)}</p>`).join('')}</div>${l.simple?`<aside class="v4-callout" data-tone="plain"><h3>In plain English</h3><p>${esc(l.simple)}</p></aside>`:''}${l.vocab?`<section><p class="v4-eyebrow">Words worth knowing</p><div class="v4-vocab">${vocab(l)}</div></section>`:''}${l.deeper?`<aside class="v4-callout" data-tone="boundary"><h3>Go deeper</h3><p>${esc(l.deeper)}</p></aside>`:''}${l.reflect?`<aside class="v4-callout" data-tone="plain"><h3>Think it through</h3><p>${esc(l.reflect)}</p>${l.model?`<details><summary>See one possible response</summary><p>${esc(l.model)}</p></details>`:''}</aside>`:''}<button class="v4-btn" data-guided="start">${done?'Review understanding':'Start understanding'} check</button></article>`;
    bind();focusPrimary();
  }
  function start(){
    reviewing=isDone();
    const challenges=A().lessonChallenges(lesson,reviewing);
    if(!challenges.length){renderDone();return;}
    index=0;session=G().init(challenges[0]);renderGame(challenges);focusGameTitle();
  }
  function renderGame(challenges=A().lessonChallenges(lesson,reviewing)){
    host.innerHTML=`<div class="v4-shell">${backButton()}<button class="v4-btn v4-btn--secondary" data-guided="lesson">← Revisit lesson</button><div style="height:14px"></div>${G().render(session,{eyebrow:lesson.title,current:index+1,total:challenges.length})}</div>`;
    bindGame(challenges);bind();
  }
  function bindGame(challenges){
    host.querySelectorAll('[data-game-action]').forEach(el=>el.addEventListener('click',()=>{
      const action=el.dataset.gameAction,data={...el.dataset};
      if(action==='next'&&session.state.correct){
        if(index+1<challenges.length){index++;session=G().init(challenges[index]);renderGame(challenges);focusGameTitle();}else renderDone();
        return;
      }
      G().act(session,action,data);renderGame(challenges);restoreGameFocus(action,data);
    }));
  }
  function renderDone(){
    if(reviewing)P()?.reviewLesson?.(lesson.id);else P()?.completeLesson?.(lesson.id);
    const reviewCount=P()?.state?.lessons?.[lesson.id]?.review||0;
    host.innerHTML=`<div class="v4-shell">${backButton()}<section class="v4-hero"><p class="v4-eyebrow">${reviewing?'Review':'Understanding check'} complete</p><h2 tabindex="-1" data-guided-focus>${esc(lesson.title)}</h2><p>${reviewing?'You revisited the lesson with a fresh check.':'You reconstructed the lesson’s ideas and used them in context.'} Completion records the task; it does not claim exhaustive mastery of the subject.${reviewCount?` Reviews completed: ${reviewCount}.`:''}</p><div class="v4-game__actions"><button class="v4-btn v4-btn--secondary" data-guided="lesson">Review the lesson</button>${options.onComplete?'<button class="v4-btn" data-guided="continue">Continue unit</button>':''}</div></section></div>`;
    bind();focusPrimary();
  }
  function bind(){
    host?.querySelectorAll('[data-guided]').forEach(el=>el.addEventListener('click',()=>{
      const action=el.dataset.guided;
      if(action==='start')start();
      if(action==='lesson')renderLesson(lesson,host);
      if(action==='back')options.onBack?.();
      if(action==='continue')options.onComplete?.();
    }));
  }
  return {renderLesson};
})();
