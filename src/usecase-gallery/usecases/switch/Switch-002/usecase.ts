import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Switch',
  title: 'Switch with label',
  apps: ['hcs', 'hs', 'adm', 'pbs', 'rws', 'ace'],
  cases: [
    { id: 'hcs-labelled', name: 'Labelled switch', apps: ['hcs', 'hs'], source: { hcs: 'src/components/ColumnVisibility.tsx', hs: 'src/hs/ColumnVisibility.tsx' } },
    { id: 'adm-labelled', name: 'Labelled switch', apps: ['adm'], source: { adm: 'src/features/viewer/components/EditModals/BasePlateModal.tsx' } },
    { id: 'pbs-labelled', name: 'Labelled switch', apps: ['pbs', 'rws'], source: { pbs: 'src/ResultsSection.tsx', rws: 'src/rws/output.tsx' } },
    { id: 'ace-labelled', name: 'Labelled switch', apps: ['ace'], source: { ace: 'src/features/top-navigation/ui/FeedbackDialog.tsx' } },
  ],
  source: { hcs: 'src/components/ColumnVisibility.tsx', hs: 'src/hs/ColumnVisibility.tsx', adm: 'src/features/viewer/components/EditModals/BasePlateModal.tsx', pbs: 'src/ResultsSection.tsx', rws: 'src/rws/output.tsx', ace: 'src/features/top-navigation/ui/FeedbackDialog.tsx' },
  summary: 'A switch with its own text beside it that turns one option on or off.',
  where: 'HCS and HS: Group by model in the Configure columns popover. ADM: the draft switches of the Base plate editor. PBS and RWS: Show Optimized Models in the table toolbar. ACE: the dialog option Send me a copy (feedback form), and Download in Save as template, which writes the same switch.',
  when: 'Use it for one setting that applies at once and has a name of its own, with Switch.Label as the text so a click on the text toggles it. For a row of a list that names the switch, leave the label out (Switch-001); for a label at the start of a row and the switch at the far end, see Switch-001.',
  how: 'Compound Switch with a Switch.Label child; the gallery scene measured in headless Chromium has a 16px, 400 weight label 8px from the 44 by 22px track. The apps were not run; their props and states are read from the app source, and the groups follow the states each app writes. HCS, HS: states selected { color "primary", paint "solid" }; the scene measures on as rgb(255,83,8) with a white thumb at x=26, off as rgb(241,245,249) with no border and an rgb(18,18,18) thumb at x=4. ADM (TOGGLE_STATE_AUI): the same on, and off as rgb(255,255,255) with a 1px rgb(148,163,184) border and the thumb at x=5. PBS, RWS, ACE: no states, so the scene measures on and off both as rgb(241,245,249) and only the thumb moves (x=26 on, 4 off); PBS and RWS write scale "sm", which the scene measures at the same size as the default. The scenes show the switch enabled and on; RWS disables it when no optimized models exist. PBS and RWS share a toolbar scene; ACE has a separate feedback dialog scene. The scenes leave out the help trigger and other fields and controls of each container.',
});
