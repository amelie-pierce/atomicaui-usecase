import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Table',
  contextVariant: 'header',
  title: 'Column menu',
  apps: ['hcs'],
  summary: 'A small IconButton opens the menu of a table column header.',
  where: 'The header cell of each table column, beside the column title. Real site source: HCS Button-014.',
  when: 'Use it for a per-column menu where space is tight. It is smaller than the panel icon buttons and uses the surface color.',
  how: 'Set aui color "surface", paint "text", profile "square-compact", shape "soft" and scale "xs", and pass it to Table.HeaderCell through the actions prop: the kit lays the header out as label then actions, so the kebab sits at the end of each cell. In context the menu is a static View card (surface, solid, soft, elevation 4, 256px) below the header, not a floating popover.',
});
