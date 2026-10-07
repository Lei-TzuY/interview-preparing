// Implementation-only baseline audit; future real diagnostic updates are legitimate.
import {readFile,readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {baselineCommit} from '../app/manifest.js';
const repo=fileURLToPath(new URL('../../',import.meta.url));
const protectedFiles=['WEAKNESS_MAP.md','PROGRESS.md','diagnostic/sessions/2026-10-06-session-01.md','mistakes/mistake-log.md'];
const report=[];
for(const file of protectedFiles) {
  const original=execFileSync('git',['show',baselineCommit+':'+file],{cwd:repo});
  const current=await readFile(new URL(file,new URL('../../',import.meta.url)));
  assert.ok(original.equals(current),'Protected baseline changed: '+file);
  report.push({file,sha256:createHash('sha256').update(current).digest('hex'),unchanged:true});
}
const wm=await readFile(new URL('../../WEAKNESS_MAP.md',import.meta.url),'utf8');
assert.equal(wm.split('\n').filter(l=>/\| Untested \|/.test(l)).length,232);
const progress=await readFile(new URL('../../PROGRESS.md',import.meta.url),'utf8');assert.match(progress,/0\s*\/\s*30/);
const topics=(await readdir(new URL('../../topics/',import.meta.url))).filter(f=>/^\d{2}-.*\.md$/.test(f));assert.equal(topics.length,12);
for(const name of topics) {
  const original=execFileSync('git',['show',baselineCommit+':topics/'+name],{cwd:repo,encoding:'utf8'});
  const current=await readFile(new URL('../../topics/'+name,import.meta.url),'utf8');
  assert.ok(current.startsWith(original),'Existing syllabus / review content altered: '+name);
  const appended=current.slice(original.length);assert.match(appended,/^\n## Visual Learning/);assert.match(appended,/Use only after blind diagnostic attempt/);
}
console.log(JSON.stringify({baselineCommit,protectedFiles:report,diagnostic:'0/30; original pending-first-answer session unchanged',weakness:'232 Untested; unchanged',technicalTopics:topics.length},null,2));
