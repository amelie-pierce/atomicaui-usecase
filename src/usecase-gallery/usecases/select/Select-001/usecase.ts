import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field select',
  title: 'Single select',
  apps: ['hcs', 'hs', 'pbs', 'pfd', 'fd', 'rws', 'agpd', 'adm', 'ace', 'adc'],
  cases: [
    {
      id: 'hcs-field-select',
      name: 'Field select',
      apps: ['hcs', 'hs', 'pbs', 'pfd', 'fd', 'rws'],
      note: 'Label above.',
      source: { hcs: 'src/components/HcsSelectbox.tsx', hs: 'src/hs/InputFields.tsx', pbs: 'src/InputFields.tsx', pfd: 'src/pfd/fields.tsx', fd: 'src/components/ui.jsx', rws: 'src/rws/inputs.tsx' },
    },
    {
      id: 'agpd-field-select',
      name: 'Field select',
      apps: ['agpd'],
      note: 'Label above; the chosen row ends with a check icon.',
      source: { agpd: 'src/agpd/controls.tsx' },
    },
    {
      id: 'adm-field-select',
      name: 'Field select',
      apps: ['adm', 'adc'],
      note: 'Label beside: label and trigger share the row, half each.',
      source: { adm: 'src/features/design-inputs/components/MasonryWallDetailsSection/FieldSelectRow.tsx', adc: 'src/adc/components/DesignField.tsx' },
    },
    {
      id: 'ace-field-select',
      name: 'Field select',
      apps: ['ace'],
      note: 'Label beside; the chosen row ends with a check icon.',
      source: { ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx' },
    },
  ],
  source: { hcs: 'src/components/HcsSelectbox.tsx', hs: 'src/hs/InputFields.tsx', pbs: 'src/InputFields.tsx', pfd: 'src/pfd/fields.tsx', fd: 'src/components/ui.jsx', rws: 'src/rws/inputs.tsx', agpd: 'src/agpd/controls.tsx', adm: 'src/features/design-inputs/components/MasonryWallDetailsSection/FieldSelectRow.tsx', ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx', adc: 'src/adc/components/DesignField.tsx' },
  summary: 'A labelled field whose outlined trigger shows the chosen value and a chevron and opens a list of single-choice rows.',
  where: 'The input panel of all ten apps: every design input that picks one value from a fixed list (a duration, a standard, a material, a unit). HCS writes it as the HcsSelectbox of its Input pane.',
  when: 'Use it for one value out of a list too long for radios, where the current value must stay visible in the field. Use the label above in a narrow stacked pane and the label beside where the rows of the pane run label then control (ADM, ADC, ACE). The kit Field.Select keeps the label, the trigger and the popup in one control.',
  how: 'Label above (HCS, HS, PBS, PFD, FD, RWS): a Field at scale "sm" with a 3 gap holds a Field.Label and a Field.Select. The Field.SelectTrigger is color "surface", paint "fixed", width "fill", 28px high with 16/20 text (HCS, HS, PBS, PFD and FD state the height and the type; RWS leaves them to the scale and measures the same 28px, with 3px block padding instead of 2px). It holds Field.SelectValue and Field.SelectChevron. Field.SelectPortal > Field.SelectPositioner (side "bottom", sideOffset 4) > Field.SelectPopup with matchTriggerWidth > Field.SelectList holds the rows, each a Field.SelectItem with Field.SelectItemText and an empty Field.SelectItemIndicator (the chosen row shows by its raised fill). Label above, check (AGPD): the same field, but the chosen row ends with a check icon in its indicator (a 16px icon the first group does not draw). Label beside (ADM, ADC): the Field is a row with the label (nowrap, ellipsis, flex fill, flex-basis half) and the same trigger filling the other half (137px each in a 280px row), rows as in the first group. Label beside, check (ACE): the same row, with the check icon on the chosen row; ACE grows the label and trigger by flex-grow (129 and 145px in the same row), a size difference only. The apps disable the field when it has one option or none; the scenes show it enabled and leave out the help trigger, lock, unit symbol, error line, option notes, plate images and thumbnails.',
});
