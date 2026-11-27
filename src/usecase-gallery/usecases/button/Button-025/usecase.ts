import { defineUsecase } from '../../../define';

const HS_CONTEXT = [
  { id: 'list-table', name: 'Job List table', selector: '[class~="aui-table"]', description: 'The Table that lists the saved rows; only the first action column and the Job column are kept.' },
  { id: 'name-cell', name: 'Job cell', selector: '[class~="aui-table-body"] [class~="aui-table-cell"]:last-child', description: 'The row label (Job 1) beside the action cell.' },
];

const PBS_CONTEXT = [
  { id: 'list-table', name: 'Connection List table', selector: '[class~="aui-table"]', description: 'The Table that lists the saved rows; only the first action column and the Connection column are kept.' },
  { id: 'name-cell', name: 'Connection cell', selector: '[class~="aui-table-body"] [class~="aui-table-cell"]:last-child', description: 'The row label (Connection 1) beside the action cell.' },
];

export default defineUsecase({
  uiType: 'Button group',
  title: 'Edit and Duplicate row buttons',

  apps: ['hs', 'pbs'],
options: [
    { id: "hs-edit", contextAnatomy: HS_CONTEXT, name: "Side by side actions", apps: ["hs"], source: {"hs":"src/hs/OutputPane.tsx"} ,
     contextAnatomyOverrides: [{"id":"list-table","lesson":{"explanation":"Table keeps the saved-row action column beside Job or Connection.","scope":"context"}},{"id":"name-cell","lesson":{"explanation":"The row label (Job 1) beside the action cell.","scope":"context"}}]},
    { id: "pbs-edit", contextAnatomy: PBS_CONTEXT, name: "Stacked row actions", apps: ["pbs"], source: {"pbs":"src/ResultsSection.tsx"} ,
     contextAnatomyOverrides: [{"id":"list-table","lesson":{"explanation":"Table keeps the saved-row action column beside Job or Connection.","scope":"context"}},{"id":"name-cell","lesson":{"explanation":"The row label (Connection 1) beside the action cell.","scope":"context"}}]},
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
    { id: 'cell', name: 'First cell', selector: '[class~="aui-table-cell"]:first-child', description: 'The first cell of a saved-list row: HS lays Edit and Duplicate side by side, left-aligned, while PBS stacks them in a centred column.' , lesson: {"explanation":"First saved-list cell pairs Edit and Duplicate side by side or stacked."}},
    { id: 'edit', name: 'Edit', selector: '[class~="aui-button"]:not([aria-label]):first-of-type', description: 'The tonal secondary Edit that reopens the saved job (HS) or connection (PBS) for changes.' , lesson: {"explanation":"Tonal secondary Edit reopens the saved job or connection."}},
    { id: 'duplicate', name: 'Duplicate', selector: '[class~="aui-button"]:not([aria-label]):last-of-type', description: 'The tonal secondary Duplicate that copies the row; same colour and size as Edit so the two read as a pair of equal row actions.' , lesson: {"explanation":"Matching tonal Duplicate copies the selected saved row."}},
    { id: 'header-cell', name: 'Header cell', selector: '[class~="aui-table-header-cell"]:first-child', description: 'The unlabeled first column heading (aria-label "Edit or duplicate") above the action buttons.' , lesson: {"explanation":"Unnamed first column labels its action buttons for assistive technology."}},
    { id: 'stack', name: 'Button stack', selector: '[data-ug-part="row-actions"]', description: 'PBS only: the column (gap 8, centred) that stacks Edit above Duplicate inside the cell.' , lesson: {"explanation":"PBS centers Edit above Duplicate with an 8px gap."}},
  ],
});
