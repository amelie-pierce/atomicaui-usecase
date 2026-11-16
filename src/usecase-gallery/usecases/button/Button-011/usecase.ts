import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Panel',
  title: 'Panel header controls',
  apps: ['hcs'],
  summary: 'Transparent contained IconButtons in a panel header collapse, expand, configure and explain the panel.',
  where: 'Panel headers: angle-left collapses the panel, arrows-to-line and arrows-from-line collapse and expand all rows, table-columns configures columns, circle-question opens help. Real site source: HCS Button-011 and Button-013 (help).',
  when: 'Use it for an icon-only control in panel chrome. The contained profile is the header standard. Always set aria-label.',
  how: 'Set aui color "secondary", paint "text", scale "sm", shape "soft" and profile "contained". IconButton is a kit part and needs the Font Awesome font to show its glyph.',
});
