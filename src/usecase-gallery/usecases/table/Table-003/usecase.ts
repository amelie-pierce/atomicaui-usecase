import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Data table',
  title: 'Calculation summary table',
  apps: ['adm', 'adc'],
    layers: [
        {"id":"table","partId":"table","title":"Table","explanation":"Short summary table: border \"between-rows\" in a soft 1px outlined frame, overflow hidden and text right-aligned so the numbers line up.","keyIdea":"Short summary table: border \"between-rows\" in a soft 1px outlined frame, overflow hidden and text right-aligned so the numbers line up.","selector":"[class~=\"aui-table\"]"},
        {"id":"head","partId":"head","title":"Header","explanation":"Raised band with the Limit state, Demand (lb) and Capacity (lb) headings; ADM adds a full-width Limit states title row above them.","keyIdea":"Raised band with the Limit state, Demand (lb) and Capacity (lb) headings; ADM adds a full-width Limit states title row above them.","selector":"[class~=\"aui-table-head\"]"},
        {"id":"header-cell","partId":"header-cell","title":"Header cell","explanation":"Column heading; the first, Limit state, is left-aligned while the numeric headings follow the right-aligned table.","keyIdea":"Column heading; the first, Limit state, is left-aligned while the numeric headings follow the right-aligned table.","selector":"[class~=\"aui-table-header-cell\"]"},
        {"id":"body","partId":"body","title":"Body","explanation":"Rows for Steel tension (2,210 / 5,400) and Concrete breakout (1,180 / 3,060), separated by hairlines.","keyIdea":"Rows for Steel tension (2,210 / 5,400) and Concrete breakout (1,180 / 3,060), separated by hairlines.","selector":"[class~=\"aui-table-body\"]"},
        {"id":"row","partId":"row","title":"Row","explanation":"One limit state with its demand and capacity values.","keyIdea":"One limit state with its demand and capacity values.","selector":"[class~=\"aui-table-row\"]"},
        {"id":"cell","partId":"cell","title":"Cell","explanation":"Value cell; the limit state name is left-aligned through its own aui, the figures stay right-aligned.","keyIdea":"Value cell; the limit state name is left-aligned through its own aui, the figures stay right-aligned.","selector":"[class~=\"aui-table-cell\"]"},
        {"id":"status-dot","partId":"status-dot","title":"Status dot","explanation":"ADM only: the Ratio cell leads with a coloured success dot before the 41% value.","keyIdea":"ADM only: the Ratio cell leads with a coloured success dot before the 41% value.","selector":"[class~=\"aui-table-cell\"] [class~=\"aui-symbol\"]"},
      ],
options: [
    { id: "adm-summary", name: "Summary table", showContext: false, apps: ["adm"], source: {"adm":"src/features/calculation/components/shared/ResultTable.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "adc-summary", name: "Summary table — UI variant 2", showContext: false, apps: ["adc"], source: {"adc":"src/adc/components/ResultTable.tsx"} ,
      contextLayers: [

      ],
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
    },
    {
      id: 'head',
      name: 'Header',
      selector: '[class~="aui-table-head"]',
      description: 'Raised band with the Limit state, Demand (lb) and Capacity (lb) headings; ADM adds a full-width Limit states title row above them.',
    },
    {
      id: 'header-cell',
      name: 'Header cell',
      selector: '[class~="aui-table-header-cell"]',
      description: 'Column heading; the first, Limit state, is left-aligned while the numeric headings follow the right-aligned table.',
    },
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-table-body"]',
      description: 'Rows for Steel tension (2,210 / 5,400) and Concrete breakout (1,180 / 3,060), separated by hairlines.',
    },
    {
      id: 'row',
      name: 'Row',
      selector: '[class~="aui-table-body"] [class~="aui-table-body"] [class~="aui-table-row"]',
      description: 'One limit state with its demand and capacity values.',
    },
    {
      id: 'cell',
      name: 'Cell',
      selector: '[class~="aui-table-cell"]',
      description: 'Value cell; the limit state name is left-aligned through its own aui, the figures stay right-aligned.',
    },
    {
      id: 'status-dot',
      name: 'Status dot',
      selector: '[class~="aui-table-cell"] [class~="aui-symbol"]',
      description: 'ADM only: the Ratio cell leads with a coloured success dot before the 41% value.',
    },
  ],
});
