import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Form',
  contextVariant: 'label',
  title: 'Field help trigger',
  apps: ['hcs'],
  summary: 'A transparent contained circle-question IconButton sits right after a field label and opens its help.',
  where: 'The label row above the Download Duration select in Load Properties. Real site source: HCS Button-013 (the help trigger; its popover close is Button-003).',
  when: 'Use it to explain one field without adding permanent text. Always set aria-label; the popup it opens holds the long explanation.',
  how: 'Set aui scale "sm", profile "contained", color "secondary", paint "text" and shape "soft", with the circle-question glyph. In context the label row is a flex row (label text, then the icon) above the select; the open popover is Button-003.',
});
