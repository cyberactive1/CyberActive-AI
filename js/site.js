// CyberActive AI — site behaviour (vanilla ES module, every page).
// Content is fully present in the HTML; this script only adds interaction.
import { ROUTES, FORM_ENDPOINT, CONTACT_EMAIL } from './forms-data.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
};


/* ---------- Navigation ---------- */
function initNav() {
  const burger = $('#burger'), menu = $('#mobile-menu');
  if (burger && menu) {
    const set = open => { menu.hidden = !open; burger.setAttribute('aria-expanded', String(open)); document.body.classList.toggle('is-locked', open); };
    burger.addEventListener('click', () => set(menu.hidden));
    $$('a', menu).forEach(a => a.addEventListener('click', () => set(false)));
    window.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { set(false); burger.focus(); } });
    const mq = matchMedia('(min-width: 1081px)'), onMq = e => { if (e.matches) set(false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq); else if (mq.addListener) mq.addListener(onMq);
  }
  const bar = $('#progress');
  const spy = $$('[data-spy]');
  let ticking = false;
  const update = () => {
    ticking = false;
    const de = document.documentElement;
    if (bar) bar.style.width = (de.scrollTop / Math.max(1, de.scrollHeight - innerHeight) * 100).toFixed(2) + '%';
    if (spy.length) {
      let cur = '';
      spy.forEach(a => { const el = document.getElementById(a.dataset.spy); if (el && el.getBoundingClientRect().top < innerHeight * .4) cur = a.dataset.spy; });
      spy.forEach(a => a.classList.toggle('is-active', a.dataset.spy === cur));
    }
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* ---------- Tabs (pillars, governance modes) ---------- */
// <div data-tabs> with [role=tab][aria-controls] buttons and matching [role=tabpanel]s.
function initTabs() {
  $$('[data-tabs]').forEach(group => {
    const tabs = $$('[role="tab"]', group);
    const select = (t, focus) => {
      tabs.forEach(x => {
        const on = x === t;
        x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1;
        const p = document.getElementById(x.getAttribute('aria-controls'));
        if (p) { p.hidden = !on; if (on) { p.classList.remove('is-anim'); void p.offsetWidth; p.classList.add('is-anim'); } }
      });
      if (focus) t.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', e => {
        const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (e.key === 'Home') { e.preventDefault(); select(tabs[0], true); }
        else if (e.key === 'End') { e.preventDefault(); select(tabs[tabs.length - 1], true); }
        else if (d) { e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true); }
      });
    });
  });
}

