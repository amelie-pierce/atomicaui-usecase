import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Input panel',
  title: 'Number field with unit',
  apps: ['hcs', 'hs', 'pfd', 'rws', 'fd', 'agpd', 'adm', 'adc', 'ace'],
  cases: [
    {
      id: 'hcs-number',
      name: 'Number field',
      apps: ['hcs'],
      label: 'Value left',
      source: { hcs: 'src/App.tsx' },
    },
    {
      id: 'hs-number',
      name: 'Number field',
      apps: ['hs', 'pfd', 'rws'],
      label: 'Bold unit',
      source: { hs: 'src/hs/InputFields.tsx', pfd: 'src/pfd/fields.tsx', rws: 'src/rws/inputs.tsx' },
    },
    {
      id: 'fd-number',
      name: 'Number field',
      apps: ['fd', 'agpd'],
      label: 'Regular unit',
      source: { fd: 'src/components/ui.jsx', agpd: 'src/agpd/controls.tsx' },
    },
    {
      id: 'adm-number',
      name: 'Number field',
      apps: ['adm', 'adc', 'ace'],
      label: 'Label beside',
      source: { adm: 'src/features/design-inputs/components/shared/FieldNumberRow.tsx', adc: 'src/adc/components/NumberRow.tsx', ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx' },
    },
  ],
  source: { hcs: 'src/App.tsx', hs: 'src/hs/InputFields.tsx', pfd: 'src/pfd/fields.tsx', rws: 'src/rws/inputs.tsx', fd: 'src/components/ui.jsx', agpd: 'src/agpd/controls.tsx', adm: 'src/features/design-inputs/components/shared/FieldNumberRow.tsx', adc: 'src/adc/components/NumberRow.tsx', ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx' },
  summary: 'A labelled field with one outlined control that holds a number and shows its unit after the value.',
  where: 'The input panel of nine apps: every design input that takes a number with a unit (a stress, a length, an angle). PBS has a Quantity number box with no unit and shows it as a text control (Field-002).',
  when: 'Use it for a number the user types and reads in a fixed unit, where the unit must stay visible inside the control. Use the label above in a narrow stacked pane and the label beside where the rows of the pane run label then control (ADM, ADC, ACE). Use the Field.NumberField parts when the control needs number parsing, min and max or steppers; a plain Field.Control with a Field.Input only holds text.',
  how: 'Value left (HCS): a Field at scale "sm" with a 3 gap holds a Field.Label and one Field.Control (scale "sm", 28px high, 16/20 text, 3/8 padding) that is the input itself; the unit is a Symbol after the value. The value keeps the control\'s start alignment and the unit is a 16px regular mono Symbol. Bold unit (HS, PFD, RWS): the same Field with a Field.Control holding a Field.Input with textAlign "end" and the unit as a mono role "l4" text, rendered 14px weight 600 (PFD writes it as Symbol role "l4", RWS as Type l4 around a Symbol; both render the same). Regular unit (FD, AGPD): the value sits at the end in a Field.NumberField > Field.NumberFieldGroup > Field.NumberFieldInput (textAlign "end") with a Field.NumberFieldUnit holding a 16px regular mono unit (FD a Type with family "mono", AGPD a Symbol); no steppers. Label beside (ADM, ADC, ACE): the Field is a row with the label (nowrap, ellipsis, flex fill, flex-basis half) and the same outlined number control filling the other half (137px each in a 280px row), the value at the end and a 16px regular Symbol unit; ADM and ADC write a Field.NumberField, ACE a Field.Control with a Field.NumberFieldUnit and grows label and control by flex-grow (129 and 145px), a size difference only. The apps show the field enabled. The scenes leave out the help trigger and lock beside the label, the error line (Field-003), the ADC stepper button and the ADC row that wraps instead of splitting half and half.',
});
