/**
 * 리빌드(v3) 콘텐츠 타입.
 * 콘텐츠 파일(src/content/*)은 이 타입만 사용한다. 컴포넌트는 콘텐츠를 모른다.
 */

export type Locale = 'ko' | 'en';
export type ChapterId = 'backend' | 'platform' | 'data';
export type CaseId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export interface Link {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  nameEn: string;
  title: string;
  /** 포지셔닝 한 문장. 숫자 없음. */
  tagline: string;
  /** "내가 푸는 문제" 세 줄. Hero에 그대로 노출. */
  problems: string[];
  location: string;
  email: string;
  links: Link[];
  /** careerCalculator 입력. */
  careerStart: string;
}

export interface Criterion {
  title: string;
  description: string;
}

export interface PlatformStage {
  stage: string;
  problem: string;
  didWhat: string;
  stack: string[];
}

export interface Platform {
  headline: string;
  /** 회사가 공개한 수치 또는 자릿수 표현만. 문제 맥락에서 한 번만 쓴다. */
  scaleContext: string;
  problem: string;
  approach: string;
  change: string;
  /** "지금이라면 다르게" 한 줄. */
  differently: string;
  /** 재설계 판단 기준. */
  designCriteria: Criterion[];
  /** 범위 판단 한 줄. */
  scopeNote: string;
  stages: PlatformStage[];
  /** mermaid 소스. 역할 구조만, 시스템명 없음. */
  diagram: string;
  evidence?: string;
  /** 직접 구현과 팀의 몫 구분 한 줄. */
  myPart?: string;
  /** 합의 과정 — 의견이 갈렸을 때 기준과 경계로 푼 이야기. */
  collaboration?: string;
}

export interface Case {
  id: CaseId;
  /** 회사 불특정 역량 태그. */
  competency: string;
  /** 숫자 없는 한 줄. */
  title: string;
  problem: string;
  approach: string;
  change: string;
  stack: string[];
  /** 각주. 상대 지표만. */
  evidence?: string;
  period: string;
  chapter: ChapterId;
  /** 직접 구현한 부분. 팀장 직함과 개인 기여를 구분한다. */
  myPart?: string;
  /** 팀과 함께 달성한 부분. */
  teamPart?: string;
  /** 구조를 보여주는 mermaid 소스. 역할 구조만, 시스템명 없음. */
  diagram?: string;
}

export interface Principle {
  title: string;
  description: string;
  /** 원칙이 구호로 끝나지 않게, 근거가 되는 케이스 하나. */
  caseId?: CaseId;
}

export interface AiWorkflow {
  headline: string;
  /** 도입부. 결과는 케이스로 넘기고 이 섹션은 원칙에 집중한다는 한 줄. */
  intro: string;
  /** 결과를 담은 케이스 링크. */
  caseId?: CaseId;
  /** 어떻게 — 맥락화와 하네스. */
  how: string;
  /** 가드레일 도입부. */
  summary: string;
  guardrails: Criterion[];
  /** 정직하게 쓴 한계. 한 줄 이상 필수. */
  limitations: string[];
  diagram: string;
}

export interface Chapter {
  id: ChapterId;
  title: string;
  period: string;
  summary: string;
  /** 무엇을 배웠고 다음 막으로 어떻게 이어졌나. */
  lesson: string;
  roles: string[];
  /** resumeData.experiences 의 company 와 일치시키는 키(로케일 공통). */
  companies: string[];
  /** 화면 표시용 회사명(로케일별). 없으면 companies 를 그대로 쓴다. */
  companyLabels?: string[];
}

export interface SkillGroup {
  domain: string;
  /** 설계·운영까지 책임진 것 */
  operates: string[];
  /** 실무에서 사용 */
  uses: string[];
  /** 깊이에 대한 정직한 주석. 예: "LLM 도구를 활용해 운영하는 수준" */
  note?: string;
}

export interface Leadership {
  situation: string;
  principle: string;
  result: string;
  /** 팀원의 판단을 받아들여 바꾼 결정. "동료가 더 잘하게"의 근거. */
  teamDecision?: Criterion;
  caseId?: CaseId;
}

/** 로케일 하나의 전체 콘텐츠. ko/ 와 en/ 이 같은 모양을 가진다. */
export interface SiteContent {
  profile: Profile;
  platform: Platform;
  cases: Case[];
  principles: Principle[];
  aiWorkflow: AiWorkflow;
  chapters: Chapter[];
  stack: SkillGroup[];
  leadership: Leadership;
}
