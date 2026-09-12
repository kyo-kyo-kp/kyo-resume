import { Chapter } from '../../types/content';

/** English mirror of ko/journey.ts. `companies` are keys shared with resumeData; `companyLabels` are for display. */
export const chapters: Chapter[] = [
  {
    id: 'backend',
    title: 'Backend Foundations',
    period: '2011.12 – 2022.03',
    summary:
      'Commerce, enterprise, and game app servers. Order, settlement, and promotion flows plus POS integration for a mobile coupon commerce service; rebuilding a group intranet portal and HR systems; running game app backends.',
    lesson:
      'Restructuring is not a recent habit. Porting .NET to Java and rebuilding a board-based portal on a new structure taught me the difference between "it runs" and "it can be operated". That instinct carries straight over to how I read a data pipeline.',
    roles: ['Backend engineer', 'Platform development'],
    companies: ['아이엔소프트', '케이티엠하우스 (현 KT알파)', '넥슨코리아'],
    companyLabels: ['INSOFT', 'KT M hows (now KT alpha)', 'NEXON Korea']
  },
  {
    id: 'platform',
    title: 'Global Webtoon Platform',
    period: '2022.03 – 2024.06',
    summary: 'Settlement, personalized recommendations, data ETL, and KPI improvements at Piccoma France.',
    lesson:
      'Building settlement and recommendations taught me the data flows of the webtoon business first-hand. It was the turn from "making data" to "making data get used".',
    roles: ['Platform engineer'],
    companies: ['카카오픽코마'],
    companyLabels: ['Kakao Piccoma']
  },
  {
    id: 'data',
    title: 'Data Platform & Lead',
    period: '2024.07 – present',
    summary:
      'Data pipelines and the internal visualization platform for Piccoma Japan, plus segmentation, recommendations, and AI analysis. Led the team in practice from October 2025 and became Data Intelligence team lead in January 2026.',
    lesson:
      'A data team is done not when the screen ships but when practitioners use it repeatedly. And a team lead\'s job is not to code more but to set scope and priorities so each member finds their role and can work steadily.',
    roles: ['Data engineer', 'Data Intelligence team lead'],
    companies: ['카카오픽코마'],
    companyLabels: ['Kakao Piccoma']
  }
];
