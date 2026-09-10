const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {parseHTML}=require(process.env.SHELF_DOM_MODULE||'linkedom');
const root=path.resolve(__dirname,'../public'),read=p=>fs.readFileSync(root+'/'+p,'utf8');
const html=read('index.html'),{window}=parseHTML(html),document=window.document;
const memory=new Map();let now=Date.now();class Clock extends Date{static now(){return now;}}
const ctx=vm.createContext({window,document,Date:Clock,console,localStorage:{getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)},setTimeout:()=>0,setInterval:()=>0,clearInterval:()=>{},clearTimeout:()=>{},requestAnimationFrame:f=>f(),navigator:{},location:{},matchMedia:()=>({matches:false}),getComputedStyle:()=>({getPropertyValue:()=>''}),btoa:s=>Buffer.from(s,'binary').toString('base64'),atob:s=>Buffer.from(s,'base64').toString('binary'),TextEncoder,TextDecoder,URL,Blob,fetch:async()=>({ok:true,text:async()=>read('corpus.txt')})});
window.requestAnimationFrame=f=>f();window.scrollTo=()=>{};window.matchMedia=()=>({matches:true});window.HTMLElement.prototype.scrollIntoView=()=>{};
for(const file of ['foundations-data.js','foundations.js'])vm.runInContext(read(file),ctx);
ctx.Foundations=window.Foundations;
const code=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');
vm.runInContext(code,ctx);
const F=window.Foundations,D=window.FOUNDATIONS_DATA;
function click(selector){const el=document.querySelector(selector);assert.ok(el,'Missing '+selector);el.dispatchEvent(new window.Event('click'));}
function action(name,extra=''){click(`#panel-learn [data-fd="${name}"]${extra}`);}
async function run(){
 assert.equal(document.querySelector('#panel-learn').hidden,false);assert.ok(document.querySelector('#panel-learn').textContent.includes('A guided beginning'));
 await vm.runInContext('loadCorpus(true)',ctx);
 action('lesson','[data-id="begin"]');assert.ok(document.querySelector('#fd-passage').textContent.includes('Christ died'));
 const note=document.querySelector('#fd-note');note.value='<script>private & note</script>';note.dispatchEvent(new window.Event('input'));
 F.refreshPassage();assert.equal(document.querySelector('#fd-note').value,'<script>private & note</script>');
 action('start','[data-id="begin"]');action('check');assert.ok(document.querySelector('#fd-feedback').textContent.includes('Not yet'));assert.equal(F.exportState().lessons.begin.passed,false);
 action('hint');assert.ok(document.querySelector('.fd-feedback'));
 action('up','[data-i="2"]');const paused=document.querySelector('.fd-order').textContent;action('lesson','[data-id="begin"]');assert.ok(document.querySelector('[data-fd="resume"]'));action('resume');assert.equal(document.querySelector('.fd-order').textContent,paused);
 function solve(ch){
  if(ch.kind==='sequence'){
   for(let target=0;target<ch.answer.length;target++){
    let order=[...document.querySelectorAll('.fd-order li span')].map(x=>x.textContent);
    let pos=order.indexOf(ch.items[ch.answer[target]]);
    while(pos>target){action('up',`[data-i="${pos}"]`);pos--;}
   }action('check');
  }else if(ch.kind==='argument'){
   function connect(a,b){for(const [id,value] of [['from',a],['to',b]]){const el=document.querySelector('#fd-'+id);Object.defineProperty(el,'value',{value:String(value),configurable:true});el.dispatchEvent(new window.Event('change'));}action('link');}
   connect(0,4);action('check');assert.ok(document.querySelector('#fd-feedback').textContent.includes('Not yet'));action('unlink','[data-i="0"]');
   for(const [a,b] of ch.answer)connect(a,b);action('check');
  }else if(ch.kind==='match'){
   for(let i=0;i<ch.answer.length;i++){const el=document.querySelector(`[data-match="${i}"]`);Object.defineProperty(el,'value',{value:String(ch.answer[i]),configurable:true});el.dispatchEvent(new window.Event('change'));}action('check');
  }else if(ch.kind==='evidence'){
   for(const i of ch.answer){const el=document.querySelector(`[data-clue="${i}"]`);el.checked=true;el.dispatchEvent(new window.Event('change'));}action('check');
  }else{
   const wrong=(ch.stages[0].correct+1)%ch.stages[0].choices.length;action('choice',`[data-i="${wrong}"]`);assert.equal(document.querySelector('#fd-feedback').textContent,ch.stages[0].feedback[wrong]);
   for(const st of ch.stages)action('choice',`[data-i="${st.correct}"]`);
  }
  assert.ok(document.querySelector('[data-fd="next"]'),'Challenge did not pass: '+ch.title);action('next');
 }
 for(const l of D.lessons){F.open('panel-learn');action('practice');action('start',`[data-id="${l.id}"]`);for(const ch of l.challenges)solve(ch);assert.ok(F.exportState().lessons[l.id].passed);}
 const backup=F.exportState(),due=backup.lessons.begin.due;
 F.open();action('practice');action('start','[data-id="begin"]');D.lessons[0].challenges.forEach(solve);assert.equal(F.exportState().lessons.begin.due,due);
 now=due+1;F.open();action('practice');action('start','[data-id="begin"]');D.lessons[0].challenges.forEach(solve);assert.equal(F.exportState().lessons.begin.reviews,1);
 for(const l of D.lessons.filter(x=>x.unit>=2)){now=F.exportState().lessons[l.id].due+1;F.open();action('practice');action('start',`[data-id="${l.id}"]`);assert.ok(document.querySelector('#panel-learn h2').textContent.includes(l.reviewChallenges[0].title));l.reviewChallenges.forEach(solve);assert.equal(F.exportState().lessons[l.id].reviews,1);}
 const codeSave=vm.runInContext('encodeSave()',ctx);F.importState({});assert.equal(F.exportState().lessons.begin.passed,false);ctx.codeSave=codeSave;assert.ok(vm.runInContext('decodeSave(codeSave)',ctx));assert.ok(F.exportState().lessons.begin.passed);
 F.open();action('lesson','[data-id="begin"]');assert.equal(document.querySelector('#fd-note').value,'<script>private & note</script>');assert.equal(document.querySelector('#fd-note script'),null);
 action('reader','[data-id="begin"]');assert.ok(document.querySelector('#panel-explore').textContent.includes('1 Corinthians 15'));assert.ok(document.querySelectorAll('.reader-verse').length>5);
 vm.runInContext('setTab("play")',ctx);assert.ok(document.querySelector('#panel-play').textContent.includes('Practice understanding'));
 click('#panel-play [data-fd="legacy"]');assert.equal(document.querySelector('#foundations-return').hidden,false);click('#foundations-return-button');assert.ok(document.querySelector('#panel-learn').textContent.includes('A guided beginning'));
 F.open();action('legacy');assert.ok(document.querySelector('#panel-learn').textContent.includes('Eight modes'));click('#foundations-return-button');
 F.open();action('lesson','[data-id="creation"]');assert.ok(document.querySelector('#fd-extra-0').textContent.includes('garden'));action('reader','[data-id="creation"][data-extra="0"]');assert.ok(document.querySelector('#panel-explore').textContent.includes('Genesis 2'));
 const result=vm.runInContext('searchFull("John 3:16")',ctx);assert.equal(result.total,1);assert.ok(result.hits[0].text.includes("God so loved"));
 const range=vm.runInContext('searchFull("John 3:16–18")',ctx);assert.equal(range.total,3);
 console.log('PASS: full app boot, all 50 initial challenges and 36 return-review challenges, failed attempts, hints, notes, corpus rendering, early/due reviews, progress export/import, both legacy routes, reader and search');
}
run().catch(e=>{console.error(e);process.exitCode=1;});
