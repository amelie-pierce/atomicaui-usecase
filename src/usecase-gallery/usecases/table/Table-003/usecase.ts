import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Data table',
  title: 'Summary table',
  apps: ['adm', 'adc', 'fd'],
  source: {
    adm: 'src/features/calculation/components/shared/ResultTable.tsx',
    adc: 'src/adc/components/ResultTable.tsx',
    fd: 'src/components/RowExpansion.jsx',
  },
  cases: [
    { id: 'adm-summary', name: 'Summary table', apps: ['adm'], source: { adm: 'src/features/calculation/components/shared/ResultTable.tsx' } },
    { id: 'adc-summary', name: 'Summary table', apps: ['adc'], source: { adc: 'src/adc/components/ResultTable.tsx' } },
    { id: 'adc-preview', name: 'Data preview table', apps: ['adc'], source: { adc: 'src/adc/components/CapImportSteps.tsx' } },
    { id: 'fd-details', name: 'Check details table', apps: ['fd'], source: { fd: 'src/components/RowExpansion.jsx' } },
  ],
  summary: 'A short table of a few labelled rows under a raised header band: a calculation summary, a data preview or a list of check messages.',
  where: 'The calculation summary and result detail tables: ADM shared/ResultTable.tsx (used by LimitStateTable, GoverningRatioTable and InteractionTable, with StatusCell) and ADC ResultTable.tsx (the calculation summary); the ADC Import step Data Preview (CapImportSteps.tsx); the FD Why Not details (RowExpansion.jsx, the failed and warning checks list).',
  when: 'Use it for a few labelled rows that the user reads but does not select or sort, or for a few facts about one record inside a panel or an expanded row. For a scrolling, sortable grid use the Results grid (Table-001); for a paper copy use the Print table (Table-004).',
  how: 'Table with a raised header band (headerCellAui color "raised"; a Table.HeaderCell with its own aui replaces headerCellAui, so each one repeats color "raised"), aui shape "soft" and a 1px outlined frame (the four border widths, borderColor "outlined"). Four groups, one scene each, measured in headless Chromium: ADM (border "between-rows", overflow "hidden") centres headers and cells (text-align center) with the first column left, puts a full-width title band (colSpan) above the column headers, and leads the Ratio cell with a coloured status dot Symbol (success below 100%, error from 100%, muted for N/A); ADC summary (the same between-rows frame) right-aligns every header and cell (text-align right) with the first column left, and sets a bracketed unit in the header in the Symbol font; ADC Data Preview is an all-cells tonal grid (border "all-cells", borderStyle "tonal") at scale "sm" with a raised header row (FIELD, VALUE, STATUS) and plain left-aligned cells; FD Why Not details is the same all-cells tonal grid at scale "sm" with no header, a 96px first cell that holds a tonal xs Chip (danger for Fail) and the message in the second cell. The scenes leave out the other tables of the tabs, the dot colours other than success, the other data rows, the Show passed checkbox and the category tabs of the expanded row (the expander is Button-008).',
});
