/* Canonical Shelf v4 guided curriculum migration.
   Runs after the baseline + expansion lesson data has produced 70 guided lessons.
   Keeps original lesson IDs/content intact while assigning the 25-unit learner-facing sequence. */
(() => {
  'use strict';
  const D=window.FOUNDATIONS_DATA,C=window.CANON_V4_COURSE;
  if(!D?.lessons||!C?.units) return;
  const text=l=>`${l.id||''} ${l.title||''} ${l.objective||''}`.toLowerCase();
  const has=(l,re)=>re.test(text(l));
  function unitFor(l){
    const old=Number(l.unit)||0;
    if(old===1){
      if(has(l,/larger story|story map|biblical story/))return 4;
      if(has(l,/library|canon|reference|context detective/))return 2;
      if(has(l,/neighbor|mercy|love/))return 20;
      return 1;
    }
    if(old===2){
      if(has(l,/shelf|seven bible skills|book order|group|genre/))return 3;
      return 2;
    }
    if(old===3)return 5;
    if(old===4){
      if(has(l,/torah|law|sinai|neighbor responsibility|holiness/))return 7;
      return 6;
    }
    if(old===5){
      if(has(l,/judge|conquest|land|violence/))return 8;
      if(has(l,/monarch|king|david|solomon|temple/))return 9;
      if(has(l,/exile|lament|return|rebuild/))return 11;
      return 10;
    }
    if(old===6)return 12;
    if(old===7){
      if(has(l,/hear the prophets in their own setting|prophetic overview/))return 13;
      if(has(l,/justice|amos|micah|jeremiah|exilic hope/))return 10;
      return 13;
    }
    if(old===8)return 14;
    if(old===9)return 15;
    if(old===10){
      if(has(l,/acts|early church|early christian|pentecost|communal discernment|jerusalem council/))return 16;
      if(has(l,/james|favoritism|general epistle|general letter/))return 18;
      if(has(l,/paul|letter|body|belong/))return 17;
      return 16;
    }
    if(old===11)return 19;
    if(old===12)return 20;
    if(old===13)return 21;
    if(old===14)return 22;
    if(old===15)return 23;
    if(old===16){
      if(has(l,/theme|argument|comparison/))return 24;
      return 25;
    }
    return 1;
  }
  function fallbackVisualFor(l,u){
    const title=(l.title||'').toLowerCase();
    if(/timeline|chronolog|exile|return|prophet|kingdom|history/.test(title))return {type:'timeline',title:`Orient ${l.title}`,points:[{title:'Before',date:'context'},{title:l.title,date:'focus'},{title:'After',date:'connection'}]};
    if(/compare|tradition|view|interpret|atonement|gospel|difficult|question/.test(title))return {type:'compare',title:'Compare the key ideas',columns:[{title:'What the evidence says',items:['Name the passage, setting, and claim']},{title:'What requires interpretation',items:['Explain the inference and its limits']}],shared:['Represent disagreement accurately before evaluating it']};
    if(/book|library|canon|shelf|genre/.test(title))return {type:'stack',title:'Locate before interpreting',layers:[{title:'Shelf',text:'Where are you?'},{title:'Book',text:'What kind of work?'},{title:'Passage',text:'What is happening here?'},{title:'Meaning',text:'What does the evidence support?'}]};
    if(/spirit|trinit|incarn|god|doctrine/.test(title))return {type:'relationship',title:'Claims held together',nodes:[{title:'Claim 1',role:'Keep the lesson’s first affirmation visible'},{title:'Claim 2',role:'Do not solve tension by erasing the second'},{title:'Interpretive boundary',role:'Distinguish historic formulation from analogy'}]};
    if(/prayer|bapt|commun|practice|formation|neighbor|mercy/.test(title))return {type:'flow',title:'From belief to practice',nodes:[{title:'Meaning'},{title:'Community'},{title:'Practice'},{title:'Consequences'}]};
    if(/resurrect|hope|new creation|judgment|revelation|apocal/.test(title))return {type:'story-arc',title:'Place final hope in the larger story',beats:[{title:'Creation'},{title:'Rupture'},{title:'Resurrection'},{title:'Judgment'},{title:'Renewed creation'}]};
    if(/theme|thread/.test(title))return {type:'theme-thread',title:'Trace the thread without flattening context',stops:[{book:'Earlier text',title:'Introduced'},{book:'Later text',title:'Developed'},{book:'New setting',title:'Reframed'}]};
    return window.CANON_V4_GUIDED_VISUALS?.byUnit?.[l.unit]||{type:C.units.find(x=>x.id===u)?.visual||'flow',title:l.title,nodes:[{title:'Observe'},{title:'Understand'},{title:'Connect'}]};
  }
  const migrated=D.lessons.map((l,order)=>{
    const v4Unit=unitFor(l),unit=C.units.find(u=>u.id===v4Unit);
    const authoredVisual=window.CANON_V4_GUIDED_VISUALS?.byLesson?.[l.id];
    return {...l,v4Unit,v4Order:order,v4UnitTitle:unit?.title||'',v4Visual:authoredVisual||l.v4Visual||fallbackVisualFor(l,v4Unit)};
  });
  const grouped=Object.fromEntries(C.units.map(u=>[u.id,migrated.filter(l=>l.v4Unit===u.id)]));
  window.CANON_V4_GUIDED={lessons:migrated,byUnit:grouped,total:migrated.length};
})();
