import { defineUsecase } from '../../../define';

const SOURCE = { hcs: 'src/components/HcsSplitLayout.tsx', ace: 'src/pages/estimator/EstimatorPage.tsx', adm: 'src/app/layout/AppLayout.tsx', pfd: 'src/pfd/Workspace.tsx', pbs: 'src/App.tsx', hs: 'src/App.tsx', fd: 'src/App.jsx', agpd: 'src/App.tsx', rws: 'src/rws/Shell.tsx' };

export default defineUsecase({
  uiType: 'Resizable split',
  title: 'Stacked',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  cases: [
    { id: 'hcs-stacked', name: 'Stacked', apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'], source: SOURCE },
  ],
  source: SOURCE,
  summary: 'A Panels group stacks the workspace into surface panes, Input above and the results below, that the user resizes by dragging the horizontal handle between them.',
  where: "The Grid (engineering) layout of HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS: the Input pane sits above the workbench (two panes and one handle). ADC has no stacked split. The collapse of the Input pane into a top rail is Panels-003; the header and rail buttons are Button-025 and Button-027.",
  when: 'Use it for panes that share one workspace and that the user may want taller or shorter: a Panels group with a ResizeHandle between each pair of Panels.Panel. Stacked is the Grid layout, where Input sits above the workbench; the wide-width default is the side by side split (Panels-001). Do not use it for a fixed layout (a View row or column is enough) or for a pane that only opens and closes (a collapsible Panels.Panel, Panels-003).',
  how: 'The example is the split itself: a Panels (orientation "vertical", aui scale "sm") holding two Panels.Panel and a Panels.ResizeHandle between them. Each Panels.Panel has an id, a defaultSize on the first one and a minSize of 40px, and takes the pane frame props (profile "block-padding", scale "sm", color "surface-alt", paint "fixed", shape "soft", a flex column with minHeight "0" so it can shrink). The Panels.ResizeHandle has color "primary" and width "6px" and an aria-label that names the two panes; being in a vertical group it is a 6px horizontal line (measured 560 x 6 in the scene). All nine apps (HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS) write the same two soft surface-alt panes and the primary handle; the scene is HCS, cut to the two panes with their semi-bold titles. The scene leaves out the 200px minimum sizes of the app, the collapse props of the Input panel (Panels-003), the pane headers and contents, and the splitter drag.',
});
