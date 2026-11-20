import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Data table',
  title: 'Check details table',
  apps: ['fd'],
  cases: [
    {
      id: 'fd-details',
      name: 'Check details table',
      apps: ['fd'],
      source: { fd: 'src/components/RowExpansion.jsx' },
    },
  ],
  source: {
    fd: 'src/components/RowExpansion.jsx',
  },
  summary: 'A header-less table of check messages inside an expanded result row: a status Chip and the message of each failed or warning check.',
  where: 'FD: the Why Not details of an expanded result row (RowExpansion.jsx, the failed and warning checks list). The expander is Button-028 and the Show passed filter is Checkbox-003.',
  when: 'Use it for a few facts about one record inside a panel or an expanded row, read and not selected or sorted. For a calculation summary use Table-003.',
  how: 'The same all-cells tonal grid at scale "sm" with no header, a 96px first cell that holds a tonal xs Chip (danger for Fail) and the message in the second cell. The scene leaves out the other data rows, the Show passed checkbox and the category tabs of the expanded row.',
});
