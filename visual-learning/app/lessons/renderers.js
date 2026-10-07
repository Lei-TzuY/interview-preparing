import * as C from '../components/calculations.js';
import * as T from '../components/traces.js';
import {el, text, fmt, table, matrix, arrayView, inspector, cards, svg, plot, graphView, control, numericInputValue} from '../components/ui.js';

const r = (label, key, value, min, max, step = 1) => [label, key, 'range', value, {min, max, step}];
const n = (label, key, value, min = -10, max = 10, step = 0.1) => [label, key, 'number', value, {min, max, step}];
const s = (label, key, value, options) => [label, key, 'select', value, {options}];
const c = (label, key, value) => [label, key, 'checkbox', value, {}];
const configs = {
  binary: [r('Target', 'target', 2, 0, 8)],
  graph: [s('Traversal', 'mode', 'BFS', ['BFS', 'DFS']), s('Target（BFS 取出 / DFS 首次進入時停止）', 'target', '', [['', '全部走完'], 'B', 'D', 'E'])],
  heap: [s('Operation', 'operation', 'insert', ['heapify', 'insert', 'pop']), n('Inserted value', 'value', 2, -9, 20, 1)],
  dp: [r('n', 'n', 5, 0, 6), s('Mode', 'mode', 'bottom-up', ['bottom-up', 'memo'])],
  vector: [s('Matrix', 'matrix', 'stretch', [['stretch', 'Stretch diag(2,1)'], ['rotate', 'Rotate 90°'], ['shear', 'Shear'], ['project', 'Project onto x-axis']]), r('x', 'x', 1, -2, 2, 0.1), r('y', 'y', 1, -2, 2, 0.1)],
  eigen: [s('Matrix', 'matrix', 'stretch', [['stretch', 'diag(2,1)'], ['negative', 'diag(−1,2)'], ['rotate', 'Rotate 90°']]), r('Vector angle (degrees)', 'angle', 45, 0, 360)],
  gradient: [r('Learning rate η', 'lr', 0.3, 0.05, 2.5, 0.05), r('Start w', 'start', -2, -3, 5, 0.5)],
  chain: [n('x', 'x', 2), n('w', 'w', 0.5), n('b', 'b', 0), n('Target t', 'target', 2)],
  regression: [r('w', 'w', 1, -3, 3, 0.1), r('b', 'b', 0, -3, 3, 0.1), r('x', 'x', 1, -3, 3, 0.1), r('Threshold τ', 'threshold', 0.5, 0.1, 0.9, 0.1)],
  overfit: [r('Degree', 'degree', 1, 0, 6), s('Ridge λ（另加 1e−8 numerical ridge）', 'ridge', '0', ['0', '0.001', '0.1', '1'])],
  metrics: [n('TP', 'tp', 8, 0, 100, 1), n('FP', 'fp', 2, 0, 100, 1), n('FN', 'fn', 4, 0, 100, 1), n('TN', 'tn', 16, 0, 100, 1)],
  network: [r('A[0,0]', 'weight', 0.5, -5, 5, 0.1), r('Learning rate', 'lr', 0.1, 0.01, 2, 0.01), n('Target', 'target', 1, -5, 5)],
  softmax: [n('Logit 0', 'z0', 1, -1000, 1000, 1), n('Logit 1', 'z1', 2, -1000, 1000, 1), n('Logit 2', 'z2', 0, -1000, 1000, 1), s('Target class', 'target', '1', ['0', '1', '2'])],
  conv: [s('Stride', 'stride', '1', ['1', '2']), n('Kernel [0,0]', 'weight', 1, -3, 3, 1)],
  attention: [s('dₖ', 'dk', '2', ['1', '2', '4', '8']), c('Causal mask', 'causal', false)],
  multihead: [c('Causal mask', 'causal', true)],
  kv: [r('Prompt tokens', 'prompt', 3, 1, 6), r('Decode steps', 'decode', 3, 1, 5), r('Layers', 'layers', 1, 1, 4), s('KV heads', 'heads', '2', ['1', '2', '4']), s('Bytes per element', 'bytes', '2', ['1', '2', '4'])],
  decoder: [],
  process: [s('Switch between', 'mode', 'thread', [['thread', 'A1 / A2：同 process'], ['process', 'A1 / B1：不同 process']])],
  memory: [r('Virtual byte address', 'address', 5, 0, 19), c('TLB contains resident mapping', 'tlb', false), s('Nonresident source', 'source', 'zero', [['zero', 'Demand-zero'], ['file', 'File-backed']]), c('Data cache hit', 'cache', true)],
  deadlock: [c('Mutual exclusion', 'exclusive', true), c('Hold-and-wait', 'hold', true), c('No preemption', 'noPreemption', true), c('Circular wait', 'circular', true)],
  tcp: [s('Loss', 'loss', 'none', [['none', 'None'], ['data', 'Data loss'], ['ack', 'ACK loss']])],
  pipeline: [c('Forwarding', 'forwarding', true), c('Branch taken', 'branchTaken', false), c('I1 is load', 'load', false)],
  cache: [s('Access trace', 'pattern', 'sequential', ['sequential', 'permuted', 'repeated']), s('Line bytes', 'line', '4', ['1', '2', '4']), s('Capacity (lines)', 'capacity', '2', ['1', '2', '4'])]
};
const matrices = {stretch: [[2, 0], [0, 1]], rotate: [[0, -1], [1, 0]], shear: [[1, 1], [0, 1]], project: [[1, 0], [0, 0]], negative: [[-1, 0], [0, 2]]};
const phases = messages => messages.map((message, formula) => ({message, formula}));
const vectorSteps = phases(['觀察原向量與 basis', 'A 的 columns：basis 的去向', '計算 y=Ax，觀察 before / after']);
const curve = (fn, from = -3, to = 3, count = 121) => Array.from({length: count}, (_, i) => {const x = from + i * (to - from) / (count - 1); return [x, fn(x)];});
const cachePatterns = {sequential: [0,1,2,3,4,5,6,7,8,9,10,11], permuted: [0,8,4,1,9,5,2,10,6,3,11,7], repeated: [0,1,0,1,0,1,4,5,4,5,4,5]};
function overfitModel(params) {
  const rng = C.seededRandom(23), truth = x => 0.5 + x + 0.6 * x * x;
  const train = Array.from({length: 7}, (_, i) => {const x = -1 + i / 3; return [x, truth(x) + (rng() - 0.5) * 1.1];});
  const validation = Array.from({length: 15}, (_, i) => {const x = -1 + i / 7; return [x, truth(x) + (rng() - 0.5) * 1.1];});
  const weights = C.fitPolynomial(train, params.degree, Number(params.ridge) + 1e-8), predict = x => C.polynomial(weights, x);
  return {steps: phases(['固定 synthetic train / validation split', '由 train 解 polynomial weights', '比較同一模型的 train / validation MSE']), train, validation, weights,
    prediction: curve(predict, -1, 1), truth: curve(truth, -1, 1), trainMSE: C.mean(train.map(([x, y]) => (predict(x) - y) ** 2)), validationMSE: C.mean(validation.map(([x, y]) => (predict(x) - y) ** 2))};
}
function build(kind, p) {
  switch (kind) {
    case 'binary': return {steps: T.binarySearchTrace([1,2,2,2,4,7], p.target), array: [1,2,2,2,4,7], params: p};
    case 'graph': return {steps: T.graphTrace(T.teachingGraph, 'A', p.mode, p.target), params: p};
    case 'heap': return {steps: T.heapTrace([7,3,5,1,4], p.operation, p.value)};
    case 'dp': return {...T.fibTrace(p.n, p.mode), params: p};
    case 'vector': {const a = matrices[p.matrix], x = [p.x, p.y], y = a.map(row => C.dot(row, x)); return {steps: vectorSteps, a, x, y};}
    case 'eigen': {const a = matrices[p.matrix], angle = p.angle * Math.PI / 180, x = [Math.cos(angle), Math.sin(angle)], y = a.map(row => C.dot(row,x)), cross = x[0]*y[1]-x[1]*y[0], lambda = C.dot(x,y); return {steps: phases(['選 nonzero v', '比較 v 與 Av 的直線', '檢查 residual 與比例 λ']), a,x,y,cross,lambda,eigen: Math.abs(cross)<1e-8};}
    case 'gradient': return {steps: C.gradientTrace(p.start,p.lr), params:p};
    case 'chain': return {steps: phases(['Forward：z=wx+b', 'Residual / loss', 'Upstream ∂L/∂z', 'Local derivatives', 'Chain products']), ...C.scalarGraph(p.x,p.w,p.b,p.target)};
    case 'regression': {const score=p.w*p.x+p.b, probability=C.sigmoid(score), boundary=p.w===0?null:(Math.log(p.threshold/(1-p.threshold))-p.b)/p.w; return {steps: phases(['Linear score', 'Sigmoid probability', 'Threshold decision']), params:p,score,probability,boundary};}
    case 'overfit': return overfitModel(p);
    case 'metrics': return {steps: phases(['Confusion counts', 'Precision denominator', 'Recall denominator', 'F1 / accuracy']), params:p,metrics:C.confusionMetrics(p.tp,p.fp,p.fn,p.tn)};
    case 'network': {const net=C.tinyNetwork([1,2],[[p.weight,-0.25],[-0.5,0.75]],[0,0.1],[1,-0.5],0,p.target,p.lr); const u=net.updated, after=C.tinyNetwork(net.x,u.a,u.b,u.v,u.c,p.target,p.lr); return {steps: phases(['Input / weights', 'z=Ax+b', 'h=σ(z)', 'Output prediction', 'Loss', 'Backward gradients', 'One simultaneous update']),...net,afterLoss:after.loss,params:p};}
    case 'softmax': {const z=[p.z0,p.z1,p.z2], m=Math.max(...z), e=z.map(v=>Math.exp(v-m)), weights=C.softmax(z), target=Number(p.target); return {steps: phases(['Logits', 'Subtract max / exp', 'Normalize', 'Cross entropy / gradient']),z,m,e,weights,loss:C.crossEntropy(z,target),gradient:weights.map((v,i)=>v-(i===target?1:0)),target};}
    case 'conv': {const image=[[1,2,0,1],[0,1,3,2],[2,1,0,1],[1,0,2,3]],kernel=[[p.weight,0],[0,-1]],model=C.convolution(image,kernel,Number(p.stride)); return {...model,image,kernel};}
    case 'attention': return {steps:phases(['Tokens / embeddings','Q / K / V projections','QKᵀ raw scores','Divide by √dₖ','Optional causal mask','Row softmax','Weighted V / output','Scaling：獨立 IID simulation']),...T.attentionExample(Number(p.dk),p.causal),params:p,simulation:[1,2,4,8].map(d=>C.dotVariance(d))};
    case 'multihead': return {steps:phases(['Same tokens / embeddings','Head 1 projected space','Head 2 projected space','Concat head outputs','Output projection']),...T.multiHeadExample(p.causal)};
    case 'kv': return {steps:T.kvTrace(p.prompt,p.decode,Number(p.heads),4,Number(p.bytes),p.layers),params:p};
    case 'decoder': return {steps:phases(['Input x','LN(x)','Causal attention','Residual u=x+a','LN(u)','MLP','Residual y=u+MLP']),...T.decoderExample()};
    case 'process': return {steps:T.processTrace(p.mode),params:p};
    case 'memory': return {steps:T.memoryTrace(p.address,p.tlb,p.source,p.cache),params:p};
    case 'deadlock': return {steps:T.deadlockTrace(p),params:p};
    case 'tcp': return {steps:T.tcpTrace(p.loss),params:p};
    case 'pipeline': return {steps:T.pipelineTrace(p),params:p};
    case 'cache': return {...C.cacheTrace(cachePatterns[p.pattern],Number(p.line),Number(p.capacity)),params:p};
    default: throw new Error('Unknown lesson kind: '+kind);
  }
}
function vectorSVG(model, onDrag, phase = 2) {
  const root=svg('svg',{viewBox:'0 0 420 320',role:'img','aria-label':'Original vector blue, transformed vector orange; numeric inputs provide keyboard alternative',class:'plot vector-plot'});
  const px=x=>210+x*45,py=y=>160-y*45;
  root.append(svg('title',{},'Vector before / after'),svg('line',{x1:10,y1:160,x2:410,y2:160,stroke:'#aab7c3'}),svg('line',{x1:210,y1:10,x2:210,y2:310,stroke:'#aab7c3'}));
  if (onDrag) {
    const basis = phase === 0 ? [[1,0],[0,1]] : C.transpose(model.a);
    basis.forEach((v,i)=>root.append(
      svg('line',{x1:210,y1:160,x2:px(v[0]),y2:py(v[1]),stroke:'#5b6b50','stroke-width':2,'stroke-dasharray':'5 3'}),
      svg('text',{x:px(v[0])+5,y:py(v[1])+18,fill:'#425437'},(phase === 0 ? 'e' : 'Ae')+(i+1))));
  }
  const vectors = [[model.x,'#166c85','v']];
  if (phase === 2) vectors.push([model.y,'#bd5818','Av']);
  for(const [v,color,label] of vectors) {
    root.append(svg('line',{x1:210,y1:160,x2:px(v[0]),y2:py(v[1]),stroke:color,'stroke-width':4}),svg('circle',{cx:px(v[0]),cy:py(v[1]),r:7,fill:color}),svg('text',{x:px(v[0])+8,y:py(v[1])-8,fill:color},label));
  }
  if(onDrag) {
    const handle=svg('circle',{cx:px(model.x[0]),cy:py(model.x[1]),r:14,fill:'transparent',stroke:'#166c85','stroke-dasharray':'3 2',class:'drag-handle'});
    handle.addEventListener('pointerdown',event=>{
      event.preventDefault(); const inverse=root.getScreenCTM().inverse();
      const move=e=>{const point=new DOMPoint(e.clientX,e.clientY).matrixTransform(inverse), x=(point.x-210)/45,y=(160-point.y)/45;onDrag(Math.max(-2,Math.min(2,x)),Math.max(-2,Math.min(2,y)));};
      const up=()=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);window.removeEventListener('pointercancel',up);};
      window.addEventListener('pointermove',move);window.addEventListener('pointerup',up,{once:true});window.addEventListener('pointercancel',up,{once:true});
    }); root.append(handle);
  }
  return root;
}
function recursionTree(n) {
  const nodes=[]; const visit=(k,path='root',depth=0)=>{nodes.push([path,'F('+k+')',depth,k<2?'base':'F('+(k-1)+') + F('+(k-2)+')']);if(k>=2){visit(k-1,path+'/L',depth+1);visit(k-2,path+'/R',depth+1);}}; visit(n);
  // Indented HTML tree remains readable by screen readers; n≤6 keeps it tiny.
  return el('details',{},el('summary',{},'Inspect complete naive recursion tree（'+nodes.length+' calls）'),el('div',{class:'recursion-tree'},nodes.map(([path,label,depth,note])=>el('div',{style:'margin-left:'+depth*18+'px'},path+': '+label+' → '+note))));
}
function draw(kind,root,step,index,m,context) {
  root.append(el('p',{class:'mechanism-current'},step.message||step.stage||'目前 state'));
  switch(kind) {
    case 'binary': root.append(arrayView(m.array,{active:step.mid==null?[]:[step.mid],interval:[step.lo,step.hi],labels:{[step.lo]:'lo',[step.hi]:'hi',[step.mid]:'mid'}}),inspector({lo:step.lo,mid:step.mid,hi:step.hi,...(step.nextLo!==undefined?{nextLo:step.nextLo,nextHi:step.nextHi}:{}),...(step.answer!==undefined?{answer:step.answer}:{}),target:m.params.target}));break;
    case 'graph': {
      const positions={A:[70,125],B:[205,55],C:[205,195],D:[350,70],E:[475,180]},edges=[['A','B'],['A','C'],['B','D'],['C','D'],['C','E'],['D','E']];
      root.append(graphView(Object.keys(positions),edges,positions,{current:step.current,discovered:step.discovered,processed:step.processed,label:m.params.mode+' state'}),cards([['Frontier '+(m.params.mode==='BFS'?'FIFO（左端 next）':'LIFO frames（右端 top）'),step.frontier.join(' → ')||'empty'],['Discovered',step.discovered.join(', ')],[m.params.mode==='BFS'?'Dequeued order':'First-entry order',step.processed.join(' → ')||'none']]),table(['Node','Parent','Discovery-tree distance'],Object.keys(step.parent).map(v=>[v,step.parent[v]??'root',step.distance[v]])),text('DFS 的 discovery-tree distance 不保證 shortest。'));
      if (step.finished) root.append(text('DFS finished / backtracked：'+(step.finished.join(' → ')||'none')));
      break;
    }
    case 'heap': {
      const positions={},nodes=step.array.map((_,i)=>String(i));nodes.forEach(v=>{const i=Number(v),level=Math.floor(Math.log2(i+1)),offset=i-(2**level-1);positions[v]=[(offset+0.5)*560/2**level,40+level*70];});
      const edges=nodes.filter(v=>Number(v)>0).map(v=>[String(Math.floor((Number(v)-1)/2)),v]);
      root.append(arrayView(step.array,{active:step.active}),graphView(nodes,edges,positions,{current:String(step.active[0]??''),label:'Min-heap tree；node 是 index:value',labels:Object.fromEntries(nodes.map(v=>[v,v+':'+step.array[Number(v)]]))}),text('Tree node 是 index:value，與 array 同步。'),inspector({activeSwap:step.active,array:step.array}));break;
    }
    case 'dp': root.append(cards([['State','F('+step.k+')'],['Naive calls',m.naiveCalls],['Memo calls',m.memoCalls??'N/A'],['F(n)',m.value]]),table(['state k','已儲存 value'],Array.from({length:m.params.n+1},(_,k)=>[k,step.cache[k]??'尚未算'])),recursionTree(m.params.n));break;
    case 'vector': root.append(vectorSVG(m,(x,y)=>context.setVector(x,y),index),matrix('A',m.a),matrix('x',m.x.map(v=>[v])),...(index===2?[matrix('Ax',m.y.map(v=>[v]))]:[]),inspector({L1:m.x.reduce((a,v)=>a+Math.abs(v),0),L2:Math.hypot(...m.x),LInfinity:Math.max(...m.x.map(Math.abs))}),text('拖曳藍色端點；鍵盤可用 x/y sliders。虛線為 basis，依步驟顯示 e₁/e₂ → Ae₁/Ae₂ → Av。'));break;
    case 'eigen': root.append(vectorSVG(m),matrix('A',m.a),inspector({v:m.x,Av:m.y,determinantResidual:m.cross,lambdaProjection:m.lambda,isEigenWithinTolerance:m.eigen}),text(m.eigen?'此 nonzero v 與 Av 共線（含負 λ / zero output）。':'目前向量不是 eigenvector；Av 含垂直 v 的分量。'));break;
    case 'gradient': {
      const domain=Math.max(5,Math.abs(step.w)+1),range=Math.max(8,step.loss*1.2);
      root.append(plot([{name:'L(w)',points:curve(x=>(x-2)**2/2,-domain,domain)}],{xRange:[-domain,domain],yRange:[0,range],points:[{x:step.w,y:step.loss,label:'Current w'}],label:'Quadratic loss；current point'}),inspector(Object.fromEntries(Object.entries(step).map(([k,v])=>[k,typeof v==='number'?fmt(v):v]))),text('曲線 axes 會隨發散 state 自動放大；表格數值為準。'));break;
    }
    case 'chain': root.append(cards([['x',fmt(m.x),index===0],['z=wx+b',fmt(m.z),index===0],['r=z−t',fmt(m.residual),index===1],['L=r²/2',fmt(m.loss),index===1]]),table(['Local derivative','Value'],Object.entries(m.local).map(([k,v])=>[k,fmt(v)])),table(['Backward gradient','Value'],Object.entries(m.gradients).map(([k,v])=>['∂L/∂'+k,fmt(v)])));break;
    case 'regression': root.append(plot([{name:'Linear score',points:curve(x=>m.params.w*x+m.params.b)},{name:'Sigmoid',points:curve(x=>C.sigmoid(m.params.w*x+m.params.b))},{name:'Threshold',points:[[-3,m.params.threshold],[3,m.params.threshold]]}],{yRange:[-4,4],points:[{x:m.params.x,y:m.probability,label:'p(x)'}],label:'Score / sigmoid / threshold'}),inspector({score:m.score,probability:m.probability,threshold:m.params.threshold,predictedClass:m.probability>=m.params.threshold?1:0,boundary:m.boundary??'w=0：沒有唯一 crossing'}));break;
    case 'overfit': root.append(plot([{name:'Fit',points:m.prediction},{name:'True synthetic function',points:m.truth}],{xRange:[-1,1],yRange:[-1,4],points:[...m.train.map(([x,y])=>({x,y,color:'#166c85',label:'train'})),...m.validation.map(([x,y])=>({x,y,color:'#bd5818',label:'validation'}))],label:'Synthetic fit：blue train / orange validation'}),cards([['Train MSE',fmt(m.trainMSE)],['Validation MSE',fmt(m.validationMSE)]]),matrix('Polynomial weights',m.weights.map(v=>[v])),text('圖限制 y 軸 −1～4；高 degree 外插或振盪超出圖框時，MSE 與數值仍完整計算。'));break;
    case 'metrics': {
      const p=m.params;root.append(table(['Actual / Predicted','Positive','Negative'],[['Positive',el('strong',{class:index===1||index===2?'active':''},p.tp),el('strong',{class:index===2?'active':''},p.fn)],['Negative',el('strong',{class:index===1?'active':''},p.fp),p.tn]],'Confusion matrix'),table(['Metric','Value'],Object.entries(m.metrics).map(([k,v])=>[k,fmt(v)])),inspector({predictedPositives:p.tp+p.fp,actualPositives:p.tp+p.fn,total:p.tp+p.fp+p.fn+p.tn}));break;
    }
    case 'network': root.append(cards([['Input',m.x.join(', '),index===0],['Hidden sigmoid',m.h.map(fmt).join(', '),index===2],['Prediction',fmt(m.y),index===3],['Loss',fmt(m.loss),index===4]]),matrix('A weights',m.a),matrix('Hidden preactivation z',m.z.map(v=>[v])),matrix('∂L/∂A',m.gradients.a),matrix('Updated A',m.updated.a),inspector({b:m.b,v:m.v,c:m.c,gradientB:m.gradients.b,gradientV:m.gradients.v,gradientC:m.gradients.c,updatedB:m.updated.b,updatedV:m.updated.v,updatedC:m.updated.c,afterUpdateLoss:m.afterLoss}),text('所有 update 來自同一 old snapshot，沒有逐個重算 gradient。'));break;
    case 'softmax': root.append(table(['Class','Logit z','z−max','stabilized exp','p','∂CE/∂z'],m.z.map((z,i)=>[i===m.target?i+' (target)':i,z,z-m.m,fmt(m.e[i]),fmt(m.weights[i]),fmt(m.gradient[i])])),cards([['max(z)',m.m],['Σp',fmt(m.weights.reduce((a,b)=>a+b,0))],['Cross entropy',fmt(m.loss)]]),text('極端 logits 可能使 exp underflow 成 0；穩定 loss 不由畫面 round 後的 p 計算。'));break;
    case 'conv': root.append(matrix('Image',m.image,{active:(i,j)=>i>=step.row&&i<step.row+2&&j>=step.col&&j<step.col+2}),matrix('Kernel',m.kernel),matrix('Products at current window',step.products),matrix('Output（未計算格為 N/A）',step.output.map((row,i)=>row.map((value,j)=>i*m.cols+j<=index?value:null)),{active:(i,j)=>i===step.i&&j===step.j}),inspector({windowTopLeft:[step.row,step.col],outputIndex:[step.i,step.j],sum:step.value}));break;
    case 'attention': drawAttention(root,index,m);break;
    case 'multihead': root.append(matrix('E',m.e),el('div',{class:'two-columns'},m.heads.map((h,i)=>el('div',{},el('h3',{},'Head '+(i+1)),matrix('Q',h.q),matrix('K',h.k),matrix('Weights',h.weights,{heat:true}),matrix('Head output',h.output)))),matrix('Concat',m.concat),matrix('Wo',m.wo),matrix('Output',m.output),text('這裡 head value projection=identity；不同 patterns 不代表每個 head 必有可命名功能。'));break;
    case 'kv': root.append(cards([['Stage',step.stage],['Tokens',step.tokens],['KV cache bytes',step.cacheBytes]]),arrayView(Array.from({length:step.tokens},(_,i)=>i+1),{active:step.t===0?Array.from({length:step.tokens},(_,i)=>i):[step.tokens-1]}),table(['本 step','Without cache','With cache'],[['K/V positions computed',step.recomputed,step.appended],['Old positions reused',0,step.reused],['累計 K/V positions computed',step.uncachedTotal,step.cachedTotal]]),inspector({cacheFormula:'2 × '+m.params.layers+' layers × '+m.params.heads+' KV heads × '+step.tokens+' tokens × 4 dim × '+m.params.bytes+' bytes',newQueryScoreCellsPerHead:step.scoreCellsForNewQuery??'prefill matrix',batch:1}),text('Position counts 不是 FLOPs 或速度倍數；decode 的新 Q 仍需讀取全部 cached K/V。'));break;
    case 'decoder': {
      const names=['x','n1','attention output','residual1','n2','mlp','output'],values=[m.x,m.n1,m.a.output,m.residual1,m.n2,m.mlp,m.output];
      root.append(cards(names.map((name,i)=>[name,'3×2',i===index])),matrix(names[index],values[index]),table(['Residual equation','Operands'],[['u=x+a','3×2 + 3×2'],['y=u+MLP(LN(u))','3×2 + 3×2']]),text('This visualization uses Pre-LN；MLP 為 2→2→2 tiny ReLU，無 dropout，LN γ=1、β=0。'));break;
    }
    case 'process': root.append(el('div',{class:'two-columns'},['A','B'].map(process=>el('div',{class:'address-space'},el('h3',{},'Process '+process+' address space'),text('Shared heap value: '+step.heaps[process]),Object.entries(step.contexts).filter(([,v])=>v.process===process).map(([id,v])=>el('div',{class:id===step.running?'thread active':'thread'},id+': private stack ['+v.stack+']；PC='+v.pc+'，r0='+v.r0))))),inspector({running:step.running,switchedFrom:step.previous,savedOldContext:step.saved,restoredBeforeInstruction:step.restored,sameAddressSpace:step.sameAddressSpace}),text('畫面 context values 為切入後完成一條 toy 指令；restored inspector 保留指令前值。'));break;
    case 'memory': root.append(cards([['Virtual address',m.params.address],['TLB',step.phase==='tlb'?'current':'translations',step.phase==='tlb'],['Page table',step.phase==='walk'?'current':'mapping',step.phase==='walk'],['OS handler','fault / resume',['fault','handler','resume'].includes(step.phase)],['Data cache / DRAM','contents',step.phase==='cache']]),table(['VPN','初始 mapping'],[[0,'PFN 3 present'],[1,'PFN 1 present'],[2,'合法，nonresident'],[3,'PFN 2 present'],['≥4','無效']]),inspector(step));break;
    case 'deadlock': drawDeadlock(root,step);break;
    case 'tcp': drawTCP(root,step,index,m);break;
    case 'pipeline': {
      root.append(table(['Cycle', 'IF','ID','EX','MEM','WB','事件'],m.steps.slice(0,index+1).map(t=>[t.cycle,...['IF','ID','EX','MEM','WB'].map(k=>t.row[k]),t.flush.length?'FLUSH '+t.flush.join(','):t.stall?'STALL':t.forwarding?'FORWARD':'advance'])));
      root.append(table(['ID','Instruction'],step.program.map(i=>[i.id,i.label])),inspector({cycle:step.cycle,stall:step.stall,forwarding:step.forwarding,flush:step.flush}),text('Cycle 中顯示的 IF/ID 指令可能在該 cycle 結尾被 flush；target 從下一 cycle 取。'));break;
    }
    case 'cache': root.append(arrayView(cachePatterns[m.params.pattern],{active:[index]}),cards([['Address',step.address],['Line tag',step.tag],['Offset',step.offset],['Result',step.hit?'HIT':'MISS']]),table(['LRU → MRU slot','Line tag','Byte addresses'],step.lines.map((tag,i)=>[i,tag,Array.from({length:Number(m.params.line)},(_,j)=>tag*Number(m.params.line)+j).join(', ')])),inspector({hits:step.hits,misses:step.misses,missRate:fmt(step.missRate),simpleAMAT:fmt(step.amat)}),table(['同 configuration 的完整 trace','Hits','Misses','Simple AMAT'],Object.entries(cachePatterns).map(([name,addresses])=>{const result=C.cacheTrace(addresses,Number(m.params.line),Number(m.params.capacity));return[name,result.hits,result.misses,fmt(result.amat)];})));break;
  }
}
function drawAttention(root,index,m) {
  const {q,k,v,scaled:a,unscaled:u}=m;
  const phaseFormula=[0,0,1,2,2,3,4,5][index];
  root.dataset.formula=phaseFormula;
  if(index===0) {root.append(table(['Token','Embedding'],[['α',m.embeddings[0].join(', ')],['β',m.embeddings[1].join(', ')],['γ',m.embeddings[2].join(', ')]]),matrix('E',m.embeddings));return;}
  if(index===1) {root.append(matrix('WQ',m.wq),matrix('WK',m.wk),matrix('WV',m.wv),matrix('Q=EWQ',q),matrix('K=EWK',k),matrix('V=EWV',v));return;}
  if(index>=2&&index<=6) {
    let selected=[0,0]; const details=el('div',{class:'dot-inspector','aria-live':'polite'});
    const update=(i,j)=>{selected=[i,j];const terms=q[i].map((value,t)=>[t,fmt(value),fmt(k[j][t]),fmt(value*k[j][t])]);details.replaceChildren(table(['component r','Q['+i+',r]','K['+j+',r]','product'],terms,'Score dot-product inspector'),text('Σ products = '+fmt(a.raw[i][j])+'；scaled = '+fmt(a.raw[i][j]/Math.sqrt(q[0].length))+(m.params.causal&&j>i?'；此位置被 causal mask 成 −∞':'')));};
    root.append(matrix('Raw S=QKᵀ（點 cell inspect）',a.raw,{click:update}),details);update(...selected);
    if(index>=3)root.append(matrix('S / √dₖ（mask 前）',a.raw.map(row=>row.map(value=>value/Math.sqrt(q[0].length)))));
    if(index>=4)root.append(matrix('Scores after optional mask',a.scores));
    if(index>=5) {
      root.append(el('div',{class:'two-columns'},matrix('Unscaled softmax',u.weights,{heat:true}),matrix('Scaled softmax',a.weights,{heat:true})),table(['Query row','Σ scaled weights','Max unscaled p','Max scaled p','Max p(1−p) unscaled','Max p(1−p) scaled'],a.weights.map((row,i)=>[i,fmt(row.reduce((s,v)=>s+v,0)),fmt(Math.max(...u.weights[i])),fmt(Math.max(...row)),fmt(Math.max(...u.weights[i].map(p=>p*(1-p)))),fmt(Math.max(...row.map(p=>p*(1-p))))])),text('p(1−p) 是 softmax Jacobian 對角，不是完整 task gradient；scaling 不是唯一原因或穩定性保證。'));
    }
    if(index>=6) {
      const resultDetails=el('div',{'aria-live':'polite'});
      const inspectOutput=(i,j)=>resultDetails.replaceChildren(table(['Key token r','A[i,r]','V[r,j]','Product'],a.weights[i].map((w,r)=>[r,fmt(w),fmt(v[r][j]),fmt(w*v[r][j])])),text('Output['+i+','+j+'] = '+fmt(a.output[i][j])));
      root.append(matrix('V',v),matrix('Output=AV（點 cell inspect weighted sum）',a.output,{click:inspectOutput}),resultDetails);inspectOutput(0,0);
    }
    return;
  }
  const simulations=m.simulation;
  root.append(text('獨立 seeded simulation：q/k 分量彼此獨立、N(0,1)，每 dₖ 2048 次。上方固定 E/W 投影 toy 不滿足此假設，兩者不可混作推導證據。'),plot([{name:'Sample raw variance',points:simulations.map(v=>[v.dk,v.rawVariance])},{name:'Sample scaled variance',points:simulations.map(v=>[v.dk,v.scaledVariance])},{name:'Theory raw variance=dₖ',points:simulations.map(v=>[v.dk,v.dk])}],{xRange:[1,8],yRange:[0,9],label:'IID dot-product sample variance versus d_k'}),table(['dₖ','Raw sample Var','Raw sample SD','Theory SD √dₖ','Scaled sample Var'],simulations.map(v=>[v.dk,fmt(v.rawVariance),fmt(v.rawSD),fmt(Math.sqrt(v.dk)),fmt(v.scaledVariance)])),text('Var(Σqᵣkᵣ)=ΣVar(qᵣkᵣ)=dₖ：cross terms 因獨立 / 零均值消失。除 √dₖ 使 variance 除 dₖ，sample 不會精確等於 1。'));
}
function drawDeadlock(root,step) {
  const p={A:[80,65],B:[470,180],R1:[235,65],R2:[315,180]},diagram=svg('svg',{viewBox:'0 0 560 250',role:'img','aria-label':'Resource allocation graph；實線 allocation、虛線 request',class:'plot'});
  diagram.append(svg('defs',{},svg('marker',{id:'arrow',viewBox:'0 0 10 10',refX:10,refY:5,markerWidth:8,markerHeight:8,orient:'auto-start-reverse'},svg('path',{d:'M 0 0 L 10 5 L 0 10 z',fill:'#174a66'}))));
  const line=(a,b,dashed)=>{const [x1,y1]=p[a],[x2,y2]=p[b],d=Math.hypot(x2-x1,y2-y1);diagram.append(svg('line',{x1:x1+(x2-x1)*27/d,y1:y1+(y2-y1)*27/d,x2:x2-(x2-x1)*28/d,y2:y2-(y2-y1)*28/d,stroke:'#174a66','stroke-width':2,'stroke-dasharray':dashed?'6 4':'','marker-end':'url(#arrow)'}));};
  Object.entries(step.held).forEach(([resource,owners])=>owners.split(',').forEach(owner=>line(resource,owner,false)));step.requests.forEach(([process,resource])=>line(process,resource,true));
  Object.entries(p).forEach(([name,[x,y]])=>{diagram.append(name.startsWith('R')?svg('rect',{x:x-24,y:y-20,width:48,height:40,fill:'#edf4fa',stroke:'#174a66'}):svg('circle',{cx:x,cy:y,r:25,fill:'#fff4dd',stroke:'#174a66'}),svg('text',{x,y:y+5,'text-anchor':'middle'},name));});
  root.append(diagram,inspector({held:step.held,requests:step.requests,deadlocked:step.deadlocked??'尚未判定',conditions:step.conditions}),text('此 graph 僅每 resource 一個 instance；toggle 是改寫 schedule，而非魔法移除現實鎖。'));
}
function drawTCP(root,step,index,m) {
  const time=svg('svg',{viewBox:'0 0 600 290',role:'img','aria-label':'Current TCP message direction',class:'plot'});
  time.append(svg('line',{x1:90,y1:40,x2:90,y2:270,stroke:'#9aa8b6'}),svg('line',{x1:510,y1:40,x2:510,y2:270,stroke:'#9aa8b6'}),svg('text',{x:65,y:25},'Client'),svg('text',{x:480,y:25},'Server'));
  const from=step.from==='client'?90:510,to=step.from==='client'?510:90;
  time.append(svg('line',{x1:from,y1:100,x2:step.flag==='TIMEOUT'?from:to,y2:step.flag==='TIMEOUT'?155:160,stroke:step.dropped?'#b63e43':'#166c85','stroke-width':3,'stroke-dasharray':step.dropped?'8 5':''}),svg('text',{x:170,y:90},step.flag+(step.dropped?' × lost':'')+(step.duplicate?' duplicate':'')),svg('text',{x:170,y:190},'seq '+(step.seq??'—')+' / ack '+(step.ack??'—')));
  root.append(time,table(['Step','Direction','Flag','Seq','ACK','Event'],m.steps.slice(0,index+1).map((t,i)=>[i+1,t.from,t.flag,t.seq??'—',t.ack??'—',t.dropped?'lost':t.duplicate?'duplicate':''])),inspector(step));
}
export function interactive(kind, controlsRoot, visualizationRoot, formulaNode) {
  const controls=(configs[kind]||[]).map(args=>control(...args));controlsRoot.replaceChildren(...controls.map(c=>c.node));
  const validation=el('p',{class:'notice warning',role:'status',hidden:''});controlsRoot.append(validation);
  let controller;
  let parameters;
  const read=()=>{
    let valid=true;
    const candidate=Object.fromEntries(controls.map(({input,read})=>{
      const value=['number','range'].includes(input.type)?numericInputValue(input):read();
      input.setAttribute('aria-invalid',String(value===null));
      if(value===null)valid=false;
      return [input.dataset.key,value];
    }));
    validation.hidden=valid;
    validation.textContent=valid?'':'請完成數值輸入並保持在標示範圍內；計數須為整數。播放已暫停，畫面保留上一組有效參數。';
    if(valid)parameters=candidate;
    return valid;
  };
  read();
  const getModel=()=>{const model=build(kind,parameters);model.steps.forEach((step,i)=>{step.formula=formulaFor(kind,step,i,model);if(kind==='gradient')step.message='Iteration '+step.iteration+'：觀察 gradient 與下一個 update';});return model;};
  const context={setVector:(x,y)=>{for(const [key,value] of [['x',x],['y',y]]){const ctl=controls.find(c=>c.input.dataset.key===key);ctl.input.value=value.toFixed(1);ctl.input.dispatchEvent(new Event('input',{bubbles:true}));}}};
  // Import UI controller here through an already gated lesson module.
  return import('../components/ui.js').then(({StepController})=>{
    controller=new StepController(visualizationRoot,getModel,(root,step,index,m)=>draw(kind,root,step,index,m,context),formulaNode);
    controlsRoot.after(controller.bar);controls.forEach(c=>c.input.addEventListener('input',()=>{controller.pause();if(read())controller.rebuild();}));return controller;
  });
}
// Pure model entry points are also used by numeric tests without a DOM.
export const lessonModel = build;
export const defaultParameters = kind => Object.fromEntries(configs[kind].map(([,key,,value])=>[key,value]));
function formulaFor(kind,step,index,model) {
  const fixed={vector:[0,0,0],eigen:[0,1,2],chain:[0,0,1,2,3],regression:[0,1,2],overfit:[0,1,2],metrics:[0,0,1,[2,3]],network:[0,0,0,0,1,2,3],softmax:[0,0,1,[2,3]],attention:[0,0,1,2,2,3,4,[5,6]],multihead:[0,0,0,1,2],decoder:[0,2,0,0,2,3,1]};
  if(fixed[kind])return fixed[kind][index];
  if(kind==='binary')return step.phase==='init'?1:step.phase==='done'?3:2;
  if(kind==='heap')return index===0?0:index===model.steps.length-1?[1,2]:1;
  if(kind==='graph')return [0,1];
  if(kind==='dp')return step.phase==='cached'?1:0;
  if(kind==='gradient')return index===model.steps.length-1?[1,2]:[0,1];
  if(kind==='conv')return [0,1];
  if(kind==='kv')return [0,step.t===0?1:2];
  if(kind==='process')return index===0?[0,1]:[1,2];
  if(kind==='memory')return {address:0,split:0,tlb:2,walk:2,fault:3,handler:3,resume:3,physical:1,cache:2}[step.phase];
  if(kind==='deadlock')return step.deadlocked===true?[0,1]:0;
  if(kind==='tcp')return step.flag.includes('SYN')?0:['TIMEOUT','RETRANSMIT'].includes(step.flag)?2:1;
  if(kind==='pipeline')return step.flush.length?2:step.stall?0:step.forwarding?1:3;
  if(kind==='cache')return [0,1,2];
  return 0;
}
