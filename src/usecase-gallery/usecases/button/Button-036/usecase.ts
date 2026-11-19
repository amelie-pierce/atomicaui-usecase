import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Text link, no padding',
  apps: ['ace'],
  source: { ace: 'src/features/calculation/ui/CalculationOutput.tsx' },
  cases: [{ id: 'ace-links', name: 'Edit and Delete links', apps: ['ace'], source: { ace: 'src/features/calculation/ui/CalculationOutput.tsx' } }],
  summary: 'A text Button with no padding reads as a link and runs one row action while the table stays light.',
  where: 'The first cell of each row of a saved-list table. Real site source: ACE src/features/calculation/ui/CalculationOutput.tsx (Edit and Delete as stacked link-like Buttons in the first cell of the Job tally). The other apps have no link-like row Buttons.',
  when: 'Use it for row actions in a table that must stay light and where the actions are few; for two often-used actions prefer the tonal pair of Button-030. Unlike the inline link of Button-014 it keeps the secondary color and no underline.',
  how: 'Set aui color "secondary", paint "text", scale "sm" and profile "no-padding". In context the Buttons are stacked in a column and start-aligned in the first cell of a Job tally row; ACE hides Edit on the selected row and Delete while only one job exists. The other columns and the totals row are left out.',
});
