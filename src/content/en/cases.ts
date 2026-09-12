import { Case } from '../../types/content';

/** English mirror of ko/cases.ts. "Nine stories that start with a problem" (A-G data platform, H-I backend). No numbers in titles. myPart/teamPart are drafts where marked TODO. */
export const cases: Case[] = [
  {
    id: 'A',
    competency: 'Reusable data products',
    title: 'Turning user segments from one-off extracts into a feature',
    problem:
      'Every targeting request meant another one-off extract by the data team. The same question came back from other teams with different definitions.',
    approach:
      'I fixed RFM-based segmentation into data models (l2/l4) and connected it to async queries and a screen so practitioners could change conditions themselves. Rollout and feedback were part of the deliverable, not an afterthought.',
    change:
      'Teams other than the one we first shared it with started using it on their own. It became a tool that belongs to no single stakeholder, and the conversion gaps between segments became the basis for targeting priorities.',
    stack: ['Redshift', 'Athena', 'Airflow', 'Kotlin', 'React'],
    evidence: 'Spread across several divisions (H2 2025)',
    period: '2025.07 – 2025.12',
    chapter: 'data',
    myPart: 'Designed the RFM data models (l2/l4), implemented the async query flow, built the screen PoC',
    // TODO(kyo): confirm the team's part
    teamPart: 'Production UI and rollout with the team'
  },
  {
    id: 'B',
    competency: 'Define the real problem → redesign the structure',
    title: 'Redefining a lookup tool as a decision platform',
    problem:
      'A dashboard buried under feature requests. Building exactly what was asked added screens, but decisions did not get faster.',
    approach:
      'I paused request-taking and used stakeholder interviews to map the structure of recurring decisions first. Then I rearranged the main, KPI, event, and title analysis screens around that structure and redesigned permissions, caching, and operations features.',
    change:
      'The lookup tool became a platform where people "see the data and decide". Active users widened from one team to content, planning, advertising, and IP organizations.',
    stack: ['Architecture renewal', 'Permissions & caching', 'ETag'],
    evidence: 'Active users up two to three times (H1 2026)',
    period: '2026.01 – 2026.06',
    chapter: 'data',
    myPart: 'Redefined the platform, ran the interviews, implemented API hardening (permissions, caching, ETag)',
    // TODO(kyo): confirm the split
    teamPart: 'Screen rearrangement and new menus split with the team'
  },
  {
    id: 'C',
    competency: 'Design to operations · maintainable pipelines',
    title: 'DAGs that run the same way after the owner changes',
    problem:
      'Some DAGs broke when their owner changed. Re-runs produced duplicates, and schema changes silently drifted.',
    approach:
      'I documented idempotency (UPSERT and partition-based re-runs), layer tagging (l1–l4), schema change history, and daily data quality DAGs with alerts as team rules, and enforced them through a shared package.',
    change:
      'Operating scope held through staffing changes and vacations. New DAGs that follow the rules take less review.',
    stack: ['Python', 'Airflow', 'Redshift Serverless', 'Athena', 'PostgreSQL migration'],
    evidence: 'Run on written rules and a shared package',
    period: '2024.07 – present',
    chapter: 'data',
    myPart: 'Wrote the DAG rules and the shared package, the daily quality DAGs',
    teamPart: 'Migrating and writing individual DAGs was the whole team'
  },
  {
    id: 'D',
    competency: 'What AI changed · analysis reports as a decision tool',
    title: 'AI analysis reports became a decision tool for practitioners',
    problem:
      'The metrics were on screen, but interpretation was left to people. Reading one title or one publisher against company KPIs had to pass through an analyst every time.',
    approach:
      'I built a harness that connects titles, publishers, and company KPIs to the context in the data map (metric definitions, lineage, interpretation rules), and let AI generate analysis reports on top of it, served as the AI Insights menu of the internal visualization platform. The questions decision makers ask repeatedly were defined as analysis topics, validated, and then carried into operational features such as alerts and guards. Guardrails were built in: inferences labeled as estimates, example values synthetic only.',
    change:
      'The business unit, overseas and domestic content, IP strategy, and platform planning organizations responded, and a business-unit practitioner asked for access to the AI Insights menu to use in operations. The analyses are moving from reports into operational features, in consultation with the consuming teams.',
    stack: ['Claude Code', 'Gemini API', 'BigQuery', 'duckdb', 'Athena'],
    evidence: 'Access requests from several organizations (2026)',
    period: '2026.01 – present',
    chapter: 'data',
    myPart: 'Data contextualization (data map) and the AI harness, design and implementation; defining and validating the analysis topics',
    // TODO(kyo): confirm the team's part (menu UI, access operations)
    teamPart: 'AI Insights menu UI and access operations'
  },
  {
    id: 'E',
    competency: 'Problem solving across stacks',
    title: 'Frontend, API, AI, and pipelines in one small team',
    problem:
      'With fewer than four people we had to keep four areas running: frontend, API, AI, and data pipelines. A gap in any owner was an incident waiting to happen.',
    approach:
      'Documentation per area and cross-coverage reduced the owner-gap risk. A backend engineer by trade, I filled in data (Python, SQL) and frontend (React) myself.',
    change: 'Operating scope was kept, not cut. New joiners onboarded from the documents.',
    stack: ['Kotlin', 'Java', 'Python', 'TypeScript', 'AWS'],
    evidence: 'Operating scope held',
    period: '2025.10 – present',
    chapter: 'data',
    myPart: 'Covered data (Python, SQL) and frontend (React) myself',
    teamPart: 'Cross-coverage arrangement for API and AI'
  },
  {
    id: 'F',
    competency: 'Stakeholder collaboration · resolve disagreement through criteria and boundaries',
    title: 'Agreeing on criteria and boundaries instead of persuading',
    problem:
      'The data team was drifting into a request-processing unit. Meanwhile, on replacing the batch executor (a CI tool) with Airflow, each organization weighed the operational burden and the expected benefit differently.',
    approach:
      'Through stakeholder interviews and trips to headquarters I agreed priorities directly with the CEO and the planning, content, and advertising organizations. The executor question I treated as a matter of operating criteria, not taste. I discussed it with the infrastructure team first to align how each side saw burden and benefit, then narrowed the remaining gap by making the criteria explicit: a flow driven by schedule plus sensing (a contract) rather than tasks fired at human-chosen clock times cuts batch time sharply and makes re-running from the point of failure unambiguous. I reported this to technical leadership and redrew ownership between infrastructure operations (cluster, workers) and data operations (DAGs, contracts).',
    change:
      'The planning organization now designs experiments against our effect-analysis screens. The executor change became a task agreed across organizations rather than one team\'s demand.',
    stack: [],
    evidence: 'Some thirty stakeholder interviews per half-year · three HQ trips this year',
    period: '2025.10 – present',
    chapter: 'data',
    myPart: 'Ran the interviews, wrote up the operating criteria and reported to leadership, drafted the ownership boundary',
    teamPart: 'The boundary itself was agreed with the infrastructure team and leadership'
  },
  {
    id: 'G',
    competency: 'Knowledge-graph data catalog · AI-assisted · governance',
    title: 'A warehouse you can use without knowing who built it',
    problem:
      'Metrics shared names but not definitions, and where a table came from and went to was known only to its author.',
    approach:
      'I extracted tables, metrics, code, and screens from source DB through warehouse, marts, and serving cache into nodes and edges to connect lineage. An LLM generated purpose and usage descriptions for tables, with vetted relations visually separated from inferred ones. Interpretation rules, terminology conflicts, data gaps, and unqueryable metrics surface on a steward dashboard, and each department\'s data interests link to screen → API → warehouse lineage without personal identifiers. Everything compiles into a single dependency-free static HTML file.',
    change:
      '"Where does this metric live?" became a search. Weekly snapshot diffs show what changed.',
    stack: ['BigQuery', 'Python', 'LLM', 'Static compilation'],
    evidence: 'Hundreds of nodes · thousands of relations, refreshed weekly',
    // TODO(kyo): confirm start date
    period: '2026 – present',
    chapter: 'data',
    myPart: 'Designed and implemented the extractor, ontology, and static compilation (with AI)',
    teamPart: 'Relation vetting with the team and business stewards'
  },
  {
    id: 'H',
    competency: 'Internal tools · legacy redesign',
    title: 'Rebuilding the group intranet on a new structure',
    problem:
      'The group-wide internal systems mixed an aging board engine with .NET services, so fixing one feature meant touching several stacks at once. Systems newly needed, such as recruitment personality assessments, had nowhere to land.',
    // TODO(kyo): confirm the "decision" sentence: the actual order and criteria of the migration
    approach:
      'I redesigned the web office portal from the board engine to a Java monolith and normalized the database. The employee search service was rebuilt from .NET to Java, and the recruitment assessment system was built new and taken through stabilization. Consolidating onto one stack was the first decision; services with clear boundaries moved first, in order.',
    change:
      'Operations and handover became simpler on one stack. That experience carries into the pipeline principle I hold today: do not let per-table exceptions accumulate.',
    stack: ['Java', 'JavaScript', 'Oracle', 'MSSQL'],
    evidence: 'Two rebuilds · one new system (2018.11 – 2021.09)',
    period: '2018.11 – 2021.09',
    chapter: 'backend',
    myPart: 'Led the projects; did the redesign and implementation myself',
    // TODO(kyo): confirm team size and split
    teamPart: 'Collaboration within the technology division'
  },
  {
    id: 'I',
    competency: 'Operational pipelines · external integrations',
    title: 'Turning coupon delivery into a state-driven pipeline',
    problem:
      'A mobile coupon must arrive by SMS or email right after payment, and exchanges and refunds must be authenticated in real time at store POS terminals. Delivery failures, retries, and partner-specific formats made up most of the operational burden.',
    // TODO(kyo): confirm the "decision" sentence: why a DB-state-driven queue
    approach:
      'I automated SMS and email delivery as a queue driven by delivery state kept in the database, processing on state transitions. Keeping state in the database meant a failure could be found with one query and reprocessed from that point. I designed and built the POS exchange and refund authentication on Netty, and developed the partner APIs for issuing coupons and unified redemption.',
    change:
      'Delivery and reprocessing became something an operator does by reading the state and re-running. The habit of putting "failure points visible, re-run only the affected range" first in my pipelines today started here.',
    stack: ['Java', 'MySQL', 'Redis', 'Netty', 'Linux'],
    evidence: 'Delivery pipeline · POS integration · partner APIs (2013 – 2018)',
    period: '2013.04 – 2018.10',
    chapter: 'backend',
    myPart: 'Implemented the delivery pipeline, the POS authentication module, and the partner APIs',
    teamPart: 'Storefront frontend and the next-generation platform project as team efforts'
  }
];
