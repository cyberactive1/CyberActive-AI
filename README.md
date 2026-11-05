# cyberactive.ai — Release 2.0

Static site + one Vercel Serverless Function. No build step.

## Routes
/ (homepage) · /platform · /solutions · /solutions/ai-workloads · /solutions/gpu-infrastructure · /solutions/ai-data-centers · /solutions/enterprise-ai · /solutions/mission-critical · /technology · /technology/patents · /demo · /customers · /partners · /investors · /about · /contact · /legal (/privacy, /terms redirect)

All sub-pages are served by `page.html`, which renders content from `pages-data.js` based on the URL path (see `rewrites` in vercel.json).

## Files
- index.html — homepage · page.html — all sub-pages · legal.html — Privacy & Terms
- pages-data.js — sub-page content (edit copy here)
- ca-forms.js — client form validation + submission to /api/contact
- api/contact.js — server-side validation, honeypot, rate limiting, email delivery via Resend
- support.js — page runtime (loads React 18 from unpkg with SRI) · ca-visuals.js — canvas visuals

## Forms — configure before launch
Set in Vercel → Settings → Environment Variables:
- RESEND_API_KEY — from resend.com (verify the cyberactive.ai sending domain)
- CONTACT_FROM — e.g. `CyberActive AI <web@cyberactive.ai>`
- Optional: ROUTE_DEMO, ROUTE_PARTNER, ROUTE_INVESTOR (defaults sales@, partners@, ir@cyberactive.ai)
Until RESEND_API_KEY is set, the API returns 503 and the form shows the direct email address. The in-memory rate limit is best-effort; add Vercel KV/Upstash for strict limits.

## Deploy
1. Push this folder to GitHub. 2. Vercel → Add New Project → Import → Framework "Other", no build command, output `./`. 3. Add env vars. 4. Add domain cyberactive.ai.

## Claims review before launch
- Capability statuses (Available / In Validation / Planned / Verified IP) on /technology and /investors
- "Approved patent" labels on three innovation areas; "Autonomous Recovery" as additional IP
- All interactive visuals are labeled illustrative simulations
