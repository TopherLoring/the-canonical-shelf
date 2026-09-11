/* Canonical Shelf integrated Bible-skill curriculum.
   Rebuilds the original 69 track steps as guided skill missions embedded in the 16-unit course.
   The legacy drill engine remains the assessment engine; the legacy seven-track menu is no longer
   the primary instructional surface. */
(() => {
  'use strict';

  const D = window.FOUNDATIONS_DATA;
  if (!D || !Array.isArray(D.lessons) || !Array.isArray(D.units)) throw new Error('Foundations data must load before integrated skills.');
  if (D.skillMissions) return;
  const SOURCE=window.CANON_SKILL_SOURCE;
  if(!SOURCE) throw new Error('Original Bible-skill source must load before integrated skills.');

  const TRACKS = {
    story: {
      title:'The Story',
      purpose:'Trace the biblical arc and connect each movement with the books that carry it.',
      objective:s=>`Place “${s.title}” inside the larger biblical story and identify the books that carry this movement.`,
      simple:'Know what happens here, where it belongs in the larger story, and which books carry it.',
      deeper:'A story arc is a navigation model, not a claim that every biblical book is narrative or that every tradition summarizes the canon in exactly the same way.',
      vocab:[['Arc','A sequence of connected movements that gives the larger story shape.'],['Hinge','An event or transition that changes what follows.'],['Continuity','A meaningful connection between one movement of the story and another.']],
      reflect:s=>`If you had to explain “${s.title}” to someone who had never read the Bible, what would you include—and what would you avoid oversimplifying?`,
      model:'I would name the main movement, the books that carry it, and one connection to what comes before or after without pretending every book works the same way.'
    },
    order: {
      title:'Order',
      purpose:'Reconstruct the shelf in manageable runs until the whole 66-book order can be produced.',
      objective:s=>`Reconstruct the canonical position of “${s.title}” and use its boundaries to find neighboring books reliably.`,
      simple:'Learn this run as a usable map, not merely as a chant.',
      deeper:'Canonical order is a navigation convention. It is not the same thing as chronology, composition date, or importance, and Catholic and Orthodox collections differ from this 66-book Protestant shelf.',
      vocab:[['Canon','A community’s recognized collection of scriptural books.'],['Shelf order','The order in which books appear in this edition.'],['Boundary','The first or last book that marks the edge of a shelf group or run.']],
      reflect:s=>`What anchor would help you recover “${s.title}” if you forgot the middle of the sequence?`,
      model:'I would use a reliable boundary, neighboring book, or structural rule so I could reconstruct the run instead of relying on one fragile memorized string.'
    },
    groups: {
      title:'Groups',
      purpose:'Use shelf groups as navigation while distinguishing those labels from literary genre.',
      objective:s=>`Identify the boundaries and reading strategy associated with “${s.title}” without confusing shelf group with literary genre.`,
      simple:'Know this neighborhood of the shelf and adjust how you read when the literary form changes.',
      deeper:'A shelf group can contain several literary forms. Narrative, poetry, law, genealogy, prophecy, correspondence, and symbolic vision may appear inside the same book.',
      vocab:[['Shelf group','An organizational neighborhood used to locate books.'],['Genre','A literary form whose conventions shape how a text communicates.'],['Reading strategy','Questions and expectations appropriate to a text’s literary form and setting.']],
      reflect:s=>`What reading mistake becomes less likely once you understand “${s.title}”?`,
      model:'I would first identify the kind of writing in the passage, then use the shelf group as orientation rather than assuming every book in the group behaves identically.'
    },
    chrono: {
      title:'Chronology',
      purpose:'Separate shelf order, narrated setting, historical sequence, and composition.',
      objective:s=>`Use “${s.title}” to place events on a qualified teaching timeline while keeping shelf position and composition distinct.`,
      simple:'Ask when the events happen, when the text was written or shaped, and where the book sits on the shelf as separate questions.',
      deeper:'Biblical dating is uneven in certainty. Anchor dates can orient a teaching timeline, but disputed dates and authorship should remain visibly qualified rather than presented as settled fact.',
      vocab:[['Narrated setting','The time period depicted by a passage or book.'],['Composition','The writing, collection, or shaping of a text.'],['Anchor date','A comparatively well-established date used to orient nearby events.']],
      reflect:s=>`Where could “${s.title}” be misunderstood if shelf order were treated as historical order?`,
      model:'I would name the narrated era first, then distinguish any proposed composition date and explain the level of certainty.'
    },
    content: {
      title:'Content',
      purpose:'Build accurate book profiles from summaries, casts, openings, authorship information, and audiences.',
      objective:s=>`Use “${s.title}” to recognize what a biblical book contains and distinguish textual observation from background reconstruction.`,
      simple:'Know what the book is doing, who appears in it, and what evidence supports claims about author and audience.',
      deeper:'Traditional attribution, internal claims, and modern scholarly reconstruction are different kinds of evidence. A responsible profile can preserve uncertainty instead of forcing a single answer.',
      vocab:[['Synopsis','A concise account of what a work contains or does.'],['Audience','The people a work addresses or appears intended to address.'],['Attribution','A claim about authorship or source, with varying kinds and strengths of evidence.']],
      reflect:s=>`Which claim in “${s.title}” would you want to verify directly from the book before repeating it?`,
      model:'I would separate what the text explicitly presents from what tradition or scholarship reconstructs, then label uncertainty instead of hiding it.'
    },
    themes: {
      title:'Themes',
      purpose:'Trace recurring concerns across books while preserving each passage’s context and development.',
      objective:s=>`Trace the thread in “${s.title}” across more than one book and explain both continuity and change.`,
      simple:'Follow the connection across books without making every passage say the same thing.',
      deeper:'A repeated English word does not by itself prove a biblical theme. Compare function, audience, literary setting, and development before claiming continuity.',
      vocab:[['Theme','A recurring concern developed across texts.'],['Development','The way a theme changes, expands, or is reinterpreted across contexts.'],['Context','The literary, historical, and argumentative setting that constrains meaning.']],
      reflect:s=>`What difference between two passages would you need to preserve when tracing “${s.title}”?`,
      model:'I would state the shared concern, then explain how each passage uses it differently before drawing a larger connection.'
    },
    verses: {
      title:'Verses',
      purpose:'Recall significant passages together with book, speaker, recipient, theme, and wording.',
      objective:s=>`Practice “${s.title}” so verse recall remains attached to speaker, recipient, book, and context.`,
      simple:'Remember the words and the situation they belong to.',
      deeper:'A verse can be quoted accurately and still be interpreted badly. Speaker, recipient, surrounding argument, genre, and translation all matter.',
      vocab:[['Speaker','The voice delivering the words in their literary setting.'],['Recipient','The person or group addressed.'],['Reconstruction','Producing wording from memory rather than merely recognizing it.']],
      reflect:s=>`How could a verse in “${s.title}” be misused if its speaker or recipient were ignored?`,
      model:'I would identify who is speaking, to whom, and why before treating the wording as a direct statement to a modern reader.'
    }
  };

  const UNIT_BY_STEP = {};
  const place=(unit, ids)=>ids.split(/\s+/).filter(Boolean).forEach(id=>UNIT_BY_STEP[id]=unit);

  place(3,'s.1');
  place(4,'s.2 s.3 o.law g.law t.cov');
  place(5,'s.4 s.5 s.7 s.8 o.hist1 o.hist2 o.hist3 g.hist c.anchor c.oop n.people1 t.exile');
  place(6,'o.wisdom g.wis');
  place(7,'s.6 o.major o.minor1 o.minor2 o.minor3 o.ot g.major g.minor c.proph v.proph');
  place(8,'s.9 o.gospels g.gospel');
  place(9,'t.sac t.mercy');
  place(10,'s.10 o.paul1 o.paul2 o.paul3 o.general o.nt g.paul g.gen c.paul n.nt n.people2 t.faith');
  place(12,'v.love v.fruit');
  place(15,'g.proph');
  place(16,'o.all g.all c.all n.all t.all v.build v.all');
  place(2,'g.map g.edges c.two c.eras n.what n.plot n.author n.audience t.what v.what v.speaker');
  place(14,'v.strength');

  const strip=s=>String(s||'').replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
  const trackList=Object.keys(TRACKS);
  const source=[];
  for(const track of trackList){
    const steps=SOURCE[track];
    if(!Array.isArray(steps)) throw new Error(`Missing original ${track} steps.`);
    for(const step of steps) source.push({track,step});
  }
  if(source.length!==69) throw new Error(`Expected 69 original skill steps, found ${source.length}.`);

  function bodyFor(track,step){
    const T=TRACKS[track];
    const facts=(step.list||[]).map(strip).filter(Boolean);
    const p1=strip(step.body);
    const p2=track==='order'
      ? 'Treat the sequence as a recoverable map. Use boundaries, neighboring books, repeated names, and structural rules so a forgotten item can be reconstructed rather than guessed.'
      : track==='groups'
      ? 'Use the shelf label to find the book, then identify the actual literary form in the passage before deciding how literally, poetically, narratively, or rhetorically to read it.'
      : track==='chrono'
      ? 'Keep four layers visible: shelf position, narrated events, historical reconstruction, and composition. Agreement in one layer does not automatically settle the others.'
      : track==='content'
      ? 'Build the book profile from evidence: what the text opens with, whom it names, what problem or story it develops, and what can responsibly be said about author and audience.'
      : track==='themes'
      ? 'Trace the concern in more than one setting. The aim is not to collect matching labels but to explain what remains continuous and what changes as the theme moves through the canon.'
      : track==='verses'
      ? 'Recall is strongest when wording stays attached to location and context. Book, speaker, recipient, and surrounding argument are part of knowing the passage.'
      : 'Place this movement between what precedes and follows it. The point is to understand why the next movement becomes necessary, not merely to memorize ten labels.';
    const p3=facts.length
      ? `Key anchors: ${facts.join(' · ')}`
      : `Use the mission title and subtitle—${strip(step.sub)}—as retrieval anchors, then explain the idea in your own words before checking it.`;
    const p4=step.tip
      ? `Working cue: ${strip(step.tip)} This is a memory aid, not a substitute for the underlying context.`
      : `${T.deeper} After the check, explain one answer in context rather than stopping at recognition.`;
    return [p1,p2,p3,p4];
  }

  function mission(track,step){
    const T=TRACKS[track];
    const unit=UNIT_BY_STEP[step.id];
    if(!unit) throw new Error(`No curriculum placement for ${step.id}`);
    return {
      id:`skill-${step.id.replace(/\./g,'-')}`,
      legacyId:step.id,
      track,
      trackTitle:T.title,
      unit,
      title:strip(step.title),
      sub:strip(step.sub),
      objective:T.objective(step),
      body:bodyFor(track,step),
      simple:T.simple,
      vocab:Object.fromEntries(T.vocab),
      deeper:T.deeper,
      reflect:T.reflect(step),
      model:T.model,
      originalCheck:JSON.parse(JSON.stringify(step.check||{})),
      sourceCoverage:{body:strip(step.body),list:(step.list||[]).map(strip),tip:strip(step.tip)}
    };
  }

  D.skillTracks=trackList.map(id=>({id,title:TRACKS[id].title,steps:SOURCE[id].length,purpose:TRACKS[id].purpose}));
  D.skillMissions=source.map(({track,step})=>mission(track,step));

  // Integrate the 69 missions into the 70-lesson path. Missions are distributed only within
  // their pedagogically relevant unit, keeping the guided course as the single primary path.
  for(const lesson of D.lessons) lesson.skillMissions=[];
  for(const unit of D.units){
    const lessons=D.lessons.filter(l=>l.unit===unit.id);
    const missions=D.skillMissions.filter(m=>m.unit===unit.id);
    if(!lessons.length && missions.length) throw new Error(`No guided lessons available for skill missions in unit ${unit.id}.`);
    missions.forEach((m,i)=>{
      const target=lessons[i%lessons.length];
      target.skillMissions.push(m.id);
      m.lessonId=target.id;
      m.connectedReading=target.reading;
      m.connectedRef=target.ref;
    });
  }

  D.integratedCurriculum={
    guidedLessons:D.lessons.length,
    skillMissions:D.skillMissions.length,
    tracks:D.skillTracks.length,
    model:'one-curriculum',
    progressMeaning:'Guided lesson completion and embedded skill-mission completion are complementary requirements inside one learning path.'
  };
})();
