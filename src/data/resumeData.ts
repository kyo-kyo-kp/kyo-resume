import { PersonalInfo, Experience, Education, Skill, Project, Certification } from '../types';

// 개인 정보
export const personalInfo: PersonalInfo = {
  name: "김규호",
  title: "Engineer",
  email: "rlarbghrbgh@gmail.com",
  location: "Seoul, South Korea",
  summary: "안녕하세요👋 개발을 즐기고자 하는 김규호입니다.\n\n현재에 안주하는 것보다 안정된 상황에서도 불합리한 요소를 찾아 해결하고, 일과 삶에서 '선순환'을 만들어 낼 줄 아는 사람이 되고자 합니다.\n\n개발자 중심이 아닌, 사용자 중심에서 편리한 서비스를 구축하는 개발자가 되고자 합니다."
};

// 경력 정보 (최근 → 과거). chapter 로 Journey 3막에 매핑
export const experiences: Experience[] = [
  {
    id: "1a",
    company: "카카오픽코마",
    position: "데이터인텔리전스팀 팀장 (2026.01~) · Sr.Pro 엔지니어",
    period: "2024.07 - 현재",
    description: "일본 픽코마의 데이터 파이프라인과 사내 시각화 플랫폼을 설계·운영합니다. 열람·매출 데이터의 수집(배치·실시간)부터 가공, API, 시각화, 안정 운영까지 담당하며, 2025년 10월부터 실질적으로 팀을 리딩하고 2026년 1월 팀장이 됐습니다.",
    technologies: ["Kotlin", "Python", "SQL", "AWS", "Redshift", "Athena", "Airflow", "BigQuery", "PostgreSQL", "React"],
    achievements: [
      "데이터 파이프라인 설계·구축·운영과 l1~l4 레이어 표준, 일일 품질 검증 DAG (2024.07~)",
      "함께 본 작품·유사 작품 추천을 데이터 툴 안에서 제공 (2025.03~)",
      "RFM 기반 사용자 세그먼트를 재사용 가능한 기능으로 제품화 (2025 하반기)",
      "사내 시각화 플랫폼을 의사결정 플랫폼으로 재정의, Redshift Serverless 도입과 운영 안정화 (2026 상반기)",
      "지식 그래프 기반 DW 데이터 맵 구축 (2026)",
      "채용(JD·면접 설계), 온보딩 문서, 주간·월간·스프린트 운영 체계 정비"
    ],
    chapter: "data"
  },
  {
    id: "1b",
    company: "카카오픽코마",
    position: "플랫폼 엔지니어 (프랑스 픽코마)",
    period: "2022.03 - 2024.06",
    description: "프랑스 픽코마의 글로벌 플랫폼 운영과 개발을 담당했습니다. 정산, 개인화 추천, 데이터 ETL, KPI 고도화를 수행하며 웹툰 비즈니스의 데이터 흐름을 익혔습니다.",
    technologies: ["Kotlin", "Java", "Python", "AWS", "AWS Personalize", "DocumentDB"],
    achievements: [
      "정산 시스템 고도화 및 운영",
      "AWS Personalize 기반 개인화 추천 도입",
      "데이터 ETL 파이프라인과 KPI 지표 고도화"
    ],
    chapter: "platform"
  },
  {
    id: "2",
    company: "넥슨코리아",
    position: "G3 / 백엔드 개발자",
    period: "2018.11 - 2022.03",
    description: "넥슨 그룹 통합 사내 시스템 리뉴얼 프로젝트를 주도했습니다. 기술본부에서 채용 인성검사 시스템 신규 구축, 사원검색 서비스 리빌딩, 웹오피스 포털 전환을 수행했으며, 인텔리전스랩스에서는 넥슨플레이와 스푼플러스 앱 백엔드 운영을 담당했습니다.",
    technologies: ["Java", "Python", "JavaScript", "Oracle", "MSSQL", "Git", "Jira"],
    achievements: [
      "넥슨플레이 앱 백엔드 운영 (Java 기반, 2021.10~)",
      "스푼플러스 앱 백엔드 운영 (Python 기반, 2021.10~)",
      "채용 인성검사 시스템 신규 구축 및 안정화 (2018.11~2021.09)",
      "사원검색 서비스 닷넷 → Java 전환 리빌딩 (2018.11~2021.09)",
      "웹오피스 포털 제로보드 → Java 기반 모놀리식 구조로 재설계 (2018.11~2021.09)"
    ]
  },
  {
    id: "3",
    company: "케이티엠하우스 (현 KT알파)",
    position: "플랫폼개발팀 / 대리",
    period: "2013.04 - 2018.10",
    description: "기프티쇼 백엔드 시스템 운영 및 신규 기능 개발을 담당했습니다. 쿠폰 발송 파이프라인, POS 연동 모듈, 외부 제휴사 연동 API를 개발했습니다.",
    technologies: ["Java", "JavaScript", "MySQL", "Redis", "Docker", "Linux", "Netty"],
    achievements: [
      "쿠폰 발송 파이프라인: DB 상태 기반 Queue 처리, SMS/Email 발송 자동화 시스템 구현",
      "POS 연동 모듈 개발: Netty 기반 교환/반품 인증 시스템 설계 및 구축",
      "외부 제휴사 연동 API 개발: 타사 쿠폰 발행 및 통합 교환 처리",
      "기프티쇼 쇼핑몰 프론트 개발 (웹/모바일웹)",
      "기프티쇼 플랫폼 차세대 고도화 프로젝트 참여"
    ]
  },
  {
    id: "4",
    company: "아이엔소프트",
    position: "개발사업본부 / 사원",
    period: "2011.12 - 2013.01",
    description: "SKT TEMS 제주 전기차 충전소 시스템 고도화, 사내 인력관리 시스템 운영, NOC SOAP 서버 어플리케이션 개발을 담당했습니다.",
    technologies: ["Java", "JavaScript", "MySQL", "SOAP", "CVS"],
    achievements: [
      "SKT TEMS 제주 전기차 충전소 시스템 고도화 (3~4차년도 참여)",
      "사내 인력관리 시스템(SUM) 운영 및 기능 개선",
      "NOC SOAP 서버 어플리케이션 개발 및 통신 연동"
    ]
  }
];

