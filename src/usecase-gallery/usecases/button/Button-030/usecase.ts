import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Two buttons',
  title: 'Tonal pair',
  apps: ['hs', 'pbs', 'ace'],
  source: {
    hs: 'src/hs/OutputPane.tsx',
    pbs: 'src/ResultsSection.tsx',
    ace: 'src/features/calculation/ui/CalculationOutput.tsx',
  },
  cases: [
    { id: 'hs-edit', name: 'Edit and Duplicate', apps: ['hs'], source: { hs: 'src/hs/OutputPane.tsx' } },
    { id: 'pbs-edit', name: 'Edit and Duplicate', apps: ['pbs'], source: { pbs: 'src/ResultsSection.tsx' } },
    { id: 'hs-remove', name: 'Remove', apps: ['hs', 'pbs'], source: { hs: 'src/hs/OutputPane.tsx', pbs: 'src/ResultsSection.tsx' } },
    { id: 'ace-links', name: 'Edit and Delete links', apps: ['ace'], source: { ace: 'src/features/calculation/ui/CalculationOutput.tsx' } },
  ],
  summary: 'Buttons in the cells of a saved-list table edit, duplicate or remove that row: tonal labelled Buttons and a trash icon, or link-like text Buttons.',
  where: 'Cells of a list of saved results (the Job List of HS, the Connection List of PBS, the Job tally of ACE). Real site source: HS src/hs/OutputPane.tsx (Edit and Duplicate in the first cell, a trash IconButton in the last); PBS src/ResultsSection.tsx (the same pair stacked in the first cell, a trash IconButton in the last); ACE src/features/calculation/ui/CalculationOutput.tsx (Edit and Delete as stacked link-like Buttons in the first cell). The other apps have no per-row Buttons in a saved list.',
  when: 'Use labelled tonal Buttons where a row has two or three actions people reach for often, a trash IconButton for the destructive one (it opens a confirm dialog, Button-001 Delete confirm), and link-like text Buttons where the table must stay light. Name icon-only buttons with an aria-label that carries the row id.',
  how: 'The example is the Edit and Duplicate pair: aui color "secondary", paint "tonal", scale "sm". The preview shows the radio group of the types and a toggle of the apps where a type has two. '
    + 'Edit and Duplicate: HS (the two Buttons side by side in a left-aligned first cell); PBS (the same Buttons stacked in a column, gap 8, centred in a centred cell). '
    + 'Remove: HS and PBS (one trash IconButton, aui color "secondary", paint "text", scale "sm", in the last cell; the aria-label differs only in wording). '
    + 'Edit and Delete links: ACE only (Buttons with aui color "secondary", paint "text", scale "sm", profile "no-padding", stacked and start-aligned in the first cell; ACE hides Edit on the selected row and Delete while only one job exists). '
    + 'Left out: every other column, the totals row, the editing banner and the confirm dialogs.',
});
