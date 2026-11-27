import { defineUsecase } from '../../../define';

const FORM_CONTEXT = [
  { id: "feedback-dialog", name: "Feedback dialog", selector: "[class~=\"aui-dialog-popup\"]", description: "The Dialog popup titled \"Send feedback\" (or \"Feedback Form\") that hosts the checkbox." },
  { id: "feedback-title", name: "Feedback title bar", selector: "[class~=\"aui-dialog-title\"]", description: "The raised Dialog.Title with the Close button at its end." },
  { id: "feedback-close", name: "Close button", selector: "[class~=\"aui-dialog-close\"]", description: "The X Dialog.Close that dismisses the dialog." },
  { id: "feedback-body", name: "Feedback form body", selector: "[class~=\"aui-dialog-body\"]", description: "The Dialog.Body whose column holds the Email field and, as its last row, the \"Send me a copy of my responses\" checkbox (the description, dropzone and footer are left out)." },
];

const FOOTER_CONTEXT = [
  { id: "feedback-dialog", name: "Feedback dialog", selector: "[class~=\"aui-dialog-popup\"]", description: "The Dialog popup titled \"Send feedback\" (or \"Feedback Form\") that hosts the checkbox." },
  { id: "feedback-title", name: "Feedback title bar", selector: "[class~=\"aui-dialog-title\"]", description: "The raised Dialog.Title with the Close button at its end." },
  { id: "feedback-close", name: "Close button", selector: "[class~=\"aui-dialog-close\"]", description: "The X Dialog.Close that dismisses the dialog." },
  { id: "feedback-actions", name: "Footer actions", selector: "[class~=\"aui-dialog-actions\"]", description: "The split Dialog.Actions footer: the checkbox at the start, then Cancel and Send." },
  { id: "cancel", name: "Cancel", description: "The default Dialog.Button that closes the dialog without sending." },
  { id: "send", name: "Send", description: "The solid primary Dialog.Button that submits the feedback." },
];

