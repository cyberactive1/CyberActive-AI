// Contact routes, shared by js/site.js (browser) and scripts/build.mjs (static HTML).
// Submissions go to Formspree; the destination inbox (info@cyberactive.ai) is set in the Formspree dashboard.
export const FORMSPREE_ID = 'mkjjagrp';
export const FORM_ENDPOINT = 'https://formspree.io/f/' + FORMSPREE_ID;
export const CONTACT_EMAIL = 'info@cyberactive.ai';
export const ROUTES = {
  demo: { eyebrow: 'For customers', title: 'Request a Private Demo', btn: 'Request a Private Demo', email: 'sales@cyberactive.ai', lead: 'A guided technical session covering detection, dependency analysis, governed response, and recovery, tailored to your environment.' },
  partner: { eyebrow: 'For partners', title: 'Explore Strategic Partnership', btn: 'Explore Partnership', email: 'partners@cyberactive.ai', lead: 'For GPU cloud providers, AI infrastructure operators, OEMs, MSSPs, and technology partners exploring integration or joint commercialization.' },
  investor: { eyebrow: 'For investors', title: 'Request an Investor Briefing', btn: 'Request Investor Briefing', email: 'ir@cyberactive.ai', lead: 'For qualified investors seeking information about CyberActive AI.' }
};
