import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Table',
  contextVariant: 'header',
  title: 'Column menu',
  apps: ['hcs'],
  source: { hcs: 'src/components/ColumnMenu.tsx' },
  summary: 'A small IconButton opens the menu of a table column header.',
  where: 'The header cell of each table column, beside the column title. Real site source: HCS Button-014 (the actions slot of the results header in src/components/F01Results.tsx; the menu is src/components/ColumnMenu.tsx).',
  when: 'Use it for a per-column menu where space is tight. It is smaller than the panel icon buttons and uses the surface color.',
  how: 'Set aui color "surface", paint "text", profile "square-compact", shape "soft" and scale "xs", and pass it to Table.HeaderCell through the actions prop: the kit lays the header out as label then actions, so the kebab sits at the end of each cell. In context the menu is the column menu of the app, open under the Load (lb) kebab (bottom, end, 4px offset): a View card (surface, solid, soft, elevation 4, 256px) over the table with the Sort radios (Sort A to Z (Smallest to Largest), Sort Z to A (Largest to Smallest), None); Search by text and Search by option are left out. The table follows the choice: Load is sorted ascending, so its rows run from smallest to largest. The scene shows two of the nine Output columns and two rows.',
});
