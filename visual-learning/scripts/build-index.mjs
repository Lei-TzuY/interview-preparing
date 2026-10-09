import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {resources,sources,coverage,baselineCommit} from '../app/manifest.js';
const root=fileURLToPath(new URL('../',import.meta.url));
const check=process.argv.includes('--check');
const esc=s=>String(s).replaceAll('|','\\|').replaceAll('\n',' ');
const link=(title,url)=>'['+esc(title)+']('+url+')';
const location=r=>r.resourceType==='No Visualization Needed'?r.path.replace('../../','../'):r.resourceType.startsWith('External')?r.path:'app/'+r.path;
const counts=items=>items.reduce((acc,item)=>{acc[item.resourceType]=(acc[item.resourceType]||0)+1;return acc;},{});
const banner='> 首答前勿開啟對應資源。僅在 session 保存 cold baseline、且教練指定補強後使用。教材 coverage 與實測 mastery 分開；閱讀後立即重答只算 Assisted Improvement。\n\n';
const generated='<!-- Generated from app/manifest.js by scripts/build-index.mjs; edit the canonical manifest instead. -->\n\n';
let index=generated+'# Visual Learning Index\n\n'+banner;
index+='既有 syllabus 共 12 technical topics + Research / Project Defense、232 subtopics；'+resources.filter(r=>r.resourceType==='Local Interactive').length+' 個本地互動 lesson、'+resources.length+' 筆資源。資源 priority 使用原有 Tier，不表示個人能力。\n\n';
index+='| Resource Type | Resources | Primary subtopic decisions |\n| --- | ---: | ---: |\n';
const rc=counts(resources),cc=counts(coverage.map(c=>resources.find(r=>r.id===c.resourceId)));
for(const [type,count] of Object.entries(rc))index+='| '+type+' | '+count+' | '+(cc[type]||0)+' |\n';
index+='\nPrimary decision 共 '+coverage.length+' / 232；supplemental links 不重複增加 coverage。Ready / External / Planned / Not Needed 是**教材可用狀態**，不是 Strong / Review / Weak / Critical。\n\n';
for(const topic of [...new Set(coverage.map(c=>c.topic))]) {
  index+='## '+topic+'\n\n| Resource | Type | Priority | Status | Mapped existing subtopics | Decision |\n| --- | --- | --- | --- | --- | --- |\n';
  for(const r of resources.filter(r=>r.mappedSubtopics.some(s=>s.topic===topic)))index+='| '+link(r.title,location(r))+' | '+r.resourceType+' | '+r.priority+' | '+r.status+' | '+esc(r.mappedSubtopics.filter(s=>s.topic===topic).map(s=>s.subtopic).join('、'))+' | '+esc(r.description)+' |\n';
  index+='\n';
}
index+='外部成熟工具優先；local BFS / heap / attention 等只補 reversible tiny trace、numeric inspector 與 oral connection，不聲稱取代完整外部工具。未製作 232 個 lessons。\n\n完整逐子題索引見 [RESOURCE_MAP](RESOURCE_MAP.md)；使用方式與限制見 [README](README.md)。\n';
let map=generated+'# Learning Resource Map\n\n'+banner;
map+='每個 frozen (Topic, Subtopic) 有一筆 primary resource decision，共 **232 / 232**。Coverage 不要求每個子題獨立作答、不改 Untested、不自動推薦目前 Diagnostic 的解題資源。Baseline: `'+baselineCommit+'`。\n\n';
map+='Total existing subtopics: **232**。每個子題只計一次 primary type；額外 references 不重複計數。\n\n| Primary resource type | Subtopics |\n| --- | ---: |\n';
for(const type of Object.keys(rc))map+='| '+type+' | '+(cc[type]||0)+' |\n';
map+='| Total | '+coverage.length+' |\n\n';
map+='| Topic | Subtopic | Resource Type | Resource | URL or Local Path | Why Useful | Checked Date | Notes |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n';
for(const c of coverage) {const r=resources.find(r=>r.id===c.resourceId),url=location(r);map+='| '+[c.topic,c.subtopic,r.resourceType,r.title,link(r.resourceType.startsWith('External')?'External reference':url,url),c.why,c.checkedDate,c.notes].map(esc).join(' | ')+' |\n';}
map+='\n## Source vetting\n\n查核日期採 Asia/Taipei。公開頁面 / 文件與概念內容已查核；未逐一完整測試第三方互動控制。Local app 不內嵌或鏡像外部網站；若第三方日後改版或要求登入，保留記錄並重新評估，不能把連結可達等同教學品質。\n\n';
map+='| Source | Category | Checked Date | Access / Quality Notes |\n| --- | --- | --- | --- |\n';
for(const s of sources)map+='| '+link(s.title,s.url)+' | '+esc(s.category)+' | '+s.checkedDate+' | '+esc(s.vetting+' '+s.access)+' |\n';
map+='\nNo Visualization Needed 的 rationale 已放在各 primary decision；它仍有既有 oral practice 路徑，不是 coverage 漏洞。\n';
async function output(file,content) {
  const target=path.join(root,file);
  if(check) {if(await readFile(target,'utf8')!==content)throw new Error('Generated file drift: '+file);}
  else await writeFile(target,content);
}
await output('INDEX.md',index);await output('RESOURCE_MAP.md',map);
await mkdir(path.join(root,'app/lessons'),{recursive:true});
for(const r of resources.filter(r=>['Local Interactive','Static Diagram','Scenario Drill'].includes(r.resourceType))) {
  const safe=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
  const html='<!doctype html>\n<html lang="zh-Hant">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width,initial-scale=1">\n  <title>'+safe(r.title)+' · Visual Learning</title>\n  <link rel="icon" href="data:,">\n  <link rel="stylesheet" href="../styles.css">\n  <script type="module" src="../app.js"></script>\n</head>\n<body data-resource-id="'+r.id+'">\n  <a class="skip-link" href="#main">跳到主要內容</a>\n  <header class="site-header"><a href="../index.html">INTERVIEW / VISUAL LEARNING</a><span>首答保存後 · 教練指定補強</span></header>\n  <main id="main"><noscript>需要 JavaScript；首答前請勿開啟對應教材。</noscript></main>\n  <footer>此工具不保存作答、評分或能力。Assisted Improvement 需與 baseline 分開，另安排 delayed closed-book retest。</footer>\n</body>\n</html>\n';
  await output('app/'+r.path,html);
}
console.log((check?'Checked':'Generated')+' INDEX, RESOURCE_MAP and 46 gated lesson wrappers; coverage '+coverage.length+'/232.');
