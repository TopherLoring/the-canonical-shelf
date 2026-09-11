const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const pub=path.resolve(__dirname,'../public'),s=fs.readFileSync(path.join(pub,'v4-loader-complete.js'),'utf8');
for(const f of ['v4-course-map.js','v4-guided-game-adapter.js','v4-mastery-story.js','v4-mastery-order.js','v4-mastery-groups.js','v4-mastery-chrono.js','v4-mastery-content-profiles.js','v4-mastery-themes.js','v4-mastery-verses.js','v4-curriculum-migration.js','v4-guided-shell.js','topics-data.js','topics-extended.js','topics.js','v4-app-integrated.js'])assert.ok(s.includes(f),`complete loader missing ${f}`);
assert.ok(s.includes('v4-integrated.css'),'complete loader missing integrated path styles');assert.ok(!s.includes('v4-course-map-fixed.js'),'temporary course-map shim returned');
console.log('PASS authoritative integrated v4 loader assets');
