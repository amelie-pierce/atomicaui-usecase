import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: "results-table", name: "Results table", description: "The \"Connector calculation results\" Table with Model and Status columns; the Status cell of each row holds the Passed or Failed Chip." },
];

export default defineUsecase({
  uiType: 'Status chip',
  title: 'Tonal status with icon',
  apps: ['hcs'],
    layers: [
        {"id":"chip","partId":"chip","title":"Chip","explanation":"Tonal success chip marks Passed; failed rows use error colour.","keyIdea":"The status chip compresses each calculation outcome into a quickly scannable table value.","selector":"[class~=\"aui-chip\"]"},
        {"id":"icon","partId":"icon","title":"Icon","explanation":"Circle-check icon supports Passed; failed results show a cross.","keyIdea":"The leading glyph distinguishes a successful check from a failed result before its text is read.","selector":"[class~=\"aui-chip-icon\"]"},
      ],
options: [
    { id: "hcs-results-status", contextAnatomy: CONTEXT_ANATOMY, name: "Results status", source: {"hcs":"src/components/F01Results.tsx"} ,
      contextLayers: [
        {"id":"context-results-table","partId":"results-table","title":"Results table","explanation":"Connector results table pairs each model with its Passed or Failed status.","keyIdea":"The table keeps the connector result aligned with its Passed or Failed status.","selector":"[data-ug-part=\"results-table\"]","scope":"context"},
      ],
    },
  ],
  source: { hcs: 'src/components/F01Results.tsx' },
  summary: 'A tonal chip with a leading icon that states a result: success and a check for Passed, error and a cross for Failed.',
  where: 'The Status column of the HCS results table (src/components/F01Results.tsx). FD shows the status as a smaller chip with no icon (not catalogued).',
  when: 'Use it for a pass or fail state in a table cell. Use a Label chip to name a kind of item (Chip-001).',
  how: '`Chip` at `scale: "sm"`, `paint: "tonal"`, `color` `success` or `error` by the result, with `Chip.Icon` (circle-check or circle-xmark at `scale: "sm"`) before the text. The scene shows two rows, one per state, and leaves out the other columns.',
  anatomy: [
    {
      id: "chip",
      name: "Chip",
      selector: "[class~=\"aui-chip\"]",
      description: "The tonal success chip at scale \"sm\" shown in the Status column of the HCS results table; a Failed row swaps it for the error colour.",
    },
    {
      id: "icon",
      name: "Icon",
      selector: "[class~=\"aui-chip-icon\"]",
      description: "The leading \"circle-check\" icon at scale \"sm\" that backs the result with a glyph (a cross for Failed).",
    },
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-chip\"]",
      text: true,
      description: "The status text \"Passed\", written directly as the chip's children instead of a Chip.Label.",
    },
  ],
});
