import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field select',
  title: 'Single select',
  apps: ['hcs', 'hs', 'pbs', 'pfd', 'fd', 'rws', 'agpd', 'adm', 'adc', 'ace'],
    layers: [
        {"id":"field","partId":"field","title":"Field","explanation":"Small field stacks label above list; several app scenes place label beside.","keyIdea":"The wrapper keeps Download Duration and its country-dependent choice in one labeled field.","selector":"[class~=\"aui-field\"]"},
        {"id":"label","partId":"label","title":"Label","explanation":"Download Duration label truncates inline when paired beside the trigger.","keyIdea":"The label identifies what the numeric choices represent before the select is opened.","selector":"[class~=\"aui-field-label\"]"},
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"Outlined 28px trigger opens Dead, Snow, and Roof durations.","keyIdea":"The outlined trigger holds the current duration while opening its available values.","selector":"[class~=\"aui-select-trigger\"]"},
        {"id":"chevron","partId":"chevron","title":"Chevron","explanation":"Trailing chevron marks the trigger as a list opener.","keyIdea":"A trailing chevron indicates that duration choices are hidden in a list.","selector":"[class~=\"aui-select-chevron\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"Popup matches trigger width and lists three duration counts.","keyIdea":"The anchored menu reveals candidate durations without displacing the field.","selector":"[class~=\"aui-select-popup\"]"},
        {"id":"list","partId":"list","title":"List","explanation":"The scrolling list inside the popup that holds the three duration rows.","keyIdea":"A scrollable list keeps all duration values reachable inside the compact popup.","selector":"[class~=\"aui-select-list\"]"},
        {"id":"item","partId":"item","title":"Item","explanation":"Duration row marks its chosen value with a raised fill.","keyIdea":"Each row represents one selectable duration rather than a free-form number.","selector":"[class~=\"aui-select-item\"]"},
        {"id":"item-text","partId":"item-text","title":"Item text","explanation":"The row label, for example \"Dead (90)\" or \"Roof (125)\".","keyIdea":"The row text pairs the duration name with its numeric value for comparison.","selector":"[class~=\"aui-select-item-text\"]"},
        {"id":"indicator","partId":"indicator","title":"Indicator","explanation":"Empty end slot holds checks only in AGPD and ACE.","keyIdea":"The reserved slot lets a chosen row be marked without shifting its label.","selector":"[class~=\"aui-select-item-indicator\"]"},
        {"id":"check","partId":"check","title":"Check icon","explanation":"AGPD and ACE show a 16px check on the chosen row.","keyIdea":"A check confirms the selected duration in scenes that use an explicit glyph.","selector":"[class~=\"aui-select-item-indicator\"] [class~=\"aui-contained-icon\"]"},
      ],
