const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const pub=path.resolve(__dirname,'../public'),ctx={window:{},console};vm.createContext(ctx);
const masteryFiles=['v4-mastery-content.js','v4-mastery-story.js','v4-mastery-order.js','v4-mastery-groups.js','v4-mastery-chrono.js','v4-mastery-content-profiles.js','v4-mastery-themes.js','v4-mastery-verses.js','v4-mastery-manifest.js'];
for(const f of ['v4-course-map.js',...masteryFiles])vm.runInContext(fs.readFileSync(path.join(pub,f),'utf8'),ctx,{filename:f});
const C=ctx.window.CANON_V4_COURSE,M=ctx.window.CANON_V4_MASTERY,manifest=ctx.window.CANON_V4_MASTERY_MANIFEST;
assert.equal(C.units.length,25,'v4 must expose 25 learner-facing units');
assert.equal(new Set(C.units.map(u=>u.id)).size,25,'unit IDs must be unique');
assert.ok(C.units.every((u,i)=>u.id===i+1&&u.title&&u.scope&&u.visual),'every unit needs sequential ID, title, scope, and visual language');
const placement=Object.values(C.masteryPlacement).flat();
assert.equal(placement.length,69,'all 69 mastery requirements must be placed');
assert.equal(new Set(placement).size,69,'each mastery requirement must appear exactly once');
const counts=C.units.map(u=>C.masteryPlacement[u.id]?.length??-1);
assert.ok(counts.every(n=>n>=0),'every unit needs an explicit mastery placement array');
assert.ok(Math.max(...counts)<=5,`mastery concentration is too high: ${counts.join(',')}`);
const expected=[
's.1','s.2','s.3','s.4','s.5','s.6','s.7','s.8','s.9','s.10',
'o.law','o.hist1','o.hist2','o.hist3','o.wisdom','o.major','o.minor1','o.minor2','o.minor3','o.ot','o.gospels','o.paul1','o.paul2','o.paul3','o.general','o.nt','o.all',
'g.map','g.law','g.hist','g.wis','g.major','g.minor','g.gospel','g.paul','g.gen','g.proph','g.edges','g.all',
'c.two','c.eras','c.anchor','c.oop','c.proph','c.paul','c.all',
'n.what','n.nt','n.plot','n.people1','n.people2','n.author','n.audience','n.all',
't.what','t.cov','t.exile','t.sac','t.mercy','t.faith','t.all',
'v.what','v.proph','v.love','v.strength','v.fruit','v.speaker','v.build','v.all'];
assert.deepEqual([...placement].sort(),[...expected].sort(),'v4 placement must preserve the exact original 69 requirements');
assert.equal(Object.keys(M).length,69,'all 69 mastery modules must be authored');
assert.deepEqual(Object.keys(M).sort(),[...expected].sort(),'authored mastery IDs must exactly match preserved requirements');
for(const id of expected){const m=M[id];assert.ok(m.title&&m.dek&&Array.isArray(m.body)&&m.body.length>=3,`${id}: incomplete authored teaching copy`);assert.ok(m.plain&&m.plain.length>=35,`${id}: missing useful plain-English summary`);assert.ok(m.visual?.type,`${id}: missing purpose-built visual`);assert.ok(m.challenge?.kind,`${id}: missing redesigned understanding check`);assert.ok(m.challenge?.prompt||m.challenge?.title,`${id}: challenge needs learner-facing copy`);}
assert.equal(manifest.total,69);assert.equal(manifest.status,'fully-authored');
assert.equal(JSON.stringify(manifest.tracks),JSON.stringify({story:10,order:17,groups:12,chrono:7,content:8,themes:7,verses:8}));
console.log(`PASS v4 architecture: 25 units / 69 exact placements / mastery load ${counts.join(',')} / 69 fully authored modules`);
