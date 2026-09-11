/* Adds curriculum cross-links and glossary-derived entries to the v4 Topics reference surface. */
(() => {
  'use strict';
  const T=window.CANON_TOPICS;if(!T||!Array.isArray(T.articles))return;
  const course=window.CANON_V4_COURSE;
  const links={
    trinity:19,incarnation:19,'holy-spirit':19,'free-will':19,scripture:2,baptism:20,communion:20,resurrection:15,judgment:18,
    salvation:15,atonement:15,grace:15,'faith-works':17,anxiety:20,grief:20
  };
  for(const a of T.articles){
    if(links[a.id]){const u=course?.units?.find(x=>x.id===links[a.id]);a.courseUnit=u?{id:u.id,title:u.title}:undefined;}
    a.searchText=[a.title,a.answer,...(a.aliases||[]),...(a.tags||[]),...(a.sections||[]).flat()].join(' ').toLowerCase();
  }
  // Build glossary candidates from fully authored mastery modules. They supplement, not override,
  // manually curated definitions in the Topics dataset.
  const glossary=[],seen=new Set();
  for(const m of Object.values(window.CANON_V4_MASTERY||{})){
    const vocab=m.vocab||{};
    for(const [term,definition] of Object.entries(vocab)){
      const key=term.toLowerCase();if(seen.has(key))continue;seen.add(key);glossary.push({term,definition,source:m.title});
    }
  }
  T.glossary=[...(T.glossary||[]),...glossary];
})();
