/* v4 progress model: new curriculum can evolve without preserving the old learner-save schema. */
window.CanonV4Progress=(()=>{
  'use strict';
  const KEY='canon.v4.progress.1';
  const blank=()=>({version:1,lessons:{},mastery:{},topics:{recent:[]},updated:Date.now()});
  function sanitize(x){const p=blank();if(!x||typeof x!=='object')return p;for(const [k,v] of Object.entries(x.lessons||{}))p.lessons[k]={done:v?.done===true,review:Math.max(0,Number(v?.review)||0),note:typeof v?.note==='string'?v.note.slice(0,5000):''};for(const [k,v] of Object.entries(x.mastery||{}))p.mastery[k]={done:v?.done===true,attempts:Math.max(0,Number(v?.attempts)||0)};p.topics.recent=Array.isArray(x.topics?.recent)?x.topics.recent.filter(v=>typeof v==='string').slice(0,12):[];return p;}
  let state;try{state=sanitize(JSON.parse(localStorage.getItem(KEY)));}catch{state=blank();}
  function save(){state.updated=Date.now();try{localStorage.setItem(KEY,JSON.stringify(state));return true;}catch{return false;}}
  function completeMastery(id){state.mastery[id]??={done:false,attempts:0};state.mastery[id].done=true;state.mastery[id].attempts=Math.max(1,state.mastery[id].attempts);save();}
  function attemptMastery(id){state.mastery[id]??={done:false,attempts:0};state.mastery[id].attempts++;save();}
  function completeLesson(id){state.lessons[id]??={done:false,review:0,note:''};state.lessons[id].done=true;save();}
  function reviewLesson(id){state.lessons[id]??={done:true,review:0,note:''};state.lessons[id].done=true;state.lessons[id].review++;save();}
  function setNote(id,note){state.lessons[id]??={done:false,review:0,note:''};state.lessons[id].note=String(note||'').slice(0,5000);save();}
  function recentTopic(id){state.topics.recent=[id,...state.topics.recent.filter(x=>x!==id)].slice(0,12);save();}
  function exportState(){return JSON.parse(JSON.stringify(state));}
  function importState(x){state=sanitize(x);save();return exportState();}
  return {get state(){return state},save,completeMastery,attemptMastery,completeLesson,reviewLesson,setNote,recentTopic,exportState,importState};
})();
