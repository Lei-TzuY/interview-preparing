// Pure, deterministic calculations. No DOM, network, storage or diagnostic writes.
export function matrixShape(a) {
  if (!Array.isArray(a) || !a.length || !Array.isArray(a[0]) || !a[0].length ||
      a.some(r => r.length !== a[0].length || r.some(v => !Number.isFinite(v)))) {
    throw new Error('矩陣必須為非空、矩形且包含有限數值');
  }
  return [a.length, a[0].length];
}
export const dot = (a, b) => {
  if (a.length !== b.length) throw new Error('Dot product shape mismatch');
  return a.reduce((s, v, i) => s + v * b[i], 0);
};
export function transpose(a) {
  const [rows, cols] = matrixShape(a);
  return Array.from({length: cols}, (_, j) => Array.from({length: rows}, (_, i) => a[i][j]));
}
export function matmul(a, b) {
  const [n, d] = matrixShape(a), [k, m] = matrixShape(b);
  if (d !== k) throw new Error('Matrix multiplication shape mismatch');
  return Array.from({length: n}, (_, i) =>
    Array.from({length: m}, (_, j) => a[i].reduce((s, v, t) => s + v * b[t][j], 0)));
}
export function softmax(z) {
  if (!z.length || z.some(v => Number.isNaN(v) || v === Infinity)) throw new Error('Invalid logits');
  const max = Math.max(...z);
  if (max === -Infinity) throw new Error('All-masked row has no probability distribution');
  const exp = z.map(v => Math.exp(v - max)), sum = exp.reduce((a, b) => a + b, 0);
  return exp.map(v => v / sum);
}
export function crossEntropy(z, target) {
  if (!Number.isInteger(target) || target < 0 || target >= z.length || z.some(v => !Number.isFinite(v))) {
    throw new Error('Invalid cross-entropy input');
  }
  const max = Math.max(...z);
  return max - z[target] + Math.log(z.reduce((s, v) => s + Math.exp(v - max), 0));
}
export function attention(q, k, v, {scaled = true, causal = false} = {}) {
  const [nq, dk] = matrixShape(q), [nk, kd] = matrixShape(k), [nv] = matrixShape(v);
  if (dk !== kd || nk !== nv || (causal && nq !== nk)) throw new Error('Attention shape mismatch');
  const raw = matmul(q, transpose(k));
  const scores = raw.map((r, i) => r.map((s, j) => causal && j > i ? -Infinity : s / (scaled ? Math.sqrt(dk) : 1)));
  const weights = scores.map(softmax);
  return {raw, scores, weights, output: matmul(weights, v), shapes: {q: [nq, dk], k: [nk, dk], v: matrixShape(v), weights: [nq, nk]}};
}
export const mean = a => a.reduce((s, v) => s + v, 0) / a.length;
export const variance = a => {
  if (a.length < 2) throw new Error('Sample variance requires at least two observations');
  const m = mean(a);
  return a.reduce((s, v) => s + (v - m) ** 2, 0) / (a.length - 1);
};
export function seededRandom(seed = 17) {
  let state = seed >>> 0;
  return () => ((state = (Math.imul(1664525, state) + 1013904223) >>> 0) + 0.5) / 4294967296;
}
export function normal(rng) {
  return Math.sqrt(-2 * Math.log(rng())) * Math.cos(2 * Math.PI * rng());
}
export function dotVariance(dk, samples = 2048, seed = 17) {
  const rng = seededRandom(seed);
  const values = Array.from({length: samples}, () =>
    Array.from({length: dk}, () => normal(rng) * normal(rng)).reduce((a, b) => a + b, 0));
  return {dk, samples, mean: mean(values), rawVariance: variance(values),
    scaledVariance: variance(values.map(v => v / Math.sqrt(dk))),
    rawSD: Math.sqrt(variance(values)), expectedVariance: dk, expectedScaledVariance: 1};
}
export function confusionMetrics(tp, fp, fn, tn) {
  if ([tp, fp, fn, tn].some(v => !Number.isInteger(v) || v < 0)) throw new Error('Counts must be nonnegative integers');
  const ratio = (a, b) => b === 0 ? null : a / b;
  return {precision: ratio(tp, tp + fp), recall: ratio(tp, tp + fn),
    f1: ratio(2 * tp, 2 * tp + fp + fn), accuracy: ratio(tp + tn, tp + fp + fn + tn)};
}
export const sigmoid = z => z >= 0 ? 1 / (1 + Math.exp(-z)) : Math.exp(z) / (1 + Math.exp(z));
export function scalarGraph(x, w, b, target) {
  const z = w * x + b, residual = z - target, loss = residual ** 2 / 2;
  return {x, w, b, target, z, residual, loss, local: {dzdx: w, dzdw: x, dLdz: residual},
    gradients: {x: residual * w, w: residual * x, b: residual}};
}
export function gradientTrace(start, lr, count = 12) {
  let w = start;
  return Array.from({length: count + 1}, (_, i) => {
    const gradient = w - 2, loss = (w - 2) ** 2 / 2, next = w - lr * gradient;
    const state = {iteration: i, w, gradient, loss, next, lr};
    w = next;
    return state;
  });
}
export function tinyNetwork(x, a, b, v, c, target, lr = 0.1) {
  const z = a.map((r, i) => dot(r, x) + b[i]), h = z.map(sigmoid);
  const y = dot(v, h) + c, residual = y - target, loss = residual ** 2 / 2;
  const delta = h.map((value, i) => residual * v[i] * value * (1 - value));
  const gradients = {a: delta.map(d => x.map(t => d * t)), b: delta,
    v: h.map(t => residual * t), c: residual};
  return {x, a, b, v, c, target, z, h, y, loss, residual, gradients,
    updated: {a: a.map((r, i) => r.map((w, j) => w - lr * gradients.a[i][j])),
      b: b.map((w, i) => w - lr * gradients.b[i]), v: v.map((w, i) => w - lr * gradients.v[i]), c: c - lr * residual}};
}
export function layerNorm(x, epsilon = 1e-5) {
  const m = mean(x), populationVariance = mean(x.map(v => (v - m) ** 2));
  return x.map(v => (v - m) / Math.sqrt(populationVariance + epsilon));
}
export function convolution(image, kernel, stride = 1) {
  const [h, w] = matrixShape(image), [kh, kw] = matrixShape(kernel);
  if (!Number.isInteger(stride) || stride < 1 || kh > h || kw > w) throw new Error('Invalid convolution shape or stride');
  const rows = Math.floor((h - kh) / stride) + 1, cols = Math.floor((w - kw) / stride) + 1;
  const output = Array.from({length: rows}, () => Array(cols).fill(0)), steps = [];
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) {
    const products = kernel.map((r, y) => r.map((v, x) => v * image[i * stride + y][j * stride + x]));
    output[i][j] = products.flat().reduce((a, b) => a + b, 0);
    steps.push({i, j, row: i * stride, col: j * stride, products, value: output[i][j],
      output: output.map(r => [...r])});
  }
  return {output, steps, rows, cols};
}
export function solveLinear(a, b) {
  const n = a.length, m = a.map((r, i) => [...r, b[i]]);
  for (let k = 0; k < n; k++) {
    let pivot = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(m[i][k]) > Math.abs(m[pivot][k])) pivot = i;
    [m[k], m[pivot]] = [m[pivot], m[k]];
    if (Math.abs(m[k][k]) < 1e-12) throw new Error('Singular system');
    const scale = m[k][k];
    for (let j = k; j <= n; j++) m[k][j] /= scale;
    for (let i = 0; i < n; i++) if (i !== k) {
      const factor = m[i][k];
      for (let j = k; j <= n; j++) m[i][j] -= factor * m[k][j];
    }
  }
  return m.map(r => r[n]);
}
export function fitPolynomial(points, degree, ridge = 1e-8) {
  const design = points.map(([x]) => Array.from({length: degree + 1}, (_, i) => x ** i));
  const xt = transpose(design), gram = matmul(xt, design);
  for (let i = 0; i <= degree; i++) gram[i][i] += ridge;
  return solveLinear(gram, matmul(xt, points.map(([, y]) => [y])).map(r => r[0]));
}
export const polynomial = (weights, x) => weights.reduce((s, w, i) => s + w * x ** i, 0);
export function cacheTrace(addresses, lineSize = 4, capacity = 2, hitTime = 1, missPenalty = 20) {
  if (!Number.isInteger(lineSize) || lineSize < 1 || !Number.isInteger(capacity) || capacity < 1) throw new Error('Invalid cache configuration');
  let lines = [], hits = 0, misses = 0;
  const steps = addresses.map((address, i) => {
    const tag = Math.floor(address / lineSize), before = [...lines], hit = lines.includes(tag);
    if (hit) {hits++; lines = lines.filter(v => v !== tag);} else {misses++; if (lines.length === capacity) lines.shift();}
    lines.push(tag);
    return {i, address, tag, offset: address % lineSize, hit, before, lines: [...lines], hits, misses,
      missRate: misses / (i + 1), amat: hitTime + misses / (i + 1) * missPenalty};
  });
  return {steps, hits, misses, missRate: addresses.length ? misses / addresses.length : 0,
    amat: hitTime + (addresses.length ? misses / addresses.length : 0) * missPenalty};
}