export default defineUsecase({
  uiType: 'Single checkbox',
  title: 'Dialog option checkbox',
  apps: ['adm', 'fd', 'hs', 'pfd', 'pbs', 'agpd', 'rws', 'adc'],
options: [
    { id: "adm-form", contextAnatomy: FORM_CONTEXT, name: "Dialog option", apps: ["adm","fd"], note: "The checkbox sits in the dialog form.", source: {"adm":"src/features/top-navigation/components/FeedbackDialog.tsx","fd":"src/components/Feedback.jsx"} ,
     contextAnatomyOverrides: [{"id":"feedback-dialog","lesson":{"explanation":"Feedback dialog groups the optional response-copy choice inside the form.","scope":"context"}},{"id":"feedback-title","lesson":{"explanation":"Raised title bar places Close at the end.","scope":"context"}},{"id":"feedback-close","lesson":{"explanation":"X closes this feedback dialog without submitting its form.","scope":"context"}},{"id":"feedback-body","lesson":{"explanation":"Email and copy preference share this body; other form parts are omitted.","scope":"context"}}]},
    { id: "hs-form", contextAnatomy: FORM_CONTEXT, name: "Form checkbox", apps: ["hs","pfd","pbs","agpd","rws"], note: "The checkbox sits in the dialog form.", source: {"hs":"src/hs/ShellExtras.tsx","pfd":"src/pfd/ShellDialogs.tsx","pbs":"src/WorkspaceTools.tsx","agpd":"src/agpd/ShellDialogs.tsx","rws":"src/rws/ShellDialogs.tsx"} ,
     contextAnatomyOverrides: [{"id":"feedback-dialog","lesson":{"explanation":"Feedback dialog groups the optional response-copy choice inside the form.","scope":"context"}},{"id":"feedback-title","lesson":{"explanation":"Raised title bar places Close at the end.","scope":"context"}},{"id":"feedback-close","lesson":{"explanation":"X closes this feedback dialog without submitting its form.","scope":"context"}},{"id":"feedback-body","lesson":{"explanation":"Email and copy preference share this body; other form parts are omitted.","scope":"context"}}]},
    { id: "adc-footer", contextAnatomy: FOOTER_CONTEXT, name: "Footer checkbox", apps: ["adc"], note: "The checkbox sits in the dialog footer before the actions.", source: {"adc":"src/adc/Workspace.tsx"} ,
     contextAnatomyOverrides: [{"id":"feedback-dialog","lesson":{"explanation":"Feedback dialog groups the optional response-copy choice inside the form.","scope":"context"}},{"id":"feedback-title","lesson":{"explanation":"Raised title bar places Close at the end.","scope":"context"}},{"id":"feedback-close","lesson":{"explanation":"X closes this feedback dialog without submitting its form.","scope":"context"}},{"id":"feedback-actions","lesson":{"explanation":"Split footer places checkbox before Cancel and Send.","scope":"context"}},{"id":"cancel","lesson":{"explanation":"The default Dialog.Button that closes the dialog without sending.","selector":"[data-ug-part=\"cancel\"]","scope":"context"}},{"id":"send","lesson":{"explanation":"The solid primary Dialog.Button that submits the feedback.","selector":"[data-ug-part=\"send\"]","scope":"context"}}]},
  ],
  source: {
    adm: 'src/features/top-navigation/components/FeedbackDialog.tsx',
    fd: 'src/components/Feedback.jsx',
    hs: 'src/hs/ShellExtras.tsx',
    pfd: 'src/pfd/ShellDialogs.tsx',
    pbs: 'src/WorkspaceTools.tsx',
    agpd: 'src/agpd/ShellDialogs.tsx',
    rws: 'src/rws/ShellDialogs.tsx',
    adc: 'src/adc/Workspace.tsx',
  },
  summary: 'A Checkbox with its label that answers one optional yes or no question at the end of a dialog form: Send me a copy of my responses.',
  where: 'The feedback dialog of eight apps (HS src/hs/ShellExtras.tsx, PFD src/pfd/ShellDialogs.tsx, PBS src/WorkspaceTools.tsx, AGPD src/agpd/ShellDialogs.tsx, RWS src/rws/ShellDialogs.tsx, ADM src/features/top-navigation/components/FeedbackDialog.tsx, FD src/components/Feedback.jsx, ADC src/adc/Workspace.tsx), the Save as template dialog (HS src/hs/TemplateDialogs.tsx, ADM src/features/templates/components/SaveAsTemplateDialog.tsx) and the ADM Thickness calculator and edit modals.',
  when: 'Use it for an optional choice that is on or off, has no unit and travels with a form the user submits once. Do not use it for an exclusive choice (a RadioGroup, or a Field.Select when there are many), an on and off setting that applies at once (a Switch) or to select a row (Table-002). The Dialog footer, close and Cancel and Send buttons are Dialog-009 (Send feedback) and Button-031 and are not repeated here.',
  how: 'The Checkbox has aui scale "sm" (22px box, a 14px mark, radius 4px) and per-state appearance in states: unselected color "surface" paint "tonal" with sx borderColor "outlined" (a white box with a 1px border), selected color "primary" paint "solid" (no border). Checkbox.Icon name "check" is the mark and Checkbox.Label is the caption on its right with an 8px gap: 16px regular. The box is a bare child of the Dialog.Body form column (View, flex column, gap 16), as the last row. ADM and FD: the same row, but the mark is Checkbox.Icon layer "duotone", which draws the check in Font Awesome 7 Duotone, visibly lighter than the solid check in Font Awesome 7 Pro (ADM writes it on every Checkbox; FD only in this dialog). HS, PFD, PBS, AGPD, RWS: the solid check; PBS and RWS omit scale, which renders the same 22px box. ADC: the Checkbox leads the split Dialog.Actions footer, before Cancel and Send, with no Icon (the same solid mark); the full dialog is Dialog-009 Send feedback. The scenes leave out the Description, the file dropzone and its size error, and show the enabled state and a Send that the app keeps disabled until the form is valid.',
  anatomy: [
    {
      id: "checkbox",
      name: "Checkbox",
      selector: "[class~=\"aui-checkbox\"]",
      description: "The checkable control, at scale \"sm\", checked by default: a surface-tonal box with an outlined border when off and a solid primary box when on.",
     lesson: {"explanation":"Small checkbox starts checked, with tonal off and solid primary on."}},
    {
      id: "indicator",
      name: "Indicator",
      selector: "[class~=\"aui-checkbox-indicator\"]",
      description: "The small box that shows the checked state for the optional copy of the feedback responses.",
     lesson: {"explanation":"Box shows whether feedback responses will include a copy.","code":["Checkbox"]}},
    {
      id: "icon",
      name: "Icon",
      selector: "[class~=\"aui-checkbox-indicator\"] [class~=\"aui-contained-icon\"]",
      description: "The \"check\" mark inside the indicator; the HS, PFD, PBS, AGPD, RWS, ADM and FD feedback dialogs show it when the option is on.",
     lesson: {"explanation":"Check mark appears across seven feedback scenes when selected.","code":["Checkbox.Icon"]}},
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-control-row\"] > [class~=\"aui-label\"]",
      description: "The caption \"Send me a copy of my responses\" beside the box, answering the optional yes or no question at the end of the form.",
     lesson: {"explanation":"Caption asks whether users want a copy of their responses."}},
    {
      id: "form-field",
      name: "Form field",
      selector: "[class~=\"aui-field\"]",
      description: "The feedback-form text fields (name, email, subject) above the checkbox in the dialog scenes, each a Field with a label and an input.",
     lesson: {"explanation":"Name, email, and subject fields precede this optional feedback choice."}},
  ],
});
