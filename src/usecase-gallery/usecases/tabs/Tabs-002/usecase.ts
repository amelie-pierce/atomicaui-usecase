import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Phone workspace',
  title: 'Phone workspace tabs',
  apps: ['pfd', 'hs', 'agpd', 'fd', 'adm', 'ace', 'pbs'],
  cases: [
    {
      id: 'pfd-phone-tabs',
      name: 'Phone workspace tabs',
      apps: ['pfd', 'hs', 'agpd', 'fd'],
      source: { pfd: 'src/pfd/Workspace.tsx', hs: 'src/App.tsx', agpd: 'src/App.tsx', fd: 'src/App.jsx' },
    },
    {
      id: 'adm-phone-tabs',
      name: 'Phone workspace tabs',
      apps: ['adm', 'ace'],
      source: { adm: 'src/app/layout/MobileWorkbench/MobileWorkbench.tsx', ace: 'src/pages/estimator/EstimatorPage.tsx' },
    },
    { id: 'pbs-phone-tabs', name: 'Phone workspace tabs', apps: ['pbs'], source: { pbs: 'src/App.tsx' } },
  ],
  source: {
    pfd: 'src/pfd/Workspace.tsx',
    hs: 'src/App.tsx',
    agpd: 'src/App.tsx',
    fd: 'src/App.jsx',
    adm: 'src/app/layout/MobileWorkbench/MobileWorkbench.tsx',
    ace: 'src/pages/estimator/EstimatorPage.tsx',
    pbs: 'src/App.tsx',
  },
  summary: 'A full-width row of 28px tab chips at the top of the phone layout switches the whole workspace between Input, Output and the viewer; the row shrinks to fit and scrolls sideways when it cannot.',
  where: 'The top of the phone layout (below 768px) in PFD, HS, AGPD, FD, ADM, ACE and PBS, above the one visible panel. HCS and RWS have no phone tab row. The desktop Output header tabs are Tabs-001.',
  when: 'Use it as the one top-level switch of a phone workspace where the desktop shows the panes side by side: one tab per pane, always on screen, and the active pane filling the rest of the screen. Keep labels short and on one line; the row scrolls sideways instead of wrapping.',
  how: 'The example is the shared part of the first group: a Tabs root (profile "no-padding") holding a Tabs.List with overflow "shrink" and aui sx gap "0" and flex "none", Tabs.Tab chips whose aui sx whiteSpace is "nowrap", and a Tabs.Panel per tab. The shrink overflow keeps the selected tab wide and shrinks the others (measured at 300px: selected 160px, others 64px, no gap). The Component tab shows the Tabs; the ScrollArea that scrolls the row (View.ScrollArea with View.ScrollAreaViewport, no scrollbar) is what the In context scene writes around it. '
    + 'PFD, HS, AGPD, FD: one group. Same chips, same shrinking List with no gap, inside a ScrollArea (FD gives the List flex "fill" and a span around each label, which render the same). HS adds 3D VIEWER and JOB LIST tabs and AGPD disables its tabs until the licence is accepted, which is content and state. FD writes a trailing Reset IconButton beside the row (arrows-rotate, text, secondary, sm), left out here. '
    + 'ADM, ACE: the same row with a Tabs.AddButton at the end of the List (name "rotate-right", aria-label Reset, a 28x28 square chip) that opens the Reset confirmation, so the button set differs; each label is a span. ACE leaves the List gap at the 6px default where ADM sets "0", an app-side deviation merged into the ADM standard (measured 6px against 0px). '
    + 'PBS: the List has no overflow "shrink", so every tab keeps its natural width and the wrapping View scrolls the row (measured at 300px: the row stays 435px wide instead of shrinking the tabs to 64px), with the 6px List gap. PBS also puts a Refresh IconButton before the tabs, left out here. The scenes keep one row only: no panels, headers or dialogs.',
});
