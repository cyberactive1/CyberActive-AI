// CyberActive AI — page content. Edit copy here, then run `node scripts/build.mjs`.
// Every page is a list of sections; scripts/build.mjs renders each section type.
// Claims guidance: describe capabilities "as designed"; keep statuses accurate;
// never name third-party AI vendors or imply partnerships that do not exist.

const DEMO = { label: 'Request a Private Demo', route: 'demo', primary: true };
const PARTNER = { label: 'Explore Strategic Partnership', route: 'partner' };
const IR = { label: 'Request an Investor Briefing', route: 'investor', primary: true };
const SIMLINK = { label: 'Run the Interactive Simulation', href: '/demo' };

export const finalCta = { type: 'cta', title: 'Your AI Infrastructure Is Too Valuable for Reactive Security.', body: 'See how CyberActive AI is designed to carry a threat from detection through infrastructure context, impact-aware decisions, governed response, and verified recovery, across AI workloads and GPU environments.', ctas: [DEMO, { label: 'Explore Strategic Partnerships', href: '/partners' }] };

const solutionNote = { type: 'note', text: 'Capabilities describe the platform as designed. Outcomes are intended benefits and are validated per engagement; integrations are confirmed during technical evaluation.' };
const solution = o => [{ type: 'hero', eyebrow: o.eyebrow, title: o.title, body: o.body, ctas: [DEMO, { label: 'Run the Interactive Simulation', href: '/demo' }] }, ...o.sections, solutionNote, finalCta];

/* ---------- Shared blocks ---------- */
export const LIFECYCLE = [
  { t: 'Detect', b: 'Identify suspicious activity and emerging threats across connected systems.', detail: 'Signals from compute, identity, network, storage, and existing security tools are evaluated continuously for behavior that departs from established operating patterns.', points: ['Ingests signals from existing security and infrastructure tools', 'Behavior-oriented analysis, not signatures alone', 'Designed to surface previously unseen activity'] },
  { t: 'Understand', b: 'Correlate signals with infrastructure relationships and dependencies.', detail: 'Events are placed in context: which assets, identities, and services are connected, and what those relationships mean for the environment.', points: ['Maintains a model of asset and service relationships', 'Links identity, workload, and network context', 'Turns isolated alerts into connected situations'] },
  { t: 'Decide', b: 'Evaluate propagation, operational impact, and response options.', detail: 'The platform weighs how a threat could spread and what it would affect, then ranks candidate actions by risk, disruption, and policy.', points: ['Assesses potential propagation paths', 'Considers operational and business criticality', 'Produces explainable, policy-checked recommendations'] },
  { t: 'Act', b: 'Coordinate governed containment through integrated controls.', detail: 'Authorized actions are coordinated across integrated controls, including identity, network, and orchestration, within the permissions and safeguards operators define.', points: ['Observe, Approve, or Autonomous operating modes', 'Enforcement through existing, customer-owned controls', 'Every action recorded and attributable'] },
  { t: 'Restore', b: 'Coordinate and verify recovery to a trusted state.', detail: 'Recovery is coordinated and validated, and the outcome of each event informs how future situations are evaluated.', points: ['Coordinated restoration of affected services', 'Integrity and state validation before return to service', 'Outcomes feed continuous improvement'] }
];

export const GOVERNANCE = {
  eyebrow: 'Governed autonomy', title: 'Autonomy Within Boundaries You Approve.',
  lead: 'Operators decide how much authority the platform has, for which actions, on which infrastructure. Autonomous action is limited to action classes the customer has explicitly approved, and a human can override any step.',
  steps: ['Detect and correlate signals', 'Evaluate risk and propagation', 'Select candidate actions', 'Authorize action', 'Execute, record, and verify'],
  modes: [
    { key: 'observe', t: 'Observe', b: 'Analyze, correlate, and recommend. The platform makes no changes to production systems.', facts: [['Authority', 'None. Recommendations only'], ['Human role', 'Operators decide and act'], ['Typical use', 'Evaluation, onboarding, highly sensitive systems']], who: ['Platform', 'Platform', 'Platform', 'Operator', 'Operator'] },
    { key: 'approve', t: 'Approve', b: 'Prepare response actions for authorized human review. Nothing runs until a named approver accepts it.', facts: [['Authority', 'Executes only after approval'], ['Human role', 'Approve, modify, or reject each action'], ['Typical use', 'Production and change-controlled infrastructure']], who: ['Platform', 'Platform', 'Platform', 'Approver', 'Platform'] },
    { key: 'autonomous', t: 'Autonomous', b: 'Execute pre-authorized action classes within customer-approved boundaries, then notify. Anything outside those boundaries escalates to a human.', facts: [['Authority', 'Only action classes the customer pre-approves'], ['Human role', 'Sets boundaries, is notified, can override'], ['Typical use', 'Time-critical, well-understood, reversible actions']], who: ['Platform', 'Platform', 'Platform', 'Policy', 'Platform'] }
  ],
  safeguards: [
    { t: 'Defined authorization boundaries', b: 'Customers set which action classes, assets, and environments the platform may act on, and in which mode.' },
    { t: 'Policy enforcement', b: 'Every proposed action is checked against policy before it is offered or executed.' },
    { t: 'Human approval requirements', b: 'Approval rules define who approves which actions, including two-person rules for disruptive ones.' },
    { t: 'Action traceability', b: 'Each recommendation and action is recorded with its evidence, rationale, approver, and outcome.' },
    { t: 'Operational safeguards', b: 'Blast-radius limits, protected assets, and rate limits keep responses proportionate.' },
    { t: 'Human override', b: 'Authorized operators can pause, reverse, or override any action at any stage.' },
    { t: 'Recovery verification', b: 'Restoration is checked against a known-good state before systems return to service.' }
  ],
  boundary: 'The platform never receives unrestricted access to customer infrastructure. It acts only through integrations and permissions the customer grants, within boundaries the customer approves.'
};

