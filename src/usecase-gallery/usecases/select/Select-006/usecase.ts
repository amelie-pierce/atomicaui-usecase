import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field select',
  title: 'Grouped options',
  apps: ['adc', 'fd'],
  options: [
    { id: "adc-grouped-options", name: "Grouped options", apps: ["adc"], source: {"adc":"src/adc/components/DesignField.tsx"} },
    { id: "fd-grouped-options", name: "Grouped options — UI variant 2", apps: ["fd"], source: {"fd":"src/components/SettingsPopover.jsx"} },
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
      token: 'Field',
      selector: '[class~="aui-field"]',
      description: 'Field written as a row (flexDirection "row", centred, full width) so the Product label and trigger share one line.',
      code: `<Field aui={{ sx: { flexDirection: 'row', alignItems: 'center', width: 'fill' } }}>
  {/* … */}
</Field>`,
    },
    {
      id: 'label',
      name: 'Label',
      token: 'Field.Label',
      selector: '[class~="aui-field-label"]',
      description: 'The "Product" label that takes half the row (flexBasis "half") and truncates with an ellipsis.',
      code: `<Field.Label aui={{ sx: { flex: 'fill', flexBasis: 'half', minWidth: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>Product</Field.Label>`,
    },
    {
      id: 'trigger',
      name: 'Trigger',
      token: 'Field.SelectTrigger',
      selector: '[class~="aui-select-trigger"]',
      description: 'Outlined trigger that fills the other half of the row (flex fill, flexBasis "half"); the FD scene leads it with the chosen row\'s icon.',
      code: `<Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', sx: { flex: 'fill', flexBasis: 'half', minWidth: '0' } }}>
  {/* … */}
</Field.SelectTrigger>`,
    },
    {
      id: 'value',
      name: 'Value',
      token: 'Field.SelectValue',
      selector: '[class~="aui-select-value"]',
      text: true,
      description: 'Shows the chosen product, "Anchor A1" by default.',
      code: `<Field.SelectValue />`,
    },
    {
      id: 'chevron',
      name: 'Chevron',
      token: 'Field.SelectChevron',
      selector: '[class~="aui-select-chevron"]',
      description: 'The chevron at the trigger end.',
      code: `<Field.SelectChevron />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Field.SelectPopup',
      selector: '[class~="aui-select-popup"]',
      description: 'Popup of the trigger width holding two groups, Anchors and Rods.',
      code: `<Field.SelectPopup matchTriggerWidth>
  {/* … */}
</Field.SelectPopup>`,
    },
    {
      id: 'list',
      name: 'List',
      token: 'Field.SelectList',
      selector: '[class~="aui-select-list"]',
      description: 'The list that stacks the Anchors and Rods groups.',
      code: `<Field.SelectList>
  {/* … */}
</Field.SelectList>`,
    },
    {
      id: 'group',
      name: 'Group',
      token: 'Field.SelectGroup',
      selector: '[class~="aui-select-group"]',
      description: 'One family of related rows: Anchors (Anchor A1, Anchor A2) or Rods (Rod B1).',
      code: `<Field.SelectGroup>
  {/* … */}
</Field.SelectGroup>`,
    },
    {
      id: 'group-label',
      name: 'Group label',
      token: 'Field.SelectGroupLabel',
      selector: '[class~="aui-select-group-label"]',
      description: 'The heading above each family, "Anchors" and "Rods".',
      code: `<Field.SelectGroupLabel>Anchors</Field.SelectGroupLabel>`,
    },
    {
      id: 'item',
      name: 'Item',
      token: 'Field.SelectItem',
      selector: '[class~="aui-select-item"]',
      description: 'A product row inside its group; the chosen row is marked by a raised fill.',
      code: `<Field.SelectItem value="a1">
  <Field.SelectItemText>Anchor A1</Field.SelectItemText>
  <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
</Field.SelectItem>`,
    },
    {
      id: 'item-text',
      name: 'Item text',
      token: 'Field.SelectItemText',
      selector: '[class~="aui-select-item-text"]',
      description: 'The product name, such as "Anchor A2" or "Rod B1".',
      code: `<Field.SelectItemText>Anchor A1</Field.SelectItemText>`,
    },
    {
      id: 'indicator',
      name: 'Indicator',
      token: 'Field.SelectItemIndicator',
      selector: '[class~="aui-select-item-indicator"]',
      description: 'Empty slot (`{null}`) at the row end; no check is drawn.',
      code: `<Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>`,
    },
  ],
});