// 학력 정보
export const education: Education[] = [
  {
    id: "1",
    school: "한성대학교",
    degree: "학사",
    field: "지식정보학부",
    period: "2004 - 2013",
    description: "지식정보학부에서 도서관 정보 시스템과 데이터 관리에 대한 기초를 학습했습니다.",
    gpa: "N/A"
  }
];

// 기술 스택
export const skills: Skill[] = [
  // 프로그래밍 언어
  { name: "Java", level: 95, category: "language" },
  { name: "Python", level: 85, category: "language" },
  { name: "JavaScript", level: 80, category: "language" },
  { name: "Go", level: 70, category: "language" },
  
  // 데이터베이스
  { name: "Redis", level: 85, category: "database" },
  { name: "Redshift", level: 80, category: "database" },
  { name: "Athena", level: 75, category: "database" },
  { name: "DocumentDB", level: 80, category: "database" },
  { name: "Oracle", level: 85, category: "database" },
  { name: "MSSQL", level: 80, category: "database" },
  { name: "MySQL", level: 85, category: "database" },
  
  // 도구
  { name: "Docker", level: 80, category: "tool" },
  { name: "Linux", level: 85, category: "tool" },
  { name: "Airflow", level: 75, category: "tool" },
  { name: "Git", level: 90, category: "tool" },
  { name: "Jira", level: 85, category: "tool" },
  { name: "Confluence", level: 80, category: "tool" },
  { name: "Redmine", level: 75, category: "tool" },
  { name: "IntelliJ", level: 90, category: "tool" },
  { name: "VSCode", level: 85, category: "tool" },
  { name: "Eclipse", level: 80, category: "tool" }
];

// 프로젝트
export const projects: Project[] = [
  {
    id: "1",
    name: "카카오픽코마 데이터웨어하우스 설계 및 구현",
    description: "일본 픽코마를 위한 데이터웨어하우스 설계 및 구현 프로젝트입니다.",
    technologies: ["Java", "AWS", "Redshift", "Athena", "Airflow"],
    features: [
      "데이터웨어하우스 아키텍처 설계",
      "데이터 파이프라인 구축",
      "ETL 프로세스 구현"
    ]
  },
  {
    id: "2",
    name: "카카오픽코마 개인화 추천 시스템",
    description: "프랑스 픽코마를 위한 개인화 추천 시스템 구현 프로젝트입니다.",
    technologies: ["AWS Personalize", "Python", "Java"],
    features: [
      "AWS Personalize 기반 추천 시스템 구축",
      "개인화 알고리즘 구현",
      "실시간 추천 API 개발"
    ]
  },
  {
    id: "3",
    name: "넥슨 웹오피스 포털 개편",
    description: "넥슨 그룹 통합 사내 시스템 리뉴얼 프로젝트입니다.",
    technologies: ["Java", "JavaScript", "Oracle", "Git"],
    features: [
      "제로보드 → Java 기반 모놀리식 구조로 재설계",
      "DB 정규화 및 개편",
      "사내 통합 시스템 구축"
    ]
  }
];

// 자격증
export const certifications: Certification[] = [
  {
    id: "1",
    name: "OCJP",
    issuer: "Oracle",
    date: "2011",
    url: "https://education.oracle.com/"
  },
  {
    id: "2",
    name: "사무자동화산업기사",
    issuer: "한국산업인력공단",
    date: "2010",
    url: "https://www.q-net.or.kr/"
  }
];
