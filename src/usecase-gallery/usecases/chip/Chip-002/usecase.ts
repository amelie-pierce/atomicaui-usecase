import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Label chip',
  title: 'Compact soft label',
  apps: ['adc'],
  cases: [{ id: 'adc-beta', name: 'Beta notice', source: { adc: 'src/adc/Workspace.tsx' } }],
  source: { adc: 'src/adc/Workspace.tsx' },
  summary: 'A compact label with soft corners that marks a state of the whole app: BETA in the notice banner, the version beside the menu.',
  where: 'The beta notice and the version label of the ADC Workspace (src/adc/Workspace.tsx).',
  when: 'Use it for a label on a dense bar or banner. Use the solid release label (Chip-001) in lists of notes.',
  how: '`Chip` at `scale: "xs"` and `shape: "soft"`, `paint: "solid"`; the colour is `secondary` on the warning banner (BETA) and `surface-alt` beside the menu (the version). One `Chip.Label`. The scene shows the banner and leaves out its action link.',
});
