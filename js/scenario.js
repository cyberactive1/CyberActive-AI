// CyberActive AI — interactive scenario simulation and decision explorer.
// Vanilla ES module. Mount points: [data-scenario] and [data-decision].
// Every value shown is part of an illustrative simulation (see scenario-data.js).
import { SIM_LABEL, ENV, NODES, EDGES, STATE_META, STAGES, SIGNALS, REACH, RINGS, IMPACTS, AVAIL_ROWS, OPTIONS, VALIDATION, MODES, FACTORS } from './scenario-data.js';

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const reduced = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const POS = Object.fromEntries(NODES.map(n => [n.id, n]));
const TONE = { green: 'green', amber: 'amber', orange: 'orange', red: 'red' };
const availColor = v => v >= 100 ? '#35D5A4' : v >= 60 ? '#FFB547' : '#FF6475';
const availText = v => v >= 100 ? 'Normal' : v === 0 ? 'Halted' : 'Degraded';

/* ---------- shared fragments ---------- */
function segHTML(mode, label) {
  return '<div class="seg" role="radiogroup" aria-label="' + esc(label) + '">' + MODES.map(m =>
    '<button type="button" role="radio" data-mode="' + m.key + '" aria-checked="' + (m.key === mode) + '">' + m.label + '</button>').join('') + '</div>';
}
function optionsHTML(sel) {
  return '<ul class="opts">' + OPTIONS.map((o, i) =>
    '<li><button type="button" class="opt" data-opt="' + i + '" aria-pressed="' + (i === sel) + '"><span>' + esc(o.t) + '</span><span class="pill pill--' + TONE[o.tagTone] + '">' + esc(o.tag) + '</span><small>' + esc(o.sub) + '</small></button></li>').join('') + '</ul>';
}
function availHTML(o) {
  return '<ul class="avail" aria-label="Simulated availability under this option">' + AVAIL_ROWS.map(([k, label]) => {
    const v = o.avail[k], c = availColor(v);
    return '<li style="--c:' + c + '"><span>' + label + '</span><span class="avail__bar"><i style="--w:' + Math.max(v, 2) + '%"></i></span><span class="avail__v">' + availText(v) + '</span></li>';
  }).join('') + '</ul>';
}

/* ---------- node states for each stage ---------- */
function executed(o, mode) {
  if (mode === 'observe' || !o.contain.length) return false;
  if (mode === 'autonomous' && o.key !== 'suspend') return true; // escalated, then approved by a human (simulated)
  return true;
}
function nodeStates(stage, o, mode) {
  const S = {};
  if (stage >= 0) S.id = 'threat';
  if (stage >= 1) { S.k8s = 'path'; S.mgmt = 'path'; S.poolA = S.poolB = S.store = S.train = S.api = 'watch'; }
  if (stage >= 2) { S.poolA = S.poolB = S.store = S.train = S.api = 'risk'; }
  if (stage === 4 || stage === 5) o.down.forEach(k => { S[k] = 'down'; });
  if (stage >= 6 && executed(o, mode)) {
    const closesAll = o.key === 'suspend' || o.key === 'freeze';
    if (closesAll) Object.keys(S).forEach(k => { S[k] = 'watch'; });
    o.contained.forEach(k => { S[k] = 'contained'; });
    o.down.forEach(k => { if (!o.contained.includes(k)) S[k] = 'down'; });
    if (stage >= 7) {
      o.contained.forEach(k => { S[k] = 'restored'; });
      o.down.forEach(k => { S[k] = closesAll ? 'restored' : 'watch'; });
      if (o.key === 'isolate') { S.poolA = 'restored'; S.train = 'restored'; }
    }
    if (stage >= 8 && closesAll) Object.keys(S).forEach(k => { S[k] = 'restored'; });
  }
  return S;
}

