import { Principle } from '../../types/content';

/** English mirror of ko/principles.ts. Each principle points at one case as evidence. */
export const principles: Principle[] = [
  {
    title: 'Define the real problem first',
    description: 'I do not build what was asked as asked. I first ask which recurring decision the request belongs to, and where.',
    caseId: 'B'
  },
  {
    title: '"Do practitioners use it repeatedly?" is the definition of done',
    description: 'Delivery is not implementation complete; it is adoption. Rollout and taking feedback are part of the work.',
    caseId: 'A'
  },
  {
    title: 'Records govern behavior',
    description: 'Decisions and their reasons are written down separately. Pipelines are the same: anyone should be able to read the contract, understand the state, and recover the same way.',
    caseId: 'E'
  },
  {
    title: 'When opinions differ, agree on criteria and boundaries, not on people',
    description: 'I do not persuade with technical taste. Agree the criteria first, then redraw the ownership boundary.',
    caseId: 'B'
  },
  {
    title: 'Make colleagues better than me',
    description: 'Pass on the context I hold so the team moves faster and more precisely. Design so the team\'s result is bigger than any individual\'s.'
  },
  {
    title: 'Questions before conclusions',
    description: '"Why did you build it this way?" comes first. "This direction is wrong" is not feedback; it is a disconnect.'
  },
  {
    title: 'As much as I can, but steadily',
    description: 'I value days that keep going without collapse more than a dazzling result bought by overreach.'
  }
];
