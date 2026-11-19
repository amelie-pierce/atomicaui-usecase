import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Results',
  title: 'Results grid',
  apps: ['hcs', 'hs', 'pfd', 'agpd', 'pbs', 'rws', 'fd', 'ace'],
  source: {
    hcs: 'src/components/F01Results.tsx',
    hs: 'src/hs/ResultsTable.tsx',
    pfd: 'src/pfd/ResultsTable.tsx',
    agpd: 'src/agpd/Results.tsx',
    pbs: 'src/ResultsSection.tsx',
    rws: 'src/rws/output.tsx',
    fd: 'src/components/Results.jsx',
    ace: 'src/features/calculation/ui/CalculationOutput.tsx',
  },
  cases: [
    {
      id: 'hcs-results-grid',
      name: 'Results grid',
      apps: ['hcs', 'hs', 'pfd', 'agpd', 'pbs', 'rws', 'fd', 'ace'],
      source: {
        hcs: 'src/components/F01Results.tsx',
        hs: 'src/hs/ResultsTable.tsx',
        pfd: 'src/pfd/ResultsTable.tsx',
        agpd: 'src/agpd/Results.tsx',
        pbs: 'src/ResultsSection.tsx',
        rws: 'src/rws/output.tsx',
        fd: 'src/components/Results.jsx',
        ace: 'src/features/calculation/ui/CalculationOutput.tsx',
      },
    },
  ],
  summary: 'The results table of the Output pane: a framed all-cells grid with a raised sortable header, the first column pinned and left-aligned, and the other columns centred.',
  where: 'The Output pane of every calculator that lists candidate products: HCS F01Results.tsx (Connector calculation results), HS ResultsTable.tsx, PFD ResultsTable.tsx, AGPD Results.tsx (Gable plate results), PBS ResultsSection.tsx, RWS output.tsx and FD Results.jsx (Fastener solutions). ACE writes its Output tables the same way in CalculationOutput.tsx. Row selection, the expander and the column menu inside it are Table-002, Button-008 and IconButton-002.',
  when: 'Use it for a read-only grid of calculated results that scrolls on its own and keeps the first column in view. Header labels sit in a single span so a wrapped label stays one flex item inside the sort button. For a short summary of a few lines use the Calculation summary table (Table-003) instead.',
  how: 'Table with scale "sm", shape "soft" and a 1px outlined frame set through aui sx (gap 0, minHeight 0, the four border widths, borderColor "outlined"); border "all-cells", borderStyle "tonal"; scroll "self" with bodyFit "content" and fit "fill"; minInlineSize as the sum of the column widths; frozenColumns 1; sortable. headerCellAui sets color "raised" and textAlign "center". The table is composed by hand, so every Table.HeaderCell and Table.Cell carries its own aui (a cell aui replaces the table-level one): scale "sm", the same width token on the header and body cell (scroll "self" renders head and body as two tables, so a missing width misaligns them), textAlign "center" except the first column, which is "left". Each Table.HeaderCell passes sortDirection, onSortToggle and a title "Sort by ...". One group: all eight apps render this grid. Measured in headless Chromium: PFD and PBS pass a scale prop that renders "xs" and differ from "sm" only by 2px of cell height (xs 26/27px against sm 28/29px), with the same 4px 6px padding, 14px/18px type, 1px solid rgb(148, 163, 184) cell borders, raised header and a sticky white first column. ACE writes the same frame, widths and centring, but its tables have no sort buttons and no pinned first column (plain header labels, first body cell position static with a transparent background); that is an app-side omission against the HCS standard and is merged away. The scene leaves out the selection radio, the expander, the column menu, grouped rows, the thumbnail and the other columns.',
});
