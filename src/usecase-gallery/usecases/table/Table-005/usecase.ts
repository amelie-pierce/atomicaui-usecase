import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Data table',
  title: 'Check details table',
  apps: ['fd'],
    layers: [
        {"id":"table","partId":"table","title":"Table","explanation":"Headerless message grid uses table semantics inside an expanded result row.","keyIdea":"The headerless message grid lets an expanded result explain individual failed checks.","selector":"[class~=\"aui-table\"]"},
        {"id":"body","partId":"body","title":"Body","explanation":"Body holds one failed or warning check per row.","keyIdea":"A body-only table avoids adding a separate heading when each check already carries its status.","selector":"[class~=\"aui-table-body\"]"},
        {"id":"row","partId":"row","title":"Row","explanation":"One check message: the status chip followed by its text.","keyIdea":"Each message row associates one result category with one diagnostic sentence.","selector":"[class~=\"aui-table-row\"]"},
        {"id":"status-cell","partId":"status-cell","title":"Status cell","explanation":"Fixed 96px first column that holds the status chip.","keyIdea":"A fixed status column keeps short labels aligned across varying message lengths.","selector":"[class~=\"aui-table-cell\"]:first-child"},
        {"id":"chip","partId":"chip","title":"Status chip","explanation":"Small danger-tonal xs chip that marks the check as a failure.","keyIdea":"The danger chip marks the check as a failure before users read the detail.","selector":"[class~=\"aui-chip\"]"},
        {"id":"message-cell","partId":"message-cell","title":"Message cell","explanation":"Message cell explains a check, such as insufficient edge distance.","keyIdea":"The message cell explains the condition that caused the check to fail.","selector":"[class~=\"aui-table-cell\"]:last-child"},
      ],
options: [
    { id: "fd-details", name: "Check details table", showContext: false, apps: ["fd"], source: {"fd":"src/components/RowExpansion.jsx"} ,
      contextLayers: [

      ],
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
    },
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-table-body"]',
      description: 'Contains only body rows, one per failed or warning check; there is no Table.Head.',
    },
    {
      id: 'row',
      name: 'Row',
      selector: '[class~="aui-table-body"] [class~="aui-table-body"] [class~="aui-table-row"]',
      description: 'One check message: the status chip followed by its text.',
    },
    {
      id: 'status-cell',
      name: 'Status cell',
      selector: '[class~="aui-table-cell"]:first-child',
      description: 'Fixed 96px first column that holds the status chip.',
    },
    {
      id: 'chip',
      name: 'Status chip',
      selector: '[class~="aui-chip"]',
      description: 'Small danger-tonal xs chip that marks the check as a failure.',
    },
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
    },
  ],
});
