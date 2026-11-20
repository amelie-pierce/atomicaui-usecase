import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Data table',
  title: 'Totals row',
  apps: ['ace', 'hs'],
  cases: [
    { id: 'ace-tally', name: 'Job tally', apps: ['ace'], source: { ace: 'src/features/calculation/ui/CalculationOutput.tsx' } },
    { id: 'hs-totals', name: 'Job tally', apps: ['hs'], source: { hs: 'src/hs/OutputPane.tsx' } },
    { id: 'ace-print-totals', name: 'Print table', apps: ['ace'], source: { ace: 'src/features/print/ui/report-primitives.tsx' } },
  ],
  source: {
    ace: 'src/features/calculation/ui/CalculationOutput.tsx',
    hs: 'src/hs/OutputPane.tsx',
  },
  summary: 'A Table.Foot row under the body that totals the columns above it, kept in view while the body scrolls.',
  where: 'ACE Job Tally results table (a Total row of per-product quantities), HS job list (a Fastener Totals label and the totals under it) and the ACE printed report table (a bold footer row).',
  when: 'Use it for a line that sums the rows above (a quantity per column, a list of totals) and belongs to the table, not to one row. A summary of values with no rows above it is the summary table (Table-003).',
  how: 'The same Table as the results grid (Table-001) with a Table.Foot after the Table.Body, holding Table.Row and Table.Cell like the body; Table.Foot is the part that makes it a variant, since no other table of the gallery writes it. Measured: the foot cells match the body cells (29px high, 4px 8px padding, 16px regular text, no fill), and with scroll "self" the foot is split out like the head and stays fixed while the body scrolls. Job tally, ACE: one Total row, the first cell left aligned (sx textAlign "left") and a total under each product column, in a striped table. Job tally, HS: two foot rows whose cells span columns (colSpan), the first a semi-bold Type "Fastener Totals" label and the second one Type per total line. Print table, ACE: the dense print grid of Table-004 with a foot row whose cells add typographyStyle "bold" to the print cell look (4px by 6px padding, centred). The scenes keep one body row and one product column; the row buttons, the extra columns and the dialogs are left out.',
});
