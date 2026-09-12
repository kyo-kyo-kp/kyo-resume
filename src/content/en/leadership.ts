import { Leadership } from '../../types/content';

/** English mirror of ko/leadership.ts. Three sentences plus one case of adopting a team member's judgment. */
export const leadership: Leadership = {
  situation:
    'I led the team in practice from October 2025 and became team lead in January 2026. Headcount reduction, a transfer from another team, hiring, and onboarding all landed in the same period, and the operating scope stayed the same.',
  principle:
    'After becoming lead I kept implementing pipelines, APIs, and the data map myself. At the same time I took making sure the work does not depend on any one person as the lead\'s job: I rebuilt the weekly, monthly, and sprint rhythm, ground rules, runbooks, and onboarding documents, and designed the job description and interview questions myself.',
  result:
    'Operating scope was kept, not cut. New joiners onboarded from the documents, and the team attended external training and seminars together to raise our data skills. Since I took over the team, monthly average visitors to the internal visualization platform have grown about fourfold year on year (by GA). Many improvements, feedback gathered on three headquarters trips this year, and new feature releases worked together.',
  /**
   * TODO(kyo): one decision changed by adopting a team member's judgment.
   * Selection — ① my first opinion was different ② the member's call was later validated in operation ③ it can be told without internal system names.
   * Format — title: what changed / description: my first view → the member's reasoning → why I accepted → the outcome (three sentences).
   */
  teamDecision: undefined,
  caseId: 'E'
};
