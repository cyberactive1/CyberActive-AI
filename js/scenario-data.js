// CyberActive AI — illustrative scenario data.
// Shared by js/scenario.js (browser) and scripts/build.mjs (static HTML).
// Everything here describes a SIMULATED environment. Figures are illustrative
// assumptions chosen to be technically plausible, not measured results.

export const SIM_LABEL = 'Illustrative Platform Simulation — Not Live Production Telemetry';

export const ENV = { name: 'Illustrative environment · gpu-prod-east', clock: '02:14 UTC' };

// Graph coordinates are percentages of the drawing area.
export const NODES = [
  { id: 'id', label: 'svc-admin-07', short: 'svc-admin-07', sub: 'privileged service identity', x: 9, y: 24, desc: 'Service account used by platform automation. Holds cluster-admin on the Kubernetes control plane and operator rights on GPU fleet management.' },
  { id: 'idp', label: 'Identity provider', short: 'IdP', sub: 'SSO · sessions', x: 9, y: 70, desc: 'Issues and revokes tokens for human and service identities. An existing control the platform can act through.' },
  { id: 'k8s', label: 'Kubernetes control plane', short: 'K8s control', sub: 'gpu-prod-east', x: 37, y: 13, desc: 'Schedules training and inference workloads across both GPU pools. Mounts storage credentials into workloads.' },
  { id: 'mgmt', label: 'GPU fleet management', short: 'GPU mgmt', sub: 'BMC · Redfish API', x: 37, y: 46, desc: 'Out-of-band management for 44 GPU hosts: firmware, power, and hardware configuration.' },
  { id: 'net', label: 'Network fabric', short: 'Fabric', sub: 'east-west · egress', x: 37, y: 85, desc: 'Connects compute and storage. The identity holds no rights on fabric configuration.' },
  { id: 'poolA', label: 'Training pool A', short: 'Pool A', sub: '32 nodes · 256 GPUs', x: 63, y: 24, desc: 'Dedicated training capacity. Currently running one large fine-tuning job.' },
  { id: 'poolB', label: 'Inference pool B', short: 'Pool B', sub: '12 nodes · 96 GPUs', x: 63, y: 58, desc: 'Serves production inference traffic behind the public API.' },
  { id: 'store', label: 'Model & checkpoint store', short: 'Model store', sub: 'object storage', x: 63, y: 88, desc: 'Holds model weights and training checkpoints, the most valuable IP in the environment.' },
  { id: 'train', label: 'Training run', short: 'Training', sub: 'llm-ft-14 · day 6', x: 90, y: 11, desc: 'Multi-week fine-tuning run on pool A. Checkpoints every 2 hours; the last one completed 1h 40m ago.' },
  { id: 'api', label: 'Inference API', short: 'Inference API', sub: 'production · tier 1', x: 90, y: 48, desc: 'Customer-facing inference service with a contractual availability objective.' }
];

export const EDGES = [
  ['idp', 'id'], ['id', 'k8s'], ['id', 'mgmt'],
  ['k8s', 'poolA'], ['k8s', 'poolB'], ['k8s', 'store'],
  ['mgmt', 'poolA'], ['mgmt', 'poolB'],
  ['poolA', 'train'], ['poolB', 'api'], ['train', 'store'], ['api', 'store'],
  ['net', 'poolA'], ['net', 'poolB'], ['net', 'store']
];

export const STATE_META = {
  threat: { c: '#FF6475', label: 'Threat origin' },
  path: { c: '#FF8C50', label: 'Reachable by threat' },
  risk: { c: '#FFB547', label: 'Exposed' },
  watch: { c: '#7FA8FF', label: 'Monitored' },
  down: { c: '#6F8399', label: 'Disrupted by response' },
  contained: { c: '#9B7BFF', label: 'Contained' },
  restored: { c: '#35D5A4', label: 'Restored · validated' }
};

export const STAGES = [
  { key: 'detect', t: 'Detection', short: 'Detect' },
  { key: 'map', t: 'Dependency mapping', short: 'Map' },
  { key: 'radius', t: 'Blast radius', short: 'Radius' },
  { key: 'impact', t: 'Impact evaluation', short: 'Impact' },
  { key: 'options', t: 'Response options', short: 'Options' },
  { key: 'govern', t: 'Governance approval', short: 'Approve' },
  { key: 'contain', t: 'Containment', short: 'Contain' },
  { key: 'recover', t: 'Recovery', short: 'Recover' },
  { key: 'validate', t: 'Validation', short: 'Validate' }
];

