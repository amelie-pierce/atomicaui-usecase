import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Add job button',
  look: 'Dark solid',
  apps: ['ace'],
  cases: [
    { id: 'ace-button', name: 'Add new entry', apps: ['ace'], source: { ace: 'src/features/calculation/ui/CalculationOutput.tsx' } },
  ],
  source: { ace: 'src/features/calculation/ui/CalculationOutput.tsx' },
  summary: 'A solid secondary Button with a plus icon appends an empty job entry under the Job tally table.',
  where: 'Under the Job tally table of ACE, in a column with the table title, stretching across it. Real site source: ACE src/features/calculation/ui/CalculationOutput.tsx. No other app has this Button.',
  when: 'Use it to append an empty entry to a list; it needs no selection (the add-the-chosen-result Button is Button-013).',
  how: 'The same secondary solid recipe as Button-013 (color "secondary", paint "solid", scale "sm") with Button.Icon plus before the label. The Job and quantity columns, the row actions and the totals row are left out. '
    + 'One group, ACE only.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      token: "Button",
      description: "The Add job Button under the Job tally table: solid secondary, small, stretching across the ACE column.",
      selector: "[class~=\"aui-button\"]",
      code: "<Button aui={{ color: 'secondary', paint: 'solid', scale: 'sm' }}>\n  …\n</Button>",
    },
    {
      id: "icon",
      name: "Icon",
      token: "Button.Icon",
      description: "The plus glyph before the label, marked aria-hidden since the label already says what it does.",
      selector: "[class~=\"aui-button\"] > :is([class~=\"aui-contained-icon\"], [class~=\"aui-icon\"])",
      code: "<Button.Icon name=\"plus\" aria-hidden />",
    },
    {
      id: "label",
      name: "Label",
      token: "Button",
      description: "The text \"Add job\" that appends an empty job entry.",
      selector: "[class~=\"aui-button\"]",
      text: true,
      code: "Add job",
    },
  ],
});
