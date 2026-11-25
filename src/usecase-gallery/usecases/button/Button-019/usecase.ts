import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Toggle prototype controls button',

  apps: ['hcs'],
  options: [
    { id: "hcs-prototype-controls", name: "Prototype controls", apps: ["hcs"], showContext: false, source: {"hcs":"src/components/F01Experience.tsx"} },
  ],
  source: { hcs: 'src/components/F01Experience.tsx' },
  summary: 'A surface Button lifted with a shadow floats over the page and toggles a panel of controls.',
  where: 'The corner of the HCS prototype experience, below the prototype controls stack (a prototype-only toggle, not part of the product).',
  when: 'Use it for a floating toggle that must stand out from the content behind it. A flat tonal button is Button-009.',
  how: 'Set aui scale "sm", color "surface" and elevation 3 (aria-expanded for the toggle). '
    + 'Measured: 28px high, 4px 8px padding, 16px regular text, white fill with no border and a 0 3px 8px shadow of 15% black; Button-009 has the same size with a 1px border and no shadow, so the shadow is the difference.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      description: "The Prototype controls Button: small surface Button with elevation 3 so it floats above the page, toggling the controls panel (aria-expanded in the scene).",
      selector: "[class~=\"aui-button\"]",
    },
    {
      id: "label",
      name: "Label",
      description: "The text \"Prototype controls\" that names the floating toggle.",
      selector: "[class~=\"aui-button\"]",
      text: true,
    },
  ],
});
