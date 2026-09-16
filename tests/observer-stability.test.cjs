const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { parseHTML } = require('linkedom');

async function verify(file, fixture, check) {
  const { window, document } = parseHTML(`<html><body>${fixture}</body></html>`);
  const observers = [];
  let deliveries = 0;
  const storage = new Map();
  class BoundedObserver {
    constructor(callback) {
      this.inner = new window.MutationObserver(records => {
        records = records.filter(r => this.options[r.type]);
        if (!records.length) return;
        deliveries++;
        if (deliveries > 20) { observers.forEach(o => o.disconnect()); return; }
        callback(records);
      });
      observers.push(this);
    }
    observe(target, options) { this.options = options; this.inner.observe(target, options); }
    disconnect() { this.inner.disconnect(); }
  }
  const context = vm.createContext({
    window, document, MutationObserver: BoundedObserver, queueMicrotask,
    setTimeout, console, NodeFilter: { SHOW_TEXT: 4 },
    location: { hash: '' }, Event: window.Event, CustomEvent: window.CustomEvent,
    localStorage: { getItem: k => storage.get(k) ?? null, setItem: (k,v) => storage.set(k,v) }
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../public', file), 'utf8'), context);
  document.body.appendChild(document.createElement('hr'));
  await new Promise(resolve => setTimeout(resolve, 30));
  assert.ok(deliveries < 10, `${file}: DOM updates failed to settle (${deliveries} observer deliveries)`);
  await check(window, document);
  await new Promise(resolve => setTimeout(resolve, 30));
  assert.ok(deliveries < 15, `${file}: state change triggered a feedback loop`);
  observers.forEach(o => o.disconnect());
}

(async () => {
  await verify('v5-learning-experience.js', '<button data-v5-profile>Progress</button>', (w,d) => {
    w.CanonV5Learning.state.stars = 3;
    w.CanonV5Learning.audit();
    assert.equal(d.querySelector('[data-v5-stars]').textContent, '\u2605 3');
  });
  await verify('v5-progress-adapter.js', `<section id="v5-home-panel">
    <div class="v5-home__actions"><button data-v5-go="course"><b></b><span></span></button></div>
    <div class="v5-dashboard__progress"><h2></h2><div class="v5-progress-ring"><strong></strong><span></span></div></div>
    <article class="v5-dashboard__card">Suggested next activity<h3></h3></article>
  </section>`, (w,d) => {
    w.FOUNDATIONS_DATA = { lessons: [{ id:'lesson-1', title:'First lesson', unit:1 }], skillMissions:[] };
    w.CanonV4Progress = { exportState: () => ({ lessons: { 'lesson-1': { done:true } } }) };
    w.CanonV5Progress.refresh();
    assert.equal(d.querySelector('.v5-progress-ring span').textContent, '1/139');
  });
  console.log('PASS learning and progress observers settle and still render changed state');
})().catch(error => { console.error(error); process.exitCode = 1; });
