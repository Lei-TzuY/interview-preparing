import test from 'node:test';
import assert from 'node:assert/strict';
import * as C from '../app/components/calculations.js';
import * as T from '../app/components/traces.js';
import {lessons} from '../app/manifest.js';
import {lessonModel,defaultParameters} from '../app/lessons/renderers.js';
import {numericInputValue} from '../app/components/ui.js';
const near=(a,b,epsilon=1e-10)=>assert.ok(Math.abs(a-b)<=epsilon,`${a} != ${b}`);
const matrixNear=(a,b)=>{assert.deepEqual(a.map(r=>r.length),b.map(r=>r.length));a.forEach((row,i)=>row.forEach((v,j)=>near(v,b[i][j])));};
test('Known matrix / dot / transpose; dimension errors',()=>{
  assert.deepEqual(C.matmul([[1,2,3],[4,5,6]],[[1,0],[0,1],[1,1]]),[[4,5],[10,11]]);
  assert.equal(C.dot([2,-1,3],[4,2,1]),9);
  assert.deepEqual(C.transpose([[1,2,3],[4,5,6]]),[[1,4],[2,5],[3,6]]);
  assert.throws(()=>C.matmul([[1,2]],[[1,2]]));
  assert.throws(()=>C.matrixShape([[1],[2,3]]));assert.throws(()=>C.matrixShape([[NaN]]));
});
test('Stable softmax: uniform, translation invariance, masked and extreme logits',()=>{
  matrixNear([C.softmax([0,0,0])],[[1/3,1/3,1/3]]);
  matrixNear([C.softmax([1,2,0])],[C.softmax([1001,1002,1000])]);
  const p=C.softmax([1000,-1000,999]);near(p.reduce((a,b)=>a+b,0),1);assert.ok(p.every(Number.isFinite));
  assert.equal(C.softmax([2,-Infinity])[1],0);
  assert.throws(()=>C.softmax([-Infinity,-Infinity]));assert.throws(()=>C.softmax([Infinity,1]));
});
test('Cross entropy oracle and gradient; no log of rounded probability',()=>{
  near(C.crossEntropy([0,0],0),Math.log(2));near(C.crossEntropy([0,Math.log(3)],1),-Math.log(0.75));
  near(C.crossEntropy([1000,-1000],1),2000);assert.equal(C.crossEntropy([1000,-1000],0),0);
  const z=[1,2,-1],target=1,p=C.softmax(z),eps=1e-5;
  z.forEach((_,i)=>{const plus=[...z],minus=[...z];plus[i]+=eps;minus[i]-=eps;near((C.crossEntropy(plus,target)-C.crossEntropy(minus,target))/(2*eps),p[i]-(i===target?1:0),1e-8);});
  assert.throws(()=>C.crossEntropy([0],1));
});
test('Attention raw QK transpose, scaling, row sum and independently known output',()=>{
  const q=[[1,0],[0,1]],k=[[1,0],[0,1]],v=[[2,0],[0,4]],a=C.attention(q,k,v);
  assert.deepEqual(a.raw,[[1,0],[0,1]]);near(a.scores[0][0],1/Math.sqrt(2));
  const p=Math.exp(1/Math.sqrt(2))/(Math.exp(1/Math.sqrt(2))+1);
  matrixNear(a.weights,[[p,1-p],[1-p,p]]);matrixNear(a.output,[[2*p,4*(1-p)],[2*(1-p),4*p]]);
  a.weights.forEach(row=>near(row.reduce((s,x)=>s+x,0),1));
  assert.deepEqual(a.shapes,{q:[2,2],k:[2,2],v:[2,2],weights:[2,2]});
  assert.ok(C.attention(q,k,v,{scaled:false}).weights[0][0]>a.weights[0][0]);
});
test('Attention causal mask / weighted output / non-square unmasked shapes',()=>{
  const a=C.attention([[1,0],[0,1]],[[1,0],[0,1]],[[2,0],[0,4]],{causal:true});
  assert.equal(a.scores[0][1],-Infinity);assert.equal(a.weights[0][1],0);assert.deepEqual(a.output[0],[2,0]);
  const b=C.attention([[0,0]],[[1,0],[0,1]],[[2],[6]]);matrixNear(b.output,[[4]]);
  assert.throws(()=>C.attention([[1,2]],[[1]],[[1]]));
  assert.throws(()=>C.attention([[1]],[[1],[2]],[[1]]));
  assert.throws(()=>C.attention([[1]],[[1],[2]],[[1],[2]],{causal:true}));
});
test('Attention stable under large finite raw scores; flagship dk / mask combinations',()=>{
  const a=C.attention([[1000,1000]],[[1000,1000],[-1000,-1000]],[[3],[5]]);
  near(a.weights[0][0],1);near(a.output[0][0],3);
  for(const dk of [1,2,4,8])for(const causal of [true,false]) {
    const m=T.attentionExample(dk,causal);assert.deepEqual(C.matrixShape(m.q),[3,dk]);assert.deepEqual(C.matrixShape(m.scaled.output),[3,2]);
    m.scaled.weights.forEach((row,i)=>{near(row.reduce((s,v)=>s+v,0),1);row.forEach((p,j)=>{if(causal&&j>i)assert.equal(p,0);});});
    assert.deepEqual(m.scaled.raw,C.matmul(m.q,C.transpose(m.k)));
  }
});
test('IID scaling simulation distinguishes variance and SD with seeded reproducibility',()=>{
  for(const dk of [1,2,4,8]) {
    const m=C.dotVariance(dk,8192,17);near(m.scaledVariance,m.rawVariance/dk,1e-10);
    near(m.rawSD**2,m.rawVariance,1e-10);assert.ok(Math.abs(m.rawVariance/dk-1)<0.15);
    assert.deepEqual(m,C.dotVariance(dk,8192,17));
  }
});
test('Metrics oracle and zero-denominator policy',()=>{
  const m=C.confusionMetrics(8,2,4,16);near(m.precision,.8);near(m.recall,2/3);near(m.f1,8/11);near(m.accuracy,.8);
  assert.deepEqual(C.confusionMetrics(0,0,0,0),{precision:null,recall:null,f1:null,accuracy:null});
  assert.deepEqual(C.confusionMetrics(0,0,3,7),{precision:null,recall:0,f1:0,accuracy:.7});
  assert.throws(()=>C.confusionMetrics(-1,0,0,0));assert.throws(()=>C.confusionMetrics(.5,0,0,0));
});
test('Scalar chain rule known graph and finite differences',()=>{
  const m=C.scalarGraph(2,.5,0,2);assert.equal(m.z,1);assert.equal(m.loss,.5);
  assert.deepEqual(m.gradients,{x:-.5,w:-2,b:-1});
  const eps=1e-5;near((C.scalarGraph(2,.5+eps,0,2).loss-C.scalarGraph(2,.5-eps,0,2).loss)/(2*eps),m.gradients.w,1e-9);
});
test('Quadratic descent step, convergence and overshoot oracle',()=>{
  const a=C.gradientTrace(-2,.25,2);assert.equal(a[0].gradient,-4);assert.equal(a[0].next,-1);assert.equal(a[1].w,-1);assert.equal(a[1].loss,4.5);
  assert.ok(C.gradientTrace(-2,.3,12).at(-1).loss<.01);
  assert.equal(C.gradientTrace(-2,2,4).at(-1).loss,8);assert.ok(C.gradientTrace(-2,2.5,4).at(-1).loss>8);
});
test('Tiny network analytic gradients versus finite difference for every parameter',()=>{
  const x=[1,2],a=[[.5,-.25],[-.5,.75]],b=[0,.1],v=[1,-.5],c=0,target=1,lr=.1;
  const m=C.tinyNetwork(x,a,b,v,c,target,lr),eps=1e-5;
  for(let i=0;i<2;i++)for(let j=0;j<2;j++) {
    const ap=a.map(r=>[...r]),am=a.map(r=>[...r]);ap[i][j]+=eps;am[i][j]-=eps;
    near((C.tinyNetwork(x,ap,b,v,c,target).loss-C.tinyNetwork(x,am,b,v,c,target).loss)/(2*eps),m.gradients.a[i][j],1e-8);
  }
  for(let i=0;i<2;i++) {
    const bp=[...b],bm=[...b],vp=[...v],vm=[...v];bp[i]+=eps;bm[i]-=eps;vp[i]+=eps;vm[i]-=eps;
    near((C.tinyNetwork(x,a,bp,v,c,target).loss-C.tinyNetwork(x,a,bm,v,c,target).loss)/(2*eps),m.gradients.b[i],1e-8);
    near((C.tinyNetwork(x,a,b,vp,c,target).loss-C.tinyNetwork(x,a,b,vm,c,target).loss)/(2*eps),m.gradients.v[i],1e-8);
  }
  near((C.tinyNetwork(x,a,b,v,c+eps,target).loss-C.tinyNetwork(x,a,b,v,c-eps,target).loss)/(2*eps),m.gradients.c,1e-8);
  const u=m.updated;assert.ok(C.tinyNetwork(x,u.a,u.b,u.v,u.c,target).loss<m.loss);
});
test('CNN cross-correlation oracle, shape and stride',()=>{
  assert.deepEqual(C.convolution([[1,2,3],[4,5,6],[7,8,9]],[[1,0],[0,-1]]).output,[[-4,-4],[-4,-4]]);
  const m=C.convolution([[1,2,3],[4,5,6],[7,8,9]],[[1,1],[1,1]],2);assert.deepEqual(m.output,[[12]]);
  assert.throws(()=>C.convolution([[1]],[[1,2]],1));assert.throws(()=>C.convolution([[1]],[[1]],0));
});
test('LayerNorm constant and nonconstant features; Pre-LN residuals / multihead shapes',()=>{
  assert.deepEqual(C.layerNorm([2,2]),[0,0]);near(C.mean(C.layerNorm([1,3])),0);
  const d=T.decoderExample();assert.deepEqual(C.matrixShape(d.output),[3,2]);
  d.output.forEach((row,i)=>row.forEach((v,j)=>near(v,d.residual1[i][j]+d.mlp[i][j])));
  const h=T.multiHeadExample();assert.deepEqual(C.matrixShape(h.concat),[3,4]);assert.deepEqual(C.matrixShape(h.output),[3,2]);
});
test('Polynomial fit recovers known line and rejects singular system',()=>{
  const weights=C.fitPolynomial([[-1,-1],[0,1],[1,3]],1,0);matrixNear([weights],[[1,2]]);near(C.polynomial(weights,2),5);
  assert.throws(()=>C.solveLinear([[1,1],[1,1]],[1,1]));
});
test('Binary lower_bound duplicates / empty / absent; interval strictly shrinks',()=>{
  for(const [a,target,answer] of [[[1,2,2,2,4],2,1],[[],2,0],[[1,2],0,0],[[1,2],3,2],[[1,2,4],3,2]]) {
    const t=T.binarySearchTrace(a,target);assert.equal(t.at(-1).answer,answer);
    for(const state of t.filter(s=>s.phase==='shrink'))assert.ok(state.nextHi-state.nextLo<state.hi-state.lo);
  }
  assert.throws(()=>T.binarySearchTrace([2,1],1));
});
test('Heap final property for heapify / insert / pop including empty / duplicates',()=>{
  for(const input of [[],[1],[7,3,5,1,4],[2,2,2]])for(const op of ['heapify','insert','pop']) {
    const end=T.heapTrace(input,op,-1).at(-1).array;
    end.forEach((v,i)=>{if(i)assert.ok(end[Math.floor((i-1)/2)]<=v);});
    if(op==='pop'&&input.length)assert.deepEqual([...end].sort((a,b)=>a-b),[...input].sort((a,b)=>a-b).slice(1));
    if(op==='insert')assert.equal(end[0],-1);
  }
});
test('BFS known traversal / shortest distance; disconnected nodes not invented',()=>{
  const end=T.graphTrace(T.teachingGraph,'A','BFS').at(-1);assert.deepEqual(end.processed,['A','B','C','D','E']);assert.deepEqual(end.distance,{A:0,B:1,C:1,D:2,E:2});
  const target=T.graphTrace(T.teachingGraph,'A','BFS','E').at(-1);assert.equal(target.distance.E,2);
  assert.equal(T.graphTrace({A:[],B:[]},'A','BFS').at(-1).discovered.length,1);
});
test('DFS discovery tree matches recursive DFS; frames backtrack before entering siblings',()=>{
  const reference=graph=>{
    const parent={A:null},order=[],finished=[];
    const visit=node=>{order.push(node);for(const neighbor of graph[node])if(!(neighbor in parent)){parent[neighbor]=node;visit(neighbor);}finished.push(node);};
    visit('A');return {parent,order,finished};
  };
  for(const graph of [T.teachingGraph,{A:['B','C'],B:['A','C'],C:['A','B']},{A:[],B:[]}]) {
    const expected=reference(graph),trace=T.graphTrace(graph,'A','DFS'),last=trace.at(-1);
    assert.deepEqual(last.parent,expected.parent);assert.deepEqual(last.processed,expected.order);
    assert.deepEqual(last.finished,expected.finished);assert.deepEqual(last.frontier,[]);
    for(const state of trace)state.frontier.forEach((node,i)=>{if(i)assert.equal(state.parent[node],state.frontier[i-1]);});
  }
  const dfs=T.graphTrace(T.teachingGraph,'A','DFS','E').at(-1);
  assert.equal(dfs.distance.E,4);assert.equal(dfs.parent.C,'D');
  assert.equal(T.graphTrace(T.teachingGraph,'A','BFS','E').at(-1).distance.E,2);
});
test('Numeric controls preserve incomplete / negative input and reject invalid counts without coercion',()=>{
  const field=value=>({value,min:'-10',max:'10',step:'0.1'});
  for(const value of ['', '-', '1e', 'Infinity', 'NaN', '11', '-11']) {
    const input=field(value);assert.equal(numericInputValue(input),null);assert.equal(input.value,value);
  }
  for(const value of ['-2','0','2.5'])assert.equal(numericInputValue(field(value)),Number(value));
  assert.equal(numericInputValue({value:'1.5',min:'0',max:'100',step:'1'}),null);
  assert.equal(numericInputValue({value:'-1',min:'0',max:'100',step:'1'}),null);
});
test('Fibonacci memo / bottom-up agree with oracle; duplicated naive calls',()=>{
  const oracle=[0,1,1,2,3,5,8];oracle.forEach((value,n)=>{assert.equal(T.fibTrace(n,'memo').value,value);assert.equal(T.fibTrace(n,'bottom-up').value,value);});
  const m=T.fibTrace(6,'memo');assert.ok(m.memoCalls<m.naiveCalls);assert.equal(m.naiveCalls,25);
});
test('Cache LRU deterministic trace and AMAT; miss is not storage access',()=>{
  const a=C.cacheTrace([0,1,4,0,8,4],4,2);assert.deepEqual(a.steps.map(s=>s.hit),[false,true,false,true,false,false]);
  assert.equal(a.hits,2);assert.equal(a.misses,4);near(a.amat,1+20*4/6);assert.deepEqual(a.steps.at(-1).lines,[2,1]);
  assert.throws(()=>C.cacheTrace([1],0,2));
});
test('Memory paths distinguish resident TLB miss, legal fault, invalid mapping and data cache',()=>{
  const resident=T.memoryTrace(5,false,'file',false);assert.ok(resident.some(s=>s.phase==='walk'));assert.ok(!resident.some(s=>s.pageFault));assert.equal(resident.find(s=>s.phase==='physical').physicalAddress,5);
  const zero=T.memoryTrace(8,false,'zero',false);assert.ok(zero.some(s=>s.pageFault));assert.equal(zero.find(s=>s.phase==='handler').storageIO,false);
  assert.equal(T.memoryTrace(8,false,'file').find(s=>s.phase==='handler').storageIO,true);
  const invalid=T.memoryTrace(16);assert.equal(invalid.at(-1).error,true);assert.ok(!invalid.some(s=>s.phase==='physical'));
});
test('TCP lost data / ACK preserve byte range and application delivery',()=>{
  for(const loss of ['none','data','ack']) {const t=T.tcpTrace(loss);assert.equal(t.at(-1).ack,104);assert.equal(t.at(-1).deliveredBytes,3);assert.equal(t[2].seq,101);}
  const ack=T.tcpTrace('ack');assert.equal(ack.find(s=>s.duplicate).seq,101);
});
test('Pipeline timing has correct RAW stalls, load-use bubble and branch flush',()=>{
  const forward=T.pipelineTrace({forwarding:true}),no=T.pipelineTrace({forwarding:false}),load=T.pipelineTrace({forwarding:true,load:true}),branch=T.pipelineTrace({forwarding:true,branchTaken:true});
  assert.equal(forward.length,10);assert.equal(forward.filter(s=>s.stall).length,0);assert.equal(no.filter(s=>s.stall).length,4);
  assert.equal(load.filter(s=>s.stall).length,1);assert.deepEqual(branch.find(s=>s.flush.length).flush,['I5','I4']);
  const flush=branch.find(s=>s.flush.length),next=branch.find(s=>s.cycle===flush.cycle+1);assert.equal(next.row.IF,'I6');assert.equal(next.row.EX,'—');
});
test('KV element bookkeeping / bytes and context switch snapshots',()=>{
  const m=T.kvTrace(3,2,2,4,2,1);assert.equal(m[0].cacheBytes,96);assert.equal(m[2].cacheBytes,160);assert.equal(m[2].appended,1);assert.equal(m[2].reused,4);assert.equal(m[2].uncachedTotal,12);assert.equal(m[2].cachedTotal,5);
  const states=T.processTrace('thread');assert.equal(states[1].sameAddressSpace,true);assert.equal(states[1].restored.pc,0);assert.equal(states[1].contexts.A2.pc,1);assert.equal(states[0].contexts.A2.pc,0);
  assert.equal(T.processTrace('process')[1].sameAddressSpace,false);
});
test('Deadlock modeled cycle and each condition break have an explicit nondeadlocked state',()=>{
  assert.equal(T.deadlockTrace().at(-1).deadlocked,true);
  for(const key of ['exclusive','hold','noPreemption','circular'])assert.equal(T.deadlockTrace({[key]:false}).at(-1).deadlocked,false);
});
test('Every interactive lesson model produces a finite, bounded step trace without DOM',()=>{
  for(const lesson of lessons) {const model=lessonModel(lesson.kind,defaultParameters(lesson.kind));assert.ok(model.steps.length>1&&model.steps.length<100,lesson.id);}
});
