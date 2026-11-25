import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Data table',
  title: 'Print table totals row',
  apps: ['ace'],
  options: [
    { id: "ace-print-totals", name: "Print table", showContext: false, apps: ["ace"], source: {"ace":"src/features/print/ui/report-primitives.tsx"} },
  ],
  source: {
    ace: 'src/features/print/ui/report-primitives.tsx',
  },
  summary: 'A bold Table.Foot row that totals the columns of a table in the printed report.',
  where: 'The ACE printed report table (print/ui/report-primitives.tsx): a bold footer row under the dense print grid.',
  when: 'Use it for the totals line of a printed table that sums the rows above. For the totals row of a results table on screen use Table-007; for a paper copy without totals use the Print table (Table-006).',
  how: 'The dense print grid of Table-006 with a Table.Foot row whose cells add typographyStyle "bold" to the print cell look (4px by 6px padding, centred). The scene keeps one body row and one column; the other columns and the report around it are left out.',
  anatomy: [
    {
      id: 'table',
      name: 'Table',
      selector: '[class~="aui-table"]',
      description: 'Print report table at scale "xs": no profile padding, shape "none", a text-coloured border, all cells ruled, scroll="parent" and selectionMode "none".',
    },
    {
      id: 'head',
      name: 'Header',
      selector: '[class~="aui-table-head"]',
      description: 'Muted header band printed with Model and Qty.',
    },
    {
      id: 'header-cell',
      name: 'Header cell',
      selector: '[class~="aui-table-header-cell"]',
      description: 'Centred label on the muted fill with a surface-coloured foreground and wrapping allowed.',
    },
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-table-body"]',
      description: 'The line items being totalled, here Model B-200 with quantity 4.',
    },
    {
      id: 'row',
      name: 'Row',
      selector: '[class~="aui-table-row"]',
      description: 'One printed line item.',
    },
    {
      id: 'cell',
      name: 'Cell',
      selector: '[class~="aui-table-cell"]',
      description: 'Centred cell with 4px inline and 6px block padding shared through the CELL constant.',
    },
    {
      id: 'foot',
      name: 'Foot',
      selector: '[class~="aui-table-foot"]',
      description: 'Totals row at the bottom of the print table, its Total label and sum set in bold typographyStyle.',
    },
  ],
});
