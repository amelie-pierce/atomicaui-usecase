import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Reset to default button',

  options: [
    { id: "default", name: "Raised solid with icon" },
  ],
  apps: ['hcs'],
  source: { hcs: 'src/App.tsx' },
  summary: 'A raised solid Button resets one field group to its default without leaving the form.',
  where: 'Next to a group of inputs in a side panel: Reset to default. Real site source: HCS, the only live use of color "raised". Built from the Beam Properties section in src/App.tsx (lines 1131-1320).',
  when: 'Use it for a helper that acts on part of a form. It sits slightly darker than the default gray so it still reads on a gray panel.',
  how: 'Set aui scale "sm", paint "solid", color "raised" and shape "soft", with Button.Icon arrow-rotate-left before the label. '
    + 'In context it is the Beam Properties section of the Input pane: one beam column cut to the Fc perp field with the button below it. '
    + 'The button is left-aligned and as wide as its label (the app\'s `.hcs-material-strength` rule, here an alignSelf start wrapper); the app has it in both beam columns, with the beam type, species, SG, width and depth fields around it and the other sections above. '
    + 'The field value is sample data.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      description: "The Reset to default Button: small, solid, raised color with a soft shape, placed beside a group of beam property inputs in a side panel.",
      selector: "[class~=\"aui-button\"]",
    },
    {
      id: "icon",
      name: "Icon",
      description: "The counter-clockwise arrow that signals returning the group to its defaults.",
      selector: "[class~=\"aui-button\"] > :is([class~=\"aui-contained-icon\"], [class~=\"aui-icon\"])",
    },
    {
      id: "label",
      name: "Label",
      description: "The text \"Reset to default\" naming what the Button restores.",
      selector: "[class~=\"aui-button\"]",
      text: true,
    },
  ],
});
