import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: "check-row", name: "Check category row", description: "The flex row (8px gap) that lists one Chip per check category: Anchorage passed and Bearing failed." },
];

export default defineUsecase({
  uiType: 'Status chip',
  title: 'Compact solid status',
  apps: ['fd'],
    layers: [
        {"id":"chip","partId":"chip","title":"Chip","explanation":"Compact success chip reports a check category; failures turn red.","keyIdea":"A compact chip summarizes one category outcome without taking over the result card.","selector":"[class~=\"aui-chip\"]"},
        {"id":"icon","partId":"icon","title":"Icon","explanation":"Circle-check leads the chip; failed checks show an exclamation.","keyIdea":"The status glyph lets users compare category checks by shape as well as color.","selector":"[class~=\"aui-chip-icon\"]"},
      ],
options: [
    { id: "fd-checks", contextAnatomy: CONTEXT_ANATOMY, name: "Check categories", source: {"fd":"src/components/Results.jsx"} ,
      contextLayers: [
        {"id":"context-check-row","partId":"check-row","title":"Check category row","explanation":"Eight-pixel gap separates each passed or failed category chip.","keyIdea":"The row groups related category outcomes so passed and failed checks can be compared together.","selector":"[data-ug-part=\"check-row\"]","scope":"context"},
      ],
    },
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
