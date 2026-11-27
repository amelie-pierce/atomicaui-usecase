import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'dialog', name: 'Upload dialog', description: 'The Dialog that hosts the dropzone in its body, opened by the app\'s Open from device action.' },
  { id: 'dialog-title', name: 'Dialog title', description: 'The raised title row reading "Upload JSON file", with the close X pushed to the end.' },
  { id: 'dialog-close', name: 'Close button', description: 'The X at the end of the title row that dismisses the dialog (labelled "Cancel").' },
  { id: 'dialog-cancel', name: 'Cancel button', description: 'The Cancel button in the dialog actions that closes the dialog without uploading.' },
];

export default defineUsecase({
  uiType: 'FileUpload',
  title: 'Upload file dialog dropzone',
  apps: ['ace', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
    layers: [
        {"id":"upload","partId":"upload","title":"Upload area","explanation":"Dashed single-file drop surface appears inside the upload dialog.","keyIdea":"The dashed surface makes the drop target visible while limiting this dialog to one file.","selector":"[class~=\"aui-file-upload\"]"},
        {"id":"icon","partId":"icon","title":"Icon","explanation":"The upload icon at the top of the drop area.","keyIdea":"The upload glyph communicates the action without taking space from the file prompt.","selector":"[class~=\"aui-file-upload-icon\"]","code":["FileUpload"]},
        {"id":"body","partId":"body","title":"Body","explanation":"Row below icon pairs the upload prompt with Browse.","keyIdea":"The prompt and browse choice share one row so both ways to attach a file stay together.","selector":"[class~=\"aui-file-upload-body\"]","code":["FileUpload"]},
        {"id":"action","partId":"action","title":"Browse action","explanation":"Browse opens the device picker as an alternative to dropping.","keyIdea":"Browse gives users a file-picker route when dragging a file is unavailable.","selector":"[class~=\"aui-file-upload-action\"]","code":["FileUpload"]},
      ],
options: [
    { id: "ace-open-device", contextAnatomy: CONTEXT_ANATOMY, name: "Upload file dialog", apps: ["ace","pfd","pbs","hs","fd","agpd","rws","adc"], source: {"ace":"src/features/file-persistence/ui/OpenFromDeviceDialog.tsx","pfd":"src/pfd/ShellDialogs.tsx","pbs":"src/WorkspaceTools.tsx","hs":"src/hs/ShellExtras.tsx","fd":"src/App.jsx","agpd":"src/agpd/ShellDialogs.tsx","rws":"src/rws/ShellDialogs.tsx","adc":"src/adc/components/NewProjectDialog.tsx"} ,
      contextLayers: [
        {"id":"context-dialog","partId":"dialog","title":"Upload dialog","explanation":"Dialog body hosts the dropzone opened by Open from device.","keyIdea":"The ACE upload dialog places its drop area inside the task opened from Open from device.","selector":"[data-ug-part=\"dialog\"]","scope":"context"},
        {"id":"context-dialog-title","partId":"dialog-title","title":"Dialog title","explanation":"Raised title names the JSON upload and places Close at the end.","keyIdea":"The title tells users the expected file format before they select one.","selector":"[data-ug-part=\"dialog-title\"]","scope":"context"},
        {"id":"context-dialog-close","partId":"dialog-close","title":"Close button","explanation":"Title-row X closes the dialog and is labelled Cancel.","keyIdea":"The X exits the upload dialog without invoking the file picker.","selector":"[data-ug-part=\"dialog-close\"]","scope":"context"},
        {"id":"context-dialog-cancel","partId":"dialog-cancel","title":"Cancel button","explanation":"Cancel action closes the upload dialog without choosing a file.","keyIdea":"Cancel closes the task after the drop surface has been considered.","selector":"[data-ug-part=\"dialog-cancel\"]","scope":"context"},
      ],
    },
  ],
  source: {
    ace: 'src/features/file-persistence/ui/OpenFromDeviceDialog.tsx',
    pfd: 'src/pfd/ShellDialogs.tsx',
    pbs: 'src/WorkspaceTools.tsx',
    hs: 'src/hs/ShellExtras.tsx',
    fd: 'src/App.jsx',
    agpd: 'src/agpd/ShellDialogs.tsx',
    rws: 'src/rws/ShellDialogs.tsx',
    adc: 'src/adc/components/NewProjectDialog.tsx',
  },
  summary: 'A dashed drop area with an icon, a prompt and a browse action in an upload dialog: drag a file in or pick one from the device.',
  where: 'The upload dialog: Open from device in ACE, Upload File in PFD, PBS, HS, FD, AGPD and RWS, New Project in ADC. HCS and ADM have no upload dialog. Real source: the paths in the case.',
  when: 'Use it to take one file from the user in a dialog. Use a plain Button that opens a file picker only when no drop target is wanted. PBS also wraps its input pane in `FileUploadDropzone`, an overlay shown only while a file is dragged over, which has no static state to catalogue.',
  how: '`FileUpload` with `multiple={false}`, `messages={{ idle: { text, action } }}` for the prompt, `onFilesChange` and, in ADC, `supportedExtensions={[".cap"]}`. One group: a Dialog with a raised Title and close X, the FileUpload in `Dialog.Body` and a Cancel in the Actions (apps differ in the prompt text and, in ADC, the accepted extension, which are content). The scene leaves out the file handlers and the size errors.',
  anatomy: [
    {
      id: "upload",
      name: "Upload area",
      selector: "[class~=\"aui-file-upload\"]",
      description: "The dashed single-file drop surface (multiple={false}) with the idle message, shown in the body of the upload dialog.",
    },
    {
      id: "icon",
      name: "Icon",
      selector: "[class~=\"aui-file-upload-icon\"]",
      description: "The upload icon at the top of the drop area.",
    },
    {
      id: "body",
      name: "Body",
      selector: "[class~=\"aui-file-upload-body\"]",
      description: "The row below the icon that holds the prompt and the browse action.",
    },
    {
      id: "label",
      name: "Prompt",
      selector: "[class~=\"aui-file-upload-label\"]",
      text: true,
      description: "The idle text \"Drop your file here or\" that invites a drag and drop.",
    },
    {
      id: "action",
      name: "Browse action",
      selector: "[class~=\"aui-file-upload-action\"]",
      description: "The \"Browse\" action that opens the device file picker as the alternative to dropping.",
    },
  ],
});
