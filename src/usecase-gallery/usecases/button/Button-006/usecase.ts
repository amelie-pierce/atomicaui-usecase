import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Button',
  apps: ['hcs'],
  title: 'Neutral default action',
  summary: 'The default gray Button, with or without a leading icon, for recovery and reset actions.',
  where: 'Error screens and table toolbars: Try again (Retry), Reset filters. Real site source: HCS Button-005 and Button-007.',
  when: 'Use it for a plain action that needs no emphasis. The real site uses it even when the Button is the only action on screen, so consider "secondary" there.',
  how: 'Set only aui scale "sm"; color "surface-alt" and paint "solid" are the defaults. Add Button.Icon before the label for the icon variant.',
});
