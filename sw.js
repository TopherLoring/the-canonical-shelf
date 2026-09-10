const CACHE="canon-v3.4.0";
const ASSETS=["./","./index.html","./corpus.txt","./manifest.webmanifest","./foundations-data.js","./foundations.js","./foundations.css","./docs/curriculum.md","./docs/unit-01.md","./docs/unit-02.md"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("canon-") && k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{
    const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{}); return r;
  }).catch(async()=>{ if(e.request.mode==="navigate"){ const page=await caches.match("./index.html"); if(page) return page; } return Response.error(); })));
});