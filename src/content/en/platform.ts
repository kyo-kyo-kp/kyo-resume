import { Platform } from '../../types/content';

/**
 * English mirror of ko/platform.ts.
 * Rules: no internal system, account, or CI tool names; no table names, daily volumes, dates, or org names.
 * The redesign is "in planning", so say "designed", never "built".
 */
export const platform: Platform = {
  headline:
    'A data platform that ingests reading and revenue data in batch and in real time, transforms it, and reliably serves it to practitioners as a visualization site they check every morning',
  scaleContext: 'Kakao Piccoma, a webtoon platform with tens of millions of users and hundreds of thousands of titles',
  problem:
    'In the summer of 2024, Piccoma Japan had no data warehouse pipeline. On a platform where tens of millions of people read and pay, reading and revenue data lived in several systems, and source ingestion was an overnight batch relay hopping from on-premises to the cloud. Each job ran, but "where did it fail and where do we restart" was known only to whoever built it.',
  approach:
    'I designed and built ingestion (batch and real time), layered transformation, an API, and a visualization site from scratch as one platform, ran it, and pinned metric definitions in the mart layer. On top of that I started a redesign with three criteria: operational simplicity, structural uniformity, and resilience to change. The design fixes the Raw Landing contract (Manifest, Watermark, validation) before choosing an executor and separates orchestration from extraction. It is now at the validation (PoC) stage.',
  change:
    'Practitioners see the same metric definitions every morning without writing SQL. Service held through event peaks and outages. The next step turns "a pipeline you can only operate if you know who built it" into "a pipeline anyone can recover by reading its contract."',
  differently:
    'I would have made the arrival of a Manifest, not the arrival of a file, the start condition for the next stage from day one.',
  designCriteria: [
    {
      title: 'Operational simplicity',
      description: 'Failure points are visible, only the affected range is re-run, and a new owner responds the same way the last one did.'
    },
    {
      title: 'Structural uniformity',
      description: 'One shared contract, path, validation, and reprocessing pattern instead of a script and an exception per table.'
    },
    {
      title: 'Resilience to change',
      description: 'The structure after landing stays intact even when the source location or the execution tool changes.'
    }
  ],
  collaboration:
    'On replacing the batch executor (a CI tool) with Airflow, each organization weighed the operational burden and the expected benefit differently. I treated it as a matter of operating criteria, not taste. I discussed it with the infrastructure team first to align how each side saw burden and benefit, then narrowed the remaining gap by making the criteria explicit: a flow driven by schedule plus sensing (a contract) rather than tasks fired at human-chosen clock times cuts batch time sharply and makes re-running from the point of failure unambiguous. I reported this to technical leadership and redrew ownership between infrastructure operations (cluster, workers) and data operations (DAGs, contracts). The executor change became a task agreed across organizations rather than one team\'s demand.',
  scopeNote:
    'The real-time path was deliberately left out of this redesign. Until the batch landing contract is fixed, real time would repeat the same problems.',
  stages: [
    {
      stage: 'Ingestion · Batch',
      problem: 'An overnight relay across many hops, with failure points unclear',
      didWhat: 'Ran a standard of daily partitions and idempotent re-runnable DAGs; in the redesign, specified the landing contract, Manifest, Watermark, and the split between control plane and extraction plane',
      stack: ['Airflow', 'S3 / Athena', 'Parquet']
    },
    {
      stage: 'Ingestion · Real time',
      problem: 'Event periods and home slots that must be seen "right now"',
      didWhat: 'WebFlux API → Kafka (AWS managed) → consumer → S3 (json.gz) → Athena → Redshift. Built by a former team member; I operate it now, and the infrastructure team runs Kafka',
      stack: ['WebFlux', 'Kafka', 'S3', 'Athena', 'Redshift']
    },
    {
      stage: 'Transformation',
      problem: 'KPI definitions differing by team; ownership of business logic scattered',
      didWhat: 'l1–l5 layers, annual aggregates and KPI marts, RFM and preference data models, schema change history, daily data quality DAGs',
      stack: ['SQL', 'Python', 'Redshift Serverless']
    },
    {
      stage: 'Serving · API & Visualization',
      problem: 'Practitioners need to make recurring decisions without SQL',
      didWhat: 'A Kotlin API and a React internal visualization site with permissions, caching, async queries, and a serving cache',
      stack: ['Kotlin', 'React', 'PostgreSQL', 'Redis']
    },
    {
      stage: 'Understanding · Catalog',
      problem: 'A warehouse you can only use if you know who built it',
      didWhat: 'Built a knowledge-graph data map so lineage, metric definitions, and interpretation rules are visible in one place',
      stack: ['BigQuery', 'LLM', 'Static HTML compilation']
    },
    {
      stage: 'Reliable operations',
      problem: 'Peaks, outages, absent owners',
      didWhat: 'Adopted Redshift Serverless, handled incidents and prevented recurrence, added API caching and ETags, quality checks with alerts, and runbooks',
      stack: ['Monitoring', 'Slack alerts']
    }
  ],
  diagram: `flowchart TB
  subgraph ASIS[In operation]
    direction LR
    A0[Source DB replica] --> B0[On-prem batch] --> C0[Transfer relay] --> D0[S3 · Athena raw layer]
    R0[Real time · API → Kafka → S3 json.gz] --> D0
    D0 --> E0[Mart layers l1 → l5] --> F0[API · Visualization · BI · Serving cache]
  end
  subgraph TOBE[Designed]
    direction LR
    A1[Source DB replica] --> W1[Edge worker · extract · Parquet]
    S1[Central Airflow · schedule · state · retry] <-->|HTTPS task contract| W1
    W1 --> R1[Raw landing · validation · Manifest] --> P1[Publish · Manifest]
    P1 -->|Manifest detected| M1[Mart Airflow · quality · l2 / l3] --> F1[API · Visualization · BI]
    G1[Governance · cost · access · SLA · monitoring] -.-> W1 & R1 & M1
  end
  ASIS ==>|Contract first, executor later| TOBE`
};
