import { defineUsecase } from '../../../define';

const ADC_CONTEXT_ANATOMY = [
  { id: 'copy-checkbox', name: 'Send me a copy checkbox', selector: '[class~="aui-checkbox"]', description: 'The checkbox "Send me a copy of my responses" at the start of the split footer.' },
];

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Send feedback dialog',

  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
    layers: [
        {"id":"overlay","partId":"overlay","title":"Overlay","explanation":"The scrim behind the feedback form.","keyIdea":"The feedback scrim keeps attention on sharing a response.","selector":"[class~=\"aui-dialog-backdrop\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"The feedback window: 384px wide in HCS, the default width in ACE, and capped at 560px in ADC.","keyIdea":"A bounded popup gives the feedback form room for its fields and footer.","selector":"[class~=\"aui-dialog-popup\"]"},
        {"id":"title","partId":"title","title":"Title bar","explanation":"The raised title bar reading \"Send feedback\" in HCS and \"Feedback Form\" in the other apps.","keyIdea":"The title names the feedback task across the app variants.","selector":"[class~=\"aui-dialog-title\"]"},
        {"id":"close","partId":"close","title":"Close","explanation":"The close X; it is the only way to leave the HCS form without sending, and ADC wraps it in a \"Close\" tooltip.","keyIdea":"The close control lets users leave without submitting their feedback.","selector":"[class~=\"aui-dialog-close\"]"},
        {"id":"description","partId":"description","title":"Description","explanation":"The HCS line \"Tell us about your experience.\" under the title bar.","keyIdea":"The supporting line invites the user to describe their experience.","selector":"[class~=\"aui-dialog-description\"]"},
        {"id":"body","partId":"body","title":"Body","explanation":"The body that wraps the feedback form; in HCS it is a form with id \"feedback-form\" that the footer Submit button targets.","keyIdea":"The body provides the form boundary that the submit action targets.","selector":"[class~=\"aui-dialog-body\"]"},
        {"id":"form-column","partId":"form-column","title":"Form column","explanation":"The column with gap 16 that stacks the Email and Description fields.","keyIdea":"The stacked column separates contact details from written feedback.","selector":"[data-ug-part=\"form-column\"]"},
        {"id":"email-field","partId":"email-field","title":"Email field","explanation":"The required Email field with its label and an email-typed input.","keyIdea":"The required field group collects a reply address.","selector":"[class~=\"aui-field\"]:has(input[type=\"email\"])"},
        {"id":"email-input","partId":"email-input","title":"Email input","explanation":"The email input of the form.","keyIdea":"Email input semantics help users enter a valid contact address.","selector":"[class~=\"aui-field\"] input[type=\"email\"]"},
        {"id":"description-field","partId":"description-field","title":"Description field","explanation":"The Description field with a four-row Textarea for the feedback text.","keyIdea":"The larger field group gives space for a considered response.","selector":"[class~=\"aui-field\"]:has(textarea)"},
        {"id":"description-textarea","partId":"description-textarea","title":"Description textarea","explanation":"The four-row textarea (Field.Textarea in the ACE and ADC scenes) for the feedback text.","keyIdea":"Four rows signal that feedback can be longer than a short label.","selector":"[class~=\"aui-field\"] textarea"},
        {"id":"actions","partId":"actions","title":"Footer","explanation":"The footer: Submit alone in HCS, Cancel then Send in ACE, and a split footer led by a checkbox in ADC.","keyIdea":"The footer arranges submission with any app-specific secondary choices.","selector":"[class~=\"aui-dialog-actions\"]"},
        {"id":"cancel","partId":"cancel","title":"Cancel","explanation":"The default Cancel of the ACE and ADC footers; HCS has none.","keyIdea":"Cancel closes the ACE or ADC form without sending a response.","selector":"[data-ug-part=\"cancel\"]"},
        {"id":"send","partId":"send","title":"Submit","explanation":"The submit button: a secondary Submit tied to \"feedback-form\" in HCS, a secondary solid Send in ACE, and a primary Send kept disabled in ADC.","keyIdea":"The submit action sends the completed feedback form.","selector":"[data-ug-part=\"send\"]"},
      ],
options: [
    { id: "hcs-feedback", name: "Send feedback", apps: ["hcs"], source: {"hcs":"src/components/F01Experience.tsx"}, showContext: false ,
      contextLayers: [

      ],
    },
    { id: "adc-feedback", name: "Footer copy checkbox", apps: ["adc"], source: {"adc":"src/adc/Workspace.tsx"}, contextAnatomy: ADC_CONTEXT_ANATOMY ,
      contextLayers: [
        {"id":"context-copy-checkbox","partId":"copy-checkbox","title":"Send me a copy checkbox","explanation":"The checkbox \"Send me a copy of my responses\" at the start of the split footer.","keyIdea":"The checkbox lets ADC users receive a copy of their submitted answers.","selector":"[class~=\"aui-checkbox\"]","scope":"context"},
      ],
    },
    { id: "ace-feedback", name: "Form copy checkbox", apps: ["ace","adm","pfd","pbs","hs","fd","agpd","rws"], source: {"ace":"src/features/top-navigation/ui/FeedbackDialog.tsx","adm":"src/features/top-navigation/components/FeedbackDialog.tsx","pfd":"src/pfd/ShellDialogs.tsx","pbs":"src/WorkspaceTools.tsx","hs":"src/hs/ShellExtras.tsx","fd":"src/components/Feedback.jsx","agpd":"src/agpd/ShellDialogs.tsx","rws":"src/rws/ShellDialogs.tsx"}, showContext: false ,
      contextLayers: [

      ],
    },
  ],
  source: { hcs: 'src/components/F01Experience.tsx', adc: 'src/adc/Workspace.tsx', ace: 'src/features/top-navigation/ui/FeedbackDialog.tsx', adm: 'src/features/top-navigation/components/FeedbackDialog.tsx', pfd: 'src/pfd/ShellDialogs.tsx', pbs: 'src/WorkspaceTools.tsx', hs: 'src/hs/ShellExtras.tsx', fd: 'src/components/Feedback.jsx', agpd: 'src/agpd/ShellDialogs.tsx', rws: 'src/rws/ShellDialogs.tsx' },
  summary: 'A form dialog that sends the user\'s feedback: a Cancel and a solid Send (Submit).',
  where: 'The Feedback dialog of the top bar. Real site source: HCS F01Experience.tsx, ADC Workspace.tsx and the FeedbackDialog or ShellDialogs of ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS (the paths are in source).',
  when: 'Use it for a short form the user can abandon; Send commits it.',
  how: 'Cancel is the Dialog.Button default; Send is color "secondary", paint "solid" (HCS sets scale "sm"). Three groups. HCS (384px, one Submit and no Cancel). '
    + 'ADC (a split footer that leads with a "Send me a copy" Checkbox and ends with a disabled primary Send, 560px, close X in a tooltip). '
    + 'ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS (raised Title with the close X, Cancel + Send; ADM and FD set the popup to 560px, the others use the default width; PFD, PBS, AGPD and RWS label Send as Submit). '
    + 'Body fields beyond Email and Description (the Summary field, the attach-file dropzone, the "Send me a copy" Switch of ACE) are left out.',
  anatomy: [
    {
      id: 'overlay',
      name: 'Overlay',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the feedback form.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The feedback window: 384px wide in HCS, the default width in ACE, and capped at 560px in ADC.',
    },
    {
      id: 'title',
      name: 'Title bar',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised title bar reading "Send feedback" in HCS and "Feedback Form" in the other apps.',
    },
    {
      id: 'close',
      name: 'Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X; it is the only way to leave the HCS form without sending, and ADC wraps it in a "Close" tooltip.',
    },
    {
      id: 'description',
      name: 'Description',
      selector: '[class~="aui-dialog-description"]',
      description: 'The HCS line "Tell us about your experience." under the title bar.',
    },
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The body that wraps the feedback form; in HCS it is a form with id "feedback-form" that the footer Submit button targets.',
    },
    {
      id: 'form-column',
      name: 'Form column',
      description: 'The column with gap 16 that stacks the Email and Description fields.',
    },
    {
      id: 'email-field',
      name: 'Email field',
      selector: '[class~="aui-field"]:has(input[type="email"])',
      description: 'The required Email field with its label and an email-typed input.',
    },
    {
      id: 'email-input',
      name: 'Email input',
      selector: '[class~="aui-field"] input[type="email"]',
      description: 'The email input of the form.',
    },
    {
      id: 'description-field',
      name: 'Description field',
      selector: '[class~="aui-field"]:has(textarea)',
      description: 'The Description field with a four-row Textarea for the feedback text.',
    },
    {
      id: 'description-textarea',
      name: 'Description textarea',
      selector: '[class~="aui-field"] textarea',
      description: 'The four-row textarea (Field.Textarea in the ACE and ADC scenes) for the feedback text.',
    },
    {
      id: 'actions',
      name: 'Footer',
      selector: '[class~="aui-dialog-actions"]',
      description: 'The footer: Submit alone in HCS, Cancel then Send in ACE, and a split footer led by a checkbox in ADC.',
    },
    {
      id: 'cancel',
      name: 'Cancel',
      description: 'The default Cancel of the ACE and ADC footers; HCS has none.',
    },
    {
      id: 'send',
      name: 'Submit',
      description: 'The submit button: a secondary Submit tied to "feedback-form" in HCS, a secondary solid Send in ACE, and a primary Send kept disabled in ADC.',
    },
  ],
});
