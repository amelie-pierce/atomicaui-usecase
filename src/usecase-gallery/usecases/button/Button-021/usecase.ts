import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Dialog',
  title: 'Dialog header close',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
  cases: [
    { id: 'hcs-close', name: 'Dialog close', apps: ['hcs'], source: { hcs: 'src/components/F01Experience.tsx' } },
    { id: 'adc-close', name: 'Dialog close', apps: ['adc'], source: { adc: 'src/adc/Workspace.tsx' } },
    {
      id: 'ace-close',
      name: 'Dialog close',
      apps: ['ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
      label: 'Other apps',
      source: {
        ace: 'src/features/file-persistence/ui/OpenFromDeviceDialog.tsx',
        adm: 'src/features/top-navigation/components/FeedbackDialog.tsx',
        pfd: 'src/pfd/ShellDialogs.tsx',
        pbs: 'src/WorkspaceTools.tsx',
        hs: 'src/hs/ShellDialog.tsx',
        fd: 'src/components/ui.jsx',
        agpd: 'src/agpd/ShellDialogs.tsx',
        rws: 'src/rws/ShellDialogs.tsx',
      },
    },
    { id: 'pbs-close', name: 'Close without Title', apps: ['pbs'], source: { pbs: 'src/ResultsSection.tsx' } },
  ],
  source: {
    hcs: 'src/components/F01Experience.tsx',
    ace: 'src/features/file-persistence/ui/OpenFromDeviceDialog.tsx',
    adm: 'src/features/top-navigation/components/FeedbackDialog.tsx',
    pfd: 'src/pfd/ShellDialogs.tsx',
    pbs: 'src/ResultsSection.tsx',
    hs: 'src/hs/ShellDialog.tsx',
    fd: 'src/components/ui.jsx',
    agpd: 'src/agpd/ShellDialogs.tsx',
    rws: 'src/rws/ShellDialogs.tsx',
    adc: 'src/adc/Workspace.tsx',
  },
  summary: 'A transparent X IconButton at the end of the dialog title closes the dialog without acting.',
  where: 'The end of a dialog Title, after a Spacer. Real site source: every app writes Dialog.Close in its dialogs; the groups differ in scale, tooltip and placement. Licence gates use it to decline.',
  when: 'Use it in every dialog that can be dismissed; it is the same as the neutral Cancel of the footer (Button-001, Button-020). Do not use it as the only way out of a dialog that needs a decision, and leave it out where the app forbids closing (the PBS licence gate).',
  how: 'The real part is Dialog.Close: an IconButton named "xmark" with paint "text" and profile "contained", taking the popup scale (the example uses IconButton, since Dialog.Close needs a Dialog around it). The preview groups the apps by distinct UI and the Document lists the same groups. '
    + 'Dialog close: HCS (scale "sm" on the Title and the X); ADC (the X wrapped in a Tooltip, a solid secondary sm popup reading "Close"); Other apps = ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS (a raised Title at the default scale with a Spacer and an X that sets no aui; their licence gates set scale "sm" on a plain Title and the X, and PBS drops the X there). '
    + 'Close without Title: PBS only (HeaderClose, the Remove and Duplicate dialogs): no Title, a View row with justifyContent "end" holding only the X. '
    + 'The scenes keep the Title only: no body or footer.',
});
