import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Remove row button',
  look: 'Ghost, 28px',
  apps: ['hs', 'pbs'],
  cases: [
    { id: 'hs-remove', name: 'Remove', apps: ['hs', 'pbs'], source: { hs: 'src/hs/OutputPane.tsx', pbs: 'src/ResultsSection.tsx' } },
  ],
  source: { hs: 'src/hs/InputFields.tsx', pbs: 'src/ResultsSection.tsx' },
  summary: 'A square transparent trash IconButton, 28px, removes a row from a saved list after a confirmation.',
  where: 'The last cell of a saved-list row: the Job List of HS and the Connection List of PBS. Real site source: HS src/hs/OutputPane.tsx and PBS src/ResultsSection.tsx. The app opens a confirm dialog from it (AlertDialog-004).',
  when: 'Use it for the destructive action of a row; name the button with the row id in its aria-label (Remove <job> or <connection>).',
  how: 'One trash IconButton, aui color "secondary", paint "text", scale "sm" and the default square profile. The other columns are left out. One group, HS and PBS.',
});
