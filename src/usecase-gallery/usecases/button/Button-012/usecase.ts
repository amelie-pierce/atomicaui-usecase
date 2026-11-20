import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Accent solid',
  apps: ['adc'],
  source: { adc: 'src/adc/components/DesignCapacityDialog.tsx' },
  cases: [{ id: 'adc-ok', name: 'Info OK', apps: ['adc'], source: { adc: 'src/adc/components/DesignCapacityDialog.tsx' } }],
  summary: 'A solid primary Button, orange with white text, is the lone OK that acknowledges a notice.',
  where: 'The footer of a dialog that only informs. Real site source: ADC src/adc/components/DesignCapacityDialog.tsx (OK of the Maximum Number of Designs Reached notice); the About dialog ends the same way with Close. The other apps use the gray or black single button of Button-005 and Button-011.',
  when: 'Use it where the app colors its one dialog action with the accent. For a plain dismiss use the neutral Button-005, and keep the close X in the Title as the other way out.',
  how: 'Set aui color "primary", paint "solid" and scale "sm" (the Dialog.Button default scale). In context it is the one Dialog.Button of an AlertDialog drawn as a non-modal Dialog, as in Button-018, with a circle-xmark error icon in the raised Title, the close X inside a "Close" tooltip (top, 8px offset, solid secondary sm) and one paragraph; the real body holds more.',
});
