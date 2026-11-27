import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'job-table', name: 'Job tally table', selector: '[class~="aui-table"]', description: 'The Table of jobs; the Edit and Delete links live in its first column next to the Job column.' },
  { id: 'job-cell', name: 'Job cell', selector: '[class~="aui-table-body"] [class~="aui-table-cell"]:last-child', description: 'The Job 1 label in the row beside the link cell.' },
];

export default defineUsecase({
  uiType: 'Button group',
  title: 'Edit and Delete row link buttons',

  apps: ['ace'],
options: [
    { id: "ace-links", contextAnatomy: CONTEXT_ANATOMY, name: "Edit and Delete links", apps: ["ace"], source: {"ace":"src/features/calculation/ui/CalculationOutput.tsx"} ,
     contextAnatomyOverrides: [{"id":"job-table","lesson":{"explanation":"Jobs table puts Edit and Delete links beside the Job column.","scope":"context"}},{"id":"job-cell","lesson":{"explanation":"The Job 1 label in the row beside the link cell.","scope":"context"}}]},
  ],
  source: { ace: 'src/features/calculation/ui/CalculationOutput.tsx' },
  summary: 'Text Buttons with no padding read as links; stacked in a column they give a table row its few actions while the table stays light.',
  where: 'The first cell of each row of a saved-list table. Real site source: ACE src/features/calculation/ui/CalculationOutput.tsx (Edit and Delete as stacked link-like Buttons in the first cell of the Job tally). '
    + 'The other apps have no link-like row Buttons.',
  when: 'Use it for row actions in a table that must stay light and where the actions are few; for two often-used actions prefer the tonal pair of Button-025. '
    + 'Unlike the inline link of Button-004 it keeps the secondary color and no underline.',
  how: 'Set aui color "secondary", paint "text", scale "sm" and profile "no-padding". '
    + 'In context the Buttons are stacked in a column and start-aligned in the first cell of a Job tally row; ACE hides Edit on the selected row and Delete while only one job exists. '
    + 'The other columns and the totals row are left out.',
  anatomy: [
    { id: 'stack', name: 'Link stack', selector: '[data-ug-part="link-stack"]', description: 'The no-padding column, start-aligned, that stacks Edit above Delete so the row keeps its light, text-like look.' , lesson: {"explanation":"No-padding column stacks Edit above Delete at the start."}},
    { id: 'edit', name: 'Edit', selector: '[class~="aui-button"]:not([aria-label]):first-of-type', description: 'Secondary text Edit with profile no-padding, so it reads as a link rather than a button.' , lesson: {"explanation":"No-padding secondary Edit reads like a text link."}},
    { id: 'delete', name: 'Delete', selector: '[class~="aui-button"]:not([aria-label]):last-of-type', description: 'Secondary text Delete, styled like Edit; it is not tinted as destructive.' , lesson: {"explanation":"Secondary text Delete, styled like Edit; it is not tinted as destructive."}},
    { id: 'cell', name: 'Actions cell', selector: '[class~="aui-table-cell"]:first-child', description: 'ACE Job tally: the left-aligned first cell of the row that holds the stacked links next to the Job 1 value.' , lesson: {"explanation":"ACE Job tally cell places both links beside Job 1."}},
    { id: 'header-cell', name: 'Actions header', selector: '[class~="aui-table-header-cell"]:first-child', description: 'The unlabeled Actions column heading (raised) above the links.' , lesson: {"explanation":"The unlabeled Actions column heading (raised) above the links."}},
  ],
});
