import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Data table',
  title: 'Calculation summary table',
  apps: ['adm', 'adc'],
options: [
    { id: "adm-summary", name: "Centered summary table", showContext: false, apps: ["adm"], source: {"adm":"src/features/calculation/components/shared/ResultTable.tsx"} ,
    },
    { id: "adc-summary", name: "Right-aligned summary", showContext: false, apps: ["adc"], source: {"adc":"src/adc/components/ResultTable.tsx"} ,
    },
  ],
  source: {
    adm: 'src/features/calculation/components/shared/ResultTable.tsx',
    adc: 'src/adc/components/ResultTable.tsx',
  },
  summary: 'A short table of a few labelled rows under a raised header band: the calculation summary and the limit state ratios of a result.',
  where: 'The calculation summary and result detail tables: ADM shared/ResultTable.tsx (used by LimitStateTable, GoverningRatioTable and InteractionTable, with StatusCell) and ADC ResultTable.tsx (the calculation summary).',
  when: 'Use it for a few labelled rows that the user reads but does not select or sort. For a scrolling, sortable grid use the Results grid (Table-001); for a paper copy use the Print table (Table-006). A data preview is Table-004 and a list of check messages is Table-005.',
  how: 'Table with a raised header band (headerCellAui color "raised"; a Table.HeaderCell with its own aui replaces headerCellAui, so each one repeats color "raised"), aui shape "soft" and a 1px outlined frame (the four border widths, borderColor "outlined"). Two groups, one scene each, measured in headless Chromium: ADM (border "between-rows", overflow "hidden") centres headers and cells (text-align center) with the first column left, puts a full-width title band (colSpan) above the column headers, and leads the Ratio cell with a coloured status dot Symbol (success below 100%, error from 100%, muted for N/A); ADC summary (the same between-rows frame) right-aligns every header and cell (text-align right) with the first column left, and sets a bracketed unit in the header in the Symbol font. The scenes leave out the other tables of the tabs, the dot colours other than success and the other data rows.',
  anatomy: [
    {
      id: 'table',
      name: 'Table',
      selector: '[class~="aui-table"]',
      description: 'Short summary table: border "between-rows" in a soft 1px outlined frame, overflow hidden and text right-aligned so the numbers line up.',
     lesson: {"explanation":"Soft framed summary uses right-aligned values and between-row borders."}},
    {
      id: 'head',
      name: 'Header',
      selector: '[class~="aui-table-head"]',
      description: 'Raised band with the Limit state, Demand (lb) and Capacity (lb) headings; ADM adds a full-width Limit states title row above them.',
     lesson: {"explanation":"Raised header names Limit state, Demand, and Capacity columns."}},
    {
      id: 'header-cell',
      name: 'Header cell',
      selector: '[class~="aui-table-header-cell"]',
      description: 'Column heading; the first, Limit state, is left-aligned while the numeric headings follow the right-aligned table.',
     lesson: {"explanation":"Limit state aligns left while numeric headings align right."}},
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-table-body"]',
      description: 'Rows for Steel tension (2,210 / 5,400) and Concrete breakout (1,180 / 3,060), separated by hairlines.',
     lesson: {"explanation":"Two material rows show demand and capacity values."}},
    {
      id: 'row',
      name: 'Row',
      selector: '[class~="aui-table-body"] [class~="aui-table-body"] [class~="aui-table-row"]',
      description: 'One limit state with its demand and capacity values.',
     lesson: {"explanation":"One limit state with its demand and capacity values.","selector":"[class~=\"aui-table-body\"] [class~=\"aui-table-row\"]"}},
    {
      id: 'cell',
      name: 'Cell',
      selector: '[class~="aui-table-cell"]',
      description: 'Value cell; the limit state name is left-aligned through its own aui, the figures stay right-aligned.',
     lesson: {"explanation":"Names align left while numeric figures align right."}},
    {
      id: 'status-dot',
      name: 'Status dot',
      selector: '[class~="aui-table-cell"] [class~="aui-symbol"]',
      description: 'ADM only: the Ratio cell leads with a coloured success dot before the 41% value.',
     lesson: {"explanation":"ADM adds a success dot before the Ratio percentage."}},
  ],
});
