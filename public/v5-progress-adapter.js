/* Shared learner-facing progress adapter for the 25-unit / 139-activity course. */
(()=>{'use strict';if(window.__CANON_V5_PROGRESS_ADAPTER__)return;window.__CANON_V5_PROGRESS_ADAPTER__=true;
const $=(s,r=document)=>r.querySelector(s);const eventName='canon-progress-change';
function state(){try{return window.CanonV4Progress?.exportState?.()||JSON.parse(localStorage.getItem('canon.v4.progress.1')||'{}')}catch{return {}}}
function foundationState(){try{return window.Foundations?.exportState?.()||{}}catch{return {}}}
function doneFlag(v){return v===true||v?.done===true||v?.passed===true||v?.complete===true}
function derive(){const p=state(),f=foundationState(),lessons=p.lessons||{},mastery=p.mastery||{},allLessons=window.FOUNDATIONS_DATA?.lessons||[],missions=window.FOUNDATIONS_DATA?.skillMissions||[];const missionById=new Map(missions.map(m=>[m.id,m]));
  const lessonDone=id=>doneFlag(lessons[id])||doneFlag(f.lessons?.[id]);const masteryDone=id=>doneFlag(mastery[id]);
  const guidedDone=allLessons.length?allLessons.filter(l=>lessonDone(l.id)).length:Object.values(lessons).filter(doneFlag).length;
  const masteryDoneCount=missions.length?missions.filter(m=>masteryDone(m.id)).length:Object.values(mastery).filter(doneFlag).length;
  let next=null;
  for(const lesson of allLessons){if(!lessonDone(lesson.id)){next={type:'lesson',id:lesson.id,title:lesson.title,unit:lesson.unit};break}for(const id of lesson.skillMissions||[]){if(!masteryDone(id)){const m=missionById.get(id);next={type:'mastery',id,title:m?.title||id,unit:lesson.unit};break}}if(next)break}
  const total=139,done=Math.min(total,guidedDone+masteryDoneCount),pct=Math.round(done/total*100);return {guidedDone,masteryDone:masteryDoneCount,done,total,pct,next:next||{type:'complete',id:null,title:'Independent Mastery',unit:25}}}
function updateHome(){const s=derive(),home=$('#v5-home-panel,#v5-home');if(!home)return;const primary=home.querySelector('.v5-home__actions [data-v5-go="course"]');if(primary){const b=primary.querySelector('b'),span=primary.querySelector('span:last-child');if(b)b.textContent=s.next.title;if(span)span.textContent=`${s.done}/139 activities complete · ${s.pct}%`;primary.dataset.v5NextActivity=s.next.id||''}
  const progress=home.querySelector('.v5-dashboard__progress');if(progress){const h=progress.querySelector('h2'),ring=progress.querySelector('.v5-progress-ring');if(h)h.textContent=`${s.pct}% through the course`;if(ring){ring.style.setProperty('--p',s.pct);ring.setAttribute('aria-valuenow',String(s.pct));const strong=ring.querySelector('strong'),small=ring.querySelector('span');if(strong)strong.textContent=`${s.pct}%`;if(small)small.textContent=`${s.done}/139`}}
  const suggested=[...home.querySelectorAll('.v5-dashboard__card')].find(x=>/Suggested next activity/i.test(x.textContent||''));if(suggested){const h=suggested.querySelector('h3');if(h)h.textContent=s.next.title}}
}
function removeDeveloperLinks(){document.querySelectorAll('a[href$="docs/course-review.md"],a[href$="/docs/course-review.md"]').forEach(a=>a.closest('p')?.remove?.()||a.remove())}
function refresh(){updateHome();removeDeveloperLinks();document.dispatchEvent(new CustomEvent('canon-v5-progress-refreshed',{detail:derive()}))}
function wrapProgressWrites(){const P=window.CanonV4Progress;if(!P||P.__v5Wrapped)return;for(const name of ['completeLesson','completeMastery','reviewLesson','attemptMastery','importState']){const fn=P[name];if(typeof fn!=='function')continue;P[name]=function(...args){const out=fn.apply(P,args);queueMicrotask(()=>{document.dispatchEvent(new Event(eventName));refresh()});return out}}P.__v5Wrapped=true}
function boot(){wrapProgressWrites();refresh();document.addEventListener(eventName,refresh);window.addEventListener('storage',e=>{if(e.key==='canon.v4.progress.1'||e.key==='canon.foundations.v1')refresh()});new MutationObserver(()=>queueMicrotask(()=>{wrapProgressWrites();updateHome();removeDeveloperLinks()})).observe(document.body,{childList:true,subtree:true});window.CanonV5Progress={derive,refresh}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot()})();