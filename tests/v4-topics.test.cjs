const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const pub=path.resolve(__dirname,'../public'),ctx={window:{},console};vm.createContext(ctx);
for(const f of ['topics-data.js'])vm.runInContext(fs.readFileSync(path.join(pub,f),'utf8'),ctx,{filename:f});
const T=ctx.window.CANON_TOPICS;assert.ok(T&&Array.isArray(T.articles),'Topics corpus missing');assert.ok(T.articles.length>=15,'Topics corpus should start with substantial doctrine/life coverage');
for(const a of T.articles){assert.ok(a.id&&a.title&&a.answer,`${a.id||'unknown'}: incomplete topic`);assert.ok(a.answer.length>=100,`${a.id}: answer too thin`);assert.ok(Array.isArray(a.refs),`${a.id}: refs missing`);}
assert.equal(new Set(T.articles.map(a=>a.id)).size,T.articles.length,'topic IDs must be unique');
console.log(`PASS Topics corpus: ${T.articles.length} curated expert-style entries`);
