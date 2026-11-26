import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single-line field',
  title: 'Number field with unit',
  apps: ['hcs', 'hs', 'pfd', 'rws', 'fd', 'agpd', 'adm', 'adc', 'ace'],
    layers: [
        {"id":"field","partId":"field","title":"Field","explanation":"Small stacked number field; some apps put its 137px label beside it.","keyIdea":"The Field wrapper keeps the pressure label and its numeric control aligned as one measurement.","selector":"[class~=\"aui-field\"]"},
        {"id":"label","partId":"label","title":"Label","explanation":"Fc perp label sits above; inline variants truncate within half the row.","keyIdea":"The label identifies the measurement before the number or unit is read.","selector":"[class~=\"aui-field-label\"]"},
        {"id":"control","partId":"control","title":"Control","explanation":"Outlined 28px row keeps the value beside its unit.","keyIdea":"One outlined row makes the value and its unit feel like a single control.","selector":"[class~=\"aui-field-control\"]","code":["View"]},
        {"id":"input","partId":"input","title":"Input","explanation":"End-aligned 650 accepts decimal entry beside the unit.","keyIdea":"Right alignment keeps decimal digits visually comparable as pressure values change.","selector":"[class~=\"aui-field-control\"] > [class~=\"aui-input\"]","unchanged":true},
        {"id":"number-field","partId":"number-field","title":"Number field","explanation":"FD, AGPD, ADM, ADC use a stepper-free parsed number group.","keyIdea":"The number-field group parses the value without exposing stepper controls that are absent from the design.","selector":"[class~=\"aui-number-field\"]","code":["View"]},
        {"id":"unit","partId":"unit","title":"Unit","explanation":"Mono psi label follows the number; weight and size vary by app.","keyIdea":"The psi suffix tells users which pressure scale the number uses.","selector":"[class~=\"aui-field-control\"] > [data-aui-typeface], [class~=\"aui-number-field-unit\"]"},
      ],
options: [
    { id: "hcs-number", name: "Number field", apps: ["hcs"], note: "Label above; the value starts at the control start and the unit follows it.", source: {"hcs":"src/App.tsx"}, showContext: false ,
      contextLayers: [

      ],
    },
    { id: "hs-number", name: "Bold unit field", apps: ["hs","pfd","rws"], note: "Label above; the value is end-aligned with a bold unit.", source: {"hs":"src/hs/InputFields.tsx","pfd":"src/pfd/fields.tsx","rws":"src/rws/inputs.tsx"}, showContext: false ,
      contextLayers: [

      ],
    },
    { id: "fd-number", name: "Plain unit field", apps: ["fd","agpd"], note: "Label above; the value is end-aligned with a regular unit.", source: {"fd":"src/components/ui.jsx","agpd":"src/agpd/controls.tsx"}, showContext: false ,
      contextLayers: [

      ],
    },
    { id: "adm-number", name: "Side label field", apps: ["adm","adc","ace"], note: "Label beside: label and control share the row, half each.", source: {"adm":"src/features/design-inputs/components/shared/FieldNumberRow.tsx","adc":"src/adc/components/NumberRow.tsx","ace":"src/features/estimator/ui/EstimatorInputPanel.tsx"}, showContext: false ,
      contextLayers: [

      ],
    },
  ],
  source: { hcs: 'src/App.tsx', hs: 'src/hs/InputFields.tsx', pfd: 'src/pfd/fields.tsx', rws: 'src/rws/inputs.tsx', fd: 'src/components/ui.jsx', agpd: 'src/agpd/controls.tsx', adm: 'src/features/design-inputs/components/shared/FieldNumberRow.tsx', adc: 'src/adc/components/NumberRow.tsx', ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx' },
  summary: 'A labelled field with one outlined control that holds a number and shows its unit after the value.',
  where: 'The input panel of nine apps: every design input that takes a number with a unit (a stress, a length, an angle). PBS has a Quantity number box with no unit and shows it as a text control (Field-002).',
  when: 'Use it for a number the user types and reads in a fixed unit, where the unit must stay visible inside the control. Use the label above in a narrow stacked pane and the label beside where the rows of the pane run label then control (ADM, ADC, ACE). Use the Field.NumberField parts when the control needs number parsing, min and max or steppers; a plain Field.Control with a Field.Input only holds text.',
  how: 'Value left (HCS): a Field at scale "sm" with a 3 gap holds a Field.Label and one Field.Control (scale "sm", 28px high, 16/20 text, 3/8 padding) that is the input itself; the unit is a Symbol after the value. The value keeps the control\'s start alignment and the unit is a 16px regular mono Symbol. Bold unit (HS, PFD, RWS): the same Field with a Field.Control holding a Field.Input with textAlign "end" and the unit as a mono role "l4" text, rendered 14px weight 600 (PFD writes it as Symbol role "l4", RWS as Type l4 around a Symbol; both render the same). Regular unit (FD, AGPD): the value sits at the end in a Field.NumberField > Field.NumberFieldGroup > Field.NumberFieldInput (textAlign "end") with a Field.NumberFieldUnit holding a 16px regular mono unit (FD a Type with family "mono", AGPD a Symbol); no steppers. Label beside (ADM, ADC, ACE): the Field is a row with the label (nowrap, ellipsis, flex fill, flex-basis half) and the same outlined number control filling the other half (137px each in a 280px row), the value at the end and a 16px regular Symbol unit; ADM and ADC write a Field.NumberField, ACE a Field.Control with a Field.NumberFieldUnit and grows label and control by flex-grow (129 and 145px), a size difference only. The apps show the field enabled. The scenes leave out the help trigger and lock beside the label, the error line (Field-003), the ADC stepper button and the ADC row that wraps instead of splitting half and half.',
  anatomy: [
    {
      id: "field",
      name: "Field",
      selector: "[class~=\"aui-field\"]",
      description: "Stacked number field at scale \"sm\" with a 3 gap; in the label-beside apps (ADM, ADC, ACE) it becomes a row that splits 137px for the label and 137px for the control.",
    },
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-field-label\"]",
      description: "The \"Fc perp\" label above the control; the label-beside apps set it nowrap with an ellipsis and flex-basis half.",
    },
    {
      id: "control",
      name: "Control",
      selector: "[class~=\"aui-field-control\"]",
      description: "The 28px outlined control row with 3/8 padding that holds the value and the unit side by side.",
    },
    {
      id: "input",
      name: "Input",
      selector: "[class~=\"aui-field-control\"] > [class~=\"aui-input\"]",
      description: "The input showing 650, with inputMode \"decimal\" and the value aligned to the end so it sits next to the unit.",
    },
    {
      id: "number-field",
      name: "Number field",
      selector: "[class~=\"aui-number-field\"]",
      description: "FD, AGPD, ADM and ADC wrap the value in a Field.NumberField group instead of a plain input, with no steppers, so the number is parsed and aligned at the end.",
    },
    {
      id: "unit",
      name: "Unit",
      selector: "[class~=\"aui-field-control\"] > [data-aui-typeface], [class~=\"aui-number-field-unit\"]",
      description: "The \"psi\" unit after the value, a mono role \"l4\" Type here; HS, PFD and RWS render it 14px semi-bold, FD and AGPD as a 16px regular mono unit.",
    },
  ],
});
