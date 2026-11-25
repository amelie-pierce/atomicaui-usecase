import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'preview-card', name: 'Preview card', selector: '[class~="aui-card"]', description: 'The 224px elevated Card beside the open list that previews the highlighted timber type (the app shows it in a side Popover).' },
  { id: 'preview-title', name: 'Preview title', selector: '[class~="aui-card-title"]', description: 'The type name, Glulam, shown above the preview picture.' },
];

export default defineUsecase({
  uiType: 'Combobox',
  title: 'Select with option preview',
  apps: ['hcs'],
    layers: [
        {"id":"field","partId":"field","title":"Field","explanation":"Field at scale \"sm\" with a 3 gap that stacks the Type label above the combobox.","keyIdea":"The Field wrapper keeps the Type prompt and its searchable selection together.","selector":"[class~=\"aui-field\"]"},
        {"id":"label","partId":"label","title":"Label","explanation":"The \"Type\" label above the input group.","keyIdea":"The Type label tells users which timber classification the query will change.","selector":"[class~=\"aui-field-label\"]"},
        {"id":"input-group","partId":"input-group","title":"Input group","explanation":"Input group at scale \"sm\" (color \"surface\", paint \"fixed\"), 28px high, matching the other Input pane fields.","keyIdea":"A surface input group keeps search and expansion controls aligned with neighboring fields.","selector":"[class~=\"aui-combobox-input-group\"]"},
        {"id":"input","partId":"input","title":"Input","explanation":"The type field showing \"Glulam\"; it filters Glulam, Solid Sawn and Parallel Strand Lumber as the user types.","keyIdea":"Typing filters the timber choices while the current Glulam value stays visible.","selector":"[class~=\"aui-combobox-input\"]"},
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"The \"Open Type\" button at the end of the group that opens the list.","keyIdea":"The named Open Type action gives keyboard and screen-reader users an explicit list control.","selector":"[class~=\"aui-combobox-trigger\"]"},
        {"id":"icon","partId":"icon","title":"Icon","explanation":"The chevron-down glyph in the monotone layer at scale \"sm\".","keyIdea":"The downward glyph identifies the trigger as a way to expand timber choices.","selector":"[class~=\"aui-combobox-icon\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"Popup of the trigger width capped at 20rem high, aligned to the start of the group.","keyIdea":"The capped popup keeps long timber lists scrollable without losing their field anchor.","selector":"[class~=\"aui-combobox-popup\"]"},
        {"id":"list","partId":"list","title":"List","explanation":"The list that renders one row per timber type.","keyIdea":"The list makes all matching timber classifications available for comparison.","selector":"[class~=\"aui-combobox-list\"]"},
        {"id":"item","partId":"item","title":"Item","explanation":"A timber type row at scale \"sm\"; highlighting one previews it in the card beside the list.","keyIdea":"Choosing a row updates the type and drives the adjacent illustration preview.","selector":"[class~=\"aui-combobox-item\"]"},
      ],
options: [
    { id: "hcs-beam-type", name: "Beam type", source: {"hcs":"src/components/HcsBeamTypeSelect.tsx"}, contextAnatomy: CONTEXT_ANATOMY ,
      contextLayers: [
        {"id":"context-preview-card","partId":"preview-card","title":"Preview card","explanation":"The 224px elevated Card beside the open list that previews the highlighted timber type (the app shows it in a side Popover).","keyIdea":"The elevated preview card separates the highlighted timber picture from the selectable rows.","selector":"[class~=\"aui-card\"]","scope":"context"},
        {"id":"context-preview-title","partId":"preview-title","title":"Preview title","explanation":"The type name, Glulam, shown above the preview picture.","keyIdea":"The heading names the timber type represented by the nearby illustration.","selector":"[class~=\"aui-card-title\"]","scope":"context"},
      ],
    },
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
      selector: '[class~="aui-field"]',
      description: 'Field at scale "sm" with a 3 gap that stacks the Type label above the combobox.',
    },
    {
      id: 'label',
      name: 'Label',
      selector: '[class~="aui-field-label"]',
      description: 'The "Type" label above the input group.',
    },
    {
      id: 'input-group',
      name: 'Input group',
      selector: '[class~="aui-combobox-input-group"]',
      description: 'Input group at scale "sm" (color "surface", paint "fixed"), 28px high, matching the other Input pane fields.',
    },
    {
      id: 'input',
      name: 'Input',
      selector: '[class~="aui-combobox-input"]',
      description: 'The type field showing "Glulam"; it filters Glulam, Solid Sawn and Parallel Strand Lumber as the user types.',
    },
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-combobox-trigger"]',
      description: 'The "Open Type" button at the end of the group that opens the list.',
    },
    {
      id: 'icon',
      name: 'Icon',
      selector: '[class~="aui-combobox-icon"]',
      description: 'The chevron-down glyph in the monotone layer at scale "sm".',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-combobox-popup"]',
      description: 'Popup of the trigger width capped at 20rem high, aligned to the start of the group.',
    },
    {
      id: 'list',
      name: 'List',
      selector: '[class~="aui-combobox-list"]',
      description: 'The list that renders one row per timber type.',
    },
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-combobox-item"]',
      description: 'A timber type row at scale "sm"; highlighting one previews it in the card beside the list.',
    },
  ],
});
