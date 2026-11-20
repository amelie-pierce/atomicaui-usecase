import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'ToggleGroup',
  title: 'Labelled segments',
  apps: ['hs', 'adc'],
  cases: [
    {
      id: 'hs-settings',
      name: 'Settings popover',
      source: { hs: 'src/hs/SettingsPanel.tsx', adc: 'src/adc/components/AppConfigurationPopover.tsx' },
    },
  ],
  source: { hs: 'src/hs/SettingsPanel.tsx', adc: 'src/adc/components/AppConfigurationPopover.tsx' },
  summary: 'A labelled row of full-width segments where exactly one option is on, the chosen one a solid secondary segment.',
  where: 'The settings popover of HS (region, units) and the app configuration popover of ADC (src/adc/components/AppConfigurationPopover.tsx).',
  when: 'Use it to pick one of two to four short options that should stay visible. Use a Select for a longer list and a Switch for on or off.',
  how: '`Field` with a `Field.Label` (its `id` goes to the group\'s `aria-labelledby`), then `ToggleGroup` with `value={[value]}`, `multiple={false}` and one `ToggleGroup.Item` per option, rendered as a `Button` (color surface, text, xs, shape none, flex "fill", no padding) that holds a `View` whose look follows `state.pressed` (pressed: color secondary, solid, soft; otherwise surface, text, no shape) and a `Type` l5 medium label. HS and ADC render the same segments, so they are one group. The scene shows one setting in the open popover.',
});
