import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Menubar with text triggers',
  title: 'Help Center menu',
  apps: ['hcs', 'ace', 'adm', 'hs', 'adc', 'pbs', 'pfd', 'rws', 'agpd'],
    layers: [
        {"id":"menubar","partId":"menubar","title":"Menubar","explanation":"The top bar whose last menu is Help Center; the HCS scene sets it at scale \"sm\" and names it \"Main navigation\".","keyIdea":"The top bar whose last menu is Help Center; the HCS scene sets it at scale \"sm\" and names it \"Main navigation\".","selector":"[class~=\"aui-menubar\"]"},
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"The text trigger \"Help Center\".","keyIdea":"The text trigger \"Help Center\".","selector":"[class~=\"aui-menubar-trigger\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"The 192px wide popup under the trigger (288px in the HCS scene), aligned to the trigger start.","keyIdea":"The 192px wide popup under the trigger (288px in the HCS scene), aligned to the trigger start.","selector":"[class~=\"aui-dropdown-popup\"]"},
        {"id":"item","partId":"item","title":"Item","explanation":"A help action row: \"Feedback\", \"Tutorials\" or \"Add to Home Screen\".","keyIdea":"A help action row: \"Feedback\", \"Tutorials\" or \"Add to Home Screen\".","selector":"[class~=\"aui-dropdown-item\"]"},
        {"id":"submenu-trigger","partId":"submenu-trigger","title":"Submenu trigger","explanation":"In the HCS scene \"Tutorials\" is a submenu trigger that opens one tutorial to its right.","keyIdea":"In the HCS scene \"Tutorials\" is a submenu trigger that opens one tutorial to its right.","selector":"[class~=\"aui-dropdown-submenu-trigger\"]"},
      ],
options: [
    { id: "hcs-help-center", showContext: false, name: "Help Center menu", apps: ["hcs"], source: {"hcs":"src/App.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "pbs-help-center", showContext: false, name: "Help Center menu — UI variant 2", apps: ["ace","adm","hs","adc","pbs","pfd","rws","agpd"], source: {"ace":"src/features/top-navigation/ui/AceNavBar.tsx","adm":"src/app/layout/NavBar/NavBar.tsx","hs":"src/hs/TopBar.tsx","adc":"src/adc/Workspace.tsx","pbs":"src/TopBar.tsx","pfd":"src/pfd/TopBar.tsx","rws":"src/rws/TopBar.tsx","agpd":"src/agpd/TopBar.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: {
    hcs: 'src/App.tsx',
    ace: 'src/features/top-navigation/ui/AceNavBar.tsx',
    adm: 'src/app/layout/NavBar/NavBar.tsx',
    hs: 'src/hs/TopBar.tsx',
    adc: 'src/adc/Workspace.tsx',
    pbs: 'src/TopBar.tsx',
    pfd: 'src/pfd/TopBar.tsx',
    rws: 'src/rws/TopBar.tsx',
    agpd: 'src/agpd/TopBar.tsx',
  },
  summary: 'A Help Center text trigger on the top bar opens a popup of the few help actions of an application: Feedback, Tutorials, Add to Home Screen.',
  where: 'The Help Center menu closes the top menubar of nine apps (FD has no menus). Feedback and Tutorials are in every Help Center menu (HS words them "Feedback: Help us improve!" and "Contact: Request local support!" plus Tutorials), and PBS, PFD, RWS and AGPD add Add to Home Screen.',
  when: 'Use the trigger and popup for the few help actions of an application, where each row only runs an action or opens a dialog or panel. Do not use it for file actions (Menubar-002) or a single action (Menubar-001).',
  how: 'One instruction: a Menubar.Dropdown inside a Menubar, a Menubar.DropdownTrigger with the text, then Portal, Positioner (align "start", sideOffset 4; side bottom by default) and a Menubar.DropdownPopup of Menubar.DropdownItem rows, with an aui sx width on the popup. A row that holds several choices is a Menubar.DropdownSubmenuRoot whose Menubar.DropdownSubmenuTrigger (a right chevron row) opens a second Portal, Positioner (side "right", align "start", sideOffset 4) and Popup at the default width; a Menubar.DropdownSeparator splits the rows. Help Center menu, other apps (ACE, ADM, HS, ADC, PBS, PFD, RWS, AGPD): a Menubar at scale "sm" holds the trigger "Help Center" and a popup of plain rows: Feedback, Tutorials and Add to Home Screen. The popup width is a size difference only: 192 here (PBS, PFD, RWS, AGPD), 160 in ADM and ADC, 288 in ACE and HS. Help Center menu, HCS: the same trigger and a 288px popup whose first row is a submenu trigger "Tutorials" opening to the right with the single item "HCS: General Tutorial", and the plain item "Feedback Form" follows. Item wording is each app\'s own. The scenes are open with every item enabled (ADC disables Tutorials by state) and leave out the dialogs the rows open and the rest of the top bar.',
  anatomy: [
    {
      id: 'menubar',
      name: 'Menubar',
      selector: '[class~="aui-menubar"]',
      description: 'The top bar whose last menu is Help Center; the HCS scene sets it at scale "sm" and names it "Main navigation".',
    },
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-menubar-trigger"]',
      description: 'The text trigger "Help Center".',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dropdown-popup"]',
      description: 'The 192px wide popup under the trigger (288px in the HCS scene), aligned to the trigger start.',
    },
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-dropdown-item"]',
      description: 'A help action row: "Feedback", "Tutorials" or "Add to Home Screen".',
    },
    {
      id: 'submenu-trigger',
      name: 'Submenu trigger',
      selector: '[class~="aui-dropdown-submenu-trigger"]',
      description: 'In the HCS scene "Tutorials" is a submenu trigger that opens one tutorial to its right.',
    },
  ],
});
