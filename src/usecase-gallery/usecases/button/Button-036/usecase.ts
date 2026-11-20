import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Expand panel button',
  look: 'Ghost, 28px',
  apps: ['hcs'],
  cases: [
    { id: 'hcs-rail', name: 'Collapsed rail', apps: ['hcs'], source: { hcs: 'src/components/HcsSplitLayout.tsx' } },
  ],
  source: { hcs: 'src/components/HcsSplitLayout.tsx' },
  summary: 'A square transparent IconButton, 28px, expands a collapsed side panel from its rail.',
  where: 'A collapsed side rail that stands in for a panel (angle-right expands a horizontal one, angle-down a vertical one). Real site source: HCS src/components/HcsSplitLayout.tsx and panelSpec.ts (the rail and its sizes). '
    + 'No other app has a panel rail.',
  when: 'Use it as the single trigger of a collapsed panel; the expanded panel switches to the 20px header controls of Button-033. Always set aria-label.',
  how: 'Set aui color "secondary", paint "text", scale "sm", shape "soft" and profile "square" (28px, unlike the 20px contained header icons) on an IconButton, with a Tooltip carrying the aria-label text. '
    + 'The trigger is a Panels.Trigger, the kit trigger that renders the IconButton, whose targetId is the panel id, and a real Panels group holds the Input panel at its 40px collapsed size: the rail is a column that fills the panel height with the trigger at the top centre, beside the viewer pane, which is cut to its title (no canvas); the Input panel holds only its title; the vertical rail of the engineering layout (angle-down, trigger at the start corner) is not shown. '
    + 'One group, HCS only.',
});
