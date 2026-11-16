import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Dialog',
  title: 'Dialog footer: Cancel and Confirm',
  apps: ['hcs'],
  cases: [
    { id: 'reset', name: 'Reset confirm', source: 'src/components/HcsResetDialog.tsx' },
    { id: 'accept', name: 'Accept licence' },
    { id: 'feedback', name: 'Send feedback' },
  ],
  source: { hcs: 'src/components/F01Experience.tsx' },
  summary: 'A gray solid Cancel and a solid secondary Confirm sit side by side in the footer of a dialog.',
  where: 'The footer of a confirmation or form dialog: Cancel (or Do Not Accept) left of the action that commits it (Reset, Submit, Accept). Real site source: HCS Button-001 (confirm) and Button-002 (cancel). Popovers use a ghost Cancel instead (Button-002).',
  when: 'Use the pair whenever a dialog asks for a decision: Confirm is the one action that commits, Cancel is the neutral way out. In brand atomic the near-black fill is color "secondary", not "primary" (orange), and gray is "surface-alt", not "secondary".',
  how: 'Confirm sets aui scale "sm", color "secondary" and paint "solid". Cancel sets scale "sm", color "surface-alt", paint "solid" and shape "soft"; color, paint and shape are the Button defaults, so aui={{ scale: "sm" }} gives the same look. The real dialogs use Dialog.Button or AlertDialog.Button with the same aui; Button is shown here because the gallery kit does not export them. In context, pick a case, each built from the real HCS dialog: Reset confirm (HcsResetDialog: a 560px dialog with backdrop and viewport, a raised Title with warning icon, Spacer and Close, one Description, and the Cancel and Reset footer; the app\'s modal AlertDialog is shown as a non-modal Dialog because the vendored AlertDialog is forced modal and would block the gallery), Accept licence (the 24-paragraph agreement in a fill-width, fill-height popup, shown after the end is reached so Accept is enabled) and Send feedback (a 384px popup with the phone link and three required fields above one Submit). Backdrop and viewport are framed by the preview stage.',
});
