import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Form',
  title: 'In-form helper action',
  apps: ['hcs'],
  source: { hcs: 'src/App.tsx' },
  summary: 'A raised solid Button resets one field group to its default without leaving the form.',
  where: 'Next to a group of inputs in a side panel: Reset to default. Real site source: HCS Button-006, the only live use of color "raised". Built from the Beam Properties section in src/App.tsx (lines 1131-1320).',
  when: 'Use it for a helper that acts on part of a form. It sits slightly darker than the default gray so it still reads on a gray panel.',
  how: 'Set aui scale "sm", paint "solid", color "raised" and shape "soft", with Button.Icon arrow-rotate-left before the label. In context it is the Beam Properties section of the Input pane: two beam columns in a two-column grid, each with beam type, species, SG, Fc perp with the button below it, width and depth. The button is left-aligned and as wide as its label (the app\'s `.hcs-material-strength` rule, here an alignSelf start wrapper) and appears in both columns. The other sections are collapsed. Field values are sample data.',
});
