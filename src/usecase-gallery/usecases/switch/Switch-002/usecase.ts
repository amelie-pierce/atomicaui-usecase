import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Options',
  title: 'Labelled switch',
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
  when: 'Use it for one setting that applies at once and has a name of its own, with Switch.Label as the text so a click on the text toggles it. For a row of a list that names the switch, leave the label out (Switch-001); for a label at the start of a row and the switch at the far end, see Switch-003.',
  how: 'Compound Switch with a Switch.Label child; the label renders 16px, 400 weight, 8px from the 44 by 22px track. The apps differ in the track colours and are grouped by app. HCS, HS: states selected { color "primary", paint "solid" }; on is the orange fill (255,83,8) with a white thumb, off a pale slate track (241,245,249) with a dark thumb. ADM: the same on, and an off track that is white with a 1px slate border (148,163,184), from the unselected tonal surface state. PBS, RWS, ACE: no states, so the track is the pale slate (241,245,249) in both positions and only the thumb moves (right when on, dark); PBS and RWS write scale "sm", which renders the same size as the default ACE. These differences are in the app styling only and are noted here; the toggle lists the apps. The scenes show the switch enabled and on; RWS disables it when no optimized models exist. PBS and RWS share a toolbar scene; ACE has a separate feedback dialog scene. The scenes leave out the help trigger and other fields and controls of each container.',
});
