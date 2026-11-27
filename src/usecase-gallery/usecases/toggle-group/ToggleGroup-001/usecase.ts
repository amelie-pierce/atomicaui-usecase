import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'ToggleGroup',
  title: 'Labelled segments',
  apps: ['hs', 'adc'],
options: [
    { id: "hs-settings", name: "Settings popover", contextAnatomy: [{ id: 'settings-trigger', name: 'Settings button', description: 'The text Button labelled Settings that opens the popover under it.' , lesson: {"explanation":"The text Button labelled Settings that opens the popover under it.","selector":"[data-ug-part=\"settings-trigger\"]","scope":"context"}}, { id: 'settings-popover', name: 'Settings popover', description: 'The elevated popover, 288px wide, anchored under the trigger that holds one Field per setting.' , lesson: {"explanation":"Elevated 288px popover groups one field for each setting.","selector":"[data-ug-part=\"settings-popover\"]","scope":"context"}}], source: {"hs":"src/hs/SettingsPanel.tsx","adc":"src/adc/components/AppConfigurationPopover.tsx"} ,
    },
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
      selector: "[class~=\"aui-field\"]",
      description: "The wrapper at scale \"sm\", filling the popover width, that ties the \"Units\" label to the segment row.",
     lesson: {"explanation":"Small wrapper spans the popover width, joining Units label to segments."}},
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-field-label\"]",
      description: "The \"Units\" label above the segments, referenced by aria-labelledby so the group is named.",
     lesson: {"explanation":"Units label names the measurement system above the segments."}},
    {
      id: "group",
      name: "Group",
      selector: "[class~=\"aui-toggle-group\"]",
      description: "The single-select group (multiple={false}) with Metric chosen, whose segments share the full width.",
     lesson: {"explanation":"Metric-selected group stretches across the width and allows one choice."}},
    {
      id: "item",
      name: "Item",
      selector: "[class~=\"aui-toggle-group\"] > button",
      description: "One option, Metric or Imperial, rendered through a text Button at scale \"xs\" with no padding that flexes to fill.",
     lesson: {"explanation":"Metric and Imperial buttons fill the group without internal padding.","code":["ToggleGroup.Item"]}},
    {
      id: "segment",
      name: "Segment",
      selector: "[class~=\"aui-toggle-group\"] > button [class~=\"aui-view\"]",
      description: "The inner span that paints the segment: solid secondary with soft corners when pressed, plain text on surface otherwise.",
     lesson: {"explanation":"Pressed segment is solid secondary; unpressed segment stays plain."}},
    {
      id: "text",
      name: "Option text",
      selector: "[class~=\"aui-toggle-group\"] > button [data-aui-typeface]",
      description: "The Metric or Imperial name in a Type role \"l5\" at medium weight.",
     lesson: {"explanation":"Option name uses medium-weight l5 type at compact scale.","code":["Type"]}},
  ],
});
