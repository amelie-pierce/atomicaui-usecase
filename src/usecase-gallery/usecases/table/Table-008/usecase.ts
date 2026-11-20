import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Data table',
  title: 'Print table totals row',
  apps: ['ace'],
  cases: [
    {
      id: 'ace-print-totals',
      name: 'Print table',
      apps: ['ace'],
      source: { ace: 'src/features/print/ui/report-primitives.tsx' },
    },
  ],
  source: {
    ace: 'src/features/print/ui/report-primitives.tsx',
  },
  summary: 'A bold Table.Foot row that totals the columns of a table in the printed report.',
  where: 'The ACE printed report table (print/ui/report-primitives.tsx): a bold footer row under the dense print grid.',
  when: 'Use it for the totals line of a printed table that sums the rows above. For the totals row of a results table on screen use Table-007; for a paper copy without totals use the Print table (Table-006).',
  how: 'The dense print grid of Table-006 with a Table.Foot row whose cells add typographyStyle "bold" to the print cell look (4px by 6px padding, centred). The scene keeps one body row and one column; the other columns and the report around it are left out.',
});
