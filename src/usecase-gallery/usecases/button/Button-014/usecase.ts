import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Add job button',

  apps: ['ace'],
options: [
    { id: "ace-button", name: "Add new entry", apps: ["ace"], contextAnatomy: [
      { id: "tally-section", name: "Job tally section", description: "The section that stacks the title, table and Add job button in a column." , lesson: {"explanation":"Vertical section stacks heading, table, and Add job action.","selector":"[data-ug-part=\"tally-section\"]","scope":"context"}},
      { id: "tally-title", name: "Section title", description: "The \"Job tally\" heading." , lesson: {"explanation":"Job tally heading names the section above the table.","selector":"[data-ug-part=\"tally-title\"]","scope":"context"}},
      { id: "tally-table", name: "Job tally table", description: "The table with a Job header and one \"Job 1\" row above the button." , lesson: {"explanation":"Job table shows Job 1 above its Add job button.","selector":"[data-ug-part=\"tally-table\"]","scope":"context"}},
    ], source: {"ace":"src/features/calculation/ui/CalculationOutput.tsx"} ,
    },
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
      description: "The Add job Button under the Job tally table: solid secondary, small, stretching across the ACE column.",
      selector: "[class~=\"aui-button\"]",
     lesson: {"explanation":"Small solid secondary Add job spans the ACE column."}},
    {
      id: "icon",
      name: "Icon",
      description: "The plus glyph before the label, marked aria-hidden since the label already says what it does.",
      selector: "[class~=\"aui-button\"] > :is([class~=\"aui-contained-icon\"], [class~=\"aui-icon\"])",
     lesson: {"explanation":"Decorative plus glyph precedes the Add job label."}},
    {
      id: "label",
      name: "Label",
      description: "The text \"Add job\" that appends an empty job entry.",
      selector: "[class~=\"aui-button\"]",
      text: true,
    },
  ],
});
