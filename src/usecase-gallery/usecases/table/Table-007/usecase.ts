import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Data table',
  title: 'Job tally totals row',
  apps: ['ace', 'hs'],
    layers: [
        {"id":"table","partId":"table","title":"Table","explanation":"Soft self-scrolling table adapts rows and striping across apps.","keyIdea":"The table scrolls its records independently while keeping the spacing headings in place.","selector":"[class~=\"aui-table\"]"},
        {"id":"head","partId":"head","title":"Header","explanation":"Header lists spacing columns or job tally fields.","keyIdea":"The heading row names index and spacing values before the editable records.","selector":"[class~=\"aui-table-head\"]"},
        {"id":"header-cell","partId":"header-cell","title":"Header cell","explanation":"Column heading; the # column is fixed at 32px.","keyIdea":"The fixed index heading reserves a narrow anchor for each row number.","selector":"[class~=\"aui-table-header-cell\"]"},
        {"id":"body","partId":"body","title":"Body","explanation":"The scrolling record rows whose columns the foot totals.","keyIdea":"The body scroll contains the records whose spacing values feed the totals.","selector":"[class~=\"aui-table-body\"]"},
        {"id":"row","partId":"row","title":"Row","explanation":"One record, index 1 with its X and Y spacing inputs.","keyIdea":"Each row binds one record index to its two editable spacing measurements.","selector":"[class~=\"aui-table-row\"]"},
        {"id":"cell","partId":"cell","title":"Cell","explanation":"First cell numbers the row; later cells hold spacing inputs.","keyIdea":"The cell keeps each measurement control within its own column boundary.","selector":"[class~=\"aui-table-cell\"]"},
        {"id":"number-field","partId":"number-field","title":"Number field","explanation":"X 6 and Y 8; minimum spacing is one.","keyIdea":"A number field constrains spacing input to a minimum valid measurement.","selector":"[class~=\"aui-number-field\"]"},
        {"id":"number-group","partId":"number-group","title":"Input group","explanation":"Fixed surface frame that joins the numeric input and its unit.","keyIdea":"The input group visually binds the number and its unit as one measurement.","selector":"[class~=\"aui-number-field-group\"]"},
        {"id":"number-input","partId":"number-input","title":"Input","explanation":"Right-aligned numeric entry that can shrink to zero width.","keyIdea":"A right-aligned entry keeps digits comparable within the narrow table column.","selector":"[class~=\"aui-number-field-group\"] [class~=\"aui-input\"]"},
        {"id":"number-unit","partId":"number-unit","title":"Unit","explanation":"The inch unit follows each entered spacing value.","keyIdea":"The unit suffix clarifies that the entered spacing is measured in inches.","selector":"[class~=\"aui-number-field-unit\"]"},
        {"id":"foot","partId":"foot","title":"Foot","explanation":"Totals row shows four items or fastener counts beneath the body.","keyIdea":"The footer summarizes records only after their body values have been presented.","selector":"[class~=\"aui-table-foot\"]"},
      ],
options: [
    { id: "ace-tally", name: "Per-product totals row", showContext: false, apps: ["ace"], source: {"ace":"src/features/calculation/ui/CalculationOutput.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "hs-totals", name: "Fastener totals footer", showContext: false, apps: ["hs"], source: {"hs":"src/hs/OutputPane.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: {
    ace: 'src/features/calculation/ui/CalculationOutput.tsx',
    hs: 'src/hs/OutputPane.tsx',
  },
  summary: 'A Table.Foot row under the body that totals the columns above it in a results table, kept in view while the body scrolls.',
  where: 'ACE Job Tally results table (a Total row of per-product quantities) and the HS job list (a Fastener Totals label and the totals under it).',
  when: 'Use it for a line that sums the rows above (a quantity per column, a list of totals) and belongs to the table, not to one row. A summary of values with no rows above it is the summary table (Table-003). The totals line of a printed table is Table-008.',
  how: 'The same Table as the results grid (Table-001) with a Table.Foot after the Table.Body, holding Table.Row and Table.Cell like the body; Table.Foot is the part that makes it a variant, since no other table of the gallery writes it. Measured: the foot cells match the body cells (29px high, 4px 8px padding, 16px regular text, no fill), and with scroll "self" the foot is split out like the head and stays fixed while the body scrolls. ACE: one Total row, the first cell left aligned (sx textAlign "left") and a total under each product column, in a striped table. HS: two foot rows whose cells span columns (colSpan), the first a semi-bold Type "Fastener Totals" label and the second one Type per total line. The scenes keep one body row and one product column; the row buttons, the extra columns and the dialogs are left out.',
  anatomy: [
    {
      id: 'table',
      name: 'Table',
      selector: '[class~="aui-table"]',
      description: 'Self-scrolling table (scroll="self", scale "sm", soft); the ACE job tally also uses bodyFit "content" and striped rows, and the HS list uses a raised, centred header.',
    },
    {
      id: 'head',
      name: 'Header',
      selector: '[class~="aui-table-head"]',
      description: 'Header row with #, Column Spacing and Row Spacing; the job tally scenes use Job and Model B-200 or Job, Model and Qty.',
    },
    {
      id: 'header-cell',
      name: 'Header cell',
      selector: '[class~="aui-table-header-cell"]',
      description: 'Column heading; the # column is fixed at 32px.',
    },
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-table-body"]',
      description: 'The scrolling record rows whose columns the foot totals.',
    },
    {
      id: 'row',
      name: 'Row',
      selector: '[class~="aui-table-body"] [class~="aui-table-body"] [class~="aui-table-row"]',
      description: 'One record, index 1 with its X and Y spacing inputs.',
    },
    {
      id: 'cell',
      name: 'Cell',
      selector: '[class~="aui-table-cell"]',
      description: 'Body cell; the first is the 32px row number and the other two each host a number field.',
    },
    {
      id: 'number-field',
      name: 'Number field',
      selector: '[class~="aui-number-field"]',
      description: 'Spacing input in a cell, "X Spacing 1" defaulting to 6 and "Y Spacing 1" to 8, minimum 1.',
    },
    {
      id: 'number-group',
      name: 'Input group',
      selector: '[class~="aui-number-field-group"]',
      description: 'Fixed surface frame that joins the numeric input and its unit.',
    },
    {
      id: 'number-input',
      name: 'Input',
      selector: '[class~="aui-number-field-group"] [class~="aui-input"]',
      description: 'Right-aligned numeric entry that can shrink to zero width.',
    },
    {
      id: 'number-unit',
      name: 'Unit',
      selector: '[class~="aui-number-field-unit"]',
      description: 'The "in" unit shown after the value.',
    },
    {
      id: 'foot',
      name: 'Foot',
      selector: '[class~="aui-table-foot"]',
      description: 'Totals rows under the body: ACE shows Total 4, HS shows a Fastener Totals heading and "16 nails, 8d" spanning the Model and Qty columns.',
    },
  ],
});
