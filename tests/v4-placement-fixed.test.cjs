const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const pub=path.resolve(__dirname,'../public'),ctx={window:{},console};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(pub,'v4-course-map.js'),'utf8'),ctx,{filename:'v4-course-map.js'});
const C=ctx.window.CANON_V4_COURSE,p=Object.values(C.masteryPlacement).flat(),counts=C.units.map(u=>C.masteryPlacement[u.id].length);
assert.equal(C.units.length,25);assert.equal(p.length,69);assert.equal(new Set(p).size,69);assert.ok(counts.every(n=>n>=0&&n<=5),`mastery placement too concentrated: ${counts.join(',')}`);
assert.ok(!('aliases' in C),'course map must not depend on duplicate semantic aliases');
console.log(`PASS authoritative 69 mastery placements across 25 units: ${counts.join(',')}`);
