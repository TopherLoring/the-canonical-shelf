const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const pub=path.resolve(__dirname,'../public'),ctx={window:{},console};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(pub,'v4-course-map.js'),'utf8'),ctx,{filename:'v4-course-map.js'});
const p=Object.values(ctx.window.CANON_V4_COURSE.masteryPlacement).flat();
assert.equal(p.length,69);assert.equal(new Set(p).size,69);for(let i=1;i<=23;i++)assert.equal(ctx.window.CANON_V4_COURSE.masteryPlacement[i].length,3);
assert.ok(!('aliases' in ctx.window.CANON_V4_COURSE),'course map must not depend on duplicate semantic aliases');
console.log('PASS authoritative 69 mastery placements across 23 units');
