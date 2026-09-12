import { Profile } from '../../types/content';

/** English mirror of ko/profile.ts. Edit ko first, then sync. */
export const profile: Profile = {
  name: '김규호',
  nameEn: 'Kyuho Kim (Kyo)',
  title: 'Data Product Engineer & Team Lead',
  tagline:
    'An engineering leader who turned Kakao Piccoma\'s reading and revenue data into products practitioners use every day, from ingestion to visualization, and kept them running reliably. Eleven years of backend engineering underneath data platform design and operations, AI workflow adoption, and team leadership.',
  problems: [
    'Make analysis end up as the screen practitioners use for recurring decisions, not as a report.',
    'Make the data team run on documents, pipelines, and standards rather than on specific people.',
    'Bring AI agents into the data workflow safely, guardrails included.'
  ],
  location: 'Seoul, South Korea',
  email: 'rlarbghrbgh@gmail.com',
  links: [
    // TODO(kyo): LinkedIn URL
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/' }
  ],
  careerStart: '2011-12-01'
};
