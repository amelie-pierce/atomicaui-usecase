import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Output header',
  contextVariant: 'helpers',
  title: 'Scroll helpers',
  apps: ['hcs', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  source: {
    hcs: 'src/useOutputNavigation.tsx',
    pfd: 'src/pfd/useOutputNavigation.tsx',
    pbs: 'src/useOutputNavigation.tsx',
    hs: 'src/hs/useOutputNavigation.tsx',
    fd: 'src/components/useOutputNavigation.jsx',
    agpd: 'src/agpd/outputNavigation.tsx',
    rws: 'src/rws/outputNavigation.tsx',
  },
  summary: 'Text Buttons with an arrow jump to the top of a long table or down to its notes.',
  where: 'The first two items of the Output pane header action group, shown only while the pane is scrolled; they do not float over the table. Real site source: HCS Button-009 (Back to top, Table Notes), built from src/useOutputNavigation.tsx (thresholds, labels) and the Output pane header in src/App.tsx; PFD, PBS, HS, FD, AGPD and RWS write the same pair in their own useOutputNavigation / outputNavigation file and place it first in their Output header action group (PFD: the only items of its plain header; the others: the start of the action group at the end of their header). ACE, ADM and ADC have no scroll helpers.',
  when: 'Use it for in-page jumps in a long scrolling view. Show each one only when it applies, and give it an aria-label that names the target.',
  how: "All seven apps write the same Buttons, so the preview has one scene and no app toggle. Set aui color \"secondary\", paint \"text\" and scale \"sm\" (profile \"default\"), with Button.Icon arrow-up or arrow-down before the label. In context they are the first two items of the Output header action group, shown as they are once the results are scrolled: the apps reveal Back to top after 80px of scroll (hides below 20px) and Table Notes while the notes heading is below the pane, and all seven turn both into square IconButtons with a Tooltip carrying the same label when the labels do not fit the header row (this scene shows the labelled state). The Print Output Button after them in the scene is HCS's neighbour (PFD, PBS, AGPD and RWS print from the menubar, and HS and FD put Configure columns (HS also Fullscreen) between them and Print); Configure columns, the toolbar and the table are left out.",
});
