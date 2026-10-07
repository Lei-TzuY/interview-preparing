// DOM-only reusable views. Calculations live in calculations.js / traces.js.
export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class') node.className = value;
    else if (key.startsWith('on')) node.addEventListener(key.slice(2).toLowerCase(), value);
    else if (key === 'checked') node.checked = value;
    else node.setAttribute(key, value);
  }
  for (const child of children.flat()) if (child !== null && child !== undefined) node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  return node;
}
export const fmt = v => v === null || v === undefined ? '未定義 / N/A' : v === -Infinity ? '−∞' : !Number.isFinite(v) ? String(v) : Number(v.toFixed(4)).toString();
export const text = value => el('p', {}, value);
export function section(id, title, ...children) {return el('section', {id, class: 'lesson-section'}, el('h2', {}, title), ...children);}
export function table(headers, rows, caption = '') {
  return el('div', {class: 'table-scroll', tabindex: '0', 'aria-label': caption || headers.join(' / ')},
    el('table', {}, caption ? el('caption', {}, caption) : null,
      el('thead', {}, el('tr', {}, headers.map(h => el('th', {scope: 'col'}, h)))),
      el('tbody', {}, rows.map(r => el('tr', {}, r.map(v => el('td', {}, v)))))));
}
export function matrix(title, values, {active = () => false, click = null, heat = false} = {}) {
  return el('div', {class: 'matrix'}, el('h3', {}, title + ' [' + values.length + ' × ' + values[0].length + ']'),
    table(values[0].map((_, j) => 'col ' + j), values.map((row, i) => row.map((v, j) => {
      const cls = active(i, j) ? 'cell active' : 'cell';
      const attrs = {class: cls, title: 'row ' + i + ', col ' + j + ' = ' + fmt(v)};
      if (heat && Number.isFinite(v)) attrs.style = '--heat:' + Math.min(1, Math.max(0, v));
      return click ? el('button', {...attrs, type: 'button', 'aria-label': attrs.title + '；inspect', onclick: () => click(i, j)}, fmt(v)) : el('span', attrs, fmt(v));
    })), title + ' shape ' + values.length + '×' + values[0].length));
}
export function arrayView(values, {active = [], interval = null, labels = {}} = {}) {
  return el('div', {class: 'array-view', role: 'list', 'aria-label': 'Array values and indices'}, values.map((v, i) =>
    el('div', {role: 'listitem', class: 'array-cell' + (active.includes(i) ? ' active' : '') + (interval && i >= interval[0] && i < interval[1] ? ' candidate' : '')},
      el('small', {}, 'index ' + i), el('strong', {}, fmt(v)), el('small', {}, labels[i] || ''))));
}
export function cards(items) {return el('div', {class: 'flow'}, items.map(([label, value, active]) => el('div', {class: 'flow-card' + (active ? ' active' : '')}, el('strong', {}, label), el('span', {}, value))));}
export function inspector(data, caption = 'State inspector') {
  const stringify = value => typeof value === 'object' && value !== null ? JSON.stringify(value, (_, v) => v === -Infinity ? '−∞' : v) : String(value);
  return table(['變數', '目前值'], Object.entries(data).map(([k, v]) => [k, stringify(v)]), caption);
}
export function svg(tag, attrs = {}, ...children) {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  for (const c of children.flat()) if (c != null) node.append(c instanceof Node ? c : document.createTextNode(String(c)));
  return node;
}
export function plot(series, {xRange = [-3, 3], yRange = [-2, 6], label = 'Numeric plot', points = []} = {}) {
  const width = 600, height = 280, pad = 35;
  const px = x => pad + (x - xRange[0]) / (xRange[1] - xRange[0]) * (width - 2 * pad);
  const py = y => height - pad - (y - yRange[0]) / (yRange[1] - yRange[0]) * (height - 2 * pad);
  const root = svg('svg', {viewBox: '0 0 600 280', role: 'img', 'aria-label': label, class: 'plot'});
  root.append(svg('title', {}, label), svg('rect', {x: pad, y: pad, width: width - 2 * pad, height: height - 2 * pad, fill: 'none', stroke: '#9aa8b6'}));
  if (yRange[0] <= 0 && yRange[1] >= 0) root.append(svg('line', {x1: pad, x2: width - pad, y1: py(0), y2: py(0), stroke: '#aab7c3'}));
  if (xRange[0] <= 0 && xRange[1] >= 0) root.append(svg('line', {x1: px(0), x2: px(0), y1: pad, y2: height - pad, stroke: '#aab7c3'}));
  for (const [i, line] of series.entries()) {
    const visible = line.points.filter(([x, y]) => Number.isFinite(y) && x >= xRange[0] && x <= xRange[1] && y >= yRange[0] && y <= yRange[1]);
    root.append(svg('polyline', {points: visible.map(([x, y]) => px(x) + ',' + py(y)).join(' '), fill: 'none', stroke: line.color || ['#166c85', '#bd5818', '#7259a6'][i % 3], 'stroke-width': 2}));
    root.append(svg('text', {x: 45, y: 17 + i * 14, fill: line.color || ['#166c85', '#bd5818', '#7259a6'][i % 3], 'font-size': 12}, line.name));
  }
  for (const p of points) if (p.x >= xRange[0] && p.x <= xRange[1] && p.y >= yRange[0] && p.y <= yRange[1]) root.append(svg('circle', {cx: px(p.x), cy: py(p.y), r: 5, fill: p.color || '#b63e43'}, svg('title', {}, (p.label || 'point') + ': ' + fmt(p.x) + ', ' + fmt(p.y))));
  root.append(svg('text', {x: pad, y: height - 8, 'font-size': 12}, fmt(xRange[0])), svg('text', {x: width - pad - 15, y: height - 8, 'font-size': 12}, fmt(xRange[1])), svg('text', {x: 1, y: pad + 6, 'font-size': 12}, fmt(yRange[1])));
  return root;
}
export function graphView(nodes, edges, positions, {current = '', discovered = [], processed = [], label = 'Graph', labels = {}} = {}) {
  const root = svg('svg', {viewBox: '0 0 560 250', role: 'img', 'aria-label': label, class: 'plot'});
  root.append(svg('title', {}, label));
  edges.forEach(([a, b]) => root.append(svg('line', {x1: positions[a][0], y1: positions[a][1], x2: positions[b][0], y2: positions[b][1], stroke: '#9aa8b6', 'stroke-width': 2})));
  nodes.forEach(n => {
    const [x, y] = positions[n], fill = n === current ? '#ffe4a5' : processed.includes(n) ? '#c9dde9' : discovered.includes(n) ? '#dbf0dc' : '#f8fafc';
    root.append(svg('circle', {cx: x, cy: y, r: 25, fill, stroke: '#174a66', 'stroke-width': n === current ? 4 : 2}), svg('text', {x, y: y + 5, 'text-anchor': 'middle', fill: '#173247', 'font-size': 13}, labels[n] || n));
  });
  return root;
}
// Incomplete numeric edits must not silently become zero or overwrite the field.
// Return null while the user types a minus sign, clears a field, or exceeds bounds.
export function numericInputValue(input) {
  if (String(input.value).trim() === '') return null;
  const value = Number(input.value);
  if (!Number.isFinite(value)) return null;
  if (input.min !== '' && input.min !== undefined && value < Number(input.min)) return null;
  if (input.max !== '' && input.max !== undefined && value > Number(input.max)) return null;
  if (Number(input.step) === 1 && !Number.isInteger(value)) return null;
  return value;
}
export function control(label, key, type, value, config = {}) {
  const id = 'control-' + key, wrapper = el('label', {class: 'control', for: id}, el('span', {}, label));
  let input;
  if (type === 'select') input = el('select', {id, 'data-key': key}, config.options.map(o => el('option', {value: Array.isArray(o) ? o[0] : o}, Array.isArray(o) ? o[1] : o)));
  else input = el('input', {id, 'data-key': key, type, ...(config.min !== undefined ? {min: config.min} : {}), ...(config.max !== undefined ? {max: config.max} : {}), ...(config.step !== undefined ? {step: config.step} : {})});
  if (type === 'checkbox') input.checked = value; else input.value = value;
  const output = el('output', {for: id}, type === 'checkbox' ? '' : String(value));
  input.addEventListener('input', () => {output.textContent = type === 'checkbox' ? (input.checked ? 'On' : 'Off') : input.value;});
  wrapper.append(input, output);
  if (config.min !== undefined && config.max !== undefined) wrapper.append(el('small', {}, '範圍 '+config.min+' ～ '+config.max+(config.step===1?'；整數':'')));
  return {node: wrapper, input, read: () => type === 'checkbox' ? input.checked : ['range', 'number'].includes(type) ? Number(input.value) : input.value};
}
// Manual steps always work; reduced-motion disables automatic playback.
export class StepController {
  constructor(root, getModel, draw, formulaNode) {
    this.root = root; this.getModel = getModel; this.draw = draw; this.formulaNode = formulaNode;
    this.index = 0; this.timer = null; this.model = null;
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.play = el('button', {type: 'button', onclick: () => this.timer ? this.pause() : this.start()}, 'Play');
    this.prev = el('button', {type: 'button', onclick: () => this.move(-1)}, 'Previous');
    this.next = el('button', {type: 'button', onclick: () => this.move(1)}, 'Next');
    this.reset = el('button', {type: 'button', onclick: () => this.rebuild()}, 'Reset');
    this.speed = control('Speed（步 / 秒）', 'speed', 'select', '1', {options: ['0.5', '1', '2']});
    this.speed.input.addEventListener('change', () => {if (this.timer) {this.pause(); this.start();}});
    this.status = el('span', {class: 'step-status', 'aria-live': 'polite'});
    this.bar = el('div', {class: 'step-controls', role: 'group', 'aria-label': 'Step controls'}, this.play, this.prev, this.next, this.reset, this.speed.node, this.status);
    this.root.setAttribute('tabindex', '0'); this.root.setAttribute('aria-label', 'Interactive visualization；左右鍵切換步驟');
    this.onKey = event => {
      if (event.target !== this.root) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {event.preventDefault(); this.move(event.key === 'ArrowRight' ? 1 : -1);}
    };
    this.root.addEventListener('keydown', this.onKey);
    this.onReduced = () => {this.pause(); this.play.disabled = this.reduced.matches;};
    this.reduced.addEventListener('change', this.onReduced);
    this.onReduced(); this.rebuild();
    this.onHidden = () => {if (document.hidden) this.pause();};
    document.addEventListener('visibilitychange', this.onHidden);
  }
  rebuild() {this.pause(); this.index = 0; this.model = this.getModel(); this.render();}
  render() {
    const step = this.model.steps[this.index];
    this.root.replaceChildren(); this.draw(this.root, step, this.index, this.model);
    this.status.textContent = 'Step ' + (this.index + 1) + ' / ' + this.model.steps.length;
    this.prev.disabled = this.index === 0; this.next.disabled = this.index === this.model.steps.length - 1;
    const active = Array.isArray(step.formula) ? step.formula : [step.formula ?? 0];
    if (this.formulaNode) [...this.formulaNode.children].forEach((line, i) => line.classList.toggle('active', active.includes(i)));
  }
  move(delta) {this.pause(); this.index = Math.max(0, Math.min(this.model.steps.length - 1, this.index + delta)); this.render();}
  start() {
    if (this.reduced.matches || this.index === this.model.steps.length - 1) return;
    this.play.textContent = 'Pause';
    this.timer = setInterval(() => {if (this.index < this.model.steps.length - 1) {this.index++; this.render();} else this.pause();}, 1000 / Number(this.speed.read()));
  }
  pause() {if (this.timer) clearInterval(this.timer); this.timer = null; this.play.textContent = 'Play';}
  destroy() {this.pause(); this.root.removeEventListener('keydown', this.onKey); this.reduced.removeEventListener('change', this.onReduced); document.removeEventListener('visibilitychange', this.onHidden);}
}
