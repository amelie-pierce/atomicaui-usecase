import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Menubar with icon trigger',
  title: 'Settings gear menu',
  apps: ['hcs', 'adm', 'ace', 'hs', 'pfd', 'agpd', 'rws', 'pbs'],
    layers: [
        {"id":"menubar","partId":"menubar","title":"Menubar","explanation":"Top bar ends with a right-aligned gear in HCS and ACE.","keyIdea":"The top bar groups application navigation while keeping Settings at its far edge.","selector":"[class~=\"aui-menubar\"]"},
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"Square Settings gear button opens the layout menu.","keyIdea":"A square gear target opens layout preferences without spending space on a text label.","selector":"[class~=\"aui-menubar-trigger\"]","code":["View"]},
        {"id":"trigger-icon","partId":"trigger-icon","title":"Trigger icon","explanation":"The gear glyph that is the whole visible content of the trigger.","keyIdea":"The gear glyph makes the preference action recognizable inside its compact trigger.","selector":"[class~=\"aui-menubar-trigger\"] > [class~=\"aui-contained-icon\"]","code":["View"],"unchanged":true},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"Settings menu aligns to the trigger end to stay onscreen.","keyIdea":"End alignment keeps the menu on screen when the trigger sits at the right boundary.","selector":"[class~=\"aui-dropdown-popup\"]"},
        {"id":"group","partId":"group","title":"Group","explanation":"The Pane Orientation group that holds its heading and the orientation rows.","keyIdea":"The group binds the orientation heading to the choices that follow it.","selector":"[class~=\"aui-dropdown-group\"]"},
        {"id":"group-label","partId":"group-label","title":"Group label","explanation":"The captions Pane Orientation and Pane Layout name each group.","keyIdea":"The group caption tells users that the following rows change pane orientation.","selector":"[class~=\"aui-dropdown-group-label\"]"},
        {"id":"radio-group","partId":"radio-group","title":"Radio group","explanation":"Single-choice set starts at Vertical, beside Horizontal and Grid.","keyIdea":"The radio set allows only one pane arrangement to be active at a time.","selector":"[class~=\"aui-dropdown-radio-group\"]"},
        {"id":"radio-item","partId":"radio-item","title":"Radio item","explanation":"Vertical row leads with a table icon and hides its indicator.","keyIdea":"Each radio row pairs an arrangement name with its layout icon and selected state.","selector":"[class~=\"aui-dropdown-radio-item\"]"},
        {"id":"item-icon","partId":"item-icon","title":"Row icon","explanation":"The leading glyph of a row, such as table-columns for Vertical.","keyIdea":"The row icon distinguishes layout choices before their labels are read.","selector":"[class~=\"aui-dropdown-radio-item\"] > [class~=\"aui-contained-icon\"]","unchanged":true},
        {"id":"item","partId":"item","title":"Item","explanation":"Reset layout action sits under the Pane Layout group.","keyIdea":"Reset layout is separated as an action that restores defaults rather than a choice.","selector":"[class~=\"aui-dropdown-item\"]"},
        {"id":"separator","partId":"separator","title":"Separator","explanation":"Thin dividers separate orientation, layout, and checkbox groups.","keyIdea":"Dividers mark where orientation, reset, and model controls form different groups.","selector":"[class~=\"aui-dropdown-separator\"]"},
        {"id":"checkbox-item","partId":"checkbox-item","title":"Checkbox item","explanation":"HCS shows Auto-Rotate only when a 3D model exists.","keyIdea":"The checkbox toggles automatic model rotation without changing pane layout.","selector":"[class~=\"aui-dropdown-checkbox-item\"]","code":["View"]},
      ],
