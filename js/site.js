// CyberActive AI — page behaviour (vanilla JS, no framework).
// Everything here is progressive: the page is fully readable without JS.
import { startHero, startRadar } from '../ca-visuals.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reducedMotion = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
};

// Marks one button in a group active (class + ARIA) and returns nothing.
function setActive(buttons, i, attr = 'aria-selected') {
  buttons.forEach((b, j) => { b.classList.toggle('is-active', j === i); b.setAttribute(attr, String(j === i)); });
}

/* ============================== DATA ============================== */
const COLORS = { blue: '#277BFF', amber: '#FFBC57', orange: '#FF8C50', red: '#FF6475', cyan: '#00D5FF', green: '#35D5A4' };

const PILLARS = [
  { n: '01', title: 'Detect', detail: 'Signals from compute, identity, network, storage, and existing security tools are evaluated continuously for behavior that departs from established operating patterns.', points: ['Ingests telemetry from existing security and infrastructure tools', 'Behavior-oriented analysis, not signatures alone', 'Designed to surface previously unseen activity'] },
  { n: '02', title: 'Understand', detail: 'Events are placed in context: which assets, identities, and services are connected, and what those relationships mean for the environment.', points: ['Maintains a model of asset and service relationships', 'Links identity, workload, and network context', 'Turns isolated alerts into connected situations'] },
  { n: '03', title: 'Decide', detail: 'The platform weighs how a threat could spread and what it would affect, then ranks candidate actions by risk and operational consequence.', points: ['Assesses potential propagation paths', 'Considers operational and business criticality', 'Produces explainable, policy-checked recommendations'] },
  { n: '04', title: 'Act', detail: 'Approved actions are coordinated across integrated controls — identity, network, and orchestration — within the permissions and safeguards operators define.', points: ['Observe, approve, or autonomous operating modes', 'Enforcement through integrated existing controls', 'Every action recorded and attributable'] },
  { n: '05', title: 'Restore & Learn', detail: 'Recovery is coordinated and validated, and the outcome of each event informs how future situations are evaluated.', points: ['Coordinated restoration of affected services', 'Integrity and state validation before return to service', 'Outcomes feed continuous improvement'] }
];

const RADAR = [
  { name: 'Facilities', scope: 'Power distribution, UPS, generators, cooling, HVAC, environmental, fire suppression, leak detection, BMS, physical access.', assets: 1840, base: 'Cooling loop temperature drift' },
  { name: 'Network', scope: 'Routers, switches, firewalls, SD-WAN, load balancers, DNS, connectivity, east-west traffic.', assets: 2310, base: 'Traffic redistribution across fabric' },
  { name: 'Security', scope: 'Firewalls, EDR/XDR, SIEM, IDS/IPS, Zero Trust, identity services, threat intelligence, vulnerability management.', assets: 960, base: 'Abnormal authentication activity' },
  { name: 'Cloud', scope: 'AWS, Azure, Google Cloud, hybrid, SaaS, cloud networking and security, cloud-native Kubernetes.', assets: 3420, base: 'Automatic workload migration' },
  { name: 'Applications', scope: 'Customer applications, AI workloads, APIs, databases, web services, enterprise software, APM.', assets: 1270, base: 'Inference latency increase' },
  { name: 'Compute', scope: 'Physical servers, GPU clusters, AI infrastructure, virtualization, containers, Kubernetes, hypervisors.', assets: 5680, base: 'GPU temperature increase' }
];
const CHAIN_ORDER = [0, 5, 4, 1, 2, 3];
// Radar domain states: 0 normal · 1 potential · 2 high confidence · 3 critical · 4 resolved
const STATE = [['Normal', COLORS.blue], ['Potential anomaly', COLORS.amber], ['High confidence', COLORS.orange], ['Critical', COLORS.red], ['Resolved', COLORS.cyan]];

