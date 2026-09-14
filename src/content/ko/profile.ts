import { Profile } from '../../types/content';

/** 문체 규칙: 서술 문장은 합쇼체(~합니다), 제목·태그는 명사형. */
export const profile: Profile = {
  name: '김규호',
  nameEn: 'Kyuho Kim (Kyo)',
  title: 'Data Product Engineer & Team Lead',
  tagline:
    '카카오픽코마의 열람·매출 데이터를, 수집부터 시각화까지 "현업이 매일 쓰는 프로덕트"로 만들어 안정적으로 운영해 온 엔지니어링 리더입니다. 백엔드 11년의 토대 위에 데이터 플랫폼 설계·운영, AI 워크플로우 도입, 팀 리딩을 얹었습니다.',
  problems: [
    '분석 결과가 보고서에서 끝나지 않고, 현업의 반복 의사결정 화면이 되게 만듭니다.',
    '데이터 팀이 사람에 의존하지 않고 문서·파이프라인·표준 위에서 돌아가게 만듭니다.',
    'AI 에이전트를 가드레일까지 포함해 데이터 업무 흐름 안에 안전하게 넣습니다.'
  ],
  location: 'Seoul, South Korea',
  email: 'rlarbghrbgh@gmail.com',
  links: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/%EA%B7%9C%ED%98%B8-%EA%B9%80-669796135/' }
  ],
  careerStart: '2011-12-01',
  siteUrl: 'https://kyo-resume.vercel.app'
};
