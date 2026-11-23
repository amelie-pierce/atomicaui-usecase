import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Status chip',
  title: 'Tonal status with icon',
  apps: ['hcs'],
  cases: [{ id: 'hcs-results-status', name: 'Results status', source: { hcs: 'src/components/F01Results.tsx' } }],
  source: { hcs: 'src/components/F01Results.tsx' },
  summary: 'A tonal chip with a leading icon that states a result: success and a check for Passed, error and a cross for Failed.',
  where: 'The Status column of the HCS results table (src/components/F01Results.tsx). FD shows the status as a smaller chip with no icon (not catalogued).',
  when: 'Use it for a pass or fail state in a table cell. Use a Label chip to name a kind of item (Chip-001).',
  how: '`Chip` at `scale: "sm"`, `paint: "tonal"`, `color` `success` or `error` by the result, with `Chip.Icon` (circle-check or circle-xmark at `scale: "sm"`) before the text. The scene shows two rows, one per state, and leaves out the other columns.',
  anatomy: [
    {
      id: "chip",
      name: "Chip",
      token: "Chip",
      selector: "[class~=\"aui-chip\"]",
      description: "The tonal success chip at scale \"sm\" shown in the Status column of the HCS results table; a Failed row swaps it for the error colour.",
      code: [
        "<Chip aui={{ scale: 'sm', color: 'success', paint: 'tonal' }}>",
        "  …",
        "</Chip>",
      ].join("\n"),
    },
    {
      id: "icon",
      name: "Icon",
      token: "Chip.Icon",
      selector: "[class~=\"aui-chip-icon\"]",
      description: "The leading \"circle-check\" icon at scale \"sm\" that backs the result with a glyph (a cross for Failed).",
      code: [
        "<Chip.Icon name=\"circle-check\" aui={{ scale: 'sm' }} />",
      ].join("\n"),
    },
    {
      id: "label",
      name: "Label",
      token: "Chip",
      selector: "[class~=\"aui-chip\"]",
      text: true,
      description: "The status text \"Passed\", written directly as the chip's children instead of a Chip.Label.",
      code: [
        "Passed",
      ].join("\n"),
    },
  ],
});
