import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Collapsible panel',
  title: 'Top rail',
  apps: ['hcs', 'ace', 'adm', 'hs', 'fd', 'agpd'],
  cases: [
    {
      id: 'hcs-top-rail',
      name: 'Top rail',
      apps: ['hcs', 'ace', 'adm', 'hs', 'fd', 'agpd'],
      source: { hcs: 'src/components/HcsSplitLayout.tsx', ace: 'src/pages/estimator/EstimatorPage.tsx', adm: 'src/features/design-inputs/components/InputsPanel/InputsPanel.tsx', hs: 'src/App.tsx', fd: 'src/components/InputPane.jsx', agpd: 'src/App.tsx' },
    },
  ],
  source: { hcs: 'src/components/HcsSplitLayout.tsx', ace: 'src/pages/estimator/EstimatorPage.tsx', adm: 'src/features/design-inputs/components/InputsPanel/InputsPanel.tsx', hs: 'src/App.tsx', fd: 'src/components/InputPane.jsx', agpd: 'src/App.tsx' },
  summary: 'A collapsible Panels.Panel rests at a 40px rail and carries a Panels.Trigger that expands it again.',
  where: "The Input pane of the Grid (stacked) layout: HCS (engineering), ACE (stacked), ADM (grid), HS, FD and AGPD collapse it upward into a 40px row at the top; the Output and viewer panes are fixed. The Input pane of the side by side layout collapses into a 40px column instead, which is Button-036 (the rail trigger and its rail); the header collapse button of the expanded pane is Button-033. PBS, RWS and PFD keep their Input pane open in the Grid layout, so they have no top rail.",
  when: 'Use it for a pane the user may need out of the way: mark the Panels.Panel collapsible with a collapsedSize, and give the rail a Panels.Trigger whose targetId is the panel id; the same trigger toggles it. Keep Output and viewer panes non-collapsible. Always set aria-label on the trigger.',
  how: 'The example is the collapsible panel: a vertical Panels group whose first Panels.Panel is collapsible with collapsedSize "40px", a defaultSize and a minSize, then a Panels.ResizeHandle and a fixed second panel; the Panels.Trigger is a wrapper kit part that the In context scene writes. '
    + 'Top rail: HCS, ACE, ADM, HS, FD and AGPD. In context the Input panel rests at its 40px collapsedSize; the rail is a View row (flex row, alignItems "start", no padding, paddingInlineStart "4") holding the 28px square Panels.Trigger (angle-down, color "secondary", paint "text", scale "sm", profile "square", shape "soft") with a Tooltip carrying its aria-label, measured at 525 px, 4px in from the 1px panel border and 4px down; the Input content is a Panels.Content the collapse hides and the Output panel below keeps the rest of the height, cut to its title. FD sets paddingInlineStart "8" on its rail (the standard is 4, as HCS, ACE, ADM, HS and AGPD), which puts the trigger 4px further in (529 vs 525 measured); that is an app-side deviation, so FD is in the group and the scene is the standard. The 200px minimum size the apps set is replaced by a 120px minSize so the Trigger can expand the panel; the splitter drag and the pane contents are left out.',
  anatomy: [
    {
      id: 'panels',
      name: 'Panels',
      token: 'Panels',
      selector: '[class~="aui-panels"]',
      description: 'Vertical split group, 560px wide and 200px tall at most, whose top pane can fold to a rail.',
      code: `<Panels orientation="vertical" aui={{ scale: 'sm' }} style={{ inlineSize: 'min(100%, 560px)', blockSize: 200 }}>`,
    },
    {
      id: 'panel',
      name: 'Collapsible panel',
      token: 'Panels.Panel',
      selector: '[class~="aui-panels-panel"]',
      description: 'The Input pane is collapsible with a 40px collapsedSize (starts at 40px in the HCS scene) and minSize 120px; the Output pane below stays open.',
      code: `<Panels.Panel
  id="input"
  collapsible
  collapsedSize="40px"
  defaultSize="50%"
  minSize="120px"
  aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
>`,
    },
    {
      id: 'content',
      name: 'Content',
      token: 'Panels.Content',
      selector: '[class~="aui-panels-content"]',
      description: 'HCS scene: the pane body that holds the Input heading beside the rail, hidden when the panel is collapsed.',
      code: `<Panels.Content aui={{ paint: 'text', profile: 'no-padding', sx: { position: 'relative', display: 'flex', flexDirection: 'column', flex: 'fill', overflow: 'hidden', minWidth: '0', minHeight: '0' } }}>
  <Type as="h2" role="l3" weight="semi-bold">Input</Type>
</Panels.Content>`,
    },
    {
      id: 'trigger',
      name: 'Expand trigger',
      token: 'Panels.Trigger',
      selector: '[class~="aui-panels-trigger"]',
      description: 'HCS scene: angle-down icon button labelled "Expand Input" on the 40px rail, with a bottom tooltip, that reopens the Input pane.',
      code: `<Panels.Trigger
  targetId="hcs-input"
  name="angle-down"
  aria-label="Expand Input"
  aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'square', shape: 'soft' }}
/>`,
    },
    {
      id: 'resize-handle',
      name: 'Resize handle',
      token: 'Panels.ResizeHandle',
      selector: '[class~="aui-panels-resize-handle"]',
      description: '6px primary horizontal bar between Input and the results pane.',
      code: `<Panels.ResizeHandle aria-label="Resize Input and results panels" color="primary" width="6px" />`,
    },
  ],
});
