import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Data table',
  title: 'Data preview table',
  apps: ['adc'],
    layers: [
        {"id":"table","partId":"table","title":"Table","explanation":"Import preview grid: surface-coloured solid soft table at scale \"sm\" with \"all-cells\" tonal borders and a 1px outlined frame.","keyIdea":"The import grid presents parsed fields as a preview before the user commits them.","selector":"[class~=\"aui-table\"]"},
        {"id":"head","partId":"head","title":"Header","explanation":"Raised heading row with the upper-case FIELD, VALUE and STATUS labels.","keyIdea":"Raised headings establish which preview value belongs to each field and status column.","selector":"[class~=\"aui-table-head\"]"},
        {"id":"header-cell","partId":"header-cell","title":"Header cell","explanation":"One of the three column headings, FIELD, VALUE or STATUS, with the default alignment and no sorting.","keyIdea":"Each heading identifies a data category without adding sort behavior to the preview.","selector":"[class~=\"aui-table-header-cell\"]"},
        {"id":"body","partId":"body","title":"Body","explanation":"Holds the previewed record that the user checks before confirming the import.","keyIdea":"The body holds the record users need to inspect before confirming the import.","selector":"[class~=\"aui-table-body\"]"},
        {"id":"row","partId":"row","title":"Row","explanation":"One imported field: Design Method, ACI 318, Supported.","keyIdea":"A row keeps each parsed property together for a single imported record.","selector":"[class~=\"aui-table-row\"]"},
        {"id":"cell","partId":"cell","title":"Cell","explanation":"Plain text cell for the field name, its parsed value or its support status.","keyIdea":"The cell presents the field name, interpreted value, or compatibility status as plain text.","selector":"[class~=\"aui-table-cell\"]"},
      ],
options: [
    { id: "adc-preview", name: "Data preview table", showContext: false, apps: ["adc"], source: {"adc":"src/adc/components/CapImportSteps.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: {
    adc: 'src/adc/components/CapImportSteps.tsx',
  },
  summary: 'A small table that previews the imported data before the user confirms: Field, Value and Status columns under a raised header row.',
  where: 'ADC: the Import step Data Preview (CapImportSteps.tsx). No other app previews imported data in a table.',
  when: 'Use it to show a few facts of imported data that the user reads before continuing, not selects or sorts. For a calculation summary use Table-003; for a scrolling, sortable grid use the Results grid (Table-001).',
  how: 'An all-cells tonal grid (border "all-cells", borderStyle "tonal") at scale "sm" in a soft outlined frame (the four border widths, borderColor "outlined"), with a raised header row (headerCellAui color "raised": FIELD, VALUE, STATUS) and plain left-aligned cells. The scene leaves out the other data rows and the import wizard around it.',
  anatomy: [
    {
      id: 'table',
      name: 'Table',
      selector: '[class~="aui-table"]',
      description: 'Import preview grid: surface-coloured solid soft table at scale "sm" with "all-cells" tonal borders and a 1px outlined frame.',
    },
    {
      id: 'head',
      name: 'Header',
      selector: '[class~="aui-table-head"]',
      description: 'Raised heading row with the upper-case FIELD, VALUE and STATUS labels.',
    },
    {
      id: 'header-cell',
      name: 'Header cell',
      selector: '[class~="aui-table-header-cell"]',
      description: 'One of the three column headings, FIELD, VALUE or STATUS, with the default alignment and no sorting.',
    },
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-table-body"]',
      description: 'Holds the previewed record that the user checks before confirming the import.',
    },
    {
      id: 'row',
      name: 'Row',
      selector: '[class~="aui-table-body"] [class~="aui-table-body"] [class~="aui-table-row"]',
      description: 'One imported field: Design Method, ACI 318, Supported.',
    },
    {
      id: 'cell',
      name: 'Cell',
      selector: '[class~="aui-table-cell"]',
      description: 'Plain text cell for the field name, its parsed value or its support status.',
    },
  ],
});
