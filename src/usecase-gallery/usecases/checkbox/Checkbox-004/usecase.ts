import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Print',
  title: 'Read-only option in a print summary',
  apps: ['ace', 'pbs'],
  source: { ace: 'src/features/print/ui/CrackPrintReport.tsx', pbs: 'src/PrintView.tsx' },
  cases: [
    { id: 'ace-print', name: 'Print summary', note: 'A title sits above the checkbox; PBS uses a smaller gap than ACE.', apps: ['ace', 'pbs'], source: { ace: 'src/features/print/ui/CrackPrintReport.tsx', pbs: 'src/PrintView.tsx' } },
  ],
  summary: 'The print report repeats an input option as a Checkbox the reader cannot change, so the report shows what was selected.',
  where: 'The print reports of ACE (src/features/print/ui/CrackPrintReport.tsx, paste over both sides) and PBS (src/PrintView.tsx, Rotate Post Orientation and Rough Sawn).',
  when: 'Use it when a printed or read-only summary must show the same on and off choice as the input panel. Do not use it to show a result value (a Table cell or text).',
  how: 'The Checkbox keeps the input look: scale "sm", unselected color "surface" paint "tonal" borderColor "outlined", selected color "primary" paint "solid", Checkbox.Label 16px regular. One group, measured in headless Chromium. ACE: a Fieldset with a Fieldset.Legend over the box, the same 32px from the legend top to the box top as the titled Input panel option of Checkbox-001 (ACE), with the Checkbox given `readOnly` so it cannot be toggled and looks normal. PBS: a column (gap 8) under a Type l4 title (14px, weight 600) with a smaller gap, only a spacing difference from ACE, so both share one group; the source Checkbox is `disabled`, which paints it grey (the box rgb(224, 224, 224), the mark rgb(100, 116, 139)), while the scene keeps it enabled. It stays its own use case: the box renders the same as Checkbox-001 (22px, rgb(255, 83, 8), 16px label), but `readOnly` is a different state in the code a developer writes and a different behaviour (a click leaves aria-checked true, where Checkbox-001 toggles it). The scenes leave out the other selections and the results tables of the report.',
});
