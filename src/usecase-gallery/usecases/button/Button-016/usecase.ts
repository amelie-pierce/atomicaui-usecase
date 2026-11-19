import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Secondary solid',
  apps: ['hcs', 'ace', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  cases: [
    { id: 'results', name: 'Results error strip', apps: ['hcs'], source: { hcs: 'src/components/F01Results.tsx' } },
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
    {
      id: 'pbs-close',
      name: 'Info Close',
      apps: ['pbs', 'agpd', 'rws'],
      source: { pbs: 'src/WorkspaceTools.tsx', agpd: 'src/agpd/ShellDialogs.tsx', rws: 'src/rws/ShellDialogs.tsx' },
    },
  ],
  source: {
    hcs: 'src/components/F01Results.tsx',
    ace: 'src/features/file-persistence/ui/OpenFromDeviceDialog.tsx',
    pfd: 'src/pfd/ShellDialogs.tsx',
    pbs: 'src/WorkspaceTools.tsx',
    hs: 'src/hs/ShellExtras.tsx',
    fd: 'src/App.jsx',
    agpd: 'src/agpd/ShellDialogs.tsx',
    rws: 'src/rws/ShellDialogs.tsx',
  },
  summary: 'The default gray Button is one plain action with nothing to weigh: Try again after an error, or the lone Cancel or Close at the end of a dialog footer.',
  where: 'The Results error strip, under the message (Try again, HCS); and the footer of a dialog that only informs or waits for input handled in its body: an upload dropzone (Cancel), an info dialog such as Add to Home Screen (Close). Real site source: HCS Button-005 (F01Results.tsx) and the Button scans of each app; no other app has a Retry Button in its source (checked in ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS and ADC), and HCS has no single-action dialog.',
  when: 'Use it for a plain recovery or dismiss action that needs no emphasis; in a dialog use one neutral button when closing is the only choice (the close X in the Title does the same) and do not add a Confirm that does nothing.',
  how: 'The example sets only aui scale "sm"; color "surface-alt" and paint "solid" are the defaults, and the Dialog.Button default is the same gray solid button that dismisses the dialog. Each place is listed with its distinct UIs; an app appears in one group per place, and the preview toggles the groups of a place with two or more. '
    + 'Results error strip: HCS only (the Output error state: a solid error View with the message, then the button, with no flex props on the View, so the button sits under the message). '
    + 'Upload Cancel: one UI in ACE, PFD, PBS, HS, FD, AGPD and RWS (a raised Title with the close X, a dropzone, one default Cancel; FD spells the Cancel as a plain Button, which looks the same). '
    + 'Info Close: PBS, AGPD and RWS (the "Add to Home Screen" dialog, one default Close). PFD writes the Add to Home Screen dialog without a footer, so it has no Info Close. '
    + 'AlertDialog dialogs are drawn as a non-modal Dialog, as in Button-001. The upload dialog keeps its dropzone and the info dialogs one paragraph; the real bodies hold more.',
});
