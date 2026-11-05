# cyberactive.ai

Static marketing site for CyberActive AI — plain HTML, CSS and vanilla JavaScript. No framework, no build step.

## Structure
- `index.html` — homepage
- `legal.html` — Privacy Policy & Terms of Use (served at `/legal`)
- `css/site.css` — all styles (design tokens at the top, then sections in page order, then responsive rules)
- `js/site.js` — page behaviour: nav, tabs, radar panels, contact routes/modal, cookie notice, scroll reveal
- `ca-visuals.js` — hero and telemetry-radar canvas animations (ES module, imported by `js/site.js`)
- `assets/` — logo, icons, images
- `vercel.json` — clean URLs, security headers, asset caching

## Editing
- Copy lives directly in the HTML. Interactive panels (platform stages, radar domains, response modes, contact routes) also have their data in `js/site.js` — update both when changing those texts.
- Colours and fonts are CSS custom properties in `:root` at the top of `css/site.css`.

## Local preview
```
npx serve .
```
(Use a local server, not file://, so the ES module imports load.)

## Deploy to Vercel
1. In Vercel: **Add New → Project → Import** this repo.
2. Framework preset: **Other**. Build command: *none*. Output directory: `./`.
3. Add the domain `cyberactive.ai` under **Settings → Domains**.

## Before launch
- Contact forms open the visitor's email client (mailto). Swap for a form endpoint (e.g. Vercel Function, Formspree, HubSpot) to capture leads server-side.
- Confirm mailboxes: sales@, partners@, ir@, legal@cyberactive.ai.
- Legal copy should be reviewed by counsel.
