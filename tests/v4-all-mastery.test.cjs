const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const pub=path.resolve(__dirname,'../public'),ctx={window:{},console};vm.createContext(ctx);
const files=['v4-mastery-content.js','v4-mastery-story.js','v4-mastery-order.js','v4-mastery-groups.js','v4-mastery-chrono.js','v4-mastery-content-profiles.js','v4-mastery-themes.js','v4-mastery-verses.js'];
for(const f of files)vm.runInContext(fs.readFileSync(path.join(pub,f),'utf8'),ctx,{filename:f});
const M=ctx.window.CANON_V4_MASTERY||{};
const expected=[
's.1','s.2','s.3','s.4','s.5','s.6','s.7','s.8','s.9','s.10',
'o.law','o.hist1','o.hist2','o.hist3','o.wisdom','o.major','o.minor1','o.minor2','o.minor3','o.ot','o.gospels','o.paul1','o.paul2','o.paul3','o.general','o.nt','o.all',
'g.map','g.law','g.hist','g.wis','g.major','g.minor','g.gospel','g.paul','g.gen','g.proph','g.edges','g.all',
'c.two','c.eras','c.anchor','c.oop','c.proph','c.paul','c.all',
'n.what','n.nt','n.plot','n.people1','n.people2','n.author','n.audience','n.all',
't.what','t.cov','t.exile','t.sac','t.mercy','t.faith','t.all',
'v.what','v.proph','v.love','v.strength','v.fruit','v.speaker','v.build','v.all'];
assert.equal(Object.keys(M).length,69,'v4 must contain exactly 69 authored mastery modules');
assert.deepEqual(Object.keys(M).sort(),expected.sort(),'v4 mastery IDs must exactly match original requirement IDs');
const allowedVisuals=new Set(['shelf','timeline','story-arc','relationship','compare','flow','theme-thread','map-lite','book-profile','verse-context','spectrum','stack']);
const allowedGames=new Set(['timeline-sort','shelf-build','sequence-path','match-board','evidence-lab','context-lens','argument-map','compare-board','scenario','verse-rebuild','book-detective','theme-trace','capstone']);
for(const [id,m] of Object.entries(M)){
  assert.ok(m.title&&m.title.length>=12,`${id}: weak title`);
  assert.ok(m.dek&&m.dek.length>=35,`${id}: weak orientation copy`);
  assert.ok(Array.isArray(m.body)&&m.body.length>=3,`${id}: needs >=3 teaching paragraphs`);
  assert.ok(m.body.join(' ').length>=330,`${id}: teaching copy too thin`);
  assert.ok(m.plain&&m.plain.length>=25,`${id}: plain-English summary missing`);
  assert.ok(allowedVisuals.has(m.visual?.type),`${id}: unsupported/missing visual ${m.visual?.type}`);
  assert.ok(allowedGames.has(m.challenge?.kind),`${id}: unsupported/missing game ${m.challenge?.kind}`);
  assert.ok(m.challenge?.why&&m.challenge.why.length>=25,`${id}: explanatory success feedback missing`);
}
console.log('PASS: all 69 original requirements have specific v4 teaching copy, visuals, and redesigned checks');
