import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Menubar',
  title: 'Help Center menu',
  apps: ['hcs', 'ace', 'adm', 'hs', 'adc', 'pbs', 'pfd', 'rws', 'agpd'],
  cases: [
    { id: 'hcs-help-center', name: 'Help Center menu', apps: ['hcs'], source: { hcs: 'src/App.tsx' } },
    {
      id: 'pbs-help-center',
      name: 'Help Center menu',
      apps: ['ace', 'adm', 'hs', 'adc', 'pbs', 'pfd', 'rws', 'agpd'],
      source: {
        ace: 'src/features/top-navigation/ui/AceNavBar.tsx',
        adm: 'src/app/layout/NavBar/NavBar.tsx',
        hs: 'src/hs/TopBar.tsx',
        adc: 'src/adc/Workspace.tsx',
        pbs: 'src/TopBar.tsx',
        pfd: 'src/pfd/TopBar.tsx',
        rws: 'src/rws/TopBar.tsx',
        agpd: 'src/agpd/TopBar.tsx',
      },
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
  summary: 'A Help Center text trigger in the top bar opens a short list of help actions.',
  where: 'The top bar of all nine apps with a menu bar, after About and Reset: a Menubar.Dropdown whose trigger reads "Help Center". Feedback and Tutorials are in every app (HS words them "Feedback: Help us improve!" and "Contact: Request local support!" plus Tutorials), and PBS, PFD, RWS and AGPD add Add to Home Screen. HCS groups its tutorials in a submenu.',
  when: 'Use it for the few help actions of an application that are not part of the work surface, where each row only opens a dialog or panel. Use the submenu form only when one row holds several choices; a menu of plain rows stays flat.',
  how: 'Help Center menu, Other apps (ACE, ADM, HS, ADC, PBS, PFD, RWS, AGPD): a Menubar at scale "sm" holds one Menubar.Dropdown. Menubar.DropdownTrigger carries the text "Help Center"; its Portal and Positioner (align "start", sideOffset 4) hold a Menubar.DropdownPopup of plain Menubar.DropdownItem rows: Feedback, Tutorials and Add to Home Screen. The popup width is a size difference only: 192 here (PBS, PFD, RWS, AGPD), 160 in ADM and ADC, 288 in ACE and HS. Help Center menu, HCS: the same trigger and a 288px popup whose first row is a Menubar.DropdownSubmenuRoot with a Menubar.DropdownSubmenuTrigger "Tutorials"; its popup opens to the right (side "right", align "start", sideOffset 4) with the single item "HCS: General Tutorial", and the plain item "Feedback Form" follows. Every scene is open and shows each row enabled (ADC shows Tutorials disabled); the app positioner z-index, the dialogs the rows open and the rest of the top bar (logo, About, Reset, gear) are left out.',
});
