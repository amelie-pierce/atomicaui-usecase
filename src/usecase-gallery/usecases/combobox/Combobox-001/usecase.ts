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
      selector: '[class~="aui-field"]',
      description: 'Field at scale "sm" with a 3 gap that stacks the Country label over the combobox.',
    },
    {
      id: 'label',
      name: 'Label',
      selector: '[class~="aui-field-label"]',
      description: 'The "Country" label above the input group.',
    },
    {
      id: 'input-group',
      name: 'Input group',
      selector: '[class~="aui-combobox-input-group"]',
      description: 'Row at scale "sm", full width, that joins the text field and the chevron button into one control.',
    },
    {
      id: 'input',
      name: 'Input',
      selector: '[class~="aui-combobox-input"]',
      description: 'The search field with placeholder "Search"; typing filters Canada, Mexico and United States, and the chosen "Canada" fills it.',
    },
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-combobox-trigger"]',
      description: 'The button at the end of the group that opens or closes the country list.',
    },
    {
      id: 'icon',
      name: 'Icon',
      selector: '[class~="aui-combobox-icon"]',
      description: 'The chevron-down glyph inside the trigger button.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-combobox-popup"]',
      description: 'Popup of the trigger width, 4px below the group; this example is built open and non-modal inside the stage.',
    },
    {
      id: 'empty',
      name: 'Empty',
      selector: '[class~="aui-combobox-empty"]',
      description: 'The "No result found" message shown when the typed text matches no country.',
    },
    {
      id: 'list',
      name: 'List',
      selector: '[class~="aui-combobox-list"]',
      description: 'The list that renders one row per matching country.',
    },
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-combobox-item"]',
      description: 'A country row; its label is the item text and the chosen row is highlighted.',
    },
    {
      id: 'item-indicator',
      name: 'Item indicator',
      selector: '[class~="aui-combobox-item-indicator"]',
      description: 'The tick that marks the chosen country row.',
    },
    {
      id: 'dialog-body',
      name: 'Dialog body',
      selector: '[class~="aui-dialog-body"]',
      description: 'In the FD licence gate scene the whole combobox sits inside the body of the "License Agreement" dialog.',
    },
  ],
});
