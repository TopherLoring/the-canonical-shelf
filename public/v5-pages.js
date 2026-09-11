/* Canonical Shelf v5 page experiences.
   Owns page-level information architecture while reusing the stable curriculum, reader, topics and practice engines. */
(()=>{'use strict';if(window.__CANON_V5_PAGES__)return;window.__CANON_V5_PAGES__=true;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));
const route=r=>window.CanonV5Shell?.go?.(r);
const text=(el)=>el?.textContent?.replace(/\s+/g,' ').trim()||'';
const byText=(root,selector,label)=>$$(selector,root).find(el=>text(el)===label||text(el).includes(label));
const progressState=()=>{try{return JSON.parse(localStorage.getItem('canon.v4.progress.1')||'{}')}catch{return {}}};

function courseStats(){
  const state=progressState(),guided=state.guidedLessons||state.lessons||{},mastery=state.mastery||{};
  const guidedDone=Object.values(guided).filter(v=>v===true||v?.passed||v?.complete).length;
  const masteryDone=Object.values(mastery).filter(v=>v===true||v?.passed||v?.complete).length;
  return {guidedDone,masteryDone,total:139,done:Math.min(139,guidedDone+masteryDone),pct:Math.round(Math.min(139,guidedDone+masteryDone)/139*100)};
}
function unitCards(){
  const C=window.CANON_V4_COURSE;if(!C?.units)return '';
  return C.units.map(u=>{const n=C.masteryPlacement?.[u.id]?.length||0;return `<button type="button" class="v5-unit-card" data-v5-unit="${u.id}"><span>${String(u.id).padStart(2,'0')}</span><strong>${esc(u.title)}</strong><small>${esc(u.scope)}</small><em>${n} mastery activit${n===1?'y':'ies'}</em></button>`}).join('');
}
function enhanceCourse(){
  const panel=$('#panel-learn');if(!panel||panel.querySelector('[data-v5-course-overview]'))return;
  const C=window.CANON_V4_COURSE;if(!C?.units)return;
  const stats=courseStats(),wrap=document.createElement('section');wrap.className='v5-course-overview';wrap.dataset.v5CourseOverview='1';
  wrap.innerHTML=`<div class="v5-course-overview__lead"><div><p class="v5-kicker">Your path</p><h2>Twenty-five units. One connected journey.</h2><p>The course moves from orientation and biblical structure into the biblical story, Jesus and the early church, Christian doctrine and practice, difficult questions, and independent mastery.</p></div><div class="v5-course-stat"><strong>${stats.pct}%</strong><span>${stats.done}/139 activities recorded</span></div></div><div class="v5-unit-grid">${unitCards()}</div>`;
  const intro=panel.querySelector('[data-v5-intro="course"]');(intro||panel.firstChild).after(wrap);
  wrap.addEventListener('click',e=>{const b=e.target.closest('[data-v5-unit]');if(!b)return;const id=Number(b.dataset.v5Unit),title=C.units.find(u=>u.id===id)?.title;const target=$(`[data-unit="${id}"], [data-v4-unit="${id}"], [data-course-unit="${id}"]`,panel)||byText(panel,'button,[role="button"],h2,h3',title);if(target){target.click?.();target.scrollIntoView?.({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}else{const fd=panel.querySelector('.fd');fd?.scrollIntoView?.({block:'start'});}});
}

function bibleTools(){return `<section class="v5-bible-tools" data-v5-bible-tools><button type="button" data-bible-jump="shelf"><span>01</span><b>Bookshelf</b><small>See all 66 books as one library.</small></button><button type="button" data-bible-jump="books"><span>02</span><b>Books & groups</b><small>Browse the canon by book and literary family.</small></button><button type="button" data-bible-jump="reader"><span>03</span><b>Bible reader</b><small>Open a book and move chapter by chapter.</small></button><button type="button" data-bible-jump="timeline"><span>04</span><b>Canon & timeline</b><small>Compare shelf order with the story’s chronology.</small></button></section>`}
function findBibleTarget(kind,panel){
  if(kind==='shelf')return panel.querySelector('[data-v5-shelf],.spine-block');
  const names={books:['Books','Browse books','The books','Old Testament'],reader:['Reader','Bible reader','Read the Bible','Chapter'],timeline:['Timeline','Chronology','Canon']}[kind]||[];
  for(const n of names){const h=byText(panel,'h2,h3,h4,button,[role="button"]',n);if(h)return h.closest('section,article,.card')||h}
  if(kind==='books')return panel.querySelector('.card');
  return null;
}
function enhanceBible(){
  const panel=$('#panel-explore');if(!panel)return;
  if(!panel.querySelector('[data-v5-bible-tools]')){const intro=panel.querySelector('[data-v5-intro="bible"]');(intro||panel.firstChild).insertAdjacentHTML('afterend',bibleTools());}
  const tools=panel.querySelector('[data-v5-bible-tools]');if(tools&&!tools.dataset.bound){tools.dataset.bound='1';tools.addEventListener('click',e=>{const b=e.target.closest('[data-bible-jump]');if(!b)return;const target=findBibleTarget(b.dataset.bibleJump,panel);if(target){target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});target.focus?.({preventScroll:true});}})}
  $$('.spine-block').forEach(s=>{if(!panel.contains(s))panel.querySelector('[data-v5-intro="bible"]')?.after(s)});
  const shelf=panel.querySelector('.spine-block');if(shelf){shelf.classList.add('v5-bible-only-shelf');shelf.dataset.v5Shelf='1'}
  const oldHeading=byText(panel,'h2,h3','Explore');if(oldHeading&&!oldHeading.closest('[data-v5-intro]'))oldHeading.classList.add('v5-legacy-heading');
}

