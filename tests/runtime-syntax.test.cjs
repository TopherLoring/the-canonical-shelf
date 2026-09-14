const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawnSync}=require('node:child_process');
const pub=path.resolve(__dirname,'../public'),loader=fs.readFileSync(path.join(pub,'foundations-expansion-loader.js'),'utf8');
const files=[...loader.matchAll(/'([^']+\.js)'/g)].map(m=>m[1]);
const styles=[...loader.matchAll(/'([^']+\.css)'/g)].map(m=>m[1]);
assert.ok(files.length>=35,'loader should expose the full runtime script set');
for(const asset of [...files,...styles])assert.ok(fs.existsSync(path.join(pub,asset)),`loader references missing asset ${asset}`);
for(const file of new Set(files)){
  const full=path.join(pub,file),out=spawnSync(process.execPath,['--check',full],{encoding:'utf8'});
  assert.equal(out.status,0,`${file} failed JavaScript parse check:\n${out.stderr||out.stdout}`);
}
console.log(`PASS runtime syntax: ${new Set(files).size} loader scripts parse and all declared assets exist`);
