import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field select',
  title: 'Grouped options',
  apps: ['adc', 'fd'],
    layers: [
        {"id":"field","partId":"field","title":"Field row","explanation":"Field written as a row (flexDirection \"row\", centred, full width) so the Product label and trigger share one line.","keyIdea":"Field written as a row (flexDirection \"row\", centred, full width) so the Product label and trigger share one line.","selector":"[class~=\"aui-field\"]"},
        {"id":"label","partId":"label","title":"Label","explanation":"The \"Product\" label that takes half the row (flexBasis \"half\") and truncates with an ellipsis.","keyIdea":"The \"Product\" label that takes half the row (flexBasis \"half\") and truncates with an ellipsis.","selector":"[class~=\"aui-field-label\"]"},
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"Outlined trigger that fills the other half of the row (flex fill, flexBasis \"half\"); the FD scene leads it with the chosen row's icon.","keyIdea":"Outlined trigger that fills the other half of the row (flex fill, flexBasis \"half\"); the FD scene leads it with the chosen row's icon.","selector":"[class~=\"aui-select-trigger\"]"},
        {"id":"chevron","partId":"chevron","title":"Chevron","explanation":"The chevron at the trigger end.","keyIdea":"The chevron at the trigger end.","selector":"[class~=\"aui-select-chevron\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"Popup of the trigger width holding two groups, Anchors and Rods.","keyIdea":"Popup of the trigger width holding two groups, Anchors and Rods.","selector":"[class~=\"aui-select-popup\"]"},
        {"id":"list","partId":"list","title":"List","explanation":"The list that stacks the Anchors and Rods groups.","keyIdea":"The list that stacks the Anchors and Rods groups.","selector":"[class~=\"aui-select-list\"]"},
        {"id":"group","partId":"group","title":"Group","explanation":"One family of related rows: Anchors (Anchor A1, Anchor A2) or Rods (Rod B1).","keyIdea":"One family of related rows: Anchors (Anchor A1, Anchor A2) or Rods (Rod B1).","selector":"[class~=\"aui-select-group\"]"},
        {"id":"group-label","partId":"group-label","title":"Group label","explanation":"The heading above each family, \"Anchors\" and \"Rods\".","keyIdea":"The heading above each family, \"Anchors\" and \"Rods\".","selector":"[class~=\"aui-select-group-label\"]"},
        {"id":"item","partId":"item","title":"Item","explanation":"A product row inside its group; the chosen row is marked by a raised fill.","keyIdea":"A product row inside its group; the chosen row is marked by a raised fill.","selector":"[class~=\"aui-select-item\"]"},
        {"id":"item-text","partId":"item-text","title":"Item text","explanation":"The product name, such as \"Anchor A2\" or \"Rod B1\".","keyIdea":"The product name, such as \"Anchor A2\" or \"Rod B1\".","selector":"[class~=\"aui-select-item-text\"]"},
        {"id":"indicator","partId":"indicator","title":"Indicator","explanation":"Empty slot (`{null}`) at the row end; no check is drawn.","keyIdea":"Empty slot (`{null}`) at the row end; no check is drawn.","selector":"[class~=\"aui-select-item-indicator\"]"},
      ],
options: [
    { id: "adc-grouped-options", showContext: false, name: "Grouped options", apps: ["adc"], source: {"adc":"src/adc/components/DesignField.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "fd-grouped-options", showContext: false, name: "Grouped options — UI variant 2", apps: ["fd"], source: {"fd":"src/components/SettingsPopover.jsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: { adc: 'src/adc/components/DesignField.tsx', fd: 'src/components/SettingsPopover.jsx' },
  summary: 'A select whose rows are split into labelled groups: a heading above each run of related options.',
  where: 'The design fields of the ADC input sections (a product or anchor list split by family) and the grouped lists of the FD settings popover.',
  when: 'Use it when a long list falls into named families the user scans by heading. Use the plain field select (Select-001) for a flat list.',
  how: 'Label beside (ADC): the Field is a row with the label (nowrap, ellipsis, flex fill, flex-basis half) and a 28px outlined trigger filling the other half; the popup matches the trigger width. Label above (FD): a Field at scale "sm" with the label above a 28px trigger (scale "sm", height 28) that leads with the chosen row\'s icon, and rows that lead with an icon. In both the Field.SelectList holds Field.SelectGroups, each with a Field.SelectGroupLabel heading and its Field.SelectItems (Field.SelectItemText plus an indicator written with `{null}`). The two differ in the label position, the widths (a 137px trigger beside the label, 280px above it) and the icons. The scenes show the enabled state and leave out the option thumbnails of ADC and the other fields of the section and settings popover; the scene uses a flag icon where FD shows its own icons.',
  anatomy: [
    {
      id: 'field',
      name: 'Field row',
      selector: '[class~="aui-field"]',
      description: 'Field written as a row (flexDirection "row", centred, full width) so the Product label and trigger share one line.',
    },
    {
      id: 'label',
      name: 'Label',
      selector: '[class~="aui-field-label"]',
      description: 'The "Product" label that takes half the row (flexBasis "half") and truncates with an ellipsis.',
    },
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-select-trigger"]',
      description: 'Outlined trigger that fills the other half of the row (flex fill, flexBasis "half"); the FD scene leads it with the chosen row\'s icon.',
    },
    {
      id: 'value',
      name: 'Value',
      selector: '[class~="aui-select-value"]',
      text: true,
      description: 'Shows the chosen product, "Anchor A1" by default.',
    },
    {
      id: 'chevron',
      name: 'Chevron',
      selector: '[class~="aui-select-chevron"]',
      description: 'The chevron at the trigger end.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-select-popup"]',
      description: 'Popup of the trigger width holding two groups, Anchors and Rods.',
    },
    {
      id: 'list',
      name: 'List',
      selector: '[class~="aui-select-list"]',
      description: 'The list that stacks the Anchors and Rods groups.',
    },
    {
      id: 'group',
      name: 'Group',
      selector: '[class~="aui-select-group"]',
      description: 'One family of related rows: Anchors (Anchor A1, Anchor A2) or Rods (Rod B1).',
    },
    {
      id: 'group-label',
      name: 'Group label',
      selector: '[class~="aui-select-group-label"]',
      description: 'The heading above each family, "Anchors" and "Rods".',
    },
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-select-item"]',
      description: 'A product row inside its group; the chosen row is marked by a raised fill.',
    },
    {
      id: 'item-text',
      name: 'Item text',
      selector: '[class~="aui-select-item-text"]',
      description: 'The product name, such as "Anchor A2" or "Rod B1".',
    },
    {
      id: 'indicator',
      name: 'Indicator',
      selector: '[class~="aui-select-item-indicator"]',
      description: 'Empty slot (`{null}`) at the row end; no check is drawn.',
    },
  ],
});
