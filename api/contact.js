// Vercel Serverless Function — POST /api/contact
// Env: RESEND_API_KEY (required to deliver), CONTACT_FROM (e.g. "CyberActive AI <web@cyberactive.ai>")
// Optional overrides: ROUTE_DEMO, ROUTE_PARTNER, ROUTE_INVESTOR (destination mailboxes)
const ROUTES = {
  demo: process.env.ROUTE_DEMO || 'sales@cyberactive.ai',
  partner: process.env.ROUTE_PARTNER || 'partners@cyberactive.ai',
  investor: process.env.ROUTE_INVESTOR || 'ir@cyberactive.ai'
};
const LABEL = { demo: 'Private Demo Request', partner: 'Strategic Partnership', investor: 'Investor Briefing' };
const hits = new Map(); // best-effort per-instance rate limit
const ALLOWED = ['name', 'company', 'email', 'title', 'role', 'infra', 'scale', 'objectives', 'category', 'collab', 'investorType', 'interest', 'message'];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'Method not allowed' }); }
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const now = Date.now(), win = 10 * 60 * 1000, list = (hits.get(ip) || []).filter(t => now - t < win);
  if (list.length >= 5) return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
  list.push(now); hits.set(ip, list);

  let d = req.body; if (typeof d === 'string') { try { d = JSON.parse(d); } catch { d = {}; } }
  d = d || {};
  if (d.website) return res.status(200).json({ ok: true }); // honeypot
  const route = ROUTES[d.route] ? d.route : 'demo';
  const clean = {}; for (const k of ALLOWED) if (d[k]) clean[k] = String(d[k]).slice(0, k === 'message' || k === 'collab' || k === 'objectives' ? 4000 : 300).trim();
  if (!clean.name || clean.name.length < 2) return res.status(400).json({ error: 'Please enter your full name.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean.email || '')) return res.status(400).json({ error: 'Please enter a valid business email.' });
  if (!clean.company) return res.status(400).json({ error: 'Please enter your organization.' });

  if (!process.env.RESEND_API_KEY) return res.status(503).json({ error: 'Form delivery is not configured yet. Please email ' + ROUTES[route] + '.' });
  const rows = Object.entries(clean).map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#555">${esc(k)}</td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`).join('');
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.CONTACT_FROM || 'CyberActive AI <web@cyberactive.ai>', to: [ROUTES[route]], reply_to: clean.email, subject: `[${LABEL[route]}] ${clean.company} — ${clean.name}`, html: `<table>${rows}</table>` })
    });
    if (!r.ok) return res.status(502).json({ error: 'Delivery failed. Please email ' + ROUTES[route] + '.' });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ error: 'Delivery failed. Please email ' + ROUTES[route] + '.' });
  }
};
