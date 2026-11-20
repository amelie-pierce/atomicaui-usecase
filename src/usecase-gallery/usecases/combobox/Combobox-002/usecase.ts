import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Combobox',
  title: 'Select with option preview',
  apps: ['hcs'],
  cases: [{ id: 'hcs-beam-type', name: 'Beam type', source: { hcs: 'src/components/HcsBeamTypeSelect.tsx' } }],
  source: { hcs: 'src/components/HcsBeamTypeSelect.tsx' },
  summary: 'A compact Combobox whose open list previews the highlighted option in a card beside it.',
  where: 'The Type and Supported type fields of the HCS Input pane (src/components/HcsBeamTypeSelect.tsx).',
  when: 'Use it when an option is easier to choose from a picture. Use the searchable select (Combobox-001) when the list only needs filtering.',
  how: '`Combobox` with `items`, `value`, `open`, `onOpenChange`, `onValueChange` and `onItemHighlighted`; `Combobox.InputGroup` at `scale: "sm"` (`color: "surface"`, `paint: "fixed"`, 28px tall) with `Combobox.Input` and the chevron `Combobox.Trigger`; the `Combobox.Popup` takes `matchTriggerWidth` and `maxHeight="20rem"`. A `Popover` anchored to the popup shows the preview Card (Card-003) after a 150ms pause on an option. The scene sets the Card in a row beside the open list instead of a floating Popover.',
});
