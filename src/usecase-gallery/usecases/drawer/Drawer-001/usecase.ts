import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Drawer',
  title: 'Mobile navigation drawer',
  apps: ['ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  cases: [
    {
      id: 'ace-mobile-nav',
      name: 'Mobile navigation',
      source: {
        ace: 'src/features/top-navigation/ui/AceNavBar.tsx',
        adm: 'src/app/layout/NavBar/NavBar.tsx',
        pfd: 'src/pfd/TopBar.tsx',
        pbs: 'src/TopBar.tsx',
        hs: 'src/hs/TopBar.tsx',
        fd: 'src/App.jsx',
        agpd: 'src/agpd/TopBar.tsx',
        rws: 'src/rws/TopBar.tsx',
      },
    },
  ],
  source: {
    ace: 'src/features/top-navigation/ui/AceNavBar.tsx',
    adm: 'src/app/layout/NavBar/NavBar.tsx',
    pfd: 'src/pfd/TopBar.tsx',
    pbs: 'src/TopBar.tsx',
    hs: 'src/hs/TopBar.tsx',
    fd: 'src/App.jsx',
    agpd: 'src/agpd/TopBar.tsx',
    rws: 'src/rws/TopBar.tsx',
  },
  summary: 'A side panel that holds the top bar actions on a phone: a no-padding popup with a vertical menu, opened under the bar.',
  where: 'The phone layout of the top bar in eight apps (HCS and ADC have no drawer). Real source: the top bar of each app (the paths are in source).',
  when: 'Use it to hold the whole top bar menu when it does not fit on a phone. Do not use it on desktop, where the Menubar shows the menus inline.',
  how: '`Drawer` with `swipeDirection="right"`, `modal={false}` and `disablePointerDismissal`, so the bar toggle (a `Menubar.IconButton` bars or xmark) opens and closes it. Portal, `Drawer.Backdrop` and `Drawer.Viewport` start below the bar (`top` equal to the bar height: 36px in ACE, 40px in ADM and HS, a size), then `Drawer.Popup` with `profile: "no-padding"`, `shape: "none"` and `sx: { width: "288", height: "fill" }`, and `Drawer.Content` holding a vertical `Menubar` of `Menubar.Button`s. The apps render the same drawer, so there is one group; ADM adds an Applications view inside the drawer (left out). The scene shows four rows and leaves out the Settings dropdown row (Menubar-002).',
});
