/* Canonical Shelf mobile/Bible enhancement layer.
   Progressive enhancement only: the established reader remains the source of Scripture and navigation state. */
(()=>{'use strict';if(window.__CANON_V5_MOBILE_BIBLE__)return;window.__CANON_V5_MOBILE_BIBLE__=true;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const BOOKS=['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Songs','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi','Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation'];
const BOOK_SET=new Set(BOOKS);
const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
const reduced=()=>matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const visible=el=>!!(el&&el.getClientRects().length&&getComputedStyle(el).visibility!=='hidden');
const exactBook=s=>{const n=norm(s);return BOOKS.find(b=>n===b||n.startsWith(`${b} `)||n===b.toUpperCase())||null};

function scrubVersionCopy(root=document.body){
  if(!root)return;const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){const p=n.parentElement;if(!p||/^(SCRIPT|STYLE|CODE|PRE|TEXTAREA)$/i.test(p.tagName))return NodeFilter.FILTER_REJECT;return /(?:Canonical Shelf\s+v\d|\bv[45](?:\.\d+){0,2}\b|unified curriculum)/i.test(n.nodeValue||'')?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(n=>{n.nodeValue=n.nodeValue
    .replace(/Canonical Shelf\s+v\d+(?:\.\d+){0,2}/gi,'Canonical Shelf')
    .replace(/Canonical Shelf\s+v\d+/gi,'Canonical Shelf')
    .replace(/\bv[45](?:\.\d+){0,2}\s*·\s*/gi,'')
    .replace(/\bv[45](?:\.\d+){0,2}\b/gi,'')
    .replace(/\s+·\s+unified curriculum/gi,'')
    .replace(/\s{2,}/g,' ')});
}
function updateAboutToolCopy(){
  const candidates=$$('p,div,small,footer').filter(el=>norm(el.textContent).startsWith('About this tool.'));
  for(const el of candidates){if(el.dataset.v5AboutUpdated)return;const target=el.matches('footer')?el.querySelector('p,div')||el:el;target.dataset.v5AboutUpdated='1';target.innerHTML='<strong>About this guide.</strong> Canonical Shelf uses the 66-book Protestant canon as its primary learning collection. Catholic, Orthodox, and other Christian traditions include additional books or arrange parts of the canon differently; those differences are identified where relevant, but the additional books are not yet part of the primary bookshelf. Book profiles distinguish traditional attribution from modern scholarly proposals when they differ and name uncertainty where evidence does not support one conclusion. Scripture text is from the public-domain Berean Standard Bible (BSB). Learning progress is stored locally in this browser, and the application remains usable offline after its resources are cached.'}
}

function candidateBookName(el){
  const vals=[el.dataset?.book,el.dataset?.bookName,el.getAttribute?.('aria-label'),el.getAttribute?.('title'),el.textContent];
  for(const v of vals){if(!v)continue;const n=norm(v).replace(/^(Open|Read|View|Book)\s+/i,'');const exact=BOOKS.find(b=>n===b||n.startsWith(`${b} `));if(exact)return exact}
  return null;
}
function labelShelf(){
  const shelf=$('#panel-explore .spine-block,#panel-explore [data-v5-shelf]');if(!shelf)return;
  shelf.classList.add('v5-bible-only-shelf');
  let controls=$$('button,[role="button"],[data-book],.spine',shelf).filter(el=>!el.classList.contains('v5-spine-name'));
  const named=controls.map(el=>[el,candidateBookName(el)]).filter(([,n])=>n);
  if(named.length>=20){for(const [el,name] of named){if(!el.querySelector(':scope > .v5-spine-name'))el.insertAdjacentHTML('beforeend',`<span class="v5-spine-name" aria-hidden="true">${esc(name)}</span>`)}return}
  const likely=controls.filter(el=>!el.closest('button,[role="button"],[data-book],.spine')||el.matches('button,[role="button"],[data-book],.spine'));
  if(likely.length>=66){likely.slice(0,66).forEach((el,i)=>{if(!el.querySelector(':scope > .v5-spine-name'))el.insertAdjacentHTML('beforeend',`<span class="v5-spine-name" aria-hidden="true">${BOOKS[i]}</span>`)});
  }
}
function styleBookSelectors(){
  const bible=$('#panel-explore');if(!bible)return;
  $$('button,[role="button"],a',bible).forEach(el=>{const n=norm(el.textContent);if(BOOK_SET.has(n)||candidateBookName(el)===n)el.classList.add('v5-book-button')});
}
function removeLearnedControls(root=document){
  $$('button,a,[role="button"],label',root).forEach(el=>{if(/^mark\s+(?:this\s+)?(?:book\s+)?as\s+learned$/i.test(norm(el.textContent))||/^mark as learned$/i.test(norm(el.textContent))){el.classList.add('v5-retired-learned');el.setAttribute('aria-hidden','true');el.tabIndex=-1}})
}

function bookFromContainer(container){
  if(!container)return null;const heads=$$('h1,h2,h3,[data-book-title],.book-title',container);for(const h of heads){const b=exactBook(h.textContent);if(b)return b}
  const own=exactBook(container.getAttribute?.('data-book')||container.getAttribute?.('aria-label'));if(own)return own;return null;
}
function discoverBookMeta(name){
  const pools=['BOOKS','books','BIBLE_BOOKS','CANON_BOOKS','BOOK_DATA','bookData'];
  for(const key of pools){const v=window[key];if(Array.isArray(v)){const x=v.find(o=>o&&typeof o==='object'&&norm(o.name||o.title||o.book)===name);if(x)return x}else if(v&&typeof v==='object'){const x=v[name]||Object.values(v).find(o=>o&&typeof o==='object'&&norm(o.name||o.title||o.book)===name);if(x)return x}}
  return null;
}
function list(items){return `<ul>${items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`}
function genericQuestions(info,meta){const out=[`What is ${info.g||'this book'} contributing to the Bible's larger story?`,`Which passages most clearly establish the book's central themes?`];if(meta?.authorship?.traditional||meta?.authorship?.scholarly)out.push('What is known, traditional, or debated about authorship and date?');return out}
function studyMarkup(name){
  const info=window.CANON_BOOK_STUDY?.[name]||{},meta=discoverBookMeta(name)||{};
  const themes=info.t||[];const questions=info.q||genericQuestions(info,meta);const deeper=[];
  if(meta.entryPoint)deeper.push(`Start with ${meta.entryPoint}.`);if(themes[0])deeper.push(`Trace “${themes[0]}” through several passages rather than one isolated verse.`);deeper.push('Compare the book’s opening, major turning point, and ending to see how its argument or story develops.');
  const authors=[];if(meta.authorship?.traditional)authors.push(`Traditional attribution: ${meta.authorship.traditional}`);if(meta.authorship?.scholarly)authors.push(`Modern scholarly view: ${meta.authorship.scholarly}`);if(meta.period)authors.push(`Approximate setting/date: ${meta.period}`);
  const common=`Broad Christian reading can usually begin with the book's own literary movement, historical setting, and central claims before moving to later doctrinal or denominational conclusions.`;
  return `<section class="v5-book-study" data-v5-book-study="${esc(name)}"><div class="v5-book-study__lead"><p class="v5-kicker">Study the book</p><h3>Understanding ${esc(name)}</h3><p>${esc(info.c||meta.hook||meta.synopsis||'Read the book as a whole before building conclusions from isolated verses.')}</p></div><div class="v5-book-study__grid">${themes.length?`<article class="v5-book-study__card"><h4>Key themes</h4>${list(themes)}</article>`:''}<article class="v5-book-study__card"><h4>Go deeper</h4>${list(deeper)}</article><article class="v5-book-study__card"><h4>Common questions</h4>${list(questions)}</article>${authors.length?`<article class="v5-book-study__card"><h4>Authorship & setting</h4>${list(authors)}</article>`:''}<article class="v5-book-study__card"><h4>Where readers differ</h4><p>${esc(info.d||'Interpretive differences are usually passage-specific. Distinguish questions of authorship, history, genre, theology, and modern application rather than treating every disagreement as the same kind of dispute.')}</p></article><article class="v5-book-study__card"><h4>Translation & textual notes</h4><p>${esc(info.x||'Most translation differences in this book are passage-specific. Compare reputable translations and consult textual or translator notes when an argument depends heavily on one English wording.')}</p></article><article class="v5-book-study__card"><h4>Common ground</h4><p>${esc(common)}</p></article></div></section>`;
}
function detailContainers(){
  const bible=$('#panel-explore');if(!bible)return [];
  const direct=$$('dialog,[role="dialog"],.drawer,.modal,.book-detail,.book-details,[data-book-detail],article,section',bible).filter(el=>bookFromContainer(el));
  const dedup=[];for(const el of direct){if(dedup.some(x=>x.contains(el)))continue;dedup.push(el)}return dedup;
}
function enrichDetails(){
  for(const box of detailContainers()){const name=bookFromContainer(box);if(!name)continue;const old=box.querySelector('[data-v5-book-study]');if(old?.dataset.v5BookStudy===name)continue;old?.remove();box.insertAdjacentHTML('beforeend',studyMarkup(name));box.style.scrollMarginTop='var(--app-header-offset)'}
}
function readerBook(){
  const bible=$('#panel-explore');if(!bible)return null;const targets=$$('h1,h2,h3,.reader-title,.chapter-title,[data-reader-title]',bible).filter(visible);for(const el of targets){const b=exactBook(el.textContent);if(b)return b}return null;
}
function syncAfterChapterNav(){
  setTimeout(()=>{enrichDetails();labelShelf();styleBookSelectors();const name=readerBook();if(!name)return;const detail=detailContainers().find(x=>bookFromContainer(x)===name);detail?.scrollIntoView?.({block:'nearest',behavior:reduced()?'auto':'smooth'});const shelf=$('#panel-explore .spine-block');if(shelf){const spine=$$('button,[role="button"],[data-book],.spine',shelf).find(el=>candidateBookName(el)===name);spine?.setAttribute('aria-current','true')}},80)
}
function bindChapterNavigation(){
  const bible=$('#panel-explore');if(!bible||bible.dataset.v5ChapterSync==='1')return;bible.dataset.v5ChapterSync='1';bible.addEventListener('click',e=>{const b=e.target.closest('button,a,[role="button"]');if(!b)return;const t=norm(b.textContent);if(/^(previous|next)(\s+chapter|\s+book)?/i.test(t)||/chapter-(prev|next)|prev-chapter|next-chapter/i.test(`${b.id} ${b.className}`))syncAfterChapterNav()},true)
}

function markSearchSurface(){
  const heads=$$('h1,h2').filter(h=>/^Bible search$/i.test(norm(h.textContent)));for(const h of heads){const panel=h.closest('section,main,[role="main"],div')||h.parentElement;if(panel)panel.classList.add('v5-search-surface')}
}
function mobileSearchAffordance(){
  const input=$('.v5-tools .search');if(!input||input.dataset.mobileAffordance)return;input.dataset.mobileAffordance='1';input.setAttribute('inputmode','search');input.addEventListener('blur',()=>{if(!input.value)input.scrollLeft=0})
}
function audit(){scrubVersionCopy();updateAboutToolCopy();labelShelf();styleBookSelectors();removeLearnedControls();enrichDetails();bindChapterNavigation();markSearchSurface();mobileSearchAffordance()}
let queued=false;function schedule(){if(queued)return;queued=true;queueMicrotask(()=>{queued=false;audit()})}
function boot(){audit();const obs=new MutationObserver(schedule);obs.observe(document.body,{subtree:true,childList:true,characterData:true});window.CanonV5Bible={audit,enrichDetails,labelShelf,syncAfterChapterNav}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
