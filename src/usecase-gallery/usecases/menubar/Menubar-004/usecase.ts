import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Menubar with icon trigger',
  title: 'Settings gear menu',
  apps: ['hcs', 'adm', 'ace', 'hs', 'pfd', 'agpd', 'rws', 'pbs'],
  options: [
    { id: "hcs-gear-menu", name: "Gear menu", apps: ["hcs","adm"], source: {"hcs":"src/App.tsx","adm":"src/features/settings/components/SettingsMenu.tsx"} },
    { id: "ace-gear-menu", name: "Gear menu — UI variant 2", apps: ["ace","hs","pfd","agpd","rws","pbs"], source: {"ace":"src/features/settings/ui/SettingsMenu.tsx","hs":"src/hs/TopBar.tsx","pfd":"src/pfd/TopBar.tsx","agpd":"src/agpd/TopBar.tsx","rws":"src/rws/TopBar.tsx","pbs":"src/TopBar.tsx"} },
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
      token: 'Menubar',
      selector: '[class~="aui-menubar"]',
      description: 'The "Top bar" strip whose right end holds the gear; the HCS and ACE scenes set it at scale "sm" and right-aligned.',
      code: `<Menubar aria-label="Top bar">
  {/* … */}
</Menubar>`,
    },
    {
      id: 'trigger',
      name: 'Trigger',
      token: 'Menubar.DropdownTrigger',
      selector: '[class~="aui-menubar-trigger"]',
      description: 'Square gear button with aria-label "Settings" (profile "square") that opens the layout menu.',
      code: `<Menubar.DropdownTrigger aria-label="Settings" aui={{ profile: 'square' }}>
  {/* … */}
</Menubar.DropdownTrigger>`,
    },
    {
      id: 'trigger-icon',
      name: 'Trigger icon',
      token: 'Menubar.Icon',
      selector: '[class~="aui-menubar-trigger"] > [class~="aui-contained-icon"]',
      description: 'The gear glyph that is the whole visible content of the trigger.',
      code: `<Menubar.Icon name="gear" />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Menubar.DropdownPopup',
      selector: '[class~="aui-dropdown-popup"]',
      description: 'Menu labelled "Settings", aligned to the end of the trigger so it stays on screen at the right edge.',
      code: `<Menubar.DropdownPopup aria-label="Settings">
  {/* … */}
</Menubar.DropdownPopup>`,
    },
    {
      id: 'group',
      name: 'Group',
      token: 'Menubar.DropdownGroup',
      selector: '[class~="aui-dropdown-group"]',
      description: 'The Pane Orientation group that holds its heading and the orientation rows.',
      code: `<Menubar.DropdownGroup>
  {/* … */}
</Menubar.DropdownGroup>`,
    },
    {
      id: 'group-label',
      name: 'Group label',
      token: 'Menubar.DropdownGroupLabel',
      selector: '[class~="aui-dropdown-group-label"]',
      description: 'The caption "Pane Orientation" (and "Pane Layout" in the scenes).',
      code: `<Menubar.DropdownGroupLabel>Pane Orientation</Menubar.DropdownGroupLabel>`,
    },
    {
      id: 'radio-group',
      name: 'Radio group',
      token: 'Menubar.DropdownRadioGroup',
      selector: '[class~="aui-dropdown-radio-group"]',
      description: 'Single-choice set with "vertical" chosen; the scenes add Horizontal and Grid.',
      code: `<Menubar.DropdownRadioGroup defaultValue="vertical">
  {/* … */}
</Menubar.DropdownRadioGroup>`,
    },
    {
      id: 'radio-item',
      name: 'Radio item',
      token: 'Menubar.DropdownRadioItem',
      selector: '[class~="aui-dropdown-radio-item"]',
      description: 'The "Vertical" orientation row with its leading table-columns icon and a hidden indicator.',
      code: `<Menubar.DropdownRadioItem value="vertical">
  <Menubar.Icon name="table-columns" />
  Vertical
  <Menubar.DropdownRadioItemIndicator hidden />
</Menubar.DropdownRadioItem>`,
    },
    {
      id: 'item-icon',
      name: 'Row icon',
      token: 'Menubar.Icon',
      selector: '[class~="aui-dropdown-radio-item"] > [class~="aui-contained-icon"]',
      description: 'The leading glyph of a row, such as table-columns for Vertical.',
      code: `<Menubar.Icon name="table-columns" />`,
    },
    {
      id: 'item',
      name: 'Item',
      token: 'Menubar.DropdownItem',
      selector: '[class~="aui-dropdown-item"]',
      description: 'The "Reset layout to default" action row of the scenes, under its own Pane Layout group.',
      code: `<Menubar.DropdownItem>
  <Menubar.Icon name="rotate-left" />
  Reset layout to default
</Menubar.DropdownItem>`,
    },
    {
      id: 'separator',
      name: 'Separator',
      token: 'Menubar.DropdownSeparator',
      selector: '[class~="aui-dropdown-separator"]',
      description: 'The divider between the orientation group, the layout group and the check row in the scenes.',
      code: `<Menubar.DropdownSeparator />`,
    },
    {
      id: 'checkbox-item',
      name: 'Checkbox item',
      token: 'Menubar.DropdownCheckboxItem',
      selector: '[class~="aui-dropdown-checkbox-item"]',
      description: 'The "Auto-Rotate 3D Model" check row of the HCS scene, shown only where the app has a 3D model.',
      code: `<Menubar.DropdownCheckboxItem defaultChecked>
  {/* … */}
</Menubar.DropdownCheckboxItem>`,
    },
  ],
});