const CTX_SRC_Y = [52, 136, 220, 304, 388];
const CTX = [
  { src: [2, 3], out: 'Threat correlated across 3 dependencies', c: COLORS.amber },
  { src: [0, 1], out: 'Blast radius mapped · GPU pool B at risk', c: COLORS.orange },
  { src: [1, 4], out: 'Containment plan ranked · policy-checked', c: '#9B7BFF' },
  { src: [0, 1, 2, 3, 4], out: 'Contained · operator-approved', c: COLORS.green }
];

const MODES = [
  { title: 'Observe', body: 'Monitor, correlate, and recommend actions without modifying production systems.', who: ['Platform', 'Platform', 'Platform', 'Operator', 'Operator'] },
  { title: 'Approve', body: 'Prepare response recommendations for authorized human review before any action is taken.', who: ['Platform', 'Platform', 'Platform', 'Approver', 'Platform'] },
  { title: 'Autonomous', body: 'Execute explicitly authorized actions within defined policies, permissions, and operational safeguards — with human override at every stage.', who: ['Platform', 'Platform', 'Platform', 'Policy', 'Platform'] }
];
const FLOW_STEPS = ['Detect and correlate signals', 'Evaluate risk and propagation', 'Select candidate actions', 'Authorize action', 'Execute and record'];

const ROUTES = [
  { title: 'Request a Demo', email: 'sales@cyberactive.ai', cta: 'Request a Demo', lead: 'A guided technical session covering detection, dependency analysis, governed response, and recovery — tailored to your environment.' },
  { title: 'Strategic Engagement', email: 'partners@cyberactive.ai', cta: 'Start a Conversation', lead: 'For data center operators, GPU cloud providers, critical infrastructure organizations, and technology partners exploring pilots or strategic integration.' },
  { title: 'Investor Relations', email: 'ir@cyberactive.ai', cta: 'Contact Investor Relations', lead: 'For qualified investors seeking information about CyberActive AI' }
];

/* ============================== NAV ============================== */
function initNav() {
  const burger = $('#burger'), menu = $('#mobile-menu');
  const setMenu = open => {
    menu.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
  };
  burger.addEventListener('click', () => setMenu(menu.hidden));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  matchMedia('(min-width: 1081px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

  // Scroll progress bar + active section highlight
  const bar = $('#progress');
  const links = $$('[data-spy]');
  const ids = ['platform', 'ai-workloads', 'radar', 'markets', 'investors', 'partners', 'contact'];
  let ticking = false;
  const update = () => {
    ticking = false;
    const de = document.documentElement;
    bar.style.width = (de.scrollTop / Math.max(1, de.scrollHeight - innerHeight) * 100).toFixed(2) + '%';
    let cur = '';
    for (const id of ids) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < innerHeight * .4) cur = id; }
    links.forEach(a => a.classList.toggle('is-active', a.dataset.spy === cur));
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* ============================== HERO ============================== */
function initHero() {
  const steps = $$('#hero-steps span'), phase = $('#hero-phase');
  startHero($('#hero-canvas'), (label, i) => {
    phase.textContent = label;
    steps.forEach((s, j) => s.classList.toggle('is-on', j === i));
  });
}

/* ============================== PLATFORM PILLARS ============================== */
function initPillars() {
  const tabs = $$('#pillars .pillar'), stage = $('#stage');
  tabs.forEach((b, i) => b.addEventListener('click', () => {
    const p = PILLARS[i];
    setActive(tabs, i);
    $('#stage-kicker').textContent = 'Stage ' + p.n + ' · ' + p.title;
    $('#stage-detail').textContent = p.detail;
    $('#stage-points').innerHTML = p.points.map(t => '<div class="dot-item">' + esc(t) + '</div>').join('');
    stage.classList.remove('is-anim'); void stage.offsetWidth; stage.classList.add('is-anim');
  }));
}

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
    ].map(([k, val]) => '<span class="chip">' + k + ' <b>' + val + '</b></span>').join('');

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

