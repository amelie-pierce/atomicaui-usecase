import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Dialog',
  title: 'Dialog footer: Cancel and Confirm',
  apps: ['hcs'],
  cases: [
    { id: 'reset', name: 'Reset confirm' },
    { id: 'accept', name: 'Accept licence' },
    { id: 'feedback', name: 'Send feedback' },
  ],
  summary: 'A gray solid Cancel and a solid secondary Confirm sit side by side in the footer of a dialog.',
  where: 'The footer of a confirmation or form dialog: Cancel (or Do Not Accept) left of the action that commits it (Reset, Submit, Accept). Real site source: HCS Button-001 (confirm) and Button-002 (cancel). Popovers use a ghost Cancel instead (Button-002).',
  when: 'Use the pair whenever a dialog asks for a decision: Confirm is the one action that commits, Cancel is the neutral way out. In brand atomic the near-black fill is color "secondary", not "primary" (orange), and gray is "surface-alt", not "secondary".',
  how: 'Confirm sets aui scale "sm", color "secondary" and paint "solid". Cancel sets scale "sm", color "surface-alt", paint "solid" and shape "soft"; color, paint and shape are the Button defaults, so aui={{ scale: "sm" }} gives the same look. The real dialogs use Dialog.Button or AlertDialog.Button with the same aui; Button is shown here because the gallery kit does not export them. In context, pick a case: Reset confirm (a non-modal Dialog with a raised Title, warning icon, Spacer and Close, one Description and the end-aligned footer, at the kit default width, not the app\'s 560px), Accept licence (Accept disabled until the licence is read) and Send feedback (a single Submit under three required fields). Each is static, with no overlay.',
});
