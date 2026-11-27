import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Checkbox group',
  title: 'Print summary checkbox',
  apps: ['ace', 'pbs'],
options: [
    { id: "ace-print", showContext: false, name: "Print summary", apps: ["ace","pbs"], note: "A title sits above the checkbox; PBS uses a smaller gap than ACE.", source: {"ace":"src/features/print/ui/CrackPrintReport.tsx","pbs":"src/PrintView.tsx"} ,
    },
  ],
  source: {
    ace: 'src/features/print/ui/CrackPrintReport.tsx',
    pbs: 'src/PrintView.tsx',
  },
  summary: 'A read-only Checkbox under a Fieldset legend in the print report that repeats an input option of the input panel.',
  where: 'The print reports of ACE (src/features/print/ui/CrackPrintReport.tsx, paste over both sides) and PBS (src/PrintView.tsx, Rotate Post Orientation and Rough Sawn).',
  when: 'Use it in a printed or read-only summary when the report must show the same on and off choice as the input panel. Do not use it to show a result value (a Table cell or text) or to toggle parts of a drawing (Checkbox-004, the Object visibility group).',
  how: 'The Checkbox keeps the input look (scale "sm", 22px box, 16px label, selected color "primary" paint "solid", unselected color "surface" paint "tonal" with borderColor "outlined"). ACE: a Fieldset with a Fieldset.Legend over the box, with `readOnly` so it cannot be toggled and looks normal (a click leaves aria-checked true). PBS: a column (gap 8) under a Type l4 title (14px, weight 600) with a smaller gap, only a spacing difference from ACE; the source Checkbox is `disabled`, which paints it grey (the box rgb(224, 224, 224), the mark rgb(100, 116, 139)), while the scene keeps it enabled. The scenes leave out the other selections and the results tables of the print report.',
  anatomy: [
    {
      id: "fieldset",
      name: "Fieldset",
      selector: "[class~=\"aui-fieldset\"]",
      description: "The print-report group, without padding, that ties the legend to the read-only option below it.",
     lesson: {"explanation":"Unpadded print-report group ties the legend to its read-only option."}},
    {
      id: "legend",
      name: "Legend",
      selector: "[class~=\"aui-fieldset-legend\"]",
      description: "The legend \"Paste over both sides of crack\" that repeats the input panel option the checkbox mirrors.",
     lesson: {"explanation":"Legend repeats the input choice: Paste over both sides of crack."}},
    {
      id: "checkbox",
      name: "Checkbox",
      selector: "[class~=\"aui-checkbox\"]",
      description: "A read-only, selected checkbox that cannot be toggled in the printed report, drawn with the primary solid selected style.",
     lesson: {"explanation":"Selected read-only checkbox shows the saved answer in solid primary style."}},
    {
      id: "indicator",
      name: "Indicator",
      selector: "[class~=\"aui-checkbox-indicator\"]",
      description: "The box showing the repeated input as checked in the report.",
     lesson: {"explanation":"The box showing the repeated input as checked in the report.","code":["Checkbox"]}},
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-control-row\"] > [class~=\"aui-label\"]",
      description: "The answer \"Yes\" next to the box, matching the value chosen in the input panel (ACE and PBS reports).",
     lesson: {"explanation":"Yes label repeats the value chosen in the input panel."}},
  ],
});