options: [
    { id: "hcs-gear-menu", showContext: false, name: "3D rotation menu", apps: ["hcs","adm"], source: {"hcs":"src/App.tsx","adm":"src/features/settings/components/SettingsMenu.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "ace-gear-menu", showContext: false, name: "Pane layout menu", apps: ["ace","hs","pfd","agpd","rws","pbs"], source: {"ace":"src/features/settings/ui/SettingsMenu.tsx","hs":"src/hs/TopBar.tsx","pfd":"src/pfd/TopBar.tsx","agpd":"src/agpd/TopBar.tsx","rws":"src/rws/TopBar.tsx","pbs":"src/TopBar.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: {
    hcs: 'src/App.tsx',
    adm: 'src/features/settings/components/SettingsMenu.tsx',
    ace: 'src/features/settings/ui/SettingsMenu.tsx',
    hs: 'src/hs/TopBar.tsx',
    pfd: 'src/pfd/TopBar.tsx',
    agpd: 'src/agpd/TopBar.tsx',
    rws: 'src/rws/TopBar.tsx',
    pbs: 'src/TopBar.tsx',
  },
  summary: 'A square gear button in the top bar opens a grouped menu of pane orientation radio rows, a reset row and, where the app has a 3D model, an Auto-Rotate check row.',
  where: 'The right end of the top bar, before the theme toggle, in every app but ADC: the layout settings that choose the Input and Output pane orientation (Vertical, Horizontal, Grid) and reset the pane sizes.',
  when: 'Use it for view settings that change the layout the user is working in, where each choice is a standing state rather than an action. Radio rows pick one orientation; the checkbox row switches one option. Do not use it for file or help actions: those are the File and Help Center menus (Menubar-002 and the next ones). The phone drawer row is Menubar-005.',
  how: 'A Menubar.Dropdown whose Menubar.DropdownTrigger is the "gear" Menubar.Icon with profile "square" and aria-label "Settings" (the apps say "Layout settings" in places); the popup is aligned to the end of the trigger, 4px below it. Two Menubar.DropdownGroups, each with a GroupLabel ("Pane Orientation", "Pane Layout"): a RadioGroup of three RadioItems (Vertical "table-columns", Horizontal "table-rows", Grid "grid-2") and one DropdownItem "Reset layout to default" ("rotate-left"), with a Separator between the groups. Every row has a leading icon, and every RadioItem composes a Menubar.DropdownRadioItemIndicator with the hidden attribute: the kit draws a trailing dot unless an indicator is composed, so the chosen row shows only the item\'s own selected fill. Gear menu, HCS, ADM: the same menu plus a Separator and a CheckboxItem "Auto-Rotate 3D Model" ("rotate") with its indicator hidden; both apps wrap the trigger in an icon Tooltip "Settings" (the scene leaves it out because the open menu hides it), and HCS writes scale "sm" on the Dropdown, trigger and popup. Gear menu, other apps (ACE, HS, PFD, AGPD, PBS, RWS): the menu without Auto-Rotate (these apps have no 3D model) and without the trigger tooltip. Scale does not split the groups: PFD and AGPD write scale "sm" on the Dropdown, trigger and popup, PBS on the popup only, and ACE, HS and RWS write none; the rendered popups, rows (28px high, 6px gap) and trigger (28px square) match. RWS also puts a Separator under each group label; that is an app-side deviation from the shared menu, so it is not drawn. The scenes show the enabled state: the apps disable Reset layout to default while the layout is at its default and the Grid row below 992px. Each scene is a minimal Menubar holding only the Settings trigger, shown open; the theme toggle, the other bar items and the File and Help Center menus are left out.',
  anatomy: [
    {
      id: 'menubar',
      name: 'Menubar',
      selector: '[class~="aui-menubar"]',
      description: 'The "Top bar" strip whose right end holds the gear; the HCS and ACE scenes set it at scale "sm" and right-aligned.',
    },
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-menubar-trigger"]',
      description: 'Square gear button with aria-label "Settings" (profile "square") that opens the layout menu.',
    },
    {
      id: 'trigger-icon',
      name: 'Trigger icon',
      selector: '[class~="aui-menubar-trigger"] > [class~="aui-contained-icon"]',
      description: 'The gear glyph that is the whole visible content of the trigger.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dropdown-popup"]',
      description: 'Menu labelled "Settings", aligned to the end of the trigger so it stays on screen at the right edge.',
    },
    {
      id: 'group',
      name: 'Group',
      selector: '[class~="aui-dropdown-group"]',
      description: 'The Pane Orientation group that holds its heading and the orientation rows.',
    },
    {
      id: 'group-label',
      name: 'Group label',
      selector: '[class~="aui-dropdown-group-label"]',
      description: 'The caption "Pane Orientation" (and "Pane Layout" in the scenes).',
    },
    {
      id: 'radio-group',
      name: 'Radio group',
      selector: '[class~="aui-dropdown-radio-group"]',
      description: 'Single-choice set with "vertical" chosen; the scenes add Horizontal and Grid.',
    },
    {
      id: 'radio-item',
      name: 'Radio item',
      selector: '[class~="aui-dropdown-radio-item"]',
      description: 'The "Vertical" orientation row with its leading table-columns icon and a hidden indicator.',
    },
    {
      id: 'item-icon',
      name: 'Row icon',
      selector: '[class~="aui-dropdown-radio-item"] > [class~="aui-contained-icon"]',
      description: 'The leading glyph of a row, such as table-columns for Vertical.',
    },
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-dropdown-item"]',
      description: 'The "Reset layout to default" action row of the scenes, under its own Pane Layout group.',
    },
    {
      id: 'separator',
      name: 'Separator',
      selector: '[class~="aui-dropdown-separator"]',
      description: 'The divider between the orientation group, the layout group and the check row in the scenes.',
    },
    {
      id: 'checkbox-item',
      name: 'Checkbox item',
      selector: '[class~="aui-dropdown-checkbox-item"]',
      description: 'The "Auto-Rotate 3D Model" check row of the HCS scene, shown only where the app has a 3D model.',
    },
  ],
});
