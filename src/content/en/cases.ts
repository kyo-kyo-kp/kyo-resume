import { Case } from '../../types/content';

/** English mirror of ko/cases.ts. "Seven stories on one platform." No numbers in titles. */
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
    chapter: 'data'
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
    chapter: 'data'
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
    chapter: 'data'
  },
  {
    id: 'D',
    competency: 'AI workflow adoption · guardrails included',
    title: 'Bringing agents into data work safely',
    problem:
      'AI tools speed things up, but they bring the risk of unbounded queries against the production warehouse and plausible wrong answers ending up in reports.',
    approach:
      'A PoC of AI analysis reports on titles and publishers tested how far "serve the metric → assist the interpretation" holds. To keep agents off the warehouse directly, a query and schema wrapper enforcing read-only access, mandatory partition filters, and local aggregation sits in the workflow. The team operates within the company\'s AI agent security policy.',
    // TODO(kyo): confirm who designed the wrapper (self/team) and how widely it is deployed
    change:
      'The team uses AI tools daily, while cost and data exposure limits are held by the tooling rather than by attention. The PoC is now a decision point on whether to adopt.',
    stack: ['Claude Code', 'Gemini API', 'duckdb', 'Athena', 'BigQuery'],
    evidence: 'Operated under the security policy',
    period: '2025.10 – present',
    chapter: 'data'
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
    chapter: 'data'
  },
  {
    id: 'F',
    competency: 'Stakeholder collaboration · resolve disagreement through criteria and boundaries',
    title: 'Agreeing on criteria and boundaries instead of persuading',
    problem:
      'The data team was drifting into a request-processing unit. Meanwhile, replacing the batch executor (a CI tool) with Airflow looked to the infrastructure team like "the same thing".',
    approach:
      'Through stakeholder interviews and trips to headquarters I agreed priorities directly with the CEO and the planning, content, and advertising organizations. The executor question I treated as an operations argument, not a matter of taste. I discussed it with the infrastructure team first, then narrowed the remaining gap by making the criteria explicit: a flow driven by schedule plus sensing (a contract) rather than tasks fired at human-chosen clock times cuts batch time sharply and makes re-running from the point of failure unambiguous. I reported this to technical leadership and redrew ownership between infrastructure operations (cluster, workers) and data operations (DAGs, contracts).',
    change:
      'The planning organization now designs experiments against our effect-analysis screens. The executor change became a task agreed across organizations rather than one team\'s demand.',
    stack: [],
    evidence: 'Some thirty stakeholder interviews per half-year · two HQ trips',
    period: '2025.10 – present',
    chapter: 'data'
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
    chapter: 'data'
  }
];
