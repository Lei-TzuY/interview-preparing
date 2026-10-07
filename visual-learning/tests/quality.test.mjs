import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,access} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {resources,sources,coverage,lessons} from '../app/manifest.js';
import {catalog} from '../app/lessons/catalog.js';
import {scenarios} from '../app/lessons/scenarios.js';
import {diagrams} from '../app/lessons/diagrams.js';
const visual=fileURLToPath(new URL('../',import.meta.url)),repo=path.dirname(visual.slice(0,-1));
const key=s=>s.topic+'\u0000'+s.subtopic;
async function files(directory) {
  const result=[];
  for(const entry of await readdir(directory,{withFileTypes:true})) {
    if(entry.name==='.git'||entry.name==='node_modules')continue;
    const file=path.join(directory,entry.name);if(entry.isDirectory())result.push(...await files(file));else result.push(file);
  }
  return result;
}
async function exists(p){try{await access(p);return true;}catch{return false;}}
const markdownSlug=s=>s.toLowerCase().replace(/<[^>]*>/g,'').replace(/[^\p{L}\p{N}_\-\s]/gu,'').replace(/\s/g,'-');
test('232 exact frozen subtopic keys; one primary decision per key, no artificial fragmentation',async()=>{
  const weakness=await readFile(path.join(repo,'WEAKNESS_MAP.md'),'utf8');
  const frozen=weakness.split('\n').map(line=>line.split('|').slice(1,-1).map(c=>c.trim())).filter(c=>c.length===6&&['Untested','Strong','Review','Weak','Critical'].includes(c[2])).map(c=>key({topic:c[0],subtopic:c[1]}));
  assert.equal(frozen.length,232);assert.equal(coverage.length,232);assert.equal(new Set(coverage.map(key)).size,232);
  assert.deepEqual([...coverage.map(key)].sort(),[...frozen].sort());
  assert.equal((await readdir(path.join(repo,'topics'))).filter(f=>/^\d{2}-.*\.md$/.test(f)).length,12);
  for(const r of resources)for(const s of r.mappedSubtopics)assert.ok(frozen.includes(key(s)),r.id+' unknown mapping');
  for(const c of coverage) {const r=resources.find(r=>r.id===c.resourceId);assert.ok(r,c.resourceId);assert.ok(r.mappedSubtopics.some(s=>key(s)===key(c)));assert.ok(c.why&&c.notes&&/^\d{4}-\d{2}-\d{2}$/.test(c.checkedDate));}
});
test('Manifest metadata, unique IDs, paths, source registry and availability distinct from mastery',async()=>{
  assert.equal(new Set(resources.map(r=>r.id)).size,resources.length);assert.equal(new Set(sources.map(r=>r.id)).size,sources.length);
  assert.equal(lessons.length,24);assert.equal(resources.length,74);
  const types=['Local Interactive','External Interactive','External Visual Explanation','Static Diagram','Scenario Drill','No Visualization Needed'];
  for(const r of resources) {
    for(const field of ['id','title','topic','mappedSubtopics','resourceType','priority','status','path','externalResources','requiresBlindAttempt'])assert.ok(field in r,r.id+' missing '+field);
    assert.ok(types.includes(r.resourceType));assert.ok(['Ready','External','Planned','Not Needed'].includes(r.status));assert.equal(r.requiresBlindAttempt,true);
    assert.ok(r.mappedSubtopics.length);assert.ok(['S','A'].includes(r.priority));
    for(const id of r.externalResources)assert.ok(sources.some(s=>s.id===id),id);
    if(r.resourceType.startsWith('External'))assert.ok(r.path.startsWith('https://'));
    else assert.ok(await exists(path.resolve(visual,'app',r.path)),r.path);
  }
  for(const s of sources){
    assert.ok(s.title&&s.category&&s.vetting&&s.access);
    const url=new URL(s.url);assert.equal(url.protocol,'https:');assert.ok(url.hostname);
    assert.equal(url.username,'');assert.equal(url.password,'');assert.equal(s.checkedDate,'2026-10-07');
  }
});
test('24 lessons meet pedagogy contract; all scenario mappings have actual cases',()=>{
  for(const r of lessons) {
    const entry=catalog[r.kind];assert.ok(entry,r.id);
    for(const field of ['why','intuition','tiny','formula','mechanism','mistake','edge','prompt','followups'])assert.ok(entry[field]?.length,r.id+' missing '+field);
    assert.equal(entry.followups.length,3);
  }
  for(const r of resources.filter(r=>r.resourceType==='Scenario Drill')) {
    const cases=scenarios[r.id];assert.ok(cases?.length,r.id);
    for(const c of cases){assert.equal(c.choices.length,2);assert.equal(c.consequences.length,2);assert.ok(c.followup&&c.prompt&&c.covers.length);}
    for(const mapped of r.mappedSubtopics)assert.ok(cases.some(c=>c.covers.includes(mapped.subtopic)),r.id+' lacks case for '+mapped.subtopic);
  }
  for(const r of resources.filter(r=>r.resourceType==='Static Diagram'))assert.ok(diagrams[r.id]?.annotations.length,r.id);
});
test('All repository Markdown local links and anchors resolve',async()=>{
  let checked=0;
  for(const file of (await files(repo)).filter(f=>f.endsWith('.md'))) {
    const md=(await readFile(file,'utf8')).replace(/```[\s\S]*?```/g,'');
    for(const match of md.matchAll(/!?\[[^\]\n]*\]\(([^)\n]+)\)/g)) {
      const url=match[1].split(/\s+"/)[0].replace(/^<|>$/g,'');
      if(/^(https?:|mailto:|app:|sandbox:)/.test(url))continue;
      const [pathname,anchor]=url.split('#'),target=path.resolve(path.dirname(file),decodeURIComponent(pathname||path.basename(file)));
      assert.ok(await exists(target),path.relative(repo,file)+' broken '+url);checked++;
      if(anchor&&target.endsWith('.md')) {
        const targetText=await readFile(target,'utf8'),slugs=[...targetText.matchAll(/^#{1,6}\s+(.+)$/gm)].map(m=>markdownSlug(m[1]));
        assert.ok(slugs.includes(decodeURIComponent(anchor)),url+' missing anchor');
      }
    }
  }
  assert.ok(checked>200);console.log('Checked '+checked+' local Markdown links.');
});
test('Local HTML references, gated wrappers, module imports and SVG assets resolve',async()=>{
  for(const file of await files(path.join(visual,'app'))) {
    const content=await readFile(file,'utf8');
    if(file.endsWith('.html')) {
      assert.match(content,/<html lang="zh-Hant">/);assert.match(content,/href="#main"/);assert.match(content,/<script type="module"/);
      assert.doesNotMatch(content,/<(?:iframe|audio|video)\b/i);
      assert.doesNotMatch(content,/\b(?:src|href)="https?:\/\//i);
      for(const [,url] of content.matchAll(/\b(?:src|href)="([^"]+)"/g))if(!url.startsWith('#'))assert.ok(await exists(path.resolve(path.dirname(file),url)),file+' missing '+url);
      if(file.includes('/lessons/')){assert.match(content,/data-resource-id="[a-z0-9-]+"/);assert.doesNotMatch(content,/QK|softmax\(|∂|<table/);}
    }
    if(file.endsWith('.js')) {
      for(const [,relative] of content.matchAll(/(?:from\s*|import\()\s*['"](\.[^'"]+)['"]/g))assert.ok(await exists(path.resolve(path.dirname(file),relative)),file+' missing import '+relative);
      assert.doesNotMatch(content,/\b(?:fetch|XMLHttpRequest|WebSocket|sendBeacon)\s*\(/);
      assert.doesNotMatch(content,/\b(?:localStorage|sessionStorage|indexedDB)\b/);
      assert.doesNotMatch(content,/document\.cookie\s*=|new\s+(?:Audio|AudioContext)|<iframe|\.innerHTML\s*=/);
    }
    if(file.endsWith('.svg')){assert.match(content,/<title\b/);assert.match(content,/<desc\b/);assert.doesNotMatch(content,/<script|<image|<foreignObject/);}
  }
  assert.equal((await readdir(path.join(visual,'app/assets'))).filter(f=>f.endsWith('.svg')).length,8);
});
test('Firewall code and accessibility affordances are present; static evidence only',async()=>{
  const app=await readFile(path.join(visual,'app/app.js'),'utf8'),ui=await readFile(path.join(visual,'app/components/ui.js'),'utf8'),css=await readFile(path.join(visual,'app/styles.css'),'utf8');
  assert.match(app,/baseline-saved/);assert.match(app,/coach-selected/);assert.match(app,/import\('\.\/lessons\/catalog\.js'\)/);
  assert.match(app,/rel:'noopener noreferrer'/);assert.match(app,/target:'_blank'/);assert.match(app,/Assisted Improvement/);assert.match(app,/Delayed closed-book retest/);
  assert.match(ui,/prefers-reduced-motion: reduce/);assert.match(ui,/ArrowRight/);assert.match(ui,/visibilitychange/);assert.match(ui,/aria-live/);assert.match(ui,/scope: 'col'/);
  assert.match(css,/:focus-visible/);assert.match(css,/@media \(max-width:550px\)/);assert.match(css,/@media \(prefers-reduced-motion: reduce\)/);
});
test('Generated indexes / wrappers have no drift or TODO filler',async()=>{
  execFileSync(process.execPath,['scripts/build-index.mjs','--check'],{cwd:visual});
  for(const file of await files(visual))if(/\.(md|html|svg)$/.test(file))assert.doesNotMatch(await readFile(file,'utf8'),/\b(?:TODO|TBD|lorem ipsum|coming soon)\b/i,file);
});
