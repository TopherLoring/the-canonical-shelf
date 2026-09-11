(() => {
  'use strict';
  const E=window.CANON_EXPAND, D=E?.D;
  if(!D) throw Error('Expansion data missing');

  if(!Array.isArray(D.skillTracks) || !Array.isArray(D.skillMissions) || D.skillMissions.length!==69){
    throw Error('Integrated Bible-skill curriculum must load before expansion metadata.');
  }
  const missionById=new Map(D.skillMissions.map(m=>[m.id,m]));
  for(const l of D.lessons){
    const tracks=[...new Set((l.skillMissions||[]).map(id=>missionById.get(id)?.track).filter(Boolean))];
    l.tracks=tracks;
  }

  const themePairs=[
    ['Covenant','Genesis 12:1–3','Jeremiah 31:31–34','Compare promise extending outward with the language of a new covenant. Identify the audiences before drawing a Christian theological connection.'],
    ['Exile and return','Psalm 137:1–6','Ezra 1:1–6','Compare the voice of loss with the opening of a return. What does each genre reveal that the other does not?'],
    ['Kingdom and king','1 Samuel 8:10–18','Mark 1:14–15','Distinguish a warning about human kingship from the announcement of God’s reign. Shared vocabulary is not identical content.'],
    ['Sacrifice and atonement','Leviticus 16:29–34','Hebrews 10:11–18','Observe the ritual setting and Hebrews’ interpretation of Christ’s work. Describe the Christian argument without erasing the earlier setting.'],
    ['Wilderness and testing','Deuteronomy 8:1–5','Matthew 4:1–4','How does the Gospel quotation connect Jesus’ testing with Israel’s wilderness memory?'],
    ['Remnant','Isaiah 10:20–23','Romans 11:1–6','Ask how a remaining people functions within each argument; avoid using the image to claim God discarded Israel.'],
    ['Temple and presence','1 Kings 8:27–30','Revelation 21:22–27','Compare prayer toward the temple with a vision that needs no temple building. How is divine presence described?'],
    ['Judgment','Amos 5:18–24','Matthew 25:31–40','Identify what conduct is challenged in each setting before developing a shared account of accountability.'],
    ['Mercy and steadfast love','Jonah 4:1–11','Luke 15:1–10','Compare resistance to mercy with resistance to welcome. Which reaction is each story asking its audience to examine?'],
    ['Redemption and rescue','Exodus 6:5–8','Ephesians 1:7–10','Compare liberation language with redemption through Christ. Explain the connection without making the circumstances identical.'],
    ['Wisdom','Proverbs 26:4–5','James 3:13–18','Compare situational judgment with the conduct associated with wisdom. How would you recognize wisdom in a real response?'],
    ['Faithfulness under pressure','Daniel 3:16–18','Hebrews 11:35–40','Notice outcomes that are not reduced to immediate rescue. Does faithfulness function as a guaranteed-success formula?'],
    ['Worship and lament','Psalm 13:1–6','Acts 16:22–25','Compare prayer in distress with prayer and song in imprisonment. Avoid imposing one emotional timetable on every sufferer.'],
    ['Mission outward','Genesis 12:1–3','Acts 1:6–8','Compare blessing reaching beyond one family with a widening witness. Identify the distinct audiences and commissions.']
  ];
  const project=D.lessons.find(l=>l.id==='project-interpret');
  if(project){
    project.comparisons=themePairs.map(([title,a,b,prompt])=>({title,reading:`${a} ↔ ${b}`,prompt}));
    project.body.push('Fourteen comparison prompts are available below. Choose one pair for your project now and return to the others as a continuing study library. The goal is to explain development across books, not merely recognize a repeated theme label.');
  }


  const denominationSources=[
    ['ELCA: beliefs and Lutheran identity','https://www.elca.org/about-the-elca/who-we-are'],
    ['United Church of Christ: what we believe','https://www.ucc.org/what-we-believe/'],
    ['United Methodist Church: distinctive Wesleyan emphases','https://www.umc.org/en/content/distinctive-wesleyan-emphases'],
    ['Metropolitan Community Churches: what we believe','https://insidemcc.org/about-mcc/what-we-believe/'],
    ['Christian Church (Disciples of Christ): our identity','https://disciples.org/our-identity/'],
    ['The Episcopal Church: what we believe','https://www.episcopalchurch.org/who-we-are/what-we-believe/'],
    ['Alliance of Baptists: theological home and mission','https://www.allianceofbaptists.org/about-1']
  ];
  for(const [title,url] of denominationSources) if(!D.sources?.some(s=>s.url===url)) (D.sources||(D.sources=[])).push({title,url});
  const traditionLesson=D.lessons.find(l=>l.id==='traditions-welcome');
  if(traditionLesson) traditionLesson.sources=denominationSources.map(x=>x[1]);

  // Keep units grouped while preserving the original lesson first in each unit.
  D.lessons.sort((a,b)=>a.unit-b.unit);
  const counts=D.units.map(u=>D.lessons.filter(l=>l.unit===u.id).length);
  if(D.lessons.length!==70 || counts.some(n=>n<4||n>5)) console.error('Curriculum expansion count mismatch',D.lessons.length,counts);


  delete window.CANON_EXPAND.metaPending;
})();
