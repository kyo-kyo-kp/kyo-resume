import { Locale } from '../types/content';

export type SectionId = 'home' | 'platform' | 'stories' | 'how' | 'ai' | 'journey' | 'stack' | 'leadership' | 'contact';

export interface UiStrings {
  nav: Record<SectionId, string>;
  hero: { problemsLabel: string; email: string };
  platform: { eyebrow: string; title: string; problem: string; approach: string; change: string; differently: string; criteria: string; scope: string; stages: string; stage: string; didWhat: string; stack: string; diagram: string; evidence: string };
  stories: { eyebrow: string; title: string; subtitle: string; problem: string; approach: string; change: string; evidence: string };
  how: { eyebrow: string; title: string; seeCase: string };
  ai: { eyebrow: string; title: string; guardrails: string; limitations: string; diagram: string };
  journey: { eyebrow: string; title: string; careerTotal: (years: number, months: number) => string; lesson: string; details: string; achievements: string };
  stack: { eyebrow: string; title: string; operates: string; uses: string; learning: string; none: string };
  leadership: { eyebrow: string; title: string; situation: string; principle: string; result: string; teamDecision: string; seeCase: string };
  contact: { eyebrow: string; title: string; body: string; email: string };
  footer: { builtWith: string };
  toggles: { theme: string; locale: string };
  pdf: { label: string; busy: string };
}

const ko: UiStrings = {
  nav: { home: '홈', platform: '플랫폼', stories: '이야기', how: '일하는 방식', ai: 'AI 워크플로우', journey: '여정', stack: '스택', leadership: '리더십', contact: '연락' },
  hero: { problemsLabel: '내가 푸는 문제', email: '이메일' },
  platform: { eyebrow: '플랫폼', title: '수집부터 시각화까지, 끝에서 끝까지', problem: '문제', approach: '접근', change: '바뀐 것', differently: '지금이라면 다르게', criteria: '재설계 판단 기준', scope: '범위 판단', stages: '단계별로 내가 한 것', stage: '단계', didWhat: '내가 한 것', stack: '기술', diagram: '운영 중인 구조와 설계한 구조', evidence: '근거' },
  stories: { eyebrow: '이야기', title: '한 플랫폼 위의 일곱 이야기', subtitle: '문제가 먼저 옵니다. 숫자는 각주에만 둡니다.', problem: '문제', approach: '접근', change: '바뀐 것', evidence: '근거' },
  how: { eyebrow: '일하는 방식', title: '원칙은 케이스로 증명합니다', seeCase: '케이스' },
  ai: { eyebrow: 'AI 워크플로우', title: 'AI와 설계하고, 지킬 것은 직접 정합니다', guardrails: '가드레일', limitations: '정직하게 쓴 한계', diagram: '에이전트가 데이터에 닿는 경로' },
  journey: { eyebrow: '여정', title: '백엔드에서 데이터 플랫폼과 리더십까지', careerTotal: (y, m) => `총 경력 ${y}년 ${m}개월`, lesson: '배운 것', details: '회사별 상세', achievements: '주요 성과' },
  stack: { eyebrow: '스택', title: '설계·운영한 것과 아직 배우는 것', operates: '설계·운영', uses: '사용', learning: '학습 중', none: '—' },
  leadership: { eyebrow: '리더십', title: '팀이 사람에 의존하지 않게', situation: '상황', principle: '원칙', result: '결과', teamDecision: '팀원의 판단을 받아들인 결정', seeCase: '관련 케이스' },
  contact: { eyebrow: '연락', title: '더 궁금한 점이 있으시다면', body: '이메일이 가장 빠릅니다. 이력서 PDF는 상단 "PDF로 저장" 버튼으로 받을 수 있습니다.', email: '이메일 보내기' },
  footer: { builtWith: 'React · TypeScript · MUI 로 직접 만들었습니다.' },
  toggles: { theme: '테마 전환', locale: '언어 전환' },
  pdf: { label: 'PDF로 저장', busy: '인쇄 준비 중...' }
};

const en: UiStrings = {
  nav: { home: 'Home', platform: 'Platform', stories: 'Stories', how: 'How I work', ai: 'AI workflow', journey: 'Journey', stack: 'Stack', leadership: 'Leadership', contact: 'Contact' },
  hero: { problemsLabel: 'Problems I solve', email: 'Email' },
  platform: { eyebrow: 'Platform', title: 'From ingestion to visualization, end to end', problem: 'Problem', approach: 'Approach', change: 'What changed', differently: 'What I would do differently', criteria: 'Redesign criteria', scope: 'Scope decision', stages: 'What I did at each stage', stage: 'Stage', didWhat: 'What I did', stack: 'Stack', diagram: 'What runs today and what is designed', evidence: 'Evidence' },
  stories: { eyebrow: 'Stories', title: 'Seven stories on one platform', subtitle: 'The problem comes first. Numbers stay in the footnotes.', problem: 'Problem', approach: 'Approach', change: 'What changed', evidence: 'Evidence' },
  how: { eyebrow: 'How I work', title: 'Principles, each backed by a case', seeCase: 'Case' },
  ai: { eyebrow: 'AI workflow', title: 'Design with AI. Decide what to protect myself.', guardrails: 'Guardrails', limitations: 'Honest limitations', diagram: 'How agents reach the data' },
  journey: { eyebrow: 'Journey', title: 'From backend to data platform and leadership', careerTotal: (y, m) => `${y} years ${m} months in total`, lesson: 'What I learned', details: 'By company', achievements: 'Highlights' },
  stack: { eyebrow: 'Stack', title: 'What I have designed and run, and what I am still learning', operates: 'Design & operate', uses: 'Use', learning: 'Learning', none: '—' },
  leadership: { eyebrow: 'Leadership', title: 'So the team does not depend on any one person', situation: 'Situation', principle: 'Principle', result: 'Result', teamDecision: 'A decision changed by a team member\'s judgment', seeCase: 'Related case' },
  contact: { eyebrow: 'Contact', title: 'If you would like to know more', body: 'Email is fastest. Use "Save as PDF" in the header for a PDF copy.', email: 'Send an email' },
  footer: { builtWith: 'Hand-built with React · TypeScript · MUI.' },
  toggles: { theme: 'Toggle theme', locale: 'Switch language' },
  pdf: { label: 'Save as PDF', busy: 'Preparing...' }
};

export const strings: Record<Locale, UiStrings> = { ko, en };
