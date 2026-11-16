import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Popover',
  title: 'Help popover close',
  apps: ['hcs'],
  contextVariant: 'close',
  summary: 'A transparent X IconButton closes a help popover.',
  where: 'The corner of a popover that explains a panel, beside the circle-question help trigger of Button-011. Real site source: HCS Button-013.',
  when: 'Use it to dismiss a popover that has no footer. It is the compact square profile, not the contained header size, so it stays out of the way of the text.',
  how: 'In context the X sits at the end of the intro row, top right of the popup, above sample notes; the popup is a static View card (surface, solid, soft, elevation 4). Set aui color "secondary", paint "text", scale "sm", shape "soft" and profile "square-compact", plus sx flex "none". The glyph is xmark and the IconButton needs an aria-label.',
});
