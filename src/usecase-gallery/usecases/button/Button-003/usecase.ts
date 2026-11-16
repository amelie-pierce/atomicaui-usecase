import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Popover',
  title: 'Help popover close',
  apps: ['hcs'],
  contextVariant: 'close',
  summary: 'A transparent X IconButton closes a help popover.',
  where: 'The corner of a popover that explains a panel, beside the circle-question help trigger of Button-011. Real site source: HCS Button-013.',
  when: 'Use it to dismiss a popover that has no footer. It is the compact square profile, not the contained header size, so it stays out of the way of the text.',
  how: 'Set aui color "secondary", paint "text", scale "sm", shape "soft" and profile "square-compact", plus sx flex "none". The glyph is xmark and the IconButton needs an aria-label.',
});
