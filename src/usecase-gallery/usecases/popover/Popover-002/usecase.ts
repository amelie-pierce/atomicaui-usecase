import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Popover',
  title: 'Form popover with footer',
  apps: ['hcs', 'hs'],
  options: [
    { id: "hcs-configure-columns", name: "Configure columns", apps: ["hcs"], source: {"hcs":"src/components/ColumnVisibility.tsx"} },
    { id: "hs-configure-columns", name: "Configure columns — UI variant 2", apps: ["hs"], source: {"hs":"src/hs/ColumnVisibility.tsx"} },
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
      token: 'Popover.Trigger',
      selector: '[data-base-ui-click-trigger]',
      description: 'The "Configure columns" table-columns icon button beside the Output heading: contained in HCS, a plain secondary text button in HS and the example.',
      code: `<Popover.Trigger render={<IconButton name="table-columns" aria-label="Configure columns" aui={{ color: 'secondary', paint: 'text', scale: 'sm', shape: 'soft' }} />} />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Popover.Popup',
      selector: '[data-aui-popup-motion][role="dialog"]',
      description: 'The 320px elevated column that opens below the trigger aligned to its end, holding the title, the column list and the footer row.',
      code: `<Popover.Popup
  initialFocus={false}
  aria-label="Configure columns"
  render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', minHeight: '0', minWidth: '0', gap: '8', width: '320' } }} />}
>`,
    },
    {
      id: 'popup-heading',
      name: 'Heading',
      token: 'Type',
      text: true,
      description: 'The p3 "Columns" line that titles the popup in the example frame.',
      code: `<Type data-ug-part="popup-heading" as="p" role="p3">Columns</Type>`,
    },
    {
      id: 'column-list',
      name: 'Column list',
      token: 'List',
      selector: '[class~="aui-list"]',
      description: 'The reorderable list labelled "Columns" with one row per output column; locked columns cannot be hidden.',
      code: `<List aria-label="Columns" reorderable>`,
    },
    {
      id: 'column-switch',
      name: 'Visibility switch',
      token: 'Switch',
      selector: '[class~="aui-switch"]',
      description: 'The switch that shows or hides a column (labelled "Show <column>"), disabled for columns that cannot be hidden.',
      code: `<Switch
  aria-label={\`Show \${column.header}\`}
  defaultSelected
  disabled={!column.hideable}
  aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}
/>`,
    },
    {
      id: 'drag-handle',
      name: 'Drag handle',
      token: 'List.DragHandle',
      selector: '[class~="aui-list-drag-handle"]',
      description: 'The handle that reorders a column row.',
      code: `<List.DragHandle label={\`Reorder \${column.header}\`} />`,
    },
    {
      id: 'footer',
      name: 'Footer row',
      token: 'View',
      description: 'The row with justifyContent "between" that puts the reset icon at the start and Cancel and Save at the end.',
      code: `<View data-ug-part="footer" aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', minWidth: '0', justifyContent: 'between' } }}>`,
    },
    {
      id: 'reset',
      name: 'Reset',
      token: 'IconButton',
      description: 'The rotate-left icon button that restores the default columns.',
      code: `<IconButton data-ug-part="reset" name="rotate-left" aria-label="Reset columns to default" aui={{ paint: 'text' }} />`,
    },
    {
      id: 'cancel',
      name: 'Cancel',
      token: 'Button',
      description: 'The text Cancel that discards the column changes.',
      code: `<Button data-ug-part="cancel" aui={{ paint: 'text' }}>Cancel</Button>`,
    },
    {
      id: 'save',
      name: 'Save',
      token: 'Button',
      description: 'The solid secondary Save that applies the column layout (scale "sm" in HCS, default scale in HS).',
      code: `<Button data-ug-part="save" aui={{ color: 'secondary', paint: 'solid' }}>Save</Button>`,
    },
  ],
});
