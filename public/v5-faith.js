/* Canonical Shelf v5 — full institutional Statement of Faith. */
(()=>{'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function inline(s){let x=esc(s);x=x.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');x=x.replace(/\*(.+?)\*/g,'<em>$1</em>');return x}
function markdown(md){
  return String(md||'').split(/\r?\n/).map(line=>line.trim()).filter(Boolean).map(line=>{
    if(line==='---')return '<hr>';
    if(line.startsWith('# '))return `<h1>${inline(line.slice(2))}</h1>`;
    if(line.startsWith('## '))return `<h2>${inline(line.slice(3))}</h2>`;
    return `<p>${inline(line)}</p>`;
  }).join('');
}
function mount(md){
  const host=document.getElementById('v5-beliefs-panel');if(!host)return false;
  host.innerHTML=`<main class="v5-beliefs v5-page v5-faith-v3"><p class="v5-kicker">TopherLoring Ministries</p>${markdown(md)}<footer class="v5-faith-version"><span>Statement of Faith · Version 3.0</span><span>Presented within Canonical Shelf as the ministry convictions governing its teaching.</span></footer></main>`;
  return true;
}
async function boot(){
  try{
    const base=document.currentScript?.src?new URL('.',document.currentScript.src):new URL('./',location.href);
    const r=await fetch(new URL('statement-of-faith.md',base));if(!r.ok)throw new Error(`Statement of Faith ${r.status}`);
    const md=await r.text();
    if(!mount(md)){const o=new MutationObserver(()=>{if(mount(md))o.disconnect()});o.observe(document.documentElement,{childList:true,subtree:true});}
  }catch(err){console.error('Could not load the full Statement of Faith.',err)}
}
boot();
})();
