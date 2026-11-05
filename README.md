# cyberactive.ai

Static marketing site for CyberActive AI. No build step.

## Structure
- `index.html` — homepage
- `legal.html` — Privacy Policy & Terms of Use (served at `/legal`)
- `support.js` — page runtime (loads React 18 from unpkg with SRI)
- `ca-visuals.js` — hero and telemetry-radar canvas animations
- `assets/` — logo, icons, images
- `vercel.json` — clean URLs, security headers, asset caching

## Local preview
```
npx serve .
```
(Open via a local server, not file://, so ES module imports load.)

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project → Import** the repo.
3. Framework preset: **Other**. Build command: *none*. Output directory: `./`.
4. Add the domain `cyberactive.ai` under **Settings → Domains**.

## Before launch
- Contact forms open the visitor's email client (mailto). Swap for a form endpoint (e.g. Vercel Function, Formspree, HubSpot) to capture leads server-side.
- Confirm mailboxes: sales@, partners@, ir@, legal@cyberactive.ai.
- Legal copy should be reviewed by counsel.
