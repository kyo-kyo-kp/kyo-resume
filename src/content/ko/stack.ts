import { SkillGroup } from '../../types/content';

/** % 바 대신 "설계·운영 / 사용" 2단. 깊이가 얕은 영역은 note 로 정직하게 표기한다. */
export const stack: SkillGroup[] = [
  {
    domain: 'Data Platform',
    operates: [
      'Airflow',
      'Athena (S3 · Glue)',
      'Redshift Serverless',
      'Redshift Cluster',
      'DW 모델링 · 5계층 데이터 모델 (l1~l5)',
      '데이터 품질 검증',
      '장애 대응·재발 방지'
    ],
    uses: ['BigQuery', 'duckdb', 'Parquet', 'Iceberg (설계)']
  },
  {
    domain: 'Backend & API',
    operates: ['Kotlin · Spring API', 'Java', 'Python'],
    uses: ['PostgreSQL', 'MySQL', 'Redis', 'DocumentDB → PostgreSQL 이관', 'Go', 'Netty']
  },
  {
    domain: 'AI',
    operates: ['AI 분석 보고서 하네스', '에이전트 워크플로우 가드레일', 'LLM 기반 카탈로그 추출'],
    uses: ['Claude Code', 'Gemini API', 'AWS Personalize (추천, 과거)']
  },
  {
    domain: 'Frontend',
    operates: [],
    uses: ['React · TypeScript 사내 시각화 사이트', 'MUI', 'Framer Motion'],
    note: 'LLM 도구를 활용해 운영하는 수준입니다. 전문 영역은 아닙니다.'
  },
  {
    domain: 'Infra & Ops',
    operates: [],
    uses: ['AWS 멀티 계정 데이터 환경', '모니터링·알림', 'Docker', 'Linux', 'GCS', 'Vercel'],
    note: 'LLM 도구를 활용해 운영하는 수준입니다. 전문 영역은 아닙니다.'
  },
  {
    domain: 'Collaboration',
    operates: ['현업 인터뷰 · 로드맵 검증', '채용 (JD · 면접 설계)', '온보딩 · 운영 매뉴얼'],
    uses: ['Notion', 'Jira', 'Slack', '일본어 (학습 중)']
  }
];
