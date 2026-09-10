/* Guided learning and accessible, untimed understanding challenges. */
window.Foundations = (() => {
  'use strict';
  const D = window.FOUNDATIONS_DATA, KEY = 'canon.foundations.v1', DAY = 86400000;
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function sanitize(input) {
    const clean = {version:1, lessons:{}};
    for (const l of D.lessons) {
      const x = input?.lessons?.[l.id] || {};
      const num = n => Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
      clean.lessons[l.id] = {passed:x.passed === true, reviews:Math.min(100,num(x.reviews)), due:num(x.due), note:typeof x.note === 'string' ? x.note.slice(0,5000) : ''};
    }
    return clean;
  }
  let state; try { state=sanitize(JSON.parse(localStorage.getItem(KEY))); } catch { state=sanitize(null); }
  let storageWarning='', view={type:'home'}, hostId='panel-learn', run=null, unitFilter=0;
  function persist(sync=true) {
    try {localStorage.setItem(KEY,JSON.stringify(state));storageWarning='';}
    catch {storageWarning='Progress could not be saved on this device. Export a backup before leaving.';}
    if(sync && typeof saveLocal==='function') {try {saveLocal();} catch { /* main app may still be booting */ }}
  }
  const exportState=()=>JSON.parse(JSON.stringify(state));
  function importState(value) {state=sanitize(value);persist(false);run=null;view={type:'home'};}
  function award(progress, now, eligible) {
    const out={...progress};
    if(!out.passed) {out.passed=true;out.reviews=0;out.due=now+DAY;return out;}
    if(eligible && now>=out.due) {out.reviews++;out.due=now+[3,7,14][Math.min(out.reviews-1,2)]*DAY;}
    return out;
  }
  const host=()=>document.getElementById(hostId);
  const button=(action,label,extra='')=>`<button type="button" data-fd="${action}" ${extra}>${label}</button>`;
  function shell(body) {
    host().innerHTML=`<div class="fd"><nav class="fd-nav" aria-label="Foundations">${button('home','Learning map')}${button('practice','Practice missions')}${button('guide','Theology guide')}${button('legacy','Book drills')}</nav>${storageWarning?`<p role="alert">${esc(storageWarning)}</p>`:''}${body}</div>`;
    host().querySelectorAll('[data-fd]').forEach(el=>el.addEventListener('click',()=>act(el.dataset.fd,el.dataset)));
  }
  function status(l) {const p=state.lessons[l.id];return !p.passed?'Ready to explore':p.due<=Date.now()?'Return mission due':`${p.reviews?'Review '+p.reviews+' complete':'Milestone earned'} · Next review ${new Date(p.due).toLocaleDateString()}`;}
  function cards(practice,lessons=D.lessons) {return lessons.map((l,i)=>`<article class="fd-card"><p class="fd-kicker">Mission ${i+1} · ${esc(status(l))}</p><h3>${esc(l.title)}</h3><p>${esc(l.objective)}</p>${button(practice?'start':'lesson',practice?'Play mission':'Open lesson',`data-id="${l.id}"`)}</article>`).join('');}
  function home(practice=false) {
    const done=D.lessons.filter(l=>state.lessons[l.id].passed).length;
    shell(`<header><p class="fd-kicker">Christianity foundations · ${new Set(D.lessons.map(l=>l.unit)).size} units available</p><h2 tabindex="-1">${practice?'Practice understanding':'A guided beginning'}</h2><p>${practice?'Rebuild stories, connect meanings, investigate clues, and navigate a scenario. Hints and retries are part of learning.':'Begin with the central story, learn to navigate Scripture, and practice interpreting it in context. No prior knowledge or profession of faith is required.'}</p><label>${done} of ${D.lessons.length} lesson milestones <progress value="${done}" max="${D.lessons.length}"></progress></label><p>Untimed · All lessons open · No lost lives · Belief is never scored</p></header><label class="fd-unit-filter">Choose a unit <select id="fd-unit-select"><option value="0">All units</option>${D.units.map(u=>`<option value="${u.id}" ${unitFilter===u.id?'selected':''}>${u.id}. ${esc(u.title)}</option>`).join('')}</select></label>${D.units.filter(u=>(!unitFilter||u.id===unitFilter)&&D.lessons.some(l=>l.unit===u.id)).map(u=>{const lessons=D.lessons.filter(l=>l.unit===u.id),completed=lessons.filter(l=>state.lessons[l.id].passed).length;return `<section aria-labelledby="fd-unit-${u.id}"><h3 id="fd-unit-${u.id}">Unit ${u.id}: ${esc(u.title)}</h3><p>${completed}/${lessons.length} milestones · ${esc(u.scope)}</p><div class="fd-grid">${cards(practice,lessons)}</div></section>`;}).join('')}<details><summary>How progress works</summary><p>Complete every challenge in a mission to earn its milestone. Return after a day, then after 3, 7, and 14 days for spaced practice. Early practice is welcome but does not advance review awards. These milestones describe completed tasks, not mastery of an entire subject. Later-unit return missions audit new claims and revisit conceptual connections. Their purpose is retention and responsible interpretation, not certification of belief. Book-drill XP is separate.</p></details><details><summary>Complete curriculum</summary><p>All 16 units are available. Start with the orientation lessons, continue through the unit studies, and finish with an independent reading project.</p><ol>${D.units.map(u=>`<li><strong>${esc(u.title)}</strong>: ${esc(u.scope)}</li>`).join('')}</ol><a href="docs/curriculum.md">Read the curriculum and editorial framework</a></details><details><summary>Sources and course design</summary><p>Original lessons informed by Concordia University Texas and Bethel University in Mishawaka course descriptions. Not an endorsed university course. The guide’s stated perspective is LGBTQ-affirming and open-table, with MCC and Disciples influences; it does not represent every congregation.</p>${sources()}</details><details><summary>Save or restore progress</summary><p>Progress is stored on this device. Backups include your private reflection notes. Share only if you intend to share them.</p>${button('export','Download backup')}<label>Restore a foundations backup <input id="fd-import" type="file" accept="application/json,.json"></label><p id="fd-import-status" role="status"></p></details>`);
    host().querySelector('#fd-unit-select').addEventListener('change',e=>{unitFilter=Number(e.target.value);render();host().querySelector('#fd-unit-select')?.focus();});
    host().querySelector('#fd-import').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try {if(file.size>2000000)throw Error();const data=JSON.parse(await file.text());if(data.version!==1||!data.lessons||typeof data.lessons!=='object')throw Error();importState(data);persist();render();}catch {host().querySelector('#fd-import-status').textContent='That file is not a valid foundations backup. Your progress has not changed.';}});
  }
  function sources(){return `<ul>${D.sources.map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a></li>`).join('')}</ul>`;}
  function extraReadings(l) {return (l.extraReadings||[]).map((r,i)=>`<details><summary>Read ${esc(r.reading)} · Berean Standard Bible</summary><div id="fd-extra-${i}">${passage(r)}</div>${button('reader','Read the full chapter',`data-id="${l.id}" data-extra="${i}"`)}</details>`).join('');}
  function passage(l) {
    if(typeof CORPUS!=='undefined' && Array.isArray(CORPUS)) {
      const [bn,ch,start,end]=l.ref, rows=CORPUS.filter(r=>r.bn===bn&&r.chapter===ch&&r.verse>=start&&r.verse<=end);
      return rows.length===end-start+1 ? rows.map(r=>`<p><sup>${r.verse}</sup> ${esc(r.text)}</p>`).join('') : '<p role="status">This passage is incomplete in the available text. Please use the full reader.</p>';
    }
    return `<p role="status">${typeof corpusState!=='undefined'&&corpusState==='unavailable'?'Could not load the Bible text. Check your connection and retry.':'Loading the full Bible passage…'}</p><button type="button" data-corpus-retry>Retry Bible text</button>`;
  }
  function refreshPassage() {
    const target=document.getElementById('fd-passage');if(!target || view.type!=='lesson')return;
    const l=D.lessons.find(l=>l.id===view.id);target.innerHTML=passage(l);
    (l.extraReadings||[]).forEach((r,i)=>{const extra=document.getElementById('fd-extra-'+i);if(extra)extra.innerHTML=passage(r);});
    host().querySelectorAll('[data-corpus-retry]').forEach(el=>el.addEventListener('click',()=>{loadCorpus(true);}));
  }
  function lesson(id) {
    const l=D.lessons.find(l=>l.id===id);if(!l)return home();
    shell(`<p class="fd-kicker">Unit ${l.unit} · ${esc(l.reading)}</p><h2 tabindex="-1">${esc(l.title)}</h2><p><strong>Your goal:</strong> ${esc(l.objective)}</p><section class="fd-reading"><h3>${esc(l.reading)} · Berean Standard Bible</h3><div id="fd-passage">${passage(l)}</div>${button('reader','Read the full chapter',`data-id="${l.id}"`)}</section>${l.body.map(p=>`<p>${esc(p)}</p>`).join('')}${l.extraReadings?`<section class="fd-reading"><h3>Read across this unit</h3><p>Compare the primary texts before beginning the mission.</p>${extraReadings(l)}</section>`:''}<details><summary>Explain it more simply</summary><p>${esc(l.simple)}</p></details><details><summary>Words to know</summary><dl>${Object.entries(l.vocab).map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl></details><details><summary>Go deeper</summary><p>${esc(l.deeper)}</p></details><details><summary>Reflect privately · optional</summary><label for="fd-note">${esc(l.reflect)}</label><textarea id="fd-note" maxlength="5000" rows="4">${esc(state.lessons[id].note)}</textarea><p>Saved on this device; included in exported backups. Never graded.</p><details><summary>See a model reflection</summary><p>${esc(l.model)}</p></details></details>${l.sources?`<details><summary>Lesson sources</summary><ul>${l.sources.map(url=>`<li><a href="${esc(url)}" target="_blank" rel="noopener">${esc(D.sources.find(source=>source.url===url)?.title||url)}</a></li>`).join('')}</ul></details>`:''}${button(run?.id===id?'resume':'start',run?.id===id?'Resume your mission':'Begin understanding mission',`data-id="${id}"`)}`);
    host().querySelector('#fd-note').value=state.lessons[id].note;
    host().querySelector('#fd-note').addEventListener('input',e=>{state.lessons[id].note=e.target.value;persist();});
    refreshPassage(); if(typeof corpusState!=='undefined'&&corpusState==='idle')loadCorpus(true);
  }
  function guide(){shell(`<h2 tabindex="-1">A guide to Christian belief</h2><p>Start with the explanation, then open the interpretive questions. References are starting points for study, not claims that a single verse settles every disagreement.</p>${D.topics.map(t=>`<section class="fd-card"><h3>${esc(t.title)}</h3><p>${esc(t.body)}</p><p><strong>Read:</strong> ${esc(t.reading)}</p><details><summary>Interpretations and deeper questions</summary><p>${esc(t.deeper)}</p></details></section>`).join('')}<details><summary>Sources and editorial framework</summary>${sources()}<a href="docs/curriculum.md">Complete curriculum framework</a></details>`);}
  function start(id) {
    const l=D.lessons.find(l=>l.id===id); if(!l)return;
    const p=state.lessons[id];
    run={id,index:0,solved:0,review:p.passed&&p.due<=Date.now(),wasPassed:p.passed,attempt:0};
    run.challenges=run.review && l.reviewChallenges ? l.reviewChallenges : l.challenges;
    view={type:'game'};resetChallenge();render();
  }
  function shuffled(n){const ids=Array.from({length:n},(_,i)=>i);for(let i=ids.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[ids[i],ids[j]]=[ids[j],ids[i]];}return ids;}
  function resetChallenge(){const c=run.challenges[run.index];run.order=shuffled(c.items.length);if(c.kind==='sequence' && JSON.stringify(run.order)===JSON.stringify(c.answer))run.order.push(run.order.shift());run.optionOrder=shuffled(c.options?.length||0);run.matches={};run.selected=[];run.links=[];run.from="";run.to="";run.stage=0;run.feedback='';run.correct=false;run.hint=false;}
  function evaluate(c,r) {if(c.kind==='argument')return r.links.length===c.answer.length&&c.answer.every(([a,b])=>r.links.some(([x,y])=>x===a&&y===b));if(c.kind==='sequence')return JSON.stringify(r.order)===JSON.stringify(c.answer);if(c.kind==='match')return c.answer.every((a,i)=>Number(r.matches[i])===a&&r.matches[i]!==undefined&&r.matches[i]!=='');if(c.kind==='evidence')return r.selected.length===c.answer.length&&c.answer.every(i=>r.selected.includes(i));return false;}
  function game() {
    const l=D.lessons.find(l=>l.id===run.id),c=run.challenges[run.index];
    let board='';
    if(c.kind==='sequence') board=`<ol class="fd-order">${run.order.map((n,i)=>`<li><span>${esc(c.items[n])}</span>${button('up','↑',`data-i="${i}" aria-label="Move ${esc(c.items[n])} earlier" ${i===0||run.correct?'disabled':''}`)}${button('down','↓',`data-i="${i}" aria-label="Move ${esc(c.items[n])} later" ${i===run.order.length-1||run.correct?'disabled':''}`)}</li>`).join('')}</ol>`;
    if(c.kind==='match')board=run.order.map(i=>{const item=c.items[i];return `<label class="fd-match">${esc(item)}<select data-match="${i}" ${run.correct?'disabled':''}><option value="">Choose a meaning</option>${run.optionOrder.map(j=>`<option value="${j}" ${String(run.matches[i])===String(j)?'selected':''}>${esc(c.options[j])}</option>`).join('')}</select></label>`;}).join('');
    if(c.kind==='evidence')board=`<fieldset><legend>Evidence board</legend>${run.order.map(i=>`<label class="fd-evidence"><input type="checkbox" data-clue="${i}" ${run.selected.includes(i)?'checked':''} ${run.correct?'disabled':''}> ${esc(c.items[i])}</label>`).join('')}</fieldset>`;
    if(c.kind==='argument')board=`<section aria-label="Argument map"><p>Choose a starting statement and the statement it supports. Add a connection; remove any link you cannot justify. Build ${c.answer.length} links.</p><ol>${run.order.map(i=>`<li value="${i+1}">${esc(c.items[i])}</li>`).join('')}</ol><div class="fd-map-controls"><label>From: evidence or claim<select id="fd-from" ${run.correct?'disabled':''}><option value="">Choose a starting statement</option>${run.order.map(i=>`<option value="${i}" ${String(run.from)===String(i)?'selected':''}>${esc(c.items[i])}</option>`).join('')}</select></label><label>Supports: claim or application<select id="fd-to" ${run.correct?'disabled':''}><option value="">Choose a supported statement</option>${run.order.map(i=>`<option value="${i}" ${String(run.to)===String(i)?'selected':''}>${esc(c.items[i])}</option>`).join('')}</select></label>${button('link','Add connection',run.correct?'disabled':'')}</div><ul aria-label="Your connections">${run.links.map(([a,b],i)=>`<li>${esc(c.items[a])} → ${esc(c.items[b])} ${button('unlink','Remove connection',`data-i="${i}" aria-label="Remove connection ${i+1}" ${run.correct?'disabled':''}`)}</li>`).join('')}</ul></section>`;
    if(c.kind==='scenario'){const st=c.stages[Math.min(run.stage,c.stages.length-1)];board=`<h4>Decision ${Math.min(run.stage+1,c.stages.length)} of ${c.stages.length}: ${esc(st.prompt)}</h4><div class="fd-choices">${st.choices.map((x,i)=>button('choice',esc(x),`data-i="${i}" ${run.correct?'disabled':''}`)).join('')}</div>`;}
    shell(`<p class="fd-kicker">${esc(l.title)} · ${run.review?'Return mission':'Understanding mission'} · ${run.index+1}/${run.challenges.length}</p><h2 tabindex="-1">${esc(c.title)}</h2><p>${esc(c.prompt)}</p><progress aria-label="Challenges solved" value="${run.solved}" max="${run.challenges.length}"></progress>${board}<div class="fd-actions">${c.kind!=='scenario'&&!run.correct?button('check','Test your construction'):''}${button('hint','Reveal a hint')}${button('lesson','Revisit the lesson',`data-id="${l.id}"`)}</div>${run.hint?`<p class="fd-feedback">${esc(c.hint)}</p>`:''}<div id="fd-feedback" role="status" aria-live="polite" tabindex="-1">${esc(run.feedback)}</div>${run.correct?button('next',run.index+1===run.challenges.length?'Complete mission':'Next challenge'):''}`);
    for(const key of ['from','to'])host().querySelector('#fd-'+key)?.addEventListener('change',e=>{run[key]=e.target.value;});
    host().querySelectorAll('[data-match]').forEach(el=>el.addEventListener('change',()=>{run.matches[el.dataset.match]=el.value;}));
    host().querySelectorAll('[data-clue]').forEach(el=>el.addEventListener('change',()=>{const n=+el.dataset.clue;run.selected=run.selected.filter(x=>x!==n);if(el.checked)run.selected.push(n);}));
  }
  function act(action,data={}) {
    if(action==='legacy') {document.getElementById('foundations-return').hidden=false;if(hostId==='panel-play'){S.legacyPractice=true;renderPlay();}else {S.legacyLearn=true;S.learnMode=null;renderLearn();}return;}
    if(action==='reader'){const l=D.lessons.find(l=>l.id===data.id);const reading=data.extra!==undefined?l.extraReadings[Number(data.extra)]:l;setTab('explore');readChapter(reading.ref[0],reading.ref[1]);return;}
    if(action==='export'){const url=URL.createObjectURL(new Blob([JSON.stringify(exportState(),null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='canonical-shelf-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);return;}
    if(action==='home'||action==='practice'||action==='guide'){view={type:action};run=null;}
    if(action==='lesson'){view={type:'lesson',id:data.id};if(run?.id!==data.id)run=null;}
    if(action==='resume' && run){view={type:'game'};render();host().querySelector('h2')?.focus();return;}
    if(action==='start'){start(data.id);return;}
    if(run){const l=D.lessons.find(l=>l.id===run.id),c=run.challenges[run.index];
      if(action==='up'||action==='down'){const i=+data.i,j=i+(action==='up'?-1:1);if(!run.correct&&j>=0&&j<run.order.length)[run.order[i],run.order[j]]=[run.order[j],run.order[i]];}
      if(action==='link'&&!run.correct){const a=Number(run.from),b=Number(run.to);if(run.from===''||run.to==='')run.feedback='Choose both statements first.';else if(a===b)run.feedback='A statement cannot support itself in this map.';else if(run.links.some(([x,y])=>x===a&&y===b))run.feedback='That connection is already on your map.';else{run.links.push([a,b]);run.feedback='Connection added. Check whether the evidence supports it.';}}
      if(action==='unlink'&&!run.correct){run.links.splice(Number(data.i),1);run.feedback='Connection removed.';}
      if(action==='hint')run.hint=true;
      if(action==='check'&&!run.correct){run.attempt++;run.correct=evaluate(c,run);run.feedback=run.correct?`Construction complete. ${c.why}`:'Not yet. Revisit the evidence or reveal a hint, adjust your construction, and try again. No progress is lost.';if(run.correct)run.solved++;}
      if(action==='choice'&&!run.correct){const st=c.stages[run.stage],i=+data.i;run.feedback=st.feedback[i];if(i===st.correct){run.stage++;if(run.stage===c.stages.length){run.correct=true;run.solved++;run.feedback+=' '+c.why;}}}
      if(action==='next'&&run.correct){if(run.index+1<run.challenges.length){run.index++;resetChallenge();}else {state.lessons[l.id]=award(state.lessons[l.id],Date.now(),run.review);persist();view={type:'done',id:l.id,review:run.review,early:run.wasPassed&&!run.review};run=null;}}
    }
    render();
    const focus=(action==='check'||action==='choice'||action==='link'||action==='unlink')?'#fd-feedback':action==='up'||action==='down'?`[data-fd="${action}"][data-i="${Math.max(0,+data.i+(action==='up'?-1:1))}"]`:'h2';
    host().querySelector(focus)?.focus();
  }
  function render(target) {
    if(target && target!==hostId){hostId=target;view={type:target==='panel-play'?'practice':'home'};run=null;}
    if(view.type==='lesson')return lesson(view.id);
    if(view.type==='guide')return guide();
    if(view.type==='game'&&run)return game();
    if(view.type==='done'){const l=D.lessons.find(l=>l.id===view.id);shell(`<h2 tabindex="-1">${view.early?'Practice complete':view.review?'Return mission complete':'Milestone earned'}</h2><p>You reconstructed and applied the ideas in ${esc(l.title)}.</p><p>${view.early?'Early practice keeps ideas fresh; your scheduled review date stays the same.':esc(status(l))}</p>${D.lessons[D.lessons.indexOf(l)+1]?button('lesson','Next lesson: '+esc(D.lessons[D.lessons.indexOf(l)+1].title),`data-id="${D.lessons[D.lessons.indexOf(l)+1].id}"`):''}${button('home','Back to learning map')}${button('practice','Choose another mission')}`);return;}
    home(view.type==='practice');
  }
  function open(target='panel-learn'){unitFilter=0;hostId=target;view={type:target==='panel-play'?'practice':'home'};run=null;render();}
  return {render,open,refreshPassage,exportState,importState,_test:{sanitize,award,evaluate}};
})();
