const {spawnSync}=require('node:child_process');const path=require('node:path');
const tests=[
'v4-all-mastery.test.cjs','v4-placement-fixed.test.cjs','v4-architecture.test.cjs','v4-visual-game-coverage.test.cjs',
'v4-guided-migration.test.cjs','v4-guided-adapter.test.cjs','v4-guided-visuals.test.cjs','v4-guided-progress.test.cjs',
'v4-topics.test.cjs','v4-loader-final.test.cjs','v4-loader-complete.test.cjs','v4-integrated-preview.test.cjs','v4-offline.test.cjs',
'v4-no-template-copy.test.cjs','v4-content-progress.test.cjs','v4-progress.test.cjs'
];
let failed=0;for(const file of tests){const p=spawnSync(process.execPath,[path.resolve(__dirname,'../tests',file)],{stdio:'inherit'});if(p.status!==0)failed++;}if(failed){console.error(`v4 verification failed: ${failed} test file(s)`);process.exit(1);}console.log(`PASS: ${tests.length} v4 verification files`);
