(() => {
  'use strict';
  const D=window.FOUNDATIONS_DATA, F=window.Foundations;
  if(!D || !F || !Array.isArray(D.skillTracks) || !Array.isArray(D.skillMissions)) throw Error('Integrated curriculum metadata missing');

  const missionById=new Map(D.skillMissions.map(m=>[m.id,m]));
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function missionDone(m){
    try { return typeof stepDone==='function' ? !!stepDone(m.legacyId) : false; }
    catch { return false; }
  }
  function trackStats(id){
    const all=D.skillMissions.filter(m=>m.track===id),done=all.filter(missionDone).length;
    return {done,total:all.length,pct:all.length?Math.round(done/all.length*100):0};
  }
  function totalStats(){
    const done=D.skillMissions.filter(missionDone).length;
    return {done,total:D.skillMissions.length,pct:Math.round(done/D.skillMissions.length*100)};
  }

  function ensureStyles(){
    if(document.getElementById('integrated-skill-css')) return;
    const style=document.createElement('style');style.id='integrated-skill-css';
    style.textContent=`
      .fd-course-progress{margin:18px 0 24px;padding:18px;border:1px solid var(--rule);border-radius:var(--r);background:var(--paper-3)}
      .fd-course-progress h3,.fd-skill-section h3{font-family:var(--serif);font-size:21px;margin:0 0 7px}
      .fd-course-progress>p{margin:0 0 12px;color:var(--ink-2)}
      .fd-skill-dimensions{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:7px;margin:12px 0 16px}
      .fd-dimension{padding:10px 11px;border:1px solid var(--rule-soft);background:var(--paper-2);border-radius:var(--r)}
      .fd-dimension b{display:flex;justify-content:space-between;gap:8px;font-family:var(--serif);font-size:15px}
      .fd-dimension small{font-family:var(--mono);font-size:9.5px;color:var(--ink-3);font-weight:400}
      .fd-dimbar{height:4px;background:var(--paper-3);border-radius:999px;overflow:hidden;margin-top:7px}.fd-dimbar span{display:block;height:100%;background:var(--gilt)}
      .fd-skill-section{margin-top:28px;padding-top:18px;border-top:2px solid var(--rule)}
      .fd-skill-intro{font-size:14px;color:var(--ink-2);max-width:68ch;margin:0 0 14px}
      .fd-skill-mission{border:1px solid var(--rule-soft);border-left:4px solid var(--gilt);background:var(--paper-3);border-radius:var(--r);margin:0 0 10px;overflow:hidden}
      .fd-skill-mission summary{list-style:none;cursor:pointer;padding:14px 16px;display:grid;grid-template-columns:1fr auto;gap:4px 14px;align-items:start}
      .fd-skill-mission summary::-webkit-details-marker{display:none}
      .fd-skill-mission summary strong{font-family:var(--serif);font-size:18px}.fd-skill-mission summary span{font-family:var(--mono);font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3)}
      .fd-skill-mission[data-done="1"]{border-left-color:var(--right)}.fd-skill-mission[data-done="1"] summary span{color:var(--right-ink)}
      .fd-skill-body{padding:0 16px 16px}.fd-skill-body p{max-width:70ch;line-height:1.55}.fd-skill-objective{font-family:var(--serif);font-size:16.5px}
      .fd-skill-reading{font-family:var(--mono);font-size:10.5px;letter-spacing:.04em;color:var(--ink-3)}
      .fd-skill-callout{padding:11px 13px;background:var(--paper-2);border-radius:var(--r);font-size:14px}
      .fd-skill-vocab{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:6px;margin:12px 0}.fd-skill-vocab div{padding:9px 10px;background:var(--paper-2);border-radius:var(--r);font-size:12.5px}.fd-skill-vocab b{display:block;font-family:var(--serif);font-size:14px}
      .fd-skill-actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:14px}.fd-skill-actions button,.fd-course-progress button{background:var(--ink);color:var(--paper-3);border:0;border-radius:var(--r);padding:10px 16px;font-family:var(--mono);font-size:10.5px;letter-spacing:.1em;text-transform:uppercase}.fd-skill-actions button:hover,.fd-course-progress button:hover{background:var(--c-law)}
      .fd-skill-actions em{font-size:12.5px;color:var(--ink-3)}
      .fd-skill-badge{display:inline-flex;margin-left:7px;padding:2px 7px;border-radius:999px;background:var(--gilt-soft);font-family:var(--mono);font-size:9px;letter-spacing:.06em;color:var(--gilt-ink);vertical-align:middle}
    `;
    document.head.append(style);
  }

  function dimensions(){
    return `<div class="fd-skill-dimensions">${D.skillTracks.map(t=>{const s=trackStats(t.id);return `<div class="fd-dimension"><b>${esc(t.title)} <small>${s.done}/${s.total}</small></b><div class="fd-dimbar"><span style="width:${s.pct}%"></span></div></div>`}).join('')}</div>`;
  }

  function missionCard(m){
    const done=missionDone(m), vocab=Object.entries(m.vocab||{});
    return `<details class="fd-skill-mission" data-done="${done?1:0}" data-mission="${esc(m.id)}">
      <summary><strong>${esc(m.title)}</strong><span>${esc(m.trackTitle)} · ${done?'complete':'skill mission'}</span><small>${esc(m.sub||'')}</small></summary>
      <div class="fd-skill-body">
        <p class="fd-skill-objective"><strong>Objective.</strong> ${esc(m.objective)}</p>
        ${m.connectedReading?`<p class="fd-skill-reading">Connected reading · ${esc(m.connectedReading)}</p>`:''}
        ${(m.body||[]).map(p=>`<p>${esc(p)}</p>`).join('')}
        <p class="fd-skill-callout"><strong>In plain language:</strong> ${esc(m.simple)}</p>
        <div class="fd-skill-vocab">${vocab.map(([k,v])=>`<div><b>${esc(k)}</b>${esc(v)}</div>`).join('')}</div>
        <p><strong>Go deeper.</strong> ${esc(m.deeper)}</p>
        <p><strong>Reflect.</strong> ${esc(m.reflect)}</p>
        <p><strong>Model response.</strong> ${esc(m.model)}</p>
        <div class="fd-skill-actions"><button type="button" data-skill-mission="${esc(m.id)}">${done?'Practice again':'Start mastery check'}</button><em>Untimed · hints/retries available</em></div>
      </div>
    </details>`;
  }

  function missionSection(lesson){
    const missions=(lesson.skillMissions||[]).map(id=>missionById.get(id)).filter(Boolean);
    if(!missions.length) return null;
    const wrap=document.createElement('section');wrap.className='fd-skill-section';wrap.dataset.expansion='lesson-skills';
    wrap.innerHTML=`<h3>Integrated Bible skills</h3><p class="fd-skill-intro">These are part of this lesson, not a separate legacy course. They rebuild the original seven-track curriculum using the same teach → understand → practice pattern as the guided course.</p>${missions.map(missionCard).join('')}`;
    return wrap;
  }

  function launchMission(m){
    try{
      const step=(window.CANON_SKILL_SOURCE?.[m.track]||[]).find(s=>s.id===m.legacyId);
      if(!step) throw Error(`Cannot locate source step ${m.legacyId}`);
      const mode=(typeof MODES!=='undefined'?MODES.find(x=>x.id===m.track):null)||{c:'var(--gilt)',ci:'var(--gilt-ink)'};
      const c=step.check||{};
      const L=Object.assign({
        id:`integrated:${m.id}`,name:m.title,sub:m.sub,check:true,stepId:m.legacyId,integratedMissionId:m.id,
        stage:{tag:`${m.trackTitle} · mastery`,name:'Integrated curriculum',c:mode.c,ci:mode.ci}
      },(c.fmt==='seq'||c.fmt==='seq2'||c.fmt==='mixed')
        ? {e:(c.e||['seq']),n:c.n,size:c.size,mode:c.mode,scope:c.scope,vscope:c.vscope}
        : {format:c.fmt,...c});
      window.__CANON_SKILL_RETURN=m.lessonId;
      S.runHost='#panel-learn';
      startLevel(L);
      if(typeof scrollToWork==='function')scrollToWork();
    }catch(err){console.error(err);}
  }

  // A failed check must not count as completed. The pre-existing skill engine historically marked
  // every finished check done; integrated curriculum completion now follows its own 55% clear line.
  try{
    if(typeof finishRun==='function' && !window.__CANON_FINISH_WRAPPED){
      const originalFinish=finishRun;
      finishRun=function(){
        const R=typeof S!=='undefined'?S.run:null;
        let integrated=null,passed=true;
        if(R?.L?.integratedMissionId){
          integrated={stepId:R.L.stepId};
          if(R.fmt==='quiz') passed=(R.qs?.length?R.correct/R.qs.length:0)>=0.55;
          else if(R.fmt==='jumble') passed=(R.total?R.correct/R.total:0)>=0.55;
        }
        const out=originalFinish.apply(this,arguments);
        if(integrated && !passed && typeof S!=='undefined' && S.stepDone) delete S.stepDone[integrated.stepId];
        return out;
      };
      window.__CANON_FINISH_WRAPPED=true;
    }
  }catch(err){console.error('Could not wrap skill completion',err);}

  // The legacy drill result's Continue button calls renderTrack(). During an integrated mission,
  // redirect that return into the guided lesson that owns the mission.
  try{
    if(typeof renderTrack==='function' && !window.__CANON_TRACK_RETURN_WRAPPED){
      const originalRenderTrack=renderTrack;
      renderTrack=function(){
        const lessonId=window.__CANON_SKILL_RETURN;
        if(lessonId){
          window.__CANON_SKILL_RETURN=null;
          try{S.learnMode=null;S.learnStep=0;}catch{}
          F.open('panel-learn');
          queueMicrotask(()=>document.querySelector(`#panel-learn [data-fd="lesson"][data-id="${lessonId}"]`)?.click());
          return;
        }
        return originalRenderTrack.apply(this,arguments);
      };
      window.__CANON_TRACK_RETURN_WRAPPED=true;
    }
  }catch(err){console.error('Could not wrap skill return',err);}

  function decorate(){
    ensureStyles();
    for(const panelId of ['panel-learn','panel-play']){
      const panel=document.getElementById(panelId),fd=panel?.querySelector('.fd');if(!fd)continue;
      const h2=fd.querySelector('h2')?.textContent?.trim()||'';
      if((h2==='A guided beginning'||h2==='Practice understanding')&&!fd.querySelector('[data-expansion="home"]')){
        const s=totalStats();
        const marker=document.createElement('section');marker.dataset.expansion='home';marker.className='fd-course-progress';
        const state=(()=>{try{return F.exportState()}catch{return null}})();
        const next=D.lessons.find(l=>!state?.lessons?.[l.id]?.passed)||D.lessons[0];
        marker.innerHTML=`<h3>One curriculum · seven Bible-skill dimensions</h3><p><strong>${s.done}/${s.total} integrated skill missions complete.</strong> The former Story, Order, Groups, Chronology, Content, Themes, and Verses tracks now run through the guided course instead of beside it.</p>${dimensions()}<button type="button" data-continue-lesson="${esc(next.id)}">Continue: ${esc(next.title)}</button><p><a href="docs/course-review.md">Curriculum architecture and coverage review</a></p>`;
        const filter=fd.querySelector('.fd-unit-filter');(filter||fd.firstElementChild).after(marker);
        fd.querySelectorAll('[data-fd="lesson"][data-id]').forEach(el=>{
          const lesson=D.lessons.find(l=>l.id===el.dataset.id),n=lesson?.skillMissions?.length||0;
          if(n && !el.querySelector('.fd-skill-badge')) el.insertAdjacentHTML('beforeend',`<span class="fd-skill-badge">${n} skill mission${n===1?'':'s'}</span>`);
        });
      }else if(h2 && !['A guided beginning','Practice understanding','A guide to Christian belief'].includes(h2) && !fd.querySelector('[data-expansion="lesson-skills"]')){
        const lesson=D.lessons.find(l=>l.title===h2);
        if(lesson){
          const section=missionSection(lesson);if(section)fd.append(section);
          if(lesson.comparisons){
            const comp=document.createElement('details');comp.dataset.expansion='themes';comp.innerHTML=`<summary>Fourteen theme investigations</summary><p>Choose one for the independent project; revisit the rest as continuing study.</p>${lesson.comparisons.map(c=>`<h4>${esc(c.title)}</h4><p><strong>${esc(c.reading)}</strong></p><p>${esc(c.prompt)}</p>`).join('')}`;fd.append(comp);
          }
        }
      }
    }
  }

  document.addEventListener('click',e=>{
    const missionButton=e.target.closest?.('[data-skill-mission]');
    if(missionButton){e.preventDefault();const m=missionById.get(missionButton.dataset.skillMission);if(m)launchMission(m);return;}
    const cont=e.target.closest?.('[data-continue-lesson]');
    if(cont){e.preventDefault();try{F.open('panel-learn');queueMicrotask(()=>{const id=cont.dataset.continueLesson;document.querySelector(`#panel-learn [data-fd="lesson"][data-id="${id}"]`)?.click();});}catch(err){console.error(err);}}
  });

  let scheduled=false;
  const observer=new MutationObserver(()=>{if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;decorate();});});
  for(const id of ['panel-learn','panel-play']){const el=document.getElementById(id);if(el)observer.observe(el,{childList:true,subtree:true});}
  try{if(typeof S!=='undefined'&&S.tab==='play')F.open('panel-play');else F.open('panel-learn');}catch{F?.open?.('panel-learn');}
  decorate();
  delete window.CANON_EXPAND;
})();
