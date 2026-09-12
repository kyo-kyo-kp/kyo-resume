import { SkillGroup } from '../../types/content';

/** English mirror of ko/stack.ts. Three tiers instead of percentage bars; gaps are not hidden. */
export const stack: SkillGroup[] = [
  {
    domain: 'Data Platform',
    operates: ['Airflow', 'Athena (S3 · Glue)', 'Redshift Serverless', 'l1–l4 warehouse modeling', 'Data quality checks'],
    uses: ['BigQuery', 'duckdb', 'Parquet', 'Iceberg (design)'],
    // TODO(kyo): confirm these are actively being learned; otherwise relabel as "next up"
    learning: ['dbt', 'Spark']
  },
  {
    domain: 'Backend & API',
    operates: ['Kotlin · Spring API', 'Java', 'Python'],
    uses: ['PostgreSQL', 'MySQL', 'Redis', 'DocumentDB → PostgreSQL migration', 'Go', 'Netty'],
    learning: []
  },
  {
    domain: 'Frontend',
    operates: ['Internal visualization site in React · TypeScript'],
    uses: ['MUI', 'Framer Motion'],
    learning: []
  },
  {
    domain: 'Infra & Ops',
    operates: ['Multi-account AWS data environment', 'Monitoring & alerting', 'Incident response & prevention'],
    uses: ['Docker', 'Linux', 'GCS', 'Vercel'],
    learning: ['Airflow 3.x']
  },
  {
    domain: 'AI',
    operates: ['Guardrails for agent workflows', 'LLM-assisted catalog extraction'],
    uses: ['Claude Code', 'Gemini API', 'AWS Personalize (recommendations, past)'],
    // TODO(kyo): confirm real use of pgvector / graph-based retrieval
    learning: ['RAG · graph-based retrieval']
  },
  {
    domain: 'Collaboration',
    operates: ['Stakeholder interviews · roadmap validation', 'Hiring (JD · interview design)', 'Onboarding · runbooks'],
    uses: ['Notion', 'Jira', 'Slack'],
    learning: ['Japanese']
  }
];
