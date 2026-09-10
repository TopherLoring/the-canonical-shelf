/* Optional real-browser smoke test: see tests/README.md. */
const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require(process.env.SHELF_PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.SHELF_BROWSER_PATH?{executablePath:process.env.SHELF_BROWSER_PATH}:{}),args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
 const root=path.resolve(__dirname,'../public');
 const server=http.createServer((req,res)=>{const filename=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));if(!filename.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(filename,(error,data)=>{if(error){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.webmanifest':'application/manifest+json'})[path.extname(filename)]||'text/plain');res.end(data);});});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 try{
 const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(12000);
 await page.route('https://fonts.googleapis.com/**',route=>route.abort());await page.route('https://fonts.gstatic.com/**',route=>route.abort());
 await page.goto(process.env.SHELF_URL||`http://127.0.0.1:${server.address().port}`,{waitUntil:'domcontentloaded'});
 const learn=page.locator('#panel-learn');
 await learn.getByRole('heading',{name:'A guided beginning',exact:true}).waitFor();
 assert.equal(await learn.locator('.fd-grid .fd-card').count(),23);
 await learn.locator('#fd-unit-select').selectOption('11');assert.equal(await learn.locator('.fd-grid .fd-card').count(),1);
 await learn.getByRole('button',{name:'Open lesson',exact:true}).click();
 await page.waitForFunction(()=>document.querySelector('#fd-passage')?.textContent.includes('Galilee'));
 await learn.getByText('Read John 1:1–18 · Berean Standard Bible',{exact:true}).click();
 assert.ok((await learn.locator('#fd-extra-0').textContent()).includes('Word'));
 const note='<note>my reflection & questions</note>';await learn.locator('#fd-note').evaluate(el=>el.closest('details').open=true);await learn.locator('#fd-note').fill(note);
 await learn.getByRole('button',{name:'Begin understanding mission',exact:true}).click();
 await learn.getByRole('button',{name:'Test your construction',exact:true}).click();assert.ok((await learn.locator('#fd-feedback').textContent()).includes('Not yet'));
 await learn.getByRole('button',{name:'Reveal a hint',exact:true}).click();
 await learn.getByRole('button',{name:'Revisit the lesson',exact:true}).click();assert.equal(await learn.locator('#fd-note').inputValue(),note);
 await learn.getByRole('button',{name:'Resume your mission',exact:true}).click();
 await learn.locator('[data-clue="0"]').check();await learn.locator('[data-clue="1"]').check();
 await learn.getByRole('button',{name:'Test your construction',exact:true}).click();await learn.getByRole('button',{name:'Next challenge',exact:true}).click();
 const answers=[1,2,0];for(let i=0;i<3;i++)await learn.locator(`[data-match="${i}"]`).selectOption(String(answers[i]));
 await learn.getByRole('button',{name:'Test your construction',exact:true}).click();await learn.getByRole('button',{name:'Complete mission',exact:true}).click();
 assert.ok((await learn.locator('h2').textContent()).includes('Milestone earned'));
 await page.reload({waitUntil:'domcontentloaded'});await learn.getByRole('heading',{name:'A guided beginning',exact:true}).waitFor();
 assert.ok(await page.evaluate(()=>Foundations.exportState().lessons.doctrine.passed));
 await learn.locator('#fd-unit-select').selectOption('11');await learn.getByRole('button',{name:'Open lesson',exact:true}).click();assert.equal(await learn.locator('#fd-note').inputValue(),note);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Mobile overflow');
 if(process.env.SHELF_SCREENSHOT)await page.screenshot({path:process.env.SHELF_SCREENSHOT,fullPage:false});
 // Exercise the new directed map using real select controls and buttons.
 await learn.getByRole('button',{name:'Learning map',exact:true}).click();await learn.locator('#fd-unit-select').selectOption('1');
 await learn.locator('[data-fd="lesson"][data-id="begin"]').click();await learn.getByRole('button',{name:'Begin understanding mission',exact:true}).click();
 const tasks=await page.evaluate(()=>FOUNDATIONS_DATA.lessons.find(l=>l.id==='begin').challenges);
 for(const task of tasks){
  if(task.kind==='sequence'){for(let target=0;target<task.answer.length;target++){let order=await learn.locator('.fd-order li span').allTextContents();let pos=order.indexOf(task.items[task.answer[target]]);while(pos>target){await learn.locator(`[data-fd="up"][data-i="${pos}"]`).click();pos--;}}}
  else if(task.kind==='match'){for(let i=0;i<task.answer.length;i++)await learn.locator(`[data-match="${i}"]`).selectOption(String(task.answer[i]));}
  else if(task.kind==='evidence'){for(const i of task.answer)await learn.locator(`[data-clue="${i}"]`).check();}
  else if(task.kind==='argument'){
   const connect=async(a,b)=>{await learn.locator('#fd-from').selectOption(String(a));await learn.locator('#fd-to').selectOption(String(b));await learn.getByRole('button',{name:'Add connection',exact:true}).click();};
   await connect(0,4);await learn.getByRole('button',{name:'Test your construction',exact:true}).click();assert.ok((await learn.locator('#fd-feedback').textContent()).includes('Not yet'));await learn.getByRole('button',{name:'Remove connection 1',exact:true}).click();
   for(const [a,b] of task.answer)await connect(a,b);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Argument map mobile overflow');
   if(process.env.SHELF_SCREENSHOT){await learn.locator('#fd-from').scrollIntoViewIfNeeded();await page.screenshot({path:process.env.SHELF_SCREENSHOT.replace('.png','-map.png'),fullPage:false});}
  }
  await learn.getByRole('button',{name:'Test your construction',exact:true}).click();await learn.locator('[data-fd="next"]').click();
 }
 assert.ok((await learn.locator('h2').textContent()).includes('Milestone earned'));
 await page.getByRole('tab',{name:'Practice',exact:true}).click();assert.ok(await page.locator('#panel-play').getByRole('heading',{name:'Practice understanding',exact:true}).isVisible());
 await page.locator('#panel-play').getByRole('button',{name:'Book drills',exact:true}).click();await page.getByRole('button',{name:'Return to guided learning',exact:true}).click();
 await page.getByRole('tab',{name:'Explore',exact:true}).click();await page.locator('#panel-explore .card').first().click();await page.waitForFunction(()=>document.querySelectorAll('.reader-verse').length===31);
 await page.setViewportSize({width:1440,height:1000});await page.getByRole('tab',{name:'Learn',exact:true}).click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Desktop overflow');
 // The service worker must make the lesson data and corpus available offline.
 await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
 await page.reload({waitUntil:'domcontentloaded'});await learn.getByRole('heading',{name:'A guided beginning',exact:true}).waitFor();await learn.locator('#fd-unit-select').selectOption('3');await learn.getByRole('button',{name:'Open lesson',exact:true}).click();await page.waitForFunction(()=>document.querySelector('#fd-passage')?.textContent.includes('image'));
 assert.deepEqual(errors,[]);console.log('PASS: Chromium mobile/desktop navigation, real inputs, failed/complete mission, hints, lesson resume, note/progress reload, legacy return, full chapter, overflow, directed argument creation/removal, and offline reload with corpus');
 }finally{await browser.close();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exitCode=1;});
