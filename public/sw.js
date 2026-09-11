const CACHE="canon-v5-experience-3";
const ASSETS=[
  "./","./index.html","./corpus.txt","./manifest.webmanifest",
  "./foundations.css","./foundations-data.js","./foundations.js",
  "./foundations-expansion-loader.js","./foundations-expansion-core.js","./foundations-units-02-08.js","./foundations-units-09-16.js",
  "./foundations-skill-source.js","./foundations-skill-curriculum.js","./foundations-expansion-meta.js","./foundations-expansion-finalize.js",
  "./v4-integrated-preview.html","./v4-design-system.css","./v4-integrated.css","./v5-shell.css","./v5-pages.css",
  "./v4-course-map.js","./v4-guided-visual-rules.js","./v4-curriculum-migration.js",
  "./v4-visuals.js","./v4-games.js","./v4-guided-game-adapter.js","./v4-guided-shell.js","./v4-progress-migration.js",
  "./v4-mastery-content.js","./v4-mastery-story.js","./v4-mastery-order.js","./v4-mastery-groups.js","./v4-mastery-chrono.js",
  "./v4-mastery-content-profiles.js","./v4-mastery-themes.js","./v4-mastery-verses.js","./v4-mastery-manifest.js",
  "./topics-data.js","./topics-extended.js","./v4-topic-bridge.js","./topics.js","./v4-topics-enhance.js","./v4-app-integrated.js","./v4-shell-bridge.js","./v5-shell.js","./v5-pages.js","./v5-faith.js","./statement-of-faith.md",
  "./docs/curriculum.md","./docs/course-review.md",
  "./docs/unit-01.md","./docs/unit-02.md","./docs/unit-03.md","./docs/unit-04.md","./docs/unit-05.md","./docs/unit-06.md","./docs/unit-07.md","./docs/unit-08.md",
  "./docs/unit-09.md","./docs/unit-10.md","./docs/unit-11.md","./docs/unit-12.md","./docs/unit-13.md","./docs/unit-14.md","./docs/unit-15.md","./docs/unit-16.md"
];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("canon-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(!r||r.status!==200||r.type==="opaque")return r;const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});return r}).catch(async()=>{if(e.request.mode==="navigate"){const url=new URL(e.request.url);const fallback=url.pathname.endsWith("v4-integrated-preview.html")?"./v4-integrated-preview.html":"./index.html";const page=await caches.match(fallback);if(page)return page}return Response.error()})))});
