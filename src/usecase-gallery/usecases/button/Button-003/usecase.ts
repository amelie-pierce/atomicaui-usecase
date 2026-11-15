import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Button',
  apps: ['hcs'],
  title: 'Popover footer',
  summary: 'An icon-only reset, a ghost text Cancel and a solid secondary Save close a popover.',
  where: 'The footer of a popover form, such as the column configurator: a reset icon, Cancel, Save. Real site source: HCS Button-016. Dialogs use a gray solid Cancel instead (Button-002).',
  when: 'Use it when the popover is lightweight and the Cancel should not compete with Save. Prefer the filled Cancel of Button-002 in dialogs; the real site spells the two differently.',
  how: 'Cancel sets aui scale "sm" (to match Save\'s height) and paint "text" (default color, no fill). Save sets scale "sm", color "secondary" and paint "solid". Cancel and Save carry no icon; the reset is an IconButton with the rotate-left glyph, name only, aui paint "text", and needs an aria-label.',
});
