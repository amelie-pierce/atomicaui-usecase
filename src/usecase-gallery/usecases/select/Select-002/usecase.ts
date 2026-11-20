import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field select',
  title: 'Multiple select',
  apps: ['pbs', 'fd', 'pfd'],
  cases: [
    {
      id: 'pbs-multi-select',
      name: 'Multiple select',
      apps: ['pbs', 'fd'],
      note: 'Plain rows: chosen rows show by their raised fill.',
      source: { pbs: 'src/InputFields.tsx', fd: 'src/components/ui.jsx' },
    },
    {
      id: 'pfd-multi-select',
      name: 'Multiple select',
      apps: ['pfd'],
      note: 'Checkbox rows: each row leads with a checked or empty square.',
      source: { pfd: 'src/pfd/fields.tsx' },
    },
  ],
  source: { pbs: 'src/InputFields.tsx', fd: 'src/components/ui.jsx', pfd: 'src/pfd/fields.tsx' },
  summary: 'The field select with the `multiple` prop: the trigger lists every chosen option and the list stays open while rows are toggled.',
  where: 'The input panel where one design input takes several values at once: the Corrosion Resistance field of PBS and PFD, and any FD Choice written with `multiple`.',
  when: 'Use it when the user may keep more than one option of a short fixed list. Use the single field select (Select-001) for one value.',
  how: 'Plain rows (PBS, FD): the label above a Field.Select with `multiple` and an array value; the 28px outlined trigger (surface, fixed, width fill) holds a Field.SelectValue whose children are the chosen labels joined with a comma, and a chevron. Each row is a Field.SelectItem with Field.SelectItemText and an empty Field.SelectItemIndicator, the chosen rows shown by their raised fill. Checkbox rows (PFD): same trigger and joined text, but each row leads with a ContainedIcon (square-check when chosen, square when not) and has no indicator. The scenes show the enabled state (PFD shows Not Applicable when disabled) and leave out the help trigger, the app\'s "All" rule and the other fields.',
});
