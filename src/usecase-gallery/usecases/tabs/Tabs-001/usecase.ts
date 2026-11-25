import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Segmented tabs',
  title: 'Pane tabs',
  apps: ['hs', 'pbs', 'fd', 'rws', 'adm', 'adc'],
  options: [
    { id: "hs-pane-tabs", name: "Pane tabs", contextAnatomy: [{ id: 'output-pane', name: 'Output pane', description: 'The Output section (soft, surface-alt) whose tabbed header holds the tab list.' }, { id: 'pane-header', name: 'Pane header', description: 'The 28px header row where the tab list takes the title spot, followed in the app by Print and Back to top actions.' }], apps: ["hs","pbs","fd","rws","adm"], source: {"hs":"src/hs/OutputTabs.tsx","pbs":"src/ResultsSection.tsx","fd":"src/components/Results.jsx","rws":"src/rws/output.tsx","adm":"src/app/layout/Workbench/Workbench.tsx"} },
    { id: "adc-pane-tabs", name: "Pane tabs — UI variant 2", showContext: false, apps: ["adc"], source: {"adc":"src/adc/Workspace.tsx"} },
  ],
  source: {
    hs: 'src/hs/OutputTabs.tsx',
    pbs: 'src/ResultsSection.tsx',
    fd: 'src/components/Results.jsx',
    rws: 'src/rws/output.tsx',
    adm: 'src/app/layout/Workbench/Workbench.tsx',
    adc: 'src/adc/Workspace.tsx',
  },
  summary: 'A row of 28px tab chips in the header of a pane switches the pane between its views (Summary and Result, Output and Job List); the selected chip is filled.',
  where: 'The title spot of the Output pane header on desktop and tablet: HS (Output, Job List), PBS (Output, Connection List), FD (Output, Calculation Result), RWS (Output) and ADM (Summary, Result), each followed by the header\'s action group (Button-001, Button-002). ADC writes the same control above its 3D-Model and Design information panels. The ADC design tab rail is Tabs-004.',
  when: 'Use it to switch one pane between a few views of the same result, with one view visible at a time and the tabs always on screen. Use Tabs-002 for the top-level switch of a phone workspace; use Tabs-003 when each tab reports a pass or fail. Do not use it for actions: those are Buttons in the header\'s action group.',
  how: 'The example is the shared part: a Tabs root (profile "no-padding") holding a Tabs.List with Tabs.Tab chips and a Tabs.Panel per tab; each Tab takes color "surface-alt", paint "solid", shape "soft" and states selected { color: "overlay", paint: "solid" }, which renders a 28px chip with an 8px inline padding, a 6px gap between chips, a slate-100 fill and a slate-300 fill when selected, with no border. The pane frame and its 28px header band (a View with display flex, flexWrap wrap, minHeight 28 and zero block padding, which wraps the actions to a second row when narrow) are what the In context scene writes around it. HS, PBS, FD, RWS and ADM: one group. They render the same chips (measured in the browser: 28px high, 8px padding, selected rgb(203, 213, 225), others rgb(241, 245, 249), radius 4px, 16px/400, no border); HS writes no aui on the Tab because the default tab already computes to this fill, the others write the props above (TAB_IN_PANE_AUI). FD adds whiteSpace "nowrap" and PBS and FD a flexWrap "wrap" on the List, which only change how a narrow header wraps. A disabled tab differs by app (HS and FD paint it "text", so it has no fill; PBS keeps the filled chip, rgb(224, 224, 224)); the scenes show the enabled state. ADC: its tab strip sits outside a bordered pane, so it writes CHIP_AUI (the selected tab is a raised tonal chip, rgb(226, 232, 240) with a 1px dark border, against the flat slate-300 fill of the group above). The List wraps so the Save action drops to a right-aligned second row. Left out of the scenes: the header action group, the panel bodies, the Save button and every disabled state.',
  anatomy: [
    {
      id: 'tabs',
      name: 'Tabs',
      selector: '[class~="aui-tabs"]',
      description: 'Root that switches the pane between its views; Summary is selected first through defaultValue="summary". ADC lists Model and Information, HS lists Summary and Result.',
    },
    {
      id: 'list',
      name: 'List',
      selector: '[class~="aui-tabs-list"]',
      description: 'The chip row in the pane header; ADC lets it wrap with flexWrap.',
    },
    {
      id: 'tab',
      name: 'Tab',
      selector: '[class~="aui-tabs-tab"]',
      description: 'A 28px soft chip: surface-alt solid when idle and overlay solid when selected.',
    },
    {
      id: 'panel',
      name: 'Panel',
      selector: '[class~="aui-tabs-panel"]',
      description: 'Content of the selected view, "Summary content" or "Result content" in the example.',
    },
  ],
});
