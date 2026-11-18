import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Menubar',
  title: 'File menu',
  apps: ['hs', 'adc', 'adm', 'ace', 'hcs', 'pbs', 'pfd', 'rws', 'agpd'],
  cases: [
    {
      id: 'hs-file-menu',
      name: 'File menu',
      apps: ['hs', 'adc'],
      source: { hs: 'src/hs/TopBar.tsx', adc: 'src/adc/Workspace.tsx' },
    },
    {
      id: 'adm-file-menu',
      name: 'File menu',
      apps: ['adm', 'ace', 'hcs', 'pbs', 'pfd', 'rws', 'agpd'],
      source: {
        adm: 'src/app/layout/NavBar/NavBar.tsx',
        ace: 'src/features/top-navigation/ui/AceNavBar.tsx',
        hcs: 'src/App.tsx',
        pbs: 'src/TopBar.tsx',
        pfd: 'src/pfd/TopBar.tsx',
        rws: 'src/rws/TopBar.tsx',
        agpd: 'src/agpd/TopBar.tsx',
      },
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
  summary: 'The File menu on the top bar: a trigger that opens a popup of device, template and print actions.',
  where: 'The first menu of the top menubar in nine apps, before About, Reset and the Help Center menu. FD has no File menu.',
  when: 'Use it for the file-level actions of the open design (save, open, print), grouped under one bar trigger. A menu of one action, or a setting, is not a File menu.',
  how: 'The menu is a Menubar.Dropdown inside a Menubar: a Menubar.DropdownTrigger "File", then Portal, Positioner (side bottom by default, align "start", sideOffset 4) and Popup at aui sx width "192", holding Menubar.DropdownItem rows. File menu, HS and ADC: after the device and template items a Menubar.DropdownSeparator and a Menubar.DropdownSubmenuRoot whose Menubar.DropdownSubmenuTrigger "Print" (a right chevron row) opens a second Popup at the default width (side "right", align "start", sideOffset 4) with the one print item. Other apps (ADM, ACE, HCS, PBS, PFD, RWS, AGPD): the same popup with plain rows, the last of them Print; the standard is ADM, five rows (Save to device, Open from device, New from template, Save as template, Print) with a separator before Print. ACE and HCS write no separator, PBS, PFD, RWS and AGPD have only Download, Upload, separator, Print, and HCS has only Open, Save, Print at the default popup width (148px instead of 192px); HCS also sets scale "sm" on every part, which renders the same as the default. Item wording is each app\'s own. Both scenes are shown open with every item enabled (the apps disable Save, Download, Print and ADC Save As Template by state); the bar\'s About, Reset and other menus are left out.',
});
