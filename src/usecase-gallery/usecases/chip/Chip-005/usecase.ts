import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dismissible chip',
  title: 'Attachment chip',
  apps: ['adm', 'pfd', 'pbs', 'hs', 'agpd', 'rws'],
  cases: [
    {
      id: 'adm-attachments',
      name: 'Feedback attachments',
      source: {
        adm: 'src/features/top-navigation/components/FeedbackDialog.tsx',
        pfd: 'src/pfd/ShellDialogs.tsx',
        pbs: 'src/WorkspaceTools.tsx',
        hs: 'src/hs/ShellExtras.tsx',
        agpd: 'src/agpd/ShellDialogs.tsx',
        rws: 'src/rws/ShellDialogs.tsx',
      },
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
  summary: 'A default chip with a name and a dismiss X, one per file the user attached.',
  where: 'The Feedback form of ADM, PFD, PBS, HS, AGPD and RWS, above the upload area (FileUpload-002).',
  when: 'Use it for a value the user added and may remove. Use a Label chip for a read-only tag (Chip-001).',
  how: '`Chip` with default aui, one `Chip.Label` and `Chip.Dismiss` with an aria-label naming the file ("Remove markup.pdf"); `onClick` on the dismiss removes the file. The chips wrap in a flex row (gap 8). The six apps render the same chip, so there is one group; the scene leaves out the upload area and the size errors.',
  anatomy: [
    {
      id: "chip",
      name: "Chip",
      token: "Chip",
      selector: "[class~=\"aui-chip\"]",
      description: "The default-styled chip that stands for one attached file in the Feedback form of ADM, PFD, PBS, HS, AGPD and RWS.",
      code: [
        "<Chip>",
        "  …",
        "</Chip>",
      ].join("\n"),
    },
    {
      id: "label",
      name: "Label",
      token: "Chip.Label",
      selector: "[class~=\"aui-chip-label\"]",
      text: true,
      description: "The attached file name, screenshot.png.",
      code: [
        "<Chip.Label>screenshot.png</Chip.Label>",
      ].join("\n"),
    },
    {
      id: "dismiss",
      name: "Dismiss",
      token: "Chip.Dismiss",
      selector: "[class~=\"aui-chip-dismiss\"]",
      description: "The X button at the end, labelled \"Remove screenshot.png\", that detaches the file.",
      code: [
        "<Chip.Dismiss aria-label=\"Remove screenshot.png\" />",
      ].join("\n"),
    },
  ],
});
