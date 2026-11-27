import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Cancel upload button',

  apps: ['ace', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
options: [
    { id: "ace-upload", name: "Upload Cancel", apps: ["ace","pfd","pbs","hs","fd","agpd","rws"], contextAnatomy: [
      { id: "dialog", name: "Dialog", description: "The open dialog titled \"Upload JSON File\"." , lesson: {"explanation":"Upload JSON File dialog hosts the file dropzone and actions.","selector":"[data-ug-part=\"dialog\"]","scope":"context"}},
      { id: "dialog-title", name: "Dialog title", description: "The raised title bar with \"Upload JSON File\" and the close X at the end." , lesson: {"explanation":"Raised title says Upload JSON File beside its Close X.","selector":"[data-ug-part=\"dialog-title\"]","scope":"context"}},
      { id: "dialog-close", name: "Close button", description: "The X in the title that closes the dialog like Cancel (aria-label \"Cancel\")." , lesson: {"explanation":"Title X closes the dialog and is labelled Cancel.","selector":"[data-ug-part=\"dialog-close\"]","scope":"context"}},
      { id: "upload-body", name: "Upload area", description: "The dialog body that holds the file upload drop zone (\"Drop files here\" with a Browse action)." , lesson: {"explanation":"Dialog body contains the Drop files here zone and Browse.","selector":"[data-ug-part=\"upload-body\"]","scope":"context"}},
      { id: "dialog-footer", name: "Dialog footer", description: "The Actions row at the end that holds the single Cancel button." , lesson: {"explanation":"The Actions row at the end that holds the single Cancel button.","selector":"[data-ug-part=\"dialog-footer\"]","scope":"context"}},
    ], source: {"ace":"src/features/file-persistence/ui/OpenFromDeviceDialog.tsx","pfd":"src/pfd/ShellDialogs.tsx","pbs":"src/WorkspaceTools.tsx","hs":"src/hs/ShellExtras.tsx","fd":"src/App.jsx","agpd":"src/agpd/ShellDialogs.tsx","rws":"src/rws/ShellDialogs.tsx"} ,
    },
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
      description: "The lone Cancel Button in the upload dialog footer, small and in the default gray solid look, that dismisses the dialog while it waits for a dropped file.",
      selector: "[class~=\"aui-button\"]:not([class~=\"aui-dialog-close\"])",
     lesson: {"explanation":"Small gray Cancel waits for a file or dismisses the upload dialog."}},
    {
      id: "label",
      name: "Label",
      description: "The text \"Cancel\" that closes the Open from device dialog without uploading.",
      selector: "[class~=\"aui-button\"]:not([class~=\"aui-dialog-close\"])",
      text: true,
    },
  ],
});
