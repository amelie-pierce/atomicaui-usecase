import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Data table',
  title: 'Data preview table',
  apps: ['adc'],
options: [
    { id: "adc-preview", name: "Data preview table", showContext: false, apps: ["adc"], source: {"adc":"src/adc/components/CapImportSteps.tsx"} ,
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
     lesson: {"explanation":"Soft import preview uses a solid surface and outlined frame."}},
    {
      id: 'head',
      name: 'Header',
      selector: '[class~="aui-table-head"]',
      description: 'Raised heading row with the upper-case FIELD, VALUE and STATUS labels.',
     lesson: {"explanation":"Raised heading row with the upper-case FIELD, VALUE and STATUS labels."}},
    {
      id: 'header-cell',
      name: 'Header cell',
      selector: '[class~="aui-table-header-cell"]',
      description: 'One of the three column headings, FIELD, VALUE or STATUS, with the default alignment and no sorting.',
     lesson: {"explanation":"FIELD, VALUE, and STATUS headings use default alignment without sorting."}},
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-table-body"]',
      description: 'Holds the previewed record that the user checks before confirming the import.',
     lesson: {"explanation":"Holds the previewed record that the user checks before confirming the import."}},
    {
      id: 'row',
      name: 'Row',
      selector: '[class~="aui-table-body"] [class~="aui-table-body"] [class~="aui-table-row"]',
      description: 'One imported field: Design Method, ACI 318, Supported.',
     lesson: {"explanation":"One imported field: Design Method, ACI 318, Supported.","selector":"[class~=\"aui-table-body\"] [class~=\"aui-table-row\"]"}},
    {
      id: 'cell',
      name: 'Cell',
      selector: '[class~="aui-table-cell"]',
      description: 'Plain text cell for the field name, its parsed value or its support status.',
     lesson: {"explanation":"Plain cell shows a field name, parsed value, or support status."}},
  ],
});
