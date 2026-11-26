import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'ToggleGroup',
  title: 'Labelled segments',
  apps: ['hs', 'adc'],
    layers: [
        {"id":"field","partId":"field","title":"Field","explanation":"Small wrapper spans the popover width, joining Units label to segments.","keyIdea":"The wrapper binds the Units prompt to its mutually exclusive segments.","selector":"[class~=\"aui-field\"]"},
        {"id":"label","partId":"label","title":"Label","explanation":"Units label names the measurement system above the segments.","keyIdea":"The label names the measurement system before the user chooses a segment.","selector":"[class~=\"aui-field-label\"]"},
        {"id":"group","partId":"group","title":"Group","explanation":"Metric-selected group stretches across the width and allows one choice.","keyIdea":"The group makes Metric and Imperial one selection rather than two independent buttons.","selector":"[class~=\"aui-toggle-group\"]"},
        {"id":"item","partId":"item","title":"Item","explanation":"Metric and Imperial buttons fill the group without internal padding.","keyIdea":"Each option provides one system choice while sharing the available group width.","selector":"[class~=\"aui-toggle-group\"] > button"},
        {"id":"segment","partId":"segment","title":"Segment","explanation":"Pressed segment is solid secondary; unpressed segment stays plain.","keyIdea":"The inner segment fill shows which system is pressed without changing the group outline.","selector":"[class~=\"aui-toggle-group\"] > button [class~=\"aui-view\"]"},
        {"id":"text","partId":"text","title":"Option text","explanation":"Option name uses medium-weight l5 type at compact scale.","keyIdea":"The option name stays readable at the compact scale of the segmented control.","selector":"[class~=\"aui-toggle-group\"] > button [data-aui-typeface]"},
      ],
options: [
    { id: "hs-settings", name: "Settings popover", contextAnatomy: [{ id: 'settings-trigger', name: 'Settings button', description: 'The text Button labelled Settings that opens the popover under it.' }, { id: 'settings-popover', name: 'Settings popover', description: 'The elevated popover, 288px wide, anchored under the trigger that holds one Field per setting.' }], source: {"hs":"src/hs/SettingsPanel.tsx","adc":"src/adc/components/AppConfigurationPopover.tsx"} ,
      contextLayers: [
        {"id":"context-settings-trigger","partId":"settings-trigger","title":"Settings button","explanation":"The text Button labelled Settings that opens the popover under it.","keyIdea":"Settings is the entry point for preferences that contain the unit selector.","selector":"[data-ug-part=\"settings-trigger\"]","scope":"context"},
        {"id":"context-settings-popover","partId":"settings-popover","title":"Settings popover","explanation":"Elevated 288px popover groups one field for each setting.","keyIdea":"The popover groups unit preferences beside the control that opens them.","selector":"[data-ug-part=\"settings-popover\"]","scope":"context"},
      ],
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
    },
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-field-label\"]",
      description: "The \"Units\" label above the segments, referenced by aria-labelledby so the group is named.",
    },
    {
      id: "group",
      name: "Group",
      selector: "[class~=\"aui-toggle-group\"]",
      description: "The single-select group (multiple={false}) with Metric chosen, whose segments share the full width.",
    },
    {
      id: "item",
      name: "Item",
      selector: "[class~=\"aui-toggle-group\"] > button",
      description: "One option, Metric or Imperial, rendered through a text Button at scale \"xs\" with no padding that flexes to fill.",
    },
    {
      id: "segment",
      name: "Segment",
      selector: "[class~=\"aui-toggle-group\"] > button [class~=\"aui-view\"]",
      description: "The inner span that paints the segment: solid secondary with soft corners when pressed, plain text on surface otherwise.",
    },
    {
      id: "text",
      name: "Option text",
      selector: "[class~=\"aui-toggle-group\"] > button [data-aui-typeface]",
      description: "The Metric or Imperial name in a Type role \"l5\" at medium weight.",
    },
  ],
});
