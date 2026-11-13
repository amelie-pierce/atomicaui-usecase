import { defineUsecase } from '../../../define';

export default defineUsecase({
  title: 'Popover footer',
  summary: 'A ghost text Cancel sits beside a solid secondary Save in a popover.',
  where: 'The footer of a popover form, such as the column configurator: Cancel, Save. Real site source: HCS Button-016. Dialogs use a gray solid Cancel instead (Button-002).',
  when: 'Use it when the popover is lightweight and the Cancel should not compete with Save. Prefer the filled Cancel of Button-002 in dialogs; the real site spells the two differently.',
  how: 'Cancel sets aui paint "text" (default color, no fill). Save sets scale "sm", color "secondary" and paint "solid".',
});
