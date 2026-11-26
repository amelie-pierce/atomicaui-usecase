import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Cancel upload button',

  apps: ['ace', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
    layers: [
        {"id":"container","partId":"container","title":"Container","explanation":"The lone Cancel Button in the upload dialog footer, small and in the default gray solid look, that dismisses the dialog while it waits for a dropped file.","keyIdea":"The lone cancel action lets users leave the upload dialog while no file has been dropped.","selector":"[class~=\"aui-button\"]:not([class~=\"aui-dialog-close\"])"},
      ],
options: [
    { id: "ace-upload", name: "Upload Cancel", apps: ["ace","pfd","pbs","hs","fd","agpd","rws"], contextAnatomy: [
      { id: "dialog", name: "Dialog", description: "The open dialog titled \"Upload JSON File\"." },
      { id: "dialog-title", name: "Dialog title", description: "The raised title bar with \"Upload JSON File\" and the close X at the end." },
      { id: "dialog-close", name: "Close button", description: "The X in the title that closes the dialog like Cancel (aria-label \"Cancel\")." },
      { id: "upload-body", name: "Upload area", description: "The dialog body that holds the file upload drop zone (\"Drop files here\" with a Browse action)." },
      { id: "dialog-footer", name: "Dialog footer", description: "The Actions row at the end that holds the single Cancel button." },
    ], source: {"ace":"src/features/file-persistence/ui/OpenFromDeviceDialog.tsx","pfd":"src/pfd/ShellDialogs.tsx","pbs":"src/WorkspaceTools.tsx","hs":"src/hs/ShellExtras.tsx","fd":"src/App.jsx","agpd":"src/agpd/ShellDialogs.tsx","rws":"src/rws/ShellDialogs.tsx"} ,
      contextLayers: [
        {"id":"context-dialog","partId":"dialog","title":"Dialog","explanation":"The open dialog titled \"Upload JSON File\".","keyIdea":"The dialog shell frames the JSON upload task as a focused interruption.","selector":"[data-ug-part=\"dialog\"]","scope":"context"},
        {"id":"context-dialog-title","partId":"dialog-title","title":"Dialog title","explanation":"The raised title bar with \"Upload JSON File\" and the close X at the end.","keyIdea":"The title bar identifies the requested file type and provides a close route.","selector":"[data-ug-part=\"dialog-title\"]","scope":"context"},
        {"id":"context-dialog-close","partId":"dialog-close","title":"Close button","explanation":"The X in the title that closes the dialog like Cancel (aria-label \"Cancel\").","keyIdea":"The close X gives the upload dialog a second dismissal path alongside Cancel.","selector":"[data-ug-part=\"dialog-close\"]","scope":"context"},
        {"id":"context-upload-body","partId":"upload-body","title":"Upload area","explanation":"The dialog body that holds the file upload drop zone (\"Drop files here\" with a Browse action).","keyIdea":"The body groups the drop target and Browse action as one file-selection area.","selector":"[data-ug-part=\"upload-body\"]","scope":"context"},
        {"id":"context-dialog-footer","partId":"dialog-footer","title":"Dialog footer","explanation":"The Actions row at the end that holds the single Cancel button.","keyIdea":"The footer anchors Cancel after the upload area.","selector":"[data-ug-part=\"dialog-footer\"]","scope":"context"},
      ],
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
    },
    {
      id: "label",
      name: "Label",
      description: "The text \"Cancel\" that closes the Open from device dialog without uploading.",
      selector: "[class~=\"aui-button\"]:not([class~=\"aui-dialog-close\"])",
      text: true,
    },
  ],
});
