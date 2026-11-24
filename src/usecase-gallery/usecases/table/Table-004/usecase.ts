import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Data table',
  title: 'Data preview table',
  apps: ['adc'],
  options: [
    { id: "adc-preview", name: "Data preview table", apps: ["adc"], source: {"adc":"src/adc/components/CapImportSteps.tsx"} },
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
      token: 'Table',
      selector: '[class~="aui-table"]',
      description: 'Import preview grid: surface-coloured solid soft table at scale "sm" with "all-cells" tonal borders and a 1px outlined frame.',
      code: `<Table
  aria-label="Data preview"
  border="all-cells"
  borderStyle="tonal"
  aui={{ color: 'surface', paint: 'solid', shape: 'soft', scale: 'sm', sx: { …, borderColor: 'outlined' } }}
  headerCellAui={{ color: 'raised' }}
>`,
    },
    {
      id: 'head',
      name: 'Header',
      token: 'Table.Head',
      selector: '[class~="aui-table-head"]',
      description: 'Raised heading row with the upper-case FIELD, VALUE and STATUS labels.',
      code: `<Table.Head>
  <Table.Row>
    <Table.HeaderCell>FIELD</Table.HeaderCell>
    <Table.HeaderCell>VALUE</Table.HeaderCell>
    <Table.HeaderCell>STATUS</Table.HeaderCell>
  </Table.Row>
</Table.Head>`,
    },
    {
      id: 'header-cell',
      name: 'Header cell',
      token: 'Table.HeaderCell',
      selector: '[class~="aui-table-header-cell"]',
      description: 'One of the three column headings, FIELD, VALUE or STATUS, with the default alignment and no sorting.',
      code: `<Table.HeaderCell>STATUS</Table.HeaderCell>`,
    },
    {
      id: 'body',
      name: 'Body',
      token: 'Table.Body',
      selector: '[class~="aui-table-body"]',
      description: 'Holds the previewed record that the user checks before confirming the import.',
      code: `<Table.Body>
  <Table.Row>…</Table.Row>
</Table.Body>`,
    },
    {
      id: 'row',
      name: 'Row',
      token: 'Table.Row',
      selector: '[class~="aui-table-row"]',
      description: 'One imported field: Design Method, ACI 318, Supported.',
      code: `<Table.Row>
  <Table.Cell>Design Method</Table.Cell>
  <Table.Cell>ACI 318</Table.Cell>
  <Table.Cell>Supported</Table.Cell>
</Table.Row>`,
    },
    {
      id: 'cell',
      name: 'Cell',
      token: 'Table.Cell',
      selector: '[class~="aui-table-cell"]',
      description: 'Plain text cell for the field name, its parsed value or its support status.',
      code: `<Table.Cell>ACI 318</Table.Cell>`,
    },
  ],
});
