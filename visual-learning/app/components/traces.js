// Toy execution models; each trace is generated from inputs, never fabricated UI values.
import {attention, matmul, layerNorm} from './calculations.js';
const copy = x => JSON.parse(JSON.stringify(x));
export function binarySearchTrace(a, target) {
  if (a.some((v, i) => i && v < a[i - 1])) throw new Error('Requires sorted array');
  let lo = 0, hi = a.length;
  const steps = [{lo, hi, mid: null, phase: 'init', message: '候選區間 [lo, hi)；答案也可能是 n'}];
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2), oldLo = lo, oldHi = hi;
    if (a[mid] < target) lo = mid + 1; else hi = mid;
    steps.push({lo: oldLo, hi: oldHi, mid, nextLo: lo, nextHi: hi,
      phase: 'shrink', message: a[mid] < target ? 'A[mid] < target：排除含 mid 的左半部' : 'A[mid] ≥ target：保留 mid 作為候選'});
  }
  steps.push({lo, hi, mid: null, answer: lo, phase: 'done', message: 'lo = hi，回傳第一個 ≥ target 的位置；n 表示不存在'});
  return steps;
}
export const teachingGraph = {A: ['B', 'C'], B: ['A', 'D'], C: ['A', 'D', 'E'], D: ['B', 'C', 'E'], E: ['C', 'D']};
export function graphTrace(graph, start, mode = 'BFS', target = '') {
  if (!['BFS', 'DFS'].includes(mode) || !Array.isArray(graph[start])) throw new Error('Invalid traversal or start');
  if (mode === 'DFS') {
    // Stack frames preserve the recursive DFS path. Marking every sibling on a
    // bulk push would suppress valid tree edges and is not a DFS discovery tree.
    const stack = [{node: start, next: 0}], discovered = new Set([start]);
    const processed = [start], finished = [], parent = {[start]: null}, distance = {[start]: 0};
    const steps = [];
    const record = (current, message) => steps.push({current, message,
      frontier: stack.map(frame => frame.node), discovered: [...discovered],
      processed: [...processed], finished: [...finished], parent: {...parent}, distance: {...distance}});
    record(start, '進入起點；stack 保存目前 recursive path，右端為 top');
    if (start === target) return steps;
    while (stack.length) {
      const frame = stack.at(-1), neighbors = graph[frame.node];
      if (frame.next === neighbors.length) {
        finished.push(frame.node); stack.pop();
        record(frame.node, '鄰居檢查完畢：pop frame，backtrack 到 parent');
        continue;
      }
      const node = neighbors[frame.next++];
      if (discovered.has(node)) continue;
      discovered.add(node); processed.push(node); parent[node] = frame.node;
      distance[node] = distance[frame.node] + 1; stack.push({node, next: 0});
      record(node, node === target ? '首次進入目標；DFS tree distance 不保證 shortest'
        : '只深入一個未發現鄰居；其 subtree 完成後才考慮下一個 sibling');
      if (node === target) break;
    }
    return steps;
  }
  const frontier = [start], discovered = new Set([start]), processed = [], parent = {[start]: null}, distance = {[start]: 0};
  const steps = [{frontier: [...frontier], discovered: [...discovered], processed: [], parent: {...parent}, distance: {...distance}, current: null, message: '起點加入 frontier，discovered 在加入時標記'}];
  while (frontier.length) {
    const current = frontier.shift();
    processed.push(current);
    if (current !== target) {
      const neighbors = graph[current];
      for (const node of neighbors) if (!discovered.has(node)) {
        discovered.add(node); frontier.push(node); parent[node] = current; distance[node] = distance[current] + 1;
      }
    }
    steps.push({current, frontier: [...frontier], discovered: [...discovered], processed: [...processed],
      parent: {...parent}, distance: {...distance}, message: current === target ? '目標取出；BFS 的 distance 是 unweighted shortest distance' : '取出、檢查鄰居，加入尚未 discovered 的節點'});
    if (current === target) break;
  }
  return steps;
}
export function heapTrace(input, operation = 'heapify', value = 2) {
  const a = [...input], steps = [];
  const record = (message, active = []) => steps.push({array: [...a], message, active: [...active]});
  function down(i) {
    while (2 * i + 1 < a.length) {
      const left = 2 * i + 1, right = left + 1;
      const child = right < a.length && a[right] < a[left] ? right : left;
      if (a[i] <= a[child]) break;
      [a[i], a[child]] = [a[child], a[i]]; record('Bubble down：與較小 child 交換', [i, child]); i = child;
    }
  }
  record('輸入 array；中途可能尚未符合 min-heap property');
  for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) down(i);
  record('Bottom-up heapify 完成');
  if (operation === 'insert') {
    a.push(value); let i = a.length - 1; record('Append 在最後位置', [i]);
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (a[p] <= a[i]) break;
      [a[i], a[p]] = [a[p], a[i]]; record('Bubble up：修復 parent-child 順序', [i, p]); i = p;
    }
    record('Insert 完成，所有 parent ≤ child');
  } else if (operation === 'pop' && a.length) {
    const removed = a[0], last = a.pop();
    if (a.length) {a[0] = last; record('Last element 移到 root', [0]); down(0);}
    record('Pop min = ' + removed + '；重新符合 heap property');
  }
  return steps;
}
export function fibTrace(n, mode = 'bottom-up') {
  const cache = {0: 0, 1: 1}, steps = [];
  let calls = 0;
  const visit = k => {
    calls++; steps.push({k, cache: {...cache}, message: '呼叫 F(' + k + ')', phase: 'call'});
    if (cache[k] !== undefined) {steps.push({k, cache: {...cache}, message: 'Cache / base case 命中', phase: 'cached'}); return cache[k];}
    cache[k] = visit(k - 1) + visit(k - 2);
    steps.push({k, cache: {...cache}, message: '儲存 F(' + k + ')', phase: 'save'});
    return cache[k];
  };
  if (mode === 'memo') visit(n);
  else {
    steps.push({k: 1, cache: {...cache}, message: 'Base：F(0)=0，F(1)=1', phase: 'base'});
    for (let k = 2; k <= n; k++) {
      cache[k] = cache[k - 1] + cache[k - 2];
      steps.push({k, cache: {...cache}, message: '由已知子問題填入下一個 state', phase: 'transition'});
    }
  }
  function naive(k) {return k < 2 ? {value: k, calls: 1} : (() => {const a = naive(k - 1), b = naive(k - 2); return {value: a.value + b.value, calls: 1 + a.calls + b.calls};})();}
  const raw = naive(n);
  return {steps, value: cache[n], naiveCalls: raw.calls, memoCalls: mode === 'memo' ? calls : null};
}
export function attentionExample(dk = 2, causal = false) {
  const embeddings = [[1, 0], [0, 1], [1, 1]];
  const wq = Array.from({length: 2}, (_, r) => Array.from({length: dk}, (_, j) => ((j + r) % 3 === 0 ? 1 : (j + r) % 3 === 1 ? 0.5 : -0.5)));
  const wk = Array.from({length: 2}, (_, r) => Array.from({length: dk}, (_, j) => ((j + 2 * r) % 3 === 0 ? 1 : (j + 2 * r) % 3 === 1 ? -0.5 : 0.5)));
  const wv = [[1, 0], [0, 2]], q = matmul(embeddings, wq), k = matmul(embeddings, wk), v = matmul(embeddings, wv);
  return {embeddings, wq, wk, wv, q, k, v, scaled: attention(q, k, v, {causal}),
    unscaled: attention(q, k, v, {scaled: false, causal})};
}
export function multiHeadExample(causal = false) {
  const e = [[1, 0], [0, 1], [1, 1]], v = e;
  const heads = [0, 1].map(i => {
    const q = e.map(r => [r[i]]), k = e.map(r => [r[i]]);
    return {q, k, ...attention(q, k, v, {causal})};
  });
  const concat = heads[0].output.map((r, i) => [...r, ...heads[1].output[i]]);
  const wo = [[1, 0], [0, 1], [0.5, 0], [0, 0.5]];
  return {e, heads, concat, wo, output: matmul(concat, wo)};
}
export function decoderExample() {
  const x = [[1, 3], [2, 0], [0, 1]], n1 = x.map(r => layerNorm(r));
  const a = attention(n1, n1, n1, {causal: true}), residual1 = x.map((r, i) => r.map((v, j) => v + a.output[i][j]));
  const n2 = residual1.map(r => layerNorm(r));
  const w1 = [[1, -0.5], [0.5, 1]], w2 = [[0.5, 0], [0, 0.5]];
  const hidden = matmul(n2, w1).map(r => r.map(v => Math.max(0, v)));
  const mlp = matmul(hidden, w2), output = residual1.map((r, i) => r.map((v, j) => v + mlp[i][j]));
  return {x, n1, a, residual1, n2, w1, hidden, w2, mlp, output};
}
export function kvTrace(prompt = 3, decode = 3, kvHeads = 2, dim = 4, bytes = 2, layers = 1) {
  let uncachedTotal = 0;
  return Array.from({length: decode + 1}, (_, t) => {
    const tokens = prompt + t, recomputed = tokens, appended = t === 0 ? prompt : 1;
    uncachedTotal += recomputed;
    return {t, tokens, stage: t === 0 ? 'Prefill' : 'Decode', recomputed, appended,
      reused: t === 0 ? 0 : tokens - 1, cachedTotal: prompt + t, uncachedTotal,
      cacheBytes: 2 * layers * kvHeads * tokens * dim * bytes,
      scoreCellsForNewQuery: t === 0 ? null : tokens};
  });
}
export function processTrace(mode = 'thread') {
  const contexts = {A1: {process: 'A', pc: 0, r0: 1, stack: [11]}, A2: {process: 'A', pc: 0, r0: 7, stack: [22]}, B1: {process: 'B', pc: 0, r0: 3, stack: [33]}};
  const heaps = {A: 10, B: 100}, sequence = mode === 'thread' ? ['A1', 'A2', 'A1', 'A2'] : ['A1', 'B1', 'A1', 'B1'];
  let previous = null;
  return sequence.map((id, i) => {
    const saved = previous ? {...contexts[previous]} : null, sameAddressSpace = previous ? contexts[previous].process === contexts[id].process : null;
    const restored = {...contexts[id], stack: [...contexts[id].stack]};
    contexts[id].pc++; contexts[id].r0++; heaps[contexts[id].process]++;
    const state = {tick: i, running: id, previous, saved, restored, restoredThread: id, sameAddressSpace, contexts: copy(contexts), heaps: {...heaps}};
    previous = id; return state;
  });
}
export function memoryTrace(address = 5, tlbHit = false, source = 'zero', dataCacheHit = true) {
  const vpn = Math.floor(address / 4), offset = address % 4, table = {0: 3, 1: 1, 3: 2};
  const steps = [{phase: 'address', message: 'Virtual address', address},
    {phase: 'split', message: 'page size = 4 bytes（教學尺度）', vpn, offset}];
  if (vpn > 3) return [...steps, {phase: 'fault', message: '無效 / 未授權 address：handler 拒絕；不恢復正常存取', error: true}];
  const resident = table[vpn] !== undefined, hit = tlbHit && resident;
  steps.push({phase: 'tlb', message: hit ? 'TLB hit：取得 VPN→PFN' : 'TLB miss：需要 page-table walk', tlbHit: hit});
  if (!hit) steps.push({phase: 'walk', message: resident ? 'PTE present：查到 physical frame' : 'PTE not present：page fault，不等於 TLB miss', resident});
  if (!resident) {
    steps.push({phase: 'fault', message: 'OS handler：合法 mapping 尚未 resident', pageFault: true});
    steps.push({phase: 'handler', message: source === 'file' ? '此例為 file-backed：需要 storage I/O' : '此例為 demand-zero：配置清零 frame，無 storage I/O', storageIO: source === 'file'});
    table[vpn] = 5;
    steps.push({phase: 'resume', message: '更新 mapping / TLB，重試指令'});
  }
  const frame = table[vpn];
  steps.push({phase: 'physical', message: '完成 translation', frame, offset, physicalAddress: frame * 4 + offset});
  steps.push({phase: 'cache', message: dataCacheHit ? 'Data cache hit：讀取資料' : 'Data cache miss：本例由 DRAM 取資料，不是 disk access', dataCacheHit, storageIO: false});
  return steps;
}
export function deadlockTrace({exclusive = true, hold = true, noPreemption = true, circular = true} = {}) {
  const conditions = {exclusive, hold, noPreemption, circular}, deadlocked = exclusive && hold && noPreemption && circular;
  let held = {R1: 'A', R2: 'B'}, requests = [];
  const states = [{conditions, held: {}, requests: [], message: '兩個 processes；每個 resource 僅一個 instance'}];
  states.push({conditions, held: {...held}, requests: [], message: 'A 持有 R1，B 持有 R2'});
  if (!exclusive) {held = {R1: 'A,B', R2: 'A,B'}; states.push({conditions, held, requests: [], message: '改為可共享資源：請求不必等待'});}
  else if (!hold) {states.push({conditions, held: {}, requests: [], message: '要求等待前先放掉已持有資源，破壞 hold-and-wait'});}
  else if (!circular) {states.push({conditions, held: {R1: 'A', R2: 'A'}, requests: [['B', 'R1']], message: '固定 R1→R2 的取得順序；此為改寫後的 schedule'});}
  else if (!noPreemption) {states.push({conditions, held: {R1: 'A', R2: 'A'}, requests: [['B', 'R1']], message: '此模型允許安全回收 B 的 R2，再交給 A；現實資源未必能 preempt'});}
  else {requests = [['A', 'R2'], ['B', 'R1']]; states.push({conditions, held, requests, message: 'A 等 R2，B 等 R1：此 single-instance 模型形成 deadlock'});}
  states.push({...states.at(-1), deadlocked, message: deadlocked ? '無法自行推進；需破壞等待條件或外部恢復' : '此設定沒有 deadlock；不保證所有系統永遠安全'});
  return states;
}
export function tcpTrace(loss = 'none') {
  const steps = [
    {from: 'client', seq: 100, flag: 'SYN', ack: null, message: 'Client SYN，SYN 消耗一個 sequence number'},
    {from: 'server', seq: 700, flag: 'SYN-ACK', ack: 101, message: 'Server 確認 client SYN，自己的 SYN 也消耗一個號碼'},
    {from: 'client', seq: 101, flag: 'ACK', ack: 701, message: 'Client 確認 server SYN；建立連線'},
    {from: 'client', seq: 101, flag: 'DATA', bytes: 3, dropped: loss === 'data', message: '3 bytes payload，seq = 101'}];
  if (loss === 'data') {
    steps.push({from: 'client', flag: 'TIMEOUT', message: '示意 RTO 到期；尚未取得 ACK'});
    steps.push({from: 'client', seq: 101, flag: 'RETRANSMIT', bytes: 3, message: '重傳同一 byte range；不是新的 sequence number'});
  }
  steps.push({from: 'server', flag: 'ACK', ack: 104, dropped: loss === 'ack', deliveredBytes: 3, message: 'ACK 104：下一個預期 byte；第一次交付 3 bytes'});
  if (loss === 'ack') {
    steps.push({from: 'client', flag: 'TIMEOUT', message: 'ACK 遺失，sender 仍會重傳'});
    steps.push({from: 'client', seq: 101, flag: 'RETRANSMIT', bytes: 3, duplicate: true, message: 'Receiver 偵測重複 byte range，不再次交付'});
    steps.push({from: 'server', flag: 'ACK', ack: 104, deliveredBytes: 3, message: '再次 ACK 104；application 合計仍只有 3 bytes'});
  }
  return steps;
}
export function pipelineTrace({forwarding = true, branchTaken = false, load = false} = {}) {
  const program = [
    {id: 'I1', label: load ? 'LD R1,[R2]' : 'ADD R1,R2,R3', dst: 'R1', src: ['R2', 'R3'], load},
    {id: 'I2', label: 'ADD R4,R1,R5', dst: 'R4', src: ['R1', 'R5']},
    {id: 'I3', label: 'BEQ R4,R0,target', src: ['R4', 'R0'], branch: true},
    {id: 'I4', label: 'ADD R7,R2,R3', dst: 'R7', src: ['R2', 'R3']},
    {id: 'I5', label: 'ADD R8,R2,R3', dst: 'R8', src: ['R2', 'R3']},
    {id: 'I6', label: 'target: ADD R9,R2,R3', dst: 'R9', src: ['R2', 'R3']}];
  const stages = ['IF', 'ID', 'EX', 'MEM', 'WB'], steps = [];
  let slots = [null, null, null, null, null], pc = 0, cycle = 0, flushed = false;
  while ((pc < program.length || slots.some(Boolean)) && cycle < 40) {
    if (!slots[0] && pc < program.length) slots[0] = program[pc++];
    cycle++;
    const consumer = slots[1], hazards = consumer ? [slots[2], slots[3]].filter(p => p?.dst && consumer.src.includes(p.dst)) : [];
    const stall = hazards.length > 0 && (!forwarding || Boolean(slots[2]?.load && hazards.includes(slots[2])));
    const taken = branchTaken && slots[2]?.branch && !flushed;
    const row = Object.fromEntries(stages.map((s, i) => [s, slots[i]?.id || '—']));
    steps.push({cycle, row, stall: !taken && stall, forwarding: forwarding && hazards.length > 0 && !stall,
      flush: taken ? [slots[0]?.id, slots[1]?.id].filter(Boolean) : [], message: taken ? 'Branch 在 EX resolved：flush 年輕的 IF / ID，下一 cycle 取 target' : stall ? 'RAW hazard：ID / IF hold，EX 插入 bubble' : forwarding && hazards.length ? 'Forwarding 支援相依資料（load-use 仍可能需 stall）' : '五階段 teaching pipeline 同時處理不同指令', program});
    let next = [null, null, slots[1], slots[2], slots[3]];
    if (taken) {next[2] = null; pc = 5; flushed = true;}
    else if (stall) {next[2] = null; next[1] = slots[1]; next[0] = slots[0];}
    else {next[1] = slots[0];}
    slots = next;
  }
  return steps;
}
