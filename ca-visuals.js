// CyberActive — canvas visuals (illustrative simulations only)
const RGB = {
  blue: '39,123,255', cyan: '0,213,255', white: '244,248,255', muted: '159,178,200',
  green: '53,213,164', amber: '255,188,87', orange: '255,140,80', red: '255,100,117'
};
const rgba = (c, a) => 'rgba(' + c + ',' + Math.max(0, Math.min(1, a)).toFixed(3) + ')';
const reduced = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

function fit(cv) {
  const r = cv.getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1);
  cv.width = Math.max(1, r.width * d); cv.height = Math.max(1, r.height * d);
  const ctx = cv.getContext('2d'); ctx.setTransform(d, 0, 0, d, 0, 0);
  return { ctx, w: r.width, h: r.height };
}
function loop(cv, frame) {
  let g = fit(cv), raf = 0, last = performance.now(), vis = true;
  const ro = new ResizeObserver(() => { g = fit(cv); }); ro.observe(cv);
  const io = new IntersectionObserver(es => { vis = es[0].isIntersecting; }); io.observe(cv);
  const step = now => {
    const dt = Math.min(50, now - last); last = now;
    if (vis) frame(g, now, reduced() ? dt * 0.25 : dt);
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
}

// ================= HERO: infrastructure model + intelligence layer =================
export function startHero(cv, onPhase) {
  const GROUPS = [
    { id: 'gpuA',  label: 'GPU CLUSTER A',  x: .50, y: .30, n: 14, kind: 'gpu' },
    { id: 'gpuB',  label: 'GPU CLUSTER B',  x: .86, y: .34, n: 14, kind: 'gpu' },
    { id: 'orch',  label: 'ORCHESTRATION',  x: .68, y: .52, n: 7,  kind: 'svc' },
    { id: 'id',    label: 'IDENTITY',       x: .44, y: .66, n: 5,  kind: 'svc' },
    { id: 'net',   label: 'NETWORK FABRIC', x: .70, y: .16, n: 6,  kind: 'net' },
    { id: 'store', label: 'STORAGE',        x: .90, y: .70, n: 6,  kind: 'svc' },
    { id: 'cloud', label: 'CLOUD SERVICES', x: .66, y: .86, n: 6,  kind: 'svc' }
  ];
  const LINKS = [['net','gpuA'],['net','gpuB'],['net','orch'],['orch','gpuA'],['orch','gpuB'],['orch','id'],['orch','store'],['id','gpuA'],['id','cloud'],['store','gpuB'],['cloud','store'],['cloud','orch']];
  const ORIGIN = 'id', BLAST = ['orch','gpuA','cloud'];
  const PH = [
    { k: 'normal',  ms: 3600, label: 'Normal operations' },
    { k: 'detect',  ms: 2600, label: 'Suspicious activity detected · privileged identity' },
    { k: 'analyze', ms: 3200, label: 'Risk propagation analyzed · 3 dependent systems' },
    { k: 'contain', ms: 3000, label: 'Containment executed according to policy' },
    { k: 'recover', ms: 3400, label: 'Recovery validated · trusted state restored' }
  ];
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const G = {};
  GROUPS.forEach(g => {
    g.sat = Array.from({ length: g.n }, (_, i) => {
      if (g.kind === 'gpu') { const c = i % 7, r = Math.floor(i / 7); return { dx: (c - 3) * 15, dy: (r - .5) * 18, ph: rnd() * 6 }; }
      const a = (i / g.n) * 6.283 + rnd() * .4, rr = 26 + rnd() * 10;
      return { dx: Math.cos(a) * rr, dy: Math.sin(a) * rr * .8, ph: rnd() * 6 };
    });
    g.risk = 0; g.hot = 0; g.ok = 0; G[g.id] = g;
  });
  const links = LINKS.map(([a, b]) => ({ a: G[a], b: G[b], cut: 0, lit: 0, crit: BLAST.concat(ORIGIN).includes(a) && BLAST.concat(ORIGIN).includes(b) }));
  const pulses = [];
  let p = 0, t = 0;
  onPhase && onPhase(PH[0].label, 0);

  return loop(cv, ({ ctx, w, h }, now, dt) => {
    t += dt;
    if (t > PH[p].ms) {
      t = 0; p = (p + 1) % PH.length; onPhase && onPhase(PH[p].label, p);
      if (p === 0) { GROUPS.forEach(g => { g.risk = g.hot = g.ok = 0; }); links.forEach(l => { l.cut = l.lit = 0; }); }
    }
    const k = PH[p].k, f = t / PH[p].ms, ease = dt / 600;
    const o = G[ORIGIN];
    if (k === 'detect') o.hot = Math.min(1, o.hot + ease);
    if (k === 'analyze') { BLAST.forEach((id, i) => { if (f > i * .25) G[id].risk = Math.min(1, G[id].risk + ease); }); links.forEach(l => { if (l.crit && f > .2) l.lit = Math.min(1, l.lit + ease); }); }
    if (k === 'contain') links.forEach(l => { const inA = l.a === o || l.b === o; if (inA) l.cut = Math.min(1, l.cut + ease); });
    if (k === 'recover') { [ORIGIN].concat(BLAST).forEach(id => { const g = G[id]; g.ok = Math.min(1, g.ok + ease * .7); g.hot *= .97; g.risk *= .97; }); links.forEach(l => { l.cut *= .975; l.lit *= .97; }); }

    ctx.clearRect(0, 0, w, h);
    const mobile = w < 640;
    const X = g => (mobile ? .08 + g.x * .86 : g.x) * w, Y = g => g.y * h;
    // grid floor
    ctx.strokeStyle = rgba(RGB.blue, .06); ctx.lineWidth = 1;
    for (let i = 0; i < 14; i++) { const y = h * (i / 14); ctx.beginPath(); ctx.moveTo(w * (mobile ? 0 : .34), y); ctx.lineTo(w, y); ctx.stroke(); }

    // links
    for (const l of links) {
      const x1 = X(l.a), y1 = Y(l.a), x2 = X(l.b), y2 = Y(l.b);
      if (l.cut > .3) {
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, g = .12 + l.cut * .1;
        ctx.strokeStyle = rgba(RGB.muted, .18); ctx.lineWidth = 1; ctx.beginPath();
        ctx.moveTo(x1, y1); ctx.lineTo(x1 + (x2 - x1) * (.5 - g), y1 + (y2 - y1) * (.5 - g));
        ctx.moveTo(x1 + (x2 - x1) * (.5 + g), y1 + (y2 - y1) * (.5 + g)); ctx.lineTo(x2, y2); ctx.stroke();
        ctx.fillStyle = rgba(RGB.cyan, l.cut); ctx.beginPath(); ctx.arc(mx, my, 2.6, 0, 7); ctx.fill();
        continue;
      }
      ctx.strokeStyle = l.lit > .05 ? rgba(RGB.amber, .2 + l.lit * .55) : rgba(RGB.blue, .22);
      ctx.lineWidth = l.lit > .05 ? 1.6 : 1;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    }
    // telemetry pulses
    if (Math.random() < .12) { const l = links[Math.floor(Math.random() * links.length)]; if (l.cut < .3) pulses.push({ l, t: 0, d: Math.random() > .5 }); }
    for (let i = pulses.length - 1; i >= 0; i--) {
      const q = pulses[i]; q.t += dt / 1300; if (q.t >= 1 || q.l.cut > .3) { pulses.splice(i, 1); continue; }
      const a = q.d ? q.l.a : q.l.b, b = q.d ? q.l.b : q.l.a, tt = q.t;
      ctx.fillStyle = rgba(q.l.lit > .3 ? RGB.amber : RGB.cyan, Math.sin(Math.PI * tt) * .9);
      ctx.beginPath(); ctx.arc(X(a) + (X(b) - X(a)) * tt, Y(a) + (Y(b) - Y(a)) * tt, 1.7, 0, 7); ctx.fill();
    }
    // containment boundary
    if (k === 'contain' || (k === 'recover' && f < .5)) {
      const a = k === 'contain' ? Math.min(1, f * 2) : 1 - f * 2;
      ctx.save(); ctx.setLineDash([6, 6]); ctx.lineDashOffset = -now / 40;
      ctx.strokeStyle = rgba(RGB.cyan, .75 * a); ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.ellipse(X(o), Y(o), 62, 50, 0, 0, 7); ctx.stroke(); ctx.restore();
      ctx.fillStyle = rgba(RGB.cyan, .05 * a); ctx.beginPath(); ctx.ellipse(X(o), Y(o), 62, 50, 0, 0, 7); ctx.fill();
    }
    // groups
    for (const g of GROUPS) {
      const cx = X(g), cy = Y(g);
      let col = RGB.blue, al = .65;
      if (g.risk > .05) { col = RGB.amber; al = .5 + g.risk * .5; }
      if (g.hot > .05) { col = RGB.red; al = .55 + g.hot * .45; }
      if (g.ok > .2) { col = RGB.green; al = .5 + g.ok * .5; }
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 70);
      glow.addColorStop(0, rgba(col, .16 * al)); glow.addColorStop(1, rgba(col, 0));
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, 70, 0, 7); ctx.fill();
      for (const s of g.sat) {
        const br = .55 + .45 * Math.sin(now / 700 + s.ph);
        ctx.fillStyle = rgba(col, al * (.35 + br * .4));
        if (g.kind === 'gpu') ctx.fillRect(cx + s.dx - 5, cy + s.dy - 6, 10, 12);
        else { ctx.beginPath(); ctx.arc(cx + s.dx, cy + s.dy, 2.2, 0, 7); ctx.fill(); }
      }
      ctx.fillStyle = rgba(col === RGB.blue ? RGB.white : col, .95);
      ctx.beginPath(); ctx.arc(cx, cy, 4.2, 0, 7); ctx.fill();
      if (g.hot > .2 && k !== 'recover') {
        const rp = (now % 1300) / 1300;
        ctx.strokeStyle = rgba(RGB.red, (1 - rp) * .8); ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.arc(cx, cy, 6 + rp * 34, 0, 7); ctx.stroke();
      }
      if (!mobile) {
        ctx.font = '600 9.5px Inter, system-ui, sans-serif'; ctx.fillStyle = rgba(RGB.muted, .85);
        ctx.fillText(g.label, cx + (g.kind === 'gpu' ? 58 : 36), cy + 3);
      }
    }
  });
}

