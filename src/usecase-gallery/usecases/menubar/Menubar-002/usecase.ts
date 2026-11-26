import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Menubar with text triggers',
  title: 'File menu',
  apps: ['hs', 'adc', 'adm', 'ace', 'hcs', 'pbs', 'pfd', 'rws', 'agpd'],
    layers: [
        {"id":"menubar","partId":"menubar","title":"Menubar","explanation":"Top bar starts with File; apps may add About, Reset, or Help.","keyIdea":"A single top bar keeps File first while leaving room for the other application actions.","selector":"[class~=\"aui-menubar\"]"},
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"The text trigger \"File\" that opens the device, template and print actions.","keyIdea":"The File trigger names the action group before its popup opens.","selector":"[class~=\"aui-menubar-trigger\"]","code":["Menubar"],"unchanged":true},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"192px menu opens 4px below its start-aligned trigger.","keyIdea":"The narrow popup keeps file commands aligned to their own trigger.","selector":"[class~=\"aui-dropdown-popup\"]"},
        {"id":"item","partId":"item","title":"Item","explanation":"A plain action row: \"Save to device\" or \"Open from device\".","keyIdea":"Each row runs one device action without implying that it has a nested menu.","selector":"[class~=\"aui-dropdown-item\"]"},
        {"id":"separator","partId":"separator","title":"Separator","explanation":"The divider between the device actions and the Print submenu.","keyIdea":"A divider separates file transfer actions from the print submenu.","selector":"[class~=\"aui-dropdown-separator\"]"},
        {"id":"submenu-trigger","partId":"submenu-trigger","title":"Submenu trigger","explanation":"Print row’s arrow opens a second menu with Print output.","keyIdea":"The trailing arrow signals that Print opens a second level of commands.","selector":"[class~=\"aui-dropdown-submenu-trigger\"]","code":["Menubar"]},
      ],
options: [
    { id: "hs-file-menu", showContext: false, name: "Print submenu", apps: ["hs","adc"], source: {"hs":"src/hs/TopBar.tsx","adc":"src/adc/Workspace.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "adm-file-menu", showContext: false, name: "Flat file actions", apps: ["adm","ace","hcs","pbs","pfd","rws","agpd"], source: {"adm":"src/app/layout/NavBar/NavBar.tsx","ace":"src/features/top-navigation/ui/AceNavBar.tsx","hcs":"src/App.tsx","pbs":"src/TopBar.tsx","pfd":"src/pfd/TopBar.tsx","rws":"src/rws/TopBar.tsx","agpd":"src/agpd/TopBar.tsx"} ,
      contextLayers: [

      ],
    },
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
      selector: '[class~="aui-menubar"]',
      description: 'The "Top bar" strip with the File menu first; the other apps place About, Reset and Help Center after it.',
    },
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-menubar-trigger"]',
      description: 'The text trigger "File" that opens the device, template and print actions.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dropdown-popup"]',
      description: 'The 192px wide menu surface, 4px below the trigger and aligned to its start.',
    },
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-dropdown-item"]',
      description: 'A plain action row: "Save to device" or "Open from device".',
    },
    {
      id: 'separator',
      name: 'Separator',
      selector: '[class~="aui-dropdown-separator"]',
      description: 'The divider between the device actions and the Print submenu.',
    },
    {
      id: 'submenu-trigger',
      name: 'Submenu trigger',
      selector: '[class~="aui-dropdown-submenu-trigger"]',
      description: 'The "Print" row with a trailing arrow; it opens a second popup to its right holding "Print output".',
    },
  ],
});