/* ---------- stage text ---------- */
function stagePanel(stage, o, mode, oi) {
  const modeName = MODES.find(m => m.key === mode).label;
  const gov = o.gov[mode];
  const ran = executed(o, mode);
  const chosen = '<p class="fine" style="margin-top:12px">Option in play: <b style="color:var(--ink);font-weight:500">' + esc(o.t) + '</b> · <button type="button" class="linkbtn" data-goto="4">change</button></p>';
  switch (stage) {
    case 0: return { c: '#FF6475', head: 'Suspicious privileged activity detected.',
      body: 'svc-admin-07, a service account with cluster-admin rights and access to GPU fleet management, signs in from an unfamiliar network at 02:14 UTC and starts actions that do not match its baseline.',
      detail: '<ul class="siglist">' + SIGNALS.map(s => '<li><b>' + esc(s.src) + ' ' + s.at + '</b><span>' + esc(s.t) + '</span></li>').join('') + '</ul>',
      why: 'The signals come from tools you already run. On their own they are three medium alerts and two log lines; correlated against this identity’s baseline they form one high-severity situation.' };
    case 1: return { c: '#FF8C50', head: 'Infrastructure dependencies mapped.',
      body: 'The platform resolves what this identity can reach, using identity grants, orchestration bindings, management-plane scope, and storage access paths.',
      detail: '<dl class="kv">' + REACH.map(([k, v]) => '<dt>' + esc(k) + '</dt><dd>' + esc(v) + '</dd>').join('') + '</dl>',
      why: 'Dependencies come from the infrastructure model rather than network adjacency alone. The fabric is adjacent but not reachable.' };
    case 2: return { c: '#FFB547', head: 'Potential blast radius: 2 control planes, 352 GPUs, 2 critical workloads.',
      body: 'If the identity is not contained, these assets are one to three steps from an attacker.',
      detail: '<dl class="kv">' + RINGS.map(([k, v]) => '<dt>' + esc(k) + '</dt><dd>' + esc(v) + '</dd>').join('') + '</dl>',
      why: 'Propagation is weighed by privilege path and likelihood, so the likeliest route to the model weights is ranked first.' };
    case 3: return { c: '#FFB547', head: 'Operational and business impact evaluated.',
      body: 'Each exposed asset is weighed by what its compromise or disruption would mean to the operator.',
      detail: '<ul class="siglist">' + IMPACTS.map(i => '<li style="--c:' + i.c + '"><b>' + esc(i.tier) + '</b><span><strong style="font-weight:500;color:var(--ink)">' + esc(i.asset) + '.</strong> ' + esc(i.t) + '</span></li>').join('') + '</ul>',
      why: 'Criticality, service tiers, and business context are supplied by the operator. Values here are illustrative assumptions.' };
    case 4: return { c: '#9B7BFF', head: 'Response options compared.',
      body: 'Select an option to see how it would affect availability. The recommendation balances closing the threat path against operational disruption.',
      detail: optionsHTML(oi) + '<dl class="kv" style="margin-top:14px"><dt>Threat path</dt><dd>' + esc(o.closes) + '</dd><dt>Residual risk</dt><dd>' + esc(o.residual) + '</dd><dt>Business impact</dt><dd>' + esc(o.business) + '</dd><dt>Reversibility</dt><dd>' + esc(o.reversibility) + '</dd></dl>' + availHTML(o),
      why: 'Recommended: suspend the identity. It closes every path the identity opened without interrupting training or inference.' };
    case 5: return { c: '#9B7BFF', head: gov[0] + '.',
      body: gov[1],
      detail: '<dl class="kv"><dt>Mode</dt><dd>' + modeName + '</dd><dt>Action</dt><dd>' + esc(o.t) + '</dd><dt>Boundary</dt><dd>' + (o.key === 'suspend' ? 'Identity actions on service accounts' : o.key === 'freeze' ? 'Break-glass (never pre-authorized)' : o.key === 'isolate' ? 'Capacity-impacting actions' : 'Monitoring') + '</dd><dt>Approver</dt><dd>' + (mode === 'observe' ? 'n/a · no change permitted' : o.key === 'monitor' ? 'n/a' : mode === 'autonomous' && o.key === 'suspend' ? 'Policy (notify on-call)' : o.key === 'freeze' ? 'Two named operators' : o.key === 'isolate' ? 'Platform owner + security lead' : 'On-call security lead') + '</dd><dt>Override</dt><dd>Available to authorized operators at every step</dd></dl>' + chosen,
      why: 'Authority comes from customer-approved policy. Anything outside the approved boundary escalates to a human.' };
    case 6: return { c: ran ? '#9B7BFF' : '#6F8399',
      head: mode === 'observe' ? 'No changes made. Recommendation delivered.' : !o.contain.length ? 'No containment. Monitoring increased.' : 'Containment executed through existing controls.',
      body: mode === 'observe' ? 'In Observe mode the platform does not modify production systems. Operators receive the recommendation, evidence, and a ready-to-run action plan.' : !o.contain.length ? 'Logging is increased and the identity is watched. Its privileges stay in place, so the exposure remains open.' : (mode === 'autonomous' && o.key !== 'suspend' ? 'This action is outside the autonomous boundary, so it ran only after an operator approved it (simulated). ' : '') + 'Each step runs through an integrated control the operator already owns, and is recorded with its rationale.',
      detail: o.contain.length ? '<ul class="siglist">' + o.contain.map(([k, v], i) => '<li class="' + (ran ? 'ok' : 'off') + '"><b>' + (ran ? 'DONE' : 'PLAN') + '</b><span><strong style="font-weight:500;color:var(--ink)">' + esc(k) + ':</strong> ' + esc(v) + (ran ? ' <span class="mono" style="color:var(--dim)">· audit #A-' + (4127 + i) + '</span>' : '') + '</span></li>').join('') + '</ul>' + chosen : chosen,
      why: 'Actions are limited to what the approved boundary allows, and an operator can reverse or override any step.' };
    case 7: return { c: ran ? '#35D5A4' : '#6F8399',
      head: ran ? 'Recovery coordinated.' : 'Recovery plan prepared for operators.',
      body: ran ? 'Restoration starts from a trusted state, with checks before anything returns to service.' : 'Nothing has been changed, so the platform prepares the recovery plan operators would run after containment.',
      detail: o.recover.length ? '<ul class="siglist">' + o.recover.map(([k, v]) => '<li class="' + (ran ? (k === 'Open risk' ? 'warn' : 'ok') : 'off') + '"><b>' + (ran ? (k === 'Open risk' ? 'OPEN' : 'DONE') : 'PLAN') + '</b><span><strong style="font-weight:500;color:var(--ink)">' + esc(k) + ':</strong> ' + esc(v) + '</span></li>').join('') + '</ul>' : '<p class="fine">No recovery steps apply while the threat path is open.</p>',
      why: 'Recovery is planned from the first detection, so containment never leaves the environment in an unknown state.' };
    default: {
      const ok = ran && (o.key === 'suspend' || o.key === 'freeze');
      return { c: ok ? '#35D5A4' : '#FFB547',
        head: ok ? 'Restoration validated. Normal operations confirmed.' : 'Validation incomplete. Threat path still open.',
        body: ok ? 'Every check passes and the outcome is recorded to improve future decisions.' : 'Some checks cannot pass while the identity keeps its privileges. The platform escalates and keeps the incident open.',
        detail: '<ul class="siglist">' + VALIDATION.map((v, i) => { const pass = ok || (o.key === 'isolate' && ran && i >= 3); return '<li class="' + (pass ? 'ok' : 'warn') + '"><b>' + (pass ? 'PASS' : 'OPEN') + '</b><span>' + esc(v) + '</span></li>'; }).join('') + '</ul>',
        why: 'Outcomes, including the decision rationale and approvals, form a complete audit trail and feed continuous improvement.' };
    }
  }
}

