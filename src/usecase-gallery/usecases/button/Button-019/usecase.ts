import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Toggle prototype controls button',
  look: 'Elevated surface',
  apps: ['hcs'],
  cases: [
    { id: 'hcs-prototype-controls', name: 'Prototype controls', apps: ['hcs'], source: { hcs: 'src/components/F01Experience.tsx' } },
  ],
  source: { hcs: 'src/components/F01Experience.tsx' },
  summary: 'A surface Button lifted with a shadow floats over the page and toggles a panel of controls.',
  where: 'The corner of the HCS prototype experience, below the prototype controls stack (a prototype-only toggle, not part of the product).',
  when: 'Use it for a floating toggle that must stand out from the content behind it. A flat tonal button is Button-009.',
  how: 'Set aui scale "sm", color "surface" and elevation 3 (aria-expanded for the toggle). '
    + 'Measured: 28px high, 4px 8px padding, 16px regular text, white fill with no border and a 0 3px 8px shadow of 15% black; Button-009 has the same size with a 1px border and no shadow, so the shadow is the difference.',
});
