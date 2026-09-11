const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const pub=path.resolve(__dirname,'../public');
const loader=fs.readFileSync(path.join(pub,'v4-loader.js'),'utf8');
const order=['v4-course-map.js','v4-visuals.js','v4-games.js','v4-mastery-content.js','topics-data.js','topics.js','v4-app.js','v4-preview.js'];
let last=-1;for(const file of order){const at=loader.indexOf(file);assert.ok(at>last,`${file} missing or out of order`);last=at;}
assert.ok(loader.includes('v4-design-system.css'));
console.log('PASS v4 preview asset order');
