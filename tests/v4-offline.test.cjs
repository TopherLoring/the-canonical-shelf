const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const pub=path.resolve(__dirname,'../public');
const html=fs.readFileSync(path.join(pub,'v4-integrated-preview.html'),'utf8');
const sw=fs.readFileSync(path.join(pub,'sw.js'),'utf8');
assert.ok(sw.includes('canon-v4-redesign-2'),'service-worker cache version must be bumped for the integrated v4 runtime');
const assets=[...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1]).filter(x=>!x.startsWith('#')&&!/^https?:/i.test(x));
assert.ok(assets.length>=20,'integrated preview should expose a substantial local runtime asset set');
for(const asset of assets){assert.ok(fs.existsSync(path.join(pub,asset)),`integrated preview references missing local asset ${asset}`);assert.ok(sw.includes(`./${asset}`),`service worker does not precache integrated preview asset ${asset}`);}
assert.ok(sw.includes('./v4-integrated-preview.html'),'integrated preview document itself must be precached');
assert.ok(sw.includes('./topics-extended.js'),'extended Topics corpus must be available offline');
assert.ok(sw.includes('r.status!==200'),'runtime caching should not persist failed responses');
assert.ok(sw.includes('v4-integrated-preview.html')&&sw.includes('index.html'),'navigation fallback must preserve both v4 preview and baseline app entry points');
assert.ok(html.includes("navigator.serviceWorker.register('./sw.js')"),'v4 integrated preview must register the offline service worker');
console.log(`PASS v4 offline cache: preview + ${assets.length} local runtime assets are precached and registration is wired`);
