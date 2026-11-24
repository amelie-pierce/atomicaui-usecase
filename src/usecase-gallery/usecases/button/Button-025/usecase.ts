import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Button group',
  title: 'Edit and Duplicate row buttons',

  apps: ['hs', 'pbs'],
  options: [
    { id: "hs-edit", name: "Edit and Duplicate", apps: ["hs"], source: {"hs":"src/hs/OutputPane.tsx"} },
    { id: "pbs-edit", name: "Edit and Duplicate — UI variant 2", apps: ["pbs"], source: {"pbs":"src/ResultsSection.tsx"} },
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
  anatomy: [
    { id: 'cell', name: 'First cell', token: 'Table.Cell', selector: '[class~="aui-table-cell"]:first-child', description: 'The first cell of a saved-list row: HS lays Edit and Duplicate side by side, left-aligned, while PBS stacks them in a centred column.',
      code: `<Table.Cell aui={{ sx: { textAlign: 'left' } }}>
  {children}
</Table.Cell>` },
    { id: 'edit', name: 'Edit', token: 'Button', selector: '[class~="aui-button"]:not([aria-label]):first-of-type', description: 'The tonal secondary Edit that reopens the saved job (HS) or connection (PBS) for changes.',
      code: `<Button aui={{ color: 'secondary', paint: 'tonal', scale: 'sm' }}>Edit</Button>` },
    { id: 'duplicate', name: 'Duplicate', token: 'Button', selector: '[class~="aui-button"]:not([aria-label]):last-of-type', description: 'The tonal secondary Duplicate that copies the row; same colour and size as Edit so the two read as a pair of equal row actions.',
      code: `<Button aui={{ color: 'secondary', paint: 'tonal', scale: 'sm' }}>Duplicate</Button>` },
    { id: 'header-cell', name: 'Header cell', token: 'Table.HeaderCell', selector: '[class~="aui-table-header-cell"]:first-child', description: 'The unlabeled first column heading (aria-label "Edit or duplicate") above the action buttons.',
      code: `<Table.HeaderCell aui={{ color: 'raised' }} aria-label="Edit or duplicate" />` },
    { id: 'stack', name: 'Button stack', token: 'View', selector: '[data-ug-part="row-actions"]', description: 'PBS only: the column (gap 8, centred) that stacks Edit above Duplicate inside the cell.',
      code: `<View data-ug-part="row-actions" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8', alignItems: 'center' } }}>
  {children}
</View>` },
  ],
});
