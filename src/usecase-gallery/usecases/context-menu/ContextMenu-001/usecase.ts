import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Context menu',
  title: 'Tab context menu',
  apps: ['adc'],
  cases: [{ id: 'adc-tab-options', name: 'Tab options', apps: ['adc'], source: { adc: 'src/adc/Workspace.tsx' } }],
  source: { adc: 'src/adc/Workspace.tsx' },
  summary: 'A right-click on a tab opens a menu of actions for that tab: close, close the others, rename, duplicate and move.',
  where: 'The ADC design tab rail: each design tab is the right-click area of its own context menu, labelled "Tab options" (double-click on the tab also renames).',
  when: 'Use it for secondary actions on an item of a row or list that has no room for a button per action: the item itself is the area, and the menu opens at the pointer. It is the ContextMenu, not a Dropdown: no visible trigger, opened by right-click or long-press.',
  how: 'ADC: a ContextMenu per design whose ContextMenu.Trigger is the tab itself (Tabs.Tab with nativeButton false, rendered through ContextMenu.Trigger as a div; the trigger takes no aui). The popup is a ContextMenu.Popup labelled "Tab options" at the default scale, in the Portal and Positioner without props. It holds plain ContextMenu.Items, each with a leading ContextMenu.Icon: xmark "Close", ban "Close all other designs", a ContextMenu.Separator, then pen "Rename", copy "Duplicate", arrow-up "Move to top". No row is selected and choosing one runs the action and closes the menu. The app disables Close and Close all other designs when one design is left, and every row while a report is running; the scene shows them enabled. The scene shows the menu open under one design tab (CHIP_AUI of the app: surface-alt, solid, soft); the app opens it at the pointer, the scene anchors it 4px below the tab. Drag reorder, rename editing, the close button, the error dot and the other tabs are left out.',
});
