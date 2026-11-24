import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Status chip',
  title: 'Compact solid status',
  apps: ['fd'],
  options: [
    { id: "fd-checks", name: "Check categories", source: {"fd":"src/components/Results.jsx"} },
  ],
  source: { fd: 'src/components/Results.jsx' },
  summary: 'A compact solid chip with an icon for each check category of a result: green and a check when it passes, red and an exclamation when it fails.',
  where: 'Below the model header of each FD result card (src/components/Results.jsx).',
  when: 'Use it for several short states side by side. Use the tonal chip (Chip-003) in a table cell.',
  how: '`Chip` at `scale: "xs"`, `paint: "solid"`, `color` `success` or `danger`, with `Chip.Icon` and `Chip.Label`. The chips sit in a flex row with gap 8. The scene shows one pass and one fail and leaves out the warning messages.',
  anatomy: [
    {
      id: "chip",
      name: "Chip",
      token: "Chip",
      selector: "[class~=\"aui-chip\"]",
      description: "The compact solid success chip at scale \"xs\" that reports one check category on an FD result card; a failed category turns red.",
      code: [
        "<Chip aui={{ color: 'success', paint: 'solid', scale: 'xs' }}>",
        "  …",
        "</Chip>",
      ].join("\n"),
    },
    {
      id: "icon",
      name: "Icon",
      token: "Chip.Icon",
      selector: "[class~=\"aui-chip-icon\"]",
      description: "The \"circle-check\" icon at the start of the chip (an exclamation when the check fails).",
      code: [
        "<Chip.Icon name=\"circle-check\" />",
      ].join("\n"),
    },
    {
      id: "label",
      name: "Label",
      token: "Chip.Label",
      selector: "[class~=\"aui-chip-label\"]",
      text: true,
      description: "The category name \"Anchorage\".",
      code: [
        "<Chip.Label>Anchorage</Chip.Label>",
      ].join("\n"),
    },
  ],
});
