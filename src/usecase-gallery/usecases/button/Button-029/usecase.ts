import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Table',
  title: 'Add to list',
  apps: ['hs', 'ace', 'pbs'],
  source: {
    hs: 'src/hs/OutputPane.tsx',
    ace: 'src/features/calculation/ui/CalculationOutput.tsx',
    pbs: 'src/ResultsSection.tsx',
  },
  cases: [
    { id: 'hs-button', name: 'Add button', apps: ['hs'], source: { hs: 'src/hs/OutputPane.tsx' } },
    { id: 'ace-button', name: 'Add button', apps: ['ace'], source: { ace: 'src/features/calculation/ui/CalculationOutput.tsx' } },
    { id: 'pbs-row', name: 'Row add icon', apps: ['pbs'], source: { pbs: 'src/ResultsSection.tsx' } },
  ],
  summary: 'A solid secondary Button adds the current result to a job list, or a tonal plus IconButton adds a row.',
  where: 'Next to the results table that feeds a list. Real site source: HS src/hs/OutputPane.tsx (Add to Job List, first item of the table toolbar through ResultsTable `actions`); ACE src/features/calculation/ui/CalculationOutput.tsx (Add job, under the Job tally table); PBS src/ResultsSection.tsx (a plus IconButton in the first cell of each result row, Add to Connection List). ADM, PFD, HCS, FD, AGPD, RWS and ADC have no add-to-list Button.',
  when: 'Use the labelled Button when one result is chosen elsewhere (HS disables it until a result is selected or while a job is being edited), or to append an empty entry (ACE). Use the row icon when every row can be added on its own, and name it with a Tooltip and aria-label.',
  how: 'The example is the HS Button: aui color "secondary", paint "solid", scale "sm", text only. The preview shows the radio group of the types and, for Add button, a toggle of the apps. '
    + 'Add button: HS (the example, first item of the wrapping toolbar row, before the search field); ACE (the same recipe with Button.Icon plus before "Add job", under the table in a column with the table title, stretching across it). '
    + 'Row add icon: PBS only (IconButton plus, aui color "secondary", paint "tonal", scale "sm", shape "soft", inside a top Tooltip; first cell of every result row). '
    + 'Left out: the other columns and rows, the count, Reset filters, Download CSV and the edit-mode radio (PBS).',
});
