import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Remove row button',

  apps: ['hs', 'pbs'],
  options: [
    { id: "hs-remove", name: "Remove", apps: ["hs","pbs"], source: {"hs":"src/hs/OutputPane.tsx","pbs":"src/ResultsSection.tsx"} },
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
