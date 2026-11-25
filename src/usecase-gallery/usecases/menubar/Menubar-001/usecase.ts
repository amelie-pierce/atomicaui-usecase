import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Menubar with text triggers',
  title: 'Top bar action button',
  apps: ['hs', 'adc', 'adm', 'ace', 'hcs', 'pbs', 'pfd', 'rws', 'agpd'],
    layers: [
        {"id":"button","partId":"button","title":"Button","explanation":"The plain About button that runs one action, here the about dialog, with no list of choices.","keyIdea":"The About button performs one immediate action instead of opening a choice list.","selector":"[data-ug-part=\"button\"]"},
      ],
options: [
    { id: "hs-top-bar", contextAnatomy: [
      { id: 'top-bar', name: 'Top bar', selector: '[class~="aui-menubar"][aria-label="Top bar"]', description: 'The top bar Menubar that holds both action buttons and menu triggers.' },
      { id: 'file-menu', name: 'File menu trigger', description: 'The File dropdown trigger at the start of the bar, which opens the file actions.' },
      { id: 'reset', name: 'Reset button', description: 'The plain Reset Menubar.Button next to About that restores the design to its defaults.' },
      { id: 'help-menu', name: 'Help Center trigger', description: 'The Help Center dropdown trigger at the end of the bar.' },
    ], name: "Action buttons", source: {"hs":"src/hs/TopBar.tsx"} ,
      contextLayers: [
        {"id":"context-top-bar","partId":"top-bar","title":"Top bar","explanation":"The top bar Menubar that holds both action buttons and menu triggers.","keyIdea":"The top bar places global actions and menus in one persistent navigation strip.","selector":"[class~=\"aui-menubar\"][aria-label=\"Top bar\"]","scope":"context"},
        {"id":"context-file-menu","partId":"file-menu","title":"File menu trigger","explanation":"The File dropdown trigger at the start of the bar, which opens the file actions.","keyIdea":"The File trigger exposes device and project actions without taking room in the bar.","selector":"[data-ug-part=\"file-menu\"]","scope":"context"},
        {"id":"context-reset","partId":"reset","title":"Reset button","explanation":"The plain Reset Menubar.Button next to About that restores the design to its defaults.","keyIdea":"Reset remains a direct neighbor to About so restoring defaults does not require a submenu.","selector":"[data-ug-part=\"reset\"]","scope":"context"},
        {"id":"context-help-menu","partId":"help-menu","title":"Help Center trigger","explanation":"The Help Center dropdown trigger at the end of the bar.","keyIdea":"Help Center sits at the end of the bar as the entry to support destinations.","selector":"[data-ug-part=\"help-menu\"]","scope":"context"},
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
  summary: 'A plain text button on the top bar that runs one action without a list of choices: About opens the about dialog, Reset opens the reset confirmation.',
  where: 'The top menubar of nine apps (FD has no menus): the About and Reset action buttons (Menubar.Button) between the File menu and the Help Center menu; the phone drawer also lists them as Menubar.Button rows.',
  when: 'Use a plain Menubar.Button for one top-level action that needs no list of choices: a click runs it or opens a dialog. Use the File menu (Menubar-002) or the Help Center menu (Menubar-003) for a short list of actions grouped under one text trigger. A setting is not this button (Menubar-004).',
  how: 'A Menubar.Button with the label as its child, directly inside the Menubar, no popup, portal or positioner. It measures the same as a Menubar.DropdownTrigger (28px high, 4px 8px padding, 4px radius, 16px regular text, surface fill, no border), so only the code instruction differs (no popup) and the look is shared. The scene is the HS top bar (File, About, Reset and Help Center in a row, the two dropdown triggers closed for context), drawn the same in every app; ADM and ACE translate the wording and the mobile Applications button is the same part. The scene leaves out the dialogs the buttons open and the rest of the top bar (logo, gear).',
  anatomy: [
    {
      id: 'button',
      name: 'Button',
      selector: '[data-ug-part="button"]',
      description: 'The plain About button that runs one action, here the about dialog, with no list of choices.',
    },
    {
      id: 'label',
      name: 'Label',
      selector: '[data-ug-part="button"]',
      text: true,
      description: 'The visible word "About" (Reset in the HS scene) that names the action.',
    },
  ],
});
