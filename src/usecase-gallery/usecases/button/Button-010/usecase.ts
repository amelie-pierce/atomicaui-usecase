import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Text with leading icon',
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
    {
      id: 'pfd-toolbar',
      name: 'Table toolbar',
      apps: ['pfd', 'hs', 'rws'],
      source: { pfd: 'src/pfd/ResultsTable.tsx', hs: 'src/hs/ResultsTable.tsx', rws: 'src/rws/output.tsx' },
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
  summary: 'Quiet text Buttons with a leading icon run one action in a toolbar: an arrow jumps to the top of a long table or down to its notes, and a CSV icon downloads the rows.',
  where: 'The first two items of the Output pane header action group, shown only while the pane is scrolled (they do not float over the table); and the last item of the toolbar row above the Output table, after the search field and the result count. Real site source: HCS Button-009 (Back to top, Table Notes), built from src/useOutputNavigation.tsx (thresholds, labels) and the Output pane header in src/App.tsx; PFD, PBS, HS, FD, AGPD and RWS write the same pair in their own useOutputNavigation / outputNavigation file and place it first in their Output header action group (PFD: the only items of its plain header; the others: the start of the action group at the end of their header). ACE, ADM and ADC have no scroll helpers. Download CSV: PFD src/pfd/ResultsTable.tsx, HS src/hs/ResultsTable.tsx and RWS src/rws/output.tsx (ResultToolbar), the same Button in all three; HCS only has an export in dead code, and ACE, ADM, PBS, FD, AGPD and ADC have none.',
  when: 'Use it for in-page jumps in a long scrolling view, showing each one only when it applies with an aria-label that names the target, and for one-click export of the rows the table shows. Keep Download CSV last in the toolbar so the filters read first, and disable it while the table has no rows (HS and RWS do; PFD always enables it).',
  how: 'Set aui color "secondary", paint "text" and scale "sm" (profile "default"), with a Button.Icon before the label: arrow-up or arrow-down for the scroll helpers, file-csv for Download CSV (which also sets shape "soft" and sx flex "none" so it never shrinks in the wrapping row; RWS writes the label in capitals, DOWNLOAD CSV, and the Button is the same). The preview shows the radio group of the places; each has one group of apps, so there is no app toggle. '
    + 'Output header: HCS, PFD, PBS, HS, FD, AGPD and RWS write the same Buttons. They are the first two items of the Output header action group, shown as they are once the results are scrolled: the apps reveal Back to top after 80px of scroll (hides below 20px) and Table Notes while the notes heading is below the pane, and all seven turn both into square IconButtons with a Tooltip carrying the same label when the labels do not fit the header row (this scene shows the labelled state). The Print Output Button after them in the scene is HCS\'s neighbour (PFD, PBS, AGPD and RWS print from the menubar, and HS and FD put Configure columns (HS also Fullscreen) between them and Print); Configure columns, the toolbar and the table are left out. '
    + 'Table toolbar: PFD, HS and RWS (the last item of the toolbar row: sm controls with gap 8 that wrap, the search field filling the line, the muted count, then the button). Left out: Reset filters (PFD, HS), the Show Optimized Models switch (RWS), the product filter, the table and the notes.',
});
