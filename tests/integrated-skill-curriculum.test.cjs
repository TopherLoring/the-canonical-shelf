const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');

const root=path.resolve(__dirname,'..');
const pub=path.join(root,'public');
const guidedCounts=[5,5,4,4,5,5,4,4,4,4,5,4,4,5,4,4];
const units=guidedCounts.map((_,i)=>({id:i+1,title:`Unit ${i+1}`}));
const lessons=[];
for(let u=1;u<=16;u++){
  for(let i=1;i<=guidedCounts[u-1];i++) lessons.push({id:`u${u}-lesson-${i}`,unit:u,title:`Unit ${u} Lesson ${i}`,reading:'Genesis 1:1–5',ref:[1,1,1,5]});
}
const D={units,lessons};
const context={window:{FOUNDATIONS_DATA:D},console};
vm.createContext(context);
for(const file of ['foundations-skill-source.js','foundations-skill-curriculum.js']){
  vm.runInContext(fs.readFileSync(path.join(pub,file),'utf8'),context,{filename:file});
}

assert.equal(D.lessons.length,70,'guided curriculum must remain 70 lessons');
assert.equal(D.skillMissions.length,69,'all original steps must become integrated missions');
assert.equal(D.integratedCurriculum.totalActivities,139,'70 guided lessons + 69 missions must equal 139 learning activities');
assert.equal(D.integratedCurriculum.units,16);
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

const expectedUnitMissionCounts=[4,4,4,4,6,4,5,4,4,4,3,3,4,3,6,7];
const actualUnitMissionCounts=units.map(u=>D.skillMissions.filter(m=>m.unit===u.id).length);
assert.deepEqual(actualUnitMissionCounts,expectedUnitMissionCounts,'mission rebalance changed unexpectedly');
for(const [i,count] of actualUnitMissionCounts.entries()){
  assert.ok(count>=3&&count<=7,`Unit ${i+1} is too sparse or overloaded: ${count}`);
  const perLesson=D.lessons.filter(l=>l.unit===i+1).map(l=>(l.skillMissions||[]).length);
  assert.ok(Math.max(...perLesson)<=2,`Unit ${i+1} stacks more than two mastery missions into one guided lesson`);
}

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

const loader=fs.readFileSync(path.join(pub,'foundations-expansion-loader.js'),'utf8');
for(const file of ['foundations-expansion-core.js','foundations-units-02-08.js','foundations-units-09-16.js','foundations-skill-source.js','foundations-skill-curriculum.js','foundations-expansion-meta.js','foundations-expansion-finalize.js']){
  assert.ok(loader.includes(file),`static loader missing ${file}`);
}
const sourceAt=loader.indexOf('foundations-skill-source.js');
const curriculumAt=loader.indexOf('foundations-skill-curriculum.js');
const metaAt=loader.indexOf('foundations-expansion-meta.js');
assert.ok(sourceAt>0&&sourceAt<curriculumAt&&curriculumAt<metaAt,'loader order must be source → integrated curriculum → metadata');

const worker=fs.readFileSync(path.join(root,'worker.js'),'utf8');
assert.ok(!worker.includes('HTMLRewriter'),'Worker must not inject a second copy of the curriculum');
assert.ok(worker.includes('env.ASSETS.fetch'),'Worker must still serve static assets');

const finalizer=fs.readFileSync(path.join(pub,'foundations-expansion-finalize.js'),'utf8');
assert.ok(finalizer.includes('139 learning activities'),'UI must explain the 70 + 69 structure');
assert.ok(finalizer.includes('data-skill-mission'),'integrated mission controls missing');
assert.ok(!finalizer.includes('data-skill-track="'),'detached track-launch controls returned');
assert.ok(!finalizer.includes('S.legacyLearn'),'legacy course switching returned');

const sw=fs.readFileSync(path.join(pub,'sw.js'),'utf8');
assert.ok(sw.includes('canon-v4-redesign-4'),'integrated curriculum test must target the current v4 offline cache');
assert.ok(sw.includes('foundations-expansion-loader.js'));
assert.ok(sw.includes('foundations-skill-source.js')&&sw.includes('foundations-skill-curriculum.js'));

console.log('PASS: 16-unit source curriculum, 70 guided lessons, 69 balanced integrated mastery missions, 139 total source learning activities');