export const ARCH = {
  eyebrow: 'Model-agnostic architecture', title: 'Built for an Evolving AI Security Ecosystem.',
  lead: ['CyberActive AI’s architecture is designed to combine infrastructure intelligence, proprietary decision technology, and security signals from multiple sources.', 'As frontier AI models continue to evolve, the platform strategy supports the potential integration of advanced AI capabilities without making the infrastructure decision layer dependent on a single model provider.'],
  sources: [
    { t: 'Existing security tools', b: 'SIEM, XDR and EDR, cloud security, and vulnerability management.' },
    { t: 'Infrastructure telemetry', b: 'GPU hosts and BMC, orchestration, identity, network, storage, and cloud.' },
    { t: 'AI security intelligence sources', b: 'Findings from advanced AI security models and research feeds, as they become available.', status: 'Planned · provider-independent' }
  ],
  core: [
    { t: 'Infrastructure context', b: 'Asset, identity, and workload dependency model.' },
    { t: 'Risk & impact intelligence', b: 'Propagation paths, operational and business consequence.' },
    { t: 'Governed decision-making', b: 'Option ranking, policy checks, approvals, explainable rationale.' }
  ],
  outputs: [
    { t: 'Infrastructure response controls', b: 'Identity, orchestration, network, BMC, and storage actions through customer-approved integrations.' },
    { t: 'Recovery workflows', b: 'Coordinated restoration, integrity validation, and outcome learning.' }
  ],
  note: 'No third-party foundation-model integrations are claimed today. Any external AI capability would be added as an intelligence source only where implemented, validated, and authorized.'
};

export const PATENTS = {
  items: [
    { t: 'Adaptive Zero-Day Detection', role: 'Detect', ch: 'Previously unseen threats evade signature- and rule-based detection.', ap: 'Adaptive identification of evolving and novel threat behavior.', ar: 'Gives the AI Core behavior-based detections that do not depend on known signatures.' },
    { t: 'Risk Propagation Intelligence', role: 'Understand', ch: 'Isolated alerts hide how a threat can cascade through connected infrastructure.', ap: 'Modeling interconnected risk, dependencies, and potential cascading consequences.', ar: 'Turns a detection into a blast radius: which control planes, GPU pools, and workloads a threat can reach, and how likely each path is.' },
    { t: 'Business Impact Decision Intelligence', role: 'Decide', ch: 'Security actions are chosen without weighing business and operational consequence.', ap: 'Incorporating business and operational impact into security decision-making.', ar: 'Ranks response options by consequence, so containment protects the asset without unnecessarily taking down the service.' }
  ],
  // Autonomous Recovery IP is hidden for now (show: false). Set show: true to display it
  // on the homepage and /technology/patents once its status is confirmed.
  extra: { show: false, t: 'Autonomous Recovery', role: 'Restore', b: 'Additional intellectual property related to coordinated restoration and resilience workflows.' },
  disclaimer: 'Innovation-area names describe the technology. Official patent titles, numbers, jurisdictions, and statuses are provided to qualified parties on request. Patents protect methods; they do not by themselves establish product performance, market adoption, or competitive superiority.'
};

