import { ResumeSummary } from '../../types/content';

/** English mirror of ko/resume.ts. Facts only; the narrative lives on the site. */
export const resume: ResumeSummary = {
  keyFacts: ['11 years of backend → data platform', '5 years of commerce platform backend (2013–2018)', '4 years of webtoon platform data (2022–)', 'Data Intelligence team lead (2026.01–)'],
  headlines: [
    { title: 'Designed and built the warehouse pipeline from scratch', detail: 'Piccoma Japan had none: ingestion (batch and real time) → 5-layer transformation → API → visualization. Airflow · Athena · Redshift' },
    { title: 'RFM segmentation productized → push targeting', detail: 'Data models defining and refreshing every user on three axes. Targeting went from ad-hoc extracts to a shared standard, adopted across organizations' },
    { title: 'AI analysis-report harness, built alone', detail: 'Titles, publishers, and company KPIs connected to data-map context. Six months of refinement; access requests from several organizations' },
    { title: 'Internal visualization platform redefined as a decision platform', detail: 'Stopped request-taking and remapped the structure through stakeholder interviews. Active users up 2–3x; a warehouse data map for the catalog' }
  ],
  detailNote: 'Seven detailed cases and architecture diagrams are on the site'
};
