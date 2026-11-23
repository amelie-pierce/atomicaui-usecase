import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'FileUpload',
  title: 'Upload file dialog dropzone',
  apps: ['ace', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
  cases: [
    {
      id: 'ace-open-device',
      name: 'Upload file dialog',
      apps: ['ace', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
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
      token: "FileUpload",
      selector: "[class~=\"aui-file-upload\"]",
      description: "The dashed single-file drop surface (multiple={false}) with the idle message, shown in the body of the upload dialog.",
      code: [
        "<FileUpload multiple={false} messages={{ idle: { text: 'Drop your file here or', action: 'Browse' } }} />",
      ].join("\n"),
    },
    {
      id: "icon",
      name: "Icon",
      selector: "[class~=\"aui-file-upload-icon\"]",
      description: "The upload icon at the top of the drop area.",
      code: [
        "<FileUpload multiple={false} messages={{ idle: { text: 'Drop your file here or', action: 'Browse' } }} />",
      ].join("\n"),
    },
    {
      id: "body",
      name: "Body",
      selector: "[class~=\"aui-file-upload-body\"]",
      description: "The row below the icon that holds the prompt and the browse action.",
      code: [
        "<FileUpload multiple={false} messages={{ idle: { text: 'Drop your file here or', action: 'Browse' } }} />",
      ].join("\n"),
    },
    {
      id: "label",
      name: "Prompt",
      selector: "[class~=\"aui-file-upload-label\"]",
      text: true,
      description: "The idle text \"Drop your file here or\" that invites a drag and drop.",
      code: [
        "messages={{ idle: { text: 'Drop your file here or', … } }}",
      ].join("\n"),
    },
    {
      id: "action",
      name: "Browse action",
      selector: "[class~=\"aui-file-upload-action\"]",
      description: "The \"Browse\" action that opens the device file picker as the alternative to dropping.",
      code: [
        "messages={{ idle: { …, action: 'Browse' } }}",
      ].join("\n"),
    },
  ],
});
