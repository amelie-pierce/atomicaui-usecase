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
});
