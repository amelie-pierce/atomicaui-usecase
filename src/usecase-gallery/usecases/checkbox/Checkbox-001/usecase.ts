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
    layers: [
        {"id":"checkbox","partId":"checkbox","title":"Checkbox","explanation":"Small checkbox starts checked, with tonal off and solid primary on.","keyIdea":"An explicit checked control records the optional permission separately from completing the feedback form.","selector":"[class~=\"aui-checkbox\"]"},
        {"id":"indicator","partId":"indicator","title":"Indicator","explanation":"Box shows whether feedback responses will include a copy.","keyIdea":"The compact state box makes a yes-or-no value easy to scan beside its prompt.","selector":"[class~=\"aui-checkbox-indicator\"]","code":["Checkbox"]},
        {"id":"icon","partId":"icon","title":"Icon","explanation":"Check mark appears across seven feedback scenes when selected.","keyIdea":"A visible tick confirms the selected copy preference even when the row is read quickly.","selector":"[class~=\"aui-checkbox-indicator\"] [class~=\"aui-contained-icon\"]","code":["Checkbox.Icon"]},
        {"id":"label","partId":"label","title":"Label","explanation":"Caption asks whether users want a copy of their responses.","keyIdea":"The caption explains what copying means before the user makes the optional choice.","selector":"[class~=\"aui-control-row\"] > [class~=\"aui-label\"]"},
        {"id":"form-field","partId":"form-field","title":"Form field","explanation":"Name, email, and subject fields precede this optional feedback choice.","keyIdea":"Collect the feedback details first so the copy preference stays attached to the same request.","selector":"[class~=\"aui-field\"]"},
      ],
