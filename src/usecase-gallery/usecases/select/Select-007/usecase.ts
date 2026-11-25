import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field select',
  title: 'Options with images',
  apps: ['rws', 'agpd'],
  options: [
    { id: "rws-option-images", showContext: false, name: "Options with images", apps: ["rws"], source: {"rws":"src/rws/inputs.tsx"} },
    { id: "agpd-option-images", showContext: false, name: "Options with images — UI variant 2", apps: ["agpd"], source: {"agpd":"src/agpd/controls.tsx"} },
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
      selector: '[class~="aui-field"]',
      description: 'Field at scale "sm" with a 3 gap and a fixed 224px width, so the picture rows have room.',
    },
    {
      id: 'label',
      name: 'Label',
      selector: '[class~="aui-field-label"]',
      description: 'The "Base plate" label above the trigger.',
    },
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-select-trigger"]',
      description: 'Full-width outlined trigger showing the chosen plate name only; the picture appears in the rows, not in the trigger.',
    },
    {
      id: 'value',
      name: 'Value',
      selector: '[class~="aui-select-value"]',
      text: true,
      description: 'Shows "Plate A", the default base plate.',
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
      description: 'Popup of the trigger width listing Plate A, Plate B and Plate C.',
    },
    {
      id: 'list',
      name: 'List',
      selector: '[class~="aui-select-list"]',
      description: 'The list of the three plate rows.',
    },
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-select-item"]',
      description: 'A plate row that leads with a picture tile, then the name and an indicator slot.',
    },
    {
      id: 'image-tile',
      name: 'Image tile',
      selector: '[class~="aui-select-item"] > [class~="aui-view"]',
      description: 'The tonal primary tile with soft corners and 4 padding that frames the option picture.',
    },
    {
      id: 'image',
      name: 'Image',
      selector: '[class~="aui-select-item"] > [class~="aui-view"] > [class~="aui-contained-icon"]',
      description: 'The image glyph standing in for the plate drawing; the apps show a real picture.',
    },
    {
      id: 'item-text',
      name: 'Item text',
      selector: '[class~="aui-select-item-text"]',
      description: 'The plate name next to the picture.',
    },
    {
      id: 'indicator',
      name: 'Indicator',
      selector: '[class~="aui-select-item-indicator"]',
      description: 'End-of-row slot; the AGPD scene draws a check icon here on the chosen plate.',
    },
  ],
});
