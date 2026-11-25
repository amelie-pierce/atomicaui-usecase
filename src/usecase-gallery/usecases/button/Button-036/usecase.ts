import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'rail', name: 'Collapsed rail', selector: '[data-ug-part="rail"]', description: 'The 40px column of the collapsed Input panel that keeps only the expand trigger at its top centre.' },
  { id: 'viewer-pane', name: '3D Viewer pane', selector: '[data-ug-part="viewer-pane"]', description: 'The neighbouring 3D Viewer section that keeps the rest of the width, reduced to its header.' },
];

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Expand panel button',

  apps: ['hcs'],
    layers: [
        {"id":"expand","partId":"expand","title":"Expand Input","explanation":"The 28px square transparent secondary angle-right button that reopens the collapsed Input panel.","keyIdea":"The 28px square transparent secondary angle-right button that reopens the collapsed Input panel.","selector":"[class~=\"aui-button\"][aria-label=\"Expand Input\"]:not([class~=\"aui-panels-trigger\"])"},
        {"id":"trigger","partId":"trigger","title":"Panel trigger","explanation":"HCS rail: the same button rendered as a Panels.Trigger that targets the hcs-input panel from the 40px collapsed rail.","keyIdea":"HCS rail: the same button rendered as a Panels.Trigger that targets the hcs-input panel from the 40px collapsed rail.","selector":"[class~=\"aui-panels-trigger\"]"},
        {"id":"tooltip","partId":"tooltip","title":"Tooltip","explanation":"The Expand Input label shown below the button.","keyIdea":"The Expand Input label shown below the button.","selector":"[class~=\"aui-tooltip-popup\"]"},
        {"id":"panel","partId":"panel","title":"Panel","explanation":"The Input panel, collapsible to 40px (minSize 400px when open), next to the 3D Viewer panel.","keyIdea":"The Input panel, collapsible to 40px (minSize 400px when open), next to the 3D Viewer panel.","selector":"[class~=\"aui-panels-panel\"]"},
        {"id":"handle","partId":"handle","title":"Resize handle","explanation":"The 8px primary handle between the Input and 3D Viewer panels.","keyIdea":"The 8px primary handle between the Input and 3D Viewer panels.","selector":"[class~=\"aui-panels-resize-handle\"]"},
      ],
options: [
    { id: "hcs-rail", contextAnatomy: CONTEXT_ANATOMY, name: "Collapsed rail", apps: ["hcs"], source: {"hcs":"src/components/HcsSplitLayout.tsx"} ,
      contextLayers: [
        {"id":"context-rail","partId":"rail","title":"Collapsed rail","explanation":"The 40px column of the collapsed Input panel that keeps only the expand trigger at its top centre.","keyIdea":"The 40px column of the collapsed Input panel that keeps only the expand trigger at its top centre.","selector":"[data-ug-part=\"rail\"]","scope":"context"},
        {"id":"context-viewer-pane","partId":"viewer-pane","title":"3D Viewer pane","explanation":"The neighbouring 3D Viewer section that keeps the rest of the width, reduced to its header.","keyIdea":"The neighbouring 3D Viewer section that keeps the rest of the width, reduced to its header.","selector":"[data-ug-part=\"viewer-pane\"]","scope":"context"},
      ],
    },
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
