import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Recalculate button',

  apps: ['adc'],
  options: [
    { id: "adc-recalculate", name: "Results header", apps: ["adc"], source: {"adc":"src/adc/Workspace.tsx"} },
  ],
  source: { adc: 'src/adc/Workspace.tsx' },
  summary: 'A small amber solid IconButton re-runs the calculation when the inputs have changed.',
  where: 'The header of the ADC results, before the N, V and N + V values.',
  when: 'Use it for an icon-only action that needs attention, here recalculating stale results. Pair it with a title or tooltip that names the action.',
  how: 'Set aui color "warning", paint "solid", shape "soft", profile "square" and scale "xs" on an IconButton (aria-label and title "Recalculate"). '
    + 'Measured: 26px square, 14px medium glyph, white on amber rgb(217, 119, 6), 4px radius; the other icon buttons are 20px, 24px or 28px and none is solid amber, so it is its own variant.',
  anatomy: [
    { id: 'recalculate', name: 'Recalculate', selector: '[class~="aui-button"]', description: 'The xs square solid warning (amber) soft button that re-runs the calculation once inputs change.' },
    { id: 'icon', name: 'Rotate icon', selector: '[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])', description: 'The arrows-rotate glyph that conveys running the calculation again.' },
    { id: 'result', name: 'Result readout', selector: '[class~="aui-type"]', text: true, description: 'ADC only: the N = - and V = - values beside the button that it refreshes.' },
  ],
});
