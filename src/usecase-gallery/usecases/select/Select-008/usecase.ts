import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Input panel',
  title: 'Options with images',
  apps: ['rws', 'agpd'],
  cases: [
    { id: 'rws-option-images', name: 'Options with images', apps: ['rws'], source: { rws: 'src/rws/inputs.tsx' } },
    { id: 'agpd-option-images', name: 'Options with images', apps: ['agpd'], source: { agpd: 'src/agpd/controls.tsx' } },
  ],
  source: { rws: 'src/rws/inputs.tsx', agpd: 'src/agpd/controls.tsx' },
  summary: 'A field select whose rows lead with a picture of the option in a tonal tile, so the user picks by sight.',
  where: 'The input panel of RWS and AGPD where an option has a drawing: the base plate and fastener choices.',
  when: 'Use it when the options are shapes or parts the user recognises faster by picture than by name. The closed trigger shows the text only. Use the field select (Select-001) when the options have no picture.',
  how: 'RWS: a Field at scale "sm" with the label above a Field.Select whose trigger is color "surface", paint "fixed" (28px). Each Field.SelectItem leads with a View (as span) at color "primary", paint "tonal", shape "soft" and 4 padding on every side, which holds the option picture, then Field.SelectItemText and an empty Field.SelectItemIndicator. AGPD: the same field and tile, but the Field.SelectItemIndicator of the chosen row holds a check icon (a 16px icon RWS does not draw). The apps draw a picture, and AGPD swaps it for a small image on touch; the scenes draw a kit icon in the tile and leave out the help trigger, the lock, the note and the other fields.',
});
