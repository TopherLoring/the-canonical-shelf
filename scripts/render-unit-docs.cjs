// Generate the readable unit documents from the same content used by the app.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..'),context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'foundations-data.js'),'utf8'),context);
const data=context.window.FOUNDATIONS_DATA;
const corpus=fs.readFileSync(path.join(root,'corpus.txt'),'utf8').trim().split(/\r?\n/).map(line=>line.split('\t'));
function challenges(items){return items.map(c=>{
 let text=`### ${c.title}\n\n**Format:** ${c.kind}\n\n${c.prompt}\n\n`;
 if(c.kind==='scenario')for(const stage of c.stages)text+=`**${stage.prompt}**\n\n`+stage.choices.map((x,i)=>`- ${x}${i===stage.correct?' — intended response':''}`).join('\n')+`\n\n${stage.feedback[stage.correct]}\n\n`;
 else text+=c.items.map((x,i)=>`- ${x}${c.kind==='match'?' → '+c.options[c.answer[i]]:''}`).join('\n')+'\n\n';
 if(c.kind==='sequence')text+='**Sequence:** '+c.answer.map(i=>c.items[i]).join(' → ')+'\n\n';
 if(c.kind==='evidence')text+='**Supported evidence:** '+c.answer.map(i=>c.items[i]).join('; ')+'\n\n';
 return text+`**Hint:** ${c.hint}\n\n**Explanation:** ${c.why}\n`;
}).join('\n');}
for(const unit of data.units){const lessons=data.lessons.filter(l=>l.unit===unit.id);if(!lessons.length)continue;
 let text=`# Unit ${unit.id}: ${unit.title}\n\n${lessons.length} complete lessons with full Berean Standard Bible readings and interactive understanding missions.\n`;
 for(const l of lessons){const[b,ch,start,end]=l.ref;
 text+=`\n## ${l.title}\n\n**Objective:** ${l.objective}\n\n### ${l.reading} · Berean Standard Bible\n\n`+corpus.filter(r=>+r[0]===b&&+r[1]===ch&&+r[2]>=start&&+r[2]<=end).map(r=>`**${r[2]}** ${r.slice(3).join('\t')}`).join('\n\n')+'\n\n'+l.body.join('\n\n')+`\n\n**Simply:** ${l.simple}\n\n### Vocabulary\n\n`+Object.entries(l.vocab).map(([k,v])=>`- **${k}:** ${v}`).join('\n')+`\n\n**Deeper:** ${l.deeper}\n\n**Optional reflection:** ${l.reflect}\n\n**Model reflection:** ${l.model}\n\n`+challenges(l.challenges);
 if(l.reviewChallenges)text+='\n### Return mission: new examples\n\n'+challenges(l.reviewChallenges);
 if(l.sources)text+='\n### Sources\n\n'+l.sources.map(url=>`- [${data.sources.find(s=>s.url===url)?.title||url}](${url})`).join('\n')+'\n';
 }
 fs.writeFileSync(path.join(root,`docs/unit-${String(unit.id).padStart(2,'0')}.md`),text);
}