options: [
    { id: "adm-form", contextAnatomy: FORM_CONTEXT, name: "Dialog option", apps: ["adm","fd"], note: "The checkbox sits in the dialog form.", source: {"adm":"src/features/top-navigation/components/FeedbackDialog.tsx","fd":"src/components/Feedback.jsx"} ,
      contextLayers: [
        {"id":"context-feedback-dialog","partId":"feedback-dialog","title":"Feedback dialog","explanation":"Feedback dialog groups the optional response-copy choice inside the form.","keyIdea":"ADM uses one dialog frame to group the feedback fields and response-copy preference.","selector":"[class~=\"aui-dialog-popup\"]","scope":"context"},
        {"id":"context-feedback-title","partId":"feedback-title","title":"Feedback title bar","explanation":"Raised title bar places Close at the end.","keyIdea":"The Send feedback heading names the task instead of leaving users to infer why the form opened.","selector":"[class~=\"aui-dialog-title\"]","scope":"context"},
        {"id":"context-feedback-close","partId":"feedback-close","title":"Close button","explanation":"X closes this feedback dialog without submitting its form.","keyIdea":"Closing this dialog abandons the request without submitting the typed feedback.","selector":"[class~=\"aui-dialog-close\"]","scope":"context"},
        {"id":"context-feedback-body","partId":"feedback-body","title":"Feedback form body","explanation":"Email and copy preference share this body; other form parts are omitted.","keyIdea":"The body keeps the email field and final optional preference inside the same form region.","selector":"[class~=\"aui-dialog-body\"]","scope":"context"},
      ],
    },
    { id: "hs-form", contextAnatomy: FORM_CONTEXT, name: "Form checkbox", apps: ["hs","pfd","pbs","agpd","rws"], note: "The checkbox sits in the dialog form.", source: {"hs":"src/hs/ShellExtras.tsx","pfd":"src/pfd/ShellDialogs.tsx","pbs":"src/WorkspaceTools.tsx","agpd":"src/agpd/ShellDialogs.tsx","rws":"src/rws/ShellDialogs.tsx"} ,
      contextLayers: [
        {"id":"context-feedback-dialog","partId":"feedback-dialog","title":"Feedback dialog","explanation":"Feedback dialog groups the optional response-copy choice inside the form.","keyIdea":"HS places the feedback form in a focused surface that separates it from the current workspace.","selector":"[class~=\"aui-dialog-popup\"]","scope":"context"},
        {"id":"context-feedback-title","partId":"feedback-title","title":"Feedback title bar","explanation":"Raised title bar places Close at the end.","keyIdea":"Its raised heading identifies feedback as a separate task before users enter details.","selector":"[class~=\"aui-dialog-title\"]","scope":"context"},
        {"id":"context-feedback-close","partId":"feedback-close","title":"Close button","explanation":"X closes this feedback dialog without submitting its form.","keyIdea":"The close target exits the form without sending its current values.","selector":"[class~=\"aui-dialog-close\"]","scope":"context"},
        {"id":"context-feedback-body","partId":"feedback-body","title":"Feedback form body","explanation":"Email and copy preference share this body; other form parts are omitted.","keyIdea":"Keeping the copy checkbox last makes it an optional decision after the contact detail.","selector":"[class~=\"aui-dialog-body\"]","scope":"context"},
      ],
    },
    { id: "adc-footer", contextAnatomy: FOOTER_CONTEXT, name: "Footer checkbox", apps: ["adc"], note: "The checkbox sits in the dialog footer before the actions.", source: {"adc":"src/adc/Workspace.tsx"} ,
      contextLayers: [
        {"id":"context-feedback-dialog","partId":"feedback-dialog","title":"Feedback dialog","explanation":"Feedback dialog groups the optional response-copy choice inside the form.","keyIdea":"ADC adds the preference to the action row so it remains visible beside both outcomes.","selector":"[class~=\"aui-dialog-popup\"]","scope":"context"},
        {"id":"context-feedback-title","partId":"feedback-title","title":"Feedback title bar","explanation":"Raised title bar places Close at the end.","keyIdea":"Cancel preserves the workspace and discards the unsubmitted feedback request.","selector":"[class~=\"aui-dialog-title\"]","scope":"context"},
        {"id":"context-feedback-close","partId":"feedback-close","title":"Close button","explanation":"X closes this feedback dialog without submitting its form.","keyIdea":"Send commits the feedback and its selected copy preference as one submission.","selector":"[class~=\"aui-dialog-close\"]","scope":"context"},
        {"id":"context-feedback-actions","partId":"feedback-actions","title":"Footer actions","explanation":"Split footer places checkbox before Cancel and Send.","keyIdea":"The ADC title separates this feedback task from the page content beneath it.","selector":"[class~=\"aui-dialog-actions\"]","scope":"context"},
        {"id":"context-cancel","partId":"cancel","title":"Cancel","explanation":"The default Dialog.Button that closes the dialog without sending.","keyIdea":"The ADC close affordance offers a safe exit independent of the footer choices.","selector":"[data-ug-part=\"cancel\"]","scope":"context"},
        {"id":"context-send","partId":"send","title":"Send","explanation":"The solid primary Dialog.Button that submits the feedback.","keyIdea":"The split footer keeps the optional preference visible while retaining distinct Cancel and Send actions.","selector":"[data-ug-part=\"send\"]","scope":"context"},
      ],
    },
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
    },
    {
      id: "indicator",
      name: "Indicator",
      selector: "[class~=\"aui-checkbox-indicator\"]",
      description: "The small box that shows the checked state for the optional copy of the feedback responses.",
    },
    {
      id: "icon",
      name: "Icon",
      selector: "[class~=\"aui-checkbox-indicator\"] [class~=\"aui-contained-icon\"]",
      description: "The \"check\" mark inside the indicator; the HS, PFD, PBS, AGPD, RWS, ADM and FD feedback dialogs show it when the option is on.",
    },
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-control-row\"] > [class~=\"aui-label\"]",
      description: "The caption \"Send me a copy of my responses\" beside the box, answering the optional yes or no question at the end of the form.",
    },
    {
      id: "form-field",
      name: "Form field",
      selector: "[class~=\"aui-field\"]",
      description: "The feedback-form text fields (name, email, subject) above the checkbox in the dialog scenes, each a Field with a label and an input.",
    },
  ],
});
