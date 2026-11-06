// CyberActive AI — homepage body. Rendered by scripts/build.mjs with shared helpers (h).
import { readFileSync } from 'node:fs';
const part = f => readFileSync(new URL('./' + f, import.meta.url), 'utf8');
// Positioning (agreed): The Autonomous Security Layer for AI Workloads and GPU Infrastructure.

const SEQUENCE = [
  { t: 'Threat intelligence', b: 'Detections and findings about what is happening, from many sources.', tag: 'Many sources', c: '#7FE6FF' },
  { t: 'Infrastructure context', b: 'Which assets, identities, and dependencies the threat touches.', tag: 'CyberActive AI', c: '#5B8CFF' },
  { t: 'Impact analysis', b: 'How it could propagate, and what the operational and business consequence would be.', tag: 'CyberActive AI', c: '#7B83FF' },
  { t: 'Intelligent decision', b: 'Response options ranked by risk, disruption, and reversibility.', tag: 'CyberActive AI', c: '#9B7BFF' },
  { t: 'Governed response', b: 'Action within customer-approved policy, with human oversight and override.', tag: 'CyberActive AI', c: '#B49BFF' },
  { t: 'Verified recovery', b: 'Restoration validated against a trusted state before return to service.', tag: 'CyberActive AI', c: '#35D5A4' }
];

const MARKETS_PRIMARY = [
  { icon: 'model', k: 'Primary', t: 'AI Workloads', b: 'Models, training pipelines, inference services, and the infrastructure behind them.', href: '/solutions/ai-workloads', cta: 'AI workload security' },
  { icon: 'gpu', k: 'Primary', t: 'GPU Infrastructure', b: 'GPU clusters, management planes, privileged access, and compute dependencies.', href: '/solutions/gpu-infrastructure', cta: 'GPU infrastructure security' },
  { icon: 'rack', k: 'Primary', t: 'AI Data Centers & GPU Cloud', b: 'High-density, multi-tenant compute where availability is the product.', href: '/solutions/ai-data-centers', cta: 'Data center security' }
];
const MARKETS_ADJ = [
  { icon: 'ent', k: 'Primary', t: 'Enterprise & Private AI', b: 'Private GPU deployments and enterprise AI workloads in hybrid environments.', href: '/solutions/enterprise-ai', cta: 'Enterprise AI' },
  { icon: 'shield', k: 'Adjacent', t: 'Mission-Critical Environments', b: 'The same architecture where disruption carries serious business or operational consequence.', href: '/solutions/mission-critical', cta: 'Mission-critical' }
];

const ICONS = {
  model: '<svg viewBox="0 0 24 24"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/></svg>',
  gpu: '<svg viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>',
  rack: '<svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="6" rx="1.5"/><rect x="4" y="11" width="16" height="6" rx="1.5"/><path d="M8 6h.01M8 14h.01M12 20v1M8 21h8"/></svg>',
  ent: '<svg viewBox="0 0 24 24"><path d="M4 21V7l8-4 8 4v14"/><path d="M9 21v-5h6v5M8 10h.01M12 10h.01M16 10h.01"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>'
};

const JOURNEYS = [
  { k: 'For customers', c: '#00D5FF', t: 'Protect Your AI Infrastructure.', href: '/customers', go: 'Customer overview',
    items: ['Protection of high-value AI infrastructure', 'Infrastructure risk awareness', 'Decision intelligence for every response', 'Operational resilience and verified recovery', 'Technical evaluation and pilot opportunities'] },
  { k: 'For partners', c: '#5B8CFF', t: 'Build More Resilient AI Infrastructure.', href: '/partners', go: 'Partner with CyberActive AI',
    items: ['Integration architecture', 'OEM and licensing opportunities', 'GPU cloud and AI data center opportunities', 'Joint technical validation', 'Potential channel commercialization'] },
  { k: 'For investors', c: '#9B7BFF', t: 'The Security Layer for the AI Infrastructure Economy.', href: '/investors', go: 'Investor overview',
    items: ['Growth of AI infrastructure', 'Patented intellectual property', 'Differentiated infrastructure intelligence', 'Potentially scalable licensing models', 'Model-agnostic architecture', 'Development and commercialization milestones'] }
];

