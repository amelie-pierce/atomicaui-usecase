import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Menubar with text triggers',
  title: 'Action buttons',
  apps: ['hs', 'adc', 'adm', 'ace', 'hcs', 'pbs', 'pfd', 'rws', 'agpd'],
  cases: [{ id: 'hs-top-bar', name: 'Top bar', source: { hs: 'src/hs/TopBar.tsx' } }],
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
  summary: 'A plain text button on the top bar that runs one action directly (About, Reset), written beside the menu triggers and drawn the same way.',
  where: 'The top menubar of nine apps (FD has no menus), between the File and Help Center menus: About opens the about dialog and Reset opens the reset confirmation. The phone drawer also lists them as Menubar.Button rows. The File and Help Center menus are Menubar-001.',
  when: 'Use it for one top-level action that needs no list of choices: a click runs it or opens a dialog. Group several related actions under a Menubar.Dropdown trigger instead (Menubar-001); a setting that stays on is not this button.',
  how: 'A Menubar.Button with the label as its child, directly inside the Menubar, with no popup, portal or positioner. It measures the same as a Menubar.DropdownTrigger (28px high, 4px 8px padding, 4px radius, 16px text, surface fill, no border), so the look is shared and the split from Menubar-001 is the code instruction: another part and no popup. One scene, the HS top bar, drawn the same in every app: File, About, Reset and Help Center in a row, where the two dropdown triggers are only closed triggers for context. The app wording differs (ADM and ACE translate About and Reset) and a mobile Applications button is the same part. Left out: the dialogs the buttons open, the logo, the gear and the theme toggle.',
});
