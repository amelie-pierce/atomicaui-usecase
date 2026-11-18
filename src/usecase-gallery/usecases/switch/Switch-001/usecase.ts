import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Column settings',
  title: 'Column visibility switch',
  apps: ['hcs', 'hs', 'fd'],
  cases: [{ id: 'hcs-columns', name: 'Column visibility', apps: ['hcs', 'hs', 'fd'], source: { hcs: 'src/components/ColumnVisibility.tsx', hs: 'src/hs/ColumnVisibility.tsx', fd: 'src/components/ColumnSettings.jsx' } }],
  source: { hcs: 'src/components/ColumnVisibility.tsx', hs: 'src/hs/ColumnVisibility.tsx', fd: 'src/components/ColumnSettings.jsx' },
  summary: 'A switch at the end of a list row that shows or hides the column the row names.',
  where: 'The Configure columns popover of the results table in HCS, HS and FD: one List row per column, the column name first and the switch in the row actions. The switch has no visible label (it carries an aria-label "Show <column>"); the row text names it.',
  when: 'Use it for an on and off choice that applies at once and sits in a list of similar items, where the row text is the label. Use a Switch.Label when the switch stands alone (Switch-002).',
  how: 'HCS, HS and FD: a List.Item with a List.ItemText and, inside List.ItemActions, a Switch with no children and an aria-label, aui states selected { color "primary", paint "solid" } so an on switch is the orange primary fill and an off switch the pale slate track (computed 44 by 22px, 999px radius, 14px thumb at 26px when on, 4px when off). The three apps render the same switch. HCS and HS also set the row locked and the switch disabled for a column that cannot be hidden, add a List.DragHandle after the switch and an indicator before the text so the list can be reordered; FD has no drag handle and no locked column. The scene shows the switch enabled, one row, and leaves out the search field, the drag handle, the locked state and the Group by model switch (Switch-002).',
});
