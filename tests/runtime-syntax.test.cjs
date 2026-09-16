const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const pub = path.resolve(__dirname, '../public');
const loader = fs.readFileSync(path.join(pub, 'foundations-expansion-loader.js'), 'utf8');
const files = [...loader.matchAll(/'([^']+\.js)'/g)].map(m => m[1]);
const styles = [...loader.matchAll(/'([^']+\.css)'/g)].map(m => m[1]);
assert.ok(files.length >= 35, 'loader should expose the full runtime script set');
for (const asset of [...files, ...styles]) {
  assert.ok(fs.existsSync(path.join(pub, asset)), `loader references missing asset ${asset}`);
}
const transpiler = new Bun.Transpiler({ loader: 'js', target: 'browser' });
for (const file of new Set(files)) {
  const source = fs.readFileSync(path.join(pub, file), 'utf8');
  assert.doesNotThrow(() => transpiler.transformSync(source), `${file} failed JavaScript parse check`);
}
console.log(`PASS runtime syntax: ${new Set(files).size} loader scripts parse and all declared assets exist`);
