/* Unified Canonical Shelf v4 course: guided lessons + mastery modules in one learner path. */
window.CanonV4Integrated=(()=>{
  'use strict';
  const C=window.CANON_V4_COURSE,Gd=window.CANON_V4_GUIDED,M=window.CANON_V4_MASTERY,V=window.CanonV4Visuals,Games=window.CanonV4Games,P=window.CanonV4Progress;
  if(!C||!Gd||!M)throw Error('v4 integrated course data missing');
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let host=null,current=null,session=null;
  const doneLesson=id=>!!P?.state?.lessons?.[id]?.done,doneMastery=id=>!!P?.state?.mastery?.[id]?.done;
  const focusRoute=()=>requestAnimationFrame(()=>host?.querySelector('[data-v4-route-focus]')?.focus());
  function unitStats(id){const lessons=Gd.byUnit[id]||[],mastery=C.masteryPlacement[id]||[];return {lessons,mastery,done:lessons.filter(l=>doneLesson(l.id)).length+mastery.filter(doneMastery).length,total:lessons.length+mastery.length};}
  function overall(){let done=0,total=0;for(const u of C.units){const s=unitStats(u.id);done+=s.done;total+=s.total;}return {done,total};}
  function progress(done,total,label='activities'){
    const pct=total?Math.round(done/total*100):0;
    return `<div class="v4-progress" role="progressbar" aria-label="${esc(label)} progress" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}" aria-valuetext="${done} of ${total} complete"><small>${done}/${total}</small><div class="v4-progress__track" aria-hidden="true"><div class="v4-progress__fill" style="width:${pct}%"></div></div><small>${esc(label)}</small></div>`;
  }
  function map(){current={type:'map'};const all=overall();host.innerHTML=`<div class="v4-shell"><section class="v4-hero"><p class="v4-eyebrow">Canonical Shelf v4 · unified curriculum</p><h2 tabindex="-1" data-v4-route-focus>Learn the library, story, history, and theology as one connected course.</h2><p>${C.units.length} units · ${Gd.lessons.length} guided lessons · ${Object.keys(M).length} integrated mastery activities · ${all.total} activities total. Visual explanations and purpose-built understanding checks live in the same learning path.</p>${progress(all.done,all.total,'course')}</section><div class="v4-unit-grid">${C.units.map(u=>{const s=unitStats(u.id);return `<article class="v4-unit-card" data-done="${s.done===s.total?1:0}"><span class="v4-unit-card__num">${String(u.id).padStart(2,'0')}</span><h3>${esc(u.title)}</h3><p>${esc(u.scope)}</p>${progress(s.done,s.total,'unit')}<div class="v4-unit-card__meta"><span>${s.total} connected activities</span><button class="v4-btn v4-btn--secondary" data-v4i="unit" data-id="${u.id}">Open</button></div></article>`}).join('')}</div></div>`;bind();focusRoute();}
  function unitPath(s){
    const out=[];let mi=0;
    s.lessons.forEach((lesson,i)=>{
      out.push({kind:'lesson',item:lesson});
      const shouldHave=Math.round(((i+1)/Math.max(1,s.lessons.length))*s.mastery.length);
      while(mi<shouldHave&&mi<s.mastery.length)out.push({kind:'mastery',item:s.mastery[mi++]});
    });
    while(mi<s.mastery.length)out.push({kind:'mastery',item:s.mastery[mi++]});
    return out;
  }
  function pathCard(entry,index){
    if(entry.kind==='lesson'){
      const l=entry.item,done=doneLesson(l.id),reviews=P?.state?.lessons?.[l.id]?.review||0;
      return `<article class="v4-unit-card v4-path-card" data-kind="guided" data-done="${done?1:0}"><div class="v4-path-card__top"><span class="v4-path-card__step">${String(index+1).padStart(2,'0')}</span><span class="v4-path-card__kind">Guided lesson${done?' · complete':''}${reviews?` · ${reviews} review${reviews===1?'':'s'}`:''}</span></div><h3>${esc(l.title)}</h3><p>${esc(l.objective)}</p><div class="v4-unit-card__meta"><span>${esc(l.reading||'guided learning')}</span><button class="v4-btn v4-btn--secondary" data-v4i="lesson" data-id="${esc(l.id)}">${done?'Review':'Open'}</button></div></article>`;
    }
    const id=entry.item,m=M[id],done=doneMastery(id),attempts=P?.state?.mastery?.[id]?.attempts||0;
    return `<article class="v4-unit-card v4-path-card" data-kind="mastery" data-done="${done?1:0}"><div class="v4-path-card__top"><span class="v4-path-card__step">${String(index+1).padStart(2,'0')}</span><span class="v4-path-card__kind">Applied mastery${done?' · complete':''}${attempts?` · ${attempts} attempt${attempts===1?'':'s'}`:''}</span></div><h3>${esc(m.title)}</h3><p>${esc(m.dek)}</p><div class="v4-unit-card__meta"><span>learn → visualize → check</span><button class="v4-btn v4-btn--secondary" data-v4i="mastery" data-id="${esc(id)}">${done?'Review':'Open'}</button></div></article>`;
  }
  function unit(id){id=Number(id);current={type:'unit',id};const u=C.units.find(x=>x.id===id),s=unitStats(id);if(!u)return map();const path=unitPath(s);host.innerHTML=`<div class="v4-shell"><button class="v4-btn v4-btn--secondary" data-v4i="map">← Course map</button><section class="v4-hero" style="margin-top:16px"><p class="v4-eyebrow">Unit ${u.id} of ${C.units.length}</p><h2 tabindex="-1" data-v4-route-focus>${esc(u.title)}</h2><p>${esc(u.scope)}</p>${progress(s.done,s.total,'unit')}</section>${unitVisual(u)}<section class="v4-unit-path" aria-label="Unit learning path"><div class="v4-path-heading"><p class="v4-eyebrow">Unit path</p><h3>Learn it, connect it, then prove you can use it.</h3><p>Guided teaching and mastery work are intentionally interleaved. Mastery is not a separate legacy course.</p></div><div class="v4-unit-grid">${path.map(pathCard).join('')}</div></section></div>`;bind();focusRoute();}
  function unitVisual(u){const v={...uVisual(u),title:`Unit map · ${u.title}`};return V?.render(v)||'';}
  function uVisual(u){const type=u.visual;
    if(type==='timeline')return {type,points:[{title:'Before',date:'context'},{title:u.title,date:'focus'},{title:'After',date:'connection'}]};
    if(type==='story-arc')return {type,beats:[{title:'What comes before'},{title:u.title},{title:'What this unlocks next'}]};
    if(type==='shelf')return {type,books:(Gd.byUnit[u.id]||[]).map((l,i)=>({title:l.title,group:i%9,height:55+(i%4)*10})),caption:'Each spine represents a lesson destination in this unit.'};
    if(type==='compare')return {type,columns:[{title:'Read locally',items:['Genre','Audience','Argument']},{title:'Connect broadly',items:['Story','Theme','Theology']}],shared:['Evidence controls the connection']};
    if(type==='relationship')return {type,nodes:[{title:'Text',role:'What is said?'},{title:'Community',role:'Who receives it?'},{title:'Theology',role:'What claim is being made?'}]};
    if(type==='map-lite')return {type,places:[{title:'Jerusalem',x:390,y:190},{title:'Antioch',x:445,y:110},{title:'Ephesus',x:310,y:125},{title:'Corinth',x:240,y:140},{title:'Rome',x:145,y:80}],caption:'Schematic orientation.'};
    if(type==='theme-thread')return {type,stops:[{book:'Earlier text',title:'Introduced'},{book:'Later text',title:'Developed'},{book:'New setting',title:'Reframed'}]};
    if(type==='book-profile')return {type,shelf:'Locate',setting:'Place',synopsis:'Trace',people:'Identify voices',audience:'First hearers',purpose:'Explain'};
    if(type==='spectrum')return {type,positions:[{title:'Position A',text:'Represent it in terms adherents recognize.'},{title:'Position B',text:'Name the real difference without caricature.'}],boundary:'A visual comparison does not imply equal prevalence or equal evidence.'};
    if(type==='stack')return {type,layers:[{title:'Text',text:'Words'},{title:'Genre',text:'Form'},{title:'Context',text:'Situation'},{title:'Interpretation',text:'Meaning'},{title:'Application',text:'Transfer'}]};
    return {type:'flow',nodes:[{title:'Observe'},{title:'Understand'},{title:'Practice'},{title:'Connect'}]};
  }
  function lesson(id){
    const l=Gd.lessons.find(x=>x.id===id);if(!l)return map();
    current={type:'lesson',id,unit:l.v4Unit};
    window.CanonV4Guided.renderLesson(l,host,{onBack:()=>unit(l.v4Unit),onComplete:()=>unit(l.v4Unit)});
  }
  function mastery(id){const m=M[id];if(!m)return map();const u=findUnit(id);current={type:'mastery',id,unit:u};host.innerHTML=`<article class="v4-lesson"><button class="v4-btn v4-btn--secondary" data-v4i="unit" data-id="${u}">← Unit</button><header class="v4-lesson__head"><p class="v4-eyebrow">Applied mastery${doneMastery(id)?' · complete':''}</p><h2 tabindex="-1" data-v4-route-focus>${esc(m.title)}</h2><p class="v4-objective">${esc(m.dek)}</p></header>${V.render(m.visual)}<div class="v4-prose">${m.body.map(p=>`<p>${esc(p)}</p>`).join('')}</div><aside class="v4-callout" data-tone="plain"><h3>In plain English</h3><p>${esc(m.plain)}</p></aside><button class="v4-btn" data-v4i="mastery-game" data-id="${esc(id)}">${doneMastery(id)?'Review':'Try'} the understanding check</button></article>`;bind();focusRoute();}
  function findUnit(id){return Number(Object.entries(C.masteryPlacement).find(([,ids])=>ids.includes(id))?.[0]||1);}
  function masteryGame(id){const m=M[id];session=Games.init(m.challenge);current={type:'mastery-game',id,unit:findUnit(id)};renderMasteryGame();}
  function renderMasteryGame(){const id=current.id,m=M[id];host.innerHTML=`<div class="v4-shell"><button class="v4-btn v4-btn--secondary" data-v4i="mastery" data-id="${esc(id)}">← Lesson</button><div style="height:14px"></div>${Games.render(session,{eyebrow:m.title,current:1,total:1})}</div>`;host.querySelectorAll('[data-game-action]').forEach(el=>el.addEventListener('click',()=>{const a=el.dataset.gameAction;if(a==='next'&&session.state.correct){P?.completeMastery(id);mastery(id);return;}if(a==='check')P?.attemptMastery(id);Games.act(session,a,el.dataset);renderMasteryGame();}));bind();}
  function bind(){host?.querySelectorAll('[data-v4i]').forEach(el=>el.addEventListener('click',()=>{const a=el.dataset.v4i;if(a==='map')map();if(a==='unit')unit(el.dataset.id);if(a==='lesson')lesson(el.dataset.id);if(a==='mastery')mastery(el.dataset.id);if(a==='mastery-game')masteryGame(el.dataset.id);}));}
  function mount(target){host=typeof target==='string'?document.querySelector(target):target;if(!host)throw Error('v4 integrated mount target missing');map();}
  return {mount,map,unit,lesson,mastery,overall};
})();
