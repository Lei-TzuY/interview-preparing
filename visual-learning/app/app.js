import {resources, sources, coverage} from './manifest.js';
import {el, text, section, table} from './components/ui.js';
const main=document.querySelector('#main');
const resourceId=document.body.dataset.resourceId;
const prefix=resourceId?'../':'';
const byId=new Map(resources.map(r=>[r.id,r]));
const sourceById=new Map(sources.map(r=>[r.id,r]));
const disclaimer='學習後立即答對僅是 Assisted Improvement；cold baseline 不可覆蓋，原 Diagnostic grade 不改。Delayed closed-book retest 才能產生 independent mastery evidence。';
const stages=[['concept','1 · Concept'],['why','2 · Why oral'],['intuition','3 · Intuition'],['tiny','4 · Tiny example'],['interactive','5 · Visualization / interaction'],['mechanism','6 · Step mechanism'],['formal','7 · Formal definition / formula'],['misconception','8 · Misconception / edge case'],['self','9 · 30-second self explanation'],['followups','10 · Interview follow-up'],['references','11 · References']];
function externalLink(url,title) {return el('a',{href:url,target:'_blank',rel:'noopener noreferrer'},title+' ↗');}
function gate(title, onOpen, target='教練指定的 concept') {
  const a=el('input',{type:'checkbox',id:'baseline-saved'}),b=el('input',{type:'checkbox',id:'coach-selected'});
  const open=el('button',{type:'button',class:'primary',disabled:'',onclick:()=>{if(a.checked&&b.checked)onOpen();}},'確認後開啟');
  const update=()=>{open.disabled=!(a.checked&&b.checked);};a.addEventListener('change',update);b.addEventListener('change',update);
  return el('div',{class:'gate','data-firewall':'locked'},el('p',{class:'eyebrow'},'Diagnostic firewall'),el('h1',{},title),
    text('首答前禁止開啟對應 lesson、公式、完整解法或答案導向外部講解。這頁預設不載入教學內容，也不自動推薦目前題目的資源。'),
    el('label',{for:'baseline-saved'},a,el('span',{},'我已將「'+target+'」的 closed-book 首次原始回答保存到 session。')),
    el('label',{for:'coach-selected'},b,el('span',{},'教練已將此 concept 判為 Review / Weak / Critical，或已指定需要建立 intuition。')),
    text(disclaimer),el('p',{class:'notice warning'},'此靜態工具無法核對 repository 的真實作答證據。確認是本人 / 教練的流程承諾；不是登入、評分或權限驗證。重新整理頁面會重新鎖定。'),open);
}
function externalConfirmation(resource) {
  const dialog=el('dialog',{'aria-label':'External resource firewall confirmation'});
  const target=resource.mappedSubtopics.map(s=>s.subtopic).join(' / ');
  const close=el('button',{type:'button',onclick:()=>dialog.close()},'關閉');
  const content=gate('確認外部閱讀範圍',()=>{
    const refs=resource.externalResources.map(id=>sourceById.get(id));
    dialog.replaceChildren(el('h2',{},resource.title),text('外部網站會在新分頁開啟；內容、下載或 cookies 由該網站管理。本工具不內嵌、不鏡像，也不自動下載模型。'),
      el('ul',{},refs.map(s=>el('li',{},externalLink(s.url,s.title),text(s.vetting)))),close);
  },target);
  // Each dialog uses its own scope; duplicate IDs would impair label association.
  for(const node of content.querySelectorAll('[id],[for]')) {
    for(const attr of ['id','for'])if(node.hasAttribute(attr))node.setAttribute(attr,'external-'+node.getAttribute(attr));
  }
  dialog.append(content,close);document.body.append(dialog);
  dialog.addEventListener('close',()=>dialog.remove(),{once:true});dialog.showModal();
}
function home() {
  main.replaceChildren(el('p',{class:'eyebrow'},'Learning resources · frozen syllabus'),el('h1',{},'理解機制，再回到口試'),el('p',{class:'lead'},coverage.length+' 個 knowledge / evidence subtopics，共用 '+resources.length+' 筆資源。這是教材資源 coverage，與 Diagnostic coverage、能力等級分開。'),el('p',{class:'notice'},disclaimer));
  const search=el('input',{type:'search',id:'search',placeholder:'搜尋 concept / title'});
  const topic=el('select',{id:'topic'},el('option',{value:''},'全部 topic'),[...new Set(coverage.map(c=>c.topic))].map(t=>el('option',{value:t},t)));
  const type=el('select',{id:'type'},el('option',{value:''},'全部 resource type'),[...new Set(resources.map(r=>r.resourceType))].map(t=>el('option',{value:t},t)));
  const priority=el('select',{id:'priority'},el('option',{value:''},'全部 Tier'),['S','A'].map(p=>el('option',{value:p},'Tier '+p)));
  const label=(name,id,input)=>el('label',{for:id},name,input);
  main.append(el('div',{class:'filters'},label('搜尋','search',search),label('Topic','topic',topic),label('資源形式','type',type),label('準備優先級','priority',priority)));
  const count=el('p',{class:'count','aria-live':'polite'}),grid=el('div',{class:'resource-grid'});main.append(count,grid);
  const render=()=>{
    const query=search.value.toLocaleLowerCase(),filtered=resources.filter(r=>(!topic.value||r.mappedSubtopics.some(s=>s.topic===topic.value))&&(!type.value||r.resourceType===type.value)&&(!priority.value||r.priority===priority.value)&&[r.title,...r.mappedSubtopics.map(s=>s.subtopic)].join(' ').toLocaleLowerCase().includes(query));
    count.textContent=filtered.length+' / '+resources.length+' 筆資源；Ready / External / Not Needed 表示資源狀態，並非 learner mastery。';
    grid.replaceChildren(...filtered.map(r=>{
      const card=el('article',{class:'resource-card','data-resource':r.id},el('div',{},el('span',{class:'badge'},r.resourceType),el('span',{class:'badge'},r.status)),el('h2',{},r.title),el('p',{class:'tagline'},r.topic+' · Tier '+r.priority),text(r.description),el('p',{class:'tagline'},r.mappedSubtopics.map(s=>s.subtopic).join(' · ')));
      const action=r.resourceType.startsWith('External')?el('button',{type:'button',class:'open',onclick:()=>externalConfirmation(r)},'確認後查看外部連結'):el('a',{class:'open',href:r.resourceType==='No Visualization Needed'?r.path:prefix+r.path},r.resourceType==='No Visualization Needed'?'回既有 oral practice':'開啟 lesson（另需確認）');
      card.append(action);return card;
    }));
  };[search,topic,type,priority].forEach(input=>input.addEventListener('input',render));render();
  main.append(el('p',{},el('a',{href:'../README.md'},'操作與 firewall 說明'),' · ',el('a',{href:'../RESOURCE_MAP.md'},'完整 resource map')));
}
function selfSection() {
  return section('self','9 · 30-second self explanation',text('遮住上方內容，用自己的話說：定義 / mechanism、一個 tiny example、必要假設與 failure case。此即時作答只算 assisted；沒有儲存或評分。'),el('label',{for:'self-explanation'},'自己的 30 秒版本（不保存）'),el('textarea',{id:'self-explanation',placeholder:'用自己的話說明；不要貼回教材。'}),el('p',{class:'notice'},'稍後依既有 review queue 安排 closed-book retest。不要在此改寫原始回答或能力等級。'));
}
function references(resource) {
  return section('references','11 · References',el('ul',{},resource.externalResources.map(id=>{const s=sourceById.get(id);return el('li',{},externalLink(s.url,s.title),text(s.vetting+' 查核：'+s.checkedDate+'；'+s.access));})),text('Local diagrams / interactions 為本 repository 原創。外部作品僅以正常連結引用，未搬移圖片、動畫、影片或程式碼。'),el('a',{href:'../../DESIGN_GUIDE.md'},'Design guide / assumptions'));
}
function shell(resource,sections) {
  const nav=el('nav',{class:'lesson-nav','aria-label':'Lesson sections'},stages.map(([id,title])=>el('a',{href:'#'+id},title)));
  main.replaceChildren(el('div',{class:'lesson-hero'},el('p',{class:'eyebrow'},resource.resourceType+' · '+resource.status),el('h1',{},resource.title),text(resource.topic),el('p',{class:'notice'},disclaimer)),el('div',{class:'lesson-layout'},nav,el('div',{},sections)));
}
async function lesson(resource) {
  if(resource.resourceType==='Local Interactive') {
    const [{catalog},{interactive}]=await Promise.all([import('./lessons/catalog.js'),import('./lessons/renderers.js')]);
    const info=catalog[resource.kind];if(!info)throw new Error('Missing catalog item');
    const controls=el('div',{class:'control-grid'}),visual=el('div',{class:'visualization'}),formula=el('div',{class:'formula-lines'},info.formula.map(f=>el('code',{},f)));
    shell(resource,[section('concept','1 · Concept',text(resource.title),text('Mapped existing subtopics: '+resource.mappedSubtopics.map(s=>s.topic+' / '+s.subtopic).join('；'))),section('why','2 · Why oral',text(info.why)),section('intuition','3 · Intuition',text(info.intuition)),section('tiny','4 · Tiny example',text(info.tiny)),section('interactive','5 · Visualization / interaction',text('修改參數會暫停並重設 trace。Play 不預設啟動；reduced-motion 下僅手動步進。Tab 可進到按鈕；聚焦視覺區域後可用左右鍵。'),controls,visual),section('mechanism','6 · Step mechanism',text(info.mechanism)),section('formal','7 · Formal definition / formula',formula),section('misconception','8 · Misconception / edge case',text(info.mistake),text('Edge / limitation: '+info.edge)),selfSection(),section('followups','10 · Interview follow-up',text(info.prompt),el('ol',{},info.followups.map(q=>el('li',{},q)))),references(resource)]);
    const controller=await interactive(resource.kind,controls,visual,formula);window.addEventListener('pagehide',()=>controller.destroy(),{once:true});
  } else if(resource.resourceType==='Scenario Drill') {
    const {scenarios}=await import('./lessons/scenarios.js'),cases=scenarios[resource.id];
    const choice=el('select',{id:'scenario-case'},cases.map((c,i)=>el('option',{value:i},c.title))),panel=el('div');
    const render=()=>{const c=cases[Number(choice.value)],result=el('div',{'aria-live':'polite'});panel.replaceChildren(el('h3',{},c.title),text(c.prompt),el('div',{class:'scenario-options'},c.choices.map((option,i)=>el('button',{type:'button',onclick:()=>result.replaceChildren(el('div',{class:'scenario-consequence'},text('此選擇的 consequence / assumptions：'+c.consequences[i]),text('教授追問：'+c.followup)))},option))),result,el('p',{class:'tagline'},'此情境對應：'+c.covers.join(' · ')));};choice.addEventListener('change',render);render();
    shell(resource,[section('concept','1 · Concept',text(resource.title)),section('why','2 · Why oral',text('此類概念的價值在判斷與證據，不在 moving boxes。')),section('intuition','3 · Intuition',text('先說出自己的決策與假設，再選項查看 consequence；不要以選到某個按鈕當正確性證據。')),section('tiny','4 · Tiny example',text('各情境使用明確條件；沒有個人的真實測量數字或診斷 grade。')),section('interactive','5 · Scenario interaction',el('label',{for:'scenario-case'},'選擇情境'),choice,panel),section('mechanism','6 · Mechanism',text('比較候選決策 → 查出假設 / evidence gap → 解釋代價 → 提出下一個可驗證步驟。')),section('formal','7 · Definition / reasoning',text('正式術語與方法須能由自己重述。選項 consequence 用來修正 mental model，不是完整口試標準答案。')),section('misconception','8 · Common misconception',text('執行過、看過圖或得到 green indicator，不能自動證明 correctness / generalization / causality。')),selfSection(),section('followups','10 · Interview follow-up',el('ol',{},cases.map(c=>el('li',{},c.followup)))),references(resource)]);
  } else {
    const {diagrams}=await import('./lessons/diagrams.js'),info=diagrams[resource.id];
    const caption=el('p',{'aria-live':'polite'},info.annotations[0]);
    shell(resource,[section('concept','1 · Concept',text(resource.title)),section('why','2 · Why oral',text(info.why)),section('intuition','3 · Intuition',text(info.intuition)),section('tiny','4 · Tiny example',text(info.tiny)),section('interactive','5 · Annotated static diagram',el('img',{src:'../assets/'+resource.id+'.svg',alt:info.alt,class:'diagram'}),el('div',{class:'scenario-options'},info.annotations.map((annotation,i)=>el('button',{type:'button',onclick:()=>{caption.textContent=annotation;}},'註解 '+(i+1)))),caption),section('mechanism','6 · Mechanism',text(info.mechanism)),section('formal','7 · Formal definition',text(info.formal)),section('misconception','8 · Misconception / limitation',text(info.mistake)),selfSection(),section('followups','10 · Interview follow-up',el('ol',{},info.followups.map(q=>el('li',{},q)))),references(resource)]);
  }
  document.title=resource.title+' · Visual Learning';document.querySelector('h1').setAttribute('tabindex','-1');document.querySelector('h1').focus();
}
if(resourceId) {
  const resource=byId.get(resourceId);
  if(!resource)main.replaceChildren(text('找不到 resource id；請回首頁。'));
  else main.append(gate(resource.title,()=>lesson(resource).catch(error=>main.replaceChildren(text('Lesson 無法載入：'+error.message),el('a',{href:'../index.html'},'回首頁'))),resource.mappedSubtopics.map(s=>s.subtopic).join(' / ')));
} else main.append(gate('先保存首答，再使用資源',home));
