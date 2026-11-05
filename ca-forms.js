(function () {
  var ROUTES = {
    demo: { email: 'sales@cyberactive.ai', label: 'Private Demo Request' },
    partner: { email: 'partners@cyberactive.ai', label: 'Strategic Partnership' },
    investor: { email: 'ir@cyberactive.ai', label: 'Investor Briefing' }
  };
  function collect(form) {
    var d = {}; Array.prototype.forEach.call(form.elements, function (el) { if (el.name) d[el.name] = (el.value || '').trim(); }); return d;
  }
  function validate(d) {
    var errs = [];
    if (!d.name || d.name.length < 2) errs.push('Please enter your full name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email || '')) errs.push('Please enter a valid business email.');
    if (!d.company) errs.push('Please enter your organization.');
    return errs;
  }
  function mailto(route, d) {
    var r = ROUTES[route] || ROUTES.demo;
    var body = Object.keys(d).filter(function (k) { return k !== 'website' && k !== 'route' && d[k]; }).map(function (k) { return k + ': ' + d[k]; }).join('\n');
    window.location.href = 'mailto:' + r.email + '?subject=' + encodeURIComponent('[' + r.label + '] ' + (d.company || d.name)) + '&body=' + encodeURIComponent(body);
  }
  window.CAForms = {
    routes: ROUTES,
    submit: function (form, route) {
      var d = collect(form); d.route = route;
      var errs = validate(d);
      if (errs.length) return Promise.resolve({ ok: false, error: errs[0] });
      if (d.website) return Promise.resolve({ ok: true });
      return fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) })
        .then(function (res) {
          if (res.ok) { try { window.dispatchEvent(new CustomEvent('ca:lead', { detail: { route: route } })); } catch (e) {} return { ok: true }; }
          if (res.status === 404 || res.status === 405) { mailto(route, d); return { ok: true, fallback: true }; }
          return res.json().catch(function () { return {}; }).then(function (j) { return { ok: false, error: j.error || 'Submission failed. Please try again or email ' + (ROUTES[route] || ROUTES.demo).email + '.' }; });
        })
        .catch(function () { mailto(route, d); return { ok: true, fallback: true }; });
    }
  };
})();
