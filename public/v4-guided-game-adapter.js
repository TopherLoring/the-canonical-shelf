/* Adapts current guided lesson challenges into v4 challenge types during curriculum migration. */
window.CanonV4GuidedAdapter=(()=>{
  'use strict';
  function adapt(c){
    if(!c)return null;
    if(c.kind==='sequence')return {...c,kind:'sequence-path',hints:[c.hint,'Look for the logical or narrative hinge between neighboring cards.'].filter(Boolean)};
    if(c.kind==='match')return {...c,kind:'match-board',hints:[c.hint,'Use the strongest conceptual relationship rather than matching by similar wording.'].filter(Boolean)};
    if(c.kind==='evidence'){
      // Existing evidence checks select supported statements. v4 makes the rejected alternatives explicit as Overreach.
      const correct=new Set(c.answer||[]),answer=(c.items||[]).map((_,i)=>[i,correct.has(i)?0:2]);
      return {...c,kind:'evidence-lab',lanes:['Supported','Possible','Overreach'],answer,hints:[c.hint,'Ask what the passage/lesson establishes directly and what would require additional evidence.'].filter(Boolean)};
    }
    if(c.kind==='argument')return {...c,kind:'argument-map',hints:[c.hint,'Connect observations to an interpretation before connecting that interpretation to application.'].filter(Boolean)};
    if(c.kind==='scenario')return {...c,hints:[c.hint,'Choose the response that fits both the passage and the stated limits of the evidence.'].filter(Boolean)};
    return c;
  }
  function lessonChallenges(lesson,review=false){return (review&&lesson.reviewChallenges?lesson.reviewChallenges:lesson.challenges||[]).map(adapt);}
  return {adapt,lessonChallenges};
})();
