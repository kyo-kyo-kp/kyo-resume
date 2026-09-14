// 개인 정보 타입
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  summary: string;
  avatar?: string;
}

// 경력 정보 타입
export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
  achievements?: string[];
  /** Journey 3막 매핑. 없으면 회사명으로 매핑한다. */
  chapter?: 'backend' | 'platform' | 'data';
  /** 날짜가 붙은 연혁. 있으면 achievements 대신 렌더링한다. */
  milestones?: Milestone[];
  /** PDF 이력서용 2~3줄 요약. 없으면 milestones 를 쓴다. */
  summaryBullets?: string[];
}

/** 회사별 상세의 연혁 한 줄. caseId 가 있으면 케이스 카드로 링크한다. */
export interface Milestone {
  date: string;
  text: string;
  caseId?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
}

// 학력 정보 타입
export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  period: string;
  description?: string;
  gpa?: string;
}

// 기술 스택 타입
export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'language' | 'framework' | 'tool' | 'database' | 'cloud';
}

// 프로젝트 타입
export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  features?: string[];
}

// 자격증 타입
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  image?: string;
}

// 섹션 타입
export interface Section {
  id: string;
  title: string;
  component: React.ComponentType<any>;
}
