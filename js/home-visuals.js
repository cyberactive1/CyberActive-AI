// CyberActive AI — homepage visuals: telemetry radar and chain-of-consequences.
// Illustrative simulation only. Vanilla ES module, loaded on the homepage.
import { startRadar } from '../ca-visuals.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reducedMotion = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function setActive(buttons, i, attr = 'aria-selected') {
  buttons.forEach((b, j) => { b.classList.toggle('is-active', j === i); b.setAttribute(attr, String(j === i)); });
}

const COLORS = { blue: '#277BFF', amber: '#FFBC57', orange: '#FF8C50', red: '#FF6475', cyan: '#00D5FF', green: '#35D5A4' };
const RADAR = [
  { name: 'Facilities', scope: 'Power distribution, UPS, generators, cooling, HVAC, environmental, fire suppression, leak detection, BMS, physical access.', assets: 1840, base: 'Cooling loop temperature drift' },
  { name: 'Network', scope: 'Routers, switches, firewalls, SD-WAN, load balancers, DNS, connectivity, east-west traffic.', assets: 2310, base: 'Traffic redistribution across fabric' },
  { name: 'Security', scope: 'Firewalls, EDR/XDR, SIEM, IDS/IPS, Zero Trust, identity services, threat intelligence, vulnerability management.', assets: 960, base: 'Abnormal authentication activity' },
  { name: 'Cloud', scope: 'AWS, Azure, Google Cloud, hybrid, SaaS, cloud networking and security, cloud-native Kubernetes.', assets: 3420, base: 'Automatic workload migration' },
  { name: 'Applications', scope: 'Customer applications, AI workloads, APIs, databases, web services, enterprise software, APM.', assets: 1270, base: 'Inference latency increase' },
  { name: 'Compute', scope: 'Physical servers, GPU clusters, AI infrastructure, virtualization, containers, Kubernetes, hypervisors.', assets: 5680, base: 'GPU temperature increase' }
];
const CHAIN_ORDER = [0, 5, 4, 1, 2, 3];
const STATE = [['Normal', COLORS.blue], ['Potential anomaly', COLORS.amber], ['High confidence', COLORS.orange], ['Critical', COLORS.red], ['Resolved', COLORS.cyan]];
const CTX_SRC_Y = [52, 136, 220, 304, 388];
const CTX = [
  { src: [2, 3], out: 'Threat correlated across 3 dependencies', c: COLORS.amber },
  { src: [0, 1], out: 'Blast radius mapped · GPU pool B at risk', c: COLORS.orange },
  { src: [1, 4], out: 'Containment plan ranked · policy-checked', c: '#9B7BFF' },
  { src: [0, 1, 2, 3, 4], out: 'Contained · operator-approved', c: COLORS.green }
];

