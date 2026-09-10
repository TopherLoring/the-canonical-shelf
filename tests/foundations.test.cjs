const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const root=require('node:path').resolve(__dirname,'..');
const read=p=>fs.readFileSync(root+'/'+p,'utf8');
const ctx=vm.createContext({window:{},localStorage:{getItem:()=>null,setItem:()=>{}},Date,JSON,Number,Set,String,console});
vm.runInContext(read('foundations-data.js'),ctx);vm.runInContext(read('foundations.js'),ctx);
const D=ctx.window.FOUNDATIONS_DATA,T=ctx.window.Foundations._test;
assert.equal(D.lessons.length,9);assert.equal(D.topics.length,16);assert.equal(D.units.length,16);
const rows=read('corpus.txt').trim().split(/\r?\n/).map(x=>x.split('\t'));
assert.ok(rows.length>30000);
for(const l of D.lessons){
 assert.ok(l.body.length>=4&&l.simple&&l.deeper&&l.reflect&&l.model);
 const [b,c,s,e]=l.ref;assert.equal(rows.filter(r=>+r[0]===b&&+r[1]===c&&+r[2]>=s&&+r[2]<=e).length,e-s+1);
 assert.equal(l.challenges.length,2);
 assert.ok(D.units.some(u=>u.id===l.unit));
 if(l.unit===2)assert.equal(l.reviewChallenges.length,2);
 for(const ch of [...l.challenges,...(l.reviewChallenges||[])]){
  assert.ok(ch.hint&&ch.why);
  if(ch.kind==='scenario'){assert.equal(ch.stages.length,2);for(const st of ch.stages)assert.ok(st.choices[st.correct]&&st.feedback.length===st.choices.length);continue;}
  const correct={order:ch.answer,matches:Object.fromEntries(ch.answer.map((a,i)=>[i,a])),selected:ch.answer};
  assert.ok(T.evaluate(ch,correct));assert.equal(T.evaluate(ch,{order:[],matches:{},selected:[]}),false);
  if(ch.kind==='match')for(const n of ch.answer)assert.ok(ch.options[n]);
 }
}
let p={passed:false,reviews:0,due:0,note:'keep'},now=1000000000;
p=T.award(p,now,false);assert.equal(p.due,now+86400000);assert.ok(p.passed);
const unchanged=T.award(p,now+10,false);assert.equal(unchanged.due,p.due);assert.equal(unchanged.reviews,0);
p=T.award(p,p.due,true);assert.equal(p.reviews,1);assert.equal(p.due,now+4*86400000);assert.equal(p.note,'keep');
p=T.award(p,p.due,true);assert.equal(p.reviews,2);assert.equal(p.due,now+11*86400000);
const migrated=T.sanitize({version:1,lessons:{begin:{passed:true,reviews:2,due:999,note:'old note'}}});
assert.equal(migrated.lessons.begin.note,'old note');assert.equal(migrated.lessons.begin.reviews,2);assert.equal(migrated.lessons.genre.passed,false);
const invalid=T.sanitize({lessons:{begin:{passed:'yes',reviews:Infinity,due:-5,note:'x'.repeat(6000)},unknown:{passed:true}}});
assert.equal(invalid.lessons.begin.passed,false);assert.equal(invalid.lessons.begin.note.length,5000);assert.equal(invalid.lessons.unknown,undefined);
const html=read('index.html');for(const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);
assert.ok(html.includes('if(L.check && stars>=1)'));assert.ok(html.includes('startLevel((L.arcade||L.check)?L:L.id)'));
for(const name of ['foundations.js','foundations-data.js','foundations.css','docs/curriculum.md'])assert.ok(read('sw.js').includes(name));
for(const asset of read('sw.js').matchAll(/"\.\/([^"]+)"/g))assert.ok(fs.existsSync(root+'/'+asset[1]),'Missing cached asset '+asset[1]);
console.log('PASS: lesson content, complete corpus readings, challenge solutions, milestones, spaced reviews, imports, syntax, legacy completion gates, offline assets');