/* ---------- Forms ---------- */
// form[data-form] posts to Formspree (AJAX, JSON). Without JS it still submits via its action attribute. Route-specific fields live in
// <fieldset data-fields="demo|partner|investor">; hidden ones are disabled so
// they are neither validated nor sent.
function setRoute(form, route) {
  if (!ROUTES[route]) return;
  form.dataset.route = route;
  $$('[data-fields]', form).forEach(fs => { const on = fs.dataset.fields === route; fs.hidden = !on; fs.disabled = !on; });
  const r = ROUTES[route];
  $$('[data-route-text]', form.closest('[data-route-scope]') || form).forEach(el => { el.textContent = r[el.dataset.routeText]; });
  $$('[data-route-value]', form).forEach(el => { el.value = r[el.dataset.routeValue]; });
  const subj = $('input[name="_subject"]', form); if (subj) subj.value = 'Website enquiry: ' + r.title;
  $$('[data-route-btn]').filter(b => b.dataset.target === form.id).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.routeBtn === route)));
  const done = $('.form-done', form), body = $('.form-body', form);
  if (done) done.hidden = true; if (body) body.hidden = false;
  const err = $('.form-err', form); if (err) err.hidden = true;
}
function validate(form) {
  const problems = [];
  $$('input[required], select[required], textarea[required]', form).forEach(el => {
    if (el.disabled || el.closest('fieldset[disabled]')) return;
    const v = el.value.trim();
    const bad = !v || (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) || (el.name === 'name' && v.length < 2);
    el.setAttribute('aria-invalid', String(bad));
    if (bad) problems.push(el);
  });
  return problems;
}
function showError(form, html) {
  const err = $('.form-err', form);
  err.innerHTML = html; err.hidden = false;
}
function initForms() {
  $$('form[data-form]').forEach(form => {
    setRoute(form, form.dataset.route || 'demo');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const route = form.dataset.route || 'demo', r = ROUTES[route];
      const bad = validate(form);
      if (bad.length) {
        showError(form, bad.length === 1 ? 'Please check the highlighted field.' : 'Please fill in the ' + bad.length + ' highlighted fields.');
        bad[0].focus(); return;
      }
      // Formspree payload: every visible field, plus routing context and the email subject.
      const data = {};
      $$('input, select, textarea', form).forEach(el => { if (el.name && !el.disabled && !el.closest('fieldset[disabled]')) data[el.name] = el.value.trim(); });
      data.request = r.title;
      data.page = location.pathname;
      data._subject = '[' + r.title + '] ' + (data.company || data.name || 'Website enquiry') + ' \u2014 ' + (data.name || '');
      const btn = $('button[type="submit"]', form), label = btn.textContent;
      btn.disabled = true; btn.textContent = 'Sending\u2026';
      $('.form-err', form).hidden = true;
      const mail = '<a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a>';
      try {
        const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
        if (res.ok) {
          $('.form-body', form).hidden = true;
          const done = $('.form-done', form); done.hidden = false;
          done.focus();
          form.reset();
          setRoute(form, route); // keep the chosen request type after reset
          $('.form-body', form).hidden = true; done.hidden = false;
          try { window.dispatchEvent(new CustomEvent('ca:lead', { detail: { route } })); } catch (x) { /* older browsers */ }
        } else {
          // Formspree returns { errors: [{ field, message }] } on validation problems.
          const j = await res.json().catch(() => ({}));
          const errs = Array.isArray(j.errors) ? j.errors : [];
          errs.forEach(er => { const el = er.field && form.elements[er.field]; if (el && el.setAttribute) el.setAttribute('aria-invalid', 'true'); });
          const msg = errs.length ? errs.map(er => er.message).join(' ').replace(/[<>&"]/g, '') : 'Your request could not be sent.';
          showError(form, msg + ' Please try again, or email ' + mail + '.');
        }
      } catch (x) {
        showError(form, 'We couldn\u2019t reach the form service. Check your connection and try again, or email ' + mail + '.');
      } finally {
        btn.disabled = false; btn.textContent = label;
      }
    });
    $$('input, select, textarea', form).forEach(el => el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') el.setAttribute('aria-invalid', 'false'); }));
  });
  $$('[data-route-btn]').forEach(b => b.addEventListener('click', () => { const f = document.getElementById(b.dataset.target); if (f) setRoute(f, b.dataset.routeBtn); }));
  // /contact?partner preselects a route
  const q = (location.search || '').slice(1).split('&')[0];
  if (ROUTES[q]) $$('form[data-form][data-selectable]').forEach(f => setRoute(f, q));
}

/* ---------- Contact modal (homepage) ---------- */
function initModal() {
  const modal = $('#modal'); if (!modal) return;
  const form = $('form', modal);
  let last = null;
  const open = route => {
    setRoute(form, route);
    last = document.activeElement;
    modal.hidden = false; document.body.classList.add('is-locked');
    const m = $('#mobile-menu'); if (m) { m.hidden = true; $('#burger').setAttribute('aria-expanded', 'false'); }
    $('input:not([type="hidden"]):not(.hp)', modal).focus({ preventScroll: true });
  };
  const close = () => { if (modal.hidden) return; modal.hidden = true; document.body.classList.remove('is-locked'); if (last) last.focus({ preventScroll: true }); };
  $$('[data-open]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); open(a.dataset.open); }));
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  $('[data-close]', modal).addEventListener('click', close);
  window.addEventListener('keydown', e => {
    if (modal.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') { // keep focus inside the dialog
      const f = $$('button, input, select, textarea, a[href]', modal).filter(x => !x.disabled && x.offsetParent !== null && !x.classList.contains('hp'));
      const first = f[0], lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
    }
  });
}

/* ---------- Cookie notice ---------- */
function initCookie() {
  const box = $('#cookie'); if (!box) return;
  if (store.get('ca-cookie-ok') === '1') return;
  box.hidden = false;
  $('#cookie-ok').addEventListener('click', () => { store.set('ca-cookie-ok', '1'); box.hidden = true; });
}

/* ---------- Hero canvas (homepage) ---------- */
function initHero() {
  const cv = $('#hero-canvas'); if (!cv) return;
  const steps = $$('#hero-steps span'), phase = $('#hero-phase');
  import('../ca-visuals.js').then(V => V.startHero(cv, (label, i) => {
    phase.textContent = label;
    steps.forEach((s, j) => s.classList.toggle('is-on', j === i));
  })).catch(() => { /* decorative only */ });
}

/* ---------- Scroll reveal ---------- */
// Only elements that start below the fold are hidden, so the first frame is complete.
function initReveal() {
  if (!('IntersectionObserver' in window) || reduced()) return;
  const els = $$('main h2, [data-reveal] > *').filter(el => el.getBoundingClientRect().top > innerHeight);
  els.forEach(el => {
    const i = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
    el.style.setProperty('--d', Math.min(i, 6) * 70 + 'ms');
    el.classList.add('reveal');
  });
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in'); io.unobserve(e.target);
    setTimeout(() => e.target.classList.remove('reveal', 'is-in'), 1400);
  }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));
}

initNav();
initTabs();
initForms();
initModal();
initCookie();
initHero();
initReveal();
