import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Expand panel button',

  apps: ['hcs'],
  options: [
    { id: "hcs-rail", name: "Collapsed rail", apps: ["hcs"], source: {"hcs":"src/components/HcsSplitLayout.tsx"} },
  ],
  source: { hcs: 'src/components/HcsSplitLayout.tsx' },
  summary: 'A square transparent IconButton, 28px, expands a collapsed side panel from its rail.',
  where: 'A collapsed side rail that stands in for a panel (angle-right expands a horizontal one, angle-down a vertical one). Real site source: HCS src/components/HcsSplitLayout.tsx and panelSpec.ts (the rail and its sizes). '
    + 'No other app has a panel rail.',
  when: 'Use it as the single trigger of a collapsed panel; the expanded panel switches to the 20px header controls of Button-033. Always set aria-label.',
  how: 'Set aui color "secondary", paint "text", scale "sm", shape "soft" and profile "square" (28px, unlike the 20px contained header icons) on an IconButton, with a Tooltip carrying the aria-label text. '
    + 'The trigger is a Panels.Trigger, the kit trigger that renders the IconButton, whose targetId is the panel id, and a real Panels group holds the Input panel at its 40px collapsed size: the rail is a column that fills the panel height with the trigger at the top centre, beside the viewer pane, which is cut to its title (no canvas); the Input panel holds only its title; the vertical rail of the engineering layout (angle-down, trigger at the start corner) is not shown. '
    + 'One group, HCS only.',
  anatomy: [
    { id: 'expand', name: 'Expand Input', selector: '[class~="aui-button"][aria-label="Expand Input"]:not([class~="aui-panels-trigger"])', description: 'The 28px square transparent secondary angle-right button that reopens the collapsed Input panel.' },
    { id: 'trigger', name: 'Panel trigger', selector: '[class~="aui-panels-trigger"]', description: 'HCS rail: the same button rendered as a Panels.Trigger that targets the hcs-input panel from the 40px collapsed rail.' },
    { id: 'tooltip', name: 'Tooltip', selector: '[class~="aui-tooltip-popup"]', description: 'The Expand Input label shown below the button.' },
    { id: 'panel', name: 'Panel', selector: '[class~="aui-panels-panel"]', description: 'The Input panel, collapsible to 40px (minSize 400px when open), next to the 3D Viewer panel.' },
    { id: 'handle', name: 'Resize handle', selector: '[class~="aui-panels-resize-handle"]', description: 'The 8px primary handle between the Input and 3D Viewer panels.' },
  ],
});
