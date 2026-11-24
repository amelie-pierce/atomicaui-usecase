import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Combobox',
  title: 'Searchable select',
  apps: ['fd'],
  options: [
    { id: "fd-license-country", name: "Country picker", source: {"fd":"src/components/LicenseGate.jsx"} },
  ],
  source: { fd: 'src/components/LicenseGate.jsx' },
  summary: 'A select you can type into: the text field filters the list, a chevron opens it, and the chosen option is ticked.',
  where: 'The country picker of the FD licence gate (src/components/LicenseGate.jsx).',
  when: 'Use it for a long list the user can search. Use a Select for a short list and a Field for free text.',
  how: '`Combobox` with `items`, `value`, `itemToStringLabel` and `onValueChange`; `Combobox.InputGroup` (`scale: "sm"`, `width: "fill"`) holds `Combobox.Input` and `Combobox.Trigger` with `Combobox.Icon` chevron-down; `Combobox.Portal` > `Combobox.Positioner` (`side="bottom"`, `sideOffset={4}`) > `Combobox.Popup` (`matchTriggerWidth`) with `Combobox.Empty` and a `Combobox.List` of `Combobox.Item`s ending in `Combobox.ItemIndicator`. FD groups the list by region with `Combobox.Group`, `GroupLabel` and `Collection`, and shows a flag before each label; the example keeps a flat list. A `Field.Label` sits above.',
  anatomy: [
    {
      id: 'field',
      name: 'Field',
      token: 'Field',
      selector: '[class~="aui-field"]',
      description: 'Field at scale "sm" with a 3 gap that stacks the Country label over the combobox.',
      code: `<Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
  {/* … */}
</Field>`,
    },
    {
      id: 'label',
      name: 'Label',
      token: 'Field.Label',
      selector: '[class~="aui-field-label"]',
      description: 'The "Country" label above the input group.',
      code: `<Field.Label aui={{ scale: 'sm' }}>Country</Field.Label>`,
    },
    {
      id: 'input-group',
      name: 'Input group',
      token: 'Combobox.InputGroup',
      selector: '[class~="aui-combobox-input-group"]',
      description: 'Row at scale "sm", full width, that joins the text field and the chevron button into one control.',
      code: `<Combobox.InputGroup aui={{ scale: 'sm', sx: { width: 'fill' } }}>
  {/* … */}
</Combobox.InputGroup>`,
    },
    {
      id: 'input',
      name: 'Input',
      token: 'Combobox.Input',
      selector: '[class~="aui-combobox-input"]',
      description: 'The search field with placeholder "Search"; typing filters Canada, Mexico and United States, and the chosen "Canada" fills it.',
      code: `<Combobox.Input placeholder="Search" aria-label="Country" />`,
    },
    {
      id: 'trigger',
      name: 'Trigger',
      token: 'Combobox.Trigger',
      selector: '[class~="aui-combobox-trigger"]',
      description: 'The button at the end of the group that opens or closes the country list.',
      code: `<Combobox.Trigger>
  {/* … */}
</Combobox.Trigger>`,
    },
    {
      id: 'icon',
      name: 'Icon',
      token: 'Combobox.Icon',
      selector: '[class~="aui-combobox-icon"]',
      description: 'The chevron-down glyph inside the trigger button.',
      code: `<Combobox.Icon name="chevron-down" />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Combobox.Popup',
      selector: '[class~="aui-combobox-popup"]',
      description: 'Popup of the trigger width, 4px below the group; this example is built open and non-modal inside the stage.',
      code: `<Combobox.Popup matchTriggerWidth aui={{ scale: 'sm' }}>
  {/* … */}
</Combobox.Popup>`,
    },
    {
      id: 'empty',
      name: 'Empty',
      token: 'Combobox.Empty',
      selector: '[class~="aui-combobox-empty"]',
      description: 'The "No result found" message shown when the typed text matches no country.',
      code: `<Combobox.Empty>No result found</Combobox.Empty>`,
    },
    {
      id: 'list',
      name: 'List',
      token: 'Combobox.List',
      selector: '[class~="aui-combobox-list"]',
      description: 'The list that renders one row per matching country.',
      code: `<Combobox.List>
  {/* … */}
</Combobox.List>`,
    },
    {
      id: 'item',
      name: 'Item',
      token: 'Combobox.Item',
      selector: '[class~="aui-combobox-item"]',
      description: 'A country row; its label is the item text and the chosen row is highlighted.',
      code: `<Combobox.Item key={option} value={option}>
  {/* … */}
</Combobox.Item>`,
    },
    {
      id: 'item-indicator',
      name: 'Item indicator',
      token: 'Combobox.ItemIndicator',
      selector: '[class~="aui-combobox-item-indicator"]',
      description: 'The tick that marks the chosen country row.',
      code: `<Combobox.ItemIndicator />`,
    },
    {
      id: 'dialog-body',
      name: 'Dialog body',
      token: 'Dialog.Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'In the FD licence gate scene the whole combobox sits inside the body of the "License Agreement" dialog.',
      code: `<Dialog.Body style={{ minBlockSize: 'calc(var(--p-px-16) * 14)' }}>
  {/* … */}
</Dialog.Body>`,
    },
  ],
});
