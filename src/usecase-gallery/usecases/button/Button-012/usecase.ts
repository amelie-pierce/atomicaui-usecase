import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Panel',
  contextVariant: 'rail',
  title: 'Collapsed side rail',
  apps: ['hcs'],
  source: { hcs: 'src/components/HcsSplitLayout.tsx' },
  summary: 'Square transparent IconButtons on a collapsed rail expand their panel, horizontal or vertical.',
  where: 'A collapsed side rail that stands in for a panel: angle-right expands a horizontal one, angle-down a vertical one. Real site source: HCS Button-012. Built from src/components/HcsSplitLayout.tsx and panelSpec.ts (the rail and its sizes).',
  when: 'Use it as the single trigger of a collapsed panel. The square profile suits a rail; the expanded panel switches to the header controls of Button-011. Always set aria-label.',
  how: 'Set aui color "secondary", paint "text", scale "sm", shape "soft" and profile "square" (28px, unlike the 20px contained header icons) on a Panels.Trigger whose targetId is the panel id, with a Tooltip carrying the aria-label text. In context a real Panels group holds the Input panel at its 40px collapsed size: the rail is a column that fills the panel height with the trigger at the top centre, beside the viewer pane. The vertical rail of the engineering layout (angle-down, trigger at the start corner) is not shown.',
});
