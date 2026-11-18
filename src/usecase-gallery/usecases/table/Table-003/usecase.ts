import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Summary',
  title: 'Calculation summary table',
  apps: ['adm', 'adc'],
  source: { adm: 'src/features/calculation/components/shared/ResultTable.tsx', adc: 'src/adc/components/ResultTable.tsx' },
  cases: [
    { id: 'adm-summary', name: 'Summary table', apps: ['adm'], source: { adm: 'src/features/calculation/components/shared/ResultTable.tsx' } },
    { id: 'adc-summary', name: 'Summary table', apps: ['adc'], source: { adc: 'src/adc/components/ResultTable.tsx' } },
  ],
  summary: 'A short calculation summary table: rows separated by lines in a soft frame under a raised header band.',
  where: 'The calculation summary and result detail tables: ADM shared/ResultTable.tsx (used by LimitStateTable, GoverningRatioTable and InteractionTable, with StatusCell) and ADC ResultTable.tsx (the calculation summary).',
  when: 'Use it for a few labelled numeric rows that the user reads but does not select or sort. For a scrolling, sortable grid use the Results grid (Table-001); for a paper copy use the Print table (Table-004).',
  how: 'Table with border "between-rows", aui shape "soft" and a 1px outlined frame (the four border widths, borderColor "outlined", overflow "hidden"), headerCellAui color "raised". A Table.HeaderCell with its own aui replaces headerCellAui, so each one repeats color "raised". Two groups, measured in headless Chromium: ADM centres headers and cells (text-align center) with the first column left, puts a full-width title band (colSpan) above the column headers, and leads the Ratio cell with a coloured status dot Symbol (success below 100%, error from 100%, muted for N/A); ADC right-aligns every header and cell (text-align right) with the first column left, and sets a bracketed unit in the header in the Symbol font. The scenes leave out the other tables of the tabs and the dot colours other than success.',
});