/* ---------- graph ---------- */
function graphHTML() {
  const lines = EDGES.map(([a, b], i) => '<line data-e="' + i + '" x1="' + POS[a].x + '%" y1="' + POS[a].y + '%" x2="' + POS[b].x + '%" y2="' + POS[b].y + '%"/>').join('');
  const nodes = NODES.map(n => {
    const tx = n.x < 20 ? '-12%' : n.x > 80 ? '-88%' : '-50%';
    return '<button type="button" class="gnode" data-node="' + n.id + '" aria-pressed="false" style="left:' + n.x + '%;top:' + n.y + '%;transform:translate(' + tx + ',-50%)"><span class="gnode__l">' + esc(n.label) + '<small>' + esc(n.sub) + '</small></span><span class="gnode__s" aria-hidden="true">' + esc(n.short) + '</span></button>';
  }).join('');
  return '<div class="graph"><svg aria-hidden="true">' + lines + '</svg>' + nodes + '</div>';
}
function paintGraph(root, S, sel) {
  root.querySelectorAll('.gnode').forEach(b => {
    const s = S[b.dataset.node];
    if (s) { b.dataset.s = s; b.style.setProperty('--c', STATE_META[s].c); } else { delete b.dataset.s; b.style.removeProperty('--c'); }
    b.setAttribute('aria-pressed', String(b.dataset.node === sel));
    b.setAttribute('aria-label', POS[b.dataset.node].label + ': ' + (s ? STATE_META[s].label : 'Normal'));
  });
  root.querySelectorAll('.graph line').forEach(l => {
    const [a, b] = EDGES[+l.dataset.e], sa = S[a], sb = S[b];
    const hot = ['threat', 'path', 'risk'];
    let c = 'rgba(127,168,255,.22)', w = 1.2, dash = '';
    if (hot.includes(sa) && hot.includes(sb)) { c = sa === 'threat' || sb === 'threat' ? '#FF6475' : '#FFB547'; w = 2; dash = '6 4'; }
    else if (sa === 'restored' && sb === 'restored') { c = '#35D5A4'; w = 1.6; }
    else if (sa === 'down' || sb === 'down') { c = 'rgba(111,131,153,.6)'; dash = '2 4'; }
    else if (sa === 'contained' || sb === 'contained') { c = '#9B7BFF'; w = 1.6; }
    l.setAttribute('stroke', c); l.setAttribute('stroke-width', w); l.setAttribute('stroke-dasharray', dash);
    l.setAttribute('vector-effect', 'non-scaling-stroke');
  });
}

