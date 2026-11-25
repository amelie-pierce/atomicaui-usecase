import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Cancel upload button',

  apps: ['ace', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  options: [
    { id: "ace-upload", name: "Upload Cancel", apps: ["ace","pfd","pbs","hs","fd","agpd","rws"], source: {"ace":"src/features/file-persistence/ui/OpenFromDeviceDialog.tsx","pfd":"src/pfd/ShellDialogs.tsx","pbs":"src/WorkspaceTools.tsx","hs":"src/hs/ShellExtras.tsx","fd":"src/App.jsx","agpd":"src/agpd/ShellDialogs.tsx","rws":"src/rws/ShellDialogs.tsx"} },
  ],
  source: { ace: 'src/features/file-persistence/ui/OpenFromDeviceDialog.tsx', pfd: 'src/pfd/ShellDialogs.tsx', pbs: 'src/WorkspaceTools.tsx', hs: 'src/hs/ShellExtras.tsx', fd: 'src/App.jsx', agpd: 'src/agpd/ShellDialogs.tsx', rws: 'src/rws/ShellDialogs.tsx' },
  summary: 'The default gray Cancel is the lone button at the end of an upload dialog that waits for a file dropped in its body.',
  where: 'The footer of the upload dialog (Open from device): a raised Title with the close X, a dropzone, then one Cancel. Real site source: the upload dialog of ACE, PFD, PBS, HS, FD, AGPD and RWS (the paths are in source).',
  when: 'Use one neutral button when closing is the only choice of the dialog (the close X in the Title does the same) and do not add a Confirm that does nothing.',
  how: 'The example sets only aui scale "sm"; color "surface-alt" and paint "solid" are the defaults, and the Dialog.Button default is the same gray solid button that dismisses the dialog. '
    + 'One UI in all seven apps (FD spells the Cancel as a plain Button, which looks the same). The scene keeps the dropzone; the real body holds more.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      token: "Button",
      description: "The lone Cancel Button in the upload dialog footer, small and in the default gray solid look, that dismisses the dialog while it waits for a dropped file.",
      selector: "[class~=\"aui-button\"]:not([class~=\"aui-dialog-close\"])",
      code: "<Button aui={{ scale: 'sm' }}>Cancel</Button>",
    },
    {
      id: "label",
      name: "Label",
      token: "Button",
      description: "The text \"Cancel\" that closes the Open from device dialog without uploading.",
      selector: "[class~=\"aui-button\"]:not([class~=\"aui-dialog-close\"])",
      text: true,
      code: "Cancel",
    },
  ],
});
