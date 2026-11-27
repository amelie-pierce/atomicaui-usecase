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
options: [
    { id: "hcs-configure-columns", showContext: true, contextAnatomy: CONTEXT_ANATOMY, name: "Contained trigger popover", apps: ["hcs"], source: {"hcs":"src/components/ColumnVisibility.tsx"} ,
     contextAnatomyOverrides: [{"id":"output-header","lesson":{"explanation":"The pane heading row with the Configure columns button beside Output.","scope":"context"}},{"id":"output-title","lesson":{"explanation":"The Output heading at the start of the pane header.","scope":"context"}},{"id":"column-trigger","lesson":{"explanation":"The contained table-columns button that opens this popover.","scope":"context"}}]},
    { id: "hs-configure-columns", showContext: true, contextAnatomy: CONTEXT_ANATOMY, name: "Text trigger popover", apps: ["hs"], source: {"hs":"src/hs/ColumnVisibility.tsx"} ,
     contextAnatomyOverrides: [{"id":"output-header","lesson":{"explanation":"The pane heading row with the Configure columns button beside Output.","scope":"context"}},{"id":"output-title","lesson":{"explanation":"The Output heading at the start of the pane header.","scope":"context"}},{"id":"column-trigger","lesson":{"explanation":"The secondary text table-columns button that opens this popover.","scope":"context"}}]},
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
     lesson: {"explanation":"Configure columns button sits beside the Output heading."}},
    {
      id: 'popup',
      name: 'Popup',
      selector: '[data-aui-popup-motion][role="dialog"]',
      description: 'The 320px elevated column that opens below the trigger aligned to its end, holding the title, the column list and the footer row.',
     lesson: {"explanation":"320px elevated column holds its title, list, and footer.","code":["Popover.Popup"]}},
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
     lesson: {"explanation":"Columns list reorders output fields; locked entries stay visible."}},
    {
      id: 'column-switch',
      name: 'Visibility switch',
      selector: '[class~="aui-switch"]',
      description: 'The switch that shows or hides a column (labelled "Show <column>"), disabled for columns that cannot be hidden.',
     lesson: {"explanation":"Show column switch hides configurable columns and disables locked ones."}},
    {
      id: 'drag-handle',
      name: 'Drag handle',
      selector: '[class~="aui-list-drag-handle"]',
      description: 'The handle that reorders a column row.',
     lesson: {"explanation":"Row handle lets users reorder the output columns."}},
    {
      id: 'footer',
      name: 'Footer row',
      description: 'The row with justifyContent "between" that puts the reset icon at the start and Cancel and Save at the end.',
     lesson: {"explanation":"Footer places Reset left and Cancel and Save right.","selector":"[data-ug-part=\"footer\"]"}},
    {
      id: 'reset',
      name: 'Reset',
      description: 'The rotate-left icon button that restores the default columns.',
     lesson: {"explanation":"The rotate-left icon button that restores the default columns.","selector":"[data-ug-part=\"reset\"]"}},
    {
      id: 'cancel',
      name: 'Cancel',
      description: 'The text Cancel that discards the column changes.',
     lesson: {"explanation":"The text Cancel that discards the column changes.","selector":"[data-ug-part=\"cancel\"]"}},
    {
      id: 'save',
      name: 'Save',
      description: 'The solid secondary Save that applies the column layout (scale "sm" in HCS, default scale in HS).',
     lesson: {"explanation":"Solid secondary Save applies the layout at app-specific scales.","selector":"[data-ug-part=\"save\"]"}},
  ],
});
