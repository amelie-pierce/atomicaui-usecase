import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single-line field',
  title: 'Field with error',
  apps: ['hcs', 'hs', 'pbs', 'pfd', 'fd', 'rws', 'agpd', 'adm', 'ace', 'adc'],
    layers: [
        {"id":"field","partId":"field","title":"Field","explanation":"The field is marked invalid, which switches the label, control and message to the error state while the gap stays at 3.","keyIdea":"The field is marked invalid, which switches the label, control and message to the error state while the gap stays at 3.","selector":"[class~=\"aui-field\"]"},
        {"id":"label","partId":"label","title":"Label","explanation":"The \"Quantity\" label that stays above the failed control; ADC puts it beside the control.","keyIdea":"The \"Quantity\" label that stays above the failed control; ADC puts it beside the control.","selector":"[class~=\"aui-field-label\"]"},
        {"id":"control","partId":"control","title":"Control","explanation":"The outlined 28px control of the failed field; RWS and ADC redraw its outline in the error colour.","keyIdea":"The outlined 28px control of the failed field; RWS and ADC redraw its outline in the error colour.","selector":"[class~=\"aui-field-control\"]"},
        {"id":"input","partId":"input","title":"Input","explanation":"The input holding the rejected value 0, flagged with aria-invalid so assistive technology reads it as an error.","keyIdea":"The input holding the rejected value 0, flagged with aria-invalid so assistive technology reads it as an error.","selector":"[class~=\"aui-field-control\"] > [class~=\"aui-input\"]"},
        {"id":"error","partId":"error","title":"Error","explanation":"The message \"Enter a whole number from 1 to 999.\" in the error colour, 16/20 text 3px under the control (14px in HCS, on its own line in ADC).","keyIdea":"The message \"Enter a whole number from 1 to 999.\" in the error colour, 16/20 text 3px under the control (14px in HCS, on its own line in ADC).","selector":"[class~=\"aui-field-error\"]"},
      ],
options: [
    { id: "hs-error", name: "Field error", apps: ["hs","pbs","pfd","fd","agpd","adm","ace"], note: "The error text sits under the control in the error colour (16px).", source: {"hs":"src/hs/InputFields.tsx","pbs":"src/InputFields.tsx","pfd":"src/pfd/fields.tsx","fd":"src/components/ui.jsx","agpd":"src/agpd/controls.tsx","adm":"src/features/design-inputs/components/shared/FieldNumberRow.tsx","ace":"src/features/estimator/ui/EstimatorInputPanel.tsx"}, showContext: false ,
      contextLayers: [

      ],
    },
    { id: "hcs-error", name: "Field error — UI variant 2", apps: ["hcs"], note: "The error text is 14px.", source: {"hcs":"src/App.tsx"}, showContext: false ,
      contextLayers: [

      ],
    },
    { id: "rws-error", name: "Field error — UI variant 3", apps: ["rws"], note: "The control outline is red as well as the text.", source: {"rws":"src/rws/inputs.tsx"}, showContext: false ,
      contextLayers: [

      ],
    },
    { id: "adc-error", name: "Field error — UI variant 4", apps: ["adc"], note: "Label beside, with a red control outline and the error on its own line.", source: {"adc":"src/adc/Workspace.tsx"}, showContext: false ,
      contextLayers: [

      ],
    },
  ],
  source: { hcs: 'src/App.tsx', hs: 'src/hs/InputFields.tsx', pbs: 'src/InputFields.tsx', pfd: 'src/pfd/fields.tsx', fd: 'src/components/ui.jsx', rws: 'src/rws/inputs.tsx', agpd: 'src/agpd/controls.tsx', adm: 'src/features/design-inputs/components/shared/FieldNumberRow.tsx', ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx', adc: 'src/adc/Workspace.tsx' },
  summary: 'The message under a field whose value failed validation, in the error colour.',
  where: 'The input panel and the dialog forms of all ten apps: a number out of range, a required name, a duplicate template name, an invalid email.',
  when: 'Use it under the control of the field that failed, one message per field, so the user reads which value to fix beside the value itself. Set the Field to invalid and give the Field.Error `match`; give the message the error colour, because Field.Error has no colour of its own. Add the red outline only where the app does (RWS, ADC).',
  how: 'Error text (HS, PBS, PFD, FD, AGPD, ADM, ACE): the Field has `invalid` and a Field.Error with `match`, color "error" and scale "sm" sits under the Field.Control; the control keeps its slate outline and the message is 16px/20px text in the error colour (rgb 231, 80, 76), 3px below the control. 14px text (HCS): the same Field, but the message is set by the app\'s CSS class (error colour, 14px type, 20px line), written as aui props in the scene. Red outline (RWS): as the first group, plus the control outline in the error colour (borderColor "error" on the Field.Control). Label beside, red outline (ADC): the Field is the row of Field-002 with a Field.Control in color "error" and a Field.Error on its own line (flex-basis full) with the text at the end. The apps show the field enabled. The scenes leave out the unit, the help trigger, the required asterisk and the other fields of the form.',
  anatomy: [
    {
      id: "field",
      name: "Field",
      selector: "[class~=\"aui-field\"]",
      description: "The field is marked invalid, which switches the label, control and message to the error state while the gap stays at 3.",
    },
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-field-label\"]",
      description: "The \"Quantity\" label that stays above the failed control; ADC puts it beside the control.",
    },
    {
      id: "control",
      name: "Control",
      selector: "[class~=\"aui-field-control\"]",
      description: "The outlined 28px control of the failed field; RWS and ADC redraw its outline in the error colour.",
    },
    {
      id: "input",
      name: "Input",
      selector: "[class~=\"aui-field-control\"] > [class~=\"aui-input\"]",
      description: "The input holding the rejected value 0, flagged with aria-invalid so assistive technology reads it as an error.",
    },
    {
      id: "error",
      name: "Error",
      selector: "[class~=\"aui-field-error\"]",
      description: "The message \"Enter a whole number from 1 to 999.\" in the error colour, 16/20 text 3px under the control (14px in HCS, on its own line in ADC).",
    },
  ],
});