/* ============================== RESPONSE MODES ============================== */
function initModes() {
  const tabs = $$('#modes button');
  const tone = w => w === 'Platform' ? 'blue' : w === 'Policy' ? 'green' : 'amber';
  tabs.forEach((b, i) => b.addEventListener('click', () => {
    const m = MODES[i];
    setActive(tabs, i);
    $('#mode-title').textContent = m.title;
    $('#mode-body').textContent = m.body;
    $('#mode-flow').innerHTML = FLOW_STEPS.map((st, j) =>
      '<li><span class="flow__n">0' + (j + 1) + '</span><span class="flow__s">' + st + '</span><span class="pill pill--' + tone(m.who[j]) + '">' + m.who[j] + '</span></li>').join('');
  }));
}

/* ============================== CONTACT, ROUTES & MODAL ============================== */
function initContact() {
  const routeBtns = $$('#routes .route'), modal = $('#modal');
  let route = 0, lastFocus = null;

  const setRoute = i => {
    route = i;
    const r = ROUTES[i];
    setActive(routeBtns, i, 'aria-pressed');
    $$('[data-route]').forEach(el => { el.textContent = r[el.dataset.route]; });
    $$('[data-sent]').forEach(el => { el.hidden = true; });
  };
  const openModal = i => {
    setRoute(i);
    lastFocus = document.activeElement;
    $('#mobile-menu').hidden = true; $('#burger').setAttribute('aria-expanded', 'false');
    modal.hidden = false;
    document.body.classList.add('is-locked');
    $('input', modal).focus({ preventScroll: true });
  };
  const closeModal = () => {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('is-locked');
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  };

  routeBtns.forEach((b, i) => b.addEventListener('click', () => setRoute(i)));
  $$('[data-open]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); openModal(+a.dataset.open); }));
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  $('[data-close]', modal).addEventListener('click', closeModal);
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Forms open a pre-filled email (mailto). Swap for a form endpoint to capture leads server-side.
  $$('form[data-contact]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const r = ROUTES[route], g = n => (f.elements[n] && f.elements[n].value || '').trim();
    const body = ['Request: ' + r.title, 'Name: ' + g('name'), 'Organization: ' + g('company'), 'Email: ' + g('email'), 'Role: ' + g('role'), '', g('message')].join('\n');
    window.location.href = 'mailto:' + r.email + '?subject=' + encodeURIComponent('[' + r.title + '] ' + (g('company') || g('name'))) + '&body=' + encodeURIComponent(body);
    $('[data-sent]', f).hidden = false;
  }));
}

/* ============================== COOKIE NOTICE ============================== */
function initCookie() {
  const box = $('#cookie');
  if (store.get('ca-cookie-ok') === '1') return;
  box.hidden = false;
  $('#cookie-ok').addEventListener('click', () => { store.set('ca-cookie-ok', '1'); box.hidden = true; });
}

/* ============================== SCROLL REVEAL ============================== */
// Children of [data-reveal] plus section headings/intro copy fade up once.
// Only elements below the fold are hidden, so nothing flashes on load.
function initReveal() {
  if (!('IntersectionObserver' in window) || reducedMotion()) return;
  const els = $$('section:not(#top) h2, section:not(#top) .lead, [data-reveal] > *')
    .filter(el => el.getBoundingClientRect().top > innerHeight);
  els.forEach(el => {
    const sib = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
    el.style.setProperty('--d', Math.min(sib, 6) * 70 + 'ms');
    el.classList.add('reveal');
  });
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add('is-in');
    io.unobserve(el);
    setTimeout(() => el.classList.remove('reveal', 'is-in'), 1400);
  }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));
}

/* ============================== BOOT ============================== */
initNav();
initHero();
initPillars();
initRadar();
initContext();
initModes();
initContact();
initCookie();
initReveal();