const card = (h, it, i) => '<a class="card" href="' + h.L(it.href) + '"><div class="card__k">' + (it.k ? h.esc(it.k) : '0' + (i + 1)) + '</div><h3>' + h.esc(it.t) + '</h3><p>' + h.esc(it.b) + '</p><span class="card__cta">' + h.esc(it.cta || 'Explore') + ' →</span></a>';

export function home(h) {
  const { esc, L } = h;
  return [
/* ---------- Hero ---------- */
`<section class="hero" id="top" aria-labelledby="hero-title">
  <div class="hero__glow"></div><div class="hero__grid"></div>
  <canvas class="hero__canvas" id="hero-canvas" aria-hidden="true"></canvas>
  <div class="hero__fade"></div>
  <div class="hero__inner"><div class="hero__copy">
    <p class="badge">Autonomous AI Security &amp; Resilience</p>
    <h1 id="hero-title">The Autonomous Security Layer for <span class="grad-text">AI Workloads</span> and <span class="grad-text--v">GPU Infrastructure.</span></h1>
    <p class="hero__sub">CyberActive AI combines patented threat detection, infrastructure dependency intelligence, impact-aware decision-making, and governed response and recovery to strengthen security and resilience across AI workloads, GPU compute, and data centers.</p>
    <ol class="hero__flow" aria-label="Lifecycle"><li>DETECT</li><li>UNDERSTAND</li><li>DECIDE</li><li>ACT</li><li>RESTORE</li></ol>
    <div class="row">
      <a class="btn btn--primary" href="${L('/contact?demo')}" data-open="demo">Request a Private Demo</a>
      <a class="btn btn--ghost" href="#simulation">Run the Interactive Simulation</a>
    </div>
    <a class="hero__more" href="${L('/partners')}">Explore Strategic Partnerships →</a>
  </div></div>
  <div class="hero__cap" aria-hidden="true">
    <div class="hero__steps" id="hero-steps"><span class="is-on" style="--c:#277BFF"></span><span style="--c:#FF6475"></span><span style="--c:#FFB547"></span><span style="--c:#00D5FF"></span><span style="--c:#35D5A4"></span></div>
    <div class="hero__phase" id="hero-phase">Normal operations</div>
    <div class="sim-tag">Illustrative platform simulation</div>
  </div>
</section>`,

/* ---------- Proof strip ---------- */
`<div class="proof"><div class="proof__grid" data-reveal>
  <div class="proof__item"><div class="proof__v">Patented</div><div class="proof__k">Three approved patents in detection, propagation, and impact-aware decisions</div></div>
  <div class="proof__item"><div class="proof__v">Human-governed</div><div class="proof__k">Observe, Approve, or Autonomous modes within customer-approved boundaries</div></div>
  <div class="proof__item"><div class="proof__v">Complementary</div><div class="proof__k">Works alongside existing security tools and advancing AI security models</div></div>
  <div class="proof__item"><div class="proof__v">Model-agnostic</div><div class="proof__k">Decision layer designed not to depend on a single AI model provider</div></div>
</div></div>`,

/* ---------- Beyond threat detection ---------- */
`<section class="sec beyond" id="beyond" aria-labelledby="beyond-title"><div class="wrap">
  <p class="eyebrow eyebrow--cyan">Beyond threat detection</p>
  <div class="beyond__cols">
    <h2 class="h2" id="beyond-title">Finding a Threat Is Only the Beginning.</h2>
    <div>
      <p class="lead">Advanced AI is transforming how vulnerabilities are discovered and attacks are analyzed. But identifying a threat is only the first step.</p>
      <p class="lead">The greater challenge is understanding how that threat affects interconnected AI workloads, GPU infrastructure, and critical services, and determining how to respond without creating unnecessary operational disruption.</p>
      <p class="lead"><strong>CyberActive AI is designed to bridge that gap</strong> through patented risk propagation intelligence, business-impact analysis, governed autonomous decisions, and coordinated recovery.</p>
    </div>
  </div>
  <div class="hub" aria-label="Threat intelligence → Infrastructure context → Impact analysis → Intelligent decision → Governed response → Verified recovery">
    <ol class="hub__in">
      <li class="hub__card" style="--c:${SEQUENCE[0].c}">
        <span class="hub__n">01</span><h3>${esc(SEQUENCE[0].t)}</h3>
        <p>${esc(SEQUENCE[0].b)}</p>
        <ul class="hub__src" aria-label="Sources"><li>Existing security tools</li><li>Infrastructure telemetry</li><li>Advanced AI security models</li></ul>
        <span class="hub__tag">Advanced AI models strengthen step 01. CyberActive AI carries each finding through 02 to 06.</span><a class="hub__link" href="${L('/technology')}#architecture">Model-agnostic architecture →</a>
      </li>
    </ol>
    <div class="hub__core" aria-hidden="true"><div class="hub__orb"><img src="${L('/assets/logo-13b.svg')}" alt="" width="60" height="60"><span>CA AI Core</span></div></div>
    <ol class="hub__out" start="2">
      ${SEQUENCE.slice(1).map((s, i) => `<li style="--c:${s.c}"><span class="hub__n">0${i + 2}</span><div><h3>${esc(s.t)}</h3><p>${esc(s.b)}</p></div></li>`).join('')}
    </ol>
  </div>
</div></section>`,

/* ---------- Lifecycle ---------- */
`<section class="sec platform" id="platform" aria-labelledby="platform-title"><div class="wrap">
  <p class="eyebrow">The CyberActive AI platform</p>
  <h2 class="h2" id="platform-title">Detect. Understand. Decide. Act. Restore.</h2>
  <p class="lead">One continuous lifecycle that complements the security investments you already have.</p>
  <div data-tabs>
    <div class="pillars"><div class="grid g5" role="tablist" aria-label="Lifecycle stages">
      ${h.LIFECYCLE.map((p, i) => `<button class="pillar" type="button" role="tab" id="pl-tab-${i}" aria-controls="pl-${i}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}><span class="pillar__dot">0${i + 1}</span><span class="pillar__t">${p.t}</span><span class="pillar__b">${esc(p.b)}</span></button>`).join('')}
    </div></div>
    ${h.LIFECYCLE.map((p, i) => `<div class="split" role="tabpanel" id="pl-${i}" aria-labelledby="pl-tab-${i}"${i ? ' hidden' : ''}>
      <div class="stage"><p class="kicker">Stage 0${i + 1} · ${p.t}</p><p>${esc(p.detail)}</p></div>
      <div class="panel"><p class="label">What happens at this stage</p><ul class="dot-list">${p.points.map(x => `<li class="dot-item">${esc(x)}</li>`).join('')}</ul></div>
    </div>`).join('')}
  </div>
</div></section>`,

/* ---------- Telemetry radar (restored from Release 2.0) ---------- */
`<section class="sec radar-sec sec--band" id="radar" aria-labelledby="radar-title"><div class="wrap">
  <p class="eyebrow">Autonomous telemetry radar</p>
  <h2 class="h2" id="radar-title">One Intelligence Core. Across Your AI Infrastructure.</h2>
  <p class="lead">The CyberActive AI Core is designed to evaluate how a threat may affect connected workloads, services, and dependencies, instead of treating alerts as isolated events. Select a domain to inspect it.</p>
${part('home-radar.html').replace(/ASSET\/logo-13b\.svg/g, L('/assets/logo-13b.svg'))}
</div></section>`,

/* ---------- Chain of consequences (restored from Release 2.0) ---------- */
`<section class="sec sec--boxed" id="dependency" aria-labelledby="dep-title">
  <p class="eyebrow">Contextual intelligence</p>
  <h2 class="h2" id="dep-title" style="max-width:20ch">An Attack Is Never Just an Alert. It Is a Chain of Consequences.</h2>
${part('home-ctx.html').replace(/ASSET\/logo-13b\.svg/g, L('/assets/logo-13b.svg')).replace('href="DEMO"', 'href="' + L('/demo') + '"').replace('href="CONTACT"', 'href="' + L('/contact?demo') + '"')}
</section>`,

/* ---------- Decision intelligence (compact) ---------- */
`<section class="sec decision" id="decision" aria-labelledby="dx-title"><div class="wrap">
  <p class="eyebrow">Decision intelligence</p>
  <h2 class="h2" id="dx-title">The Intelligence Behind Every Security Decision.</h2>
  <p class="lead">Every response has consequences. CyberActive AI’s decision architecture is designed to weigh nine factors before it recommends an action, or executes one within boundaries you approve.</p>
  ${h.factorsHTML()}
  <div class="row" style="margin-top:28px">
    <a class="btn btn--primary" href="${L('/decision-intelligence')}#explorer">Compare Response Options</a>
    <a class="btn btn--ghost" href="${L('/demo')}">Run the 9-Stage Simulation</a>
  </div>
</div></section>`,

/* ---------- Governed autonomy (compact) ---------- */
`<section class="sec gov sec--band" id="governance" aria-labelledby="gov-title"><div class="wrap">
  <p class="eyebrow eyebrow--green">Governed autonomy</p>
  <h2 class="h2" id="gov-title">Autonomy Within Boundaries You Approve.</h2>
  <p class="lead">You decide how much authority the platform has, for which actions, on which infrastructure. A human can override any step.</p>
  <div class="modes" data-reveal>
    ${h.GOVERNANCE.modes.map((m, i) => `<div class="mode-card${i === 1 ? ' is-mid' : ''}"><span class="mode-card__n">0${i + 1}</span><h3>${m.t}</h3><p>${esc(m.b)}</p><dl>${m.facts.slice(0, 2).map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}</dl></div>`).join('')}
  </div>
  <div class="boundary"><span class="boundary__icon" aria-hidden="true">✓</span><span><b>Customer-approved boundaries.</b> ${esc(h.GOVERNANCE.boundary)} Disruptive actions always require human approval.</span></div>
  <a class="link-arrow" href="${L('/platform')}#governance">See all seven safeguards →</a>
</div></section>`,

/* ---------- Patents ---------- */
`<section class="sec ip-sec" id="patents" aria-labelledby="ip-title"><div class="wrap">
  <p class="eyebrow">Patented innovation</p>
  <h2 class="h2" id="ip-title">Three Approved Patents at the Core of the Decision Layer.</h2>
  <p class="lead">Recognizing threats that have not been seen before, understanding how they propagate, and choosing responses by business consequence.</p>
  ${h.patentsHTML({ link: true, disclaimer: true, map: false, noChallenge: true })}
</div></section>`,

/* ---------- Markets ---------- */
`<section class="sec sec--boxed" id="markets" aria-labelledby="mk-title">
  <p class="eyebrow">Who we protect</p>
  <h2 class="h2" id="mk-title">Built for the Infrastructure Behind AI.</h2>
  <div class="grid g5 markets mt-l" data-reveal>${MARKETS_PRIMARY.concat(MARKETS_ADJ).map(m => `<a class="card mk" href="${L(m.href)}"><span class="mk__icon" aria-hidden="true">${ICONS[m.icon]}</span><div class="card__k">${esc(m.k)}</div><h3>${esc(m.t)}</h3><p>${esc(m.b)}</p><span class="card__cta">Explore →</span></a>`).join('')}</div>
</section>`,

/* ---------- Journeys ---------- */
`<section class="sec sec--boxed" id="audiences" style="padding-top:0" aria-labelledby="aud-title">
  <h2 class="h2" id="aud-title">Explore CyberActive AI.</h2>
  <div class="journeys" data-reveal>
    ${JOURNEYS.map(j => `<a class="journey" href="${L(j.href)}" style="--c:${j.c}"><span class="journey__k">${j.k}</span><h3>${esc(j.t)}</h3><ul class="dot-list">${j.items.map(x => `<li class="dot-item">${esc(x)}</li>`).join('')}</ul><span class="journey__go">${esc(j.go)} →</span></a>`).join('')}
  </div>
</section>`,

/* ---------- Contact ---------- */
`<section class="contact" id="contact" aria-labelledby="ct-title"><div class="contact__grid" data-route-scope>
  <div>
    <h2 class="h2" id="ct-title" style="max-width:18ch">Your AI Infrastructure Is Too Valuable for Reactive Security.</h2>
    <p class="lead">Discover how CyberActive AI is designed to bring threat intelligence, infrastructure risk awareness, governed response, and recovery to AI workloads and GPU environments.</p>
    ${h.routeButtons('home-form', 'demo')}
  </div>
  ${h.formHTML({ id: 'home-form', route: 'demo' })}
</div></section>`
  ].join('\n');
}
