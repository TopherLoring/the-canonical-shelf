const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const pub=path.resolve(__dirname,'../public'),ctx={window:{},console};vm.createContext(ctx);
for(const f of ['v4-mastery-content.js','v4-mastery-story.js','v4-mastery-order.js','v4-mastery-groups.js','v4-mastery-chrono.js','v4-mastery-content-profiles.js','v4-mastery-themes.js','v4-mastery-verses.js'])vm.runInContext(fs.readFileSync(path.join(pub,f),'utf8'),ctx,{filename:f});
const M=ctx.window.CANON_V4_MASTERY,ids=Object.keys(M);assert.equal(ids.length,69,'all 69 mastery modules must be present');
for(const id of ids){const m=M[id];assert.ok(m.body.join(' ').length>350,`${id}: rewrite is too thin`);assert.ok(m.plain.length>20,`${id}: plain-English summary too thin`);assert.ok(m.visual&&m.visual.type,`${id}: visual missing`);assert.ok(m.challenge&&m.challenge.kind,`${id}: challenge missing`);}
console.log('PASS: 69/69 mastery rewrites meet minimum authored-content depth');
