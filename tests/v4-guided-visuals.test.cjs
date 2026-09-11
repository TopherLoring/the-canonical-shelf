const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const pub=path.resolve(__dirname,'../public'),ctx={window:{},console};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(pub,'v4-guided-visual-rules.js'),'utf8'),ctx);
const V=ctx.window.CANON_V4_GUIDED_VISUALS;for(let u=1;u<=16;u++)assert.ok(V.byUnit[u]?.type,`legacy guided unit ${u} lacks migration visual`);
console.log('PASS: all existing guided units have v4 migration visual coverage while 23-unit rewrite proceeds');
