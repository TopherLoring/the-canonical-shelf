/* Single-script v4 bootstrap. Can be appended to the branch-only existing expansion loader. */
(() => {
  if(window.__CANON_V4_BOOTSTRAP__)return;window.__CANON_V4_BOOTSTRAP__=true;
  const s=document.currentScript,base=s?.src?new URL('.',s.src):new URL('./',location.href),el=document.createElement('script');el.src=new URL('v4-loader-final.js',base).href;el.async=false;el.onerror=()=>console.error('Could not bootstrap Canonical Shelf v4 preview');document.head.append(el);
})();
