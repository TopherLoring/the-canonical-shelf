/* Canonical Shelf v4 native visual renderer. No network or image dependencies. */
window.CanonV4Visuals=(()=>{
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));
  const frame=(title,type,body)=>`<figure class="v4-visual" data-visual="${esc(type)}"><figcaption class="v4-visual__head"><h3>${esc(title)}</h3><span>${esc(type.replace(/-/g,' '))}</span></figcaption><div class="v4-visual__body">${body}</div></figure>`;
  function timeline(spec){
    const body=`<div class="v4-timeline">${(spec.points||[]).map(p=>`<div class="v4-timepoint"><small>${esc(p.date||'')}</small><b>${esc(p.title)}</b>${p.note?`<span>${esc(p.note)}</span>`:''}</div>`).join('')}</div>`;
    return frame(spec.title||'Timeline','timeline',body);
  }
  function flow(spec){
    const nodes=(spec.nodes||[]).map((n,i)=>`${i?'<div class="v4-flow__arrow" aria-hidden="true">→</div>':''}<div class="v4-flow__node"><b>${esc(n.title||n)}</b>${n.text?`<p>${esc(n.text)}</p>`:''}</div>`).join('');
    return frame(spec.title||'How the ideas connect','flow',`<div class="v4-flow">${nodes}</div>`);
  }
  function compare(spec){
    const cols=(spec.columns||[]).slice(0,2).map(c=>`<section class="v4-compare__col"><h4>${esc(c.title)}</h4>${(c.items||[]).map(x=>`<p>${esc(x)}</p>`).join('')}</section>`).join('');
    const shared=spec.shared?.length?`<div class="v4-compare__shared"><strong>Shared ground:</strong> ${spec.shared.map(esc).join(' · ')}</div>`:'';
    return frame(spec.title||'Compare','compare',`<div class="v4-compare">${cols}${shared}</div>`);
  }
  function shelf(spec){
    const colors=['var(--c-law)','var(--c-othist)','var(--c-wisdom)','var(--c-major)','var(--c-minor)','var(--c-gospel)','var(--c-paul)','var(--c-general)','var(--c-apoc)'];
    const books=(spec.books||[]).map((b,i)=>`<button type="button" class="v4-book" style="--book-color:${b.color||colors[b.group??(i%colors.length)]};--book-height:${b.height||55+(i%5)*8}%" data-title="${esc(b.title||b)}" aria-label="${esc(b.title||b)}"></button>`).join('');
    return frame(spec.title||'The biblical shelf','shelf',`<div class="v4-shelf">${books}</div>${spec.caption?`<p>${esc(spec.caption)}</p>`:''}`);
  }
  function storyArc(spec){
    return frame(spec.title||'The story at a glance','story-arc',`<div class="v4-flow">${(spec.beats||[]).map((b,i)=>`${i?'<div class="v4-flow__arrow" aria-hidden="true">→</div>':''}<div class="v4-flow__node"><small>${String(i+1).padStart(2,'0')}</small><b>${esc(b.title||b)}</b>${b.books?`<p>${esc(b.books)}</p>`:''}</div>`).join('')}</div>`);
  }
  function relationship(spec){
    const nodes=(spec.nodes||[]).map(n=>`<div class="v4-flow__node"><b>${esc(n.title)}</b>${n.role?`<p>${esc(n.role)}</p>`:''}</div>`).join('');
    return frame(spec.title||'Relationships','relationship',`<div class="v4-tile-grid">${nodes}</div>${spec.note?`<p>${esc(spec.note)}</p>`:''}`);
  }
  function themeThread(spec){
    return frame(spec.title||'Trace the theme','theme-thread',`<div class="v4-timeline">${(spec.stops||[]).map(s=>`<div class="v4-timepoint"><small>${esc(s.book||'')}</small><b>${esc(s.title)}</b>${s.text?`<span>${esc(s.text)}</span>`:''}</div>`).join('')}</div>`);
  }
  function verseContext(spec){
    const nodes=[['Speaker',spec.speaker],['Recipient',spec.recipient],['Situation',spec.situation],['Wording',spec.wording],['Responsible use',spec.application]].filter(x=>x[1]).map(([title,text])=>({title,text}));
    return frame(spec.title||'Put the verse back in context','verse-context',`<div class="v4-flow">${nodes.map((n,i)=>`${i?'<div class="v4-flow__arrow" aria-hidden="true">→</div>':''}<div class="v4-flow__node"><b>${esc(n.title)}</b><p>${esc(n.text)}</p></div>`).join('')}</div>`);
  }
  function bookProfile(spec){
    const fields=[['Shelf',spec.shelf],['Setting',spec.setting],['What happens',spec.synopsis],['People',spec.people],['Audience',spec.audience],['Why read it',spec.purpose]].filter(x=>x[1]);
    return frame(spec.title||'Book profile','book-profile',`<div class="v4-tile-grid">${fields.map(([k,v])=>`<div class="v4-flow__node"><b>${esc(k)}</b><p>${esc(Array.isArray(v)?v.join(' · '):v)}</p></div>`).join('')}</div>`);
  }
  function spectrum(spec){
    return frame(spec.title||'Major Christian approaches','spectrum',`<div class="v4-flow">${(spec.positions||[]).map((p,i)=>`${i?'<div class="v4-flow__arrow" aria-hidden="true">↔</div>':''}<div class="v4-flow__node"><b>${esc(p.title)}</b><p>${esc(p.text)}</p></div>`).join('')}</div>${spec.boundary?`<p class="v4-callout" data-tone="boundary">${esc(spec.boundary)}</p>`:''}`);
  }
  function stack(spec){
    return frame(spec.title||'Keep the layers separate','stack',`<div class="v4-tile-grid">${(spec.layers||[]).map((x,i)=>`<div class="v4-flow__node"><small>Layer ${i+1}</small><b>${esc(x.title)}</b><p>${esc(x.text)}</p></div>`).join('')}</div>`);
  }
  function mapLite(spec){
    // Deliberately schematic: geography teaching without claiming survey-grade boundaries.
    const places=spec.places||[];
    const body=`<svg viewBox="0 0 800 360" role="img" aria-label="${esc(spec.alt||spec.title||'Schematic map')}" style="width:100%;height:auto"><path d="M80 300 C170 235 170 145 285 126 C400 105 475 52 615 75 C695 91 730 142 710 220 C690 294 560 316 435 296 C315 276 194 342 80 300Z" fill="var(--v4-surface-2)" stroke="var(--v4-rule)"/>${places.map((p,i)=>{const x=p.x??120+i*95,y=p.y??170+(i%3)*45;return `<g><circle cx="${x}" cy="${y}" r="8" fill="var(--v4-accent)"/><text x="${x+13}" y="${y+5}" font-size="15" fill="currentColor">${esc(p.title)}</text></g>`}).join('')}</svg>${spec.caption?`<p>${esc(spec.caption)}</p>`:''}`;
    return frame(spec.title||'Places in the story','map-lite',body);
  }
  function render(spec){
    if(!spec||!spec.type)return '';
    const fn={timeline,flow,compare,shelf,'story-arc':storyArc,relationship,'theme-thread':themeThread,'verse-context':verseContext,'book-profile':bookProfile,spectrum,stack,'map-lite':mapLite}[spec.type];
    return fn?fn(spec):'';
  }
  return {render,timeline,flow,compare,shelf,storyArc,relationship,themeThread,verseContext,bookProfile,spectrum,stack,mapLite};
})();
