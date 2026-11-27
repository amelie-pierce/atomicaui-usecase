import { defineUsecase } from '../../../define';

const ADC_CONTEXT_ANATOMY = [
  { id: 'copy-checkbox', name: 'Send me a copy checkbox', selector: '[class~="aui-checkbox"]', description: 'The checkbox "Send me a copy of my responses" at the start of the split footer.' },
];

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Send feedback dialog',

  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
options: [
    { id: "hcs-feedback", name: "Send feedback", apps: ["hcs"], source: {"hcs":"src/components/F01Experience.tsx"}, showContext: false ,
    },
    { id: "adc-feedback", name: "Footer copy checkbox", apps: ["adc"], source: {"adc":"src/adc/Workspace.tsx"}, contextAnatomy: ADC_CONTEXT_ANATOMY ,
     contextAnatomyOverrides: [{"id":"copy-checkbox","lesson":{"explanation":"ADC places the response-copy checkbox first in its split footer.","scope":"context"}}]},
    { id: "ace-feedback", name: "Form copy checkbox", apps: ["ace","adm","pfd","pbs","hs","fd","agpd","rws"], source: {"ace":"src/features/top-navigation/ui/FeedbackDialog.tsx","adm":"src/features/top-navigation/components/FeedbackDialog.tsx","pfd":"src/pfd/ShellDialogs.tsx","pbs":"src/WorkspaceTools.tsx","hs":"src/hs/ShellExtras.tsx","fd":"src/components/Feedback.jsx","agpd":"src/agpd/ShellDialogs.tsx","rws":"src/rws/ShellDialogs.tsx"}, showContext: false ,
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
     lesson: {"explanation":"Scrim sits behind the feedback form and dims the page."}},
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The feedback window: 384px wide in HCS, the default width in ACE, and capped at 560px in ADC.',
     lesson: {"explanation":"Feedback window ranges from default width to 560px across apps."}},
    {
      id: 'title',
      name: 'Title bar',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised title bar reading "Send feedback" in HCS and "Feedback Form" in the other apps.',
     lesson: {"explanation":"Raised title says Send feedback in HCS, Feedback Form elsewhere."}},
    {
      id: 'close',
      name: 'Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X; it is the only way to leave the HCS form without sending, and ADC wraps it in a "Close" tooltip.',
     lesson: {"explanation":"Close X exits HCS without sending; ADC adds a tooltip."}},
    {
      id: 'description',
      name: 'Description',
      selector: '[class~="aui-dialog-description"]',
      description: 'The HCS line "Tell us about your experience." under the title bar.',
     lesson: {"explanation":"The HCS line \"Tell us about your experience.\" under the title bar."}},
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The body that wraps the feedback form; in HCS it is a form with id "feedback-form" that the footer Submit button targets.',
     lesson: {"explanation":"Feedback body contains the form and links HCS footer Submit."}},
    {
      id: 'form-column',
      name: 'Form column',
      description: 'The column with gap 16 that stacks the Email and Description fields.',
     lesson: {"explanation":"The column with gap 16 that stacks the Email and Description fields.","selector":"[data-ug-part=\"form-column\"]"}},
    {
      id: 'email-field',
      name: 'Email field',
      selector: '[class~="aui-field"]:has(input[type="email"])',
      description: 'The required Email field with its label and an email-typed input.',
     lesson: {"explanation":"The required Email field with its label and an email-typed input."}},
    {
      id: 'email-input',
      name: 'Email input',
      selector: '[class~="aui-field"] input[type="email"]',
      description: 'The email input of the form.',
     lesson: {"explanation":"Email input collects the sender’s contact email address.","code":["Input","Field.Input"]}},
    {
      id: 'description-field',
      name: 'Description field',
      selector: '[class~="aui-field"]:has(textarea)',
      description: 'The Description field with a four-row Textarea for the feedback text.',
     lesson: {"explanation":"The Description field with a four-row Textarea for the feedback text."}},
    {
      id: 'description-textarea',
      name: 'Description textarea',
      selector: '[class~="aui-field"] textarea',
      description: 'The four-row textarea (Field.Textarea in the ACE and ADC scenes) for the feedback text.',
     lesson: {"explanation":"Four-row textarea collects the user’s written feedback in the form.","code":["Textarea","Field.Textarea"]}},
    {
      id: 'actions',
      name: 'Footer',
      selector: '[class~="aui-dialog-actions"]',
      description: 'The footer: Submit alone in HCS, Cancel then Send in ACE, and a split footer led by a checkbox in ADC.',
     lesson: {"explanation":"Footer actions vary: Submit, Cancel and Send, or split checkbox."}},
    {
      id: 'cancel',
      name: 'Cancel',
      description: 'The default Cancel of the ACE and ADC footers; HCS has none.',
     lesson: {"explanation":"The default Cancel of the ACE and ADC footers; HCS has none.","selector":"[data-ug-part=\"cancel\"]"}},
    {
      id: 'send',
      name: 'Submit',
      description: 'The submit button: a secondary Submit tied to "feedback-form" in HCS, a secondary solid Send in ACE, and a primary Send kept disabled in ADC.',
     lesson: {"explanation":"Send action styles vary and ADC keeps it disabled.","selector":"[data-ug-part=\"send\"]"}},
  ],
});
