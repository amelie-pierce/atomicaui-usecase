import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Menubar with icon trigger',
  title: 'Settings drawer row menu',
  apps: ['adm', 'ace'],
    layers: [
        {"id":"menubar","partId":"menubar","title":"Menubar","explanation":"Drawer strip holds Settings as a phone menu row.","keyIdea":"The drawer bar makes Settings part of the compact phone navigation surface.","selector":"[class~=\"aui-menubar\"]"},
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"Settings text row opens the menu in place of the desktop gear.","keyIdea":"A full-width Settings row replaces the desktop gear with a readable mobile trigger.","selector":"[class~=\"aui-menubar-trigger\"]","code":["View"]},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"Settings menu opens below and centers on the row.","keyIdea":"Centering the popup below the row keeps its origin clear in the drawer.","selector":"[class~=\"aui-dropdown-popup\"]"},
        {"id":"group","partId":"group","title":"Group","explanation":"The Pane Orientation group with its heading and rows.","keyIdea":"The group connects the pane orientation heading to its available arrangements.","selector":"[class~=\"aui-dropdown-group\"]"},
        {"id":"group-label","partId":"group-label","title":"Group label","explanation":"Pane Orientation label names the radio choices; apps may say Pane Layout.","keyIdea":"The caption identifies the layout property before users see the radio choices.","selector":"[class~=\"aui-dropdown-group-label\"]"},
        {"id":"radio-group","partId":"radio-group","title":"Radio group","explanation":"Single-choice group starts at Vertical; apps can add Horizontal and Grid.","keyIdea":"A single-choice group prevents conflicting pane arrangements from being selected together.","selector":"[class~=\"aui-dropdown-radio-group\"]"},
        {"id":"radio-item","partId":"radio-item","title":"Radio item","explanation":"The \"Vertical\" row with its table-columns icon and a hidden indicator.","keyIdea":"The selected row exposes Vertical as the current phone layout.","selector":"[class~=\"aui-dropdown-radio-item\"]"},
        {"id":"item-icon","partId":"item-icon","title":"Row icon","explanation":"The leading glyph of a row, table-columns for Vertical.","keyIdea":"The leading columns icon previews the structure users will get from the row.","selector":"[class~=\"aui-dropdown-radio-item\"] > [class~=\"aui-contained-icon\"]","unchanged":true},
        {"id":"item","partId":"item","title":"Item","explanation":"The \"Reset layout to default\" row of the ACE and ADM scenes.","keyIdea":"The reset action restores the arrangement without masquerading as another radio choice.","selector":"[class~=\"aui-dropdown-item\"]"},
        {"id":"separator","partId":"separator","title":"Separator","explanation":"Thin divider separates orientation choices from layout choices.","keyIdea":"Separating layout actions keeps reset distinct from choosing an orientation.","selector":"[class~=\"aui-dropdown-separator\"]"},
        {"id":"checkbox-item","partId":"checkbox-item","title":"Checkbox item","explanation":"ADM adds Auto-Rotate because its scene has a 3D model.","keyIdea":"The model rotation row changes 3D behavior independently from pane arrangement.","selector":"[class~=\"aui-dropdown-checkbox-item\"]","code":["View"]},
      ],
options: [
    { id: "adm-drawer-row", showContext: false, name: "3D rotation drawer", apps: ["adm"], source: {"adm":"src/features/settings/components/SettingsMenu.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "ace-drawer-row", showContext: false, name: "Pane layout drawer", apps: ["ace"], source: {"ace":"src/features/settings/ui/SettingsMenu.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: {
    adm: 'src/features/settings/components/SettingsMenu.tsx',
    ace: 'src/features/settings/ui/SettingsMenu.tsx',
  },
  summary: 'A Settings text row in the phone drawer opens the same layout settings menu that the gear opens on the desktop top bar.',
  where: 'The phone drawer of ADM (src/features/settings/components/SettingsMenu.tsx) and ACE (src/features/settings/ui/SettingsMenu.tsx).',
  when: 'Use it for the layout settings on a phone, where the top bar gear is replaced by a drawer row. Use Menubar-004 on the desktop top bar. Do not use it for file or help actions.',
  how: 'The same menu as the gear menu with a different trigger: the Menubar.DropdownTrigger is the text row "Settings" instead of the gear, and the menu opens beside or below it. ADM places the popup to the left (side "left", align "start", sideOffset 8, above the drawer) and keeps Auto-Rotate; ACE places it below, centred (side "bottom", align "center", sideOffset 4) and has no Auto-Rotate. The scenes show the enabled state: the apps disable Reset layout to default while the layout is at its default, and ADM hides the two groups and keeps only Auto-Rotate below 768px. Each scene is a minimal Menubar holding only the Settings trigger, shown open; the rest of the drawer is left out.',
  anatomy: [
    {
      id: 'menubar',
      name: 'Menubar',
      selector: '[class~="aui-menubar"]',
      description: 'The strip named "Drawer" that holds the Settings row inside the phone drawer.',
    },
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-menubar-trigger"]',
      description: 'The text row "Settings" that opens the menu; it replaces the gear of the desktop bar.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dropdown-popup"]',
      description: 'Menu labelled "Settings", opened below the row (side "bottom") and centred on it (align "center").',
    },
    {
      id: 'group',
      name: 'Group',
      selector: '[class~="aui-dropdown-group"]',
      description: 'The Pane Orientation group with its heading and rows.',
    },
    {
      id: 'group-label',
      name: 'Group label',
      selector: '[class~="aui-dropdown-group-label"]',
      description: 'The "Pane Orientation" caption above the radio rows (and "Pane Layout" in the scenes).',
    },
    {
      id: 'radio-group',
      name: 'Radio group',
      selector: '[class~="aui-dropdown-radio-group"]',
      description: 'Single-choice set with Vertical chosen; the ADM and ACE scenes add Horizontal and Grid.',
    },
    {
      id: 'radio-item',
      name: 'Radio item',
      selector: '[class~="aui-dropdown-radio-item"]',
      description: 'The "Vertical" row with its table-columns icon and a hidden indicator.',
    },
    {
      id: 'item-icon',
      name: 'Row icon',
      selector: '[class~="aui-dropdown-radio-item"] > [class~="aui-contained-icon"]',
      description: 'The leading glyph of a row, table-columns for Vertical.',
    },
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-dropdown-item"]',
      description: 'The "Reset layout to default" row of the ACE and ADM scenes.',
    },
    {
      id: 'separator',
      name: 'Separator',
      selector: '[class~="aui-dropdown-separator"]',
      description: 'The divider between the orientation group and the layout group in the scenes.',
    },
    {
      id: 'checkbox-item',
      name: 'Checkbox item',
      selector: '[class~="aui-dropdown-checkbox-item"]',
      description: 'The "Auto-Rotate 3D Model" check row that the ADM scene adds because ADM has a 3D model.',
    },
  ],
});
