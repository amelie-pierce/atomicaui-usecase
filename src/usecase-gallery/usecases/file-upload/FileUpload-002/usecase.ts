import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'FileUpload',
  title: 'Feedback attachments dropzone',
  apps: ['adm', 'pfd', 'pbs', 'hs', 'agpd', 'rws'],
    layers: [
        {"id":"chips","partId":"chips","title":"Attached file chip","explanation":"Attached filename chips appear above the upload area.","keyIdea":"An attached-file chip keeps each selected filename inspectable before submission.","selector":"[class~=\"aui-chip\"]"},
        {"id":"upload","partId":"upload","title":"Upload area","explanation":"Dashed multi-file drop surface adds attachments to the feedback form.","keyIdea":"The multi-file surface accepts repeated additions while keeping dropping available.","selector":"[class~=\"aui-file-upload\"]"},
        {"id":"icon","partId":"icon","title":"Icon","explanation":"The upload icon at the top of the drop area.","keyIdea":"The upload symbol marks the region where more attachments can be added.","selector":"[class~=\"aui-file-upload-icon\"]"},
        {"id":"action","partId":"action","title":"Browse action","explanation":"Browse opens the picker for adding files one at a time.","keyIdea":"Browse lets users add files one at a time from the device picker.","selector":"[class~=\"aui-file-upload-action\"]"},
      ],
options: [
    { id: "adm-attachments", contextAnatomy: [
      { id: 'form', name: 'Attachment block', description: 'The column that stacks the attached-file chips, the dropzone and the limits line inside the feedback form.' },
      { id: 'limits', name: 'Limits line', description: 'The muted "Up to 5 files, 10 MB each." caption under the dropzone.' },
    ], name: "Feedback attachments", apps: ["adm","pfd","pbs","hs","agpd","rws"], source: {"adm":"src/features/top-navigation/components/FeedbackDialog.tsx","pfd":"src/pfd/ShellDialogs.tsx","pbs":"src/WorkspaceTools.tsx","hs":"src/hs/ShellExtras.tsx","agpd":"src/agpd/ShellDialogs.tsx","rws":"src/rws/ShellDialogs.tsx"} ,
      contextLayers: [
        {"id":"context-form","partId":"form","title":"Attachment block","explanation":"Form column groups attached files, dropzone, and upload limits.","keyIdea":"The attachment block groups current files, the add-file target and its constraints.","selector":"[data-ug-part=\"form\"]","scope":"context"},
        {"id":"context-limits","partId":"limits","title":"Limits line","explanation":"Muted caption sets five-file and 10 MB per-file limits.","keyIdea":"The limits line states the per-file size and total count before users attach more.","selector":"[data-ug-part=\"limits\"]","scope":"context"},
      ],
    },
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
      selector: "[class~=\"aui-chip\"]",
      description: "The scene lists each attached file above the area as a default Chip with its name.",
    },
    {
      id: "upload",
      name: "Upload area",
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
