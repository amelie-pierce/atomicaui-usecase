import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field select',
  title: 'Multiple select',
  apps: ['pbs', 'fd', 'pfd'],
options: [
    { id: "pbs-multi-select", showContext: false, name: "Multiple select", apps: ["pbs","fd"], note: "Plain rows: chosen rows show by their raised fill.", source: {"pbs":"src/InputFields.tsx","fd":"src/components/ui.jsx"} ,
    },
    { id: "pfd-multi-select", showContext: false, name: "Checkbox row select", apps: ["pfd"], note: "Checkbox rows: each row leads with a checked or empty square.", source: {"pfd":"src/pfd/fields.tsx"},
      componentDocument: { summary: 'A multi-select field whose rows lead with a checkbox showing each choice state.', how: 'PFD keeps the selected labels in the trigger and puts a checked or empty square before each row. The list stays open while several values can be toggled.' },
      componentAnatomy: [
        { id: 'indicator', description: 'PFD omits the trailing indicator; each row leads with a checkbox glyph instead.' },
        { id: 'checkbox-icon', description: 'A checked square marks Standard and Hot dip galvanized; an empty square marks Stainless steel.' },
      ],
    },
  ],
  source: { pbs: 'src/InputFields.tsx', fd: 'src/components/ui.jsx', pfd: 'src/pfd/fields.tsx' },
  summary: 'The field select with the `multiple` prop: the trigger lists every chosen option and the list stays open while rows are toggled.',
  where: 'The input panel where one design input takes several values at once: the Corrosion Resistance field of PBS and PFD, and any FD Choice written with `multiple`.',
  when: 'Use it when the user may keep more than one option of a short fixed list. Use the single field select (Select-001) for one value.',
  how: 'Plain rows (PBS, FD): the label above a Field.Select with `multiple` and an array value; the 28px outlined trigger (surface, fixed, width fill) holds a Field.SelectValue whose children are the chosen labels joined with a comma, and a chevron. Each row is a Field.SelectItem with Field.SelectItemText and an empty Field.SelectItemIndicator, the chosen rows shown by their raised fill. Checkbox rows (PFD): same trigger and joined text, but each row leads with a ContainedIcon (square-check when chosen, square when not) and has no indicator. The scenes show the enabled state (PFD shows Not Applicable when disabled) and leave out the help trigger, the app\'s "All" rule and the other fields.',
  anatomy: [
    {
      id: 'field',
      name: 'Field',
      selector: '[class~="aui-field"]',
      description: 'Field at scale "sm" with a 3 gap that stacks the Corrosion Resistance label above the multi-select.',
     lesson: {"explanation":"Small field stacks Corrosion Resistance above the multi-select."}},
    {
      id: 'label',
      name: 'Label',
      selector: '[class~="aui-field-label"]',
      description: 'The "Corrosion Resistance" label at scale "sm".',
     lesson: {"explanation":"Small Corrosion Resistance label appears above the multi-select."}},
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-select-trigger"]',
      description: 'The 28px outlined trigger that stays one line high while it lists every chosen option.',
     lesson: {"explanation":"28px outlined trigger stays one line for chosen options."}},
    {
      id: 'value',
      name: 'Value',
      selector: '[class~="aui-select-value"]',
      text: true,
      description: 'Written out as "Standard, Hot dip galvanized": with `multiple` the value is a comma-joined string of the chosen labels.',
    },
    {
      id: 'chevron',
      name: 'Chevron',
      selector: '[class~="aui-select-chevron"]',
      description: 'The chevron at the trigger end; the list stays open while rows are toggled.',
     lesson: {"explanation":"Trailing chevron opens a list that stays open during selection."}},
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-select-popup"]',
      description: 'Popup of the trigger width listing Standard, Hot dip galvanized and Stainless steel.',
     lesson: {"explanation":"Popup lists Standard, Hot dip galvanized, and Stainless steel."}},
    {
      id: 'list',
      name: 'List',
      selector: '[class~="aui-select-list"]',
      description: 'The list holding the three corrosion options.',
     lesson: {"explanation":"Popup list holds the three corrosion resistance choices."}},
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-select-item"]',
      description: 'A toggleable option row; both Standard and Hot dip galvanized start selected (the `multiple` defaultValue is an array).',
     lesson: {"explanation":"Standard and Hot dip galvanized start selected in the multi-select."}},
    {
      id: 'item-text',
      name: 'Item text',
      selector: '[class~="aui-select-item-text"]',
      description: 'The option name such as "Stainless steel".',
     lesson: {"explanation":"Option name appears beside its control, such as Stainless steel."}},
    {
      id: 'indicator',
      name: 'Indicator',
      selector: '[class~="aui-select-item-indicator"]',
      description: 'The indicator slot at the row end; the PFD scene leads each row with a checkbox icon instead.',
     lesson: {"explanation":"End slot marks selection; PFD uses leading checkbox icons instead."}},
    {
      id: 'checkbox-icon',
      name: 'Checkbox icon',
      selector: '[class~="aui-select-item"] > [class~="aui-contained-icon"]',
      description: 'In the PFD scene each row leads with a square-check icon when chosen and a square when not, with no indicator.',
     lesson: {"explanation":"PFD leads each row with a checked or empty square icon."}},
  ],
});
