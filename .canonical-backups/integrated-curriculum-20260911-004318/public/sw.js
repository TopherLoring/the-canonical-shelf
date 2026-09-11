const CACHE="canon-v3.7.0";
const ASSETS=["./","./index.html","./corpus.txt","./manifest.webmanifest","./foundations-data.js","./foundations.js","./foundations.css","./foundations-expansion-core.js","./foundations-units-02-08.js","./foundations-units-09-16.js","./foundations-skill-source.js","./foundations-skill-curriculum.js","./foundations-expansion-meta.js","./foundations-expansion-finalize.js","./docs/curriculum.md","./docs/course-review.md","./docs/unit-01.md","./docs/unit-02.md","./docs/unit-03.md","./docs/unit-04.md","./docs/unit-05.md","./docs/unit-06.md","./docs/unit-07.md","./docs/unit-08.md","./docs/unit-09.md","./docs/unit-10.md","./docs/unit-11.md","./docs/unit-12.md","./docs/unit-13.md","./docs/unit-14.md","./docs/unit-15.md","./docs/unit-16.md"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("canon-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{
    const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});return r;
  }).catch(async()=>{if(e.request.mode==="navigate"){const page=await caches.match("./index.html");if(page)return page;}return Response.error();})));
});
