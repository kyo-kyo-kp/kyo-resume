import { Platform } from '../../types/content';

/**
 * 앵커 케이스. Hero 다음 화면.
 * 규칙: 시스템·계정·CI 도구 이름, 테이블명, 일일 데이터량, 일정, 조직명은 쓰지 않는다.
 * 재설계는 "계획 중"이므로 "설계했다"까지만 쓴다. 서술 문장은 합쇼체.
 */
export const platform: Platform = {
  headline:
    '열람·매출 데이터를 배치와 실시간으로 수집하고, 가공해, 실무자가 매일 보는 시각화 사이트로 안정적으로 제공하는 데이터 플랫폼',
  // TODO(kyo): 회사가 공개한 수치가 있으면 숫자로, 없으면 자릿수 표현 유지
  scaleContext: '카카오픽코마, 수천만 명이 이용하고 수십만 작품이 연재되는 웹툰 플랫폼',
  problem:
    '수천만 사용자가 읽고 결제하는 플랫폼에서 열람·매출 데이터는 여러 시스템에 흩어져 있었고, 파이프라인은 온프레미스에서 클라우드까지 여러 홉을 거치는 새벽 배치 릴레이였습니다. 개별 작업은 돌지만 "어디서 실패했고 어디부터 다시 돌릴지"는 만든 사람만 알았습니다.',
  approach:
    '수집(배치·실시간) → 레이어별 가공 → API → 시각화까지를 하나의 플랫폼으로 운영하며 지표 정의를 마트 레이어에 고정했습니다. 그 위에서 재설계를 시작했습니다. 기준은 셋, 운영 단순성·구조적 통일성·전환 대응력입니다. 실행 도구보다 Raw Landing 계약(Manifest·Watermark·검증)을 먼저 고정하는 방향으로 설계하고, 오케스트레이션과 추출 실행을 분리하는 구조를 잡았습니다. 지금은 검증(PoC) 단계입니다.',
  change:
    '실무자가 SQL 없이 매일 같은 정의의 지표를 봅니다. 이벤트 피크와 장애를 넘기며 제공이 끊기지 않았습니다. 다음 단계는 "누가 만들었는지 알아야 운영되는 파이프라인"을 "계약을 보면 누구나 복구할 수 있는 파이프라인"으로 바꾸는 것입니다.',
  differently:
    '처음부터 파일 도착이 아니라 Manifest 도착을 다음 단계의 시작 조건으로 삼았을 것입니다.',
  designCriteria: [
    {
      title: '운영 단순성',
      description: '실패 지점이 보이고, 필요한 구간만 다시 실행할 수 있으며, 담당자가 바뀌어도 같은 방식으로 대응할 수 있어야 합니다.'
    },
    {
      title: '구조적 통일성',
      description: '테이블마다 스크립트와 예외를 늘리는 대신 공통 계약·경로·검증·재처리 방식을 적용할 수 있어야 합니다.'
    },
    {
      title: '전환 대응력',
      description: '원천의 물리적 위치와 실행 도구가 바뀌어도 착지 이후의 구조를 그대로 유지할 수 있어야 합니다.'
    }
  ],
  scopeNote:
    '실시간 경로는 의도적으로 이번 재설계 범위 밖에 두었습니다. 배치의 착지 계약을 먼저 고정하지 않으면 실시간도 같은 문제를 반복하기 때문입니다.',
  stages: [
    {
      stage: '수집 · 배치',
      problem: '여러 홉을 거치는 새벽 배치 릴레이, 실패 지점 불명',
      didWhat: '일 파티션·멱등 재실행 DAG 표준 운영. 재설계에서 착지 계약·Manifest·Watermark와 제어면/실행면 분리 설계',
      stack: ['Airflow', 'S3 / Athena', 'Parquet']
    },
    {
      stage: '수집 · 실시간',
      problem: '이벤트 기간·홈 슬롯처럼 "지금"을 봐야 하는 요구',
      // TODO(kyo): 스트림 수집 기술 스택 확인
      didWhat: '시간 파티션 스트림 테이블을 배치와 분리된 경로로 운영',
      stack: ['스트림 수집', 'Athena']
    },
    {
      stage: '가공',
      problem: '조직마다 다른 KPI 정의, 비즈니스 로직 소유권 분산',
      didWhat: 'l1~l4 레이어, 연간 집계·KPI 마트, RFM·선호 데이터 모델, 스키마 변경 이력, 일일 품질 검증 DAG',
      stack: ['SQL', 'Python', 'Redshift Serverless']
    },
    {
      stage: '제공 · API·시각화',
      problem: '실무자가 SQL 없이 반복 의사결정을 해야 함',
      didWhat: 'Kotlin API와 React 사내 시각화 사이트. 권한·캐시·비동기 조회, 서빙 캐시',
      stack: ['Kotlin', 'React', 'PostgreSQL', 'Redis']
    },
    {
      stage: '이해 · 카탈로그',
      problem: '누가 만들었는지 알아야 쓰는 DW',
      didWhat: '지식 그래프 기반 DW 데이터 맵. 계보·지표 정의·해석 규칙을 한곳에서',
      stack: ['BigQuery', 'LLM', '정적 HTML 컴파일']
    },
    {
      stage: '안정 운영',
      problem: '피크·장애·담당자 부재',
      didWhat: 'Redshift Serverless 도입, 장애 대응과 재발 방지, API 캐싱·ETag, 품질 검증과 알림, 운영 매뉴얼',
      stack: ['모니터링', 'Slack 알림']
    }
  ],
  diagram: `flowchart TB
  subgraph ASIS[운영 중]
    direction LR
    A0[원천 DB 복제본] --> B0[온프레미스 배치] --> C0[전송 릴레이] --> D0[S3 · Athena 원천 계층]
    D0 --> E0[마트 계층 l1 → l4] --> F0[API · 시각화 · BI · 서빙 캐시]
  end
  subgraph TOBE[설계]
    direction LR
    A1[원천 DB 복제본] --> W1[엣지 워커 · 추출 · Parquet]
    S1[중앙 Airflow · 스케줄 · 상태 · 재시도] <-->|HTTPS 태스크 계약| W1
    W1 --> R1[Raw Landing · 검증 · Manifest] --> P1[Publish · Manifest]
    P1 -->|Manifest 감지| M1[마트 Airflow · 품질 · l2 / l3] --> F1[API · 시각화 · BI]
    G1[거버넌스 · 비용 · 권한 · SLA · 모니터링] -.-> W1 & R1 & M1
  end
  ASIS ==>|계약 먼저, 실행기는 나중| TOBE`,
  evidence: '활성 사용자층이 특정 팀에서 여러 실로 확장 · 인원 변동 속 운영 범위 유지',
  // TODO(kyo): 직접/팀 구분 확인
  myPart:
    '직접 구현: 파이프라인 표준과 품질 검증 DAG, 세그먼트 데이터 모델과 비동기 조회, API 캐싱·ETag, 데이터 맵과 AI 하네스, 재설계안. 팀과 함께: 화면, 신규 마트·DAG, 일상 운영 대응.'
};
