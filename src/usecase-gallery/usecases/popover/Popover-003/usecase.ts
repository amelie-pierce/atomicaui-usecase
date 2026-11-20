import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Popover',
  title: 'Column menu',
  apps: ['hcs', 'hs', 'pfd'],
  cases: [
    { id: 'hcs-column-menu', name: 'Column menu', apps: ['hcs', 'hs'], source: { hcs: 'src/components/ColumnMenu.tsx', hs: 'src/hs/ColumnMenu.tsx' } },
    { id: 'pfd-column-menu', name: 'Column menu', apps: ['pfd'], source: { pfd: 'src/pfd/ColumnMenu.tsx' } },
  ],
  source: { hcs: 'src/components/ColumnMenu.tsx', hs: 'src/hs/ColumnMenu.tsx', pfd: 'src/pfd/ColumnMenu.tsx' },
  summary: 'A popover of choices opened from the kebab of a table header cell: the Sort radios for that column.',
  where: 'The header cell of the results table in HCS, HS and PFD. Real source: ColumnMenu.tsx of each app.',
  when: 'Use it for the options of one column. Do not use it for a form with a footer (Popover-002).',
  how: 'The kebab `IconButton` (Button-021) is passed through the header cell `actions`; the Popover opens under it (`side="bottom"`, `sideOffset={4}`), a 256px `View` column (surface, solid, soft, elevation 4, gap 12) holding a `RadioGroup`. HCS and HS open to the cell end (`align="end"`); PFD opens towards the next column (`align="start"`) and starts the popup with a Close Button. The scenes leave out the search fields and filters.',
});
