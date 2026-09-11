/* Canonical Shelf v4 — Topics reference desk.
   Curated, offline, expert-style retrieval. This is deliberately not presented as generative AI. */
(() => {
  'use strict';
  const K=window.CANON_TOPICS;
  if(!K || !Array.isArray(K.articles) || window.__CANON_TOPICS_UI__) return;
  window.__CANON_TOPICS_UI__=true;

  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize=s=>String(s||'').toLowerCase().replace(/[^a-z0-9\s-]/g,' ').replace(/\s+/g,' ').trim();
  const tokens=s=>normalize(s).split(' ').filter(x=>x.length>1);

  function allGlossary(){
    const map=new Map(Object.entries(K.glossary||{}));
    const lessons=window.FOUNDATIONS_DATA?.lessons||[];
    for(const l of lessons) for(const [term,def] of Object.entries(l.vocab||{})) if(!map.has(term)) map.set(term,def);
    return [...map.entries()].sort((a,b)=>a[0].localeCompare(b[0]));
  }

  function score(article,q){
    const qt=tokens(q); if(!qt.length) return 0;
    const title=normalize(article.title), aliases=normalize((article.aliases||[]).join(' ')), tags=normalize((article.tags||[]).join(' '));
    const body=normalize([article.answer,...(article.sections||[]).flat()].join(' '));
    let n=0;
    for(const t of qt){
      if(title.includes(t)) n+=8;
      if(aliases.includes(t)) n+=7;
      if(tags.includes(t)) n+=4;
      if(body.includes(t)) n+=1;
    }
    const phrase=normalize(q);
    if(title.includes(phrase))n+=20;
    if(aliases.includes(phrase))n+=18;
    return n;
  }

  function best(q,limit=6){return K.articles.map(a=>({a,s:score(a,q)})).filter(x=>x.s>0).sort((a,b)=>b.s-a.s||a.a.title.localeCompare(b.a.title)).slice(0,limit).map(x=>x.a);}
  function categoryList(){return [...new Set(K.articles.map(a=>a.kind))];}

  function ensureDom(){
    const tabs=document.querySelector('.tabs'); const main=document.querySelector('main');
    if(!tabs||!main)return false;
    if(!document.getElementById('tab-topics')){
      const b=document.createElement('button');
      b.className='tab';b.type='button';b.role='tab';b.id='tab-topics';b.dataset.tab='topics';b.setAttribute('aria-controls','panel-topics');b.setAttribute('aria-selected','false');b.textContent='Topics';
      const verses=document.getElementById('tab-verses');tabs.insertBefore(b,verses||null);
      b.addEventListener('click',openTopics);
    }
    if(!document.getElementById('panel-topics')){
      const p=document.createElement('section');p.className='panel wrap';p.id='panel-topics';p.role='tabpanel';p.setAttribute('aria-labelledby','tab-topics');p.hidden=true;main.appendChild(p);
    }
    document.querySelectorAll('.tab:not(#tab-topics)').forEach(b=>{if(b.dataset.topicsBound)return;b.dataset.topicsBound='1';b.addEventListener('click',closeTopics,{capture:true});});
    ensureStyles();return true;
  }

  function closeTopics(){const p=document.getElementById('panel-topics');if(p){p.hidden=true;p.dataset.open='0';}}
  function openTopics(){
    document.querySelectorAll('.tab').forEach(b=>b.setAttribute('aria-selected',b.id==='tab-topics'?'true':'false'));
    document.querySelectorAll('.panel').forEach(p=>{p.hidden=p.id!=='panel-topics';p.dataset.open=p.id==='panel-topics'?'1':'0';});
    renderHome();
    document.getElementById('panel-topics')?.querySelector('h2')?.focus();
    if(typeof scrollToWork==='function') scrollToWork();
  }

  function articleCard(a){return `<button class="ct-topic-card" type="button" data-topic="${esc(a.id)}"><span>${esc(a.kind)}</span><strong>${esc(a.title)}</strong><small>${esc(a.answer)}</small></button>`;}
  function relatedCard(a){return `<button class="ct-related" type="button" data-topic="${esc(a.id)}">${esc(a.title)}</button>`;}

  function chrome(inner){
    const p=document.getElementById('panel-topics'); if(!p)return;
    p.innerHTML=`<div class="ct"><header class="ct-hero"><p class="ct-eyebrow">Plain-English Christian reference</p><h2 tabindex="-1">Ask about Christianity</h2><p>Start with a question, topic, doctrine, or unfamiliar word. The explanation comes first. Bible references are there when you want to inspect the evidence yourself.</p><form id="ct-search-form" role="search"><label for="ct-search">What do you want to understand?</label><div class="ct-search-row"><input id="ct-search" type="search" autocomplete="off" placeholder="Try “What is the Trinity?” or “What does Christianity say about anxiety?”"><button type="submit">Ask</button></div></form><div class="ct-prompts"><button data-query="Why did Jesus die?">Why did Jesus die?</button><button data-query="What happens after death?">What happens after death?</button><button data-query="Why do Christians disagree about LGBTQ people?">Christianity & LGBTQ people</button><button data-query="Why are Bible translations different?">Bible translations</button></div></header><nav class="ct-subnav" aria-label="Topics sections"><button data-view="browse">Browse topics</button><button data-view="doctrine">Doctrine & theology</button><button data-view="glossary">Glossary</button></nav><div id="ct-content">${inner}</div></div>`;
    bind();
  }

  function renderHome(){
    const kinds=categoryList();
    const featured=['salvation','trinity','anxiety','lgbtq','suffering','scripture','judgment','prayer'].map(id=>K.articles.find(a=>a.id===id)).filter(Boolean);
    chrome(`<section class="ct-intro"><div><p class="ct-kicker">Reference desk</p><h3>Start with the answer, not a reading assignment.</h3><p>This section is designed for the question you actually have right now. Open an answer in plain English, then go deeper into disagreements, context, related ideas, and supporting passages only if you want to.</p></div><div class="ct-stat"><strong>${K.articles.length}</strong><span>curated topic guides</span><strong>${allGlossary().length}</strong><span>plain-English terms</span></div></section><section><div class="ct-section-head"><div><p class="ct-kicker">Popular starting points</p><h3>Questions people actually ask</h3></div></div><div class="ct-grid">${featured.map(articleCard).join('')}</div></section><section><div class="ct-section-head"><div><p class="ct-kicker">Browse by area</p><h3>Explore without knowing the right theological word</h3></div></div><div class="ct-category-grid">${kinds.map(k=>`<button type="button" data-kind="${esc(k)}"><strong>${esc(k)}</strong><span>${K.articles.filter(a=>a.kind===k).length} guides</span></button>`).join('')}</div></section>`);
  }

  function renderBrowse(kind=''){
    const rows=kind?K.articles.filter(a=>a.kind===kind):K.articles;
    document.getElementById('ct-content').innerHTML=`<section><div class="ct-section-head"><div><p class="ct-kicker">${kind?esc(kind):'All topics'}</p><h3>${kind?'Explore this area':'Browse the reference library'}</h3></div>${kind?'<button type="button" class="ct-text-button" data-view="browse">Show all</button>':''}</div><div class="ct-grid">${rows.map(articleCard).join('')}</div></section>`;bindContent();
  }

  function renderDoctrine(){
    const rows=K.articles.filter(a=>/Doctrine|Practice & doctrine|Life & theology/.test(a.kind));
    document.getElementById('ct-content').innerHTML=`<section><div class="ct-section-head"><div><p class="ct-kicker">Doctrine & theology</p><h3>The ideas Christians use to make sense of faith</h3><p>Each guide explains the core idea, why Christians hold it, and where major Christian traditions disagree.</p></div></div><div class="ct-grid">${rows.map(articleCard).join('')}</div></section>`;bindContent();
  }

  function renderGlossary(filter=''){
    const q=normalize(filter);const rows=allGlossary().filter(([k,v])=>!q||normalize(k+' '+v).includes(q));
    document.getElementById('ct-content').innerHTML=`<section><div class="ct-section-head"><div><p class="ct-kicker">Glossary</p><h3>Theology without the jargon wall</h3><p>Short definitions first. Where a term is contested, the topic guides explain the disagreement.</p></div></div><label class="ct-gloss-search">Filter terms <input id="ct-gloss-filter" type="search" value="${esc(filter)}" placeholder="Search terms"></label><dl class="ct-glossary">${rows.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></section>`;bindContent();document.getElementById('ct-gloss-filter')?.addEventListener('input',e=>renderGlossary(e.target.value));
  }

  function renderSearch(q){
    const matches=best(q,8);
    document.getElementById('ct-content').innerHTML=`<section class="ct-answer-list"><div class="ct-section-head"><div><p class="ct-kicker">Best matches for</p><h3>“${esc(q)}”</h3></div></div>${matches.length?matches.map((a,i)=>`<article class="ct-search-result"><p>${i===0?'Best match':`Related answer ${i+1}`}</p><h4>${esc(a.title)}</h4><div>${esc(a.answer)}</div><button type="button" data-topic="${esc(a.id)}">Read the full answer</button></article>`).join(''):`<article class="ct-empty"><h4>I don’t have a strong curated answer for that yet.</h4><p>Try a shorter phrase, browse the glossary, or explore the closest topic. In v4, unanswered searches will also become candidates for new reference articles.</p></article>`}</section>`;bindContent();
  }

  function renderArticle(id){
    const a=K.articles.find(x=>x.id===id);if(!a)return renderHome();
    const related=(a.related||[]).map(id=>K.articles.find(x=>x.id===id)).filter(Boolean);
    document.getElementById('ct-content').innerHTML=`<article class="ct-article"><button class="ct-back" type="button" data-view="browse">← Browse topics</button><p class="ct-kicker">${esc(a.kind)}</p><h3>${esc(a.title)}</h3><p class="ct-lead">${esc(a.answer)}</p><div class="ct-article-grid"><div>${(a.sections||[]).map(([h,b])=>`<section><h4>${esc(h)}</h4><p>${esc(b)}</p></section>`).join('')}</div><aside><div class="ct-evidence"><p class="ct-kicker">If you want the biblical evidence</p><p>You do not need to read these first to understand the answer. They are starting points for checking the explanation yourself.</p><ul>${(a.refs||[]).map(r=>`<li>${esc(r)}</li>`).join('')}</ul></div>${related.length?`<div class="ct-related-box"><p class="ct-kicker">Related</p>${related.map(relatedCard).join('')}</div>`:''}</aside></div></article>`;bindContent();
  }

  function bind(){
    document.getElementById('ct-search-form')?.addEventListener('submit',e=>{e.preventDefault();const q=document.getElementById('ct-search').value.trim();if(q)renderSearch(q);});
    document.querySelectorAll('#panel-topics [data-query]').forEach(b=>b.addEventListener('click',()=>{document.getElementById('ct-search').value=b.dataset.query;renderSearch(b.dataset.query);}));
    document.querySelectorAll('#panel-topics .ct-subnav [data-view]').forEach(b=>b.addEventListener('click',()=>routeView(b.dataset.view)));
    bindContent();
  }
  function bindContent(){
    document.querySelectorAll('#ct-content [data-topic]').forEach(b=>b.addEventListener('click',()=>renderArticle(b.dataset.topic)));
    document.querySelectorAll('#ct-content [data-kind]').forEach(b=>b.addEventListener('click',()=>renderBrowse(b.dataset.kind)));
    document.querySelectorAll('#ct-content [data-view]').forEach(b=>b.addEventListener('click',()=>routeView(b.dataset.view)));
  }
  function routeView(v){if(v==='glossary')renderGlossary();else if(v==='doctrine')renderDoctrine();else renderBrowse();}

  function ensureStyles(){if(document.getElementById('canon-topics-css'))return;const s=document.createElement('style');s.id='canon-topics-css';s.textContent=`
    .ct{max-width:1080px;margin:0 auto}.ct-hero{padding:clamp(26px,5vw,58px);border:1px solid var(--rule);background:linear-gradient(145deg,var(--paper-3),var(--paper-2));border-radius:18px;margin-bottom:18px;position:relative;overflow:hidden}.ct-hero:after{content:"?";position:absolute;right:28px;top:-40px;font-family:var(--serif);font-size:210px;line-height:1;color:var(--gilt-soft);pointer-events:none}.ct-eyebrow,.ct-kicker{font-family:var(--mono);text-transform:uppercase;letter-spacing:.12em;font-size:10px;color:var(--ink-3);margin:0 0 8px}.ct-hero h2{font-family:var(--serif);font-size:clamp(34px,6vw,64px);line-height:1;margin:0 0 14px;max-width:12ch}.ct-hero>p:not(.ct-eyebrow){max-width:68ch;color:var(--ink-2);font-size:17px}.ct-hero form{margin-top:26px;max-width:820px;position:relative;z-index:1}.ct-hero label{display:block;font-weight:650;margin-bottom:8px}.ct-search-row{display:grid;grid-template-columns:1fr auto;gap:8px}.ct-search-row input,.ct-gloss-search input{width:100%;min-height:52px;border:1px solid var(--rule);border-radius:12px;background:var(--paper-3);color:var(--ink);font:inherit;padding:12px 15px}.ct-search-row button{border:0;background:var(--ink);color:var(--paper-3);border-radius:12px;padding:0 22px;font-weight:700}.ct-prompts{display:flex;gap:7px;flex-wrap:wrap;margin-top:11px;position:relative;z-index:1}.ct-prompts button,.ct-subnav button,.ct-text-button,.ct-back{border:1px solid var(--rule);background:transparent;color:var(--ink-2);border-radius:999px;padding:8px 12px;font:inherit;font-size:12px}.ct-prompts button:hover,.ct-subnav button:hover{background:var(--paper-3);color:var(--ink)}.ct-subnav{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 28px;padding:11px;border:1px solid var(--rule-soft);border-radius:14px;background:var(--paper-2)}.ct-intro{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:center;padding:26px 0 34px}.ct-intro h3,.ct-section-head h3,.ct-article h3{font-family:var(--serif);font-size:clamp(25px,4vw,40px);line-height:1.08;margin:0 0 10px}.ct-stat{display:grid;grid-template-columns:auto auto;gap:4px 10px;padding:16px 20px;border-left:3px solid var(--gilt)}.ct-stat strong{font-family:var(--serif);font-size:28px}.ct-stat span{align-self:center;color:var(--ink-3);font-size:12px}.ct-section-head{display:flex;justify-content:space-between;align-items:end;gap:20px;margin:28px 0 14px}.ct-section-head p{color:var(--ink-2);max-width:65ch}.ct-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,265px),1fr));gap:10px}.ct-topic-card{min-height:190px;text-align:left;border:1px solid var(--rule);background:var(--paper-3);border-radius:15px;padding:18px;display:flex;flex-direction:column;gap:8px;transition:transform .16s ease,box-shadow .16s ease,border-color .16s ease}.ct-topic-card:hover{transform:translateY(-2px);border-color:var(--ink-3);box-shadow:0 10px 24px rgba(27,29,34,.07)}.ct-topic-card>span{font:9.5px var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--gilt-ink)}.ct-topic-card strong{font-family:var(--serif);font-size:20px;line-height:1.1}.ct-topic-card small{font-size:13px;line-height:1.45;color:var(--ink-2);display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}.ct-category-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:8px}.ct-category-grid button{display:flex;justify-content:space-between;gap:10px;align-items:center;text-align:left;padding:16px;border:1px solid var(--rule-soft);border-radius:12px;background:var(--paper-2)}.ct-category-grid span{font:10px var(--mono);color:var(--ink-3)}.ct-answer-list{display:grid;gap:10px}.ct-search-result,.ct-empty{padding:22px;border:1px solid var(--rule);border-radius:14px;background:var(--paper-3)}.ct-search-result>p{font:9.5px var(--mono);text-transform:uppercase;letter-spacing:.1em;color:var(--gilt-ink)}.ct-search-result h4{font-family:var(--serif);font-size:23px;margin:5px 0}.ct-search-result div{color:var(--ink-2);max-width:75ch}.ct-search-result button{margin-top:14px;border:0;background:var(--ink);color:var(--paper-3);border-radius:9px;padding:9px 13px}.ct-article{padding-bottom:50px}.ct-back{margin-bottom:24px}.ct-lead{font-family:var(--serif);font-size:clamp(19px,2.5vw,24px);line-height:1.5;max-width:72ch;color:var(--ink-2)}.ct-article-grid{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(240px,.7fr);gap:34px;margin-top:28px}.ct-article-grid section{padding:18px 0;border-top:1px solid var(--rule-soft)}.ct-article-grid h4{font-family:var(--serif);font-size:21px;margin:0 0 7px}.ct-article-grid p{max-width:70ch}.ct-evidence,.ct-related-box{padding:18px;border:1px solid var(--rule);border-radius:13px;background:var(--paper-3);margin-bottom:10px}.ct-evidence p{font-size:13px;color:var(--ink-2)}.ct-evidence ul{padding-left:18px;font:12px var(--mono);line-height:1.8}.ct-related{display:block;width:100%;text-align:left;border:0;border-top:1px solid var(--rule-soft);background:transparent;padding:10px 0;font:inherit}.ct-related:first-of-type{border-top:0}.ct-gloss-search{display:block;margin:15px 0 20px;max-width:520px}.ct-gloss-search input{display:block;margin-top:6px;min-height:46px}.ct-glossary{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:8px}.ct-glossary div{padding:16px;border:1px solid var(--rule-soft);background:var(--paper-3);border-radius:12px}.ct-glossary dt{font-family:var(--serif);font-size:20px;font-weight:700}.ct-glossary dd{margin:4px 0 0;color:var(--ink-2);font-size:14px}.ct button:focus-visible,.ct input:focus-visible{outline:3px solid var(--gilt);outline-offset:2px}@media(max-width:720px){.ct-intro,.ct-article-grid{grid-template-columns:1fr}.ct-stat{border-left:0;border-top:3px solid var(--gilt)}.ct-search-row{grid-template-columns:1fr}.ct-search-row button{min-height:48px}.ct-hero:after{font-size:140px;right:-10px}.ct-section-head{align-items:start;flex-direction:column}}
  `;document.head.appendChild(s);}

  let attempts=0;(function boot(){if(ensureDom()){return;}if(++attempts<300)setTimeout(boot,30);})();
})();
