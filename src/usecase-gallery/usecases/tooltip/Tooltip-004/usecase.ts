import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Tooltip on a radio',
  title: 'Radio option tooltip',
  apps: ['pbs', 'rws'],
  cases: [
    {
      id: 'pbs-viewer-radio',
      name: 'Viewer control',
      apps: ['pbs', 'rws'],
      source: { pbs: 'src/Viewer.tsx', rws: 'src/rws/Viewer.tsx' },
    },
  ],
  source: { pbs: 'src/Viewer.tsx', rws: 'src/rws/Viewer.tsx' },
  summary: 'A radio option of a group, with its label beside it, shows a short note about the option in a small tooltip on hover or keyboard focus.',
  where: 'The view and member radios floating over the 3D viewer in PBS and RWS (the tooltip helper of Viewer).',
  when: 'Use it for a radio option whose effect is not obvious from its short label. Do not use it for an icon-only button (Tooltip-001) and not for long help text.',
  how: 'Compose Tooltip.Provider, a RadioGroup, Tooltip and Tooltip.Trigger with a span as render and closeOnClick off, so the arrow-key check does not close it; the Radio with its Radio.Label is the trigger child. Then Tooltip.Portal, Tooltip.Positioner and Tooltip.Popup. PBS and RWS are one group; from the tooltip source, the popup is the kit default and opens above (top) with a 4px offset and a one-line note, and RWS requests the bottom side. The app code was not run. The scene shows one radio of the group with the tooltip open and leaves out the other viewer controls and the canvas.',
});
