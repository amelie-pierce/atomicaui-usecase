import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'IconButton',
  title: '(to merge)',
  apps: ['adc', 'fd'],
  source: { adc: 'src/adc/components/CapImportSteps.tsx', fd: 'src/components/RowExpansion.jsx' },
  cases: [
    { id: 'adc-preview', name: 'Detail table', apps: ['adc'], source: { adc: 'src/adc/components/CapImportSteps.tsx' } },
    { id: 'fd-details', name: 'Detail table', apps: ['fd'], source: { fd: 'src/components/RowExpansion.jsx' } },
  ],
  summary: 'A small key and value table that explains one item: a labelled data preview, or a list of check messages.',
  where: 'ADC Import step Data Preview (CapImportSteps.tsx) and FD Why Not details (RowExpansion.jsx, the failed and warning checks list).',
  when: 'Use it for a few facts about one record, inside a panel or an expanded row. For results of a calculation use Table-001 or Table-003.',
  how: 'Both are all-cells tonal tables at scale "sm". Two groups, measured in headless Chromium: ADC has a raised header row (FIELD, VALUE, STATUS) and plain left-aligned cells inside a 1px outlined soft frame; FD has no header, a 96px first cell that holds a tonal xs Chip (danger for Fail) and the message in the second cell. The scenes leave out the other data rows, the Show passed checkbox and the category tabs of the expanded row (the expander is Button-008).',
});
