import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Text with leading icon',
  apps: ['pfd', 'hs', 'rws'],
  cases: [
    {
      id: 'pfd-toolbar',
      name: 'Table toolbar',
      apps: ['pfd', 'hs', 'rws'],
      source: { pfd: 'src/pfd/ResultsTable.tsx', hs: 'src/hs/ResultsTable.tsx', rws: 'src/rws/output.tsx' },
    },
  ],
  source: { pfd: 'src/pfd/ResultsTable.tsx', hs: 'src/hs/ResultsTable.tsx', rws: 'src/rws/output.tsx' },
  summary: 'A quiet text Button with a leading icon runs one action in a toolbar: a CSV icon downloads the rows.',
  where: 'The last item of the toolbar row above the Output table, after the search field and the result count. Real site source: PFD src/pfd/ResultsTable.tsx, HS src/hs/ResultsTable.tsx and RWS src/rws/output.tsx (ResultToolbar), the same Button in all three; HCS only has an export in dead code, and ACE, ADM, PBS, FD, AGPD and ADC have none. The scroll helpers that share this look sit as a pair in the Output header: see the Button group Button-023.',
  when: 'Use it for one-click export of the rows the table shows. Keep Download CSV last in the toolbar so the filters read first, and disable it while the table has no rows (HS and RWS do; PFD always enables it).',
  how: 'Set aui color "secondary", paint "text", scale "sm" and shape "soft" (profile "default"), with a Button.Icon "file-csv" before the label, and sx flex "none" so it never shrinks in the wrapping row (RWS writes the label in capitals, DOWNLOAD CSV, and the Button is the same). The example and the scene render this one Button. The scene shows the toolbar row of PFD, HS and RWS: sm controls with gap 8 that wrap, the search field filling the line, the muted count, then the button. Left out: Reset filters (PFD, HS), the Show Optimized Models switch (RWS), the product filter, the table and the notes.',
});
