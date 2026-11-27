import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'preview-card', name: 'Preview card', selector: '[class~="aui-card"]', description: 'The 224px elevated Card beside the open list that previews the highlighted timber type (the app shows it in a side Popover).' },
  { id: 'preview-title', name: 'Preview title', selector: '[class~="aui-card-title"]', description: 'The type name, Glulam, shown above the preview picture.' },
];

export default defineUsecase({
  uiType: 'Combobox',
  title: 'Select with option preview',
  apps: ['hcs'],
options: [
    { id: "hcs-beam-type", name: "Beam type", source: {"hcs":"src/components/HcsBeamTypeSelect.tsx"}, contextAnatomy: CONTEXT_ANATOMY ,
     contextAnatomyOverrides: [{"id":"preview-card","lesson":{"explanation":"Elevated 224px card previews the highlighted timber type beside the list.","scope":"context"}},{"id":"preview-title","lesson":{"explanation":"The type name, Glulam, shown above the preview picture.","scope":"context"}}]},
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
     lesson: {"explanation":"Small field stacks Type above the picker with a 3px gap."}},
    {
      id: 'label',
      name: 'Label',
      selector: '[class~="aui-field-label"]',
      description: 'The "Type" label above the input group.',
     lesson: {"explanation":"Type label sits above the Glulam picker in the small field."}},
    {
      id: 'input-group',
      name: 'Input group',
      selector: '[class~="aui-combobox-input-group"]',
      description: 'Input group at scale "sm" (color "surface", paint "fixed"), 28px high, matching the other Input pane fields.',
     lesson: {"explanation":"Small fixed-surface row matches the Input pane’s 28px fields."}},
    {
      id: 'input',
      name: 'Input',
      selector: '[class~="aui-combobox-input"]',
      description: 'The type field showing "Glulam"; it filters Glulam, Solid Sawn and Parallel Strand Lumber as the user types.',
     lesson: {"explanation":"Glulam field filters three timber types as the user types."}},
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-combobox-trigger"]',
      description: 'The "Open Type" button at the end of the group that opens the list.',
     lesson: {"explanation":"End button labelled Open Type reveals the list."}},
    {
      id: 'icon',
      name: 'Icon',
      selector: '[class~="aui-combobox-icon"]',
      description: 'The chevron-down glyph in the monotone layer at scale "sm".',
     lesson: {"explanation":"The chevron-down glyph in the monotone layer at scale \"sm\"."}},
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-combobox-popup"]',
      description: 'Popup of the trigger width capped at 20rem high, aligned to the start of the group.',
     lesson: {"explanation":"Popup aligns with the group start and caps height at 20rem."}},
    {
      id: 'list',
      name: 'List',
      selector: '[class~="aui-combobox-list"]',
      description: 'The list that renders one row per timber type.',
     lesson: {"explanation":"The list that renders one row per timber type."}},
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-combobox-item"]',
      description: 'A timber type row at scale "sm"; highlighting one previews it in the card beside the list.',
     lesson: {"explanation":"Highlighted timber row previews its type in the adjacent card."}},
  ],
});