/* ---------- Pages ---------- */
export const PAGES = {
  platform: { title: 'Platform', desc: 'The CyberActive AI platform: an autonomous security and resilience intelligence layer for AI workloads and GPU infrastructure, from detection to verified recovery.', sections: [
    { type: 'hero', eyebrow: 'Platform overview', title: 'One Intelligent Security Lifecycle. Across Interconnected Infrastructure.', body: 'CyberActive AI is an intelligence and orchestration layer designed to complement your existing security and infrastructure technologies, connecting threat detection, infrastructure context, impact-aware decisions, governed response, and recovery.', ctas: [DEMO, { label: 'See the Architecture', href: '/technology' }] },
    { type: 'cards', cols: 4, eyebrow: 'The market challenge', title: 'AI Infrastructure Is Scaling. Security Complexity Is Accelerating.', lead: 'AI workloads depend on interconnected GPU compute, networking, storage, identity, orchestration, and cloud services. As that infrastructure grows, a single incident can reach far beyond the system where it started.', items: [
      { k: '01', t: 'High-value AI assets', b: 'GPU infrastructure, models, training data, and inference services concentrate technology value and intellectual property.' },
      { k: '02', t: 'Interconnected infrastructure', b: 'A compromise of one component can create cascading risk across compute, networking, identity, storage, and workloads.' },
      { k: '03', t: 'Faster discovery, less time to respond', b: 'Automation, including AI-assisted tooling, can shorten the gap between discovering a weakness and exploiting it, which leaves less time for investigation and decisions.' },
      { k: '04', t: 'Operational consequences', b: 'Every containment action affects something. Security decisions must weigh workload availability and service commitments.' }] },
    { type: 'cards', cols: 4, eyebrow: 'The CyberActive AI advantage', title: 'Beyond Detection. Intelligence That Drives Governed Action.', items: [
      { k: '01', t: 'Adaptive Threat Intelligence', b: 'Identify suspicious behavior and emerging threats across interconnected environments.' },
      { k: '02', t: 'Infrastructure Risk Intelligence', b: 'Understand dependencies, potential propagation, and operational exposure.' },
      { k: '03', t: 'Impact-Aware Decision Intelligence', b: 'Evaluate response options using risk context, business impact, and governance policies.' },
      { k: '04', t: 'Governed Response & Recovery', b: 'Coordinate authorized containment and verified restoration across supported systems.' }] },
    { type: 'steps', eyebrow: 'Platform lifecycle', title: 'Detect. Understand. Decide. Act. Restore.', body: 'CyberActive AI connects security intelligence, infrastructure context, impact-aware decision-making, and coordinated action within a continuous resilience architecture.', items: LIFECYCLE.map(x => ({ t: x.t, b: x.b })) },
    { type: 'cards', cols: 3, eyebrow: 'Platform capabilities', title: 'What the Platform Is Designed to Do.', items: [
      { k: 'Core', t: 'CyberActive AI Core', b: 'Unifies threat intelligence, infrastructure context, risk propagation, and operational impact in one model of your environment.', href: '/technology', cta: 'Explore the architecture' },
      { k: 'Decide', t: 'Decision Intelligence', b: 'Ranks response options by risk, consequence, and policy, producing explainable recommendations rather than raw alerts.', href: '/decision-intelligence', cta: 'How decisions are made' },
      { k: 'Act', t: 'Governed Response', b: 'Coordinates containment through supported identity, network, orchestration, and security controls within approved boundaries.', href: '/demo', cta: 'Run the simulation' },
      { k: 'Restore', t: 'Recovery Orchestration', b: 'Extends incident response into coordinated restoration and validation, feeding outcomes back into future decisions.', href: '/demo', cta: 'See recovery' },
      { k: 'Arch', t: 'Model-Agnostic by Design', b: 'Combines signals from existing tools, infrastructure telemetry, and AI security intelligence without depending on one model provider.', href: '/technology#architecture', cta: 'See how it fits' },
      { k: 'IP', t: 'Patented Technology', b: 'Built on approved patents in adaptive detection, risk propagation, and impact-aware decisions.', href: '/technology/patents', cta: 'Patented innovation' }] },
    { type: 'governance' },
    finalCta] },

  'decision-intelligence': { title: 'Decision Intelligence', desc: 'How CyberActive AI is designed to evaluate threat severity, infrastructure dependencies, propagation, operational and business impact, response options, governance, and recovery before acting.', sections: [
    { type: 'hero', eyebrow: 'Decision intelligence', title: 'The Intelligence Behind Every Security Decision.', body: 'Finding a threat is only the beginning. CyberActive AI’s decision architecture is designed to evaluate what a threat affects, how it could spread, what each response would cost, and what policy allows, before any action is taken.', ctas: [DEMO, SIMLINK] },
    { type: 'factors', eyebrow: 'Nine factors', title: 'What Every Decision Weighs.', lead: 'Advanced AI can identify and analyze a threat. Deciding how to respond in a live AI environment also depends on infrastructure, consequence, and authority.' },
    { type: 'decision', eyebrow: 'Interactive decision scenario', title: 'Same Threat. Four Responses. Different Consequences.', lead: 'A compromised privileged identity reaches the GPU orchestration control plane. Compare how each response would affect infrastructure availability, and how the governance mode changes who must authorize it.' },
    { type: 'steps', eyebrow: 'How a decision is formed', title: 'From Signal to Explainable Recommendation.', body: 'Each recommendation follows the same path, and each step leaves a record.', items: [
      { t: 'Correlate', b: 'Detections from many sources are joined into one situation using identity, asset, and timing context.' },
      { t: 'Map', b: 'The dependency model resolves what the threat can reach and through which privileges.' },
      { t: 'Evaluate', b: 'Propagation, operational disruption, and business impact are weighed for each candidate action.' },
      { t: 'Check policy', b: 'Options are filtered by governance policy and the customer’s authorization boundaries.' },
      { t: 'Explain', b: 'Each recommendation carries its evidence, rationale, expected impact, and required approvals.' }] },
    { type: 'list', eyebrow: 'Design principles', title: 'Decisions You Can Inspect.', body: 'Decision intelligence is designed to support operators, not to replace their judgment.', items: ['Recommendations are explainable, not opaque scores', 'Policy constraints apply before options are shown', 'Disruptive actions always require human approval', 'Business context comes from the operator', 'Every decision is recorded with its outcome', 'Outcomes inform future evaluations'] },
    { type: 'note', text: 'The decision scenario on this page is an illustrative simulation in a hypothetical environment. It does not represent measured production results.' },
    finalCta] },

  solutions: { title: 'Solutions', desc: 'CyberActive AI solutions for AI workloads, GPU infrastructure, AI data centers and GPU cloud, enterprise and private AI, and mission-critical environments.', sections: [
    { type: 'hero', eyebrow: 'Solutions', title: 'Built for the Infrastructure Behind AI.', body: 'CyberActive AI focuses on protecting AI workloads, GPU compute environments, and the interconnected systems that support them, with the same architecture applied wherever disruption carries serious consequence.', ctas: [DEMO] },
    { type: 'cards', cols: 3, items: [
      { k: 'Primary', t: 'AI Workloads', b: 'Security and resilience intelligence for models, training pipelines, inference services, and the infrastructure behind them.', href: '/solutions/ai-workloads', cta: 'Explore AI Workload Security' },
      { k: 'Primary', t: 'GPU Infrastructure', b: 'Security across GPU clusters, management planes, privileged access, and compute dependencies.', href: '/solutions/gpu-infrastructure', cta: 'Explore GPU Security' },
      { k: 'Primary', t: 'AI Data Centers & GPU Cloud', b: 'Infrastructure-aware security for high-density compute, shared services, and multi-tenant environments.', href: '/solutions/ai-data-centers', cta: 'Explore Data Center Security' },
      { k: 'Primary', t: 'Enterprise & Private AI', b: 'Security intelligence for private GPU deployments, enterprise AI workloads, and hybrid infrastructure.', href: '/solutions/enterprise-ai', cta: 'Explore Enterprise AI' },
      { k: 'Adjacent', t: 'Mission-Critical Environments', b: 'Governed security and resilience where incidents carry significant business or operational consequence.', href: '/solutions/mission-critical', cta: 'Explore Mission-Critical' }] },
    finalCta] },

  'solutions/ai-workloads': { title: 'AI Workload Security', desc: 'Autonomous security for AI workloads: models, checkpoints, training pipelines, inference services, and the infrastructure behind them.', sections: solution({ eyebrow: 'AI workloads', title: 'Autonomous Security for AI Workloads.', body: 'Protecting AI models, training pipelines, inference services, and the infrastructure supporting them requires more than traditional security visibility. CyberActive AI is designed to connect workload security intelligence with infrastructure context, impact-aware decisions, and governed response.', sections: [
    { type: 'cards', cols: 3, title: 'From Assets to Recovery.', items: [
      { k: '01', t: 'Protecting valuable AI assets', b: 'Model weights, checkpoints, training data, and inference infrastructure concentrate significant value and attract capable attackers.' },
      { k: '02', t: 'Understanding workload dependencies', b: 'Models, datasets, compute, networking, orchestration, and identity interact. Security context must follow those relationships.' },
      { k: '03', t: 'Detecting emerging threats', b: 'Adaptive, behavior-oriented detection designed to surface activity that departs from established workload patterns.' },
      { k: '04', t: 'Limiting propagation', b: 'Dependency-aware risk evaluation identifies what a threat can reach next and informs targeted containment.' },
      { k: '05', t: 'Coordinating recovery', b: 'Governed recovery workflows designed to restore workloads to a validated, secure state.' }] },
    { type: 'scenarios', eyebrow: 'Illustrative threat scenarios', title: 'How the Architecture Is Designed to Respond.', items: [
      { t: 'Model asset exfiltration', b: 'Unusual access to model storage by a service identity.', r: 'Correlate identity, storage, and network context; recommend credential suspension and egress restriction.' },
      { t: 'Training data tampering', b: 'Unexpected writes to a curated training dataset.', r: 'Map affected pipelines and checkpoints; recommend pausing dependent training jobs pending validation.' },
      { t: 'Privileged credential compromise', b: 'An administrator credential used from an anomalous context.', r: 'Evaluate blast radius across clusters and workloads; recommend step-up verification or session revocation.' },
      { t: 'GPU resource hijacking', b: 'Unauthorized jobs consuming GPU capacity.', r: 'Identify the scheduling path and owning identity; recommend job termination and access review.' },
      { t: 'Inference endpoint abuse', b: 'Abnormal request patterns against a production inference API.', r: 'Assess service impact; recommend rate limits or token revocation without taking the service offline.' },
      { t: 'Orchestration compromise', b: 'Suspicious changes in the Kubernetes control plane.', r: 'Trace affected namespaces and workloads; recommend isolating the change path and restoring known-good configuration.' }] }] }) },

  'solutions/gpu-infrastructure': { title: 'GPU Infrastructure Security', desc: 'Security and resilience intelligence across GPU clusters, management planes, orchestration, networking, and supporting services.', sections: solution({ eyebrow: 'GPU infrastructure', title: 'Protect the Compute Powering Artificial Intelligence.', body: 'GPU infrastructure represents substantial investment and operational value. CyberActive AI is designed to provide security and resilience intelligence across GPU clusters, management systems, orchestration, networking, and supporting services.', sections: [
    { type: 'list', title: 'Coverage Areas.', items: ['GPU cluster security', 'Management plane exposure', 'Privileged access', 'Compute and workload dependencies', 'Multi-tenant infrastructure', 'Network and storage relationships', 'Risk propagation', 'Governed response', 'Recovery coordination'] },
    { type: 'cards', cols: 3, eyebrow: 'Intended outcomes', title: 'What Operators Gain.', items: [
      { t: 'Better infrastructure risk awareness', b: 'A connected view of exposure across clusters, management planes, and workloads.' },
      { t: 'More informed prioritization', b: 'Response ranked by what a threat can reach and what it would affect.' },
      { t: 'Less manual investigation', b: 'Correlated situations instead of fragmented alert queues.' },
      { t: 'Coordinated existing controls', b: 'Decisions routed through the security tools you already operate.' },
      { t: 'Stronger resilience planning', b: 'Recovery considered from the first detection, not after the incident.' }] }] }) },

  'solutions/ai-data-centers': { title: 'AI Data Centers & GPU Cloud', desc: 'Autonomous security for AI data centers and GPU cloud: multi-tenant compute, shared dependencies, management planes, and coordinated response.', sections: solution({ eyebrow: 'AI data centers & GPU cloud', title: 'Autonomous Security for AI Data Centers and GPU Cloud.', body: 'Modern AI data centers connect high-density compute, networking, storage, orchestration, identity, and infrastructure management into complex operational environments. CyberActive AI is designed to provide an intelligence layer that helps operators understand security risk across these dependencies and coordinate appropriate responses.', sections: [
    { type: 'list', title: 'Key Topics.', items: ['Multi-tenant compute environments', 'Shared infrastructure dependencies', 'GPU management planes', 'Identity and privileged access', 'Cloud orchestration', 'Network segmentation', 'Storage dependencies', 'Operational availability', 'Coordinated security response', 'Recovery planning'] },
    { type: 'cards', cols: 3, eyebrow: 'Business value', title: 'Protect the Investment. Protect the Service.', items: [
      { t: 'Protect infrastructure investments', b: 'Security intelligence matched to the value concentrated in GPU capacity.' },
      { t: 'Strengthen operational risk awareness', b: 'Understand how one tenant, host, or credential affects the rest of the environment.' },
      { t: 'Support continuity of compute services', b: 'Containment decisions that weigh availability for the customers you serve.' }] }] }) },

  'solutions/enterprise-ai': { title: 'Enterprise & Private AI', desc: 'Security intelligence for private GPU deployments, enterprise AI workloads, and hybrid AI infrastructure.', sections: solution({ eyebrow: 'Enterprise & private AI', title: 'Secure the AI You Build and Run Yourself.', body: 'Enterprises are deploying private GPU capacity and AI workloads alongside existing systems. CyberActive AI is designed to bring infrastructure-aware security and resilience intelligence to these hybrid environments, complementing the security investments you already have.', sections: [
    { type: 'cards', cols: 3, items: [
      { t: 'Private GPU deployments', b: 'Context across on-premises GPU clusters, their management systems, and the workloads they run.' },
      { t: 'Hybrid AI infrastructure', b: 'Dependency awareness spanning data center, cloud, and SaaS services used by AI pipelines.' },
      { t: 'Enterprise identity and data', b: 'Relate AI workload activity to enterprise identities, data stores, and privileged access.' },
      { t: 'Existing security investments', b: 'Designed to work with SIEM, XDR, SOAR, and cloud security tools rather than replace them.' },
      { t: 'Governed autonomy', b: 'Observe, Approve, and Autonomous modes aligned to enterprise change control.' },
      { t: 'Executive risk visibility', b: 'Operational and business impact framed for CISOs, CTOs, and risk owners.' }] }] }) },

  'solutions/mission-critical': { title: 'Mission-Critical Environments', desc: 'Impact-aware autonomous security for environments where disruption carries significant business or operational consequence.', sections: solution({ eyebrow: 'Mission-critical environments', title: 'Autonomous Security for Environments Where Disruption Matters Most.', body: 'Mission-critical environments require security decisions that consider operational consequences, service dependencies, and the potential impact of disruption. CyberActive AI’s architecture is designed to bring infrastructure context and impact-aware decision intelligence into security and resilience workflows.', sections: [
    { type: 'list', title: 'Sectors.', items: ['Financial services', 'Healthcare', 'Telecommunications', 'Government and defense', 'Essential services', 'Large enterprise infrastructure'] },
    { type: 'cards', cols: 3, title: 'Why Impact-Aware Security.', items: [
      { t: 'Risk propagation', b: 'Understand how an incident could move across connected services.' },
      { t: 'Operational impact', b: 'Weigh containment against continuity of essential services.' },
      { t: 'Governance', b: 'Policy-defined authority for every class of action.' },
      { t: 'Human oversight', b: 'Approval workflows and override at every stage.' },
      { t: 'Decision traceability', b: 'Every recommendation and action recorded with its rationale.' },
      { t: 'Recovery coordination', b: 'Restoration and validation planned as part of response.' }] }] }) },

  technology: { title: 'Technology', desc: 'The CyberActive AI architecture: model-agnostic signal intake, infrastructure context, risk and impact intelligence, governed decisions, response, and recovery.', sections: [
    { type: 'hero', eyebrow: 'Technology', title: 'An Infrastructure Decision Layer for AI Security.', body: 'Five architectural layers turn security and infrastructure signals into governed, coordinated action, with governance spanning every layer and no dependency on a single AI model provider.', ctas: [{ label: 'Run the Interactive Simulation', href: '/demo', primary: true }, { label: 'Patented Innovation', href: '/technology/patents' }] },
    { type: 'layers', title: 'The Architecture.', items: [
      { t: 'Infrastructure Signals', b: 'Security and operational signals from supported systems and intelligence sources.', ex: 'GPU infrastructure · AI workloads · Identity · Networking · Storage · Cloud · Orchestration · Existing security tools' },
      { t: 'Context & Dependencies', b: 'Asset relationships, infrastructure dependencies, behavior, and operational context.', ex: 'Asset graph · Service relationships · Behavioral baselines' },
      { t: 'Risk & Impact Intelligence', b: 'Threat correlation, potential propagation, operational exposure, and business-impact evaluation.', ex: 'Correlation · Propagation paths · Exposure · Impact' },
      { t: 'Decision Intelligence', b: 'Impact-aware decision-making, policy constraints, response planning, and approval logic.', ex: 'Option ranking · Policy checks · Explainable rationale' },
      { t: 'Response & Recovery', b: 'Coordinated containment, mitigation, recovery workflows, and restoration validation.', ex: 'Containment · Mitigation · Restoration · Validation' }] },
    { type: 'arch', id: 'architecture' },
    { type: 'governance' },
    { type: 'compare', eyebrow: 'Positioning', title: 'More Than Alerts. More Than Automation.', body: 'Security platforms and advanced AI models provide essential visibility, analysis, and response. CyberActive AI is designed to add an infrastructure-aware decision layer that complements them.', rows: [
      { c: 'SIEM', f: 'Log aggregation, search, and detection rules', a: 'Adds infrastructure dependency and impact context to correlated events' },
      { c: 'XDR', f: 'Endpoint, network, and cloud detection and response', a: 'Relates detections to AI workloads, GPU clusters, and operational consequence' },
      { c: 'SOAR', f: 'Playbook-driven response automation', a: 'Selects and governs actions by risk and impact rather than fixed playbooks' },
      { c: 'Frontier AI security models', f: 'Vulnerability discovery, threat analysis, and security reasoning', a: 'A potential intelligence source; CyberActive AI adds infrastructure context, impact-aware decisions, governed response, and recovery' },
      { c: 'Cloud security', f: 'Posture, configuration, and workload protection in cloud', a: 'Extends context across hybrid GPU and on-premises infrastructure' },
      { c: 'AI workload security', f: 'Model, data, and AI application protection', a: 'Connects AI assets to the compute, identity, and network they depend on' },
      { c: 'Infrastructure monitoring', f: 'Health, performance, and availability', a: 'Joins operational state with security signals for impact-aware decisions' }] },
    { type: 'status', eyebrow: 'Capability status', title: 'Precise About What Exists Today.', items: [
      { t: 'Patented technology foundation', s: 'Verified IP' },
      { t: 'Core platform architecture', s: 'Available' },
      { t: 'AI model training and validation', s: 'In Validation' },
      { t: 'Decision intelligence and governance modes', s: 'In Validation' },
      { t: 'GPU infrastructure integrations', s: 'Planned' },
      { t: 'External AI intelligence-source integrations', s: 'Planned' },
      { t: 'Autonomous recovery orchestration', s: 'Planned' },
      { t: 'Interactive demonstrations on this site', s: 'Illustrative' }] },
    finalCta] },

  'technology/patents': { title: 'Patented Innovation', desc: 'CyberActive AI intellectual property: Adaptive Zero-Day Detection, Risk Propagation Intelligence, and Business Impact Decision Intelligence.', sections: [
    { type: 'hero', eyebrow: 'Proprietary technology', title: 'Patented Innovation at the Core of the Decision Layer.', body: 'Three approved patents address the hardest parts of autonomous security in AI infrastructure: recognizing threats that have not been seen before, understanding how they propagate, and choosing responses by consequence. Together they underpin the platform’s decision and resilience architecture.', ctas: [DEMO, IR] },
    { type: 'patents' },
    { type: 'note', text: PATENTS.disclaimer },
    finalCta] },

  demo: { title: 'Interactive Simulation', desc: 'An illustrative nine-stage simulation: a privileged identity compromise threatens GPU orchestration and AI workloads. Compare responses and governance modes.', sections: [
    { type: 'hero', eyebrow: 'Interactive simulation', title: 'Follow One Threat from Detection to Verified Recovery.', body: 'A privileged identity compromise creates a potential attack path from the GPU orchestration control plane into AI workloads. Step through nine stages, compare response options, and change the governance mode to see how authority changes.', ctas: [] },
    { type: 'scenario' },
    { type: 'cards', cols: 3, eyebrow: 'Reading the simulation', title: 'What It Shows, and What It Does Not.', items: [
      { k: 'Shows', t: 'How the architecture is designed to reason', b: 'Correlation, dependency mapping, blast radius, impact, option comparison, governance, containment, recovery, and validation.' },
      { k: 'Shows', t: 'How governance changes authority', b: 'The same recommendation is handled differently in Observe, Approve, and Autonomous modes.' },
      { k: 'Does not show', t: 'Measured production results', b: 'The environment, timings, and figures are illustrative assumptions, not customer telemetry or benchmarks.' }] },
    finalCta] },

  customers: { title: 'For Customers', desc: 'Autonomous security for AI infrastructure: protection of high-value AI assets, infrastructure risk awareness, decision intelligence, resilience, and a structured evaluation path.', sections: [
    { type: 'hero', eyebrow: 'For customers', title: 'Protect the AI Infrastructure Your Business Depends On.', body: 'CyberActive AI is designed for organizations operating high-value AI workloads and GPU infrastructure. Its patented architecture brings together threat intelligence, infrastructure risk analysis, decision intelligence, governed response, and recovery.', ctas: [{ label: 'Request a Technical Demonstration', route: 'demo', primary: true }, { label: 'Discuss a Pilot', route: 'demo' }] },
    { type: 'cards', cols: 3, title: 'What You Can Expect.', items: [
      { k: '01', t: 'Protection of high-value AI infrastructure', b: 'Security intelligence focused on models, GPU clusters, management planes, and the services that depend on them.' },
      { k: '02', t: 'Infrastructure risk awareness', b: 'See how a threat could move through identity, orchestration, compute, and storage, before it does.' },
      { k: '03', t: 'Decision intelligence', b: 'Explainable recommendations that weigh disruption and business impact, not just severity.', href: '/decision-intelligence', cta: 'How decisions are made' },
      { k: '04', t: 'Operational resilience', b: 'Containment that protects availability, and recovery verified against a known-good state.' },
      { k: '05', t: 'Technical evaluation and pilots', b: 'A structured path from discovery to a scoped pilot with agreed success criteria.' },
      { k: '06', t: 'Governance you control', b: 'Start in Observe mode; widen authority only where your policies allow.', href: '/platform#governance', cta: 'Governed autonomy' }] },
    { type: 'steps', eyebrow: 'Technical evaluation', title: 'A Structured Path to Evaluation.', body: 'Our proposed engagement process for organizations evaluating the platform.', items: [
      { t: 'Discovery', b: 'Initial discovery and infrastructure discussion.' },
      { t: 'Requirements', b: 'Architecture and security requirements review.' },
      { t: 'Demonstration', b: 'Platform demonstration tailored to your environment.' },
      { t: 'Readiness', b: 'Integration and readiness assessment.' },
      { t: 'Pilot scope', b: 'Pilot scope and success criteria.' },
      { t: 'Commercial', b: 'Commercial evaluation.' }] },
    { type: 'form', route: 'demo' }] },

  partners: { title: 'Strategic Partnerships', desc: 'Partner with CyberActive AI: integration architecture, OEM and licensing, GPU cloud and AI data center opportunities, joint technical validation, and channel commercialization.', sections: [
    { type: 'hero', eyebrow: 'Strategic partnerships', title: 'Building the Next Generation of Secure AI Infrastructure. Together.', body: 'CyberActive AI welcomes engagement with AI infrastructure providers, GPU cloud operators, data center companies, technology vendors, and integration partners seeking to advance autonomous security and resilience.', ctas: [{ label: 'Explore Strategic Partnership', route: 'partner', primary: true }, { label: 'Discuss Integration', route: 'partner' }] },
    { type: 'cards', cols: 3, title: 'Partnership Opportunities.', items: [
      { k: 'Integrate', t: 'Integration architecture', b: 'Connect your telemetry, security tooling, or AI security intelligence as inputs, or your controls as governed response paths.', href: '#architecture', cta: 'See integration points' },
      { k: 'License', t: 'OEM and licensing', b: 'Evaluate API integration, embedded decision intelligence, and licensing of the patented technology.' },
      { k: 'Operate', t: 'GPU cloud and AI data centers', b: 'Explore security and resilience intelligence for shared, multi-tenant GPU infrastructure.' },
      { k: 'Validate', t: 'Joint technical validation', b: 'Design and run evaluations together against agreed scenarios and success criteria.' },
      { k: 'Distribute', t: 'Channel commercialization', b: 'Explore managed service delivery, integration services, and potential channel models.' }] },
    { type: 'arch', id: 'architecture', eyebrow: 'Integration architecture', title: 'Where Partners Connect.' },
    { type: 'list', eyebrow: 'Potential models', title: 'Flexible Ways to Work Together.', body: 'Potential partnership models. These describe opportunities we are open to discussing, not existing agreements.', items: ['Technology licensing', 'Platform integration', 'OEM and white-label arrangements', 'Joint solution development', 'Channel distribution', 'Strategic commercial collaboration'] },
    { type: 'form', route: 'partner', lead: 'Tell us about your infrastructure, technology, or proposed collaboration.' }] },

  investors: { title: 'Investors', desc: 'CyberActive AI investor overview: AI infrastructure growth, patented IP, differentiated infrastructure intelligence, scalable licensing, model-agnostic architecture, and milestones.', sections: [
    { type: 'hero', eyebrow: 'Investors', title: 'Building the Autonomous Security Layer for the AI Infrastructure Economy.', body: 'As AI infrastructure expands, the complexity and consequence of security incidents increase. CyberActive AI is developing patented autonomous security and resilience technology for AI workloads, GPU compute, and the infrastructure that connects them.', ctas: [IR, { label: 'Patented Innovation', href: '/technology/patents' }] },
    { type: 'cards', cols: 3, eyebrow: 'Investment thesis', title: 'Why the Opportunity Matters.', items: [
      { k: '01', t: 'Growth of AI infrastructure', b: 'Expansion of AI training, inference, GPU cloud, and private AI increases the value, and the exposure, of the infrastructure behind it.' },
      { k: '02', t: 'Patented intellectual property', b: 'Three approved patents cover adaptive detection, risk propagation, and impact-aware decision intelligence.' },
      { k: '03', t: 'Differentiated infrastructure intelligence', b: 'As AI makes threat discovery more widely available, value shifts toward understanding consequence and deciding how to respond.' },
      { k: '04', t: 'Potentially scalable licensing', b: 'Proposed models include platform subscriptions, infrastructure-based licensing, OEM, and channel distribution.' },
      { k: '05', t: 'Model-agnostic architecture', b: 'The decision layer is designed to benefit from advancing AI models without depending on a single provider.' },
      { k: '06', t: 'Clear development milestones', b: 'A staged path from architecture and IP through validation, pilots, and commercialization.' }] },
    { type: 'milestones', eyebrow: 'Development & commercialization', title: 'Milestones and Current Status.', items: [
      { s: 'Verified IP', t: 'Intellectual property', points: ['Three approved patents', 'Patent documentation available under NDA'] },
      { s: 'Available', t: 'Platform foundation', points: ['Core platform architecture', 'Infrastructure dependency modeling'] },
      { s: 'In Validation', t: 'Intelligence & governance', points: ['AI model training and validation', 'Decision intelligence and governance modes'] },
      { s: 'Planned', t: 'Commercialization', points: ['GPU infrastructure integrations', 'Technical pilot programs', 'Enterprise readiness (SOC 2, ISO roadmap)', 'Commercial deployments and partnerships'] }] },
    { type: 'list', eyebrow: 'Commercial model', title: 'Proposed Commercial Strategy.', body: 'These are proposed and developing business models, not commercially validated results.', items: ['Enterprise platform licensing', 'Annual or multi-year subscriptions', 'Infrastructure-based licensing', 'GPU cloud operator licensing', 'OEM and embedded licensing', 'MSSP and channel distribution', 'Professional services and integrations'] },
    { type: 'cards', cols: 3, eyebrow: 'Defensibility', title: 'Potential Competitive Advantages.', items: [
      { t: 'Proprietary intellectual property', b: 'Approved patents across detection, propagation, and impact-aware decisions.' },
      { t: 'Infrastructure dependency intelligence', b: 'A model of how AI infrastructure is connected, and how risk moves through it.' },
      { t: 'Impact-aware decision-making', b: 'Response chosen by consequence, not by rule alone.' },
      { t: 'Governed resilience architecture', b: 'Detection through verified recovery in one governed lifecycle.' },
      { t: 'Complementary positioning', b: 'Designed to work with existing tools and advancing AI models rather than compete with them.' },
      { t: 'Scalable distribution', b: 'Direct, OEM, MSSP, and operator channels under consideration.' }] },
    { type: 'form', route: 'investor', lead: 'Detailed financials, capitalization, patent documentation, and diligence materials are available to qualified investors through a private process.' },
    { type: 'note', text: 'This page contains forward-looking statements about strategy, technology development, and plans, which involve risks and uncertainties. It is not an offer to sell or a solicitation of an offer to buy any security.' }] },

  about: { title: 'About', desc: 'CyberActive AI is developing patented autonomous security and resilience technology for AI workloads, GPU infrastructure, and mission-critical environments.', sections: [
    { type: 'hero', eyebrow: 'Company', title: 'Advancing Autonomous Security for the AI Infrastructure Era.', body: 'CyberActive AI is developing patented autonomous security and resilience technology for AI workloads, GPU infrastructure, data centers, and mission-critical environments. Our technology strategy brings together adaptive threat detection, infrastructure risk intelligence, impact-aware decision-making, governed response, and recovery.', ctas: [DEMO, { label: 'Contact Us', href: '/contact' }] },
    { type: 'cards', cols: 2, items: [
      { k: 'Mission', t: 'To advance autonomous security and resilience for the infrastructure powering artificial intelligence.', b: '' },
      { k: 'Vision', t: 'AI infrastructure that can identify threats, understand their consequences, coordinate intelligent responses, and recover with greater speed, precision, and operational awareness.', b: '' }] },
    { type: 'cards', cols: 3, title: 'What We Are, and Are Not.', items: [
      { k: 'We are', t: 'An intelligence and orchestration layer', b: 'Connecting detection, infrastructure context, decisions, response, and recovery, and complementing existing tools.' },
      { k: 'We are not', t: 'A foundation-model provider', b: 'We do not build general-purpose AI models. Our architecture is designed to work with intelligence from many sources.' },
      { k: 'We are not', t: 'A GPU, hosting, or SIEM vendor', b: 'We do not manufacture GPUs, host compute, or replace SIEM, SOAR, or endpoint tools.' }] },
    finalCta] },

  trust: { title: 'Trust & Security', desc: 'How CyberActive AI approaches platform security, customer control, governed autonomy, data handling, compliance readiness, and responsible disclosure.', sections: [
    { type: 'hero', eyebrow: 'Trust & security', title: 'Security and Governance by Design.', body: 'A platform that can act on infrastructure has to earn trust before it earns authority. CyberActive AI is designed so customers control what it can see, what it can do, and how every decision is recorded.', ctas: [{ label: 'Discuss Security Requirements', route: 'demo', primary: true }, { label: 'Governed Autonomy', href: '/platform#governance' }] },
    { type: 'cards', cols: 3, eyebrow: 'Design principles', title: 'Control Stays With the Customer.', items: [
      { k: '01', t: 'Customer-defined authority', b: 'Customers choose the mode for each action class and environment. Nothing executes outside the boundaries they approve.' },
      { k: '02', t: 'Least-privilege integrations', b: 'The platform acts only through the integrations and scoped permissions a customer grants, never through unrestricted access.' },
      { k: '03', t: 'Complete traceability', b: 'Every recommendation and action is recorded with its evidence, rationale, approver, and outcome for audit and review.' },
      { k: '04', t: 'Human override', b: 'Authorized operators can pause, reverse, or override any action at any stage, in every mode.' },
      { k: '05', t: 'Safe evaluation', b: 'Observe mode lets teams evaluate recommendations against real conditions without changing production systems.' },
      { k: '06', t: 'Data minimization', b: 'The architecture is designed to use the signals and context needed for decisions, with retention defined per engagement.' }] },
    { type: 'status', eyebrow: 'Readiness', title: 'Compliance and Assurance Status.', items: [
      { t: 'Patented technology foundation', s: 'Verified IP' },
      { t: 'Governance modes and decision audit trail', s: 'In Validation' },
      { t: 'SOC 2 Type II', s: 'Planned' },
      { t: 'ISO/IEC 27001', s: 'Planned' },
      { t: 'Public-sector authorization roadmap', s: 'Planned' }] },
    { type: 'list', id: 'disclosure', eyebrow: 'Responsible disclosure', title: 'Report a Security Issue.', body: 'If you believe you have found a vulnerability in this website or in CyberActive AI technology, please tell us privately so we can investigate and fix it before it is disclosed.', items: ['Email security@cyberactive.ai with details and reproduction steps', 'Give us reasonable time to respond before public disclosure', 'Do not access, change, or delete data that is not yours', 'Do not degrade service or run denial-of-service tests', 'We will acknowledge reports and keep you informed', 'Machine-readable policy at /.well-known/security.txt'] },
    { type: 'note', text: 'Statuses reflect current plans and are updated as milestones are reached. Customer security and compliance requirements are reviewed during technical evaluation.' },
    finalCta] },

  faq: { title: 'FAQ', desc: 'Answers to common questions about CyberActive AI: what it does, how it complements existing tools and AI security models, governed autonomy, availability, patents, and evaluation.', sections: [
    { type: 'hero', eyebrow: 'Frequently asked questions', title: 'Questions About CyberActive AI.', body: 'Straight answers on what the platform is designed to do, what exists today, and how to evaluate it.', ctas: [DEMO, { label: 'Contact Us', href: '/contact' }] },
    { type: 'faq', items: [
      ['What does CyberActive AI do?', 'CyberActive AI is designed as the autonomous security and resilience layer for AI workloads and GPU infrastructure. It connects threat detection with infrastructure dependency intelligence, impact-aware decision-making, governed response, and verified recovery.'],
      ['Does it replace our SIEM, XDR, or SOAR?', 'No. It is designed to complement them. Existing tools provide detection, visibility, and automation; CyberActive AI adds infrastructure context, propagation and impact analysis, and governed decisions on top of their signals.'],
      ['How does it relate to frontier AI security models?', 'Advanced AI models are making threat discovery and analysis faster. CyberActive AI is not a foundation-model provider and does not compete with them. Its architecture is designed to take intelligence from many sources, including such models where integrated and authorized, and carry each finding through infrastructure context, impact analysis, governed response, and recovery.'],
      ['Can the platform take action on its own?', 'Only within boundaries the customer approves. In Observe mode it recommends only. In Approve mode a named person authorizes each action. In Autonomous mode it executes only action classes the customer has pre-approved, and a human can override any step. Disruptive actions always require human approval.'],
      ['Which environments is it built for?', 'AI workloads, GPU infrastructure, AI data centers and GPU cloud, and enterprise and private AI. The same architecture also applies to mission-critical environments where disruption carries serious consequence.'],
      ['What is available today?', 'The core platform architecture and infrastructure dependency modeling are developed, and the patented technology foundation is in place. AI model training, decision intelligence, and governance modes are in validation; GPU infrastructure integrations and autonomous recovery orchestration are on the roadmap. See the capability status on the Technology page.'],
      ['What do the patents cover?', 'Three approved patents cover Adaptive Zero-Day Detection, Risk Propagation Intelligence, and Business Impact Decision Intelligence. Official details are available to qualified parties on request.'],
      ['Are the visuals on this site real customer data?', 'No. Every interactive visual, including the telemetry radar and the nine-stage simulation, is an illustrative simulation in a hypothetical environment, not live production telemetry or measured results.'],
      ['How do we evaluate the platform?', 'Through a structured process: discovery, requirements review, a demonstration tailored to your environment, readiness assessment, and a scoped pilot with agreed success criteria. Request a private demo to start.'],
      ['How can partners work with CyberActive AI?', 'We are open to discussing integration, OEM and licensing, GPU cloud and data center collaborations, joint technical validation, and channel models. These are opportunities, not existing agreements.']] },
    finalCta] },

  contact: { title: 'Contact', desc: 'Contact CyberActive AI: request a private demo, explore strategic partnership, or request an investor briefing.', sections: [
    { type: 'hero', eyebrow: 'Contact', title: 'Engage With CyberActive AI.', body: 'Choose the conversation that fits. Each request goes directly to the right team.', ctas: [] },
    { type: 'form', route: 'select' },
    { type: 'contacts', title: 'Direct Contacts.', items: [['Sales & demos', 'sales@cyberactive.ai'], ['Partnerships', 'partners@cyberactive.ai'], ['Investor relations', 'ir@cyberactive.ai'], ['Legal & privacy', 'legal@cyberactive.ai']] }] }
};

// Navigation order and footer columns.
export const NAV = [['Platform', '/platform'], ['Solutions', '/solutions'], ['Decision Intelligence', '/decision-intelligence'], ['Technology', '/technology'], ['Demo', '/demo'], ['Partners', '/partners'], ['Investors', '/investors']];
export const FOOTER = [
  ['Platform', [['Overview', '/platform'], ['Decision Intelligence', '/decision-intelligence'], ['Technology', '/technology'], ['Patented Innovation', '/technology/patents'], ['Interactive Simulation', '/demo']]],
  ['Solutions', [['AI Workloads', '/solutions/ai-workloads'], ['GPU Infrastructure', '/solutions/gpu-infrastructure'], ['AI Data Centers & GPU Cloud', '/solutions/ai-data-centers'], ['Enterprise & Private AI', '/solutions/enterprise-ai'], ['Mission-Critical', '/solutions/mission-critical']]],
  ['Company', [['About', '/about'], ['Customers', '/customers'], ['Partners', '/partners'], ['Investors', '/investors'], ['Contact', '/contact'], ['Trust & Security', '/trust'], ['FAQ', '/faq'], ['Privacy Policy', '/legal#privacy'], ['Terms of Use', '/legal#terms']]]
];
