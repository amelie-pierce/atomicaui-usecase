import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Drawer',
  title: 'Mobile navigation drawer',
  apps: ['ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  options: [
    { id: "ace-mobile-nav", name: "Mobile navigation", source: {"ace":"src/features/top-navigation/ui/AceNavBar.tsx","adm":"src/app/layout/NavBar/NavBar.tsx","pfd":"src/pfd/TopBar.tsx","pbs":"src/TopBar.tsx","hs":"src/hs/TopBar.tsx","fd":"src/App.jsx","agpd":"src/agpd/TopBar.tsx","rws":"src/rws/TopBar.tsx"} },
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
  how: '`Drawer` with `swipeDirection="right"`, `modal={false}` and `disablePointerDismissal`, so the bar toggle (a `Menubar.IconButton` bars or xmark) opens and closes it. Portal, `Drawer.Backdrop` and `Drawer.Viewport` start below the bar (`top` equal to the bar height: 36px in ACE, 40px in ADM and HS, a size), then `Drawer.Popup` with `profile: "no-padding"`, `shape: "none"` and `sx: { width: "288", height: "fill" }`, and `Drawer.Content` holding a vertical `Menubar` of `Menubar.Button`s. The apps render the same drawer, so there is one group; ADM adds an Applications view inside the drawer (left out). The scene shows four rows and leaves out the Settings dropdown row (Menubar-005).',
  anatomy: [
    {
      id: 'overlay',
      name: 'Overlay',
      selector: '[class~="aui-drawer-backdrop"]',
      description: 'The scrim behind the drawer; in the ACE scene it starts 36px down so the top bar stays uncovered.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-drawer-popup"]',
      description: 'The 288px-wide, full-height, square no-padding panel labelled "Navigation" that slides in from the right edge on a phone.',
    },
    {
      id: 'content',
      name: 'Content',
      selector: '[class~="aui-drawer-content"]',
      description: 'The region that holds the vertical menubar of top bar actions.',
    },
    {
      id: 'menubar',
      name: 'Vertical menubar',
      selector: '[class~="aui-menubar"]',
      description: 'The vertical Menubar at scale "sm" that stacks the actions full width.',
    },
    {
      id: 'item',
      name: 'Menu rows',
      selector: '[class~="aui-drawer-content"] [class~="aui-button"]',
      description: 'The Save to device, Open from device and About rows of the example; the ACE scene adds Print.',
    },
    {
      id: 'toggle',
      name: 'Bar toggle',
      selector: '[class~="aui-menubar"][aria-label="Top bar"] [class~="aui-button"]',
      description: 'The ACE scene top bar icon button (an xmark labelled "Close navigation") that closes the drawer.',
    },
  ],
});
