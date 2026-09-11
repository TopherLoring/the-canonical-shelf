/* Optional real-browser v5 smoke test: see tests/README.md. */
const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require(process.env.SHELF_PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.SHELF_BROWSER_PATH?{executablePath:process.env.SHELF_BROWSER_PATH}:{}),args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
 const root=path.resolve(__dirname,'../public');
 const server=http.createServer((req,res)=>{const filename=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));if(!filename.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(filename,(error,data)=>{if(error){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.webmanifest':'application/manifest+json'})[path.extname(filename)]||'text/plain');res.end(data);});});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(15000);
  await page.goto(process.env.SHELF_URL||`http://127.0.0.1:${server.address().port}`,{waitUntil:'domcontentloaded'});
  await page.locator('.v5-header').waitFor();await page.locator('#v5-home-panel').waitFor();
  for(const name of ['Home','Course','Bible','Topics','Practice'])assert.equal(await page.getByRole('navigation',{name:'Primary'}).getByRole('button',{name,exact:true}).count(),1,`missing ${name} nav`);
  assert.equal(await page.locator('.tabbar:visible').count(),0,'legacy tabbar must not be visible');assert.equal(await page.locator('.masthead:visible').count(),0,'legacy masthead must not be visible');
  assert.equal(await page.locator('#v5-home-panel .v5-dashboard').count(),1);assert.equal(await page.locator('.spine-block:visible').count(),0,'bookshelf must not leak onto Home');

  await page.getByRole('button',{name:'Course',exact:true}).click();await page.locator('#panel-learn[data-open="1"]').waitFor();assert.equal(await page.locator('.v5-unit-card').count(),25,'Course must expose all 25 units');assert.equal(await page.locator('#panel-explore:visible,#panel-play:visible,#panel-topics:visible').count(),0,'Course route must isolate other engines');

  await page.getByRole('button',{name:'Bible',exact:true}).click();await page.locator('#panel-explore[data-open="1"]').waitFor();assert.equal(await page.locator('.v5-bible-tools button').count(),4);assert.equal(await page.locator('.spine-block:visible').count(),1,'bookshelf belongs inside Bible');

  await page.getByRole('button',{name:'Topics',exact:true}).click();await page.locator('#panel-topics[data-open="1"]').waitFor();assert.equal(await page.locator('.v5-topic-map button').count(),7);assert.equal(await page.locator('#panel-explore:visible,#panel-play:visible,#panel-learn:visible').count(),0,'Topics route must isolate other engines');

  await page.getByRole('button',{name:'Practice',exact:true}).click();await page.locator('#panel-play[data-open="1"]').waitFor();assert.equal(await page.locator('.v5-practice-map article').count(),6);for(const label of ['Learning map','Practice missions','Theology guide','Book drills'])assert.equal(await page.getByText(label,{exact:true}).filter({visible:true}).count?.()||0,0);

  const profile=page.locator('[data-v5-profile]');await profile.click();await page.locator('#v5-progress-dialog[open]').waitFor();assert.ok((await page.locator('#v5-progress-dialog').textContent()).includes('Profile & progress'));await page.locator('#v5-progress-dialog button[aria-label="Close"]').click();

  const search=page.locator('.v5-tools .search');await search.fill('What is the Trinity?');await search.press('Enter');await page.locator('#panel-topics[data-open="1"]').waitFor();await page.waitForFunction(()=>document.querySelector('#panel-topics')?.textContent.includes('Trinity'));

  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Mobile overflow');await page.setViewportSize({width:1440,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Desktop overflow');
  if(process.env.SHELF_SCREENSHOT)await page.screenshot({path:process.env.SHELF_SCREENSHOT,fullPage:false});

  await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);await page.reload({waitUntil:'domcontentloaded'});await page.locator('.v5-header').waitFor();assert.equal(await page.locator('#v5-home-panel').count(),1,'v5 Home must boot offline');
  assert.deepEqual(errors,[]);console.log('PASS: v5 Chromium navigation, route isolation, Bible-only shelf, 25-unit Course, Topics/Practice maps, profile, site search, responsive layout and offline boot');
 }finally{await browser.close();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exitCode=1;});