function topicGroups(){
  const K=window.CANON_TOPICS,articles=K?.articles||[];
  const group=(label,test)=>({label,count:articles.filter(test).length,ids:articles.filter(test).slice(0,12).map(a=>a.id)});
  return [
    group('Ask / search',()=>true),
    group('Theology & doctrine',a=>/doctrine|theolog|trinity|salvation|atonement|spirit|church/i.test(`${a.kind} ${a.title} ${(a.tags||[]).join(' ')}`)),
    group('Christian life',a=>/life|practice|prayer|anxiety|ethic|forgive|relationship/i.test(`${a.kind} ${a.title} ${(a.tags||[]).join(' ')}`)),
    group('Biblical concepts',a=>/scripture|bible|canon|covenant|kingdom|gospel|prophe|wisdom/i.test(`${a.kind} ${a.title} ${(a.tags||[]).join(' ')}`)),
    group('Difficult questions',a=>/difficult|suffer|evil|lgbtq|judg|hell|violence|miracle|science/i.test(`${a.kind} ${a.title} ${(a.tags||[]).join(' ')}`)),
    {label:'Glossary',count:Object.keys(K?.glossary||{}).length,ids:[]},
    group('Related exploration',a=>Array.isArray(a.related)&&a.related.length>1)
  ];
}
function submitTopicQuery(q){const input=$('#ct-search'),form=$('#ct-search-form');if(!input||!form)return false;input.value=q;form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));return true}
function enhanceTopics(){
  const panel=$('#panel-topics');if(!panel||panel.querySelector('[data-v5-topic-map]'))return;
  const groups=topicGroups(),nav=document.createElement('section');nav.className='v5-topic-map';nav.dataset.v5TopicMap='1';
  nav.innerHTML=groups.map((g,i)=>`<button type="button" data-v5-topic-group="${i}"><strong>${esc(g.label)}</strong><span>${g.count||''}${g.count?' guides':''}</span></button>`).join('');
  const intro=panel.querySelector('[data-v5-intro="topics"]');(intro||panel.firstChild).after(nav);
  nav.addEventListener('click',e=>{const b=e.target.closest('[data-v5-topic-group]');if(!b)return;const g=groups[Number(b.dataset.v5TopicGroup)];if(!g)return;if(g.label==='Glossary'){const glossary=panel.querySelector('[data-view="glossary"]');glossary?.click();return}if(g.label==='Ask / search'){panel.querySelector('#ct-search')?.focus();return}const q=g.label==='Related exploration'?'related topics':g.label;submitTopicQuery(q);});
}

