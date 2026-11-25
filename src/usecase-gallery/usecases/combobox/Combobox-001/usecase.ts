import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'licence-dialog', name: 'License Agreement dialog', selector: '[class~="aui-dialog-popup"]', description: 'The non-modal Dialog that hosts the picker in the FD licence gate: a raised "License Agreement" title and a body about 14 rows tall that holds the Country field.' },
  { id: 'dialog-body', name: 'Dialog body', selector: '[class~="aui-dialog-body"]', description: 'The body of the licence dialog; the whole Country combobox sits inside it.' },
];

export default defineUsecase({
  uiType: 'Combobox',
  title: 'Searchable select',
  apps: ['fd'],
    layers: [
        {"id":"field","partId":"field","title":"Field","explanation":"Field at scale \"sm\" with a 3 gap that stacks the Country label over the combobox.","keyIdea":"Field at scale \"sm\" with a 3 gap that stacks the Country label over the combobox.","selector":"[class~=\"aui-field\"]"},
        {"id":"label","partId":"label","title":"Label","explanation":"The \"Country\" label above the input group.","keyIdea":"The \"Country\" label above the input group.","selector":"[class~=\"aui-field-label\"]"},
        {"id":"input-group","partId":"input-group","title":"Input group","explanation":"Row at scale \"sm\", full width, that joins the text field and the chevron button into one control.","keyIdea":"Row at scale \"sm\", full width, that joins the text field and the chevron button into one control.","selector":"[class~=\"aui-combobox-input-group\"]"},
        {"id":"input","partId":"input","title":"Input","explanation":"The search field with placeholder \"Search\"; typing filters Canada, Mexico and United States, and the chosen \"Canada\" fills it.","keyIdea":"The search field with placeholder \"Search\"; typing filters Canada, Mexico and United States, and the chosen \"Canada\" fills it.","selector":"[class~=\"aui-combobox-input\"]"},
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"The button at the end of the group that opens or closes the country list.","keyIdea":"The button at the end of the group that opens or closes the country list.","selector":"[class~=\"aui-combobox-trigger\"]"},
        {"id":"icon","partId":"icon","title":"Icon","explanation":"The chevron-down glyph inside the trigger button.","keyIdea":"The chevron-down glyph inside the trigger button.","selector":"[class~=\"aui-combobox-icon\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"Popup of the trigger width, 4px below the group; this example is built open and non-modal inside the stage.","keyIdea":"Popup of the trigger width, 4px below the group; this example is built open and non-modal inside the stage.","selector":"[class~=\"aui-combobox-popup\"]"},
        {"id":"empty","partId":"empty","title":"Empty","explanation":"The \"No result found\" message shown when the typed text matches no country.","keyIdea":"The \"No result found\" message shown when the typed text matches no country.","selector":"[class~=\"aui-combobox-empty\"]"},
        {"id":"list","partId":"list","title":"List","explanation":"The list that renders one row per matching country.","keyIdea":"The list that renders one row per matching country.","selector":"[class~=\"aui-combobox-list\"]"},
        {"id":"item","partId":"item","title":"Item","explanation":"A country row; its label is the item text and the chosen row is highlighted.","keyIdea":"A country row; its label is the item text and the chosen row is highlighted.","selector":"[class~=\"aui-combobox-item\"]"},
        {"id":"item-indicator","partId":"item-indicator","title":"Item indicator","explanation":"The tick that marks the chosen country row.","keyIdea":"The tick that marks the chosen country row.","selector":"[class~=\"aui-combobox-item-indicator\"]"},
      ],
options: [
    { id: "fd-license-country", name: "Country picker", source: {"fd":"src/components/LicenseGate.jsx"}, contextAnatomy: CONTEXT_ANATOMY ,
      contextLayers: [
        {"id":"context-licence-dialog","partId":"licence-dialog","title":"License Agreement dialog","explanation":"The non-modal Dialog that hosts the picker in the FD licence gate: a raised \"License Agreement\" title and a body about 14 rows tall that holds the Country field.","keyIdea":"The non-modal Dialog that hosts the picker in the FD licence gate: a raised \"License Agreement\" title and a body about 14 rows tall that holds the Country field.","selector":"[class~=\"aui-dialog-popup\"]","scope":"context"},
        {"id":"context-dialog-body","partId":"dialog-body","title":"Dialog body","explanation":"The body of the licence dialog; the whole Country combobox sits inside it.","keyIdea":"The body of the licence dialog; the whole Country combobox sits inside it.","selector":"[class~=\"aui-dialog-body\"]","scope":"context"},
      ],
    },
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
  ],
});
