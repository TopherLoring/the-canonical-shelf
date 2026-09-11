const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const code=fs.readFileSync(path.resolve(__dirname,'../public/v4-progress-migration.js'),'utf8');
assert.ok(code.includes("canon.v4.progress.1"));assert.ok(code.includes('completeMastery'));assert.ok(code.includes('completeLesson'));assert.ok(code.includes('recentTopic'));console.log('PASS v4 progress schema');
