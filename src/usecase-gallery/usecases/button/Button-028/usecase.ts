import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Toolbar',
  title: 'Download CSV',
  apps: ['pfd', 'hs', 'rws'],
  source: {
    pfd: 'src/pfd/ResultsTable.tsx',
    hs: 'src/hs/ResultsTable.tsx',
    rws: 'src/rws/output.tsx',
  },
  cases: [
    {
      id: 'pfd-toolbar',
      name: 'Results toolbar',
      apps: ['pfd', 'hs', 'rws'],
      source: { pfd: 'src/pfd/ResultsTable.tsx', hs: 'src/hs/ResultsTable.tsx', rws: 'src/rws/output.tsx' },
    },
  ],
  summary: 'A quiet text Button with a CSV icon downloads the results table, last in the table toolbar.',
  where: 'The end of the toolbar row above the Output table, after the search field and the result count. Real site source: PFD src/pfd/ResultsTable.tsx, HS src/hs/ResultsTable.tsx and RWS src/rws/output.tsx (ResultToolbar). The three write the same Button; HCS only has an export in dead code, and ACE, ADM, PBS, FD, AGPD and ADC have none.',
  when: 'Use it for one-click export of the rows the table shows. Keep it last in the toolbar so the filters read first, and disable it while the table has no rows (HS and RWS do; PFD always enables it).',
  how: 'Set aui color "secondary", paint "text", scale "sm", shape "soft" and sx flex "none" (it never shrinks in the wrapping row), with Button.Icon file-csv before the label. RWS writes the label in capitals (DOWNLOAD CSV); the Button is the same. In context it is the last item of the toolbar row: sm controls with gap 8 that wrap, the search field filling the line, the muted count, then the button. One scene covers the three apps, so there is no app toggle. Left out: Reset filters (PFD, HS), the Show Optimized Models switch (RWS), the product filter, the table and the notes.',
});
