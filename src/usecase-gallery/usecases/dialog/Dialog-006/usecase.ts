import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Send feedback dialog',
  look: 'Cancel and secondary Send',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
  cases: [
    { id: 'hcs-feedback', name: 'Send feedback', apps: ['hcs'], source: { hcs: 'src/components/F01Experience.tsx' } },
    { id: 'adc-feedback', name: 'Send feedback', apps: ['adc'], source: { adc: 'src/adc/Workspace.tsx' } },
    { id: 'ace-feedback', name: 'Send feedback', apps: ['ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'], source: { ace: 'src/features/top-navigation/ui/FeedbackDialog.tsx', adm: 'src/features/top-navigation/components/FeedbackDialog.tsx', pfd: 'src/pfd/ShellDialogs.tsx', pbs: 'src/WorkspaceTools.tsx', hs: 'src/hs/ShellExtras.tsx', fd: 'src/components/Feedback.jsx', agpd: 'src/agpd/ShellDialogs.tsx', rws: 'src/rws/ShellDialogs.tsx' } },
  ],
  source: { hcs: 'src/components/F01Experience.tsx', adc: 'src/adc/Workspace.tsx', ace: 'src/features/top-navigation/ui/FeedbackDialog.tsx', adm: 'src/features/top-navigation/components/FeedbackDialog.tsx', pfd: 'src/pfd/ShellDialogs.tsx', pbs: 'src/WorkspaceTools.tsx', hs: 'src/hs/ShellExtras.tsx', fd: 'src/components/Feedback.jsx', agpd: 'src/agpd/ShellDialogs.tsx', rws: 'src/rws/ShellDialogs.tsx' },
  summary: 'A form dialog that sends the user\'s feedback: a Cancel and a solid Send (Submit).',
  where: 'The Feedback dialog of the top bar. Real site source: HCS F01Experience.tsx, ADC Workspace.tsx and the FeedbackDialog or ShellDialogs of ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS (the paths are in source).',
  when: 'Use it for a short form the user can abandon; Send commits it.',
  how: 'Cancel is the Dialog.Button default; Send is color "secondary", paint "solid" (HCS sets scale "sm"). Three groups. HCS (384px, one Submit and no Cancel). '
    + 'ADC (a split footer that leads with a "Send me a copy" Checkbox and ends with a disabled primary Send, 560px, close X in a tooltip). '
    + 'ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS (raised Title with the close X, Cancel + Send; ADM and FD set the popup to 560px, the others use the default width; PFD, PBS, AGPD and RWS label Send as Submit). '
    + 'Body fields beyond Email and Description (the Summary field, the attach-file dropzone, the "Send me a copy" Switch of ACE) are left out.',
});
