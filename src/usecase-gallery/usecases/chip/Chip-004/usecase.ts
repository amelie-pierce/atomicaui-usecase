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
      selector: "[class~=\"aui-chip\"]",
      description: "The compact solid success chip at scale \"xs\" that reports one check category on an FD result card; a failed category turns red.",
    },
    {
      id: "icon",
      name: "Icon",
      selector: "[class~=\"aui-chip-icon\"]",
      description: "The \"circle-check\" icon at the start of the chip (an exclamation when the check fails).",
    },
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-chip-label\"]",
      text: true,
      description: "The category name \"Anchorage\".",
    },
  ],
});
