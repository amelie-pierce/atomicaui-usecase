import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'IconButton',
  title: '(to merge)',
  apps: ['ace', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
  cases: [
    {
      id: 'ace-upload',
      name: 'Upload Cancel',
      apps: ['ace', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
      source: {
        ace: 'src/features/file-persistence/ui/OpenFromDeviceDialog.tsx',
        pfd: 'src/pfd/ShellDialogs.tsx',
        pbs: 'src/WorkspaceTools.tsx',
        hs: 'src/hs/ShellExtras.tsx',
        fd: 'src/App.jsx',
        agpd: 'src/agpd/ShellDialogs.tsx',
        rws: 'src/rws/ShellDialogs.tsx',
      },
    },
    { id: 'ace-relaunch', name: 'Centred action', apps: ['ace', 'hs'], source: { ace: 'src/features/eula/ui/EulaGate.tsx', hs: 'src/hs/LicenseGate.tsx' } },
    {
      id: 'pbs-close',
      name: 'Info Close',
      apps: ['pbs', 'agpd', 'rws'],
      source: { pbs: 'src/WorkspaceTools.tsx', agpd: 'src/agpd/ShellDialogs.tsx', rws: 'src/rws/ShellDialogs.tsx' },
    },
    { id: 'fd-close', name: 'Info Close', apps: ['fd'], source: { fd: 'src/App.jsx' } },
    { id: 'adc-ok', name: 'Info Close', apps: ['adc'], source: { adc: 'src/adc/components/DesignCapacityDialog.tsx' } },
  ],
  source: {
    ace: 'src/features/file-persistence/ui/OpenFromDeviceDialog.tsx',
    pfd: 'src/pfd/ShellDialogs.tsx',
    pbs: 'src/WorkspaceTools.tsx',
    hs: 'src/hs/ShellExtras.tsx',
    fd: 'src/App.jsx',
    agpd: 'src/agpd/ShellDialogs.tsx',
    rws: 'src/rws/ShellDialogs.tsx',
    adc: 'src/adc/Workspace.tsx',
  },
  summary: 'A dialog with nothing to decide ends in one button, alone at the end of the footer: Cancel, Close or OK.',
  where: 'The footer of a dialog that only informs or waits for input handled in its body: an upload dropzone (Cancel), an info dialog such as Add to Home Screen (Close) or a notice (OK). Real site source: the Button scans of each app; HCS has no single-action dialog. ACE\'s decline-in-EC dialog centres its one button because it is the only way forward.',
  when: 'Use one neutral button when closing is the only choice; the close X in the Title does the same. Do not add a Confirm that does nothing. Use the centred, solid secondary button only where the user must act (relaunch to accept the licence). In ADC the single button is primary.',
  how: 'The Dialog.Button default is a gray solid button that dismisses the dialog; no aui is needed. Each type is listed with its distinct UIs; an app appears in one group per type, and the preview toggles the groups of a type with two or more. '
    + 'Upload Cancel: one UI in ACE, PFD, PBS, HS, FD, AGPD and RWS (a raised Title with the close X, a dropzone, one default Cancel; FD spells the Cancel as a plain Button, which looks the same). '
    + 'Centred action: one UI in ACE and HS (EC mode: Dialog.Actions align "center", one Dialog.Button with color "secondary", paint "solid" and dismiss={false}). '
    + 'Info Close: PBS, AGPD and RWS (the "Add to Home Screen" dialog, one default Close); FD (a plain Button with color "secondary", a black fill, not gray); ADC (an OK with color "primary", paint "solid", and the close X in a tooltip; its About dialog ends the same way with Close). PFD writes the Add to Home Screen dialog without a footer, so it has no Info Close. '
    + 'AlertDialog dialogs are drawn as a non-modal Dialog, as in Button-001. The upload dialog keeps its dropzone and the info dialogs one paragraph; the real bodies hold more.',
});
