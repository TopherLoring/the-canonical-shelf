/* Canonical Shelf v4 challenge boards.
   Dedicated layouts replace generic form controls while preserving keyboard operation. */
window.CanonV4Games=(()=>{
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clone=x=>JSON.parse(JSON.stringify(x));
  function shuffled(n){const a=Array.from({length:n},(_,i)=>i);for(let i=n-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function init(challenge){
    const c=clone(challenge),state={type:c.kind||c.type,attempt:0,hint:0,correct:false,feedback:'',selected:[],matches:{},links:[],stage:0};
    if(['sequence','sequence-path','timeline-sort','verse-rebuild'].includes(state.type)){
      state.order=shuffled((c.items||[]).length);
      if(state.order.length>1&&JSON.stringify(state.order)===JSON.stringify(c.answer))state.order.push(state.order.shift());
    }
    if(state.type==='match'||state.type==='match-board')state.leftOrder=shuffled((c.items||[]).length);
    return {challenge:c,state};
  }
  const hintList=c=>(Array.isArray(c.hints)?c.hints:[c.hint].filter(Boolean)).filter(Boolean);
  const hints=(c,n)=>{const h=hintList(c);return h.length?h[Math.min(n,h.length-1)]:'';};
  function progress(current,total){const pct=Math.max(0,Math.min(100,current/Math.max(total,1)*100));return `<div class="v4-progress" role="progressbar" aria-label="Challenge progress" aria-valuemin="1" aria-valuemax="${total}" aria-valuenow="${current}" aria-valuetext="Challenge ${current} of ${total}"><small>${current}/${total}</small><div class="v4-progress__track" aria-hidden="true"><div class="v4-progress__fill" style="width:${pct}%"></div></div><small>challenge</small></div>`;}
  function header(c,meta={}){return `<header class="v4-game__head"><div><p class="v4-eyebrow">${esc(meta.eyebrow||'Understanding check')}</p><h2 id="v4-game-title" tabindex="-1">${esc(c.title||'Try it')}</h2><p>${esc(c.prompt||'')}</p></div>${meta.current&&meta.total?progress(meta.current,meta.total):''}</header>`;}
  function sequenceBoard(c,s){return `<div class="v4-sort-list" aria-label="Items to arrange">${s.order.map((n,i)=>`<div class="v4-sort-card" data-item="${n}"><span>${esc(c.items[n])}</span><span></span><div class="v4-sort-controls"><button type="button" data-game-action="up" data-i="${i}" data-item="${n}" aria-label="Move ${esc(c.items[n])} earlier" ${i===0||s.correct?'disabled':''}>↑</button><button type="button" data-game-action="down" data-i="${i}" data-item="${n}" aria-label="Move ${esc(c.items[n])} later" ${i===s.order.length-1||s.correct?'disabled':''}>↓</button></div></div>`).join('')}</div>`;}
  function matchBoard(c,s){
    const options=c.options||[];
    return `<div class="v4-tile-grid">${s.leftOrder.map(i=>`<section class="v4-flow__node"><b>${esc(c.items[i])}</b><div class="v4-tile-grid" style="margin-top:10px">${options.map((o,j)=>`<button type="button" class="v4-tile" data-game-action="match" data-left="${i}" data-right="${j}" aria-label="Match ${esc(c.items[i])} with ${esc(o)}" aria-pressed="${String(s.matches[i])===String(j)}" ${s.correct?'disabled':''}>${esc(o)}</button>`).join('')}</div></section>`).join('')}</div>`;
  }
  function evidenceBoard(c,s){
    const lanes=c.lanes||['Supported','Possible','Overreach'];
    const laneOf=i=>s.matches[i]??'';
    return `<div class="v4-evidence-board">${lanes.map((lane,li)=>`<section class="v4-evidence-lane" aria-label="${esc(lane)}"><h4>${esc(lane)}</h4>${(c.items||[]).map((item,i)=>laneOf(i)===li?`<button class="v4-tile" type="button" data-game-action="unplace" data-i="${i}" aria-label="Remove ${esc(item)} from ${esc(lane)}" ${s.correct?'disabled':''}>${esc(item)}</button>`:'').join('')}</section>`).join('')}</div><h4 class="v4-eyebrow" style="margin-top:18px">Evidence to place</h4><div class="v4-tile-grid">${(c.items||[]).map((item,i)=>laneOf(i)===''?`<div class="v4-flow__node"><b>${esc(item)}</b><div class="v4-game__actions" style="margin-top:10px">${lanes.map((lane,li)=>`<button class="v4-btn v4-btn--secondary" type="button" data-game-action="place" data-i="${i}" data-lane="${li}" aria-label="Place ${esc(item)} in ${esc(lane)}" ${s.correct?'disabled':''}>${esc(lane)}</button>`).join('')}</div></div>`:'').join('')}</div>`;
  }
  function contextLens(c,s){
    const fields=c.fields||['Speaker','Recipient','Situation','Genre','Purpose'];
    return `<div class="v4-tile-grid">${fields.map((f,fi)=>`<section class="v4-flow__node"><b>${esc(f)}</b><div class="v4-tile-grid" style="margin-top:10px">${(c.options?.[fi]||[]).map((o,oi)=>`<button type="button" class="v4-tile" data-game-action="context" data-field="${fi}" data-choice="${oi}" aria-label="${esc(f)}: ${esc(o)}" aria-pressed="${String(s.matches[fi])===String(oi)}" ${s.correct?'disabled':''}>${esc(o)}</button>`).join('')}</div></section>`).join('')}</div>`;
  }
  function scenarioBoard(c,s){const st=c.stages[Math.min(s.stage,c.stages.length-1)];return `<div class="v4-callout" data-tone="plain"><h3>Decision ${Math.min(s.stage+1,c.stages.length)} of ${c.stages.length}</h3><p>${esc(st.prompt)}</p></div><div class="v4-tile-grid">${st.choices.map((x,i)=>`<button type="button" class="v4-tile" data-game-action="choice" data-i="${i}" ${s.correct?'disabled':''}>${esc(x)}</button>`).join('')}</div>`;}
  function argumentBoard(c,s){
    return `<div class="v4-tile-grid">${c.items.map((x,i)=>`<button type="button" class="v4-tile" data-game-action="node" data-i="${i}" aria-pressed="${s.selected.includes(i)}" ${s.correct?'disabled':''}>${esc(x)}</button>`).join('')}</div><div class="v4-callout" data-tone="plain"><h3>Your connections</h3>${s.links.length?`<ul>${s.links.map(([a,b],i)=>`<li>${esc(c.items[a])} → ${esc(c.items[b])} <button type="button" data-game-action="unlink" data-i="${i}" ${s.correct?'disabled':''}>Remove</button></li>`).join('')}</ul>`:'<p>Select one source node and one supported node, then connect them.</p>'}</div>`;
  }
  function compareBoard(c,s){
    const lanes=c.lanes||['A','Both','B'];
    return `<div class="v4-evidence-board">${lanes.map((lane,li)=>`<section class="v4-evidence-lane" aria-label="${esc(lane)}"><h4>${esc(lane)}</h4>${c.items.map((item,i)=>s.matches[i]===li?`<button class="v4-tile" type="button" data-game-action="unplace" data-i="${i}" aria-label="Remove ${esc(item)} from ${esc(lane)}" ${s.correct?'disabled':''}>${esc(item)}</button>`:'').join('')}</section>`).join('')}</div><div class="v4-tile-grid" style="margin-top:14px">${c.items.map((item,i)=>s.matches[i]===undefined?`<div class="v4-flow__node"><b>${esc(item)}</b><div class="v4-game__actions" style="margin-top:10px">${lanes.map((lane,li)=>`<button class="v4-btn v4-btn--secondary" data-game-action="place" data-i="${i}" data-lane="${li}" aria-label="Place ${esc(item)} in ${esc(lane)}" ${s.correct?'disabled':''}>${esc(lane)}</button>`).join('')}</div></div>`:'').join('')}</div>`;
  }
  function bookDetective(c,s){return `<div class="v4-callout" data-tone="plain"><h3>Clues</h3>${(c.clues||[]).map(x=>`<p>${esc(x)}</p>`).join('')}</div><div class="v4-tile-grid">${(c.options||[]).map((o,i)=>`<button type="button" class="v4-tile" data-game-action="single" data-i="${i}" aria-pressed="${s.selected[0]===i}" ${s.correct?'disabled':''}>${esc(o)}</button>`).join('')}</div>`;}
  function board(c,s){
    const type=c.kind||c.type;
    if(['sequence','sequence-path','timeline-sort','verse-rebuild'].includes(type))return sequenceBoard(c,s);
    if(['match','match-board'].includes(type))return matchBoard(c,s);
    if(['evidence','evidence-lab'].includes(type))return evidenceBoard(c,s);
    if(type==='context-lens')return contextLens(c,s);
    if(type==='argument'||type==='argument-map')return argumentBoard(c,s);
    if(type==='compare-board'||type==='theme-trace')return compareBoard(c,s);
    if(type==='scenario')return scenarioBoard(c,s);
    if(type==='book-detective'||type==='capstone')return bookDetective(c,s);
    return `<div class="v4-callout" data-tone="boundary"><p>This challenge type is not yet available in the v4 renderer.</p></div>`;
  }
  function evaluate(c,s){
    const type=c.kind||c.type;
    if(['sequence','sequence-path','timeline-sort','verse-rebuild'].includes(type))return JSON.stringify(s.order)===JSON.stringify(c.answer);
    if(['match','match-board','context-lens','compare-board','theme-trace'].includes(type))return (c.answer||[]).every((a,i)=>Number(s.matches[i])===Number(a));
    if(['evidence','evidence-lab'].includes(type)){
      if(Array.isArray(c.answer)&&Array.isArray(c.answer[0]))return c.answer.every(([i,lane])=>Number(s.matches[i])===Number(lane));
      return (c.answer||[]).every(i=>Number(s.matches[i])===0)&&Object.keys(s.matches).length===c.items.length;
    }
    if(type==='argument'||type==='argument-map')return s.links.length===c.answer.length&&c.answer.every(([a,b])=>s.links.some(([x,y])=>x===a&&y===b));
    if(type==='book-detective'||type==='capstone')return Number(s.selected[0])===Number(c.answer);
    if(type==='scenario')return s.correct;
    return false;
  }
  function render(session,meta={}){
    const {challenge:c,state:s}=session;
    const feedback=s.feedback?`<div class="v4-feedback" data-state="${s.correct?'correct':s.attempt?'wrong':''}" role="status" aria-live="polite" tabindex="-1" data-game-feedback>${esc(s.feedback)}</div>`:'';
    const hintText=s.hint?hints(c,s.hint-1):'';
    const hint=hintText?`<div class="v4-feedback" role="status" aria-live="polite" tabindex="-1" data-game-feedback><strong>Hint ${s.hint}:</strong> ${esc(hintText)}</div>`:'';
    const noCheck=(c.kind||c.type)==='scenario',canHint=hintList(c).length>0&&!s.correct;
    return `<section class="v4-game" aria-labelledby="v4-game-title">${header(c,meta)}<div class="v4-game__board">${board(c,s)}${feedback}${hint}</div><footer class="v4-game__footer"><span class="v4-eyebrow">Untimed · retries are free</span><div class="v4-game__actions">${!noCheck&&!s.correct?'<button class="v4-btn" data-game-action="check">Check my work</button>':''}${canHint?`<button class="v4-btn v4-btn--secondary" data-game-action="hint">${s.hint?'Another hint':'Hint'}</button>`:''}${s.correct?'<button class="v4-btn" data-game-action="next">Continue</button>':''}</div></footer></section>`;
  }
  function act(session,action,data={}){
    const {challenge:c,state:s}=session;
    if(s.correct)return session;
    if(action==='up'||action==='down'){const i=+data.i,j=i+(action==='up'?-1:1);if(j>=0&&j<s.order.length)[s.order[i],s.order[j]]=[s.order[j],s.order[i]];}
    if(action==='match')s.matches[+data.left]=+data.right;
    if(action==='context')s.matches[+data.field]=+data.choice;
    if(action==='place')s.matches[+data.i]=+data.lane;
    if(action==='unplace')delete s.matches[+data.i];
    if(action==='single')s.selected=[+data.i];
    if(action==='node'){
      const n=+data.i;if(s.selected.includes(n))s.selected=s.selected.filter(x=>x!==n);else{s.selected=[...s.selected,n].slice(-2);if(s.selected.length===2){const [a,b]=s.selected;if(a!==b&&!s.links.some(([x,y])=>x===a&&y===b))s.links.push([a,b]);s.selected=[];}}
    }
    if(action==='unlink')s.links.splice(+data.i,1);
    if(action==='hint')s.hint=Math.min(s.hint+1,hintList(c).length);
    if(action==='check'){s.attempt++;s.correct=evaluate(c,s);s.feedback=s.correct?(c.why||'You built a supported answer.'):'Not yet. Compare your construction with the evidence and revise it; nothing is lost by trying again.';}
    if(action==='choice'){
      const st=c.stages[s.stage],i=+data.i;s.feedback=st.feedback?.[i]||'';
      if(i===st.correct){s.stage++;if(s.stage>=c.stages.length){s.correct=true;s.feedback+=(s.feedback?' ':'')+(c.why||'You completed the scenario.');}}
    }
    return session;
  }
  return {init,render,act,evaluate};
})();
