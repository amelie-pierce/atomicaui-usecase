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
      token: 'Field',
      selector: '[class~="aui-field"]',
      description: 'Field at scale "sm" with a 3 gap that stacks the Corrosion Resistance label above the multi-select.',
      code: `<Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
  {/* … */}
</Field>`,
    },
    {
      id: 'label',
      name: 'Label',
      token: 'Field.Label',
      selector: '[class~="aui-field-label"]',
      description: 'The "Corrosion Resistance" label at scale "sm".',
      code: `<Field.Label aui={{ scale: 'sm' }}>Corrosion Resistance</Field.Label>`,
    },
    {
      id: 'trigger',
      name: 'Trigger',
      token: 'Field.SelectTrigger',
      selector: '[class~="aui-select-trigger"]',
      description: 'The 28px outlined trigger that stays one line high while it lists every chosen option.',
      code: `<Field.SelectTrigger aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { width: 'fill', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20' } }}>
  {/* … */}
</Field.SelectTrigger>`,
    },
    {
      id: 'value',
      name: 'Value',
      token: 'Field.SelectValue',
      selector: '[class~="aui-select-value"]',
      text: true,
      description: 'Written out as "Standard, Hot dip galvanized": with `multiple` the value is a comma-joined string of the chosen labels.',
      code: `<Field.SelectValue>Standard, Hot dip galvanized</Field.SelectValue>`,
    },
    {
      id: 'chevron',
      name: 'Chevron',
      token: 'Field.SelectChevron',
      selector: '[class~="aui-select-chevron"]',
      description: 'The chevron at the trigger end; the list stays open while rows are toggled.',
      code: `<Field.SelectChevron />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Field.SelectPopup',
      selector: '[class~="aui-select-popup"]',
      description: 'Popup of the trigger width listing Standard, Hot dip galvanized and Stainless steel.',
      code: `<Field.SelectPopup matchTriggerWidth>
  {/* … */}
</Field.SelectPopup>`,
    },
    {
      id: 'list',
      name: 'List',
      token: 'Field.SelectList',
      selector: '[class~="aui-select-list"]',
      description: 'The list holding the three corrosion options.',
      code: `<Field.SelectList>
  {/* … */}
</Field.SelectList>`,
    },
    {
      id: 'item',
      name: 'Item',
      token: 'Field.SelectItem',
      selector: '[class~="aui-select-item"]',
      description: 'A toggleable option row; both Standard and Hot dip galvanized start selected (the `multiple` defaultValue is an array).',
      code: `<Field.SelectItem value="standard">
  <Field.SelectItemText>Standard</Field.SelectItemText>
  <Field.SelectItemIndicator />
</Field.SelectItem>`,
    },
    {
      id: 'item-text',
      name: 'Item text',
      token: 'Field.SelectItemText',
      selector: '[class~="aui-select-item-text"]',
      description: 'The option name such as "Stainless steel".',
      code: `<Field.SelectItemText>Standard</Field.SelectItemText>`,
    },
    {
      id: 'indicator',
      name: 'Indicator',
      token: 'Field.SelectItemIndicator',
      selector: '[class~="aui-select-item-indicator"]',
      description: 'The indicator slot at the row end; the PFD scene leads each row with a checkbox icon instead.',
      code: `<Field.SelectItemIndicator />`,
    },
    {
      id: 'checkbox-icon',
      name: 'Checkbox icon',
      token: 'ContainedIcon',
      selector: '[class~="aui-select-item"] > [class~="aui-contained-icon"]',
      description: 'In the PFD scene each row leads with a square-check icon when chosen and a square when not, with no indicator.',
      code: `<ContainedIcon name="square-check" aria-hidden />`,
    },
  ],
});
