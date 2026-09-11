const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),pub=path.join(root,'public');
const context={window:{},console};vm.createContext(context);
const run=file=>vm.runInContext(fs.readFileSync(path.join(pub,file),'utf8'),context,{filename:file});
run('foundations-data.js');
const D=context.window.FOUNDATIONS_DATA;
const before=D.lessons.map(l=>JSON.parse(JSON.stringify(l))),beforeIds=before.map(l=>l.id);
assert.equal(before.length,23,'Expansion expects the 23-lesson source baseline. Update this test intentionally if that source layer is consolidated.');
for(const file of ['foundations-expansion-core.js','foundations-units-02-08.js','foundations-units-09-16.js','foundations-skill-source.js','foundations-skill-curriculum.js','foundations-expansion-meta.js'])run(file);
assert.equal(D.lessons.length,70);assert.equal(new Set(D.lessons.map(l=>l.id)).size,70);
for(const original of before){
 const now=D.lessons.find(l=>l.id===original.id);assert.ok(now,`Baseline lesson missing: ${original.id}`);
 const {tracks,skillMissions,...withoutCurriculumMeta}=now;
 assert.deepEqual(JSON.parse(JSON.stringify(withoutCurriculumMeta)),original,`Baseline lesson changed: ${original.id}`);
 assert.ok(tracks===undefined||Array.isArray(tracks),`${original.id}: tracks metadata must be absent or an array`);
 assert.ok(skillMissions===undefined||Array.isArray(skillMissions),`${original.id}: skillMissions metadata must be absent or an array`);
}
for(const u of D.units){const n=D.lessons.filter(l=>l.unit===u.id).length;assert.ok(n>=4&&n<=5,`Source unit ${u.id} has ${n} lessons`);}
assert.deepEqual(Array.from(D.skillTracks,t=>[t.id,t.steps]),[['story',10],['order',17],['groups',12],['chrono',7],['content',8],['themes',7],['verses',8]]);
assert.equal(D.skillTracks.reduce((n,t)=>n+t.steps,0),69);
assert.equal(D.skillMissions.length,69);assert.equal(new Set(D.skillMissions.map(m=>m.id)).size,69);
const missionIds=new Set(D.skillMissions.map(m=>m.id));
const assigned=D.lessons.flatMap(l=>l.skillMissions||[]);
assert.equal(assigned.length,69,'Every preserved skill mission must be attached exactly once in the source curriculum');
assert.equal(new Set(assigned).size,69,'Skill mission assignments must be unique');
for(const id of assigned)assert.ok(missionIds.has(id),`Unknown assigned skill mission: ${id}`);
const project=D.lessons.find(l=>l.id==='project-interpret');assert.equal(project.comparisons.length,14);assert.equal(new Set(project.comparisons.map(c=>c.title)).size,14);
const corpus=fs.readFileSync(path.join(pub,'corpus.txt'),'utf8').trim().split(/\r?\n/).map(x=>x.split('\t'));
for(const l of D.lessons.filter(l=>!beforeIds.includes(l.id))){
 assert.ok(l.objective&&l.reading&&l.body.length>=4&&l.simple&&l.deeper&&l.reflect&&l.model,l.id);assert.equal(Object.keys(l.vocab).length,3,l.id);assert.equal(l.challenges.length,2,l.id);assert.equal(l.reviewChallenges.length,2,l.id);
 for(const r of [l,...(l.extraReadings||[])]){const [b,c,s,e]=r.ref;assert.equal(corpus.filter(x=>+x[0]===b&&+x[1]===c&&+x[2]>=s&&+x[2]<=e).length,e-s+1,`${l.id}: ${r.reading||l.reading}`)}
 for(const c of [...l.challenges,...l.reviewChallenges]){assert.ok(['evidence','sequence','match','scenario','argument'].includes(c.kind),`${l.id}: ${c.kind}`);assert.ok(c.title&&c.prompt&&c.hint&&c.why,l.id);if(c.kind==='scenario'){assert.ok(c.stages.length>=2);for(const s of c.stages)assert.ok(s.correct>=0&&s.correct<s.choices.length);}else if(c.kind==='match'){assert.equal(c.items.length,c.answer.length);for(const a of c.answer)assert.ok(a>=0&&a<c.options.length);}else if(c.kind==='argument'){for(const [a,b] of c.answer){assert.ok(a>=0&&a<c.items.length);assert.ok(b>=0&&b<c.items.length);}}else for(const a of c.answer)assert.ok(a>=0&&a<c.items.length);}
}
const html=fs.readFileSync(path.join(pub,'index.html'),'utf8');
for(const [name,count] of [['STORY',10],['ORDER',17],['GROUP',12],['CHRONO',7],['CONTENT',8],['THEME',7],['VERSE',8]]){const m=html.match(new RegExp(`const ${name}_STEPS\\s*=\\s*\\[([\\s\\S]*?)\\n\\];`));assert.ok(m,`Missing ${name}_STEPS`);assert.equal((m[1].match(/\bid\s*:\s*"[^"]+"/g)||[]).length,count,`${name} step count`);}
const loader=fs.readFileSync(path.join(pub,'foundations-expansion-loader.js'),'utf8');assert.ok(loader.includes('foundations-skill-source.js')&&loader.includes('foundations-skill-curriculum.js')&&loader.includes('foundations-expansion-finalize.js'));assert.ok(loader.includes('v5-pages.js')&&loader.includes('v5-pages.css'));
const worker=fs.readFileSync(path.join(root,'worker.js'),'utf8');assert.ok(!worker.includes('HTMLRewriter')&&worker.includes('env.ASSETS.fetch'));
assert.ok(fs.readFileSync(path.join(pub,'sw.js'),'utf8').includes('canon-v5-experience-2'));
assert.ok(html.includes('foundations-expansion-loader.js'),'Static index must load the curriculum loader');
console.log('PASS: 70 source guided lessons, 69 integrated skill missions, source-unit balance, baseline content preservation, corpus coverage, 14 theme investigations, complete v5 loader');
