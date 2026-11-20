import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Button group',
  title: 'Edit and Duplicate row buttons',
  look: 'Tonal pair',
  apps: ['hs', 'pbs'],
  cases: [
    { id: 'hs-edit', name: 'Edit and Duplicate', apps: ['hs'], source: { hs: 'src/hs/OutputPane.tsx' } },
    { id: 'pbs-edit', name: 'Edit and Duplicate', apps: ['pbs'], source: { pbs: 'src/ResultsSection.tsx' } },
  ],
  source: { hs: 'src/hs/OutputPane.tsx', pbs: 'src/ResultsSection.tsx' },
  summary: 'Two tonal labelled Buttons in the first cell of a saved-list row edit or duplicate that row.',
  where: 'The first cell of a list of saved results (the Job List of HS, the Connection List of PBS). '
    + 'Real site source: HS src/hs/OutputPane.tsx (Edit and Duplicate side by side in the first cell); PBS src/ResultsSection.tsx (the same pair stacked in the first cell). '
    + 'The other apps have no per-row Buttons in a saved list.',
  when: 'Use labelled tonal Buttons where a row has two actions people reach for often. Keep the destructive one apart as an icon button (Button-038, Remove) and name icon-only buttons with an aria-label that carries the row id.',
  how: 'The example is the Edit and Duplicate pair: aui color "secondary", paint "tonal", scale "sm". The preview shows the radio group of the places, one for HS and one for PBS. '
    + 'Edit and Duplicate: HS (the two Buttons side by side in a left-aligned first cell); PBS (the same Buttons stacked in a column, gap 8, centred in a centred cell). '
    + 'Left out: every other column, the trash button, the totals row, the editing banner and the confirm dialogs.',
});
