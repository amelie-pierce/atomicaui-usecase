import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'jobs-table', name: 'Jobs table', selector: '[class~="aui-table"]', description: 'The Table of jobs; the trash button sits in its last column after the Job column.' },
  { id: 'job-name', name: 'Job cell', selector: '[class~="aui-table-body"] [class~="aui-table-cell"]:first-child', description: 'The Job 1 label that the Remove Job 1 button belongs to.' },
];

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Remove row button',

  apps: ['hs', 'pbs'],
    layers: [
        {"id":"remove","partId":"remove","title":"Remove","explanation":"The 28px square transparent secondary trash button in the last cell of a row; the HS scene names it Remove Job 1 and the confirmation follows the click.","keyIdea":"The row action removes the named job after the confirmation flow.","selector":"[class~=\"aui-button\"][aria-label^=\"Remove\"]"},
        {"id":"remove-icon","partId":"remove-icon","title":"Trash icon","explanation":"The trash glyph centred in the button.","keyIdea":"The trash glyph conveys removal of the job row.","selector":"[class~=\"aui-button\"][aria-label^=\"Remove\"] > :is([class~=\"aui-icon\"], [class~=\"aui-contained-icon\"])"},
        {"id":"cell","partId":"cell","title":"Remove cell","explanation":"The last cell of the Job 1 row that holds the trash button next to the job name.","keyIdea":"The final cell reserves a stable position for row removal.","selector":"[class~=\"aui-table-cell\"]:last-child"},
        {"id":"header-cell","partId":"header-cell","title":"Remove header","explanation":"The unlabeled column heading (aria-label Remove) above the trash buttons.","keyIdea":"The blank heading labels the removal column for assistive technology.","selector":"[class~=\"aui-table-header-cell\"]:last-child"},
      ],
options: [
    { id: "hs-remove", contextAnatomy: CONTEXT_ANATOMY, name: "Remove", apps: ["hs","pbs"], source: {"hs":"src/hs/OutputPane.tsx","pbs":"src/ResultsSection.tsx"} ,
      contextLayers: [
        {"id":"context-jobs-table","partId":"jobs-table","title":"Jobs table","explanation":"The Table of jobs; the trash button sits in its last column after the Job column.","keyIdea":"The jobs table groups each row with its trailing remove action.","selector":"[class~=\"aui-table\"]","scope":"context"},
        {"id":"context-job-name","partId":"job-name","title":"Job cell","explanation":"The Job 1 label that the Remove Job 1 button belongs to.","keyIdea":"The job label identifies which entry the remove control belongs to.","selector":"[class~=\"aui-table-body\"] [class~=\"aui-table-cell\"]:first-child","scope":"context"},
      ],
    },
  ],
  source: { hs: 'src/hs/InputFields.tsx', pbs: 'src/ResultsSection.tsx' },
  summary: 'A square transparent trash IconButton, 28px, removes a row from a saved list after a confirmation.',
  where: 'The last cell of a saved-list row: the Job List of HS and the Connection List of PBS. Real site source: HS src/hs/OutputPane.tsx and PBS src/ResultsSection.tsx. The app opens a confirm dialog from it (AlertDialog-004).',
  when: 'Use it for the destructive action of a row; name the button with the row id in its aria-label (Remove <job> or <connection>).',
  how: 'One trash IconButton, aui color "secondary", paint "text", scale "sm" and the default square profile. The other columns are left out. One group, HS and PBS.',
  anatomy: [
    { id: 'remove', name: 'Remove', selector: '[class~="aui-button"][aria-label^="Remove"]', description: 'The 28px square transparent secondary trash button in the last cell of a row; the HS scene names it Remove Job 1 and the confirmation follows the click.' },
    { id: 'remove-icon', name: 'Trash icon', selector: '[class~="aui-button"][aria-label^="Remove"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])', description: 'The trash glyph centred in the button.' },
    { id: 'cell', name: 'Remove cell', selector: '[class~="aui-table-cell"]:last-child', description: 'The last cell of the Job 1 row that holds the trash button next to the job name.' },
    { id: 'header-cell', name: 'Remove header', selector: '[class~="aui-table-header-cell"]:last-child', description: 'The unlabeled column heading (aria-label Remove) above the trash buttons.' },
  ],
});
