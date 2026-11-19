import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Panel',
  title: 'Resizable split',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
  cases: [
    {
      id: 'hcs-side-by-side',
      name: 'Side by side',
      apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
      source: { hcs: 'src/components/HcsSplitLayout.tsx', ace: 'src/pages/estimator/EstimatorPage.tsx', adm: 'src/app/layout/AppLayout.tsx', pfd: 'src/pfd/Workspace.tsx', pbs: 'src/App.tsx', hs: 'src/App.tsx', fd: 'src/App.jsx', agpd: 'src/App.tsx', rws: 'src/rws/Shell.tsx', adc: 'src/adc/Workspace.tsx' },
    },
    {
      id: 'hcs-stacked',
      name: 'Stacked',
      apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
      source: { hcs: 'src/components/HcsSplitLayout.tsx', ace: 'src/pages/estimator/EstimatorPage.tsx', adm: 'src/app/layout/AppLayout.tsx', pfd: 'src/pfd/Workspace.tsx', pbs: 'src/App.tsx', hs: 'src/App.tsx', fd: 'src/App.jsx', agpd: 'src/App.tsx', rws: 'src/rws/Shell.tsx' },
    },
  ],
  source: { hcs: 'src/components/HcsSplitLayout.tsx', ace: 'src/pages/estimator/EstimatorPage.tsx', adm: 'src/app/layout/AppLayout.tsx', pfd: 'src/pfd/Workspace.tsx', pbs: 'src/App.tsx', hs: 'src/App.tsx', fd: 'src/App.jsx', agpd: 'src/App.tsx', rws: 'src/rws/Shell.tsx', adc: 'src/adc/Workspace.tsx' },
  summary: 'A Panels group splits the workspace into surface panes that the user resizes by dragging the handle between them.',
  where: "The workspace of every app: the Input pane beside the 3D Viewer or illustration and the Output (two panes and one handle), and a second split inside the workbench (viewer and Output). ADC splits three panes with two handles (inputs, model, summary). The type radio picks the direction; both are the same Panels parts. The collapse of the Input pane is Panels-002 (top rail) and IconButton-004 (side rail); the header and rail buttons are IconButton-003 and IconButton-004.",
  when: 'Use it for panes that share one workspace and that the user may want larger or smaller: a Panels group with a ResizeHandle between each pair of Panels.Panel. Side by side is the default at wide widths; Stacked is the Grid layout, where Input sits above the workbench. Do not use it for a fixed layout (a View row or column is enough) or for a pane that only opens and closes (a collapsible Panels.Panel, Panels-002).',
  how: 'The example is the split itself: a Panels (orientation "horizontal", aui scale "sm") holding two Panels.Panel and a Panels.ResizeHandle between them. Each Panels.Panel has an id, a defaultSize on the first one and a minSize, and takes the pane frame props (profile "block-padding", scale "sm", color "surface-alt", paint "fixed", shape "soft", a flex column with minHeight "0" so it can shrink). The Panels.ResizeHandle has color "primary" and width "6px" and an aria-label that names the two panes. '
    + 'Side by side: all ten apps (HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS, ADC) write the same two soft surface-alt panes and the primary 6px vertical handle; the scene is HCS, cut to the two panes with their semi-bold titles. Measured in the browser from each app\'s Panels and Panel props, the panes (4px radius, rgb(241, 245, 249)) and the handle (6px, primary line) match in every app; only the root differs: HCS sets scale "sm" (no padding), HS, ADM, RWS and AGPD (inner groups) a no-padding profile with gap "6", and PFD, PBS, ACE, FD and AGPD (outer group) the default profile, which adds the page gutter (4px block, 8px inline) around the group; ADC adds 8px inline and 4px at the end. That gutter is the app page around the split, not the split, so it is left out and the scene is the standard. ADC\'s split has two handles (inputs, model, summary); each handle is the same part. '
    + 'Stacked: the Grid layout of HCS (engineering), ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS: the same panes and handle in a Panels with orientation "vertical", Input above and the results below, the handle a 6px horizontal line (measured 560 x 6 in the scene). ADC has no stacked split. '
    + 'The scenes leave out the minimum sizes of the app (400px and 200px), the collapse props of the Input panel (Panels-002), the pane headers and contents, and the splitter drag.',
});