/* =========================================================================
   SCENARIO
   ========================================================================= */
export function mountScenario(root) {
  const st = { stage: 0, mode: root.dataset.mode || 'approve', opt: 0, sel: 'id', timer: 0 };
  const legendKeys = ['threat', 'path', 'risk', 'down', 'contained', 'restored'];
  root.innerHTML =
    '<div class="sim__banner" role="note">' + esc(SIM_LABEL) + '</div>' +
    '<div class="sim__bar"><div class="sim__ctrl">' +
      '<button type="button" class="btn btn--primary" data-act="play">Play scenario</button>' +
      '<button type="button" class="btn btn--ghost" data-act="prev" aria-label="Previous stage">← Prev</button>' +
      '<button type="button" class="btn btn--ghost" data-act="next" aria-label="Next stage">Next →</button>' +
      '<button type="button" class="btn btn--ghost" data-act="reset">Reset</button></div>' +
      '<div class="sim__mode"><span class="label" style="margin:0">Governance mode</span>' + segHTML(st.mode, 'Governance mode') + '</div></div>' +
    '<ol class="sim__steps">' + STAGES.map((s, i) => '<li><button type="button" data-stage="' + i + '"><span>0' + (i + 1) + '</span>' + esc(s.t) + '</button></li>').join('') + '</ol>' +
    '<div class="sim__body"><div class="sim__stage"><div class="sim__env" aria-hidden="true"><span>' + esc(ENV.name) + '</span><span>' + ENV.clock + '</span></div>' + graphHTML() +
      '<ul class="sim__legend" aria-hidden="true">' + legendKeys.map(k => '<li style="--c:' + STATE_META[k].c + '">' + STATE_META[k].label + '</li>').join('') + '</ul></div>' +
      '<div class="sim__panel" aria-live="polite"></div></div>' +
    '<div class="sim__inspect" style="padding:16px 22px;border-top:1px solid var(--line-soft)"></div>';

  const panel = root.querySelector('.sim__panel'), inspect = root.querySelector('.sim__inspect');
  const playBtn = root.querySelector('[data-act="play"]');

  function render(focusPanel) {
    const o = OPTIONS[st.opt], P = stagePanel(st.stage, o, st.mode, st.opt), S = nodeStates(st.stage, o, st.mode);
    root.querySelectorAll('[data-stage]').forEach((b, i) => {
      b.classList.toggle('is-done', i < st.stage);
      if (i === st.stage) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });
    const cur = root.querySelector('[data-stage="' + st.stage + '"]'), rail = root.querySelector('.sim__steps');
    if (cur && rail.scrollWidth > rail.clientWidth) rail.scrollTo({ left: cur.parentElement.offsetLeft - 14, behavior: reduced() ? 'auto' : 'smooth' });
    root.querySelectorAll('[data-mode]').forEach(b => { const on = b.dataset.mode === st.mode; b.setAttribute('aria-checked', on); });
    panel.style.setProperty('--c', P.c);
    panel.innerHTML = '<div class="kicker">Stage 0' + (st.stage + 1) + ' of 09 · ' + esc(STAGES[st.stage].t) + '</div><h3>' + esc(P.head) + '</h3><p>' + esc(P.body) + '</p><div class="sim__detail">' + P.detail + '</div><div class="sim__why"><b>Rationale · </b>' + esc(P.why) + '</div>';
    paintGraph(root, S, st.sel);
    const n = POS[st.sel], s = S[st.sel];
    inspect.innerHTML = '<div class="label" style="margin-bottom:6px">Inspect · select any component in the graph</div><div style="display:flex;flex-wrap:wrap;gap:6px 14px;align-items:baseline"><b style="font-size:15px;font-weight:600">' + esc(n.label) + '</b><span style="font-size:13px;color:' + (s ? STATE_META[s].c : 'var(--muted)') + '">' + (s ? STATE_META[s].label : 'Normal') + '</span></div><p style="margin:4px 0 0;font-size:13.5px;line-height:1.55;color:var(--muted)">' + esc(n.desc) + '</p>';
    root.querySelector('[data-act="prev"]').disabled = st.stage === 0;
    root.querySelector('[data-act="next"]').disabled = st.stage === STAGES.length - 1;
    playBtn.textContent = st.timer ? 'Pause' : st.stage === STAGES.length - 1 ? 'Replay scenario' : 'Play scenario';
    if (focusPanel) panel.focus({ preventScroll: true });
  }
  const stop = () => { clearInterval(st.timer); st.timer = 0; };
  const go = i => { st.stage = Math.max(0, Math.min(STAGES.length - 1, i)); render(); };

  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t || !root.contains(t)) return;
    if (t.dataset.stage) { stop(); go(+t.dataset.stage); }
    else if (t.dataset.goto) { stop(); go(+t.dataset.goto); }
    else if (t.dataset.mode) { st.mode = t.dataset.mode; render(); }
    else if (t.dataset.opt) { st.opt = +t.dataset.opt; render(); }
    else if (t.dataset.node) { st.sel = t.dataset.node; render(); }
    else if (t.dataset.act === 'prev') { stop(); go(st.stage - 1); }
    else if (t.dataset.act === 'next') { stop(); go(st.stage + 1); }
    else if (t.dataset.act === 'reset') { stop(); st.stage = 0; st.opt = 0; st.sel = 'id'; render(); }
    else if (t.dataset.act === 'play') {
      if (st.timer) { stop(); render(); return; }
      if (st.stage === STAGES.length - 1) st.stage = 0;
      st.timer = setInterval(() => { if (st.stage >= STAGES.length - 1) { stop(); render(); return; } go(st.stage + 1); }, reduced() ? 7000 : 5200);
      render();
    }
  });
  // Pause autoplay when the simulation leaves the screen.
  if ('IntersectionObserver' in window) new IntersectionObserver(es => { if (!es[0].isIntersecting && st.timer) { stop(); render(); } }).observe(root);
  panel.tabIndex = -1;
  render();
}

