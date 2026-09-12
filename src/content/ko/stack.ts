import { SkillGroup } from '../../types/content';

/** % 바 대신 "설계·운영 / 사용 / 학습 중" 3단. 갭은 숨기지 않는다. */
export const stack: SkillGroup[] = [
  {
    domain: 'Data Platform',
    operates: ['Airflow', 'Athena (S3 · Glue)', 'Redshift Serverless', 'l1~l4 DW 모델링', '데이터 품질 검증'],
    uses: ['BigQuery', 'duckdb', 'Parquet', 'Iceberg (설계)'],
    // TODO(kyo): 실제 학습 중인지 확인. 아니면 "다음에 익힐 것"으로 라벨 변경
    learning: ['dbt', 'Spark']
  },
  {
    domain: 'Backend & API',
    operates: ['Kotlin · Spring API', 'Java', 'Python'],
    uses: ['PostgreSQL', 'MySQL', 'Redis', 'DocumentDB → PostgreSQL 이관', 'Go', 'Netty'],
    learning: []
  },
  {
    domain: 'Frontend',
    operates: ['React · TypeScript 사내 시각화 사이트'],
    uses: ['MUI', 'Framer Motion'],
    learning: []
  },
  {
    domain: 'Infra & Ops',
    operates: ['AWS 멀티 계정 데이터 환경', '모니터링·알림', '장애 대응·재발 방지'],
    uses: ['Docker', 'Linux', 'GCS', 'Vercel'],
    learning: ['Airflow 3.x']
  },
  {
    domain: 'AI',
    operates: ['에이전트 워크플로우 가드레일', 'LLM 기반 카탈로그 추출'],
    uses: ['Claude Code', 'Gemini API', 'AWS Personalize (추천, 과거)'],
    // TODO(kyo): pgvector · 그래프 기반 검색 실사용 여부 확인
    learning: ['RAG · 그래프 기반 검색']
  },
  {
    domain: 'Collaboration',
    operates: ['현업 인터뷰 · 로드맵 검증', '채용 (JD · 면접 설계)', '온보딩 · 운영 매뉴얼'],
    uses: ['Notion', 'Jira', 'Slack'],
    learning: ['일본어']
  }
];
