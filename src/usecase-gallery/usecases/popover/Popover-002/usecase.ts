import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'output-header', name: 'Output header', selector: '[data-ug-part="output-header"]', description: 'The heading row of the Output pane, which holds the Configure columns trigger beside its title.' },
  { id: 'output-title', name: 'Output title', selector: '[data-ug-part="output-title"]', description: 'The Output heading that identifies the results whose columns the popover configures.' },
  { id: 'column-trigger', name: 'Configure columns trigger', selector: '[data-ug-part="column-trigger"]', description: 'The table-columns button that anchors the open popover to the results pane.' },
];

export default defineUsecase({
  uiType: 'Popover',
  title: 'Form popover with footer',
  apps: ['hcs', 'hs'],
    layers: [
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"Configure columns button sits beside the Output heading.","keyIdea":"The Configure columns action opens controls where users can tailor the results table.","selector":"[data-base-ui-click-trigger]","code":["View"]},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"320px elevated column holds its title, list, and footer.","keyIdea":"A bounded popover keeps column choices near the table they will change.","selector":"[data-aui-popup-motion][role=\"dialog\"]","code":["View"],"unchanged":true},
        {"id":"column-list","partId":"column-list","title":"Column list","explanation":"Columns list reorders output fields; locked entries stay visible.","keyIdea":"The list gives each output column an independent place in the layout controls.","selector":"[class~=\"aui-list\"]","code":["View"],"unchanged":true},
        {"id":"column-switch","partId":"column-switch","title":"Visibility switch","explanation":"Show column switch hides configurable columns and disables locked ones.","keyIdea":"A visibility switch changes whether its named table column appears.","selector":"[class~=\"aui-switch\"]","code":["View"],"unchanged":true},
        {"id":"drag-handle","partId":"drag-handle","title":"Drag handle","explanation":"Row handle lets users reorder the output columns.","keyIdea":"The drag grip communicates that rows can be reordered without confusing it with visibility.","selector":"[class~=\"aui-list-drag-handle\"]","code":["View"],"unchanged":true},
        {"id":"footer","partId":"footer","title":"Footer row","explanation":"Footer places Reset left and Cancel and Save right.","keyIdea":"The footer separates restoring defaults and saving changes from the column choices.","selector":"[data-ug-part=\"footer\"]"},
        {"id":"reset","partId":"reset","title":"Reset","explanation":"The rotate-left icon button that restores the default columns.","keyIdea":"Reset returns the visibility and order choices to their default arrangement.","selector":"[data-ug-part=\"reset\"]"},
        {"id":"cancel","partId":"cancel","title":"Cancel","explanation":"The text Cancel that discards the column changes.","keyIdea":"Cancel closes the editor without applying pending column changes.","selector":"[data-ug-part=\"cancel\"]"},
        {"id":"save","partId":"save","title":"Save","explanation":"Solid secondary Save applies the layout at app-specific scales.","keyIdea":"Save commits the column visibility and ordering to the results table.","selector":"[data-ug-part=\"save\"]"},
      ],
options: [
    { id: "hcs-configure-columns", showContext: true, contextAnatomy: CONTEXT_ANATOMY, name: "Contained trigger popover", apps: ["hcs"], source: {"hcs":"src/components/ColumnVisibility.tsx"} ,
      contextLayers: [
        { id: 'context-output-header', partId: 'output-header', title: 'Output header', explanation: 'The pane heading row with the Configure columns button beside Output.', keyIdea: 'The HCS results header places column settings at the pane they change.', selector: '[data-ug-part="output-header"]', scope: 'context' },
        { id: 'context-output-title', partId: 'output-title', title: 'Output title', explanation: 'The Output heading at the start of the pane header.', keyIdea: 'The HCS Output label identifies the results whose columns are being configured.', selector: '[data-ug-part="output-title"]', scope: 'context' },
        { id: 'context-column-trigger', partId: 'column-trigger', title: 'Configure columns trigger', explanation: 'The contained table-columns button that opens this popover.', keyIdea: 'The HCS contained trigger anchors the popover to the results header.', selector: '[data-ug-part="column-trigger"]', scope: 'context' },
      ],
    },
    { id: "hs-configure-columns", showContext: true, contextAnatomy: CONTEXT_ANATOMY, name: "Text trigger popover", apps: ["hs"], source: {"hs":"src/hs/ColumnVisibility.tsx"} ,
      contextLayers: [
        { id: 'context-output-header', partId: 'output-header', title: 'Output header', explanation: 'The pane heading row with the Configure columns button beside Output.', keyIdea: 'The HS results header keeps column settings alongside the pane they affect.', selector: '[data-ug-part="output-header"]', scope: 'context' },
        { id: 'context-output-title', partId: 'output-title', title: 'Output title', explanation: 'The Output heading at the start of the pane header.', keyIdea: 'The HS Output label names the results whose columns are being configured.', selector: '[data-ug-part="output-title"]', scope: 'context' },
        { id: 'context-column-trigger', partId: 'column-trigger', title: 'Configure columns trigger', explanation: 'The secondary text table-columns button that opens this popover.', keyIdea: 'The HS text trigger locates the popover at the end of the Output header.', selector: '[data-ug-part="column-trigger"]', scope: 'context' },
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
