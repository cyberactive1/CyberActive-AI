(function () {
  var P = function (s) { return 'Page.dc.html#' + s; };
  var DEMO = { label: 'Request a Private Demo', href: P('contact') + '?demo', route: 'demo', primary: true };
  var PARTNER = { label: 'Explore Strategic Partnership', href: P('contact'), route: 'partner' };
  var IR = { label: 'Request an Investor Briefing', href: P('contact'), route: 'investor', primary: true };
  var SIM = 'Illustrative Platform Simulation — Not Live Customer Telemetry';
  var lifecycle = { type: 'steps', eyebrow: 'Platform lifecycle', title: 'Detect. Understand. Decide. Act. Restore.', body: 'CyberActive AI connects security intelligence, infrastructure context, impact-aware decision-making, and coordinated action within a continuous resilience architecture.', items: [
    { t: 'Detect', b: 'Identify suspicious activity, behavioral anomalies, and emerging threats across supported security and infrastructure signals.' },
    { t: 'Understand', b: 'Correlate events with infrastructure dependencies, affected workloads, and potential propagation paths.' },
    { t: 'Decide', b: 'Evaluate response options using risk, operational impact, decision intelligence, and governance constraints.' },
    { t: 'Act', b: 'Coordinate approved security actions through integrated infrastructure and security controls.' },
    { t: 'Restore', b: 'Support recovery workflows, validate restoration outcomes, and incorporate feedback into future decisions.' }] };
  var governance = { type: 'list', eyebrow: 'Governance', title: 'Autonomy you define. Oversight you keep.', body: 'Governance spans every layer of the architecture. Operators decide how much authority the platform has, and every decision remains traceable.', items: ['Observe mode — analysis and recommendations only', 'Approval mode — actions require human authorization', 'Authorized autonomous mode — pre-approved actions within policy', 'Human override at every stage', 'Full decision and action audit trail', 'Policy controls by asset, workload, and action type'] };
  var finalCta = { type: 'cta', title: 'Your AI Infrastructure Is Too Valuable for Reactive Security.', body: 'Discover how CyberActive AI is designed to bring intelligent threat detection, infrastructure risk awareness, governed response, and recovery to AI workloads and GPU environments.', ctas: [DEMO, { label: 'Explore Strategic Partnerships', href: P('partners') }] };
  var solution = function (o) {
    return [{ type: 'hero', eyebrow: o.eyebrow, title: o.title, body: o.body, ctas: [DEMO, { label: 'See the Interactive Demo', href: P('demo') }] }]
      .concat(o.sections).concat([{ type: 'note', text: 'Capabilities describe the platform as designed. Outcomes are intended benefits and are validated per engagement; integrations are confirmed during technical evaluation.' }, finalCta]);
  };

  window.CA_PAGES = {
    platform: { title: 'Platform', meta: 'The CyberActive AI platform: an autonomous security and resilience intelligence layer for AI workloads and GPU infrastructure.', sections: [
      { type: 'hero', eyebrow: 'Platform overview', title: 'One Intelligent Security Lifecycle. Across Interconnected Infrastructure.', body: 'CyberActive AI is an intelligence and orchestration layer designed to complement your existing security and infrastructure technologies — connecting threat detection, infrastructure context, risk-aware decisions, coordinated response, and recovery.', ctas: [DEMO, { label: 'See How It Works', href: P('technology') }] },
      { type: 'cards', cols: 4, eyebrow: 'The CyberActive AI advantage', title: 'Beyond Detection. Autonomous Intelligence That Drives Action.', items: [
        { k: '01', t: 'Adaptive Threat Intelligence', b: 'Identify suspicious behavior and emerging threats across interconnected environments.' },
        { k: '02', t: 'Infrastructure Risk Intelligence', b: 'Understand dependencies, potential propagation, and operational exposure.' },
        { k: '03', t: 'Autonomous Decision Intelligence', b: 'Evaluate response options using risk context, impact, and governance policies.' },
        { k: '04', t: 'Coordinated Response & Recovery', b: 'Orchestrate authorized containment and restoration workflows across supported systems.' }] },
      lifecycle,
      { type: 'cards', cols: 3, eyebrow: 'Platform capabilities', title: 'What the Platform Is Designed to Do.', items: [
        { k: 'Core', t: 'CyberActive AI Core', b: 'Unifies threat intelligence, infrastructure context, risk propagation, and operational impact in one model of your environment.', href: '/#radar', cta: 'See the AI Core' },
        { k: 'Decide', t: 'Decision Intelligence', b: 'Ranks response options by risk, consequence, and policy — producing explainable recommendations rather than raw alerts.', href: P('technology'), cta: 'How decisions are made' },
        { k: 'Act', t: 'Autonomous Response', b: 'Coordinates containment and mitigation through supported identity, network, orchestration, and security controls.', href: P('demo'), cta: 'Run the demo' },
        { k: 'Restore', t: 'Recovery Orchestration', b: 'Extends incident response into coordinated restoration and validation, feeding outcomes back into future decisions.', href: P('demo'), cta: 'See recovery' },
        { k: 'Arch', t: 'Architecture', b: 'Five layers — signals, context, risk, decision, response — with governance across every one.', href: P('technology'), cta: 'Explore the architecture' },
        { k: 'IP', t: 'Patented Technology', b: 'Built on approved patented technology in adaptive detection, risk propagation, and impact-aware decisions.', href: P('technology/patents'), cta: 'Patented innovation' }] },
      governance, finalCta] },

    solutions: { title: 'Solutions', meta: 'CyberActive AI solutions for AI workloads, GPU infrastructure, AI data centers, enterprise AI, and mission-critical environments.', sections: [
      { type: 'hero', eyebrow: 'Solutions', title: 'Built for the Infrastructure Behind AI.', body: 'CyberActive AI focuses on protecting the workloads, compute environments, and interconnected systems that support artificial intelligence and mission-critical operations.', ctas: [DEMO] },
      { type: 'cards', cols: 3, items: [
        { k: 'Primary', t: 'AI Workloads', b: 'Security and resilience intelligence for models, training pipelines, inference services, and the infrastructure behind them.', href: P('solutions/ai-workloads'), cta: 'Explore AI Workload Security' },
        { k: 'Primary', t: 'GPU Infrastructure', b: 'Security across GPU clusters, management planes, privileged access, and compute dependencies.', href: P('solutions/gpu-infrastructure'), cta: 'Explore GPU Security' },
        { k: 'Primary', t: 'AI Data Centers & GPU Cloud', b: 'Infrastructure-aware security for high-density compute, shared services, and multi-tenant environments.', href: P('solutions/ai-data-centers'), cta: 'Explore Data Center Security' },
        { k: 'Adjacent', t: 'Enterprise & Private AI', b: 'Security intelligence for private GPU deployments, enterprise AI workloads, and hybrid infrastructure.', href: P('solutions/enterprise-ai'), cta: 'Explore Enterprise AI' },
        { k: 'Adjacent', t: 'Mission-Critical Environments', b: 'Governed security and resilience where incidents carry significant business or operational consequence.', href: P('solutions/mission-critical'), cta: 'Explore Mission-Critical' }] },
      finalCta] },

    'solutions/ai-workloads': { title: 'AI Workload Security', meta: 'Autonomous security for AI workloads: models, checkpoints, training pipelines, inference services, and the infrastructure behind them.', sections: solution({ eyebrow: 'AI workloads', title: 'Autonomous Security for AI Workloads.', body: 'Protecting AI models, training pipelines, inference services, and the infrastructure supporting them requires more than traditional security visibility. CyberActive AI is designed to connect workload security intelligence with infrastructure context, risk-aware decisions, and coordinated response.', sections: [
      { type: 'cards', cols: 3, title: 'From Assets to Recovery.', items: [
        { k: '01', t: 'Protecting valuable AI assets', b: 'Model weights, checkpoints, training data, and inference infrastructure concentrate extraordinary value — and attract sophisticated attackers.' },
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

    'solutions/gpu-infrastructure': { title: 'GPU Infrastructure Security', meta: 'Security and resilience intelligence across GPU clusters, management planes, orchestration, networking, and supporting services.', sections: solution({ eyebrow: 'GPU infrastructure', title: 'Protect the Compute Powering Artificial Intelligence.', body: 'GPU infrastructure represents substantial investment and operational value. CyberActive AI is designed to provide security and resilience intelligence across GPU clusters, management systems, orchestration, networking, and supporting services.', sections: [
      { type: 'list', title: 'Coverage Areas.', items: ['GPU cluster security', 'Management plane exposure', 'Privileged access', 'Compute and workload dependencies', 'Multi-tenant infrastructure', 'Network and storage relationships', 'Risk propagation', 'Governed response', 'Recovery coordination'] },
      { type: 'cards', cols: 3, eyebrow: 'Intended outcomes', title: 'What Operators Gain.', items: [
        { t: 'Better infrastructure risk awareness', b: 'A connected view of exposure across clusters, management planes, and workloads.' },
        { t: 'More informed prioritization', b: 'Response ranked by what a threat can reach and what it would affect.' },
        { t: 'Less manual investigation', b: 'Correlated situations instead of fragmented alert queues.' },
        { t: 'Coordinated existing controls', b: 'Decisions routed through the security tools you already operate.' },
        { t: 'Stronger resilience planning', b: 'Recovery considered from the first detection, not after the incident.' }] }] }) },

    'solutions/ai-data-centers': { title: 'AI Data Centers & GPU Cloud', meta: 'Autonomous security for AI data centers and GPU cloud: multi-tenant compute, shared dependencies, management planes, and coordinated response.', sections: solution({ eyebrow: 'AI data centers & GPU cloud', title: 'Autonomous Security for AI Data Centers and GPU Cloud.', body: 'Modern AI data centers connect high-density compute, networking, storage, orchestration, identity, and infrastructure management into complex operational environments. CyberActive AI is designed to provide an intelligence layer that helps operators understand security risks across these dependencies and coordinate appropriate responses.', sections: [
      { type: 'list', title: 'Key Topics.', items: ['Multi-tenant compute environments', 'Shared infrastructure dependencies', 'GPU management planes', 'Identity and privileged access', 'Cloud orchestration', 'Network segmentation', 'Storage dependencies', 'Operational availability', 'Coordinated security response', 'Recovery planning'] },
      { type: 'cards', cols: 3, eyebrow: 'Business value', title: 'Protect the Investment. Protect the Service.', items: [
        { t: 'Protect infrastructure investments', b: 'Security intelligence matched to the value concentrated in GPU capacity.' },
        { t: 'Strengthen operational risk awareness', b: 'Understand how one tenant, host, or credential affects the rest of the environment.' },
        { t: 'Support continuity of compute services', b: 'Containment decisions that weigh availability for the customers you serve.' }] }] }) },

    'solutions/enterprise-ai': { title: 'Enterprise & Private AI', meta: 'Security intelligence for private GPU deployments, enterprise AI workloads, and hybrid AI infrastructure.', sections: solution({ eyebrow: 'Enterprise & private AI', title: 'Secure the AI You Build and Run Yourself.', body: 'Enterprises are deploying private GPU capacity and AI workloads alongside existing systems. CyberActive AI is designed to bring infrastructure-aware security and resilience intelligence to these hybrid environments — complementing the security investments you already have.', sections: [
      { type: 'cards', cols: 3, items: [
        { t: 'Private GPU deployments', b: 'Context across on-premises GPU clusters, their management systems, and the workloads they run.' },
        { t: 'Hybrid AI infrastructure', b: 'Dependency awareness spanning data center, cloud, and SaaS services used by AI pipelines.' },
        { t: 'Enterprise identity and data', b: 'Relate AI workload activity to enterprise identities, data stores, and privileged access.' },
        { t: 'Existing security investments', b: 'Designed to work with SIEM, XDR, SOAR, and cloud security tools rather than replace them.' },
        { t: 'Governed autonomy', b: 'Observe, approval, and authorized autonomous modes aligned to enterprise change control.' },
        { t: 'Executive risk visibility', b: 'Operational and business impact framed for CISOs, CTOs, and risk owners.' }] }] }) },

    'solutions/mission-critical': { title: 'Mission-Critical Environments', meta: 'Impact-aware autonomous security for environments where disruption carries significant business or operational consequence.', sections: solution({ eyebrow: 'Mission-critical environments', title: 'Autonomous Security for Environments Where Disruption Matters Most.', body: 'Mission-critical environments require security decisions that consider operational consequences, service dependencies, and the potential impact of disruption. CyberActive AI\u2019s architecture is designed to bring infrastructure context and impact-aware decision intelligence into security and resilience workflows.', sections: [
      { type: 'list', title: 'Sectors.', items: ['Financial services', 'Healthcare', 'Telecommunications', 'Government and defense', 'Essential services', 'Large enterprise infrastructure'] },
      { type: 'cards', cols: 3, title: 'Why Impact-Aware Security.', items: [
        { t: 'Risk propagation', b: 'Understand how an incident could move across connected services.' },
        { t: 'Operational impact', b: 'Weigh containment against continuity of essential services.' },
        { t: 'Governance', b: 'Policy-defined authority for every class of action.' },
        { t: 'Human oversight', b: 'Approval workflows and override at every stage.' },
        { t: 'Decision traceability', b: 'Every recommendation and action recorded with its rationale.' },
        { t: 'Recovery coordination', b: 'Restoration and validation planned as part of response.' }] }] }) },

    technology: { title: 'Technology', meta: 'The CyberActive AI architecture: infrastructure signals, context and dependencies, risk and impact intelligence, decision intelligence, response and recovery.', sections: [
      { type: 'hero', eyebrow: 'Technology', title: 'One Intelligent Security Lifecycle. Across Interconnected Infrastructure.', body: 'Five architectural layers turn security and infrastructure signals into governed, coordinated action — with governance spanning every layer.', ctas: [{ label: 'Run the Interactive Demo', href: P('demo'), primary: true }, { label: 'Patented Innovation', href: P('technology/patents') }] },
      { type: 'layers', title: 'The Architecture.', items: [
        { t: 'Infrastructure Signals', b: 'Security and operational signals from supported systems.', ex: 'GPU infrastructure · AI workloads · Identity · Networking · Storage · Cloud · Orchestration · Existing security tools' },
        { t: 'Context & Dependencies', b: 'Asset relationships, infrastructure dependencies, behavior, and operational context.', ex: 'Asset graph · Service relationships · Behavioral baselines' },
        { t: 'Risk & Impact Intelligence', b: 'Threat correlation, potential propagation, operational exposure, and business-impact evaluation.', ex: 'Correlation · Propagation paths · Exposure · Impact' },
        { t: 'Decision Intelligence', b: 'Risk-aware decision-making, policy constraints, response planning, and approval logic.', ex: 'Option ranking · Policy checks · Explainable rationale' },
        { t: 'Response & Recovery', b: 'Coordinated containment, mitigation, recovery workflows, and restoration validation.', ex: 'Containment · Mitigation · Restoration · Validation' }] },
      governance,
      { type: 'compare', eyebrow: 'Competitive positioning', title: 'More Than Alerts. More Than Automation.', body: 'Security platforms provide essential visibility, detection, and response. CyberActive AI is designed to add a broader intelligence layer — complementary to existing enterprise security investments.', rows: [
        { c: 'SIEM', f: 'Log aggregation, search, and detection rules', a: 'Adds infrastructure dependency and impact context to correlated events' },
        { c: 'XDR', f: 'Endpoint, network, and cloud detection and response', a: 'Relates detections to AI workloads, GPU clusters, and operational consequence' },
        { c: 'SOAR', f: 'Playbook-driven response automation', a: 'Selects and governs actions by risk and impact rather than fixed playbooks' },
        { c: 'Cloud security', f: 'Posture, configuration, and workload protection in cloud', a: 'Extends context across hybrid GPU and on-premises infrastructure' },
        { c: 'AI workload security', f: 'Model, data, and AI application protection', a: 'Connects AI assets to the compute, identity, and network they depend on' },
        { c: 'Infrastructure monitoring', f: 'Health, performance, and availability', a: 'Joins operational state with security signals for impact-aware decisions' }] },
      { type: 'status', eyebrow: 'Capability status', title: 'Precise About What Exists Today.', items: [
        { t: 'Patented technology foundation', s: 'Verified IP' },
        { t: 'Core platform architecture', s: 'Available' },
        { t: 'AI model training and validation', s: 'In Validation' },
        { t: 'Decision intelligence and governance modes', s: 'In Validation' },
        { t: 'GPU infrastructure integrations', s: 'Planned' },
        { t: 'Autonomous recovery orchestration', s: 'Planned' },
        { t: 'Interactive demonstrations on this site', s: 'Illustrative' }] },
      finalCta] },

    'technology/patents': { title: 'Patented Innovation', meta: 'CyberActive AI intellectual property: adaptive zero-day detection, risk propagation intelligence, and impact-aware decision intelligence.', sections: [
      { type: 'hero', eyebrow: 'Proprietary technology', title: 'Patented Innovation at the Core of Autonomous Security.', body: 'CyberActive AI\u2019s intellectual property portfolio focuses on adaptive detection, risk propagation, and impact-aware security decision-making. These technologies form a foundation for the company\u2019s autonomous security and resilience architecture.', ctas: [DEMO, IR] },
      { type: 'patents', items: [
        { k: 'Approved patent', t: 'Adaptive Zero-Day Threat Detection', ch: 'Previously unseen threats evade signature- and rule-based detection.', ap: 'Adaptive identification of evolving and novel threat behavior.', role: 'Detect' },
        { k: 'Approved patent', t: 'Risk Propagation Intelligence', ch: 'Isolated alerts hide how a threat can cascade through connected infrastructure.', ap: 'Modeling interconnected risk, dependencies, and potential cascading consequences.', role: 'Understand' },
        { k: 'Approved patent', t: 'Business Impact Decision Intelligence', ch: 'Security actions are chosen without weighing business and operational consequence.', ap: 'Incorporating business and operational impact into security decision-making.', role: 'Decide' },
        { k: 'Additional IP', t: 'Autonomous Recovery', ch: 'Response ends at containment; restoration remains manual and fragmented.', ap: 'Coordinated restoration and resilience workflows.', role: 'Restore' }] },
      { type: 'note', text: 'Patent titles above describe innovation areas. Official titles, numbers, jurisdictions, and statuses are provided to qualified parties on request. Patents do not by themselves establish product performance.' },
      finalCta] },

    demo: { title: 'Interactive Demonstration', meta: 'An illustrative simulation of how CyberActive AI is designed to detect, understand, decide, act, and restore.', sections: [
      { type: 'hero', eyebrow: 'Interactive demonstration', title: 'See How Autonomous Security Intelligence Works.', body: 'A simulated compromised privileged identity attempts unauthorized access to an AI workload management environment. Step through the lifecycle, inspect the infrastructure, and change the governance mode.', ctas: [] },
      { type: 'demo', label: SIM },
      finalCta] },

    customers: { title: 'For Customers', meta: 'Autonomous security for the infrastructure powering AI — value, evaluation process, and how to request a technical demonstration.', sections: [
      { type: 'hero', eyebrow: 'For customers', title: 'Autonomous Security for the Infrastructure Powering AI.', body: 'CyberActive AI is designed for organizations operating high-value AI workloads, GPU infrastructure, and interconnected digital environments. Its patented security and resilience architecture brings together threat intelligence, infrastructure risk analysis, decision intelligence, and coordinated response.', ctas: [{ label: 'Request a Technical Demonstration', href: P('contact'), route: 'demo', primary: true }, { label: 'Discuss a Pilot', href: P('contact'), route: 'demo' }] },
      { type: 'cards', cols: 3, title: 'Customer Value.', items: [
        { k: '01', t: 'Protect high-value AI assets', b: 'Strengthen security intelligence around valuable workloads, compute environments, and supporting systems.' },
        { k: '02', t: 'Understand infrastructure risk', b: 'Analyze how threats may affect connected services and operational dependencies.' },
        { k: '03', t: 'Accelerate security decisions', b: 'Support timely, context-aware response decisions through governed AI intelligence.' },
        { k: '04', t: 'Coordinate response', b: 'Connect security decisions with supported infrastructure and security controls.' },
        { k: '05', t: 'Strengthen recovery readiness', b: 'Extend incident response toward coordinated restoration and validation.' }] },
      { type: 'steps', eyebrow: 'Technical evaluation', title: 'A Structured Path to Evaluation.', body: 'Our proposed engagement process for organizations evaluating the platform.', items: [
        { t: 'Discovery', b: 'Initial discovery and infrastructure discussion.' },
        { t: 'Requirements', b: 'Architecture and security requirements review.' },
        { t: 'Demonstration', b: 'Platform demonstration tailored to your environment.' },
        { t: 'Readiness', b: 'Integration and readiness assessment.' },
        { t: 'Pilot scope', b: 'Pilot scope and success criteria.' },
        { t: 'Commercial', b: 'Commercial evaluation.' }] },
      { type: 'form', route: 'demo' }] },

    partners: { title: 'Strategic Partnerships', meta: 'Partner with CyberActive AI: AI infrastructure operators, GPU cloud, OEM and embedded technology, MSSPs, integrators, and technology partners.', sections: [
      { type: 'hero', eyebrow: 'Strategic partnerships', title: 'Building the Next Generation of Secure AI Infrastructure. Together.', body: 'CyberActive AI welcomes strategic engagement with AI infrastructure providers, GPU cloud operators, data center companies, technology vendors, and integration partners seeking to advance autonomous security and resilience.', ctas: [{ label: 'Explore Strategic Partnership', href: P('contact'), route: 'partner', primary: true }, { label: 'Discuss Integration Opportunities', href: P('contact'), route: 'partner' }] },
      { type: 'cards', cols: 3, title: 'Partnership Opportunities.', items: [
        { t: 'AI Infrastructure Operators', b: 'Explore platform evaluations and deployment opportunities across AI compute environments.' },
        { t: 'GPU Cloud & AI-as-a-Service', b: 'Explore security and resilience intelligence for shared and multi-tenant GPU infrastructure.' },
        { t: 'OEM & Embedded Technology', b: 'Evaluate API integration, licensing, and embedded intelligence opportunities.' },
        { t: 'MSSPs & Integrators', b: 'Explore managed service delivery, enterprise integration, and channel commercialization.' },
        { t: 'Strategic Technology Partners', b: 'Collaborate on technical validation, integration development, and joint solution opportunities.' }] },
      { type: 'list', eyebrow: 'Potential models', title: 'Flexible Ways to Work Together.', body: 'Potential partnership models. These describe opportunities we are open to discussing, not existing agreements.', items: ['Technology licensing', 'Platform integration', 'OEM and white-label arrangements', 'Joint solution development', 'Channel distribution', 'Strategic commercial collaboration'] },
      { type: 'form', route: 'partner', lead: 'Tell us about your infrastructure, technology, or proposed collaboration.' }] },

    investors: { title: 'Investors', meta: 'CyberActive AI investor overview: building the autonomous security layer for the AI infrastructure economy.', sections: [
      { type: 'hero', eyebrow: 'Investors', title: 'Building the Autonomous Security Layer for the AI Infrastructure Economy.', body: 'As AI infrastructure expands, the complexity and consequences of security incidents increase. CyberActive AI is developing patented autonomous security and resilience technology designed to protect AI workloads, GPU compute environments, and interconnected infrastructure.', ctas: [IR, { label: 'Contact Investor Relations', href: 'mailto:ir@cyberactive.ai' }] },
      { type: 'cards', cols: 3, eyebrow: 'Investment thesis', title: 'Six Reasons the Opportunity Matters.', items: [
        { k: '01', t: 'A structural market opportunity', b: 'The expansion of AI training, inference, GPU cloud services, and private AI creates increasing demand for security and resilience capabilities.' },
        { k: '02', t: 'Differentiated intellectual property', b: 'Approved patents underpin the approach to adaptive threat detection, risk propagation, and impact-aware decision intelligence.' },
        { k: '03', t: 'Developed technology foundation', b: 'A platform architecture supporting further AI training, validation, integration, and commercial expansion.' },
        { k: '04', t: 'Infrastructure-centric positioning', b: 'Focused on the high-value compute environments supporting the growth of artificial intelligence.' },
        { k: '05', t: 'Multiple commercialization paths', b: 'Enterprise subscriptions, infrastructure licensing, OEM partnerships, managed services, and strategic integrations.' },
        { k: '06', t: 'Platform expansion potential', b: 'The architecture can potentially extend to additional mission-critical environments beyond AI/GPU infrastructure.' }] },
      { type: 'list', eyebrow: 'Commercial model', title: 'Proposed Commercial Strategy.', body: 'These are proposed and developing business models, not commercially validated results.', items: ['Enterprise platform licensing', 'Annual or multi-year subscriptions', 'Infrastructure-based licensing', 'GPU cloud operator licensing', 'OEM and embedded licensing', 'MSSP and channel distribution', 'Professional services and integrations'] },
      { type: 'status', eyebrow: 'Development roadmap', title: 'Where We Are.', items: [
        { t: 'Patent portfolio development', s: 'Verified IP' },
        { t: 'Core platform architecture', s: 'Available' },
        { t: 'AI model training and validation', s: 'In Validation' },
        { t: 'GPU infrastructure integrations', s: 'Planned' },
        { t: 'Technical pilot programs', s: 'Planned' },
        { t: 'Enterprise readiness (SOC 2, ISO roadmap)', s: 'Planned' },
        { t: 'Commercial deployments and strategic partnerships', s: 'Planned' }] },
      { type: 'cards', cols: 3, eyebrow: 'Defensibility', title: 'Potential Competitive Advantages.', items: [
        { t: 'Proprietary intellectual property', b: 'Approved patents across detection, propagation, and impact-aware decisions.' },
        { t: 'Infrastructure dependency intelligence', b: 'A model of how AI infrastructure is connected — and how risk moves through it.' },
        { t: 'Impact-aware decision-making', b: 'Response chosen by consequence, not by rule alone.' },
        { t: 'Coordinated resilience architecture', b: 'Detection through recovery in one lifecycle.' },
        { t: 'Integration extensibility', b: 'Designed to complement and coordinate existing tools.' },
        { t: 'Scalable licensing and distribution', b: 'Direct, OEM, MSSP, and operator channels.' }] },
      { type: 'form', route: 'investor', lead: 'Detailed financials, capitalization, patent documentation, and diligence materials are available to qualified investors through a private process.' },
      { type: 'note', text: 'This page contains forward-looking statements about strategy, technology development, and plans, which involve risks and uncertainties. It is not an offer to sell or a solicitation of an offer to buy any security.' }] },

    about: { title: 'About', meta: 'CyberActive AI is developing patented autonomous security and resilience technology for AI workloads, GPU infrastructure, and mission-critical environments.', sections: [
      { type: 'hero', eyebrow: 'Company', title: 'Advancing Autonomous Security for the AI Infrastructure Era.', body: 'CyberActive AI is developing patented autonomous security and resilience technology for AI workloads, GPU infrastructure, data centers, and mission-critical environments. Our technology strategy brings together adaptive threat detection, infrastructure risk intelligence, impact-aware decision-making, coordinated response, and recovery.', ctas: [DEMO, { label: 'Contact Us', href: P('contact') }] },
      { type: 'cards', cols: 2, items: [
        { k: 'Mission', t: 'To advance autonomous security and resilience for the infrastructure powering artificial intelligence.', b: '' },
        { k: 'Vision', t: 'AI infrastructure that can identify threats, understand their consequences, coordinate intelligent responses, and recover with greater speed, precision, and operational awareness.', b: '' }] },
      { type: 'cards', cols: 3, title: 'What We Are — and Are Not.', items: [
        { k: 'We are', t: 'An intelligence and orchestration layer', b: 'Connecting detection, infrastructure context, decisions, response, and recovery — complementing existing tools.' },
        { k: 'We are not', t: 'A GPU, hosting, or data center company', b: 'We do not manufacture GPUs, host compute, or operate data centers.' },
        { k: 'We are not', t: 'A traditional SIEM, SOAR, or endpoint vendor', b: 'We add context and governed decisions on top of those investments.' }] },
      finalCta] },

    contact: { title: 'Contact', meta: 'Contact CyberActive AI: request a private demo, explore strategic partnership, or request an investor briefing.', sections: [
      { type: 'hero', eyebrow: 'Contact', title: 'Engage With CyberActive AI.', body: 'Choose the conversation that fits. Each request goes directly to the right team.', ctas: [] },
      { type: 'form', route: 'select' },
      { type: 'list', title: 'Direct Contacts.', items: ['Sales & demos — sales@cyberactive.ai', 'Partnerships — partners@cyberactive.ai', 'Investor relations — ir@cyberactive.ai', 'Legal & privacy — legal@cyberactive.ai'] }] }
  };
})();