export const SIGNALS = [
  { src: 'IdP', at: '02:14', t: 'Token issued to svc-admin-07 from a network never seen for this identity, outside its automation schedule.' },
  { src: 'K8s', at: '02:16', t: 'ClusterRoleBinding created, granting cluster-admin to a new, unlabelled service account.' },
  { src: 'BMC', at: '02:17', t: 'Redfish inventory enumeration across all 44 GPU hosts in sequence.' },
  { src: 'Storage', at: '02:19', t: 'List operations on the checkpoint bucket with no running job context.' },
  { src: 'SIEM', at: '02:19', t: 'Existing tools raise three unrelated medium-severity alerts.' }
];

export const REACH = [
  ['Direct privileges', 'cluster-admin on gpu-prod-east; operator role on GPU fleet management (44 hosts)'],
  ['Via orchestration', 'Training and inference namespaces; storage credentials mounted into workloads'],
  ['Via management plane', 'Firmware, power, and configuration control of every GPU host'],
  ['Not reachable', 'Network fabric configuration (no rights held)']
];

export const RINGS = [
  ['1 step', 'Kubernetes control plane · GPU fleet management'],
  ['2 steps', 'Training pool A (256 GPUs) · Inference pool B (96 GPUs) · Model & checkpoint store'],
  ['3 steps', 'Training run llm-ft-14 · Production inference API'],
  ['Likeliest path', 'Identity → control plane → inference namespace → model weights']
];

export const IMPACTS = [
  { asset: 'Inference API', tier: 'Critical', c: '#FF6475', t: 'Customer-facing, tier 1 availability objective, revenue-bearing.' },
  { asset: 'Model weights', tier: 'High', c: '#FF8C50', t: 'Core intellectual property. Exfiltration cannot be reversed.' },
  { asset: 'Training run', tier: 'High', c: '#FF8C50', t: 'Day 6 of ~14. Last checkpoint 1h 40m ago; interruption loses that progress.' },
  { asset: 'GPU pools', tier: 'High', c: '#FF8C50', t: '352 GPUs of committed capacity; firmware tampering risks long outages.' },
  { asset: 'Network fabric', tier: 'Low', c: '#7FA8FF', t: 'No privileges held; monitored only.' }
];

// Availability rows shown as bars. Values are % of normal service in the simulation.
export const AVAIL_ROWS = [['train', 'Training run'], ['api', 'Inference API'], ['poolA', 'Training pool A'], ['store', 'Model store access']];