const practiceActions={
  review:['Practice missions','Recommended review'],
  order:['Book drills','Book order'],
  context:['Context','Interpretation'],
  themes:['Themes','Theme'],
  verses:['Verses','Verse'],
  games:['Book drills','Games','Mastery']
};
function practiceLegacyButton(labels,panel){for(const l of labels){const b=byText(panel,'button,a,[role="button"]',l);if(b)return b}return null}
function enhancePractice(){
  const panel=$('#panel-play');if(!panel)return;let map=panel.querySelector('.v5-practice-map');if(!map)return;
  const articles=$$('article',map);const keys=['review','order','context','themes','verses','games'];articles.forEach((a,i)=>{const key=keys[i];if(!key||a.querySelector('button'))return;const b=document.createElement('button');b.type='button';b.className='v5-practice-open';b.dataset.practiceOpen=key;b.textContent='Open practice →';a.appendChild(b)});
  if(!map.dataset.bound){map.dataset.bound='1';map.addEventListener('click',e=>{const b=e.target.closest('[data-practice-open]');if(!b)return;const key=b.dataset.practiceOpen;if(key==='verses'){const tab=$('#tab-verses');if(tab){tab.click();queueMicrotask(()=>{const v=$('#panel-verses');if(v){v.hidden=false;v.dataset.open='1';panel.hidden=true}const back=document.createElement('button');if(v&&!v.querySelector('[data-v5-practice-back]')){back.type='button';back.dataset.v5PracticeBack='1';back.className='v5-inline-back';back.textContent='← Back to Practice';back.addEventListener('click',()=>route('practice'));v.prepend(back)}});return}const legacy=practiceLegacyButton(practiceActions[key]||[],panel);if(legacy){legacy.click();queueMicrotask(()=>{panel.hidden=false;panel.dataset.open='1';const fd=panel.querySelector('.fd');if(fd&&!fd.querySelector('[data-v5-practice-back]')){const back=document.createElement('button');back.type='button';back.dataset.v5PracticeBack='1';back.className='v5-inline-back';back.textContent='← Practice overview';back.addEventListener('click',()=>route('practice'));fd.prepend(back)}})}else{panel.querySelector('.fd')?.scrollIntoView({block:'start'});}})}
}

function enhanceGlobalSearch(){
  const input=$('.v5-tools .search');if(!input||input.dataset.v5Search==='1')return;input.dataset.v5Search='1';input.placeholder='Search Scripture or site…';input.setAttribute('aria-label','Search Scripture or Canonical Shelf');
  input.addEventListener('keydown',e=>{if(e.key!=='Enter')return;const q=input.value.trim();if(!q)return;const scripture=/^(?:[1-3]\s*)?[A-Za-z]+(?:\s+[A-Za-z]+)*\s+\d+(?::\d+(?:[-–]\d+)?)?$/i.test(q);if(scripture)return;e.preventDefault();route('topics');setTimeout(()=>{if(!submitTopicQuery(q)){const t=$('#ct-search');if(t){t.value=q;t.focus()}}},0)},true);
}
function enhanceProfile(){
  const trigger=$('[data-v5-profile]');if(!trigger||trigger.dataset.profileBound==='1')return;trigger.dataset.profileBound='1';
  let dialog=$('#v5-progress-dialog');if(!dialog){dialog=document.createElement('dialog');dialog.id='v5-progress-dialog';dialog.className='v5-progress-dialog';document.body.appendChild(dialog)}
  const render=()=>{const s=courseStats(),raw=progressState(),recent=(raw.recentTopics||raw.recent||[]).slice?.(0,5)||[];dialog.innerHTML=`<form method="dialog" class="v5-dialog-head"><div><p class="v5-kicker">Profile & progress</p><h2>Your Canonical Shelf</h2></div><button value="close" aria-label="Close">×</button></form><div class="v5-dialog-progress"><strong>${s.pct}%</strong><div><b>${s.done} of 139 activities recorded</b><span>${s.guidedDone} guided · ${s.masteryDone} mastery</span></div></div><section><h3>Recent activity</h3>${recent.length?`<ul>${recent.map(x=>`<li>${esc(x.title||x.id||x)}</li>`).join('')}</ul>`:'<p>No recent activity recorded yet.</p>'}</section><section><h3>Privacy</h3><p>Your progress is stored locally in this browser unless you deliberately export it.</p></section>`};
  trigger.addEventListener('click',()=>{render();dialog.showModal?.()});
}
function recentHome(){
  const home=$('#v5-home-panel');if(!home)return;const p=progressState(),recent=[...(p.recentTopics||[]),...(p.recent||[])].slice(0,4);const host=home.querySelector('.v5-recent');if(!host||!recent.length||host.querySelector('.v5-recent-list'))return;host.insertAdjacentHTML('beforeend',`<div class="v5-recent-list">${recent.map(x=>`<span>${esc(x.title||x.id||x)}</span>`).join('')}</div>`)}
function retireLegacyChrome(){
  $$('.masthead').forEach(x=>x.classList.add('v5-retired-masthead'));
  $$('.tabbar').forEach(x=>x.classList.add('v5-retired-tabbar'));
  const labels=new Set(['Learning map','Practice missions','Theology guide','Book drills']);$$('button,a').forEach(el=>{if(labels.has(text(el))){el.classList.add('v5-retired-control');el.setAttribute('aria-hidden','true');el.tabIndex=-1}})
}
function auditShelf(){const shelf=$('.spine-block');const bible=$('#panel-explore');if(shelf&&bible&&!bible.contains(shelf))bible.querySelector('[data-v5-intro="bible"]')?.after(shelf)}
function boot(){retireLegacyChrome();enhanceGlobalSearch();enhanceCourse();enhanceBible();enhanceTopics();enhancePractice();enhanceProfile();recentHome();auditShelf();
  const observer=new MutationObserver(()=>{queueMicrotask(()=>{retireLegacyChrome();enhanceCourse();enhanceBible();enhanceTopics();enhancePractice();auditShelf()})});
  for(const id of ['panel-learn','panel-explore','panel-topics','panel-play']){const p=document.getElementById(id);if(p)observer.observe(p,{childList:true,subtree:true})}
  window.CanonV5Pages={enhanceCourse,enhanceBible,enhanceTopics,enhancePractice,auditShelf};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();})();