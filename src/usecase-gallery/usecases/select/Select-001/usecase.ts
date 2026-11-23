import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field select',
  title: 'Single select',
  apps: ['hcs', 'hs', 'pbs', 'pfd', 'fd', 'rws', 'agpd', 'adm', 'adc', 'ace'],
  cases: [
    {
      id: 'hcs-field-select',
      name: 'Field select',
      apps: ['hcs', 'hs', 'pbs', 'pfd', 'fd', 'rws'],
      note: 'Label above.',
      source: {
        hcs: 'src/components/HcsSelectbox.tsx',
        hs: 'src/hs/InputFields.tsx',
        pbs: 'src/InputFields.tsx',
        pfd: 'src/pfd/fields.tsx',
        fd: 'src/components/ui.jsx',
        rws: 'src/rws/inputs.tsx',
      },
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
  source: {
    hcs: 'src/components/HcsSelectbox.tsx',
    hs: 'src/hs/InputFields.tsx',
    pbs: 'src/InputFields.tsx',
    pfd: 'src/pfd/fields.tsx',
    fd: 'src/components/ui.jsx',
    rws: 'src/rws/inputs.tsx',
    agpd: 'src/agpd/controls.tsx',
    adm: 'src/features/design-inputs/components/MasonryWallDetailsSection/FieldSelectRow.tsx',
    adc: 'src/adc/components/DesignField.tsx',
    ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx',
  },
  summary: 'A labelled field whose outlined trigger shows the chosen value and a chevron and opens a list of single-choice rows.',
  where: 'The input panel of all ten apps: every design input that picks one value from a fixed list (a duration, a standard, a material, a unit). HCS writes it as the HcsSelectbox of its Input pane.',
  when: 'Use it for one value out of a list too long for radios, where the current value must stay visible in the field. Use the label above in a narrow stacked pane and the label beside where the rows of the pane run label then control (ADM, ADC, ACE). The kit Field.Select keeps the label, the trigger and the popup in one control. A select that filters a table column is Select-002.',
  how: 'Label above (HCS, HS, PBS, PFD, FD, RWS): a Field at scale "sm" with a 3 gap holds a Field.Label and a Field.Select. The Field.SelectTrigger is color "surface", paint "fixed", width "fill", 28px high with 16/20 text (HCS, HS, PBS, PFD and FD state the height and the type; RWS leaves them to the scale and measures the same 28px, with 3px block padding instead of 2px). It holds Field.SelectValue and Field.SelectChevron. Field.SelectPortal > Field.SelectPositioner (side "bottom", sideOffset 4) > Field.SelectPopup with matchTriggerWidth > Field.SelectList holds the rows, each a Field.SelectItem with Field.SelectItemText and an empty Field.SelectItemIndicator (the chosen row shows by its raised fill). Label above, check (AGPD): the same field, but the chosen row ends with a check icon in its indicator (a 16px icon the first group does not draw). Label beside (ADM, ADC): the Field is a row with the label (nowrap, ellipsis, flex fill, flex-basis half) and the same trigger filling the other half (137px each in a 280px row), rows as in the first group. Label beside, check (ACE): the same row, with the check icon on the chosen row; ACE grows the label and trigger by flex-grow (129 and 145px in the same row), a size difference only. The apps disable the field when it has one option or none; the scenes show it enabled and leave out the help trigger, lock, unit symbol, error line, option notes, plate images and thumbnails.',
  anatomy: [
    {
      id: 'field',
      name: 'Field',
      token: 'Field',
      selector: '[class~="aui-field"]',
      description: 'Field at scale "sm" with a 3 gap that stacks the label above the select; the ADM, ADC and ACE scenes lay it out as a row with the label beside the trigger.',
      code: `<Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
  {/* … */}
</Field>`,
    },
    {
      id: 'label',
      name: 'Label',
      token: 'Field.Label',
      selector: '[class~="aui-field-label"]',
      description: 'The "Download Duration" label at scale "sm". In the label-beside scenes it is nowrap with an ellipsis and shares the row with the trigger.',
      code: `<Field.Label aui={{ scale: 'sm' }}>Download Duration</Field.Label>`,
    },
    {
      id: 'trigger',
      name: 'Trigger',
      token: 'Field.SelectTrigger',
      selector: '[class~="aui-select-trigger"]',
      description: 'Outlined trigger (color "surface", paint "fixed") filling the field width, 28px high with 16/20 text; it opens the Dead, Snow and Roof choices.',
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
      description: 'Shows the chosen "Snow (115)" in the trigger; Field.SelectValue reads it from the items list.',
      code: `<Field.SelectValue />`,
    },
    {
      id: 'chevron',
      name: 'Chevron',
      token: 'Field.SelectChevron',
      selector: '[class~="aui-select-chevron"]',
      description: 'The chevron at the end of the trigger that marks it as a list opener.',
      code: `<Field.SelectChevron />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Field.SelectPopup',
      selector: '[class~="aui-select-popup"]',
      description: 'Popup that matches the trigger width and sits 4px below it, listing Dead (90), Snow (115) and Roof (125).',
      code: `<Field.SelectPopup matchTriggerWidth>
  {/* … */}
</Field.SelectPopup>`,
    },
    {
      id: 'list',
      name: 'List',
      token: 'Field.SelectList',
      selector: '[class~="aui-select-list"]',
      description: 'The scrolling list inside the popup that holds the three duration rows.',
      code: `<Field.SelectList>
  {/* … */}
</Field.SelectList>`,
    },
    {
      id: 'item',
      name: 'Item',
      token: 'Field.SelectItem',
      selector: '[class~="aui-select-item"]',
      description: 'One duration row; the chosen one is marked by a raised fill rather than a glyph.',
      code: `<Field.SelectItem value="dead">
  <Field.SelectItemText>Dead (90)</Field.SelectItemText>
  <Field.SelectItemIndicator />
</Field.SelectItem>`,
    },
    {
      id: 'item-text',
      name: 'Item text',
      token: 'Field.SelectItemText',
      selector: '[class~="aui-select-item-text"]',
      description: 'The row label, for example "Dead (90)" or "Roof (125)".',
      code: `<Field.SelectItemText>Dead (90)</Field.SelectItemText>`,
    },
    {
      id: 'indicator',
      name: 'Indicator',
      token: 'Field.SelectItemIndicator',
      selector: '[class~="aui-select-item-indicator"]',
      description: 'The empty indicator slot at the end of a row; the AGPD and ACE scenes draw a check icon in it for the chosen row.',
      code: `<Field.SelectItemIndicator />`,
    },
    {
      id: 'check',
      name: 'Check icon',
      token: 'Field.SelectIcon',
      selector: '[class~="aui-select-item-indicator"] [class~="aui-contained-icon"]',
      description: 'The 16px check on the chosen row in the AGPD and ACE scenes; the base example leaves the indicator empty.',
      code: `<Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} />`,
    },
  ],
});