// Governance outcome per option per mode: [summary, detail]
export const OPTIONS = [
  {
    key: 'suspend', t: 'Suspend identity & revoke sessions', tag: 'Recommended', tagTone: 'green',
    sub: 'Revoke tokens, disable svc-admin-07, freeze RBAC changes, restrict BMC API to the bastion.',
    closes: 'All threat paths closed', residual: 'Low', disruption: 'None expected', business: 'No service or training impact expected',
    reversibility: 'High · re-enable after credential rotation', recovery: 'Low · rotate credentials, revert one RBAC change',
    avail: { train: 100, api: 100, poolA: 100, store: 100 }, down: [], contained: ['id', 'k8s', 'mgmt'],
    gov: {
      observe: ['Recommendation only', 'Observe mode never changes production systems. The recommendation and evidence are sent to the on-call team.'],
      approve: ['Approval required · on-call security lead', 'Identity actions on privileged accounts require one authorized approver in Approve mode.'],
      autonomous: ['Pre-authorized by customer policy', 'Out-of-hours anomalies on privileged service identities are a pre-approved action class. The platform acts, then notifies.']
    },
    contain: [['Identity provider', 'Revoke active tokens and disable svc-admin-07'], ['Kubernetes', 'Remove the ClusterRoleBinding created at 02:16; freeze RBAC changes'], ['GPU management', 'Restrict Redfish API access to the bastion allowlist'], ['Storage', 'Rotate credentials mounted into workloads']],
    recover: [['Credentials', 'Issue new service-account credentials and kubeconfig'], ['RBAC', 'Revert to the last known-good GitOps commit'], ['GPU hosts', 'Compare BMC and firmware configuration with baseline'], ['Checkpoints', 'Verify integrity hashes of the last two checkpoints']]
  },
  {
    key: 'isolate', t: 'Isolate training pool A', tag: 'Partial', tagTone: 'amber',
    sub: 'Cordon and network-isolate the 32 training nodes.',
    closes: 'One path closed; identity still active', residual: 'Medium', disruption: 'Training halted', business: 'Training interrupted; ~1h 40m of compute progress lost',
    reversibility: 'Medium · restart from last checkpoint', recovery: 'Medium · restart job, re-validate pool',
    avail: { train: 0, api: 100, poolA: 0, store: 100 }, down: ['poolA', 'train'], contained: ['poolA'],
    gov: {
      observe: ['Recommendation only', 'No change is made in Observe mode.'],
      approve: ['Approval required · platform owner and security', 'Capacity-impacting actions need two approvers in Approve mode.'],
      autonomous: ['Outside the approved boundary · escalated', 'Capacity-impacting actions are not pre-authorized, so autonomous mode escalates to a human.']
    },
    contain: [['Kubernetes', 'Cordon and drain the 32 nodes in pool A'], ['Network', 'Apply isolation policy to the pool A segment']],
    recover: [['Training', 'Restart llm-ft-14 from the last checkpoint'], ['Pool A', 'Re-validate node configuration before returning to service'], ['Open risk', 'Identity still active on the control plane; escalate']]
  },
  {
    key: 'freeze', t: 'Freeze the cluster control plane', tag: 'Disruptive', tagTone: 'orange',
    sub: 'Break-glass: block all control-plane writes cluster-wide.',
    closes: 'All orchestration paths closed', residual: 'Low', disruption: 'Scheduling frozen cluster-wide', business: 'Inference cannot autoscale at peak; training cannot recover from node faults',
    reversibility: 'Medium · requires controlled unfreeze', recovery: 'Medium · staged unfreeze and reconciliation',
    avail: { train: 80, api: 65, poolA: 100, store: 100 }, down: ['k8s'], contained: ['id', 'k8s'],
    gov: {
      observe: ['Recommendation only', 'No change is made in Observe mode.'],
      approve: ['Break-glass · two authorized operators', 'Break-glass actions always need two named approvers.'],
      autonomous: ['Never autonomous · break-glass required', 'Break-glass actions are outside every autonomous boundary.']
    },
    contain: [['Kubernetes', 'Enable admission policy blocking all writes'], ['Identity provider', 'Revoke tokens for svc-admin-07']],
    recover: [['Kubernetes', 'Staged unfreeze; reconcile cluster state against GitOps'], ['Inference', 'Confirm autoscaling and latency return to objective']]
  },
  {
    key: 'monitor', t: 'Monitor only', tag: 'High residual risk', tagTone: 'red',
    sub: 'Increase logging and watch for further activity.',
    closes: 'No paths closed', residual: 'High', disruption: 'None', business: 'Potential loss of model weights; exposure continues',
    reversibility: 'n/a', recovery: 'Unbounded · depends on attacker actions',
    avail: { train: 100, api: 100, poolA: 100, store: 100 }, down: [], contained: [],
    gov: {
      observe: ['Logged', 'Monitoring changes are recorded.'],
      approve: ['No approval needed', 'Monitoring does not change production systems.'],
      autonomous: ['No action taken', 'Monitoring does not change production systems.']
    },
    contain: [], recover: []
  }
];

export const VALIDATION = [
  'svc-admin-07 disabled; all tokens revoked',
  'No unauthorized RBAC bindings remain',
  'BMC and firmware configuration match baseline on 44 hosts',
  'Checkpoint integrity hashes verified',
  'Inference API within availability objective',
  'Decision and action audit trail complete'
];

export const MODES = [
  { key: 'observe', label: 'Observe' },
  { key: 'approve', label: 'Approve' },
  { key: 'autonomous', label: 'Autonomous' }
];

// The nine factors decision intelligence evaluates, with this scenario's values.
export const FACTORS = [
  { t: 'Threat severity', b: 'How confident and how serious the detection is.', v: 'High · privileged identity, anomalous source and sequence' },
  { t: 'Affected infrastructure', b: 'Which assets are touched or reachable.', v: '2 control planes, 44 GPU hosts, model store' },
  { t: 'Workload dependencies', b: 'Which workloads rely on those assets.', v: 'Training run llm-ft-14, production inference API' },
  { t: 'Potential propagation', b: 'Where the threat can move next, and how likely that is.', v: 'Likeliest: control plane → inference namespace → weights' },
  { t: 'Operational consequences', b: 'What a response would interrupt or degrade.', v: 'Varies by option; see comparison' },
  { t: 'Business & financial impact', b: 'Value at risk, service commitments, and recovery cost.', v: 'Tier-1 service, core IP, committed GPU capacity' },
  { t: 'Available response options', b: 'Actions the integrated controls can actually perform.', v: 'Identity, orchestration, BMC, network, storage' },
  { t: 'Governance policies', b: 'What is pre-authorized, what needs approval, and by whom.', v: 'Customer policy per action class and mode' },
  { t: 'Recovery considerations', b: 'What it takes to return to a trusted state.', v: 'Credential rotation, RBAC revert, integrity checks' }
];
