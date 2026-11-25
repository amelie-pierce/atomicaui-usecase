import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Popover',
  title: 'Form popover with footer',
  apps: ['hcs', 'hs'],
    layers: [
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"The \"Configure columns\" table-columns icon button beside the Output heading: contained in HCS, a plain secondary text button in HS and the example.","keyIdea":"The Configure columns action opens controls where users can tailor the results table.","selector":"[data-base-ui-click-trigger]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"The 320px elevated column that opens below the trigger aligned to its end, holding the title, the column list and the footer row.","keyIdea":"A bounded popover keeps column choices near the table they will change.","selector":"[data-aui-popup-motion][role=\"dialog\"]"},
        {"id":"column-list","partId":"column-list","title":"Column list","explanation":"The reorderable list labelled \"Columns\" with one row per output column; locked columns cannot be hidden.","keyIdea":"The list gives each output column an independent place in the layout controls.","selector":"[class~=\"aui-list\"]"},
        {"id":"column-switch","partId":"column-switch","title":"Visibility switch","explanation":"The switch that shows or hides a column (labelled \"Show <column>\"), disabled for columns that cannot be hidden.","keyIdea":"A visibility switch changes whether its named table column appears.","selector":"[class~=\"aui-switch\"]"},
        {"id":"drag-handle","partId":"drag-handle","title":"Drag handle","explanation":"The handle that reorders a column row.","keyIdea":"The drag grip communicates that rows can be reordered without confusing it with visibility.","selector":"[class~=\"aui-list-drag-handle\"]"},
        {"id":"footer","partId":"footer","title":"Footer row","explanation":"The row with justifyContent \"between\" that puts the reset icon at the start and Cancel and Save at the end.","keyIdea":"The footer separates restoring defaults and saving changes from the column choices.","selector":"[data-ug-part=\"footer\"]"},
        {"id":"reset","partId":"reset","title":"Reset","explanation":"The rotate-left icon button that restores the default columns.","keyIdea":"Reset returns the visibility and order choices to their default arrangement.","selector":"[data-ug-part=\"reset\"]"},
        {"id":"cancel","partId":"cancel","title":"Cancel","explanation":"The text Cancel that discards the column changes.","keyIdea":"Cancel closes the editor without applying pending column changes.","selector":"[data-ug-part=\"cancel\"]"},
        {"id":"save","partId":"save","title":"Save","explanation":"The solid secondary Save that applies the column layout (scale \"sm\" in HCS, default scale in HS).","keyIdea":"Save commits the column visibility and ordering to the results table.","selector":"[data-ug-part=\"save\"]"},
      ],
options: [
    { id: "hcs-configure-columns", showContext: false, name: "Configure columns", apps: ["hcs"], source: {"hcs":"src/components/ColumnVisibility.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "hs-configure-columns", showContext: false, name: "Configure columns — UI variant 2", apps: ["hs"], source: {"hs":"src/hs/ColumnVisibility.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: { hcs: 'src/components/ColumnVisibility.tsx', hs: 'src/hs/ColumnVisibility.tsx' },
  summary: 'A popover that holds a small form and ends in a footer row: a reset icon at the start, Cancel and a solid Save at the end.',
  where: 'The Configure columns popover opened from the table-columns icon at the end of the Output header in HCS and HS (ADC edits a value in a smaller popover, Button-022).',
  when: 'Use it for a short list of settings the user confirms or cancels. Do not use it for read-only help (Popover-001) or a menu of choices (Popover-003).',
  how: 'The Popover opens below the trigger `IconButton` (`side="bottom"`, `align="end"`, `sideOffset={4}`); the Popup renders a 320px `View` column (surface, solid, soft, elevation 4, gap 8) with a reorderable `List` and a footer `View` with `justifyContent: "between"`. The footer is the Button-021 group. HCS and HS are two groups: HCS (a contained trigger, a search Field and a Group by model switch, Save at scale "sm") and HS (a secondary text trigger, Save at the default scale). The scenes leave out the search and the group switch.',
  anatomy: [
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[data-base-ui-click-trigger]',
      description: 'The "Configure columns" table-columns icon button beside the Output heading: contained in HCS, a plain secondary text button in HS and the example.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[data-aui-popup-motion][role="dialog"]',
      description: 'The 320px elevated column that opens below the trigger aligned to its end, holding the title, the column list and the footer row.',
    },
    {
      id: 'popup-heading',
      name: 'Heading',
      text: true,
      description: 'The p3 "Columns" line that titles the popup in the example frame.',
    },
    {
      id: 'column-list',
      name: 'Column list',
      selector: '[class~="aui-list"]',
      description: 'The reorderable list labelled "Columns" with one row per output column; locked columns cannot be hidden.',
    },
    {
      id: 'column-switch',
      name: 'Visibility switch',
      selector: '[class~="aui-switch"]',
      description: 'The switch that shows or hides a column (labelled "Show <column>"), disabled for columns that cannot be hidden.',
    },
    {
      id: 'drag-handle',
      name: 'Drag handle',
      selector: '[class~="aui-list-drag-handle"]',
      description: 'The handle that reorders a column row.',
    },
    {
      id: 'footer',
      name: 'Footer row',
      description: 'The row with justifyContent "between" that puts the reset icon at the start and Cancel and Save at the end.',
    },
    {
      id: 'reset',
      name: 'Reset',
      description: 'The rotate-left icon button that restores the default columns.',
    },
    {
      id: 'cancel',
      name: 'Cancel',
      description: 'The text Cancel that discards the column changes.',
    },
    {
      id: 'save',
      name: 'Save',
      description: 'The solid secondary Save that applies the column layout (scale "sm" in HCS, default scale in HS).',
    },
  ],
});
