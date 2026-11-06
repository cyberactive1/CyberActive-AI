#!/usr/bin/env node
// CyberActive AI — static site generator (no dependencies).
//
//   node scripts/build.mjs                      → writes pages into the repo root (commit the output)
//   node scripts/build.mjs --out=DIR --relative → self-contained preview copy with relative links
//
// Content lives in content/*.mjs. Shared interactive data lives in js/*-data.js.
// Vercel serves the generated .html files directly (cleanUrls), so no build step runs on deploy.
import { mkdirSync, writeFileSync, cpSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, NAV, FOOTER, LIFECYCLE, GOVERNANCE, ARCH, PATENTS, finalCta } from '../content/pages.mjs';
import { LEGAL, EFFECTIVE } from '../content/legal.mjs';
import { home } from '../content/home.mjs';
import { ROUTES, FORM_ENDPOINT, CONTACT_EMAIL } from '../js/forms-data.js';
import { SIM_LABEL, STAGES, OPTIONS, FACTORS } from '../js/scenario-data.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
const OUT = args.out ? resolve(args.out) : ROOT;
const RELATIVE = !!args.relative;
const SITE = 'https://cyberactive.ai';
const TODAY = new Date().toISOString().slice(0, 10);

/* ---------- helpers ---------- */
export const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let DEPTH = 0; // directory depth of the page being rendered (relative mode)
const L = href => { // site link → production path or relative preview path
  if (!RELATIVE || !href || !href.startsWith('/')) return href;
  const pre = '../'.repeat(DEPTH) || './';
  const m = href.match(/^\/([^?#]*)([?#].*)?$/); const path = m[1], rest = m[2] || '';
  if (/\.(css|js|svg|png|ico|xml|txt|webmanifest)$/.test(path)) return pre + path + rest;
  return pre + (path ? path + '.html' : 'index.html') + rest;
};
const ctaHref = b => b.route ? '/contact?' + b.route : b.href;
const btn = (b, sm) => '<a class="btn ' + (b.primary ? 'btn--primary' : 'btn--ghost') + (sm ? ' btn--sm' : '') + '" href="' + esc(L(ctaHref(b))) + '">' + esc(b.label) + '</a>';
const eyebrow = (t, cls = '') => t ? '<p class="eyebrow' + cls + '">' + esc(t) + '</p>' : '';
const STATUS = { 'Available': '#35D5A4', 'In Validation': '#FFB547', 'Planned': '#7FA8FF', 'Illustrative': '#9FB2C8', 'Verified IP': '#C9BEFF' };
const STATUS_DESC = [['Available', 'implemented and demonstrable'], ['In Validation', 'developed, undergoing testing'], ['Planned', 'roadmap'], ['Verified IP', 'patent status confirmed'], ['Illustrative', 'conceptual or simulated']];
const statusPill = s => '<span class="pill" style="--c:' + STATUS[s] + '">' + esc(s) + '</span>';

export const brandMark = () => '<svg viewBox="0 0 64 64" aria-hidden="true"><defs>' +
  '<linearGradient id="caNavS" x1="10" y1="5" x2="54" y2="60" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#7FF0FF"/><stop offset=".5" stop-color="#3D7BFF"/><stop offset="1" stop-color="#8B5CFF"/></linearGradient>' +
  '<linearGradient id="caNavP" x1="14" y1="0" x2="52" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#B9A6FF"/><stop offset=".45" stop-color="#FFFFFF"/><stop offset="1" stop-color="#B9A6FF"/></linearGradient>' +
  '<radialGradient id="caNavF0" cx="32" cy="24" r="32" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3D7BFF" stop-opacity=".22"/><stop offset="1" stop-color="#8B5CFF" stop-opacity="0"/></radialGradient>' +
  '<filter id="caNavF" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="1.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>' +
  '<path d="M54 22V11.5L32 5 10 11.5V31c0 13.6 8.6 23 22 28.5 9-3.7 15.6-9.3 19.6-16.5L54 22Z" fill="url(#caNavF0)" fill-opacity=".6"/>' +
  '<path d="M54 22V11.5L32 5 10 11.5V31c0 13.6 8.6 23 22 28.5 9-3.7 15.6-9.3 19.6-16.5" fill="none" stroke="url(#caNavS)" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round" filter="url(#caNavF)"/>' +
  '<path d="M14.5 36H21L32 13.5 42 46l4-10H51.5" fill="none" stroke="url(#caNavP)" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round" filter="url(#caNavF)"/>' +
  '<path d="M14.5 36H21L32 13.5 42 46l4-10H51.5" pathLength="100" fill="none" stroke="#FFFFFF" stroke-width="5.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="16 200" filter="url(#caNavF)" style="animation:caSpark 4s cubic-bezier(.45,0,.2,1) .8s infinite"/>' +
  '<circle cx="55.5" cy="36" r="6.4" fill="none" stroke="#8B5CFF" stroke-opacity=".45" stroke-width="1" style="animation:caHalo 4s ease-out .8s infinite"/>' +
  '<circle cx="55.5" cy="36" r="4" fill="#8B5CFF" filter="url(#caNavF)" style="animation:caNode 4s ease-out .8s infinite"/>' +
  '<circle cx="55.5" cy="36" r="1.7" fill="#FFFFFF"/></svg>';

/* ---------- forms ---------- */
const sel = (opts) => '<option value="">Select…</option>' + opts.map(o => '<option>' + esc(o) + '</option>').join('');
function field(fid, f) {
  const id = fid + '-' + f.name, req = f.required ? ' required' : '';
  const lab = '<span>' + esc(f.label) + (f.required ? ' <i aria-hidden="true">*</i>' : '') + '</span>';
  let ctl;
  if (f.options) ctl = '<select class="input" id="' + id + '" name="' + f.name + '"' + req + '>' + sel(f.options) + '</select>';
  else if (f.area) ctl = '<textarea class="input" id="' + id + '" name="' + f.name + '" rows="3"' + (f.ph ? ' placeholder="' + esc(f.ph) + '"' : '') + req + '></textarea>';
  else ctl = '<input class="input" id="' + id + '" name="' + f.name + '" type="' + (f.type || 'text') + '" autocomplete="' + (f.ac || 'off') + '"' + (f.ph ? ' placeholder="' + esc(f.ph) + '"' : '') + req + '>';
  return '<label class="field' + (f.full ? ' field--full' : '') + '" for="' + id + '">' + lab + ctl + '</label>';
}
const COMMON = [{ name: 'name', label: 'Full name', required: true, ac: 'name' }, { name: 'company', label: 'Organization', required: true, ac: 'organization' }, { name: 'email', label: 'Business email', type: 'email', required: true, ac: 'email', full: false }];
const ROUTE_FIELDS = {
  demo: [{ name: 'title', label: 'Job title', ac: 'organization-title' }, { name: 'infra', label: 'Infrastructure type', options: ['GPU cloud / AI-as-a-Service', 'AI data center', 'Enterprise / private AI', 'Hybrid cloud', 'Mission-critical environment', 'Other'] }, { name: 'scale', label: 'Approximate scale (optional)', ph: 'e.g. 2 clusters, 600 GPUs', full: true }, { name: 'objectives', label: 'Objectives', area: true, full: true, ph: 'What would you like to evaluate?' }],
  partner: [{ name: 'role', label: 'Role', ac: 'organization-title' }, { name: 'category', label: 'Partnership category', options: ['AI infrastructure operator', 'GPU cloud / AI-as-a-Service', 'OEM / embedded technology', 'MSSP / integrator', 'Strategic technology partner', 'Other'] }, { name: 'collab', label: 'Proposed collaboration', area: true, full: true }],
  investor: [{ name: 'investorType', label: 'Investor type', options: ['Venture capital', 'Growth equity', 'Strategic / corporate', 'Institutional', 'Family office', 'Other'] }, { name: 'interest', label: 'Area of interest', options: ['Investment overview', 'Technology & IP', 'Market opportunity', 'Strategic investment', 'Other'] }]
};
export function formHTML({ id, route = 'demo', selectable = false, heading = true }) {
  const r = ROUTES[route];
  return '<form class="form-card" id="' + id + '" action="' + FORM_ENDPOINT + '" method="POST" data-form data-route="' + route + '"' + (selectable ? ' data-selectable' : '') + ' novalidate>' +
    '<input type="hidden" name="_subject" value="Website enquiry: ' + esc(r.title) + '"><input type="hidden" name="request" value="' + esc(r.title) + '" data-route-value="title">' +
    '<div class="form-body">' +
      (heading ? '<p class="form-card__eyebrow" data-route-text="title">' + esc(r.title) + '</p><p class="form-card__title">Engage With CyberActive AI</p>' : '') +
      '<div class="fields">' + COMMON.map(f => field(id, f)).join('') + '</div>' +
      Object.entries(ROUTE_FIELDS).map(([k, fs]) => '<fieldset class="fields" data-fields="' + k + '" style="margin:14px 0 0;padding:0;border:0;min-width:0"' + (k === route ? '' : ' hidden disabled') + '><legend class="sr-only">' + esc(ROUTES[k].title) + ' details</legend>' + fs.map(f => field(id, f)).join('') + '</fieldset>').join('') +
      '<div class="fields" style="margin-top:14px">' + field(id, { name: 'message', label: 'Message', area: true, full: true }) + '</div>' +
      '<input class="hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<div class="form-err" role="alert" hidden></div>' +
      '<button class="btn btn--primary btn--block" type="submit" data-route-text="btn">' + esc(r.btn) + '</button>' +
      '<p class="form-note">Fields marked * are required. By submitting, you agree that CyberActive AI may contact you about your request. See our <a href="' + L('/legal') + '#privacy">Privacy Policy</a>.</p>' +
    '</div>' +
    '<div class="form-done" hidden tabindex="-1"><div class="form-done__tick" aria-hidden="true">✓</div><h3>Thank you. Your request was received.</h3><p>Our team will follow up shortly. You can also reach us at <a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a>.</p></div>' +
  '</form>';
}
export const routeButtons = (target, active) => '<div class="routes" role="group" aria-label="Choose a request type">' + Object.entries(ROUTES).map(([k, r]) =>
  '<button type="button" class="route" data-route-btn="' + k + '" data-target="' + target + '" aria-pressed="' + (k === active) + '"><span><span class="route__t">' + esc(r.title) + '</span><span class="route__b">' + esc(r.lead.split('.')[0]) + '.</span></span><span class="route__e">' + r.email + '</span></button>').join('') + '</div>';

/* ---------- shared blocks (home + pages) ---------- */
export function governanceHTML(opts = {}) {
  const G = GOVERNANCE, pre = opts.prefix || 'gov';
  const tone = w => w === 'Platform' ? 'blue' : w === 'Policy' ? 'green' : 'amber';
  return eyebrow(opts.eyebrow ?? G.eyebrow, ' eyebrow--green') + '<h2 class="h2' + (opts.small ? ' h2--sm' : '') + '">' + esc(opts.title ?? G.title) + '</h2><p class="lead">' + esc(G.lead) + '</p>' +
    '<div data-tabs><div class="seg" role="tablist" aria-label="Operating modes">' + G.modes.map((m, i) => '<button type="button" role="tab" id="' + pre + '-tab-' + m.key + '" aria-controls="' + pre + '-' + m.key + '" aria-selected="' + (i === 1) + '"' + (i === 1 ? '' : ' tabindex="-1"') + '>' + m.t + '</button>').join('') + '</div>' +
    G.modes.map((m, i) => '<div class="gov__grid" role="tabpanel" id="' + pre + '-' + m.key + '" aria-labelledby="' + pre + '-tab-' + m.key + '"' + (i === 1 ? '' : ' hidden') + '>' +
      '<div class="mode"><h3>' + m.t + '</h3><p>' + esc(m.b) + '</p><dl>' + m.facts.map(([k, v]) => '<dt>' + k + '</dt><dd>' + esc(v) + '</dd>').join('') + '</dl></div>' +
      '<div class="flow"><p class="label">Workflow in this mode</p><ol>' + G.steps.map((s, j) => '<li><span class="flow__n">0' + (j + 1) + '</span><span class="flow__s">' + s + '</span><span class="pill pill--' + tone(m.who[j]) + '">' + m.who[j] + '</span></li>').join('') + '</ol></div></div>').join('') + '</div>' +
    (opts.compact ? '<div class="boundary"><span class="boundary__icon" aria-hidden="true">✓</span><span><b>Customer-approved boundaries.</b> ' + esc(G.boundary) + '</span></div>' :
    '<div class="safeguards" data-reveal>' + G.safeguards.map(s => '<div class="safeguard"><h3>' + esc(s.t) + '</h3><p>' + esc(s.b) + '</p></div>').join('') +
    '<div class="safeguard" style="border-color:rgba(53,213,164,.4);background:rgba(53,213,164,.06)"><h3 style="color:var(--green)">Customer-approved boundaries</h3><p>' + esc(G.boundary) + '</p></div></div>');
}
export function archHTML(opts = {}) {
  const A = ARCH;
  const node = (n, cls) => '<div class="arch__node ' + cls + '"><h3>' + esc(n.t) + '</h3><p>' + esc(n.b) + '</p>' + (n.status ? '<span class="pill pill--blue">' + esc(n.status) + '</span>' : '') + '</div>';
  const link = defs => '<div class="arch__link" aria-hidden="true"><svg viewBox="0 0 64 24" preserveAspectRatio="none">' + (defs ? '<defs><linearGradient id="archGrad"><stop offset="0" stop-color="#7FE6FF"/><stop offset="1" stop-color="#9B7BFF"/></linearGradient></defs>' : '') + '<path d="M2 12H58M50 5l8 7-8 7"/></svg></div>';
  return eyebrow(opts.eyebrow ?? A.eyebrow) + '<h2 class="h2' + (opts.small ? ' h2--sm' : '') + '">' + esc(opts.title ?? A.title) + '</h2>' + A.lead.map(p => '<p class="lead">' + esc(p) + '</p>').join('') +
    '<div class="arch" role="img" aria-label="Architecture: existing security tools, infrastructure telemetry, and AI security intelligence sources feed the CyberActive AI Core, which drives infrastructure response controls and recovery workflows.">' +
      '<div class="arch__col"><p class="arch__h">Signals in · any source</p>' + A.sources.map(n => node(n, 'arch__node--src')).join('') + '</div>' + link(true) +
      '<div class="arch__core"><div class="arch__core-head"><img src="' + L('/assets/logo-13b.svg') + '" alt="" width="40" height="40"><div><h3>CyberActive AI Core</h3><span>Proprietary decision technology</span></div></div>' +
        A.core.map(c => '<div class="arch__layer"><h4>' + esc(c.t) + '</h4><p>' + esc(c.b) + '</p></div>').join('') + '</div>' + link(false) +
      '<div class="arch__col"><p class="arch__h">Governed action out</p>' + A.outputs.map(n => node(n, 'arch__node--out')).join('') + '</div>' +
    '</div><div class="arch__gov">Governance, audit trail, and human override across every layer</div><p class="fine">' + esc(A.note) + '</p>';
}
export function patentsHTML(opts = {}) {
  const P = PATENTS;
  return '<div class="ip" data-reveal>' + P.items.map(p => '<article class="ip__card"><div class="ip__top"><span class="ip__badge">Approved patent</span><span class="ip__role">Lifecycle · ' + p.role + '</span></div><h3>' + esc(p.t) + '</h3><dl>' +
      (opts.noChallenge ? '' : '<div><dt class="ch">The challenge</dt><dd>' + esc(p.ch) + '</dd></div>') + '<div><dt class="ap">The approach</dt><dd>' + esc(p.ap) + '</dd></div>' + (opts.compact ? '' : '<div><dt class="ar">Role in the architecture</dt><dd>' + esc(p.ar) + '</dd></div>') + '</dl></article>').join('') + '</div>' +
    (!P.extra.show ? (opts.link ? '<a class="link-arrow" href="' + L('/technology/patents') + '">Patented innovation →</a>' : '') :
    '<div class="ip__extra"><span class="ip__badge" style="border-color:rgba(53,213,164,.5);color:var(--green)">Additional IP</span><div><h3>' + esc(P.extra.t) + '</h3><p>' + esc(P.extra.b) + '</p></div>' + (opts.link ? '<a class="link-arrow" style="margin:0" href="' + L('/technology/patents') + '">Patented innovation →</a>' : '<span class="ip__role">Lifecycle · ' + P.extra.role + '</span>') + '</div>') +
    (opts.map === false ? '' : '<div class="ip__map" aria-label="Where the intellectual property sits in the lifecycle">' + LIFECYCLE.map(s => { const hit = P.items.find(p => p.role === s.t) || (P.extra.show && P.extra.role === s.t ? P.extra : null);
      return '<div class="' + (hit ? 'on' : '') + '"><b>' + s.t + '</b>' + (hit ? esc(hit.t) : s.t === 'Restore' ? 'Verified recovery (platform)' : 'Governed response (platform)') + '</div>'; }).join('') + '</div>') +
    (opts.disclaimer ? '<p class="fine">' + esc(P.disclaimer) + '</p>' : '');
}
export function factorsHTML() {
  return '<div class="factors" data-reveal>' + FACTORS.map((f, i) => '<div class="factor"><span class="factor__n">0' + (i + 1) + '</span><div><h3>' + esc(f.t) + '</h3><p>' + esc(f.b) + '</p></div></div>').join('') + '</div>';
}
export function decisionHTML() { // static fallback, replaced by js/scenario.js
  return '<div class="dx" data-decision><div class="dx__left"><p class="label">Response options in this scenario</p><ul class="dx__eval">' + OPTIONS.map(o => '<li><span>' + esc(o.t) + '</span><b>' + esc(o.residual) + ' residual risk</b><em>' + esc(o.business) + '.</em></li>').join('') + '</ul></div><div class="dx__right"><p class="dx__foot">Illustrative decision scenario, not a measured production result. Enable JavaScript to compare options interactively.</p></div></div>';
}
export function scenarioHTML() { // static fallback, replaced by js/scenario.js
  return '<div class="sim" data-scenario><div class="sim__banner" role="note">' + esc(SIM_LABEL) + '</div><ol class="sim__steps" style="grid-template-columns:repeat(3,minmax(0,1fr))">' + STAGES.map((s, i) => '<li><button type="button" disabled><span>0' + (i + 1) + '</span>' + esc(s.t) + '</button></li>').join('') + '</ol><p class="fine" style="padding:0 20px 20px">Enable JavaScript to run the interactive simulation.</p></div>';
}

/* ---------- sub-page sections ---------- */
const SECTION = {
  hero: (s, page) => {
    const parts = page.slug.split('/');
    const crumbs = [['Home', '/']].concat(parts.length > 1 ? [[PAGES[parts[0]]?.title || parts[0], '/' + parts[0]]] : []);
    return '<header class="page-hero"><div class="page-hero__in"><nav aria-label="Breadcrumb"><ol class="crumbs">' + crumbs.map(([t, h]) => '<li><a href="' + L(h) + '">' + esc(t) + '</a></li>').join('') + '<li><span aria-current="page">' + esc(page.title) + '</span></li></ol></nav>' +
      eyebrow(s.eyebrow) + '<h1>' + esc(s.title) + '</h1><p class="lead">' + esc(s.body) + '</p>' + (s.ctas && s.ctas.length ? '<div class="row">' + s.ctas.map(b => btn(b)).join('') + '</div>' : '') + '</div></header>';
  },
  cards: s => '<section class="psec"' + (s.id ? ' id="' + s.id + '"' : '') + '>' + eyebrow(s.eyebrow) + (s.title ? '<h2 class="h2 h2--sm">' + esc(s.title) + '</h2>' : '') + (s.lead ? '<p class="lead">' + esc(s.lead) + '</p>' : '') +
    '<div class="grid g' + (s.cols || 3) + '" data-reveal>' + s.items.map(it => { const tag = it.href ? 'a' : 'div';
      const hx = s.title ? 'h3' : 'h2';
      return '<' + tag + ' class="card"' + (it.href ? ' href="' + esc(L(it.href)) + '"' : '') + '>' + (it.k ? '<div class="card__k">' + esc(it.k) + '</div>' : '') + '<' + hx + '>' + esc(it.t) + '</' + hx + '>' + (it.b ? '<p>' + esc(it.b) + '</p>' : '') + (it.cta ? '<span class="card__cta">' + esc(it.cta) + ' →</span>' : '') + '</' + tag + '>'; }).join('') + '</div></section>',
  steps: s => '<section class="psec">' + eyebrow(s.eyebrow) + '<h2 class="h2 h2--sm">' + esc(s.title) + '</h2>' + (s.body ? '<p class="lead">' + esc(s.body) + '</p>' : '') +
    '<ol class="steps" style="grid-template-columns:repeat(' + s.items.length + ',minmax(0,1fr))" data-reveal>' + s.items.map((it, i) => '<li class="step"><div class="step__n" aria-hidden="true">' + (i + 1) + '</div><h3>' + esc(it.t) + '</h3><p>' + esc(it.b) + '</p></li>').join('') + '</ol></section>',
  list: s => '<section class="psec"' + (s.id ? ' id="' + s.id + '"' : '') + '><div class="listblock"><div>' + eyebrow(s.eyebrow) + '<h2>' + esc(s.title) + '</h2>' + (s.body ? '<p>' + esc(s.body) + '</p>' : '') + '</div><ul class="chips">' + s.items.map(i => '<li>' + esc(i) + '</li>').join('') + '</ul></div></section>',
  scenarios: s => '<section class="psec">' + eyebrow(s.eyebrow, ' eyebrow--rose') + '<h2 class="h2 h2--sm">' + esc(s.title) + '</h2><div class="grid g3" data-reveal>' + s.items.map(it => '<div class="scen"><h3>' + esc(it.t) + '</h3><p>' + esc(it.b) + '</p><div><span>Designed response</span><p>' + esc(it.r) + '</p></div></div>').join('') + '</div></section>',
  layers: s => '<section class="psec"><h2 class="h2 h2--sm">' + esc(s.title) + '</h2><ol class="layers">' + s.items.map((it, i) => '<li class="layer" style="--a:' + (.18 + i * .07).toFixed(2) + '"><span class="layer__n">L' + (i + 1) + '</span><div><h3>' + esc(it.t) + '</h3><p>' + esc(it.b) + '</p></div><div class="layer__ex">' + esc(it.ex) + '</div></li>').join('') + '<li class="layers__gov">Governance &amp; audit across every layer</li></ol></section>',
  compare: s => '<section class="psec">' + eyebrow(s.eyebrow) + '<h2 class="h2 h2--sm">' + esc(s.title) + '</h2><p class="lead">' + esc(s.body) + '</p><div class="cmp"><table><thead><tr><th scope="col">Category</th><th scope="col">Primary focus</th><th scope="col">How CyberActive AI complements it</th></tr></thead><tbody>' + s.rows.map(r => '<tr><td>' + esc(r.c) + '</td><td>' + esc(r.f) + '</td><td>' + esc(r.a) + '</td></tr>').join('') + '</tbody></table></div></section>',
  status: s => '<section class="psec">' + eyebrow(s.eyebrow) + '<h2 class="h2 h2--sm">' + esc(s.title) + '</h2><ul class="status-key">' + STATUS_DESC.map(([k, d]) => '<li style="--c:' + STATUS[k] + '"><b style="font-weight:500;color:var(--soft)">' + k + '</b> · ' + d + '</li>').join('') + '</ul><ul class="status-list">' + s.items.map(it => '<li><span>' + esc(it.t) + '</span>' + statusPill(it.s) + '</li>').join('') + '</ul></section>',
  milestones: s => '<section class="psec">' + eyebrow(s.eyebrow) + '<h2 class="h2 h2--sm">' + esc(s.title) + '</h2><ul class="status-key">' + STATUS_DESC.slice(0, 4).map(([k, d]) => '<li style="--c:' + STATUS[k] + '"><b style="font-weight:500;color:var(--soft)">' + k + '</b> · ' + d + '</li>').join('') + '</ul><div class="milestones" data-reveal>' + s.items.map(m => '<div class="milestone">' + statusPill(m.s) + '<h3>' + esc(m.t) + '</h3><ul class="dot-list">' + m.points.map(p => '<li class="dot-item" style="--dot:' + STATUS[m.s] + '">' + esc(p) + '</li>').join('') + '</ul></div>').join('') + '</div></section>',
  patents: () => '<section class="psec"><h2 class="sr-only">Approved patents</h2>' + patentsHTML({ disclaimer: false }) + '</section>',
  note: s => '<section class="psec psec--note"><p class="note">' + esc(s.text) + '</p></section>',
  cta: s => '<section class="psec"><div class="cta-box"><h2>' + esc(s.title) + '</h2><p>' + esc(s.body) + '</p><div class="row">' + s.ctas.map(b => btn(b)).join('') + '</div></div></section>',
  form: s => {
    const select = s.route === 'select', route = select ? 'demo' : s.route, r = ROUTES[route];
    return '<section class="psec" id="form"><div class="form-block" data-route-scope><div>' +
      '<p class="eyebrow" data-route-text="eyebrow">' + esc(r.eyebrow) + '</p><h2 data-route-text="title">' + esc(r.title) + '</h2><p data-route-text="lead">' + esc(s.lead || r.lead) + '</p>' +
      (select ? routeButtons('contact-form', route) : '') + '</div>' +
      formHTML({ id: select ? 'contact-form' : route + '-form', route, selectable: select, heading: false }) + '</div></section>';
  },
  contacts: s => '<section class="psec"><div class="listblock"><div><h2>' + esc(s.title) + '</h2><p>Prefer email? Write to the team directly.</p><a class="li-follow" href="' + LINKEDIN + '" target="_blank" rel="noopener noreferrer">' + LI_ICON + '<span>Follow CyberActive AI on LinkedIn</span></a></div><ul class="contacts">' + s.items.map(([k, v]) => '<li><span>' + esc(k) + '</span><a href="mailto:' + v + '">' + v + '</a></li>').join('') + '</ul></div></section>',
  faq: s => '<section class="psec"><div class="faq">' + s.items.map(([q, a], i) => '<details class="faq__item"' + (i === 0 ? ' open' : '') + '><summary><h2>' + esc(q) + '</h2></summary><p>' + esc(a) + '</p></details>').join('') + '</div></section>',
  factors: s => '<section class="psec">' + eyebrow(s.eyebrow) + '<h2 class="h2 h2--sm">' + esc(s.title) + '</h2><p class="lead">' + esc(s.lead) + '</p>' + factorsHTML() + '</section>',
  decision: s => '<section class="psec" id="explorer">' + eyebrow(s.eyebrow) + '<h2 class="h2 h2--sm">' + esc(s.title) + '</h2><p class="lead">' + esc(s.lead) + '</p>' + decisionHTML() + '</section>',
  scenario: () => '<section class="psec" id="simulation" style="padding-top:56px"><h2 class="sr-only">Interactive simulation</h2>' + scenarioHTML() + '</section>',
  arch: s => '<section class="psec" id="' + (s.id || 'architecture') + '">' + archHTML({ eyebrow: s.eyebrow, title: s.title, small: true }) + '</section>',
  governance: () => '<section class="psec" id="governance">' + governanceHTML({ small: true, prefix: 'pgov' }) + '</section>'
};

/* ---------- page shell ---------- */
function head({ title, desc, path, jsonld, scripts = [], noindex }) {
  const url = SITE + (path === '/' ? '/' : path);
  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '<title>' + esc(title) + '</title>\n<meta name="description" content="' + esc(desc) + '">\n' +
    (noindex ? '<meta name="robots" content="noindex">\n' : '<link rel="canonical" href="' + url + '">\n') +
    '<meta property="og:type" content="website">\n<meta property="og:site_name" content="CyberActive AI">\n<meta property="og:title" content="' + esc(title) + '">\n<meta property="og:description" content="' + esc(desc) + '">\n<meta property="og:url" content="' + url + '">\n<meta property="og:image" content="' + SITE + '/assets/og-image.png">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta property="og:image:alt" content="CyberActive AI: The Autonomous Security Layer for AI Workloads and GPU Infrastructure">\n' +
    '<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:image" content="' + SITE + '/assets/og-image.png">\n<meta name="twitter:title" content="' + esc(title) + '">\n<meta name="twitter:description" content="' + esc(desc) + '">\n<meta name="theme-color" content="#050B14">\n' +
    '<link rel="icon" type="image/png" sizes="32x32" href="' + L('/assets/favicon-32.png') + '">\n<link rel="icon" type="image/png" sizes="16x16" href="' + L('/assets/favicon-16.png') + '">\n<link rel="icon" type="image/svg+xml" href="' + L('/assets/logo-13b.svg') + '">\n<link rel="apple-touch-icon" sizes="180x180" href="' + L('/assets/apple-touch-icon.png') + '">\n<link rel="manifest" href="' + L('/site.webmanifest') + '">\n' +
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&amp;family=Geist+Mono:wght@400;500&amp;display=swap">\n' +
    '<link rel="stylesheet" href="' + L('/css/site.css') + '">\n' +
    ['/js/site.js'].concat(scripts).map(s => '<script type="module" src="' + L(s) + '"></script>\n').join('') +
    '<script type="application/ld+json">' + JSON.stringify(jsonld).replace(/</g, '\\u003c') + '</script>\n</head>\n';
}
const LINKEDIN = 'https://www.linkedin.com/company/cyberactive-ai';
const LI_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>';
const ORG = { '@type': 'Organization', '@id': SITE + '/#org', name: 'CyberActive AI', url: SITE + '/', logo: SITE + '/assets/icon-512.png', sameAs: [LINKEDIN],
  description: 'Autonomous security and resilience for AI workloads and GPU infrastructure.',
  contactPoint: [['sales', 'sales@cyberactive.ai'], ['partnerships', 'partners@cyberactive.ai'], ['investor relations', 'ir@cyberactive.ai']].map(([t, e]) => ({ '@type': 'ContactPoint', contactType: t, email: e })) };
function ld(path, title, desc, crumbs, faq) {
  const g = [ORG, { '@type': 'WebPage', '@id': SITE + path + '#page', url: SITE + path, name: title, description: desc, isPartOf: { '@id': SITE + '/#site' }, about: { '@id': SITE + '/#org' } }];
  if (path === '/') g.push({ '@type': 'WebSite', '@id': SITE + '/#site', url: SITE + '/', name: 'CyberActive AI', publisher: { '@id': SITE + '/#org' } });
  if (faq) g.push({ '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  if (crumbs) g.push({ '@type': 'BreadcrumbList', itemListElement: crumbs.map(([n, p], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE + p })) });
  return { '@context': 'https://schema.org', '@graph': g };
}
function header(current, isHome) {
  const on = h => current === h || current.startsWith(h + '/');
  return '<a class="skip" href="#main">Skip to content</a>\n<header class="nav" id="nav">' +
    '<a class="brand" href="' + L('/') + '" aria-label="CyberActive AI home"><span class="brand__mark">' + brandMark() + '</span><span class="brand__name">CyberActive<span>AI</span></span></a>' +
    '<nav aria-label="Primary"><ul class="nav__links">' + NAV.map(([t, h]) => '<li><a href="' + L(h) + '"' + (on(h) ? ' aria-current="page"' : '') + '>' + t + '</a></li>').join('') + '</ul></nav>' +
    '<div class="nav__right"><a class="btn btn--primary nav__cta" href="' + L('/contact?demo') + '"' + (isHome ? ' data-open="demo"' : '') + '>Request a Demo</a>' +
    '<button class="burger" id="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span><span></span></button></div>' +
    (isHome ? '<span class="nav__progress" id="progress"></span>' : '') + '</header>\n' +
    '<div class="mobile-menu" id="mobile-menu" hidden><nav aria-label="Mobile"><ul>' + NAV.concat([['Company', '/about'], ['Contact', '/contact']]).map(([t, h]) => '<li><a href="' + L(h) + '"' + (on(h) ? ' aria-current="page"' : '') + '>' + t + '</a></li>').join('') + '</ul></nav>' +
    '<a class="btn btn--primary" href="' + L('/contact?demo') + '"' + (isHome ? ' data-open="demo"' : '') + '>Request a Demo</a></div>\n';
}
function footer() {
  return '<footer class="footer"><div class="wrap"><div class="footer__top"><div class="footer__about"><a class="brand" href="' + L('/') + '"><img class="brand__mark" src="' + L('/assets/logo-13b.svg') + '" alt="" width="34" height="34"><span class="brand__name">CyberActive<span>AI</span></span></a>' +
    '<p class="footer__tag">The Autonomous Security Layer for AI Workloads and GPU Infrastructure.</p><p>Threat detection, infrastructure context, impact-aware decisions, governed response, and verified recovery.</p><div class="social"><a href="' + LINKEDIN + '" target="_blank" rel="noopener noreferrer" aria-label="CyberActive AI on LinkedIn (opens in a new tab)">' + LI_ICON + '</a></div></div>' +
    '<div class="footer__cols">' + FOOTER.map(([h, links]) => '<div class="footer__col"><h2>' + h + '</h2><ul>' + links.map(([t, href]) => '<li><a href="' + esc(L(href.split('#')[0]) + (href.includes('#') ? '#' + href.split('#')[1] : '')) + '">' + t + '</a></li>').join('') + '</ul></div>').join('') + '</div></div>' +
    '<div class="footer__legal"><span>© 2026 CyberActive AI. All rights reserved.</span><span>Interactive visuals on this site are illustrative simulations, not live production telemetry. Nothing on this site constitutes a guarantee of security outcomes.</span></div></div></footer>\n' +
    '<div class="cookie" id="cookie" role="region" aria-label="Cookie notice" hidden><p>We use cookies and similar technologies to improve site performance and security. By continuing to use this site, you consent to our use of cookies as described in our <a href="' + L('/legal') + '#privacy">Privacy Policy</a>.</p><button type="button" id="cookie-ok">Accept</button></div>\n';
}
const modalHTML = () => '<div class="modal" id="modal" hidden><div class="modal__box" role="dialog" aria-modal="true" aria-labelledby="modal-title" data-route-scope>' +
  '<button class="modal__close" type="button" data-close aria-label="Close">×</button><p class="form-card__eyebrow" data-route-text="email">' + ROUTES.demo.email + '</p><h2 id="modal-title" data-route-text="title">' + ROUTES.demo.title + '</h2><p class="modal__lead" data-route-text="lead">' + esc(ROUTES.demo.lead) + '</p>' +
  formHTML({ id: 'modal-form', route: 'demo', heading: false }).replace('class="form-card"', 'class="form-card" style="padding:0;border:0;background:none;box-shadow:none"') + '</div></div>\n';

/* ---------- writers ---------- */
const written = [];
function write(rel, html) {
  const f = join(OUT, rel); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, html); written.push(rel);
}
const needsSim = secs => secs.some(s => s.type === 'scenario' || s.type === 'decision');

// Home
DEPTH = 0;
{
  const title = 'CyberActive AI | Autonomous Security for AI Workloads and GPU Infrastructure';
  const desc = 'CyberActive AI is the autonomous security layer for AI workloads and GPU infrastructure: patented threat detection, infrastructure dependency intelligence, impact-aware decisions, and governed response and recovery.';
  const h = { esc, L, btn, formHTML, routeButtons, governanceHTML, archHTML, patentsHTML, factorsHTML, decisionHTML, scenarioHTML, LIFECYCLE, GOVERNANCE };
  write('index.html', head({ title, desc, path: '/', jsonld: ld('/', title, desc), scripts: ['/js/home-visuals.js'] }) + '<body>\n' + header('/', true) + '<main id="main">\n' + home(h) + '\n</main>\n' + footer() + modalHTML() + '</body>\n</html>\n');
}
// Sub-pages
for (const [slug, page] of Object.entries(PAGES)) {
  DEPTH = RELATIVE ? slug.split('/').length - 1 : 0;
  const path = '/' + slug, title = page.title + ' | CyberActive AI';
  const parts = slug.split('/');
  const crumbs = [['Home', '/']].concat(parts.length > 1 ? [[PAGES[parts[0]].title, '/' + parts[0]]] : []).concat([[page.title, path]]);
  const ctx = { ...page, slug };
  const body = page.sections.map(s => { if (!SECTION[s.type]) throw new Error('Unknown section type ' + s.type + ' on ' + slug); return SECTION[s.type](s, ctx); }).join('\n');
  write(slug + '.html', head({ title, desc: page.desc, path, jsonld: ld(path, title, page.desc, crumbs, (page.sections.find(s => s.type === 'faq') || {}).items), scripts: needsSim(page.sections) ? ['/js/scenario.js'] : [] }) +
    '<body>\n' + header(path, false) + '<main id="main" class="page">\n' + body + '\n</main>\n' + footer() + '</body>\n</html>\n');
}
// Legal
DEPTH = 0;
{
  const title = 'Privacy Policy & Terms of Use | CyberActive AI', desc = 'Privacy Policy and Terms of Use for the CyberActive AI website.';
  const block = ([k, v]) => k === 'p' ? '<p>' + esc(v) + '</p>' : k === 'h' ? '<h4>' + esc(v) + '</h4>' : k === 'strong' ? '<p class="lg-strong">' + esc(v) + '</p>' : k === 'mail' ? '<p>' + (v ? esc(v) + ' ' : '') + '<a href="mailto:legal@cyberactive.ai">legal@cyberactive.ai</a></p>' : '<ul>' + v.map(i => '<li>' + esc(i) + '</li>').join('') + '</ul>';
  const toc = LEGAL.map(d => '<div><a class="lg-toc__h" href="#' + d.id + '">' + d.title + '</a><ol>' + d.sections.map(([hd], i) => '<li><a href="#' + d.id + '-' + (i + 1) + '">' + (i + 1) + '. ' + esc(hd) + '</a></li>').join('') + '</ol></div>').join('');
  const docs = LEGAL.map(d => '<article class="lg-doc" id="' + d.id + '"><h2>' + d.title + '</h2><p class="lg-doc__date">CyberActive AI · Effective date: ' + EFFECTIVE + '</p>' + d.sections.map(([hd, bl], i) => '<section class="lg-sec" id="' + d.id + '-' + (i + 1) + '"><h3><span>' + (i + 1) + '</span>' + esc(hd) + '</h3>' + bl.map(block).join('') + '</section>').join('') + '</article>').join('');
  write('legal.html', head({ title, desc, path: '/legal', jsonld: ld('/legal', title, desc, [['Home', '/'], ['Legal', '/legal']]) }) + '<body>\n' + header('/legal', false) +
    '<main id="main" class="lg-main"><p class="eyebrow eyebrow--cyan">Legal</p><h1>Privacy Policy &amp; Terms of Use</h1><p class="lg-date">CyberActive AI · Effective date: ' + EFFECTIVE + '</p><div class="lg-grid"><nav class="lg-toc" aria-label="Contents">' + toc + '</nav><div class="lg-docs">' + docs + '</div></div></main>\n' + footer() + '</body>\n</html>\n');
}
// 404
{
  const title = 'Page Not Found | CyberActive AI', desc = 'The page you requested could not be found.';
  write('404.html', head({ title, desc, path: '/404', jsonld: ld('/404', title, desc), noindex: true }) + '<body>\n' + header('/404', false) +
    '<main id="main" class="page"><header class="page-hero nf"><div class="page-hero__in"><p class="eyebrow">Error 404</p><h1>This Page Could Not Be Found.</h1><p class="lead">The link may be out of date. These pages are a good place to continue.</p><div class="row">' +
    [{ label: 'Go to the homepage', href: '/', primary: true }, { label: 'Interactive Simulation', href: '/demo' }, { label: 'Contact', href: '/contact' }].map(b => btn(b)).join('') + '</div></div></header></main>\n' + footer() + '</body>\n</html>\n');
}
// Sitemap + robots (production only)
if (!RELATIVE) {
  const urls = ['/'].concat(Object.keys(PAGES).map(s => '/' + s), ['/legal']);
  write('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.map(u => '  <url><loc>' + SITE + (u === '/' ? '/' : u) + '</loc><lastmod>' + TODAY + '</lastmod><priority>' + (u === '/' ? '1.0' : u.split('/').length > 2 ? '0.6' : '0.8') + '</priority></url>').join('\n') + '\n</urlset>\n');
  write('.well-known/security.txt', 'Contact: mailto:security@cyberactive.ai\nExpires: ' + new Date(Date.now() + 365 * 864e5).toISOString().slice(0, 10) + 'T00:00:00.000Z\nPreferred-Languages: en\nCanonical: ' + SITE + '/.well-known/security.txt\nPolicy: ' + SITE + '/trust#disclosure\n');
  write('robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: ' + SITE + '/sitemap.xml\n');
}
write('site.webmanifest', JSON.stringify({ name: 'CyberActive AI', short_name: 'CyberActive', description: 'The Autonomous Security Layer for AI Workloads and GPU Infrastructure.', start_url: '/', display: 'browser', background_color: '#050B14', theme_color: '#050B14', icons: [{ src: '/assets/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }, { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png' }] }, null, 2) + '\n');
// Preview: copy static assets next to the pages
if (RELATIVE && OUT !== ROOT) {
  for (const d of ['assets', 'css', 'js']) { rmSync(join(OUT, d), { recursive: true, force: true }); cpSync(join(ROOT, d), join(OUT, d), { recursive: true }); }
  cpSync(join(ROOT, 'ca-visuals.js'), join(OUT, 'ca-visuals.js'));
}
console.log('Built ' + written.length + ' files → ' + (OUT === ROOT ? 'repo root' : OUT) + (RELATIVE ? ' (relative links)' : ''));
