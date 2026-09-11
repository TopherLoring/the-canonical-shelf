const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),pub=path.join(root,'public');
const context={window:{},console};vm.createContext(context);
const run=file=>vm.runInContext(fs.readFileSync(path.join(pub,file),'utf8'),context,{filename:file});
run('foundations-data.js');
const D=context.window.FOUNDATIONS_DATA;
const before=D.lessons.map(l=>JSON.parse(JSON.stringify(l))),beforeIds=before.map(l=>l.id);
assert.equal(before.length,23,'Expansion expects the 23-lesson baseline. Update this test intentionally if the baseline is consolidated.');
for(const file of ['foundations-expansion-core.js','foundations-units-02-08.js','foundations-units-09-16.js','foundations-expansion-meta.js'])run(file);
assert.equal(D.lessons.length,70);assert.equal(new Set(D.lessons.map(l=>l.id)).size,70);
for(const original of before){const now=D.lessons.find(l=>l.id===original.id);assert.ok(now);const {tracks,...withoutTracks}=now;assert.deepEqual(JSON.parse(JSON.stringify(withoutTracks)),original,`Baseline lesson changed: ${original.id}`);assert.ok(Array.isArray(tracks)&&tracks.length>0);}
for(const u of D.units){const n=D.lessons.filter(l=>l.unit===u.id).length;assert.ok(n>=4&&n<=5,`Unit ${u.id} has ${n} lessons`);}
assert.deepEqual(Array.from(D.skillTracks,t=>[t.id,t.steps]),[['story',10],['order',17],['groups',12],['chrono',7],['content',8],['themes',7],['verses',8]]);assert.equal(D.skillTracks.reduce((n,t)=>n+t.steps,0),69);
const project=D.lessons.find(l=>l.id==='project-interpret');assert.equal(project.comparisons.length,14);assert.equal(new Set(project.comparisons.map(c=>c.title)).size,14);
const corpus=fs.readFileSync(path.join(pub,'corpus.txt'),'utf8').trim().split(/\r?\n/).map(x=>x.split('\t'));
for(const l of D.lessons.filter(l=>!beforeIds.includes(l.id))){
 assert.ok(l.objective&&l.reading&&l.body.length>=4&&l.simple&&l.deeper&&l.reflect&&l.model,l.id);assert.equal(Object.keys(l.vocab).length,3,l.id);assert.equal(l.challenges.length,2,l.id);assert.equal(l.reviewChallenges.length,2,l.id);
 for(const r of [l,...(l.extraReadings||[])]){const [b,c,s,e]=r.ref;assert.equal(corpus.filter(x=>+x[0]===b&&+x[1]===c&&+x[2]>=s&&+x[2]<=e).length,e-s+1,`${l.id}: ${r.reading||l.reading}`)}
 for(const c of [...l.challenges,...l.reviewChallenges]){assert.ok(['evidence','sequence','match','scenario','argument'].includes(c.kind),`${l.id}: ${c.kind}`);assert.ok(c.title&&c.prompt&&c.hint&&c.why,l.id);if(c.kind==='scenario'){assert.ok(c.stages.length>=2);for(const s of c.stages)assert.ok(s.correct>=0&&s.correct<s.choices.length);}else if(c.kind==='match'){assert.equal(c.items.length,c.answer.length);for(const a of c.answer)assert.ok(a>=0&&a<c.options.length);}else if(c.kind==='argument'){for(const [a,b] of c.answer){assert.ok(a>=0&&a<c.items.length);assert.ok(b>=0&&b<c.items.length);}}else for(const a of c.answer)assert.ok(a>=0&&a<c.items.length);}
}
const html=fs.readFileSync(path.join(pub,'index.html'),'utf8');
for(const [name,count] of [['STORY',10],['ORDER',17],['GROUP',12],['CHRONO',7],['CONTENT',8],['THEME',7],['VERSE',8]]){const m=html.match(new RegExp(`const ${name}_STEPS\\s*=\\s*\\[([\\s\\S]*?)\\n\\];`));assert.ok(m,`Missing ${name}_STEPS`);assert.equal((m[1].match(/\bid\s*:\s*"[^"]+"/g)||[]).length,count,`${name} step count`);}
assert.ok(fs.readFileSync(path.join(root,'worker.js'),'utf8').includes('foundations-expansion-finalize.js'));
assert.ok(fs.readFileSync(path.join(pub,'sw.js'),'utf8').includes('canon-v3.6.0'));
console.log('PASS: 70 lessons, 4–5/unit, baseline preservation, 47 additions, corpus coverage, 69 original skill steps, 14 theme investigations, challenge schemas');
