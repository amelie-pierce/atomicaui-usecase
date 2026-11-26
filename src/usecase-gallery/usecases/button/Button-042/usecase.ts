import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'results-row', name: 'Results row', selector: '[data-ug-part="results-row"]', description: 'The header row that places the Recalculate button before the N and V readouts with a 16px gap.' },
];

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Recalculate button',

  apps: ['adc'],
    layers: [
        {"id":"recalculate","partId":"recalculate","title":"Recalculate","explanation":"Extra-small amber warning button reruns the calculation after input changes.","keyIdea":"The warning-colored control reruns the calculation after inputs change.","selector":"[class~=\"aui-button\"]"},
        {"id":"icon","partId":"icon","title":"Rotate icon","explanation":"The arrows-rotate glyph that conveys running the calculation again.","keyIdea":"The rotate glyph communicates recalculation of the current result.","selector":"[class~=\"aui-button\"] > :is([class~=\"aui-contained-icon\"], [class~=\"aui-icon\"])","unchanged":true},
      ],
options: [
    { id: "adc-recalculate", contextAnatomy: CONTEXT_ANATOMY, name: "Results header", apps: ["adc"], source: {"adc":"src/adc/Workspace.tsx"} ,
      contextLayers: [
        {"id":"context-results-row","partId":"results-row","title":"Results row","explanation":"Results row places Recalculate before N and V with 16px gap.","keyIdea":"The results row groups recalculation with its N and V measurements.","selector":"[data-ug-part=\"results-row\"]","scope":"context"},
      ],
    },
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
