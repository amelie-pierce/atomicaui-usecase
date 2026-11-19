import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Segmented tabs',
  title: 'Pane tabs',
  apps: ['hs', 'pbs', 'fd', 'rws', 'adm', 'adc', 'pfd', 'agpd', 'ace'],
  cases: [
    {
      id: 'hs-pane-tabs',
      name: 'Pane tabs',
      apps: ['hs', 'pbs', 'fd', 'rws', 'adm'],
      source: {
        hs: 'src/hs/OutputTabs.tsx',
        pbs: 'src/ResultsSection.tsx',
        fd: 'src/components/Results.jsx',
        rws: 'src/rws/output.tsx',
        adm: 'src/app/layout/Workbench/Workbench.tsx',
      },
    },
    { id: 'adc-pane-tabs', name: 'Pane tabs', apps: ['adc'], source: { adc: 'src/adc/Workspace.tsx' } },
    {
      id: 'pfd-phone-tabs',
      name: 'Phone workspace tabs',
      apps: ['pfd', 'hs', 'agpd', 'fd'],
      note: 'The row fills the phone width and shrinks its tabs.',
      source: { pfd: 'src/pfd/Workspace.tsx', hs: 'src/App.tsx', agpd: 'src/App.tsx', fd: 'src/App.jsx' },
    },
    {
      id: 'adm-phone-tabs',
      name: 'Phone workspace tabs',
      apps: ['adm', 'ace'],
      note: 'The row fills the phone width and shrinks its tabs; a Reset button ends the row.',
      source: { adm: 'src/app/layout/MobileWorkbench/MobileWorkbench.tsx', ace: 'src/pages/estimator/EstimatorPage.tsx' },
    },
    { id: 'pbs-phone-tabs', name: 'Phone workspace tabs', apps: ['pbs'], note: 'Every tab keeps its natural width (fit) and the row scrolls sideways.', source: { pbs: 'src/App.tsx' } },
  ],
  source: {
    hs: 'src/hs/OutputTabs.tsx',
    pbs: 'src/ResultsSection.tsx',
    fd: 'src/components/Results.jsx',
    rws: 'src/rws/output.tsx',
    adm: 'src/app/layout/Workbench/Workbench.tsx',
    adc: 'src/adc/Workspace.tsx',
    pfd: 'src/pfd/Workspace.tsx',
    agpd: 'src/App.tsx',
    ace: 'src/pages/estimator/EstimatorPage.tsx',
  },
  summary: 'A row of 28px tab chips in the header of a pane switches the pane between its views (Summary and Result, Output and Job List); the selected chip is filled.',
  where: 'The title spot of the Output pane header on desktop and tablet: HS (Output, Job List), PBS (Output, Connection List), FD (Output, Calculation Result), RWS (Output) and ADM (Summary, Result), each followed by the header\'s action group (Button-007, Button-010). ADC writes the same control above its 3D-Model and Design information panels. On a phone the same chips become the full-width workspace row at the top of the phone layout (below 768px) in PFD, HS, AGPD, FD, ADM, ACE and PBS, above the one visible panel; HCS and RWS have no phone tab row. The ADC design tab rail is Tabs-004.',
  when: 'Use it to switch one pane between a few views of the same result, with one view visible at a time and the tabs always on screen. Use it as the one top-level switch of a phone workspace too, one tab per pane with short labels on one line; use Tabs-003 when each tab reports a pass or fail. Do not use it for actions: those are Buttons in the header\'s action group.',
  how: 'The example is the shared part: a Tabs root (profile "no-padding") holding a Tabs.List with Tabs.Tab chips and a Tabs.Panel per tab; each Tab takes color "surface-alt", paint "solid", shape "soft" and states selected { color: "overlay", paint: "solid" }, which renders a 28px chip with an 8px inline padding, a 6px gap between chips, a slate-100 fill and a slate-300 fill when selected, with no border. The Component tab shows the Tabs; the pane frame and its 28px header band (a View with display flex, flexWrap wrap, minHeight 28 and zero block padding, which wraps the actions to a second row when narrow) are what the In context scene writes around it. '
    + 'Pane tabs, HS, PBS, FD, RWS and ADM: one group. They render the same chips (measured in the browser: 28px high, 8px padding, selected rgb(203, 213, 225), others rgb(241, 245, 249), radius 4px, 16px/400, no border); HS writes no aui on the Tab because the default tab already computes to this fill, the others write the props above (TAB_IN_PANE_AUI). FD adds whiteSpace "nowrap" and PBS and FD a flexWrap "wrap" on the List, which only change how a narrow header wraps. A disabled tab differs by app (HS and FD paint it "text", so it has no fill; PBS keeps the filled chip, rgb(224, 224, 224)); the scenes show the enabled state. '
    + 'Pane tabs, ADC: its tab strip sits outside a bordered pane, so it writes CHIP_AUI (the selected tab is a raised tonal chip, rgb(226, 232, 240) with a 1px dark border, against the flat slate-300 fill of the group above). The List wraps so the Save action drops to a right-aligned second row. '
    + 'Phone workspace tabs, PFD, HS, AGPD, FD: one group. The same chips as the pane tabs, as a full-width row (fill) at the top of the phone column, edge to edge: the Tabs.List has overflow "shrink" and aui sx gap "0" and flex "none", the Tab chips an aui sx whiteSpace "nowrap", inside a View.ScrollArea with no scrollbar (measured at 300px: selected 160px, others 64px, no gap). FD gives the List flex "fill" and a span around each label, which render the same; HS adds 3D VIEWER and JOB LIST tabs and AGPD disables its tabs until the licence is accepted, which is content and state; FD writes a trailing Reset IconButton beside the row, left out here. '
    + 'Phone workspace tabs, ADM, ACE: the same row with a Tabs.AddButton at the end of the List (name "rotate-right", aria-label Reset, a 28x28 square chip) that opens the Reset confirmation, so the button set differs; each label is a span. ACE leaves the List gap at the 6px default where ADM sets "0", an app-side deviation merged into the ADM standard (measured 6px against 0px). '
    + 'Phone workspace tabs, PBS: the width differs, fit instead of fill. The List has no overflow "shrink", so every tab keeps its natural width and the wrapping View scrolls the row (measured at 300px: the row stays 435px wide instead of shrinking the tabs to 64px), with the 6px List gap; PBS also puts a Refresh IconButton before the tabs, left out here. The pane tabs above are fit too; only the phone rows of the first two groups are fill. Left out of the scenes: the header action group, the panel bodies, the Save button and every disabled state.',
});
