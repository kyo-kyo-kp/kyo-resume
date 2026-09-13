import { SkillGroup } from '../../types/content';

/** English mirror of ko/stack.ts. Two tiers instead of percentage bars; shallow areas carry an honest note. */
export const stack: SkillGroup[] = [
  {
    domain: 'Data Platform',
    operates: [
      'Airflow',
      'Athena (S3 · Glue)',
      'Redshift Serverless',
      'Redshift Cluster',
      'Warehouse modeling · 5-layer data model (l1–l5)',
      'Data quality checks',
      'Incident response & prevention'
    ],
    uses: ['BigQuery', 'duckdb', 'Parquet', 'Iceberg (design)']
  },
  {
    domain: 'Backend & API',
    operates: ['Kotlin · Spring API', 'Java', 'Python'],
    uses: ['PostgreSQL', 'MySQL', 'Redis', 'DocumentDB → PostgreSQL migration', 'Go', 'Netty']
  },
  {
    domain: 'AI',
    operates: ['AI analysis-report harness', 'Guardrails for agent workflows', 'LLM-assisted catalog extraction'],
    uses: ['Claude Code', 'Gemini API', 'AWS Personalize (recommendations, past)']
  },
  {
    domain: 'Frontend',
    operates: [],
    uses: ['Internal visualization site in React · TypeScript', 'MUI', 'Framer Motion'],
    note: 'Operated with the help of LLM tools. Not an area of deep expertise.'
  },
  {
    domain: 'Infra & Ops',
    operates: [],
    uses: ['Multi-account AWS data environment', 'Monitoring & alerting', 'Docker', 'Linux', 'GCS', 'Vercel'],
    note: 'Operated with the help of LLM tools. Not an area of deep expertise.'
  },
  {
    domain: 'Collaboration',
    operates: ['Stakeholder interviews · roadmap validation', 'Hiring (JD · interview design)', 'Onboarding · runbooks'],
    uses: ['Notion', 'Jira', 'Slack', 'Japanese (learning)']
  }
];
