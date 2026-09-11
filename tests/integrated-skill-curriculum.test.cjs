const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');

const root=path.resolve(__dirname,'..');
const pub=path.join(root,'public');
const D={
  units:Array.from({length:16},(_,i)=>({id:i+1,title:`Unit ${i+1}`})),
  lessons:Array.from({length:16},(_,i)=>({id:`lesson-${i+1}`,unit:i+1,title:`Lesson ${i+1}`,reading:'Genesis 1:1–5',ref:[1,1,1,5]}))
};
const context={window:{FOUNDATIONS_DATA:D},console};
vm.createContext(context);
for(const file of ['foundations-skill-source.js','foundations-skill-curriculum.js']){
  vm.runInContext(fs.readFileSync(path.join(pub,file),'utf8'),context,{filename:file});
}

assert.equal(D.skillMissions.length,69,'all original steps must become integrated missions');
assert.equal(new Set(D.skillMissions.map(m=>m.id)).size,69,'mission IDs must be unique');
assert.deepEqual(Array.from(D.skillTracks,t=>[t.id,t.steps]),[
  ['story',10],['order',17],['groups',12],['chrono',7],['content',8],['themes',7],['verses',8]
]);
assert.equal(D.integratedCurriculum.model,'one-curriculum');
assert.equal(D.integratedCurriculum.skillMissions,69);

for(const m of D.skillMissions){
  assert.ok(m.lessonId,`${m.id}: must be assigned to a guided lesson`);
  assert.ok(m.unit>=1&&m.unit<=16,`${m.id}: invalid unit`);
  assert.equal(m.body.length,4,`${m.id}: guided-style body must have four teaching layers`);
  assert.equal(Object.keys(m.vocab).length,3,`${m.id}: must have three vocabulary terms`);
  assert.ok(m.objective&&m.simple&&m.deeper&&m.reflect&&m.model,`${m.id}: missing guided-style fields`);
  assert.ok(m.originalCheck&&Object.keys(m.originalCheck).length,`${m.id}: missing preserved mastery check`);
}

const assigned=D.lessons.flatMap(l=>l.skillMissions||[]);
assert.equal(assigned.length,69,'every mission must be embedded exactly once');
assert.equal(new Set(assigned).size,69,'no mission may be embedded twice');

const expectedLegacyIds=[
  's.1','s.2','s.3','s.4','s.5','s.6','s.7','s.8','s.9','s.10',
  'o.law','o.hist1','o.hist2','o.hist3','o.wisdom','o.major','o.minor1','o.minor2','o.minor3','o.ot','o.gospels','o.paul1','o.paul2','o.paul3','o.general','o.nt','o.all',
  'g.map','g.law','g.hist','g.wis','g.major','g.minor','g.gospel','g.paul','g.gen','g.proph','g.edges','g.all',
  'c.two','c.eras','c.anchor','c.oop','c.proph','c.paul','c.all',
  'n.what','n.nt','n.plot','n.people1','n.people2','n.author','n.audience','n.all',
  't.what','t.cov','t.exile','t.sac','t.mercy','t.faith','t.all',
  'v.what','v.proph','v.love','v.strength','v.fruit','v.speaker','v.build','v.all'
];
assert.deepEqual(Array.from(D.skillMissions,m=>m.legacyId),expectedLegacyIds,'original step coverage/order changed');

const worker=fs.readFileSync(path.join(root,'worker.js'),'utf8');
const sourceAt=worker.indexOf('foundations-skill-source.js');
const curriculumAt=worker.indexOf('foundations-skill-curriculum.js');
const metaAt=worker.indexOf('foundations-expansion-meta.js');
assert.ok(sourceAt>0&&sourceAt<curriculumAt&&curriculumAt<metaAt,'worker script order must load source → integrated curriculum → metadata');

const finalizer=fs.readFileSync(path.join(pub,'foundations-expansion-finalize.js'),'utf8');
assert.ok(finalizer.includes('data-skill-mission'),'integrated mission controls missing');
assert.ok(!finalizer.includes('data-skill-track="'),'detached track-launch controls returned');
assert.ok(!finalizer.includes('S.legacyLearn'),'legacy course switching returned');

const sw=fs.readFileSync(path.join(pub,'sw.js'),'utf8');
assert.ok(sw.includes('canon-v3.7.0'));
assert.ok(sw.includes('foundations-skill-source.js')&&sw.includes('foundations-skill-curriculum.js'));

console.log('PASS: 69 original steps rebuilt as guided, unit-integrated skill missions across seven competency dimensions');
