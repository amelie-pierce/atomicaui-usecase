import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Menubar with text triggers',
  title: 'File menu',
  apps: ['hs', 'adc', 'adm', 'ace', 'hcs', 'pbs', 'pfd', 'rws', 'agpd'],
  options: [
    { id: "hs-file-menu", name: "File menu", apps: ["hs","adc"], source: {"hs":"src/hs/TopBar.tsx","adc":"src/adc/Workspace.tsx"} },
    { id: "adm-file-menu", name: "File menu — UI variant 2", apps: ["adm","ace","hcs","pbs","pfd","rws","agpd"], source: {"adm":"src/app/layout/NavBar/NavBar.tsx","ace":"src/features/top-navigation/ui/AceNavBar.tsx","hcs":"src/App.tsx","pbs":"src/TopBar.tsx","pfd":"src/pfd/TopBar.tsx","rws":"src/rws/TopBar.tsx","agpd":"src/agpd/TopBar.tsx"} },
  ],
  source: {
    hs: 'src/hs/TopBar.tsx',
    adc: 'src/adc/Workspace.tsx',
    adm: 'src/app/layout/NavBar/NavBar.tsx',
    ace: 'src/features/top-navigation/ui/AceNavBar.tsx',
    hcs: 'src/App.tsx',
    pbs: 'src/TopBar.tsx',
    pfd: 'src/pfd/TopBar.tsx',
    rws: 'src/rws/TopBar.tsx',
    agpd: 'src/agpd/TopBar.tsx',
  },
  summary: 'A File text trigger on the top bar opens a popup of device, template and print actions for the open design.',
  where: 'The File menu comes first in the top menubar of nine apps (FD has no menus). Real site source: the top bar of each app (the paths are in source and in each case).',
  when: 'Use the trigger and popup for the file-level actions of the open design (save, open, print), where each row only runs an action or opens a dialog or panel. Use a submenu only when one row holds several choices; a menu of plain rows stays flat. A menu of one action, or a setting, is not this menu (Menubar-001, Menubar-004).',
  how: 'One instruction: a Menubar.Dropdown inside a Menubar, a Menubar.DropdownTrigger with the text, then Portal, Positioner (align "start", sideOffset 4; side bottom by default) and a Menubar.DropdownPopup of Menubar.DropdownItem rows, with an aui sx width on the popup. A row that holds several choices is a Menubar.DropdownSubmenuRoot whose Menubar.DropdownSubmenuTrigger (a right chevron row) opens a second Portal, Positioner (side "right", align "start", sideOffset 4) and Popup at the default width; a Menubar.DropdownSeparator splits the rows. File menu, HS and ADC: after the device and template items a separator and a submenu trigger "Print" opening the one print item, popup width "192". File menu, other apps (ADM, ACE, HCS, PBS, PFD, RWS, AGPD): the same popup with plain rows, the last of them Print; the standard is ADM, five rows (Save to device, Open from device, New from template, Save as template, Print) with a separator before Print. ACE and HCS write no separator, PBS, PFD, RWS and AGPD have only Download, Upload, separator, Print, and HCS has only Open, Save, Print at the default popup width (148px instead of 192px); HCS also sets scale "sm" on every part, which renders the same as the default. Item wording is each app\'s own. The scenes are open with every item enabled (the apps disable Save, Download, Print and ADC Save As Template by state); the app positioner z-index, the dialogs the rows open and the rest of the top bar are left out.',
  anatomy: [
    {
      id: 'menubar',
      name: 'Menubar',
      token: 'Menubar',
      selector: '[class~="aui-menubar"]',
      description: 'The "Top bar" strip with the File menu first; the other apps place About, Reset and Help Center after it.',
      code: `<Menubar aria-label="Top bar">
  {/* … */}
</Menubar>`,
    },
    {
      id: 'trigger',
      name: 'Trigger',
      token: 'Menubar.DropdownTrigger',
      selector: '[class~="aui-menubar-trigger"]',
      description: 'The text trigger "File" that opens the device, template and print actions.',
      code: `<Menubar.DropdownTrigger>File</Menubar.DropdownTrigger>`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Menubar.DropdownPopup',
      selector: '[class~="aui-dropdown-popup"]',
      description: 'The 192px wide menu surface, 4px below the trigger and aligned to its start.',
      code: `<Menubar.DropdownPopup aui={{ sx: { width: '192' } }}>
  {/* … */}
</Menubar.DropdownPopup>`,
    },
    {
      id: 'item',
      name: 'Item',
      token: 'Menubar.DropdownItem',
      selector: '[class~="aui-dropdown-item"]',
      description: 'A plain action row: "Save to device" or "Open from device".',
      code: `<Menubar.DropdownItem>Save to device</Menubar.DropdownItem>`,
    },
    {
      id: 'separator',
      name: 'Separator',
      token: 'Menubar.DropdownSeparator',
      selector: '[class~="aui-dropdown-separator"]',
      description: 'The divider between the device actions and the Print submenu.',
      code: `<Menubar.DropdownSeparator />`,
    },
    {
      id: 'submenu-trigger',
      name: 'Submenu trigger',
      token: 'Menubar.DropdownSubmenuTrigger',
      selector: '[class~="aui-dropdown-submenu-trigger"]',
      description: 'The "Print" row with a trailing arrow; it opens a second popup to its right holding "Print output".',
      code: `<Menubar.DropdownSubmenuTrigger>Print</Menubar.DropdownSubmenuTrigger>`,
    },
  ],
});
