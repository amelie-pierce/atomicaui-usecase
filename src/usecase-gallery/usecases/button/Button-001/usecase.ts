import { defineUsecase } from '../../../define';

export default defineUsecase({
  title: 'Primary action',
  summary: 'One solid Button marks the main action of a view.',
  where: 'The footer of a form or dialog, a card, or the end of a page: Save changes, Continue, Send.',
  when: 'Use it when one outcome is the expected next step. Keep a single primary action per view so the next step is obvious.',
  how: 'Set aui color to "primary" and paint to "solid". Label it with a verb, and pair it with a quieter secondary action.',
});
