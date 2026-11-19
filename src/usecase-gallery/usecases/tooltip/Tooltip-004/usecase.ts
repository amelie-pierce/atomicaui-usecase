import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Disabled control',
  title: 'Tooltip on a disabled control',
  apps: ['hcs', 'fd', 'hs'],
  cases: [
    {
      id: 'hcs-disabled-radio',
      name: 'Disabled control',
      apps: ['hcs'],
      source: { hcs: 'src/components/F01Results.tsx' },
    },
    { id: 'fd-disabled-radio', name: 'Disabled control', apps: ['fd'], source: { fd: 'src/components/Results.jsx' } },
    { id: 'hs-disabled-order', name: 'Disabled control', apps: ['hs'], source: { hs: 'src/hs/OutputPane.tsx' } },
  ],
  source: { hcs: 'src/components/F01Results.tsx', fd: 'src/components/Results.jsx', hs: 'src/hs/OutputPane.tsx' },
  summary: 'A control that cannot be used shows why in a tooltip on its wrapper.',
  where: 'The selection radio of a failed result row (HCS F01Results, FD Results) and the Order button of the HS output pane while no result is selected.',
  when: 'Use it when a disabled control would leave the user guessing. A disabled element receives no hover or focus, so the trigger is a wrapper around it; keep the reason to one sentence.',
  how: 'The Tooltip.Trigger is a span (`render={<span />}` or a View as span) made focusable with tabIndex 0 and an aria-label carrying the reason, around the disabled control (a Radio with selected false and tabIndex -1 in HCS and FD, a Button in HS); the popup is the kit default (surface, scale sm). HCS opens it above the radio (top, 4px offset) and FD to its right (right, 10px offset), in separate app groups. Collision handling may flip the requested side when space is limited. HS leaves the side at its default and mounts the popup only while the button is disabled. Scenes show the control in its disabled state (the reason is what the tooltip says) and leave out the table row and the pane around it.',
});
