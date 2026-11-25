import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Menubar with text triggers',
  title: 'Top bar action button',
  apps: ['hs', 'adc', 'adm', 'ace', 'hcs', 'pbs', 'pfd', 'rws', 'agpd'],
  options: [
    { id: "hs-top-bar", name: "Action buttons", source: {"hs":"src/hs/TopBar.tsx"} },
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
  summary: 'A plain text button on the top bar that runs one action without a list of choices: About opens the about dialog, Reset opens the reset confirmation.',
  where: 'The top menubar of nine apps (FD has no menus): the About and Reset action buttons (Menubar.Button) between the File menu and the Help Center menu; the phone drawer also lists them as Menubar.Button rows.',
  when: 'Use a plain Menubar.Button for one top-level action that needs no list of choices: a click runs it or opens a dialog. Use the File menu (Menubar-002) or the Help Center menu (Menubar-003) for a short list of actions grouped under one text trigger. A setting is not this button (Menubar-004).',
  how: 'A Menubar.Button with the label as its child, directly inside the Menubar, no popup, portal or positioner. It measures the same as a Menubar.DropdownTrigger (28px high, 4px 8px padding, 4px radius, 16px regular text, surface fill, no border), so only the code instruction differs (no popup) and the look is shared. The scene is the HS top bar (File, About, Reset and Help Center in a row, the two dropdown triggers closed for context), drawn the same in every app; ADM and ACE translate the wording and the mobile Applications button is the same part. The scene leaves out the dialogs the buttons open and the rest of the top bar (logo, gear).',
  anatomy: [
    {
      id: 'menubar',
      name: 'Menubar',
      token: 'Menubar',
      selector: '[class~="aui-menubar"]',
      description: 'The "Top bar" strip that holds the action button; the HS scene shows it with File and Help Center beside About and Reset.',
      code: `<Menubar aria-label="Top bar">
  {/* … */}
</Menubar>`,
    },
    {
      id: 'button',
      name: 'Button',
      token: 'Menubar.Button',
      selector: '[class~="aui-button"]',
      description: 'The plain About button that runs one action, here the about dialog, with no list of choices.',
      code: `<Menubar.Button>About</Menubar.Button>`,
    },
    {
      id: 'label',
      name: 'Label',
      token: 'Menubar.Button',
      selector: '[class~="aui-button"]',
      text: true,
      description: 'The visible word "About" (Reset in the HS scene) that names the action.',
      code: `<Menubar.Button>About</Menubar.Button>`,
    },
    {
      id: 'trigger',
      name: 'Menu trigger',
      token: 'Menubar.DropdownTrigger',
      selector: '[class~="aui-menubar-trigger"]',
      description: 'In the HS scene the File and Help Center triggers sit around the buttons so the bar shows both kinds.',
      code: `<Menubar.DropdownTrigger>File</Menubar.DropdownTrigger>`,
    },
  ],
});