/* =========================================================================
   DECISION EXPLORER
   ========================================================================= */
export function mountDecision(root) {
  const st = { opt: 0, mode: 'approve' };
  root.innerHTML =
    '<div class="dx__left"><div class="label">Scenario</div>' +
      '<p class="dx__ctx"><b>Compromised privileged identity.</b> svc-admin-07 holds cluster-admin on the GPU orchestration control plane and operator rights on GPU fleet management. A production inference API and a 6-day training run depend on that infrastructure.</p>' +
      '<div class="label">How the architecture evaluates it</div><ul class="dx__eval">' + FACTORS.map(f => '<li><span>' + esc(f.t) + '</span><em>' + esc(f.v) + '</em></li>').join('') + '</ul></div>' +
    '<div class="dx__right"><div class="label">Compare response options</div><div class="dx__opts"></div>' +
      '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin-top:18px"><span class="label" style="margin:0">Governance mode</span>' + segHTML(st.mode, 'Governance mode') + '</div>' +
      '<ul class="dx__eval dx__res" style="margin-top:14px"></ul><div class="dx__avail"></div><div class="dx__verdict" role="status"></div>' +
      '<p class="dx__foot">Illustrative decision scenario, not a measured production result. Real evaluations use the operator’s own asset criticality, service tiers, and policies.</p></div>';
  const render = () => {
    const o = OPTIONS[st.opt], g = o.gov[st.mode];
    root.querySelector('.dx__opts').innerHTML = optionsHTML(st.opt);
    root.querySelectorAll('[data-mode]').forEach(b => { const on = b.dataset.mode === st.mode; b.setAttribute('aria-checked', on); });
    root.querySelector('.dx__res').innerHTML = [['Threat path', o.closes], ['Residual risk', o.residual], ['Operational disruption', o.disruption], ['Business impact', o.business], ['Reversibility', o.reversibility], ['Recovery effort', o.recovery], ['Governance', g[0]]]
      .map(([k, v]) => '<li><span>' + k + '</span><b>' + esc(v) + '</b></li>').join('');
    root.querySelector('.dx__avail').innerHTML = availHTML(o);
    const v = root.querySelector('.dx__verdict');
    const c = { suspend: '#35D5A4', isolate: '#FFB547', freeze: '#FF8C50', monitor: '#FF6475' }[o.key];
    v.style.setProperty('--c', c);
    v.innerHTML = '<span><b>' + esc(o.key === 'suspend' ? 'Recommended.' : o.key === 'monitor' ? 'Not recommended.' : 'Available, with trade-offs.') + '</b> ' + esc(g[1]) + '</span>';
  };
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.opt) { st.opt = +t.dataset.opt; render(); }
    if (t.dataset.mode) { st.mode = t.dataset.mode; render(); }
  });
  render();
}

document.querySelectorAll('[data-scenario]').forEach(mountScenario);
document.querySelectorAll('[data-decision]').forEach(mountDecision);
