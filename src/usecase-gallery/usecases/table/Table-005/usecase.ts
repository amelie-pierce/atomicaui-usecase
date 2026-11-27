import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Data table',
  title: 'Check details table',
  apps: ['fd'],
options: [
    { id: "fd-details", name: "Check details table", showContext: false, apps: ["fd"], source: {"fd":"src/components/RowExpansion.jsx"} ,
    },
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
      selector: '[class~="aui-table"]',
      description: 'Header-less message grid with a11y="table", "all-cells" tonal borders, scale "sm" and a soft shape; it sits inside an expanded result row.',
     lesson: {"explanation":"Headerless message grid uses table semantics inside an expanded result row."}},
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-table-body"]',
      description: 'Contains only body rows, one per failed or warning check; there is no Table.Head.',
     lesson: {"explanation":"Body holds one failed or warning check per row."}},
    {
      id: 'row',
      name: 'Row',
      selector: '[class~="aui-table-body"] [class~="aui-table-body"] [class~="aui-table-row"]',
      description: 'One check message: the status chip followed by its text.',
     lesson: {"explanation":"One check message: the status chip followed by its text.","selector":"[class~=\"aui-table-body\"] [class~=\"aui-table-row\"]"}},
    {
      id: 'status-cell',
      name: 'Status cell',
      selector: '[class~="aui-table-cell"]:first-child',
      description: 'Fixed 96px first column that holds the status chip.',
     lesson: {"explanation":"Fixed 96px first column that holds the status chip."}},
    {
      id: 'chip',
      name: 'Status chip',
      selector: '[class~="aui-chip"]',
      description: 'Small danger-tonal xs chip that marks the check as a failure.',
     lesson: {"explanation":"Small danger-tonal xs chip that marks the check as a failure."}},
    {
      id: 'chip-label',
      name: 'Chip label',
      selector: '[class~="aui-chip-label"]',
      text: true,
      description: 'The word "Fail" inside the chip.',
    },
    {
      id: 'message-cell',
      name: 'Message cell',
      selector: '[class~="aui-table-cell"]:last-child',
      description: 'Message text that explains the check, for example "Edge distance is below the minimum."',
     lesson: {"explanation":"Message cell explains a check, such as insufficient edge distance."}},
  ],
});
