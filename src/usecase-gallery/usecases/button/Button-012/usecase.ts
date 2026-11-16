import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Panel',
  title: 'Collapsed side rail',
  apps: ['hcs'],
  summary: 'Square transparent IconButtons on a collapsed rail expand their panel, horizontal or vertical.',
  where: 'A collapsed side rail that stands in for a panel: angle-right expands a horizontal one, angle-down a vertical one. Real site source: HCS Button-012.',
  when: 'Use it as the single trigger of a collapsed panel. The square profile suits a rail; the expanded panel switches to the header controls of Button-011. Always set aria-label.',
  how: 'Set aui color "secondary", paint "text", scale "sm", shape "soft" and profile "square".',
});
