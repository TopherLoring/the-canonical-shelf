const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const pub=path.resolve(__dirname,'../public');
const index=fs.readFileSync(path.join(pub,'index.html'),'utf8');
const loader=fs.readFileSync(path.join(pub,'foundations-expansion-loader.js'),'utf8');
const bridge=fs.readFileSync(path.join(pub,'v4-shell-bridge.js'),'utf8');
const sw=fs.readFileSync(path.join(pub,'sw.js'),'utf8');

for(const [id,label] of [['tab-play','Practice'],['tab-explore','Explore'],['tab-learn','Learn'],['tab-verses','Verses']]){
  assert.ok(index.includes(`id="${id}"`),`full shell missing ${id}`);
  assert.ok(index.includes(`data-tab="${id.replace('tab-','')}"`),`${id} must retain its legacy route key`);
  assert.ok(index.includes(`>${label}</button>`),`${id} baseline label changed before the v4 bridge can enhance it`);
}
for(const panel of ['panel-play','panel-explore','panel-learn','panel-verses'])assert.ok(index.includes(`id="${panel}"`),`full shell missing ${panel}`);
assert.ok(index.includes('id="search"')&&index.includes('placeholder="Search the Bible"'),'global Bible search must remain in the full shell');
assert.ok(index.includes('if(S.tab!=="verses"){ setTab("verses")'),'global search must continue routing to the Bible/Verses search surface');
assert.ok(index.includes('<script src="./foundations-expansion-loader.js"></script>'),'full shell must load the v4 expansion/integration loader');

for(const css of ['v4-design-system.css','v4-integrated.css'])assert.ok(loader.includes(`'${css}'`),`full-shell loader missing ${css}`);
const order=[
  'v4-course-map.js','v4-guided-visual-rules.js','v4-curriculum-migration.js','v4-visuals.js','v4-games.js','v4-guided-game-adapter.js','v4-progress-migration.js','v4-guided-shell.js',
  'v4-mastery-content.js','v4-mastery-story.js','v4-mastery-order.js','v4-mastery-groups.js','v4-mastery-chrono.js','v4-mastery-content-profiles.js','v4-mastery-themes.js','v4-mastery-verses.js','v4-mastery-manifest.js',
  'topics-data.js','topics-extended.js','v4-topic-bridge.js','topics.js','v4-topics-enhance.js','v4-app-integrated.js','v4-shell-bridge.js'
];
let last=-1;for(const file of order){const i=loader.indexOf(`'${file}'`);assert.ok(i>last,`${file} missing or out of order in full-shell loader`);last=i;}

assert.ok(bridge.includes("const legacyRenderLearn=typeof window.renderLearn==='function'?window.renderLearn:null"),'bridge must retain the legacy Learn renderer as a failure fallback');
assert.ok(bridge.includes("tab.textContent='Course'"),'bridge must rename the learner-facing Learn tab to Course');
assert.ok(bridge.includes("window.CanonV4Integrated.mount(panel)"),'bridge must mount the integrated v4 course into the existing Learn panel');
assert.ok(bridge.includes('window.renderLearn=mountCourse'),'legacy setTab("learn") routing must resolve to v4 Course after the bridge loads');
assert.ok(bridge.includes("document.getElementById('panel-learn')"),'bridge must reuse the existing Learn panel rather than create a duplicate shell');
assert.ok(bridge.includes('legacyRenderLearn?.()'),'bridge must fail back to the existing learner surface if v4 cannot initialize');
assert.ok(!bridge.includes("removeChild")&&!bridge.includes(".remove()"),'bridge must not delete existing Explore/Search/Verses shell elements');
assert.ok(sw.includes('./v4-shell-bridge.js'),'service worker must cache the full-shell bridge');

console.log('PASS v4 full-shell integration: Course mounts into Learn while Practice, Explore, Verses, and Bible search remain intact');
