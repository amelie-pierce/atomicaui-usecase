import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Editable table',
  title: 'Cell input table',
  apps: ['adm'],
    layers: [
        {"id":"table","partId":"table","title":"Table","explanation":"Editable grid: a self-scrolling soft table at scale \"sm\", filling the width, whose body cells contain number fields.","keyIdea":"Editable grid: a self-scrolling soft table at scale \"sm\", filling the width, whose body cells contain number fields.","selector":"[class~=\"aui-table\"]"},
        {"id":"head","partId":"head","title":"Header","explanation":"Column headings #, Column Spacing and Row Spacing.","keyIdea":"Column headings #, Column Spacing and Row Spacing.","selector":"[class~=\"aui-table-head\"]"},
        {"id":"header-cell","partId":"header-cell","title":"Header cell","explanation":"Heading for one editable spacing column; # is fixed at 32px.","keyIdea":"Heading for one editable spacing column; # is fixed at 32px.","selector":"[class~=\"aui-table-header-cell\"]"},
        {"id":"body","partId":"body","title":"Body","explanation":"Rows of anchor spacings the user edits in place.","keyIdea":"Rows of anchor spacings the user edits in place.","selector":"[class~=\"aui-table-body\"]"},
        {"id":"row","partId":"row","title":"Row","explanation":"Anchor 1, with an X and a Y spacing input in the other two cells.","keyIdea":"Anchor 1, with an X and a Y spacing input in the other two cells.","selector":"[class~=\"aui-table-row\"]"},
        {"id":"cell","partId":"cell","title":"Cell","explanation":"Body cell: the 32px row number, or the wrapper around one number field.","keyIdea":"Body cell: the 32px row number, or the wrapper around one number field.","selector":"[class~=\"aui-table-cell\"]"},
        {"id":"number-field","partId":"number-field","title":"Number field","explanation":"The input that edits a spacing value: \"X Spacing 1\" starts at 6 and \"Y Spacing 1\" at 8, with min 1.","keyIdea":"The input that edits a spacing value: \"X Spacing 1\" starts at 6 and \"Y Spacing 1\" at 8, with min 1.","selector":"[class~=\"aui-number-field\"]"},
        {"id":"number-group","partId":"number-group","title":"Input group","explanation":"Fixed surface frame holding the input and its unit.","keyIdea":"Fixed surface frame holding the input and its unit.","selector":"[class~=\"aui-number-field-group\"]"},
        {"id":"number-input","partId":"number-input","title":"Input","explanation":"The editable numeric text, right-aligned.","keyIdea":"The editable numeric text, right-aligned.","selector":"[class~=\"aui-number-field-group\"] [class~=\"aui-input\"]"},
        {"id":"number-unit","partId":"number-unit","title":"Unit","explanation":"The \"in\" unit that follows each value.","keyIdea":"The \"in\" unit that follows each value.","selector":"[class~=\"aui-number-field-unit\"]"},
      ],
options: [
    { id: "adm-cell-input", name: "Cell input table", showContext: false, apps: ["adm"], source: {"adm":"src/features/design-inputs/components/GeometrySection/AnchorSpacingTable.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: { adm: 'src/features/design-inputs/components/GeometrySection/AnchorSpacingTable.tsx' },
  summary: 'A table whose cells hold inputs: each spacing value is edited in its own number field.',
  where: 'ADM Design inputs, Geometry section: AnchorSpacingTable.tsx, the Anchor Spacing table with one row per anchor and a Column and a Row spacing cell.',
  when: 'Use it when a grid of values is edited in place. Give each input an aria-label (the column header is its visible label) and let the field fill the cell with minWidth 0 so it shrinks to the column. A table of read-only values is Table-001 or Table-003.',
  how: 'Table with aria-label, scroll "self" (fixed layout, so the columns share the width), aui scale "sm", shape "soft", width "fill". The index header and body cell both pin sx width "32" (head and body are separate tables under scroll "self"); the two value columns share the rest. Each value cell holds a Field.NumberField (width "fill", minWidth "0", min 1) with a Field.NumberFieldGroup (color "surface", paint "fixed"), a Field.NumberFieldInput (minWidth "0", textAlign "end") and a Field.NumberFieldUnit with the unit in a Symbol. The scene shows the enabled state; the app disables a cell beyond the pattern count and renders one row per anchor, so the scene leaves out the extra rows and the disabled cells. Only ADM has it, so there is one group.',
  anatomy: [
    {
      id: 'table',
      name: 'Table',
      selector: '[class~="aui-table"]',
      description: 'Editable grid: a self-scrolling soft table at scale "sm", filling the width, whose body cells contain number fields.',
    },
    {
      id: 'head',
      name: 'Header',
      selector: '[class~="aui-table-head"]',
      description: 'Column headings #, Column Spacing and Row Spacing.',
    },
    {
      id: 'header-cell',
      name: 'Header cell',
      selector: '[class~="aui-table-header-cell"]',
      description: 'Heading for one editable spacing column; # is fixed at 32px.',
    },
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-table-body"]',
      description: 'Rows of anchor spacings the user edits in place.',
    },
    {
      id: 'row',
      name: 'Row',
      selector: '[class~="aui-table-body"] [class~="aui-table-body"] [class~="aui-table-row"]',
      description: 'Anchor 1, with an X and a Y spacing input in the other two cells.',
    },
    {
      id: 'cell',
      name: 'Cell',
      selector: '[class~="aui-table-cell"]',
      description: 'Body cell: the 32px row number, or the wrapper around one number field.',
    },
    {
      id: 'number-field',
      name: 'Number field',
      selector: '[class~="aui-number-field"]',
      description: 'The input that edits a spacing value: "X Spacing 1" starts at 6 and "Y Spacing 1" at 8, with min 1.',
    },
    {
      id: 'number-group',
      name: 'Input group',
      selector: '[class~="aui-number-field-group"]',
      description: 'Fixed surface frame holding the input and its unit.',
    },
    {
      id: 'number-input',
      name: 'Input',
      selector: '[class~="aui-number-field-group"] [class~="aui-input"]',
      description: 'The editable numeric text, right-aligned.',
    },
    {
      id: 'number-unit',
      name: 'Unit',
      selector: '[class~="aui-number-field-unit"]',
      description: 'The "in" unit that follows each value.',
    },
  ],
});
