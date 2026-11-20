import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Tooltip on a disabled control',
  title: 'Disabled control tooltip',
  apps: ['hcs', 'fd', 'hs'],
  cases: [
    {
      id: 'hcs-disabled-radio',
      name: 'Disabled control',
      apps: ['hcs', 'fd', 'hs'],
      source: { hcs: 'src/components/F01Results.tsx', fd: 'src/components/Results.jsx', hs: 'src/hs/OutputPane.tsx' },
    },
  ],
  source: { hcs: 'src/components/F01Results.tsx', fd: 'src/components/Results.jsx', hs: 'src/hs/OutputPane.tsx' },
  summary: 'A control that cannot be used shows why in a tooltip on its wrapper.',
  where: 'The selection radio of a failed result row (HCS F01Results, FD Results) and the Order button of the HS output pane while no result is selected.',
  when: 'Use it when a disabled control would leave the user guessing. A disabled element receives no hover or focus, so the trigger is a wrapper around it; keep the reason to one sentence.',
  how: 'The Tooltip.Trigger is a span (`render={<span />}` or a View as span) made focusable with tabIndex 0 and an aria-label carrying the reason, around the disabled control (a Radio with selected false and tabIndex -1 in HCS and FD, a Button in HS); the popup is the kit default (surface, scale sm). The apps are one group; no placement was measured in a browser, so none splits it. From the tooltip source, HS leaves the side at its default (top) with a 4px offset and mounts the popup only while the button is disabled; collision handling may flip the requested side when space is limited. The scene shows the control in its disabled state and leaves out the table row and the pane around it.',
});
