import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Data table',
  title: 'Selectable rows',
  apps: ['hcs', 'hs', 'fd', 'pbs', 'rws', 'adm', 'ace'],
  source: {
    hcs: 'src/components/F01Results.tsx',
    hs: 'src/hs/ResultsTable.tsx',
    fd: 'src/components/Results.jsx',
    pbs: 'src/ResultsSection.tsx',
    rws: 'src/rws/output.tsx',
    adm: 'src/features/multi-design/components/MultiDesignTable.tsx',
    ace: 'src/features/calculation/ui/CalculationOutput.tsx',
  },
    layers: [
        {"id":"table","partId":"table","title":"Table","explanation":"Single-select grid places its radio inside the first data cell.","keyIdea":"The single-select grid turns candidate rows into one mutually exclusive choice.","selector":"[class~=\"aui-table\"]"},
        {"id":"head","partId":"head","title":"Header","explanation":"Raised header is not selectable and contains model and load labels.","keyIdea":"A nonselectable header lets the candidate columns stay readable without looking like a choice.","selector":"[class~=\"aui-table-head\"]"},
        {"id":"header-cell","partId":"header-cell","title":"Header cell","explanation":"Plain raised heading names columns without a sort control.","keyIdea":"Plain headings describe the data because this selection table does not sort.","selector":"[class~=\"aui-table-header-cell\"]"},
        {"id":"body","partId":"body","title":"Body","explanation":"The two selectable candidates, Model B-200 and Model C-300.","keyIdea":"The body contains only the candidates available for selection.","selector":"[class~=\"aui-table-body\"]"},
        {"id":"row","partId":"row","title":"Row","explanation":"Selected B-200 row uses a surface and 4px leading bar.","keyIdea":"The row surface and start edge make the chosen candidate visible beyond its radio.","selector":"[class~=\"aui-table-row\"]"},
        {"id":"cell","partId":"cell","title":"Cell","explanation":"First cell pairs radio and model; second shows the load.","keyIdea":"The first cell keeps the selection marker with the model name it selects.","selector":"[class~=\"aui-table-cell\"]"},
        {"id":"selection-toggle","partId":"selection-toggle","title":"Selection radio","explanation":"24px radio selects the row; ACE places it above the model.","keyIdea":"The radio exposes the same row choice with a control that supports single selection.","selector":"[class~=\"aui-table-cell\"] [class~=\"aui-radio\"]","unchanged":true},
      ],
options: [
    { id: "hcs-selection", name: "Row selection", showContext: false, apps: ["hcs"], source: {"hcs":"src/components/F01Results.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "hs-selection", name: "Selected row table", showContext: false, apps: ["hs","fd","pbs"], source: {"hs":"src/hs/ResultsTable.tsx","fd":"src/components/Results.jsx","pbs":"src/ResultsSection.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "rws-selection", name: "Edge marked row", showContext: false, apps: ["rws"], source: {"rws":"src/rws/output.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "adm-selection", name: "Radio row table", showContext: false, apps: ["adm"], source: {"adm":"src/features/multi-design/components/MultiDesignTable.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "ace-selection", name: "Compact selection row", showContext: false, apps: ["ace"], source: {"ace":"src/features/calculation/ui/CalculationOutput.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  summary: 'A radio in the first cell selects one row of a results table; the selected row is marked by the row surface and an edge bar.',
  where: 'Output tables where one candidate is chosen: HCS F01Results.tsx, HS ResultsTable.tsx, FD Results.jsx, PBS ResultsSection.tsx (edit mode, in the action column), RWS output.tsx (bar only), ADM MultiDesignTable.tsx (Multi design dialog) and ACE CalculationOutput.tsx (the Order model radio).',
  when: 'Use it when the table drives one chosen result. Give every row a selectionLabel (the radio has no visible label) and put the Table.SelectionToggle in the first cell. The expander before the radio in HCS and FD is Button-028 and the row and column buttons are Button-035, Button-013 and Button-038; they are not repeated here.',
  how: 'Root: selectionMode "single", indicatorType "radio", indicatorColumn false, selectionToggleAui scale "sm" with minWidth and minHeight "24", unselected color "surface" paint "tonal" borderColor "outlined", selected color "primary" paint "solid". Each Table.Row has selectionLabel and selected; the radio is a Table.SelectionToggle inside the first Table.Cell. The scenes show the enabled state (HCS shows the radio of a failed row disabled with a tooltip). Five groups, measured in headless Chromium. HCS: rows painted surface-alt rgb(241, 245, 249) with a 4px inset secondary bar rgb(18, 18, 18) on the selected row. HS, FD and PBS: the same radio and bar on white rows rgb(255, 255, 255); the radio sits in the model cell (HS, FD) or in the action column (PBS). RWS: no radio and no indicator column (no radio span, no input); only the selected row paints the 4px bar, because the Show in 3D control selects. ADM: between-rows lines, the selected row painted raised rgb(226, 232, 240) with a 4px primary bar rgb(255, 83, 8), values aligned to the end. ACE: the radio with no rowAui, so the selected row takes the library default (raised rgb(226, 232, 240) and a 1px inset edge, not a 4px bar). The scenes leave out the expander, thumbnails, group rows, the failed-row tooltip and the other columns.',
  anatomy: [
    {
      id: 'table',
      name: 'Table',
      selector: '[class~="aui-table"]',
      description: 'Selectable results table: selectionMode "single" with indicatorType "radio" and no separate indicator column, so the radio lives in the first data cell. HCS, HS, PBS and FD use the 4px secondary edge bar; ADM uses between-rows lines with a raised selected row.',
    },
    {
      id: 'head',
      name: 'Header',
      selector: '[class~="aui-table-head"]',
      description: 'Raised header with the Model and Load (lb) labels (Product and Tension (lb) in ADM); its row is marked selectable={false} so it gets no radio.',
    },
    {
      id: 'header-cell',
      name: 'Header cell',
      selector: '[class~="aui-table-header-cell"]',
      description: 'Plain column heading on the raised band; no sort control in this use case.',
    },
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-table-body"]',
      description: 'The two selectable candidates, Model B-200 and Model C-300.',
    },
    {
      id: 'row',
      name: 'Row',
      selector: '[class~="aui-table-body"] [class~="aui-table-body"] [class~="aui-table-row"]',
      description: 'A selectable row; the selected one (Model B-200) carries the row surface and a 4px start edge bar, and RWS paints that look with selection="row" and no radio.',
    },
    {
      id: 'cell',
      name: 'Cell',
      selector: '[class~="aui-table-cell"]',
      description: 'Data cell; the first one holds the radio and the model name, the second the load in lb (2,210 and 1,180).',
    },
    {
      id: 'selection-toggle',
      name: 'Selection radio',
      selector: '[class~="aui-table-cell"] [class~="aui-radio"]',
      description: '24px radio at the start of the first cell that selects the row, filled primary when selected; in ACE it sits above the model name.',
    },
  ],
});
