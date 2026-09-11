const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const pub=path.resolve(__dirname,'../public');
const visuals=fs.readFileSync(path.join(pub,'v4-visuals.js'),'utf8');
const games=fs.readFileSync(path.join(pub,'v4-games.js'),'utf8');
for(const type of ['timeline','flow','compare','shelf','story-arc','relationship','theme-thread','verse-context','book-profile','spectrum','stack','map-lite'])assert.ok(visuals.includes(type),`visual renderer missing ${type}`);
for(const type of ['timeline-sort','sequence-path','match-board','evidence-lab','context-lens','argument-map','compare-board','scenario','verse-rebuild','book-detective','theme-trace','capstone'])assert.ok(games.includes(type),`game renderer missing ${type}`);
assert.ok(games.includes('prefers-reduced-motion')||fs.readFileSync(path.join(pub,'v4-design-system.css'),'utf8').includes('prefers-reduced-motion'),'reduced-motion support missing');
console.log('PASS v4 visual/game renderer coverage');
