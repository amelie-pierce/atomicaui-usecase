import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'ToggleGroup',
  title: 'Labelled segments',
  apps: ['hs', 'adc'],
  options: [
    { id: "hs-settings", name: "Settings popover", source: {"hs":"src/hs/SettingsPanel.tsx","adc":"src/adc/components/AppConfigurationPopover.tsx"} },
  ],
  source: { hs: 'src/hs/SettingsPanel.tsx', adc: 'src/adc/components/AppConfigurationPopover.tsx' },
  summary: 'A labelled row of full-width segments where exactly one option is on, the chosen one a solid secondary segment.',
  where: 'The settings popover of HS (region, units) and the app configuration popover of ADC (src/adc/components/AppConfigurationPopover.tsx).',
  when: 'Use it to pick one of two to four short options that should stay visible. Use a Select for a longer list and a Switch for on or off.',
  how: '`Field` with a `Field.Label` (its `id` goes to the group\'s `aria-labelledby`), then `ToggleGroup` with `value={[value]}`, `multiple={false}` and one `ToggleGroup.Item` per option, rendered as a `Button` (color surface, text, xs, shape none, flex "fill", no padding) that holds a `View` whose look follows `state.pressed` (pressed: color secondary, solid, soft; otherwise surface, text, no shape) and a `Type` l5 medium label. HS and ADC render the same segments, so they are one group. The scene shows one setting in the open popover.',
  anatomy: [
    {
      id: "field",
      name: "Field",
      token: "Field",
      selector: "[class~=\"aui-field\"]",
      description: "The wrapper at scale \"sm\", filling the popover width, that ties the \"Units\" label to the segment row.",
    },
    {
      id: "label",
      name: "Label",
      token: "Field.Label",
      selector: "[class~=\"aui-field-label\"]",
      description: "The \"Units\" label above the segments, referenced by aria-labelledby so the group is named.",
    },
    {
      id: "group",
      name: "Group",
      token: "ToggleGroup",
      selector: "[class~=\"aui-toggle-group\"]",
      description: "The single-select group (multiple={false}) with Metric chosen, whose segments share the full width.",
    },
    {
      id: "item",
      name: "Item",
      token: "ToggleGroup.Item",
      selector: "[class~=\"aui-toggle-group\"] > button",
      description: "One option, Metric or Imperial, rendered through a text Button at scale \"xs\" with no padding that flexes to fill.",
    },
    {
      id: "segment",
      name: "Segment",
      token: "View",
      selector: "[class~=\"aui-toggle-group\"] > button [class~=\"aui-view\"]",
      description: "The inner span that paints the segment: solid secondary with soft corners when pressed, plain text on surface otherwise.",
    },
    {
      id: "text",
      name: "Option text",
      token: "Type",
      selector: "[class~=\"aui-toggle-group\"] > button [data-aui-typeface]",
      description: "The Metric or Imperial name in a Type role \"l5\" at medium weight.",
    },
  ],
});
