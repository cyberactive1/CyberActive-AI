# cyberactive.ai — Release 2.1

Static HTML/CSS/JS site with Formspree-powered forms. Every route is a real HTML file (crawlable, works without JavaScript); Vercel serves them directly with `cleanUrls`, so **no build step runs on deploy**.

## Routes
`/` · `/platform` · `/decision-intelligence` · `/trust` · `/faq` · `/solutions` · `/solutions/ai-workloads` · `/solutions/gpu-infrastructure` · `/solutions/ai-data-centers` · `/solutions/enterprise-ai` · `/solutions/mission-critical` · `/technology` · `/technology/patents` · `/demo` · `/customers` · `/partners` · `/investors` · `/about` · `/contact` · `/legal` · `404`
Redirects: `/privacy` and `/terms` → `/legal#…`; `/page` and `/page.html` → `/platform`.

## Editing content
1. Edit copy in `content/` — `pages.mjs` (all sub-pages + shared blocks), `home.mjs` (homepage), `legal.mjs`.
   Simulation and decision data: `js/scenario-data.js`. Contact routes: `js/forms-data.js`.
2. Run `node scripts/build.mjs` (Node 18+, no dependencies). It regenerates every `.html`, `sitemap.xml` and `robots.txt`.
3. Commit the source **and** the generated files, then push. Vercel deploys the static output.

Preview copy with relative links (open from disk or any static host): `node scripts/build.mjs --out=preview --relative`.

## Files
- `css/site.css` — all styles (tokens at the top)
- `js/site.js` — nav, tabs, forms, modal, cookie notice, scroll reveal
- `js/scenario.js` — 9-stage simulation and decision explorer (homepage, `/demo`, `/decision-intelligence`)
- `ca-visuals.js` — hero canvas animation
- `vercel.json` — clean URLs, redirects, security headers (incl. Content-Security-Policy), caching

## Forms (Formspree)
All six forms (homepage, homepage pop-up, /contact, /customers, /partners, /investors) submit to **Formspree** form `mkjjagrp` (`js/forms-data.js` → `FORMSPREE_ID`).
- Submissions are delivered to **info@cyberactive.ai**. The recipient, notifications, and spam settings are managed in the Formspree dashboard, not in code.
- JavaScript posts JSON via AJAX (`Accept: application/json`) and shows inline success and error states. Without JavaScript, forms still post to Formspree through their `action` attribute.
- Each submission includes `request` (Demo, Partnership, or Investor Briefing), `page`, and an email `_subject` such as `[Request a Private Demo] Company — Name`. `_gotcha` is the honeypot.
- The Content-Security-Policy in `vercel.json` allows `https://formspree.io` for `connect-src` and `form-action`.
- Recommended in Formspree: add `cyberactive.ai` to the form's allowed domains, and enable reCAPTCHA or Formspree's spam filtering.

## Claims review before production
- [ ] **Autonomous Recovery IP** — currently hidden. To show it once its status is confirmed, set `show: true` in `content/pages.mjs` → `PATENTS.extra` and rebuild.
- [ ] **Patent names** — the site uses the innovation-area names "Adaptive Zero-Day Detection", "Risk Propagation Intelligence", "Business Impact Decision Intelligence". Confirm against official titles.
- [ ] **Capability statuses** (Available / In Validation / Planned / Verified IP) on `/technology` and `/investors`.
- [ ] **Model-agnostic architecture** — AI security intelligence sources are marked *Planned*; no third-party model integration is claimed. Keep it that way until implemented and authorized.
- [ ] **Simulation figures** (44 hosts, 352 GPUs, timings, availability bars) are illustrative assumptions and carry the permanent label "Illustrative Platform Simulation — Not Live Production Telemetry".
- [ ] Market-challenge wording on AI-assisted attacks is qualified ("can shorten…"); add a citation if you want a stronger claim.
- [ ] Legal copy reviewed by counsel; confirm the mailboxes exist: sales@, partners@, ir@, legal@, and **security@** (used on /trust and in /.well-known/security.txt).
- [ ] Compliance statuses on /trust (SOC 2, ISO/IEC 27001, public-sector roadmap: all *Planned*).
- [ ] `security.txt` expires one year after each build. Rebuild at least yearly.
- [ ] No OpenAI/GPT branding, partnership, or comparison appears anywhere (frontier models are referenced generically).
