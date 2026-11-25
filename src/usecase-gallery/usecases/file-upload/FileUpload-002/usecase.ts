import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'FileUpload',
  title: 'Feedback attachments dropzone',
  apps: ['adm', 'pfd', 'pbs', 'hs', 'agpd', 'rws'],
  options: [
    { id: "adm-attachments", name: "Feedback attachments", apps: ["adm","pfd","pbs","hs","agpd","rws"], source: {"adm":"src/features/top-navigation/components/FeedbackDialog.tsx","pfd":"src/pfd/ShellDialogs.tsx","pbs":"src/WorkspaceTools.tsx","hs":"src/hs/ShellExtras.tsx","agpd":"src/agpd/ShellDialogs.tsx","rws":"src/rws/ShellDialogs.tsx"} },
  ],
  source: {
    adm: 'src/features/top-navigation/components/FeedbackDialog.tsx',
    pfd: 'src/pfd/ShellDialogs.tsx',
    pbs: 'src/WorkspaceTools.tsx',
    hs: 'src/hs/ShellExtras.tsx',
    agpd: 'src/agpd/ShellDialogs.tsx',
    rws: 'src/rws/ShellDialogs.tsx',
  },
  summary: 'A dashed drop area in the Feedback form that attaches several files: the attached files as Chips above the dropzone.',
  where: 'The attachment block of the Feedback form (ADM, PFD, PBS, HS, AGPD, RWS). Real source: the paths in the case.',
  when: 'Use it to take several optional files with a form the user submits once. Use the upload dialog dropzone (FileUpload-001) when the file is the whole action of the dialog.',
  how: '`FileUpload` with `multiple`, `messages={{ idle: { text, action } }}` for the prompt and `onFilesChange`. One group: the attached files as Chips (Chip-005) above the dropzone, with a limits line below. The scene leaves out the file handlers and the size errors.',
  anatomy: [
    {
      id: "chips",
      name: "Attached file chip",
      token: "Chip",
      selector: "[class~=\"aui-chip\"]",
      description: "The scene lists each attached file above the area as a default Chip with its name.",
    },
    {
      id: "upload",
      name: "Upload area",
      token: "FileUpload",
      selector: "[class~=\"aui-file-upload\"]",
      description: "The dashed multi-file drop surface (multiple) in the Feedback form attachment block, with the idle message.",
    },
    {
      id: "icon",
      name: "Icon",
      selector: "[class~=\"aui-file-upload-icon\"]",
      description: "The upload icon at the top of the drop area.",
    },
    {
      id: "label",
      name: "Prompt",
      selector: "[class~=\"aui-file-upload-label\"]",
      text: true,
      description: "The idle text \"Drop your file here or\" next to the browse action.",
    },
    {
      id: "action",
      name: "Browse action",
      selector: "[class~=\"aui-file-upload-action\"]",
      description: "The \"Browse\" action that opens the file picker so several files can be added one after another.",
    },
  ],
});
