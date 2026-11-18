import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Table',
  title: 'Column menu',
  apps: ['hcs', 'hs', 'pfd'],
  cases: [
    { id: 'hcs-column-menu', name: 'Column menu', apps: ['hcs', 'hs'], source: { hcs: 'src/components/ColumnMenu.tsx', hs: 'src/hs/ColumnMenu.tsx' } },
    { id: 'pfd-column-menu', name: 'Column menu', apps: ['pfd'], source: { pfd: 'src/pfd/ColumnMenu.tsx' } },
  ],
  source: { hcs: 'src/components/ColumnMenu.tsx', hs: 'src/hs/ColumnMenu.tsx', pfd: 'src/pfd/ColumnMenu.tsx' },
  summary: 'A small IconButton opens the menu of a table column header.',
  where: 'The header cell of each table column, beside the column title. Real site source: HCS (the actions slot of the results header in src/components/F01Results.tsx; the menu is src/components/ColumnMenu.tsx), HS (src/hs/ColumnMenu.tsx) and PFD (src/pfd/ColumnMenu.tsx).',
  when: 'Use it for a per-column menu where space is tight. It is smaller than the panel icon buttons and uses the surface color.',
  how: 'HCS: set aui color "surface", paint "text", profile "square-compact", shape "soft" and scale "xs" with the ellipsis-vertical glyph, and pass it to Table.HeaderCell through the actions prop: the kit lays the header out as label then actions, so the kebab sits at the end of each cell. In context the menu is open under the Load (lb) kebab (bottom, end, 4px offset): a View card (surface, solid, soft, elevation 4, 256px) over the table with the Sort radios (Sort A to Z (Smallest to Largest), Sort Z to A (Largest to Smallest), None); Search by text and Search by option are left out. Load is sorted ascending, so its rows run from smallest to largest. The scene shows two of the nine Output columns and two rows. HS renders the same as HCS: its trigger takes color "secondary" while its column is sorted or filtered (the filter glyph while filtered), which computes to the same near-black text, no fill and the same hover as the HCS "surface" kebab, so HCS and HS are one group. PFD (own group): the horizontal ellipsis glyph, secondary while sorted, the menu opens under the trigger towards the next column (bottom, start) and starts with a Close Button (profile "square", scale "sm", secondary text, alignSelf end) above the Sort radios; Search by text and Search by option are left out.',
});
