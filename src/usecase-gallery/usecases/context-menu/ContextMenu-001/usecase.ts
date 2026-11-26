import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Context menu',
  title: 'Tab context menu',
  apps: ['adc'],
    layers: [
    {"id":"trigger","partId":"trigger","title":"Design tab trigger","explanation":"Design 1 tab opens its secondary menu on right-click.","keyIdea":"The selected design tab anchors the menu to the design whose actions are being changed.","selector":"[class~=\"aui-tabs-tab\"]"},
    {"id":"popup","partId":"popup","title":"Menu surface","explanation":"Tab options popup sits beside the tab and groups actions.","keyIdea":"The popup keeps design-specific commands close to their invoking tab.","selector":"[class~=\"aui-dropdown-popup\"]","code":["View"]},
    {"id":"close-action","partId":"close-action","title":"Close action","explanation":"First row closes the current Design 1 tab.","keyIdea":"Close current removes the active tab while leaving other designs available.","selector":"[data-ug-part=\"close-action\"]","code":["View"],"unchanged":true},
    {"id":"close-others-action","partId":"close-others-action","title":"Close other designs","explanation":"This row closes every other design while keeping the current tab.","keyIdea":"Close other designs preserves the current tab and removes the surrounding alternatives.","selector":"[data-ug-part=\"close-others-action\"]","code":["View"],"unchanged":true},
    {"id":"separator","partId":"separator","title":"Action group divider","explanation":"Divider separates close commands from editing and duplication actions.","keyIdea":"The divider separates tab-closing commands from operations that edit or duplicate a design.","selector":"[class~=\"aui-dropdown-separator\"]","code":["View"],"unchanged":true},
    {"id":"rename-action","partId":"rename-action","title":"Rename action","explanation":"Rename action opens the current design’s name editor.","keyIdea":"Rename edits the current design identity without changing its place in the rail.","selector":"[data-ug-part=\"rename-action\"]","code":["View"],"unchanged":true},
    {"id":"duplicate-action","partId":"duplicate-action","title":"Duplicate action","explanation":"Duplicate action creates a copy of this design.","keyIdea":"Duplicate creates a new copy while leaving the source design intact.","selector":"[data-ug-part=\"duplicate-action\"]","code":["View"],"unchanged":true},
    {"id":"move-to-top-action","partId":"move-to-top-action","title":"Move to top action","explanation":"Final row moves this design to the tab rail’s start.","keyIdea":"Move to top changes the current design’s position without closing it.","selector":"[data-ug-part=\"move-to-top-action\"]","code":["View"],"unchanged":true},
  ],
options: [
    { id: "adc-tab-options", name: "Tab options", apps: ["adc"], source: {"adc":"src/adc/Workspace.tsx"}, showContext: false ,
      contextLayers: [

      ],
    },
  ],
  source: { adc: 'src/adc/Workspace.tsx' },
  summary: 'A right-click on a tab opens a menu of actions for that tab: close, close the others, rename, duplicate and move.',
  where: 'The ADC design tab rail: each design tab is the right-click area of its own context menu, labelled "Tab options" (double-click on the tab also renames).',
  when: 'Use it for secondary actions on an item of a row or list that has no room for a button per action: the item itself is the area, and the menu opens at the pointer. It is the ContextMenu, not a Dropdown: no visible trigger, opened by right-click or long-press.',
  how: 'ADC: a ContextMenu per design whose ContextMenu.Trigger is the tab itself (Tabs.Tab with nativeButton false, rendered through ContextMenu.Trigger as a div; the trigger takes no aui). The popup is a ContextMenu.Popup labelled "Tab options" at the default scale, in the Portal and Positioner without props. It holds plain ContextMenu.Items, each with a leading ContextMenu.Icon: xmark "Close", ban "Close all other designs", a ContextMenu.Separator, then pen "Rename", copy "Duplicate", arrow-up "Move to top". No row is selected and choosing one runs the action and closes the menu. The app disables Close and Close all other designs when one design is left, and every row while a report is running; the scene shows them enabled. The scene shows the menu open under one design tab (CHIP_AUI of the app: surface-alt, solid, soft); the app opens it at the pointer, the scene anchors it 4px below the tab. Drag reorder, rename editing, the close button, the error dot and the other tabs are left out.',
  anatomy: [
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-tabs-tab"]',
      description: 'The "Design 1" tab is the right-click area: a Tabs.Tab with nativeButton off rendered through ContextMenu.Trigger as a div, which takes no aui.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dropdown-popup"]',
      description: 'The menu labelled "Tab options", opened at the pointer in the app and anchored under the tab in the scene.',
    },
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-dropdown-item"]',
      description: 'A plain action row: Close, Close all other designs, Rename, Duplicate or Move to top; choosing one runs it and closes the menu.',
    },
    {
      id: 'icon',
      name: 'Icon',
      selector: '[class~="aui-dropdown-item"] > [class~="aui-contained-icon"]',
      description: 'The leading glyph of each row: xmark, ban, pen, copy and arrow-up.',
    },
    {
      id: 'separator',
      name: 'Separator',
      selector: '[class~="aui-dropdown-separator"]',
      description: 'The divider between the close actions (Close, Close all other designs) and the edit actions (Rename, Duplicate, Move to top).',
    },
  ],
});
