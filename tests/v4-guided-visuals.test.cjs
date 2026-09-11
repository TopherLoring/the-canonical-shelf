const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const pub=path.resolve(__dirname,'../public'),ctx={window:{},console};vm.createContext(ctx);
for(const f of ['foundations-data.js','foundations-expansion-core.js','foundations-units-02-08.js','foundations-units-09-16.js','v4-course-map.js','v4-guided-visual-rules.js','v4-curriculum-migration.js'])vm.runInContext(fs.readFileSync(path.join(pub,f),'utf8'),ctx,{filename:f});
const V=ctx.window.CANON_V4_GUIDED_VISUALS,G=ctx.window.CANON_V4_GUIDED;
assert.ok(V?.byLesson,'lesson-specific visual map missing');
assert.equal(Object.keys(V.byLesson).length,70,'all 70 guided lessons need an authored visual');
const lessonIds=G.lessons.map(l=>l.id).sort(),visualIds=Object.keys(V.byLesson).sort();
assert.equal(JSON.stringify(visualIds),JSON.stringify(lessonIds),'visual IDs must exactly match the guided lesson inventory');
for(const [id,spec] of Object.entries(V.byLesson)){assert.ok(spec.type,`${id}: visual type missing`);assert.ok(spec.title&&spec.title.length>=12,`${id}: visual title too thin`);}
assert.ok(G.lessons.every(l=>l.v4Visual===V.byLesson[l.id]||JSON.stringify(l.v4Visual)===JSON.stringify(V.byLesson[l.id])), 'migration must prefer the authored lesson visual over generic fallbacks');
console.log('PASS: 70/70 guided lessons use explicit purpose-built visuals');
