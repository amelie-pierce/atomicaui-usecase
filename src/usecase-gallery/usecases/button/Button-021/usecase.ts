import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Dialog',
  title: 'Dialog header close',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
  cases: [
    { id: 'hcs-close', name: 'Dialog close', app: 'hcs', source: 'src/components/F01Experience.tsx' },
    { id: 'ace-close', name: 'Dialog close', app: 'ace', source: 'src/features/file-persistence/ui/OpenFromDeviceDialog.tsx' },
    { id: 'pbs-close', name: 'Dialog close', app: 'pbs', source: 'src/ResultsSection.tsx' },
    { id: 'adc-close', name: 'Dialog close', app: 'adc', source: 'src/adc/Workspace.tsx' },
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
  where: 'The end of a dialog Title, after a Spacer. Real site source: every app writes Dialog.Close in its dialogs; the cases differ in scale and placement. Licence gates use it to decline.',
  when: 'Use it in every dialog that can be dismissed; it is the same as the neutral Cancel of the footer (Button-001, Button-020). Do not use it as the only way out of a dialog that needs a decision, and leave it out where the app forbids closing (the PBS licence gate).',
  how: 'The real part is Dialog.Close: an IconButton named "xmark" with paint "text" and profile "contained", taking the popup scale (the example uses IconButton, since Dialog.Close needs a Dialog around it). HCS sets scale "sm" on the Title and the X; ACE (and ADM, PFD, HS, FD, AGPD and RWS) set no aui, so the default scale applies, except the licence gates, which set scale "sm". PBS drops the Title: HeaderClose is a View row with justifyContent "end" holding only the X. ADC wraps the X in a Tooltip (a solid secondary sm popup reading "Close"). The scenes keep the Title only: no body or footer.',
});
