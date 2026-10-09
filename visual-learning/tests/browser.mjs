// Optional real-browser suite. Missing binaries => NOT RUN (exit 2), never a pass.
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {existsSync} from 'node:fs';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {resources} from '../app/manifest.js';
let playwright;
try {
  const require=createRequire(import.meta.url);
  const paths=[process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES].filter(Boolean);
  playwright=require(require.resolve('playwright',{paths:[fileURLToPath(new URL('../',import.meta.url)),...paths]}));
} catch {
  console.error('NOT RUN: Playwright package unavailable. App itself has no package dependency.');process.exit(2);
}
// Use an existing Chrome / Edge installation without downloading a browser.
const channel=process.env.BROWSER_CHANNEL?.trim(),customExecutable=process.env.BROWSER_EXECUTABLE_PATH?.trim();
if(channel&&!['chrome','msedge'].includes(channel)) {console.error('NOT RUN: BROWSER_CHANNEL must be chrome or msedge.');process.exit(2);}
if(channel&&customExecutable) {console.error('NOT RUN: Set either BROWSER_CHANNEL or BROWSER_EXECUTABLE_PATH, not both.');process.exit(2);}
const executable=customExecutable||(!channel?playwright.chromium.executablePath():null);
if(executable&&!existsSync(executable)) {console.error('NOT RUN: Browser binary unavailable at '+executable);process.exit(2);}
const launchOptions={headless:true,...(channel?{channel}:{}),...(customExecutable?{executablePath:customExecutable}:{})};
let server;
const base=process.env.VISUAL_BASE_URL||'http://127.0.0.1:8765';
const app=base+'/visual-learning/app/';
let browser;
try {
  if(!process.env.VISUAL_BASE_URL) {
    server=spawn('python',['-m','http.server','8765','--bind','127.0.0.1'],{cwd:fileURLToPath(new URL('../../',import.meta.url)),stdio:'ignore'});
    let ready=false;
    for(let i=0;i<25;i++){try{const response=await fetch(app);if(response.ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,100));}
    assert.ok(ready,'Python static server did not start');
  }
  browser=await playwright.chromium.launch(launchOptions);
  console.log('Browser '+browser.version()+'; '+(channel?'channel='+channel:'executable='+executable));
  const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[],badResponses=[],failedRequests=[],externalRequests=[],faviconRequests=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  page.on('response',r=>{if(r.status()>=400)badResponses.push(r.url()+' '+r.status());});
  page.on('requestfailed',r=>failedRequests.push(r.url()+' '+r.failure()?.errorText));
  page.on('request',r=>{if(!r.url().startsWith(base))externalRequests.push(r.url());if(new URL(r.url()).pathname==='/favicon.ico')faviconRequests.push(r.url());});
  // Synthetic developer acknowledgement only; no real learner attempt is asserted or recorded.
  const unlock=async()=>{await page.locator('#baseline-saved').check();await page.locator('#coach-selected').check();await page.getByRole('button',{name:'確認後開啟',exact:true}).click();};
  await page.goto(app);
  assert.equal(await page.locator('.resource-card').count(),0);assert.equal(await page.locator('.formula-lines').count(),0);
  assert.equal(await page.getByRole('button',{name:'確認後開啟',exact:true}).isEnabled(),false);
  await page.locator('#baseline-saved').check();assert.equal(await page.getByRole('button',{name:'確認後開啟',exact:true}).isEnabled(),false);
  await unlock();await page.locator('.resource-card').first().waitFor();assert.equal(await page.locator('.resource-card').count(),74);
  await page.locator('#search').fill('KV Cache');assert.equal(await page.locator('.resource-card').count(),1);await page.locator('#search').fill('');
  await page.locator('#type').selectOption('Local Interactive');assert.equal(await page.locator('.resource-card').count(),24);await page.locator('#type').selectOption('');
  await page.locator('#topic').selectOption('Operating Systems');assert.ok(await page.locator('.resource-card').count()>0);await page.locator('#topic').selectOption('');
  await page.locator('#priority').selectOption('A');assert.ok(await page.locator('.resource-card').count()>0);await page.locator('#priority').selectOption('');
  await page.locator('[data-resource="external-sort"] button').click();assert.equal(await page.locator('dialog a[target="_blank"]').count(),0);
  await page.locator('#external-baseline-saved').check();await page.locator('#external-coach-selected').check();await page.locator('dialog button.primary').click();
  assert.ok(await page.locator('dialog a[target="_blank"][rel="noopener noreferrer"]').count()>0);await page.locator('dialog').getByRole('button',{name:'關閉',exact:true}).click();
  let interactiveCount=0,otherCount=0;
  for(const r of resources.filter(r=>['Local Interactive','Static Diagram','Scenario Drill'].includes(r.resourceType))) {
    await page.goto(app+r.path);assert.equal(await page.locator('.lesson-section').count(),0);await unlock();await page.locator('#references').waitFor();
    assert.equal(await page.locator('.lesson-section').count(),11,r.id);
    if(r.resourceType==='Local Interactive') {
      await page.locator('.step-status').waitFor();const initial=await page.locator('.step-status').innerText();assert.match(initial,/Step 1/);
      await page.getByRole('button',{name:'Next',exact:true}).click();assert.match(await page.locator('.step-status').innerText(),/Step 2/);
      await page.getByRole('button',{name:'Previous',exact:true}).click();assert.equal(await page.locator('.step-status').innerText(),initial);
      await page.locator('.visualization').focus();await page.keyboard.press('ArrowRight');assert.match(await page.locator('.step-status').innerText(),/Step 2/);
      await page.getByRole('button',{name:'Play',exact:true}).click();assert.equal(await page.getByRole('button',{name:'Pause',exact:true}).count(),1);await page.getByRole('button',{name:'Pause',exact:true}).click();
      await page.locator('#control-speed').selectOption('2');await page.getByRole('button',{name:'Reset',exact:true}).click();assert.match(await page.locator('.step-status').innerText(),/Step 1/);
      const inputs=page.locator('.control-grid input, .control-grid select');
      for(let i=0;i<await inputs.count();i++) {
        const input=inputs.nth(i),tag=await input.evaluate(e=>e.tagName),type=await input.getAttribute('type');
        if(tag==='SELECT') {const options=await input.locator('option').evaluateAll(a=>a.map(o=>o.value));await input.selectOption(options.at(-1));}
        else if(type==='checkbox')await input.setChecked(!(await input.isChecked()));
        else if(type==='range') {await input.focus();await page.keyboard.press('End');}
        else await input.fill(await input.getAttribute('max')||'2');
        assert.match(await page.locator('.step-status').innerText(),/Step 1/);
      }
      // Exercise every generated state, including masked attention and fault / flush paths.
      const next=page.getByRole('button',{name:'Next',exact:true});let steps=0;
      while(await next.isEnabled()){await next.click();assert.ok(++steps<100,r.id+' unbounded steps');}
      await page.getByRole('button',{name:'Reset',exact:true}).click();interactiveCount++;
    } else if(r.resourceType==='Static Diagram') {
      assert.equal(await page.locator('img').evaluate(e=>e.complete&&e.naturalWidth>0),true);await page.getByRole('button',{name:'註解 2',exact:true}).click();otherCount++;
    } else {
      const selector=page.locator('#scenario-case'),values=await selector.locator('option').evaluateAll(a=>a.map(o=>o.value));
      for(const value of values){await selector.selectOption(value);assert.equal(await page.locator('.scenario-consequence').count(),0);await page.locator('.scenario-options button').first().click();assert.equal(await page.locator('.scenario-consequence').count(),1);}otherCount++;
    }
    const duplicateIds=await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);return ids.length-new Set(ids).size;});assert.equal(duplicateIds,0,r.id);
    assert.equal(await page.locator('iframe,audio,video').count(),0);assert.equal(await page.evaluate(()=>localStorage.length+sessionStorage.length),0);
  }
  // Editing a negative value must preserve a temporarily empty field rather
  // than coercing it to zero. Check the DOM behavior in a real browser.
  await page.goto(app+'lessons/chain-rule.html');await unlock();await page.locator('.step-status').waitFor();
  const numeric=page.locator('#control-x');
  await numeric.fill('');assert.equal(await numeric.inputValue(),'');assert.equal(await numeric.getAttribute('aria-invalid'),'true');
  await numeric.fill('-2');assert.equal(await numeric.inputValue(),'-2');assert.equal(await numeric.getAttribute('aria-invalid'),'false');
  assert.match(await page.locator('.step-status').innerText(),/Step 1/);
  await page.goto(app+'lessons/matrix-transform.html');await unlock();await page.locator('.step-status').waitFor();
  assert.match(await page.locator('.vector-plot').textContent(),/e1/);
  await page.getByRole('button',{name:'Next',exact:true}).click();assert.match(await page.locator('.vector-plot').textContent(),/Ae1/);
  await page.getByRole('button',{name:'Next',exact:true}).click();assert.match(await page.locator('.vector-plot').textContent(),/Av/);
  const handle=await page.locator('.drag-handle').boundingBox();assert.ok(handle);
  const oldX=await page.locator('#control-x').inputValue();
  await page.mouse.move(handle.x+handle.width/2,handle.y+handle.height/2);await page.mouse.down();
  await page.mouse.move(handle.x+handle.width/2+30,handle.y+handle.height/2-10);await page.mouse.up();
  assert.notEqual(await page.locator('#control-x').inputValue(),oldX);
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto(app+'lessons/scaled-dot-product-attention.html');await unlock();await page.locator('.step-status').waitFor();
  assert.equal(await page.getByRole('button',{name:'Play',exact:true}).isEnabled(),false);await page.getByRole('button',{name:'Next',exact:true}).click();assert.match(await page.locator('.step-status').innerText(),/Step 2/);
  await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,'mobile overflow');
  await page.reload();assert.equal(await page.locator('.lesson-section').count(),0,'reload must relock');
  assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);assert.deepEqual(failedRequests,[]);assert.deepEqual(externalRequests,[]);assert.deepEqual(faviconRequests,[],'empty inline favicon must suppress the implicit request');
  console.log('PASS real Chromium: homepage, filters, external confirmation, '+interactiveCount+' interactive / '+otherCount+' other pages, all states, keyboard, reduced-motion, mobile, no console / network failures or persistence.');
} catch(error) {
  if(browser)throw error;
  console.error('NOT RUN: Browser validation could not start: '+error.message);process.exitCode=2;
} finally {if(browser)await browser.close();if(server)server.kill();}
