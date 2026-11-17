import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Dialog',
  title: 'Dialog footer: single action',
  apps: ['ace', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
  cases: [
    { id: 'ace-upload', name: 'Upload Cancel', app: 'ace', source: 'src/features/file-persistence/ui/OpenFromDeviceDialog.tsx' },
    { id: 'ace-relaunch', name: 'Centred action', app: 'ace', source: 'src/features/eula/ui/EulaGate.tsx' },
    { id: 'agpd-close', name: 'Info Close', app: 'agpd', source: 'src/agpd/ShellDialogs.tsx' },
    { id: 'fd-close', name: 'Close', app: 'fd', source: 'src/App.jsx' },
    { id: 'adc-ok', name: 'Acknowledge', app: 'adc', source: 'src/adc/components/DesignCapacityDialog.tsx' },
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
  how: 'The Dialog.Button default is a gray solid button that dismisses the dialog; no aui is needed. Cases: Upload Cancel (ACE; PFD, PBS, HS, FD, AGPD and RWS write the same footer), Centred action (ACE, and HS in EC mode: Dialog.Actions align "center", one Dialog.Button with color "secondary", paint "solid" and dismiss={false}), Info Close (AGPD; RWS and PBS write the same dialog), Close (FD: a plain Button with color "secondary", not gray) and Acknowledge (ADC: color "primary", paint "solid", with the close X in a tooltip; its About dialog ends the same way with Close). AlertDialog dialogs are drawn as a non-modal Dialog, as in Button-001. The upload dialog keeps its dropzone and the info dialogs one paragraph; the real bodies hold more.',
});
