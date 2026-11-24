import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Data table',
  title: 'Check details table',
  apps: ['fd'],
  options: [
    { id: "fd-details", name: "Check details table", apps: ["fd"], source: {"fd":"src/components/RowExpansion.jsx"} },
  ],
  source: {
    fd: 'src/components/RowExpansion.jsx',
  },
  summary: 'A header-less table of check messages inside an expanded result row: a status Chip and the message of each failed or warning check.',
  where: 'FD: the Why Not details of an expanded result row (RowExpansion.jsx, the failed and warning checks list). The expander is Button-028 and the Show passed filter is Checkbox-003.',
  when: 'Use it for a few facts about one record inside a panel or an expanded row, read and not selected or sorted. For a calculation summary use Table-003.',
  how: 'The same all-cells tonal grid at scale "sm" with no header, a 96px first cell that holds a tonal xs Chip (danger for Fail) and the message in the second cell. The scene leaves out the other data rows, the Show passed checkbox and the category tabs of the expanded row.',
  anatomy: [
    {
      id: 'table',
      name: 'Table',
      token: 'Table',
      selector: '[class~="aui-table"]',
      description: 'Header-less message grid with a11y="table", "all-cells" tonal borders, scale "sm" and a soft shape; it sits inside an expanded result row.',
      code: `<Table a11y="table" border="all-cells" borderStyle="tonal" aui={{ scale: 'sm', shape: 'soft' }}>`,
    },
    {
      id: 'body',
      name: 'Body',
      token: 'Table.Body',
      selector: '[class~="aui-table-body"]',
      description: 'Contains only body rows, one per failed or warning check; there is no Table.Head.',
      code: `<Table.Body>
  <Table.Row>…</Table.Row>
</Table.Body>`,
    },
    {
      id: 'row',
      name: 'Row',
      token: 'Table.Row',
      selector: '[class~="aui-table-row"]',
      description: 'One check message: the status chip followed by its text.',
      code: `<Table.Row>
  <Table.Cell aui={{ sx: { width: '96' } }}>…</Table.Cell>
  <Table.Cell>Edge distance is below the minimum.</Table.Cell>
</Table.Row>`,
    },
    {
      id: 'status-cell',
      name: 'Status cell',
      token: 'Table.Cell',
      selector: '[class~="aui-table-cell"]:first-child',
      description: 'Fixed 96px first column that holds the status chip.',
      code: `<Table.Cell aui={{ sx: { width: '96' } }}>
  <Chip aui={{ color: 'danger', paint: 'tonal', scale: 'xs' }}>…</Chip>
</Table.Cell>`,
    },
    {
      id: 'chip',
      name: 'Status chip',
      token: 'Chip',
      selector: '[class~="aui-chip"]',
      description: 'Small danger-tonal xs chip that marks the check as a failure.',
      code: `<Chip aui={{ color: 'danger', paint: 'tonal', scale: 'xs' }}>
  <Chip.Label>Fail</Chip.Label>
</Chip>`,
    },
    {
      id: 'chip-label',
      name: 'Chip label',
      token: 'Chip.Label',
      selector: '[class~="aui-chip-label"]',
      text: true,
      description: 'The word "Fail" inside the chip.',
      code: `<Chip.Label>Fail</Chip.Label>`,
    },
    {
      id: 'message-cell',
      name: 'Message cell',
      token: 'Table.Cell',
      selector: '[class~="aui-table-cell"]:last-child',
      description: 'Message text that explains the check, for example "Edge distance is below the minimum."',
      code: `<Table.Cell>Edge distance is below the minimum.</Table.Cell>`,
    },
  ],
});
