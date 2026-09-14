/* Canonical Shelf service worker. */
const VERSION = 7;
const CACHE = `canon-v5-experience-${VERSION}`;

const RUNTIME = [
  "./", "./index.html", "./manifest.webmanifest",
  "./foundations.css", "./foundations-data.js", "./foundations.js",
  "./foundations-expansion-loader.js", "./foundations-expansion-core.js",
  "./foundations-units-02-08.js", "./foundations-units-09-16.js",
  "./foundations-skill-source.js", "./foundations-skill-curriculum.js",
  "./foundations-expansion-meta.js", "./foundations-expansion-finalize.js",
  "./v4-integrated-preview.html", "./v4-design-system.css", "./v4-integrated.css",
  "./v5-shell.css", "./v5-pages.css", "./v5-mobile-bible.css",
  "./v5-learning-experience.css", "./v5-onboarding.css", "./v5-compact-bible.css",
  "./v5-blueprint-r3.css",
  "./v4-course-map.js", "./v4-guided-visual-rules.js", "./v4-curriculum-migration.js",
  "./v4-visuals.js", "./v4-games.js", "./v4-guided-game-adapter.js",
  "./v4-guided-shell.js", "./v4-progress-migration.js",
  "./v4-mastery-content.js", "./v4-mastery-story.js", "./v4-mastery-order.js",
  "./v4-mastery-groups.js", "./v4-mastery-chrono.js", "./v4-mastery-content-profiles.js",
  "./v4-mastery-themes.js", "./v4-mastery-verses.js", "./v4-mastery-manifest.js",
  "./topics-data.js", "./topics-extended.js", "./v4-topic-bridge.js", "./topics.js",
  "./v4-topics-enhance.js", "./v4-app-integrated.js", "./v4-shell-bridge.js",
  "./v5-shell.js", "./v5-pages.js", "./v5-book-study-data.js", "./v5-mobile-bible.js",
  "./v5-bible-fixes.js", "./v5-learning-experience.js", "./v5-inline-scripture.js",
  "./v5-bible-continuity.js", "./v5-progress-adapter.js", "./v5-guided-tour.js"
];

const CONTENT = [
  "./corpus.txt",
  "./docs/curriculum.md", "./docs/course-review.md",
  "./docs/unit-01.md", "./docs/unit-02.md", "./docs/unit-03.md", "./docs/unit-04.md",
  "./docs/unit-05.md", "./docs/unit-06.md", "./docs/unit-07.md", "./docs/unit-08.md",
  "./docs/unit-09.md", "./docs/unit-10.md", "./docs/unit-11.md", "./docs/unit-12.md",
  "./docs/unit-13.md", "./docs/unit-14.md", "./docs/unit-15.md", "./docs/unit-16.md"
];

const ASSETS = RUNTIME.concat(CONTENT);
const isContent = url => CONTENT.some(c => url.pathname.endsWith(c.replace(/^\.\//, "")));

async function precache() {
  const cache = await caches.open(CACHE);
  await Promise.all(ASSETS.map(async asset => {
    try {
      const res = await fetch(new Request(asset, { cache: "reload" }));
      if (res && res.status === 200) await cache.put(asset, res.clone());
    } catch {}
  }));
}

async function purgeOldCaches() {
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => k.startsWith("canon-") && k !== CACHE).map(k => caches.delete(k)));
}

async function networkFirst(request, fallback) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(request);
    if (res && res.status === 200 && res.type !== "opaque") cache.put(request, res.clone()).catch(() => {});
    return res;
  } catch {
    const hit = await cache.match(request);
    if (hit) return hit;
    const page = await cache.match(fallback);
    return page || Response.error();
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(request);
  const network = fetch(request).then(res => {
    if (res && res.status === 200 && res.type !== "opaque") cache.put(request, res.clone()).catch(() => {});
    return res;
  }).catch(() => null);
  if (hit) return hit;
  return (await network) || Response.error();
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(request);
  if (hit) return hit;
  try {
    const res = await fetch(request);
    if (res && res.status === 200 && res.type !== "opaque") cache.put(request, res.clone()).catch(() => {});
    return res;
  } catch {
    return Response.error();
  }
}

self.addEventListener("install", event => {
  event.waitUntil(precache().then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(purgeOldCaches().then(() => self.clients.claim()));
});

self.addEventListener("message", event => {
  if (event.data === "canon-sw-skip-waiting") self.skipWaiting();
  if (event.data === "canon-sw-purge") event.waitUntil(purgeOldCaches());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === "navigate") {
    const fallback = url.pathname.endsWith("v4-integrated-preview.html") ? "./v4-integrated-preview.html" : "./index.html";
    event.respondWith(networkFirst(request, fallback));
    return;
  }
  if (isContent(url)) {
    event.respondWith(cacheFirst(request));
    return;
  }
  event.respondWith(staleWhileRevalidate(request));
});
