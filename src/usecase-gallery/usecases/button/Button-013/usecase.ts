import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  area: 'Form',
  title: 'Raised solid with icon',
  apps: ['hcs'],
  source: { hcs: 'src/App.tsx' },
  summary: 'A raised solid Button resets one field group to its default without leaving the form.',
  where: 'Next to a group of inputs in a side panel: Reset to default. Real site source: HCS, the only live use of color "raised". Built from the Beam Properties section in src/App.tsx (lines 1131-1320).',
  when: 'Use it for a helper that acts on part of a form. It sits slightly darker than the default gray so it still reads on a gray panel.',
  how: 'Set aui scale "sm", paint "solid", color "raised" and shape "soft", with Button.Icon arrow-rotate-left before the label. In context it is the Beam Properties section of the Input pane: one beam column cut to the Fc perp field with the button below it. The button is left-aligned and as wide as its label (the app\'s `.hcs-material-strength` rule, here an alignSelf start wrapper); the app has it in both beam columns, with the beam type, species, SG, width and depth fields around it and the other sections above. The field value is sample data.',
});
