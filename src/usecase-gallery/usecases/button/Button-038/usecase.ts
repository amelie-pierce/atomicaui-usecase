import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Button group',
  title: 'Text pair with leading icons',
  apps: ['hcs', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  cases: [
    {
      id: 'hcs-output-header',
      name: 'Output header',
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
    },
  ],
  source: {
    hcs: 'src/useOutputNavigation.tsx',
    pfd: 'src/pfd/useOutputNavigation.tsx',
    pbs: 'src/useOutputNavigation.tsx',
    hs: 'src/hs/useOutputNavigation.tsx',
    fd: 'src/components/useOutputNavigation.jsx',
    agpd: 'src/agpd/outputNavigation.tsx',
    rws: 'src/rws/outputNavigation.tsx',
  },
  summary: 'Two quiet text Buttons with a leading icon sit together in a header: an arrow jumps to the top of a long table and another down to its notes.',
  where: 'The first two items of the Output pane header action group, shown only while the pane is scrolled (they do not float over the table). Real site source: HCS (Back to top, Table Notes), built from src/useOutputNavigation.tsx (thresholds, labels) and the Output pane header in src/App.tsx; PFD, PBS, HS, FD, AGPD and RWS write the same pair in their own useOutputNavigation / outputNavigation file and place it first in their Output header action group (PFD: the only items of its plain header; the others: the start of the action group at the end of their header). ACE, ADM and ADC have no scroll helpers. The lone Download CSV Button of the table toolbar is the Single button Button-010.',
  when: 'Use it for in-page jumps in a long scrolling view, showing each one only when it applies with an aria-label that names the target.',
  how: 'Set aui color "secondary", paint "text" and scale "sm" (profile "default") on both Buttons, each with a Button.Icon before the label: arrow-up for Back to top and arrow-down for Table Notes. HCS, PFD, PBS, HS, FD, AGPD and RWS write the same Buttons. They are the first two items of the Output header action group, shown as they are once the results are scrolled: the apps reveal Back to top after 80px of scroll (hides below 20px) and Table Notes while the notes heading is below the pane, and all seven turn both into square icon Buttons with a Tooltip carrying the same label when the labels do not fit the header row (this scene shows the labelled state). The Print Output Button after them in the scene is HCS\'s neighbour (PFD, PBS, AGPD and RWS print from the menubar, and HS and FD put Configure columns (HS also Fullscreen) between them and Print); Configure columns and the table are left out.',
});
