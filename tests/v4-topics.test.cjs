const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const pub=path.resolve(__dirname,'../public'),ctx={window:{},console};vm.createContext(ctx);
for(const f of ['topics-data.js','topics-extended.js'])vm.runInContext(fs.readFileSync(path.join(pub,f),'utf8'),ctx,{filename:f});
const T=ctx.window.CANON_TOPICS;assert.ok(T&&Array.isArray(T.articles),'Topics corpus missing');assert.ok(T.articles.length>=30,'Topics corpus should provide substantial doctrine, life, ethics, and contested-question coverage');
for(const a of T.articles){assert.ok(a.id&&a.title&&a.answer,`${a.id||'unknown'}: incomplete topic`);assert.ok(a.answer.length>=100,`${a.id}: answer too thin`);assert.ok(Array.isArray(a.refs),`${a.id}: refs missing`);assert.ok(Array.isArray(a.aliases),`${a.id}: aliases missing`);}
assert.equal(new Set(T.articles.map(a=>a.id)).size,T.articles.length,'topic IDs must be unique');
for(const id of ['trinity','salvation','scripture','prayer','lgbtq','suffering','mental-health','justice','creation-evolution'])assert.ok(T.articles.some(a=>a.id===id),`reference library missing ${id}`);
const enhance=fs.readFileSync(path.join(pub,'v4-topics-enhance.js'),'utf8'),preview=fs.readFileSync(path.join(pub,'v4-integrated-preview.html'),'utf8');
assert.ok(enhance.includes('recentTopic?.(id)'),'opening a Topic should persist reference history');
assert.ok(enhance.includes("aria-live','polite'"),'Topics results should expose polite update announcements');
assert.ok(enhance.includes("target.setAttribute('tabindex','-1')")&&enhance.includes('target.focus()'),'Topics transitions need a programmatic focus target');
assert.ok(preview.includes('topics.js"></script><script src="v4-topics-enhance.js'),'Topics enhancement must load after the Topics renderer');
console.log(`PASS Topics corpus: ${T.articles.length} curated expert-style entries + history/focus integration`);
