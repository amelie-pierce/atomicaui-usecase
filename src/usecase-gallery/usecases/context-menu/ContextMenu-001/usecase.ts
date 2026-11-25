import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Context menu',
  title: 'Tab context menu',
  apps: ['adc'],
    layers: [
    {"id":"trigger","partId":"trigger","title":"Design tab trigger","explanation":"The Design 1 tab receives the right-click action that opens its secondary menu.","keyIdea":"Attach secondary actions to the row they affect.","selector":"[class~=\"aui-tabs-tab\"]"},
    {"id":"popup","partId":"popup","title":"Menu surface","explanation":"The Tab options popup groups the available actions and is positioned beside the tab.","keyIdea":"Keep secondary choices together in one anchored menu.","selector":"[class~=\"aui-dropdown-popup\"]"},
    {"id":"close-action","partId":"close-action","title":"Close action","explanation":"The first row closes the current design tab.","keyIdea":"Place the most local action first.","selector":"[data-ug-part=\"close-action\"]"},
    {"id":"close-others-action","partId":"close-others-action","title":"Close other designs","explanation":"This row closes every other design while keeping the current tab.","keyIdea":"Make the broader destructive action distinct from closing one item.","selector":"[data-ug-part=\"close-others-action\"]"},
    {"id":"separator","partId":"separator","title":"Action group divider","explanation":"The separator divides close actions from actions that edit or duplicate the design.","keyIdea":"Use a divider when menu actions form different groups.","selector":"[class~=\"aui-dropdown-separator\"]"},
    {"id":"rename-action","partId":"rename-action","title":"Rename action","explanation":"The Rename row opens the name editor for the current design.","keyIdea":"Put related editing actions after the close group.","selector":"[data-ug-part=\"rename-action\"]"},
    {"id":"duplicate-action","partId":"duplicate-action","title":"Duplicate action","explanation":"The Duplicate row creates a copy of the current design.","keyIdea":"Group creation actions with other non-close actions.","selector":"[data-ug-part=\"duplicate-action\"]"},
    {"id":"move-to-top-action","partId":"move-to-top-action","title":"Move to top action","explanation":"The final row moves the current design to the start of the tab rail.","keyIdea":"Place the final related action at the end of the menu.","selector":"[data-ug-part=\"move-to-top-action\"]"},
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
