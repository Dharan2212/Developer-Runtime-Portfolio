import type { ModuleKey } from '../store/runtimeStore'

export interface RuntimeModule {
  key: ModuleKey
  title: string
  statement: string
  tier1: string[]
  tier2: string[]
  tier3: string[]
  failures: string[]
}

export const runtimeModules: RuntimeModule[] = [
  {
    key: 'identityGraph',
    title: 'Identity Graph',
    statement: 'Execution identity mapped by decisions, constraints, and outcomes.',
    tier1: ['System profile: distributed web runtime architect', 'Context windows: frontend, API, CI/CD'],
    tier2: ['Decision index with ADR references', 'Role transitions by system lifecycle stage'],
    tier3: ['Tradeoff: build speed vs operability', 'Constraint log from production incidents'],
    failures: ['Over-indexed on abstraction in v1 architecture.', 'Delayed rollback automation introduced avoidable downtime.'],
  },
  {
    key: 'systemsBuilt',
    title: 'Systems Built',
    statement: 'Credibility through shipped systems, not screenshots.',
    tier1: ['Runtime orchestration platform', 'Event-driven commerce integration'],
    tier2: ['Latency budgets, SLO history, and remediation map', 'Operational runbook extracts'],
    tier3: ['Edge-case queue starvation postmortem', 'Data consistency dispute resolution strategy'],
    failures: ['Capacity assumptions failed during partner launch week.', 'A retry policy amplified webhook load under partial outage.'],
  },
  {
    key: 'capabilityMatrix',
    title: 'Capability Matrix',
    statement: 'Capabilities expressed as dependable behavior under constraints.',
    tier1: ['Architecture decisions', 'Delivery cadence consistency', 'Mentorship signal'],
    tier2: ['Capability-to-outcome mapping', 'Constraint-based confidence levels'],
    tier3: ['Known blind spots and mitigation actions', 'Boundary conditions where handoff is required'],
    failures: ['Initial estimation model underweighted integration testing.', 'Cross-team contract drift surfaced late in release cycle.'],
  },
  {
    key: 'experimental',
    title: 'Experimental / R&D',
    statement: 'Intentional experiments with explicit risk boundaries.',
    tier1: ['Type-safe workflow DSL prototype', 'Observability-assisted refactor assistant'],
    tier2: ['Experiment hypothesis ledger', 'Kill criteria and rollback paths'],
    tier3: ['Abandoned experiments with reason codes', 'Performance regression analysis notes'],
    failures: ['Prototype complexity exceeded measurable value.', 'Experiment reached unstable maintenance overhead.'],
  },
  {
    key: 'signals',
    title: 'Signals',
    statement: 'Validation is present but quiet by default.',
    tier1: ['Invocation signal is tracked as runtime health context', 'External references are opt-in'],
    tier2: ['Peer endorsements by systems domain', 'Repository and release signal links'],
    tier3: ['Validation anomalies and confidence caveats', 'Signal decay logs over time'],
    failures: ['Early validation dashboard overexposed vanity metrics.', 'Signal weighting ignored context windows in initial model.'],
  },
]
