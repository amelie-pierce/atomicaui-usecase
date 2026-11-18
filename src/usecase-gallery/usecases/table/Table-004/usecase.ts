import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Print',
  title: 'Print table',
  apps: ['ace', 'adm', 'hs', 'rws', 'pbs', 'pfd', 'agpd'],
  source: {
    ace: 'src/features/print/ui/report-primitives.tsx',
    adm: 'src/features/print/components/InputDataPrintPage.tsx',
    hs: 'src/hs/PrintView.tsx',
    rws: 'src/legacy/src/apps/rws/containers/PrintView/components/PrintTable.jsx',
    pbs: 'src/PrintView.tsx',
    pfd: 'src/pfd/PrintView.tsx',
    agpd: 'src/App.tsx',
  },
  cases: [
    { id: 'ace-print', name: 'Print table', apps: ['ace'], source: { ace: 'src/features/print/ui/report-primitives.tsx' } },
    { id: 'adm-print', name: 'Print table', apps: ['adm'], source: { adm: 'src/features/print/components/InputDataPrintPage.tsx' } },
    { id: 'hs-print', name: 'Print table', apps: ['hs'], source: { hs: 'src/hs/PrintView.tsx' } },
    { id: 'rws-print', name: 'Print table', apps: ['rws'], source: { rws: 'src/legacy/src/apps/rws/containers/PrintView/components/PrintTable.jsx' } },
    { id: 'pbs-print', name: 'Print table', apps: ['pbs', 'pfd', 'agpd'], source: { pbs: 'src/PrintView.tsx', pfd: 'src/pfd/PrintView.tsx', agpd: 'src/App.tsx' } },
  ],
  summary: 'The paper copy of a table: a flat all-cells grid with no sorting or selection, printed in the report.',
  where: 'Print views: ACE print/ui/report-primitives.tsx (ReportTable), ADM print/components/InputDataPrintPage.tsx, HS PrintView.tsx, RWS PrintView PrintTable.jsx, PBS PrintView.tsx, PFD PrintView.tsx and AGPD App.tsx (the print table).',
  when: 'Use it on the print page only. The table has no sort button, selection or scroll. Pick the group of the app you build: the band colour, density, alignment and border colour differ and are not interchangeable.',
  how: 'Table with border "all-cells" and scale "xs"; cell and header-cell aui set the band. Five groups, measured in headless Chromium. ACE: text-coloured border rgb(0, 0, 0), no radius, header band painted muted (background rgb(71, 85, 105), text rgb(255, 255, 255)), cells 14px/18px with padding 6px 4px and centred. ADM: the same band and border with compact 12px/16px cells, padding 2px 4px, aligned left. HS: header cells painted secondary solid (background rgb(18, 18, 18), white text), 10/12 body type, borders rgb(148, 163, 184), start-aligned non-wrapping header labels and centred body cells. RWS: the HS table with centred header labels. PBS, AGPD and PFD: the bare xs table with 1px rgb(148, 163, 184) cell borders, header rgb(203, 213, 225) and 14px/18px cells with padding 4px 6px; PBS and AGPD measure identical, and PFD writes no border prop so its cells have 0px borders (an app-side omission against the PBS standard, merged away). The scenes leave out the bold footer row (ACE), the product image cell and the selected-row tint (HS), the checkbox footnotes (PBS) and repeated rows.',
});
