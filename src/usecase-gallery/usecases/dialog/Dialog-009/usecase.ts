import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Send feedback dialog',

  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
  options: [
    { id: "hcs-feedback", name: "Send feedback", apps: ["hcs"], source: {"hcs":"src/components/F01Experience.tsx"} },
    { id: "adc-feedback", name: "Send feedback — UI variant 2", apps: ["adc"], source: {"adc":"src/adc/Workspace.tsx"} },
    { id: "ace-feedback", name: "Send feedback — UI variant 3", apps: ["ace","adm","pfd","pbs","hs","fd","agpd","rws"], source: {"ace":"src/features/top-navigation/ui/FeedbackDialog.tsx","adm":"src/features/top-navigation/components/FeedbackDialog.tsx","pfd":"src/pfd/ShellDialogs.tsx","pbs":"src/WorkspaceTools.tsx","hs":"src/hs/ShellExtras.tsx","fd":"src/components/Feedback.jsx","agpd":"src/agpd/ShellDialogs.tsx","rws":"src/rws/ShellDialogs.tsx"} },
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
      token: 'Dialog.Backdrop',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the feedback form.',
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Dialog.Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The feedback window: 384px wide in HCS, the default width in ACE, and capped at 560px in ADC.',
    },
    {
      id: 'title',
      name: 'Title bar',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised title bar reading "Send feedback" in HCS and "Feedback Form" in the other apps.',
    },
    {
      id: 'close',
      name: 'Close',
      token: 'Dialog.Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X; it is the only way to leave the HCS form without sending, and ADC wraps it in a "Close" tooltip.',
    },
    {
      id: 'description',
      name: 'Description',
      token: 'Dialog.Description',
      selector: '[class~="aui-dialog-description"]',
      description: 'The HCS line "Tell us about your experience." under the title bar.',
    },
    {
      id: 'body',
      name: 'Body',
      token: 'Dialog.Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The body that wraps the feedback form; in HCS it is a form with id "feedback-form" that the footer Submit button targets.',
    },
    {
      id: 'form-column',
      name: 'Form column',
      token: 'View',
      description: 'The column with gap 16 that stacks the Email and Description fields.',
    },
    {
      id: 'email-field',
      name: 'Email field',
      token: 'Field',
      selector: '[class~="aui-field"]:has(input[type="email"])',
      description: 'The required Email field with its label and an email-typed input.',
    },
    {
      id: 'email-input',
      name: 'Email input',
      token: 'Input',
      selector: '[class~="aui-field"] input[type="email"]',
      description: 'The email input of the form.',
    },
    {
      id: 'description-field',
      name: 'Description field',
      token: 'Field',
      selector: '[class~="aui-field"]:has(textarea)',
      description: 'The Description field with a four-row Textarea for the feedback text.',
    },
    {
      id: 'description-textarea',
      name: 'Description textarea',
      token: 'Textarea',
      selector: '[class~="aui-field"] textarea',
      description: 'The four-row textarea (Field.Textarea in the ACE and ADC scenes) for the feedback text.',
    },
    {
      id: 'actions',
      name: 'Footer',
      token: 'Dialog.Actions',
      selector: '[class~="aui-dialog-actions"]',
      description: 'The footer: Submit alone in HCS, Cancel then Send in ACE, and a split footer led by a checkbox in ADC.',
    },
    {
      id: 'copy-checkbox',
      name: 'Send me a copy',
      token: 'Checkbox',
      selector: '[class~="aui-checkbox"]',
      description: 'The ADC-only checkbox "Send me a copy of my responses" at the start of the split footer.',
    },
    {
      id: 'cancel',
      name: 'Cancel',
      token: 'Dialog.Button',
      description: 'The default Cancel of the ACE and ADC footers; HCS has none.',
    },
    {
      id: 'send',
      name: 'Submit',
      token: 'Dialog.Button',
      description: 'The submit button: a secondary Submit tied to "feedback-form" in HCS, a secondary solid Send in ACE, and a primary Send kept disabled in ADC.',
    },
  ],
});
