/* Temporary v4 migration visual rules for the existing guided lessons.
   Explicit lesson-authored visuals override these rules; this prevents the rest of the curriculum from remaining visually empty during migration. */
window.CANON_V4_GUIDED_VISUALS={
  byUnit:{
    1:{type:'story-arc',title:'The Christian story in one glance',beats:[{title:'Creation'},{title:'Covenant'},{title:'Jesus'},{title:'Church'},{title:'New creation'}]},
    2:{type:'stack',title:'Six layers of responsible interpretation',layers:[{title:'Text',text:'What is written?'},{title:'Translation',text:'How is it rendered?'},{title:'Genre',text:'What kind of writing?'},{title:'Context',text:'What situation?'},{title:'Interpretation',text:'What does it mean here?'},{title:'Application',text:'What can travel responsibly?'}]},
    3:{type:'flow',title:'Creation and human responsibility',nodes:[{title:'Gift'},{title:'Vocation'},{title:'Freedom'},{title:'Rupture'},{title:'Care'}]},
    4:{type:'timeline',title:'Covenant and liberation',points:[{title:'Abraham',date:'promise'},{title:'Egypt',date:'enslavement'},{title:'Exodus',date:'liberation'},{title:'Sinai',date:'covenant'},{title:'Wilderness',date:'formation'}]},
    5:{type:'timeline',title:'Land, kingdom, exile, return',points:[{title:'Joshua/Judges'},{title:'United monarchy'},{title:'Divided kingdoms'},{title:'Exile',date:'586 BC'},{title:'Return',date:'from 538 BC'}]},
    6:{type:'compare',title:'Wisdom speaks with more than one voice',columns:[{title:'Patterns',items:['Proverbs','Psalms']},{title:'Questions and limits',items:['Job','Ecclesiastes']}],shared:['Discernment','Worship','Human limits']},
    7:{type:'timeline',title:'Prophets inside history',points:[{title:'Assyrian era'},{title:'Babylonian crisis'},{title:'Exile'},{title:'Return/rebuilding'}]},
    8:{type:'compare',title:'Four Gospel portraits',columns:[{title:'Synoptics',items:['Matthew','Mark','Luke']},{title:'John',items:['Signs','Long dialogues','Distinctive arrangement']}],shared:['Jesus’ ministry','Cross','Resurrection']},
    9:{type:'flow',title:'Saving work and response',nodes:[{title:'Sin/death'},{title:'Christ’s death and resurrection'},{title:'Grace'},{title:'Faith/repentance'},{title:'Reconciled life'}]},
    10:{type:'map-lite',title:'The early movement widens',places:[{title:'Jerusalem',x:390,y:195},{title:'Antioch',x:445,y:115},{title:'Ephesus',x:310,y:122},{title:'Corinth',x:235,y:140},{title:'Rome',x:145,y:83}]},
    11:{type:'relationship',title:'Historic doctrine holds claims together',nodes:[{title:'Father'},{title:'Son'},{title:'Holy Spirit'},{title:'Creation'},{title:'Humanity'}]},
    12:{type:'flow',title:'Practice becomes formation',nodes:[{title:'Prayer'},{title:'Baptism'},{title:'Table'},{title:'Community'},{title:'Neighbor-love'}]},
    13:{type:'spectrum',title:'Traditions organize shared faith differently',positions:[{title:'Authority',text:'Scripture, tradition, reason, community'},{title:'Sacraments',text:'Different accounts of baptism and Communion'},{title:'Polity',text:'Bishops, congregations, presbyteries, networks'}]},
    14:{type:'stack',title:'A method for difficult questions',layers:[{title:'Name the harm/question',text:'Do not sanitize the problem'},{title:'Read the text',text:'Genre and context'},{title:'Check history',text:'Avoid invented background'},{title:'Compare interpretations',text:'Represent actual positions'},{title:'Test application',text:'Dignity, neighbor-love, consequences'}]},
    15:{type:'story-arc',title:'Christian final hope',beats:[{title:'Death is an enemy'},{title:'Resurrection'},{title:'Judgment'},{title:'Defeat of death'},{title:'Renewed creation'}]},
    16:{type:'book-profile',title:'Independent reading toolkit',shelf:'Locate the book',setting:'Place its world',synopsis:'Trace its movement',people:'Identify voices',audience:'Ask who hears it first',purpose:'Build a supported interpretation'}
  }
};
