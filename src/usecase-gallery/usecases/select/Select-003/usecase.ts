import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field select',
  title: 'Multiple select',
  apps: ['pbs', 'fd', 'pfd'],
  options: [
    { id: "pbs-multi-select", name: "Multiple select", apps: ["pbs","fd"], note: "Plain rows: chosen rows show by their raised fill.", source: {"pbs":"src/InputFields.tsx","fd":"src/components/ui.jsx"} },
    { id: "pfd-multi-select", name: "Multiple select — UI variant 2", apps: ["pfd"], note: "Checkbox rows: each row leads with a checked or empty square.", source: {"pfd":"src/pfd/fields.tsx"} },
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
    },
    {
      id: 'label',
      name: 'Label',
      selector: '[class~="aui-field-label"]',
      description: 'The "Corrosion Resistance" label at scale "sm".',
    },
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-select-trigger"]',
      description: 'The 28px outlined trigger that stays one line high while it lists every chosen option.',
    },
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
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-select-popup"]',
      description: 'Popup of the trigger width listing Standard, Hot dip galvanized and Stainless steel.',
    },
    {
      id: 'list',
      name: 'List',
      selector: '[class~="aui-select-list"]',
      description: 'The list holding the three corrosion options.',
    },
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-select-item"]',
      description: 'A toggleable option row; both Standard and Hot dip galvanized start selected (the `multiple` defaultValue is an array).',
    },
    {
      id: 'item-text',
      name: 'Item text',
      selector: '[class~="aui-select-item-text"]',
      description: 'The option name such as "Stainless steel".',
    },
    {
      id: 'indicator',
      name: 'Indicator',
      selector: '[class~="aui-select-item-indicator"]',
      description: 'The indicator slot at the row end; the PFD scene leads each row with a checkbox icon instead.',
    },
    {
      id: 'checkbox-icon',
      name: 'Checkbox icon',
      selector: '[class~="aui-select-item"] > [class~="aui-contained-icon"]',
      description: 'In the PFD scene each row leads with a square-check icon when chosen and a square when not, with no indicator.',
    },
  ],
});
