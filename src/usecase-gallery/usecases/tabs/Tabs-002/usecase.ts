import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Segmented tabs',
  title: 'Phone workspace tabs',
  apps: ['pfd', 'hs', 'agpd', 'fd', 'adm', 'ace', 'pbs'],
options: [
    { id: "pfd-phone-tabs", name: "Phone workspace tabs", showContext: false, apps: ["pfd","hs","agpd","fd"], note: "The row fills the phone width and shrinks its tabs.", source: {"pfd":"src/pfd/Workspace.tsx","hs":"src/App.tsx","agpd":"src/App.tsx","fd":"src/App.jsx"} ,
    },
    { id: "adm-phone-tabs", name: "Fitted phone tabs", showContext: false, apps: ["adm","ace"], note: "The row fills the phone width and shrinks its tabs; a Reset button ends the row.", source: {"adm":"src/app/layout/MobileWorkbench/MobileWorkbench.tsx","ace":"src/pages/estimator/EstimatorPage.tsx"} ,
    },
    { id: "pbs-phone-tabs", name: "Scrollable phone tabs", showContext: false, apps: ["pbs"], note: "Every tab keeps its natural width (fit) and the row scrolls sideways.", source: {"pbs":"src/App.tsx"} ,
    },
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
  summary: 'The one top-level switch of a phone workspace: a full-width row of tab chips at the top, one tab per pane with short labels on one line.',
  where: 'The full-width workspace row at the top of the phone layout (below 768px) in PFD, HS, AGPD, FD, ADM, ACE and PBS, above the one visible panel; HCS and RWS have no phone tab row.',
  when: 'Use it as the one top-level switch of a phone workspace, one tab per pane. Use Tabs-001 in a pane header on desktop and tablet; use Tabs-003 when each tab reports a pass or fail.',
  how: 'The same chips as the pane tabs (a Tabs root with a Tabs.List of Tabs.Tab chips, each Tab color "surface-alt", paint "solid", shape "soft", selected { color: "overlay", paint: "solid" }), as a full-width row (fill) at the top of the phone column, edge to edge. PFD, HS, AGPD, FD: one group. The Tabs.List has overflow "shrink" and aui sx gap "0" and flex "none", the Tab chips an aui sx whiteSpace "nowrap", inside a View.ScrollArea with no scrollbar (measured at 300px: selected 160px, others 64px, no gap). FD gives the List flex "fill" and a span around each label, which render the same; HS adds 3D VIEWER and JOB LIST tabs and AGPD disables its tabs until the licence is accepted, which is content and state; FD writes a trailing Reset IconButton beside the row, left out here. ADM, ACE: the same row with a Tabs.AddButton at the end of the List (name "rotate-right", aria-label Reset, a 28x28 square chip) that opens the Reset confirmation, so the button set differs; each label is a span. ACE leaves the List gap at the 6px default where ADM sets "0", an app-side deviation merged into the ADM standard (measured 6px against 0px). PBS: the width differs, fit instead of fill. The List has no overflow "shrink", so every tab keeps its natural width and the wrapping View scrolls the row (measured at 300px: the row stays 435px wide instead of shrinking the tabs to 64px), with the 6px List gap; PBS also puts a Refresh IconButton before the tabs, left out here. Left out of the scenes: the panel bodies and every disabled state.',
  anatomy: [
    {
      id: 'tabs',
      name: 'Tabs',
      selector: '[class~="aui-tabs"]',
      description: 'Top-level phone switch with no padding, spanning the viewport width (390px in the scenes). ADM, PBS and PFD start on Input.',
     lesson: {"explanation":"Unpadded phone switch spans 390px; apps start on Input."}},
    {
      id: 'list',
      name: 'List',
      selector: '[class~="aui-tabs-list"]',
      description: 'One-line row of pane chips; in the ADM and PFD scenes it uses overflow="shrink" with gap 0 and scrolls horizontally when the labels do not fit.',
     lesson: {"explanation":"One-line pane row shrinks or scrolls when labels exceed available width."}},
    {
      id: 'tab',
      name: 'Tab',
      selector: '[class~="aui-tabs-tab"]',
      description: 'One chip per pane with a short label (Summary and Result, or Input and Output in the scenes), kept on one line with whiteSpace nowrap.',
     lesson: {"explanation":"Pane chips stay on one line with short labels."}},
    {
      id: 'add',
      name: 'Reset button',
      selector: '[class~="aui-tabs-add-button"]',
      description: 'ADM only: a trailing rotate-right icon button labelled "Reset" at the end of the list.',
     lesson: {"explanation":"ADM Reset button sits at row end to restore defaults."}},
    {
      id: 'panel',
      name: 'Panel',
      selector: '[class~="aui-tabs-panel"]',
      description: 'The pane shown for the selected tab, "Summary content" or "Result content".',
     lesson: {"explanation":"The pane shown for the selected tab, \"Summary content\" or \"Result content\"."}},
  ],
});
