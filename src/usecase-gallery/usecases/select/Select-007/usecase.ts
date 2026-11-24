import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field select',
  title: 'Options with images',
  apps: ['rws', 'agpd'],
  options: [
    { id: "rws-option-images", name: "Options with images", apps: ["rws"], source: {"rws":"src/rws/inputs.tsx"} },
    { id: "agpd-option-images", name: "Options with images — UI variant 2", apps: ["agpd"], source: {"agpd":"src/agpd/controls.tsx"} },
  ],
  source: { rws: 'src/rws/inputs.tsx', agpd: 'src/agpd/controls.tsx' },
  summary: 'A field select whose rows lead with a picture of the option in a tonal tile, so the user picks by sight.',
  where: 'The input panel of RWS and AGPD where an option has a drawing: the base plate and fastener choices.',
  when: 'Use it when the options are shapes or parts the user recognises faster by picture than by name. The closed trigger shows the text only. Use the field select (Select-001) when the options have no picture.',
  how: 'RWS: a Field at scale "sm" with the label above a Field.Select whose trigger is color "surface", paint "fixed" (28px). Each Field.SelectItem leads with a View (as span) at color "primary", paint "tonal", shape "soft" and 4 padding on every side, which holds the option picture, then Field.SelectItemText and an empty Field.SelectItemIndicator. AGPD: the same field and tile, but the Field.SelectItemIndicator of the chosen row holds a check icon (a 16px icon RWS does not draw). The apps draw a picture, and AGPD swaps it for a small image on touch; the scenes draw a kit icon in the tile and leave out the help trigger, the lock, the note and the other fields.',
  anatomy: [
    {
      id: 'field',
      name: 'Field',
      token: 'Field',
      selector: '[class~="aui-field"]',
      description: 'Field at scale "sm" with a 3 gap and a fixed 224px width, so the picture rows have room.',
      code: `<Field aui={{ scale: 'sm', sx: { gap: '3', width: '224' } }}>
  {/* … */}
</Field>`,
    },
    {
      id: 'label',
      name: 'Label',
      token: 'Field.Label',
      selector: '[class~="aui-field-label"]',
      description: 'The "Base plate" label above the trigger.',
      code: `<Field.Label aui={{ scale: 'sm' }}>Base plate</Field.Label>`,
    },
    {
      id: 'trigger',
      name: 'Trigger',
      token: 'Field.SelectTrigger',
      selector: '[class~="aui-select-trigger"]',
      description: 'Full-width outlined trigger showing the chosen plate name only; the picture appears in the rows, not in the trigger.',
      code: `<Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', sx: { width: 'fill' } }}>
  {/* … */}
</Field.SelectTrigger>`,
    },
    {
      id: 'value',
      name: 'Value',
      token: 'Field.SelectValue',
      selector: '[class~="aui-select-value"]',
      text: true,
      description: 'Shows "Plate A", the default base plate.',
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
      description: 'Popup of the trigger width listing Plate A, Plate B and Plate C.',
      code: `<Field.SelectPopup matchTriggerWidth>
  {/* … */}
</Field.SelectPopup>`,
    },
    {
      id: 'list',
      name: 'List',
      token: 'Field.SelectList',
      selector: '[class~="aui-select-list"]',
      description: 'The list of the three plate rows.',
      code: `<Field.SelectList>
  {/* … */}
</Field.SelectList>`,
    },
    {
      id: 'item',
      name: 'Item',
      token: 'Field.SelectItem',
      selector: '[class~="aui-select-item"]',
      description: 'A plate row that leads with a picture tile, then the name and an indicator slot.',
      code: `<Field.SelectItem value="plate-a">
  <View as="span" aui={{ color: 'primary', paint: 'tonal', shape: 'soft', sx: { paddingBlockStart: '4', paddingBlockEnd: '4', paddingInlineStart: '4', paddingInlineEnd: '4' } }}>
  <ContainedIcon name="image" aria-hidden />
</View>
  <Field.SelectItemText>Plate A</Field.SelectItemText>
  <Field.SelectItemIndicator />
</Field.SelectItem>`,
    },
    {
      id: 'image-tile',
      name: 'Image tile',
      token: 'View',
      selector: '[class~="aui-select-item"] > [class~="aui-view"]',
      description: 'The tonal primary tile with soft corners and 4 padding that frames the option picture.',
      code: `<View as="span" aui={{ color: 'primary', paint: 'tonal', shape: 'soft', sx: { paddingBlockStart: '4', paddingBlockEnd: '4', paddingInlineStart: '4', paddingInlineEnd: '4' } }}>
<ContainedIcon name="image" aria-hidden />
</View>`,
    },
    {
      id: 'image',
      name: 'Image',
      token: 'ContainedIcon',
      selector: '[class~="aui-select-item"] > [class~="aui-view"] > [class~="aui-contained-icon"]',
      description: 'The image glyph standing in for the plate drawing; the apps show a real picture.',
      code: `<ContainedIcon name="image" aria-hidden />`,
    },
    {
      id: 'item-text',
      name: 'Item text',
      token: 'Field.SelectItemText',
      selector: '[class~="aui-select-item-text"]',
      description: 'The plate name next to the picture.',
      code: `<Field.SelectItemText>Plate A</Field.SelectItemText>`,
    },
    {
      id: 'indicator',
      name: 'Indicator',
      token: 'Field.SelectItemIndicator',
      selector: '[class~="aui-select-item-indicator"]',
      description: 'End-of-row slot; the AGPD scene draws a check icon here on the chosen plate.',
      code: `<Field.SelectItemIndicator />`,
    },
  ],
});
