import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Open products picker button',

  apps: ['adc'],
    layers: [
        {"id":"container","partId":"container","title":"Container","explanation":"The Select products Button that stands in for the Products field: extra small, surface color with fixed (bordered) paint, soft shape and full width with content at the start.","keyIdea":"The Select products Button that stands in for the Products field: extra small, surface color with fixed (bordered) paint, soft shape and full width with content at the start.","selector":"[class~=\"aui-button\"]"},
      ],
options: [
    { id: "adc-products", name: "Products row", apps: ["adc"], showContext: false, source: {"adc":"src/adc/components/ProductsPicker.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: { adc: 'src/adc/components/ProductsPicker.tsx' },
  summary: 'A full-width small Button with a border stands in for a field until the user activates it.',
  where: 'The Products input of the ADC input pane before the picker is active; hover or focus replaces it with the picker.',
  when: 'Use it for a field-like row that opens a picker on interaction. A row that opens a tutorial is Button-011, at the default size and without a fill.',
  how: 'Set aui scale "xs", color "surface", paint "fixed", shape "soft" and sx width "fill", justifyContent "between". '
    + 'Measured: 26px high, 3px 5px padding, 14px medium text, white fill and a 1px rgb(148, 163, 184) border, where Button-011 is 30px high with 16px regular text and no fill, so the size and the fill differ. '
    + 'The scene keeps one row in a 288px column.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      description: "The Select products Button that stands in for the Products field: extra small, surface color with fixed (bordered) paint, soft shape and full width with content at the start.",
      selector: "[class~=\"aui-button\"]",
    },
    {
      id: "label",
      name: "Label",
      description: "The placeholder text \"Select products\" shown until hover or focus swaps in the picker.",
      selector: "[class~=\"aui-button\"]",
      text: true,
    },
  ],
});
