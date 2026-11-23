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
  anatomy: [
    {
      id: 'trigger',
      name: 'Trigger wrapper',
      token: 'Tooltip.Trigger',
      description: 'The focusable inline-flex span (tabIndex 0) whose aria-label "Selection unavailable for Model C-300" carries the reason, so keyboard and screen reader users reach the disabled radio\'s explanation.',
      code: `<Tooltip.Trigger render={<span data-ug-part="trigger" />} tabIndex={0} aria-label="Selection unavailable for Model C-300" closeOnClick={false} style={{ display: 'inline-flex' }}>`,
    },
    {
      id: 'radio',
      name: 'Disabled radio',
      token: 'Radio',
      selector: '[data-ug-part="trigger"] [class~="aui-radio"]',
      description: 'The disabled, unselected "Model C-300" radio taken out of the tab order (tabIndex -1) so the wrapper receives the focus.',
      code: `<Radio disabled selected={false} tabIndex={-1} aria-label="Model C-300" aui={{ scale: 'sm' }} />`,
    },
    {
      id: 'positioner',
      name: 'Positioner',
      token: 'Tooltip.Positioner',
      selector: '[class~="aui-tooltip-positioner"]',
      description: 'Opens the reason above the wrapper with a 4px offset (side="top").',
      code: `<Tooltip.Positioner side="top" sideOffset={4}>`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Tooltip.Popup',
      selector: '[class~="aui-tooltip-popup"]',
      description: 'The default tooltip surface (scale "sm" in the HCS scene).',
      code: `<Tooltip.Popup>Failed products can't be selected. See Why Not for the reason.</Tooltip.Popup>`,
    },
    {
      id: 'reason',
      name: 'Reason',
      token: 'Tooltip.Popup',
      selector: '[class~="aui-tooltip-popup"]',
      text: true,
      description: 'The sentence "Failed products can\'t be selected. See Why Not for the reason." that explains why the control is disabled.',
      code: `<Tooltip.Popup>Failed products can't be selected. See Why Not for the reason.</Tooltip.Popup>`,
    },
  ],
});