/* ============================== RADAR ============================== */
function initRadar() {
  const s = { sel: 0, rad: { states: [0, 0, 0, 0, 0, 0], step: -1, vol: [.6, .6, .6, .6, .6, .6] },
    ai: { ev: 1284000, models: 412, preds: 9120, acts: 214, corr: 3870, graph: 18240 } };
  const tabs = $$('#radar-tabs .tab'), chain = $$('#chain span');
  const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(2) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(1) + 'K' : String(n);
  const statHtml = (k, v) => '<div class="stat"><span class="stat__k">' + k + '</span><span class="stat__v">' + v + '</span></div>';

  const render = () => {
    const rs = s.rad.states[s.sel] || 0, d = RADAR[s.sel], v = s.rad.vol[s.sel] || .6;
    const anyCrit = s.rad.states.filter(x => x > 0 && x < 4).length;
    const anomalous = rs > 0 && rs < 4;

    $('#ai-stats').innerHTML = [
      ['Telemetry rate', (38 + v * 14).toFixed(1) + 'K ev/s'], ['Events analyzed', fmt(s.ai.ev)],
      ['Models updated', String(s.ai.models)], ['Predictions generated', fmt(s.ai.preds)],
      ['Actions executed', String(s.ai.acts)], ['Risk correlations', fmt(s.ai.corr)], ['Graph updates', fmt(s.ai.graph)]
    ].map(([k, val]) => statHtml(k, val)).join('');

    $('#core-chips').innerHTML = [
      ['Health', anyCrit ? (96 - anyCrit * 3.1).toFixed(1) + '%' : '99.2%'], ['Mode', 'Approve'],
      ['AI confidence', anyCrit ? '0.94' : '0.98'], ['Active anomalies', String(anyCrit)],
      ['Recovery ops', s.rad.step >= 7 ? '1 active' : '0']
    ].map(([k, val]) => '<span class="rchip">' + k + ' <b>' + val + '</b></span>').join('');

    CHAIN_ORDER.forEach((di, ci) => {
      const st = s.rad.states[di] || 0;
      chain[ci].classList.toggle('is-on', st > 0);
      chain[ci].style.setProperty('--c', STATE[st][1]);
    });

    const pill = $('#rd-state');
    pill.textContent = STATE[rs][0];
    pill.style.setProperty('--c', STATE[rs][1]);
    $('#rd-name').textContent = d.name;
    $('#rd-scope').textContent = d.scope;
    setActive(tabs, s.sel);
    $('#rd-metrics').innerHTML = [
      ['Overall health', [98.6, 92.1, 84.3, 71.5, 97.8][rs] + '%'], ['Telemetry volume', (4 + v * 6).toFixed(1) + 'K ev/s'],
      ['Active assets', d.assets.toLocaleString('en-US')], ['Current anomalies', anomalous ? d.base : 'None'],
      ['AI confidence', anomalous ? ['', '0.71', '0.88', '0.96'][rs] : '0.98'], ['Risk score', ['12', '41', '67', '88', '18'][rs] + ' / 100'],
      ['Predicted impact', ['None', 'Low', 'Moderate', 'High', 'Contained'][rs]], ['Autonomous actions', rs >= 2 ? (rs === 4 ? '6 executed' : '3 proposed') : '0'],
      ['Business impact', ['None', 'None', 'At risk', 'Service at risk', 'None'][rs]], ['Recovery status', rs === 4 ? 'Validated' : rs === 3 ? 'Initiating' : 'Not required']
    ].map(([k, val]) => '<div class="metric"><div class="metric__k">' + k + '</div><div class="metric__v">' + esc(val) + '</div></div>').join('');
  };

  tabs.forEach((b, i) => b.addEventListener('click', () => { s.sel = i; render(); }));

  startRadar($('#radar-canvas'), {
    getSelected: () => s.sel,
    onSelect: i => { if (i >= 0) { s.sel = i; render(); } },
    onTick: r => {
      const a = s.ai;
      s.ai = {
        ev: a.ev + 2400 + Math.floor(Math.random() * 900), models: a.models + (Math.random() > .85 ? 1 : 0),
        preds: a.preds + Math.floor(Math.random() * 4), acts: a.acts + (r.step === 7 && s.rad.step !== 7 ? 6 : 0),
        corr: a.corr + (r.step > 0 ? 2 : 0), graph: a.graph + Math.floor(Math.random() * 7)
      };
      s.rad = r;
      render();
    }
  });
}

/* ============================== CONTEXTUAL INTELLIGENCE ============================== */
function initContext() {
  const caps = $$('#ctx-caps .cap'), srcs = $$('.ctx__viz .src');
  const lines = $$('#ctx-lines path').slice(0, 5), flow = $('#ctx-flow'), out = $('#ctx-out');
  const NS = 'http://www.w3.org/2000/svg';
  const path = y => 'M147 ' + y + 'H220C266 ' + y + ' 258 220 300 220';
  let cur = 0, manual = false;

  const dot = (d, r, fill, opacity, dur, begin) => {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('r', r); c.setAttribute('fill', fill); c.setAttribute('opacity', opacity);
    const m = document.createElementNS(NS, 'animateMotion');
    m.setAttribute('dur', dur); m.setAttribute('repeatCount', 'indefinite'); m.setAttribute('begin', begin + 's'); m.setAttribute('path', d);
    c.appendChild(m); return c;
  };

  const render = i => {
    const c = CTX[i];
    setActive(caps, i, 'aria-pressed');
    srcs.forEach((el, j) => el.classList.toggle('is-on', c.src.includes(j)));
    lines.forEach((p, j) => {
      const on = c.src.includes(j);
      p.setAttribute('stroke', on ? 'rgba(201,190,255,.9)' : 'rgba(127,240,255,.22)');
      p.setAttribute('stroke-width', on ? 1.8 : 1.1);
    });
    out.style.setProperty('--c', c.c);
    out.firstElementChild.textContent = c.out;

    // Travelling signal dots (SVG animateMotion); skipped for reduced motion
    flow.replaceChildren();
    if (reducedMotion()) return;
    CTX_SRC_Y.forEach((y, j) => {
      const on = c.src.includes(j), d = path(y) + 'H316';
      for (let k = 0; k < (on ? 3 : 1); k++) {
        flow.appendChild(on ? dot(d, 3.4, '#C9BEFF', 1, '1.6s', -(k * .53) - j * .3) : dot(d, 2.2, '#7FF0FF', .5, '3.4s', -(k * 1.1) - j * .3));
      }
    });
    for (let k = 0; k < 2; k++) flow.appendChild(dot('M404 220H452', 3.2, '#C9BEFF', 1, '1.2s', -k * .6));
  };

  caps.forEach((b, i) => b.addEventListener('click', () => { manual = true; cur = i; render(i); }));
  render(0);
  if (!reducedMotion()) setInterval(() => { if (!manual) { cur = (cur + 1) % CTX.length; render(cur); } }, 3800);
}

if ($('#radar-canvas')) initRadar();
if ($('#ctx-caps')) initContext();
