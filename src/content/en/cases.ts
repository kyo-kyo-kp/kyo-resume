import { Case } from '../../types/content';

/**
 * English mirror of ko/cases.ts. "Seven stories that start with a problem" (A-E data platform, F-G backend).
 * No numbers in titles. Diagrams show roles only, no internal system names.
 */
export const cases: Case[] = [
  {
    id: 'A',
    competency: 'Reusable data products',
    title: 'Defining every user on three axes',
    problem:
      'There was no framework for per-user targeting. When a request came in, the analytics team answered with an ad-hoc extract, and the same question came back from other teams with different definitions.',
    approach:
      'With RFM-based segmentation I defined each user on three axes, recency, frequency, and monetary value, and built the data models (l2/l4) that refresh that definition on a schedule. The segments were wired to async queries so practitioners could change conditions on screen, and the result fed push targeting.',
    change:
      'Targeting went from "request an extract" to "select by a shared standard". Teams other than the one we first shared it with started using it on their own, and the conversion gaps between segments became the basis for push priorities.',
    stack: ['Redshift', 'Athena', 'Airflow', 'Kotlin', 'React'],
    evidence: 'Spread across several organizations (H2 2025)',
    period: '2025.07 – 2025.12',
    chapter: 'data',
    myPart: 'Designed the three-axis definition and refresh data models (l2/l4), implemented the async query flow, built the screen PoC',
    teamPart: 'Production UI and the push integration with the team'
  },
  {
    id: 'B',
    competency: 'Define the real problem → redesign the structure · stakeholder collaboration',
    title: 'Redefining a lookup tool as a decision platform',
    problem:
      'A dashboard buried under feature requests. Building exactly what was asked added screens, but decisions did not get faster, and the data team was drifting into a request-processing unit.',
    approach:
      'I paused request-taking and met the CEO and the planning, content, and advertising organizations directly through stakeholder interviews and headquarters trips to map the structure of recurring decisions first. I analyzed the requirements, designed and implemented the data schemas that fit that structure, and rearranged the main, KPI, event, and title analysis screens.',
    change:
      'The lookup tool became a platform where people "see the data and decide". Active users widened from one team to several organizations, and the planning organization now designs experiments against our effect-analysis screens.',
    stack: ['Kotlin', 'PostgreSQL', 'Redshift', 'React'],
    evidence: 'Active users up two to three times (H1 2026) · some thirty stakeholder interviews per half-year · three HQ trips this year',
    period: '2026.01 – present',
    chapter: 'data',
    myPart: 'Requirements analysis, data schema design and implementation, the interviews and trips',
    teamPart: 'API hardening (permissions, caching, ETag) and the screen rearrangement with the team'
  },
  {
    id: 'C',
    competency: 'What AI changed · analysis reports as a decision tool',
    title: 'AI analysis reports became a decision tool for practitioners',
    problem:
      'The metrics were on screen, but interpretation was left to people. Reading one title or one publisher against company KPIs had to pass through an analyst every time.',
    approach:
      'I built a harness that combines titles, publishers, and company KPIs with the context in the data map (metric definitions, lineage, interpretation rules) and lets AI read and write on top of it. It runs as five tasks, prepare → parallel fetch → context assembly → unified LLM analysis → strategic playbook → translation, storage, and dashboard, with fetch, build, prompt, and review function modules under each task. A reviewer checks arithmetic and forbidden phrasing in every LLM output and retries once; models are split by role with fallbacks. It runs weekly in batch and on demand, and the results are served through the AI Insights menu of the internal visualization platform. I owned it end to end, from design to implementation and operations, and because it was fun I kept refining it in spare time and on weekends for six months.',
    change:
      'Business, content, IP, and planning organizations responded, and a practitioner in the business organization asked for access to the AI Insights menu to use in operations. The questions decision makers ask repeatedly were defined as analysis topics and validated; moving them into operational features such as alerts and guards is under discussion.',
    stack: ['Airflow', 'Gemini API', 'Claude', 'Redshift', 'Athena', 'S3', 'Kafka'],
    evidence: 'Access requests from several organizations (2026) · six months of refinement',
    period: '2026.01 – present',
    chapter: 'data',
    myPart: 'Entirely my own work: design, implementation, operations, and refinement by one person',
    diagram: `flowchart LR
  T[Trigger<br/>weekly batch · on-demand request] --> P[prepare<br/>validate · dates · cache check]
  P --> F[parallel fetch<br/>warehouse · snapshots · recommendation data]
  F --> B[context assembly<br/>metric definitions · glossary · prior reports]
  B --> L1[unified LLM analysis<br/>reviewer checks · one retry]
  L1 --> L2[strategic playbook LLM<br/>review]
  L2 --> TR[translation KO → JA]
  L2 --> S[(store<br/>report JSON · cache)]
  TR --> S
  L2 --> H[weekly HTML dashboard]
  S --> V[internal visualization platform<br/>AI Insights menu]
  H --> V`
  },
  {
    id: 'D',
    competency: 'Building a team that crosses stacks',
    title: 'Frontend, API, AI, and pipelines in one small team',
    problem:
      'With fewer than four people we had to keep four areas running: frontend, API, AI, and data pipelines. When each person guards only one area, a gap in any one of them is an incident waiting to happen.',
    approach:
      'I proposed crossing the areas instead of guarding them. I persuaded the core frontend engineer to take on backend and data, and the core backend engineer to take on frontend, arguing that with LLM tools lowering the boundaries this is where the times are going; they agreed and we did it together. Documentation per area and cross-coverage backed the shift.',
    change:
      'With a small headcount the operating scope of all four areas was kept, not cut, and one person\'s absence no longer turns into an incident. New joiners onboarded from the documents.',
    stack: ['Kotlin', 'Java', 'Python', 'TypeScript', 'AWS'],
    evidence: 'Operating scope held',
    period: '2025.10 – present',
    chapter: 'data',
    myPart: 'Proposed the direction and made the case; documentation per area',
    teamPart: 'Both core engineers widened into the opposite area and ran it together'
  },
  {
    id: 'E',
    competency: 'Warehouse data map · AI-assisted · governance',
    title: 'A warehouse data map: usable without knowing who built it',
    problem:
      'Metrics shared names but not definitions, and where a table came from and went to was known only to its author.',
    approach:
      'I built a data map of the warehouse. Tables, columns, metrics, terms, screens, and APIs are connected in one graph, together with where each thing comes from and goes to (lineage) and what it means (definitions, interpretation rules). The sources are the warehouse schema, the glossary and code dictionary, vetted relations, static code parsing, and query logs; it recompiles automatically every week and ships as a single dependency-free HTML page. An LLM drafts descriptions, with vetted relations kept apart from inferred ones, and automatically extracted relations enter the official graph only after a person vets them. Instead of a graph database or retrieval (RAG), I chose a JSON contract and an LLM context pack to keep the structure simple.',
    change:
      '"Where does this metric live?" and "Where does this table come from?" became a single search. The same data map now feeds the AI analysis reports as context and the team\'s LLM queries.',
    stack: ['Python', 'Airflow', 'S3 → GCS', 'BigQuery', 'LLM', 'Static compilation'],
    evidence: 'Hundreds of nodes · thousands of relations, refreshed weekly · in evaluation the context pack beat retrieval (RAG) on accuracy with zero hallucinations',
    period: '2026.07 – present',
    chapter: 'data',
    myPart: 'Designed and implemented the extractors, compile step, and data map UI (with AI); the evaluation harness',
    teamPart: 'Relation vetting with the team and business stewards',
    diagram: `flowchart LR
  subgraph SRC[Sources]
    S1[Warehouse schema]
    S2[Glossary · code dictionary]
    S3[Vetted relations]
    S4[Static code parsing<br/>screen → API → table]
    S5[Query logs<br/>real joins]
  end
  SRC --> C[weekly compile<br/>integrity checks · inferences quarantined as draft]
  C --> MAP[Warehouse data map<br/>graph + definitions · interpretation rules]
  MAP --> W[Web data map<br/>one static HTML page]
  MAP --> AI[Context for AI analysis reports]
  MAP --> Q[Team LLM queries<br/>context pack]`
  },
  {
    id: 'F',
    competency: 'Internal tools · legacy redesign',
    title: 'Rebuilding the group intranet on a new structure',
    problem:
      'The group-wide internal systems mixed an aging board engine with .NET services, so fixing one feature meant touching several stacks at once. Systems newly needed, such as recruitment personality assessments, had nowhere to land.',
    approach:
      'I redesigned the web office portal from the board engine to a Java monolith and normalized the database. The employee search service was rebuilt from .NET to Java, and the recruitment assessment system was built new and taken through stabilization. Consolidating onto one stack was the first decision; services with clear boundaries moved first, in order. Instead of standing up new infrastructure and a database for every request, one monolith served each domain\'s screens, APIs, database schemas, and admin, separated by permission. It was a redesign so that a groupware team, which also takes on the work other teams would rather not, could keep a virtuous cycle going.',
    change:
      'Operations and handover became simpler on one stack. I learned then that allowing one exception means running two ways of operating, which is why the pipeline redesign today aims for one shared contract instead of a script per table.',
    stack: ['Java', 'JavaScript', 'Oracle', 'MSSQL'],
    evidence: 'Two rebuilds · one new system (2018.11 – 2021.09)',
    period: '2018.11 – 2021.09',
    chapter: 'backend',
    myPart: 'Led the redesign and did the design',
    teamPart: 'Implementation together with the team\'s frontend and backend developers'
  },
  {
    id: 'G',
    competency: 'Operational pipelines · external integrations · the whole platform',
    title: 'Turning coupon delivery into a state-driven pipeline',
    problem:
      'A mobile coupon must arrive by SMS or email right after payment, and exchanges and refunds must be authenticated in real time at store POS terminals. Delivery failures, retries, and partner-specific formats made up most of the operational burden.',
    approach:
      'I automated SMS and email delivery as a queue driven by delivery state kept in the database, processing on state transitions. Keeping state in the database meant a failure could be found with one query and reprocessed from that point. Since many failures came from external partners, having developers redo every failed scheduled delivery was a waste, so I added a delivery-failure screen to the admin where practitioners could resend themselves. I designed and built the POS exchange and refund authentication on Netty, and developed the partner APIs for issuing coupons and unified redemption.',
    change:
      'Delivery and reprocessing left the developers\' hands: practitioners read the state in the admin and resend. Those five-plus years as a backend engineer handling the whole platform in an IDC environment, servers, databases, batches, and external integrations, became the foundation for the later move into data platforms.',
    stack: ['Java', 'MySQL', 'Redis', 'Netty', 'Linux', 'IDC'],
    evidence: 'Delivery pipeline · POS integration · partner APIs (2013 – 2018)',
    period: '2013.04 – 2018.10',
    chapter: 'backend',
    myPart: 'Implemented the delivery pipeline, the POS authentication module, and the partner APIs',
    teamPart: 'Storefront frontend and the next-generation platform project as team efforts'
  }
];
