import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Combobox',
  title: 'Select with option preview',
  apps: ['hcs'],
  options: [
    { id: "hcs-beam-type", name: "Beam type", source: {"hcs":"src/components/HcsBeamTypeSelect.tsx"} },
  ],
  source: { hcs: 'src/components/HcsBeamTypeSelect.tsx' },
  summary: 'A compact Combobox whose open list previews the highlighted option in a card beside it.',
  where: 'The Type and Supported type fields of the HCS Input pane (src/components/HcsBeamTypeSelect.tsx).',
  when: 'Use it when an option is easier to choose from a picture. Use the searchable select (Combobox-001) when the list only needs filtering.',
  how: '`Combobox` with `items`, `value`, `open`, `onOpenChange`, `onValueChange` and `onItemHighlighted`; `Combobox.InputGroup` at `scale: "sm"` (`color: "surface"`, `paint: "fixed"`, 28px tall) with `Combobox.Input` and the chevron `Combobox.Trigger`; the `Combobox.Popup` takes `matchTriggerWidth` and `maxHeight="20rem"`. A `Popover` anchored to the popup shows the preview Card (Card-003) after a 150ms pause on an option. The scene sets the Card in a row beside the open list instead of a floating Popover.',
  anatomy: [
    {
      id: 'field',
      name: 'Field',
      token: 'Field',
      selector: '[class~="aui-field"]',
      description: 'Field at scale "sm" with a 3 gap that stacks the Type label above the combobox.',
      code: `<Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
  {/* … */}
</Field>`,
    },
    {
      id: 'label',
      name: 'Label',
      token: 'Field.Label',
      selector: '[class~="aui-field-label"]',
      description: 'The "Type" label above the input group.',
      code: `<Field.Label aui={{ scale: 'sm' }}>Type</Field.Label>`,
    },
    {
      id: 'input-group',
      name: 'Input group',
      token: 'Combobox.InputGroup',
      selector: '[class~="aui-combobox-input-group"]',
      description: 'Input group at scale "sm" (color "surface", paint "fixed"), 28px high, matching the other Input pane fields.',
      code: `<Combobox.InputGroup aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { height: '28', minHeight: '28' } }}>
  {/* … */}
</Combobox.InputGroup>`,
    },
    {
      id: 'input',
      name: 'Input',
      token: 'Combobox.Input',
      selector: '[class~="aui-combobox-input"]',
      description: 'The type field showing "Glulam"; it filters Glulam, Solid Sawn and Parallel Strand Lumber as the user types.',
      code: `<Combobox.Input aria-label="Type" aui={{ scale: 'sm' }} />`,
    },
    {
      id: 'trigger',
      name: 'Trigger',
      token: 'Combobox.Trigger',
      selector: '[class~="aui-combobox-trigger"]',
      description: 'The "Open Type" button at the end of the group that opens the list.',
      code: `<Combobox.Trigger aria-label="Open Type" aui={{ scale: 'sm' }}>
  {/* … */}
</Combobox.Trigger>`,
    },
    {
      id: 'icon',
      name: 'Icon',
      token: 'Combobox.Icon',
      selector: '[class~="aui-combobox-icon"]',
      description: 'The chevron-down glyph in the monotone layer at scale "sm".',
      code: `<Combobox.Icon name="chevron-down" layer="monotone" aui={{ scale: 'sm' }} />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Combobox.Popup',
      selector: '[class~="aui-combobox-popup"]',
      description: 'Popup of the trigger width capped at 20rem high, aligned to the start of the group.',
      code: `<Combobox.Popup matchTriggerWidth maxHeight="20rem" aui={{ scale: 'sm' }}>
  {/* … */}
</Combobox.Popup>`,
    },
    {
      id: 'list',
      name: 'List',
      token: 'Combobox.List',
      selector: '[class~="aui-combobox-list"]',
      description: 'The list that renders one row per timber type.',
      code: `<Combobox.List>
  {/* … */}
</Combobox.List>`,
    },
    {
      id: 'item',
      name: 'Item',
      token: 'Combobox.Item',
      selector: '[class~="aui-combobox-item"]',
      description: 'A timber type row at scale "sm"; highlighting one previews it in the card beside the list.',
      code: `<Combobox.Item key={option} value={option} aui={{ scale: 'sm' }}>
  {/* … */}
</Combobox.Item>`,
    },
    {
      id: 'preview-card',
      name: 'Preview card',
      token: 'Card',
      selector: '[class~="aui-card"]',
      description: 'In the HCS scene the highlighted option shows in a 224px card to the right of the open list.',
      code: `<Card aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { width: '224', marginBlockStart: '64' } }}>
  {/* … */}
</Card>`,
    },
    {
      id: 'preview-title',
      name: 'Preview title',
      token: 'Card.Title',
      selector: '[class~="aui-card-title"]',
      description: 'The option name, "Glulam", shown above the preview picture.',
      code: `<Card.Title>Glulam</Card.Title>`,
    },
  ],
});
