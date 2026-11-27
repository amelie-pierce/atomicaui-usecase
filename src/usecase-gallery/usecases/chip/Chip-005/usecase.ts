import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: "attach-label", name: "Attachment heading", description: "The \"Attach Screenshot or Markups\" l4 caption above the attached files." },
  { id: "attachment-row", name: "Attachment row", description: "The wrapping flex row (8px gap) that lists one Chip per attached file, such as screenshot.png and markup.pdf." },
];

export default defineUsecase({
  uiType: 'Dismissible chip',
  title: 'Attachment chip',
  apps: ['adm', 'pfd', 'pbs', 'hs', 'agpd', 'rws'],
options: [
    { id: "adm-attachments", contextAnatomy: CONTEXT_ANATOMY, name: "Feedback attachments", source: {"adm":"src/features/top-navigation/components/FeedbackDialog.tsx","pfd":"src/pfd/ShellDialogs.tsx","pbs":"src/WorkspaceTools.tsx","hs":"src/hs/ShellExtras.tsx","agpd":"src/agpd/ShellDialogs.tsx","rws":"src/rws/ShellDialogs.tsx"} ,
     contextAnatomyOverrides: [{"id":"attach-label","lesson":{"explanation":"The \"Attach Screenshot or Markups\" l4 caption above the attached files.","selector":"[data-ug-part=\"attach-label\"]","scope":"context"}},{"id":"attachment-row","lesson":{"explanation":"Wrapping row lists each attached file chip with an 8px gap.","selector":"[data-ug-part=\"attachment-row\"]","scope":"context"}}]},
  ],
  source: {
    adm: 'src/features/top-navigation/components/FeedbackDialog.tsx',
    pfd: 'src/pfd/ShellDialogs.tsx',
    pbs: 'src/WorkspaceTools.tsx',
    hs: 'src/hs/ShellExtras.tsx',
    agpd: 'src/agpd/ShellDialogs.tsx',
    rws: 'src/rws/ShellDialogs.tsx',
  },
  summary: 'A default chip with a name and a dismiss X, one per file the user attached.',
  where: 'The Feedback form of ADM, PFD, PBS, HS, AGPD and RWS, above the upload area (FileUpload-002).',
  when: 'Use it for a value the user added and may remove. Use a Label chip for a read-only tag (Chip-001).',
  how: '`Chip` with default aui, one `Chip.Label` and `Chip.Dismiss` with an aria-label naming the file ("Remove markup.pdf"); `onClick` on the dismiss removes the file. The chips wrap in a flex row (gap 8). The six apps render the same chip, so there is one group; the scene leaves out the upload area and the size errors.',
  anatomy: [
    {
      id: "chip",
      name: "Chip",
      selector: "[class~=\"aui-chip\"]",
      description: "The default-styled chip that stands for one attached file in the Feedback form of ADM, PFD, PBS, HS, AGPD and RWS.",
     lesson: {"explanation":"Default chip represents one attached file in feedback forms."}},
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-chip-label\"]",
      text: true,
      description: "The attached file name, screenshot.png.",
    },
    {
      id: "dismiss",
      name: "Dismiss",
      selector: "[class~=\"aui-chip-dismiss\"]",
      description: "The X button at the end, labelled \"Remove screenshot.png\", that detaches the file.",
     lesson: {"explanation":"End X removes the attached screenshot from the feedback form."}},
  ],
});
