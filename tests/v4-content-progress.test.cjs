const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const pub=path.resolve(__dirname,'../public'),ctx={window:{},console};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(pub,'v4-mastery-content.js'),'utf8'),ctx);
const M=ctx.window.CANON_V4_MASTERY,ids=Object.keys(M);
for(const id of ids){const m=M[id];assert.ok(m.body.join(' ').length>350,`${id}: rewrite is too thin`);assert.ok(m.plain.length>20,`${id}: plain-English summary too thin`);assert.ok(m.visual&&m.visual.type,`${id}: visual missing`);assert.ok(m.challenge&&m.challenge.kind,`${id}: challenge missing`);}
console.log(`V4 mastery rewrite progress: ${ids.length}/69 fully authored modules`);
