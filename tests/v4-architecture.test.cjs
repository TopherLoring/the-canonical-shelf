const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),pub=path.join(root,'public');
const context={window:{},console};vm.createContext(context);
for(const f of ['v4-course-map.js','v4-mastery-content.js'])vm.runInContext(fs.readFileSync(path.join(pub,f),'utf8'),context,{filename:f});
const C=context.window.CANON_V4_COURSE,M=context.window.CANON_V4_MASTERY;
assert.equal(C.units.length,23,'v4 must expose 23 learner-facing units');
assert.equal(new Set(C.units.map(u=>u.id)).size,23,'unit IDs must be unique');
assert.ok(C.units.every(u=>u.visual),'every unit needs a visual language declaration');
const placement=Object.values(C.masteryPlacement).flat();
assert.equal(placement.length,69,'23 units × 3 mastery requirements must equal 69');
assert.equal(new Set(placement).size,69,'each mastery requirement must appear exactly once');
for(let i=1;i<=23;i++)assert.equal(C.masteryPlacement[i].length,3,`unit ${i} must carry three mastery requirements`);
const expected=[
's.1','s.2','s.3','s.4','s.5','s.6','s.7','s.8','s.9','s.10',
'o.law','o.hist1','o.hist2','o.hist3','o.wisdom','o.major','o.minor1','o.minor2','o.minor3','o.ot','o.gospels','o.paul1','o.paul2','o.paul3','o.general','o.nt','o.all',
'g.map','g.law','g.hist','g.wis','g.major','g.minor','g.gospel','g.paul','g.gen','g.proph','g.edges','g.all',
'c.two','c.eras','c.anchor','c.oop','c.proph','c.paul','c.all',
'n.what','n.nt','n.plot','n.people1','n.people2','n.author','n.audience','n.all',
't.what','t.cov','t.exile','t.sac','t.mercy','t.faith','t.all',
'v.what','v.proph','v.love','v.strength','v.fruit','v.speaker','v.build','v.all'];
assert.deepEqual([...placement].sort(),[...expected].sort(),'v4 placement must preserve the exact original 69 requirements');
for(const [id,m] of Object.entries(M)){
  assert.ok(expected.includes(id),`${id}: unknown legacy mastery ID`);
  assert.ok(m.title&&m.dek&&Array.isArray(m.body)&&m.body.length>=3,`${id}: incomplete authored teaching copy`);
  assert.ok(m.plain,`${id}: missing plain-English summary`);
  assert.ok(m.visual?.type,`${id}: missing purpose-built visual`);
  assert.ok(m.challenge?.kind,`${id}: missing redesigned understanding check`);
}
console.log(`PASS v4 architecture: 23 units / 69 exact placements / ${Object.keys(M).length} mastery rewrites authored so far`);
