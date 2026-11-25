import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Switch',
  title: 'Switch at row end',
  apps: ['hcs', 'hs', 'fd'],
  options: [
    { id: "hcs-columns", name: "Column visibility", contextAnatomy: [{ id: 'columns-trigger', name: 'Configure columns trigger', description: 'The table-columns IconButton, labelled Configure columns, that opens the popover under it.' }, { id: 'columns-popover', name: 'Configure columns popover', description: 'The elevated popover, 320px wide, anchored under the trigger that holds the column list.' }], apps: ["hcs","hs","fd"], source: {"hcs":"src/components/ColumnVisibility.tsx","hs":"src/hs/ColumnVisibility.tsx","fd":"src/components/ColumnSettings.jsx"} },
  ],
  source: { hcs: 'src/components/ColumnVisibility.tsx', hs: 'src/hs/ColumnVisibility.tsx', fd: 'src/components/ColumnSettings.jsx' },
  summary: 'A switch at the end of a row, with the row\'s name at the start, turns the setting the row names on or off.',
  where: 'The Configure columns popover of the results table in HCS, HS and FD: one List row per column, the column name first and the switch in the row actions. The switch has no visible label (it carries an aria-label \"Show <column>\"); the row text names it.',
  when: 'Use it for an on and off choice that applies at once and sits in a list of similar items, where the row text is the label and the switches line up at one edge. Use a Switch.Label when the switch stands alone (Switch-002). For a row of a form whose off switch has a border, see Switch-003.',
  how: 'All three apps write the switch the same way: no Switch.Label, an aria-label that repeats the row name, 44 by 22px with a 999px radius. Column visibility (HCS, HS, FD, one group): a List.Item with a List.ItemText and, inside List.ItemActions, a Switch with no children and an aria-label, aui states selected { color "primary", paint "solid" } so an on switch is the orange primary fill and an off switch the pale slate track (measured in the gallery scene in headless Chromium: 44 by 22px, 999px radius, 14px thumb; on is rgb(255,83,8) with a white thumb at x=26, off is rgb(241,245,249) with no border and an rgb(18,18,18) thumb at x=4, disabled and on is rgb(224,224,224) with an rgb(100,116,139) thumb). The consumer apps were not run; their props and states are read from the app source, where the three write the same switch. HCS and HS also set the row locked and the switch disabled for a column that cannot be hidden, add a List.DragHandle after the switch and an indicator before the text so the list can be reordered; FD has no drag handle and no locked column. The scene shows the switch enabled, one row, and leaves out the search field, the drag handle, the locked state and the Group by model switch (Switch-002).',
  anatomy: [
    {
      id: "list",
      name: "List",
      selector: "[class~=\"aui-list\"]",
      description: "The \"Columns\" list of the Configure columns popover, one row per results-table column.",
    },
    {
      id: "row",
      name: "Row",
      selector: "[class~=\"aui-list-item\"]",
      description: "The Model row: the column name at the start and its switch in the row actions at the end.",
    },
    {
      id: "row-text",
      name: "Row text",
      selector: "[class~=\"aui-list-item-text\"]",
      description: "The column name \"Model\" that names what the switch shows or hides.",
    },
    {
      id: "row-actions",
      name: "Row actions",
      selector: "[class~=\"aui-list-item-actions\"]",
      description: "The trailing slot at the end of the row that holds the switch.",
    },
    {
      id: "switch",
      name: "Switch",
      selector: "[class~=\"aui-switch\"]",
      description: "The on/off control, on by default, with no visible label; its aria-label \"Show Model\" names it and the selected track is solid primary.",
    },
    {
      id: "thumb",
      name: "Thumb",
      selector: "[class~=\"aui-switch-thumb\"]",
      description: "The movable thumb that sits at the end of the track while the column is shown.",
    },
  ],
});