options: [
    { id: "hcs-field-select", showContext: false, name: "Field select", apps: ["hcs","hs","pbs","pfd","fd","rws"], note: "Label above.", source: {"hcs":"src/components/HcsSelectbox.tsx","hs":"src/hs/InputFields.tsx","pbs":"src/InputFields.tsx","pfd":"src/pfd/fields.tsx","fd":"src/components/ui.jsx","rws":"src/rws/inputs.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "agpd-field-select", showContext: false, name: "Stacked check select", apps: ["agpd"], note: "Label above; the chosen row ends with a check icon.", source: {"agpd":"src/agpd/controls.tsx"},
      componentDocument: { summary: 'A single-value select whose selected duration is confirmed with a check icon.', how: 'AGPD keeps the label above the field. Its open list adds a check to the selected row; the other field dimensions and choices match the plain row style.' },
      componentAnatomy: [
        { id: 'field', description: 'The scale "sm" field stacks the Download Duration label above the select.' },
        { id: 'indicator', description: 'The row-end indicator contains a check on the selected duration.' },
        { id: 'check', description: 'A small check icon confirms the selected duration in the open list.' },
      ],
      contextLayers: [

      ],
    },
    { id: "adm-field-select", showContext: false, name: "Side label select", apps: ["adm","adc"], note: "Label beside: label and trigger share the row, half each.", source: {"adm":"src/features/design-inputs/components/MasonryWallDetailsSection/FieldSelectRow.tsx","adc":"src/adc/components/DesignField.tsx"},
      componentDocument: { summary: 'A single-value select with its label and trigger sharing one row.', how: 'ADM and ADC place the Download Duration label beside the trigger. Both occupy half of the row; the open list keeps the same plain selection rows.' },
      componentAnatomy: [
        { id: 'field', description: 'The field lays out the Download Duration label and select trigger in one horizontal row.' },
        { id: 'label', description: 'A nowrap Download Duration label takes the leading half of the row and truncates when needed.' },
        { id: 'trigger', description: 'The outlined trigger takes the trailing half of the row and shows the current duration.' },
      ],
      contextLayers: [

      ],
    },
    { id: "ace-field-select", showContext: false, name: "Side label check select", apps: ["ace"], note: "Label beside; the chosen row ends with a check icon.", source: {"ace":"src/features/estimator/ui/EstimatorInputPanel.tsx"},
      componentDocument: { summary: 'A single-value select with a side-by-side label and a check-marked selected duration.', how: 'ACE lays the label and trigger in one row. The open choices end with a check icon on the selected duration.' },
      componentAnatomy: [
        { id: 'field', description: 'The field places its label and trigger in a single horizontal row.' },
        { id: 'label', description: 'A nowrap Download Duration label shares the row with the trigger and truncates as needed.' },
        { id: 'indicator', description: 'The row-end indicator contains a check on the selected duration.' },
        { id: 'check', description: 'A small check icon confirms the selected duration in the open list.' },
      ],
      contextLayers: [

      ],
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
      selector: '[class~="aui-field"]',
      description: 'Field at scale "sm" with a 3 gap that stacks the label above the select; the ADM, ADC and ACE scenes lay it out as a row with the label beside the trigger.',
    },
    {
      id: 'label',
      name: 'Label',
      selector: '[class~="aui-field-label"]',
      description: 'The "Download Duration" label at scale "sm". In the label-beside scenes it is nowrap with an ellipsis and shares the row with the trigger.',
    },
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-select-trigger"]',
      description: 'Outlined trigger (color "surface", paint "fixed") filling the field width, 28px high with 16/20 text; it opens the Dead, Snow and Roof choices.',
    },
    {
      id: 'value',
      name: 'Value',
      selector: '[class~="aui-select-value"]',
      text: true,
      description: 'Shows the chosen "Snow (115)" in the trigger; Field.SelectValue reads it from the items list.',
    },
    {
      id: 'chevron',
      name: 'Chevron',
      selector: '[class~="aui-select-chevron"]',
      description: 'The chevron at the end of the trigger that marks it as a list opener.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-select-popup"]',
      description: 'Popup that matches the trigger width and sits 4px below it, listing Dead (90), Snow (115) and Roof (125).',
    },
    {
      id: 'list',
      name: 'List',
      selector: '[class~="aui-select-list"]',
      description: 'The scrolling list inside the popup that holds the three duration rows.',
    },
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-select-item"]',
      description: 'One duration row; the chosen one is marked by a raised fill rather than a glyph.',
    },
    {
      id: 'item-text',
      name: 'Item text',
      selector: '[class~="aui-select-item-text"]',
      description: 'The row label, for example "Dead (90)" or "Roof (125)".',
    },
    {
      id: 'indicator',
      name: 'Indicator',
      selector: '[class~="aui-select-item-indicator"]',
      description: 'The empty indicator slot at the end of a row; the AGPD and ACE scenes draw a check icon in it for the chosen row.',
    },
    {
      id: 'check',
      name: 'Check icon',
      selector: '[class~="aui-select-item-indicator"] [class~="aui-contained-icon"]',
      description: 'The 16px check on the chosen row in the AGPD and ACE scenes; the base example leaves the indicator empty.',
    },
  ],
});