// ================= AUTONOMOUS TELEMETRY RADAR =================
// Six domains feed the ADCR AI Core. state per domain: 0 normal, 1 potential, 2 high-confidence, 3 critical, 4 resolved
export const RADAR_DOMAINS = ['Facilities', 'Network', 'Security', 'Cloud', 'Applications', 'Compute'];
const CHAIN = [0, 5, 4, 1, 2, 3]; // Facilities → Compute → Applications → Network → Security → Cloud
const STATE_RGB = [RGB.blue, RGB.amber, RGB.orange, RGB.red, RGB.cyan];

export function startRadar(cv, api) {
  const D = RADAR_DOMAINS.map((name, i) => ({ name, i, ang: -Math.PI / 2 + i * Math.PI / 3, vol: .6, state: 0, level: 0 }));
  const pulses = [], parts = [];
  let step = -1, t = 0, cycle = 0, tick = 0;
  const STEP_MS = 1500, IDLE_MS = 4200;
  for (let i = 0; i < 140; i++) parts.push({ a: Math.random() * 6.283, r: .3 + Math.random() * .75, s: (Math.random() - .5) * .0002 });

  const stop = loop(cv, ({ ctx, w, h }, now, dt) => {
    t += dt;
    // correlation sequence
    if (step < 0 && t > IDLE_MS) { step = 0; t = 0; }
    else if (step >= 0 && t > STEP_MS) {
      t = 0; step++;
      if (step >= CHAIN.length + 3) { step = -1; cycle++; D.forEach(d => d.state = 0); }
    }
    if (step >= 0) {
      CHAIN.forEach((di, ci) => {
        const d = D[di];
        if (step >= CHAIN.length + 1) d.state = 4;
        else if (ci < step) d.state = ci === 0 ? 3 : (ci < 3 ? 2 : 1);
        else if (ci === step) d.state = ci === 0 ? 2 : 1;
      });
    }
    const sel = api.getSelected ? api.getSelected() : -1;
    const cx = w / 2, cy = h / 2 + 14, R = Math.min(w, h - 90) * .4;
    ctx.clearRect(0, 0, w, h);

    // ambient particles
    for (const p of parts) {
      p.a += p.s * dt;
      const x = cx + Math.cos(p.a) * p.r * R, y = cy + Math.sin(p.a) * p.r * R;
      ctx.fillStyle = rgba(RGB.cyan, .08 + .1 * Math.sin(now / 900 + p.r * 9)); ctx.fillRect(x, y, 1.2, 1.2);
    }
    // rings
    for (let i = 1; i <= 4; i++) {
      ctx.strokeStyle = rgba(RGB.blue, i === 4 ? .22 : .1); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, R * (.25 + i * .1875), 0, 7); ctx.stroke();
    }
    // segments
    for (const d of D) {
      d.vol += ((.55 + .35 * Math.sin(now / 1700 + d.i * 1.7) + .1 * Math.sin(now / 430 + d.i)) - d.vol) * .05;
      d.level += ((d.state === 0 || d.state === 4 ? 0 : d.state / 3) - d.level) * .04;
      const col = STATE_RGB[d.state], span = Math.PI / 3 - .09, a0 = d.ang - span / 2, a1 = d.ang + span / 2;
      const inner = R * .34, outer = R * (.72 + d.vol * .26), isSel = sel === d.i;
      const gr = ctx.createRadialGradient(cx, cy, inner, cx, cy, outer);
      gr.addColorStop(0, rgba(col, .02)); gr.addColorStop(1, rgba(col, (isSel ? .34 : .18) + d.level * .3));
      ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(cx, cy, outer, a0, a1); ctx.arc(cx, cy, inner, a1, a0, true); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = rgba(col, (isSel ? .95 : .6) + d.level * .3); ctx.lineWidth = isSel ? 2.4 : 1.6;
      ctx.beginPath(); ctx.arc(cx, cy, outer, a0, a1); ctx.stroke();
      // tick marks = live volume
      for (let j = 0; j < 14; j++) {
        const aa = a0 + (j + .5) * span / 14, len = 3 + 9 * Math.abs(Math.sin(now / 260 + j * 1.3 + d.i));
        ctx.strokeStyle = rgba(col, .35); ctx.lineWidth = 1; ctx.beginPath();
        ctx.moveTo(cx + Math.cos(aa) * (outer + 5), cy + Math.sin(aa) * (outer + 5));
        ctx.lineTo(cx + Math.cos(aa) * (outer + 5 + len), cy + Math.sin(aa) * (outer + 5 + len)); ctx.stroke();
      }
      if (Math.random() < .09 + d.vol * .06) pulses.push({ d, off: (Math.random() - .5) * span * .85, t: 0, sp: .0005 + Math.random() * .0005 });
    }
    // pulses flowing inward
    for (let i = pulses.length - 1; i >= 0; i--) {
      const q = pulses[i]; q.t += q.sp * dt; if (q.t >= 1) { pulses.splice(i, 1); continue; }
      const a = q.d.ang + q.off, r = R * (1 - q.t * .66), col = STATE_RGB[q.d.state];
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r, x2 = cx + Math.cos(a) * (r + 12), y2 = cy + Math.sin(a) * (r + 12);
      ctx.strokeStyle = rgba(col, .75 * Math.sin(Math.PI * q.t)); ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x, y); ctx.stroke();
    }
    // correlation path
    if (step > 0) {
      const anchor = d => [cx + Math.cos(d.ang) * R * .62, cy + Math.sin(d.ang) * R * .62];
      const upto = Math.min(step, CHAIN.length - 1), resolved = step >= CHAIN.length + 1;
      for (let ci = 0; ci < upto; ci++) {
        const A = anchor(D[CHAIN[ci]]), B = anchor(D[CHAIN[ci + 1]]);
        const prog = ci === upto - 1 && !resolved && step < CHAIN.length ? Math.min(1, t / (STEP_MS * .6)) : 1;
        const mx = (A[0] + B[0]) / 2 + (cx - (A[0] + B[0]) / 2) * .55, my = (A[1] + B[1]) / 2 + (cy - (A[1] + B[1]) / 2) * .55;
        const col = resolved ? RGB.cyan : ci < 2 ? RGB.red : RGB.amber;
        ctx.save(); ctx.setLineDash([5, 5]); ctx.lineDashOffset = -now / 30;
        ctx.strokeStyle = rgba(col, .85); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(A[0], A[1]);
        const N = 24;
        for (let s = 1; s <= Math.floor(N * prog); s++) { const u = s / N, v = 1 - u; ctx.lineTo(v * v * A[0] + 2 * v * u * mx + u * u * B[0], v * v * A[1] + 2 * v * u * my + u * u * B[1]); }
        ctx.stroke(); ctx.restore();
        ctx.fillStyle = rgba(col, 1); ctx.beginPath(); ctx.arc(A[0], A[1], 3.4, 0, 7); ctx.fill();
        if (prog >= 1) { ctx.beginPath(); ctx.arc(B[0], B[1], 3.4, 0, 7); ctx.fill(); }
      }
    }
    // core
    const pulse = .5 + .5 * Math.sin(now / 800);
    const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * .34);
    cg.addColorStop(0, rgba(RGB.cyan, .22 + pulse * .08)); cg.addColorStop(.7, rgba(RGB.blue, .1)); cg.addColorStop(1, rgba(RGB.blue, 0));
    ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(cx, cy, R * .34, 0, 7); ctx.fill();
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(now / 4000);
    ctx.strokeStyle = rgba(RGB.cyan, .55); ctx.lineWidth = 1.2; ctx.setLineDash([2, 7]);
    ctx.beginPath(); ctx.arc(0, 0, R * .3, 0, 7); ctx.stroke(); ctx.rotate(-now / 2000);
    ctx.setLineDash([30, 14]); ctx.strokeStyle = rgba(RGB.blue, .5);
    ctx.beginPath(); ctx.arc(0, 0, R * .26, 0, 7); ctx.stroke(); ctx.restore();
    // labels
    ctx.font = '600 11px Inter, system-ui, sans-serif'; ctx.textAlign = 'center';
    for (const d of D) {
      const lr = R * 1.1, x = cx + Math.cos(d.ang) * lr, y = cy + Math.sin(d.ang) * lr + 4;
      ctx.fillStyle = sel === d.i ? rgba(RGB.white, 1) : rgba(RGB.muted, .95);
      ctx.fillText(d.name.toUpperCase(), x, y);
    }
    ctx.textAlign = 'left';
    tick += dt;
    if (tick > 500 && api.onTick) { tick = 0; api.onTick({ states: D.map(d => d.state), step, cycle, vol: D.map(d => d.vol) }); }
  });

  const click = e => {
    const r = cv.getBoundingClientRect(), x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
    const R = Math.min(r.width, r.height - 90) * .4, dist = Math.hypot(x, y - 14);
    if (dist < R * .3) { api.onSelect && api.onSelect(-1); return; }
    if (dist > R * 1.2) return;
    let a = Math.atan2(y, x) + Math.PI / 2; if (a < 0) a += 6.283;
    api.onSelect && api.onSelect(Math.round(a / (Math.PI / 3)) % 6);
  };
  cv.addEventListener('click', click);
  return () => { stop(); cv.removeEventListener('click', click); };
}
