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
    {
      id: 'hcs-column-filter',
      name: 'Column filter',
      apps: ['hcs', 'hs'],
      note: 'The list opens below the trigger.',
      source: { hcs: 'src/components/ColumnMenu.tsx', hs: 'src/hs/ColumnMenu.tsx' },
    },
    {
      id: 'pfd-column-filter',
      name: 'Column filter',
      apps: ['pfd'],
      note: 'The list opens above the trigger.',
      source: { pfd: 'src/pfd/ColumnMenu.tsx' },
    },
  ],
  source: { hcs: 'src/components/HcsSelectbox.tsx', hs: 'src/hs/InputFields.tsx', pbs: 'src/InputFields.tsx', pfd: 'src/pfd/fields.tsx', fd: 'src/components/ui.jsx', rws: 'src/rws/inputs.tsx', agpd: 'src/agpd/controls.tsx', adm: 'src/features/design-inputs/components/MasonryWallDetailsSection/FieldSelectRow.tsx', ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx', adc: 'src/adc/components/DesignField.tsx' },
  summary: 'A labelled field whose outlined trigger shows the chosen value and a chevron and opens a list of single-choice rows.',
  where: 'The input panel of all ten apps: every design input that picks one value from a fixed list (a duration, a standard, a material, a unit). HCS writes it as the HcsSelectbox of its Input pane. Also the Search by option field of the column menu popover of the Output table in HCS, HS and PFD, under the Search by text field.',
  when: 'Use it for one value out of a list too long for radios, where the current value must stay visible in the field. Use the label above in a narrow stacked pane and the label beside where the rows of the pane run label then control (ADM, ADC, ACE). The kit Field.Select keeps the label, the trigger and the popup in one control. Use it in a table column menu to filter a column to one of its known values; use the text search field above it for free text.',
  how: 'Label above (HCS, HS, PBS, PFD, FD, RWS): a Field at scale "sm" with a 3 gap holds a Field.Label and a Field.Select. The Field.SelectTrigger is color "surface", paint "fixed", width "fill", 28px high with 16/20 text (HCS, HS, PBS, PFD and FD state the height and the type; RWS leaves them to the scale and measures the same 28px, with 3px block padding instead of 2px). It holds Field.SelectValue and Field.SelectChevron. Field.SelectPortal > Field.SelectPositioner (side "bottom", sideOffset 4) > Field.SelectPopup with matchTriggerWidth > Field.SelectList holds the rows, each a Field.SelectItem with Field.SelectItemText and an empty Field.SelectItemIndicator (the chosen row shows by its raised fill). Label above, check (AGPD): the same field, but the chosen row ends with a check icon in its indicator (a 16px icon the first group does not draw). Label beside (ADM, ADC): the Field is a row with the label (nowrap, ellipsis, flex fill, flex-basis half) and the same trigger filling the other half (137px each in a 280px row), rows as in the first group. Label beside, check (ACE): the same row, with the check icon on the chosen row; ACE grows the label and trigger by flex-grow (129 and 145px in the same row), a size difference only. The apps disable the field when it has one option or none; the scenes show it enabled and leave out the help trigger, lock, unit symbol, error line, option notes, plate images and thumbnails. Column filter (HCS, HS): a Field at scale "sm" (gap 4, minWidth 0) with the label "Search by option" and a Field.Select whose trigger is color "surface", paint "fixed", shape "soft" and width fill, the same trigger as above; the Field.SelectPositioner is side "bottom", align "start", sideOffset 4 with alignItemWithTrigger off, so the list sits under the trigger, and the rows are bare Field.SelectItems (Select all first) with no indicator. Column filter (PFD): the same field with side "top", so the list opens above the trigger (measured 36px below the trigger against 92px above). Those scenes show the enabled state (HCS disables the field with fewer than two options, HS with none) and leave out the column menu Popover, the sort buttons and the text search field.',
});
