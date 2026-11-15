import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Button',
  apps: ['hcs'],
  title: 'Column kebab',
  summary: 'A small IconButton opens the menu of a table column header.',
  where: 'The header cell of each table column, beside the column title. Real site source: HCS Button-014.',
  when: 'Use it for a per-column menu where space is tight. It is smaller than the panel icon buttons and uses the surface color.',
  how: 'Set aui color "surface", paint "text", profile "square-compact", shape "soft" and scale "xs".',
});
