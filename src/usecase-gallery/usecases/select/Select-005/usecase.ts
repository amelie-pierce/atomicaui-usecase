import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field select',
  title: 'Licence gate country select',
  apps: ['ace'],
  cases: [
    {
      id: 'ace-licence-country',
      name: 'Licence gate country',
      apps: ['ace'],
      source: { ace: 'src/features/eula/ui/EulaGate.tsx' },
    },
  ],
  source: {
    ace: 'src/features/eula/ui/EulaGate.tsx',
  },
  summary: 'The country select of the licence gate: the same flag-led trigger and rows, with a check on the chosen row.',
  where: 'ACE only: the licence gate that asks for the country before the licence is accepted (src/features/eula/ui/EulaGate.tsx), a repeat of the country field of the App Configuration dialog.',
  when: 'Use it to ask for the country in a gate the user must pass before working, where the chosen option must show its glyph in the closed field. Use Select-004 for the same field in the app settings.',
  how: 'The same flag-led trigger and rows as the configuration select, but the trigger states no scale or height and the chosen row ends with a check icon in its indicator (an indicator holding a 16px icon, where the configuration rows hold none). The scene shows the enabled state and leaves out the licence text, the Accept button and the other gate fields.',
});
