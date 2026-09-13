import { Chapter } from '../../types/content';

/** 3막 타임라인. companies 는 resumeData.experiences 의 company 와 일치. 서술 문장은 합쇼체. */
export const chapters: Chapter[] = [
  {
    id: 'backend',
    title: 'Backend Foundations',
    period: '2011.12 – 2022.03',
    summary:
      '커머스, 엔터프라이즈, 게임 앱 서버를 거쳤습니다. 모바일 쿠폰 커머스의 주문·정산·프로모션과 POS 연동, 그룹 사내 포털·HR 시스템 리빌딩, 게임 앱 백엔드 운영을 맡았습니다.',
    lesson:
      '구조 재설계는 최근에 생긴 습관이 아닙니다. 닷넷을 Java로, 게시판 기반 포털을 새 구조로 다시 세우며 "돌아가는 것"과 "운영되는 것"의 차이를 배웠습니다. 이 감각이 데이터 파이프라인을 볼 때도 그대로 쓰입니다.',
    roles: ['백엔드 개발자', '플랫폼 개발'],
    companies: ['아이엔소프트', '케이티엠하우스 (현 KT알파)', '넥슨코리아'],
    companyLabels: ['아이엔소프트', '케이티엠하우스 (현 KT알파)', '넥슨코리아']
  },
  {
    id: 'platform',
    title: 'Global Webtoon Platform',
    period: '2022.03 – 2024.06',
    summary: '프랑스 픽코마에서 정산, 개인화 추천, 데이터 ETL, KPI 고도화를 수행했습니다.',
    lesson:
      '정산과 추천을 만들며 웹툰 비즈니스의 데이터 흐름을 몸으로 익혔습니다. 데이터를 "만드는 쪽"에서 "쓰이게 하는 쪽"으로 옮겨 가는 계기가 됐습니다.',
    roles: ['플랫폼 엔지니어'],
    companies: ['카카오픽코마'],
    companyLabels: ['카카오픽코마']
  },
  {
    id: 'data',
    title: 'Data Platform & Lead',
    period: '2024.07 – 현재',
    summary:
      'DW 파이프라인이 없던 일본 픽코마에 데이터 파이프라인을 처음부터 설계·구축했고, 사내 시각화 플랫폼과 세그먼트·추천·AI 분석을 맡고 있습니다. 2025년 10월부터 실질적으로 팀을 리딩하고 2026년 1월 데이터인텔리전스 팀장이 됐습니다.',
    lesson:
      '데이터 팀의 완성은 화면이 아니라 "현업이 반복해서 쓰는가"였습니다. 팀장이 된 뒤에도 파이프라인과 API를 직접 구현하면서, 동시에 팀원이 각자 역할을 찾고 안정적으로 일할 수 있게 범위와 우선순위를 정리하는 일을 함께 맡았습니다.',
    roles: ['데이터 엔지니어', '데이터인텔리전스 팀장'],
    companies: ['카카오픽코마'],
    companyLabels: ['카카오픽코마']
  }
];
