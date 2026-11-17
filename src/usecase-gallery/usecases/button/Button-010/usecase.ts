import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Output header',
  contextVariant: 'helpers',
  title: 'Scroll helpers',
  apps: ['hcs'],
  source: { hcs: 'src/useOutputNavigation.tsx' },
  summary: 'Text Buttons with an arrow jump to the top of a long table or down to its notes.',
  where: 'The first two items of the Output pane header action group, shown only while the pane is scrolled; they do not float over the table. Real site source: HCS Button-009 (Back to top, Table Notes). Built from src/useOutputNavigation.tsx (thresholds, labels) and the Output pane header in src/App.tsx.',
  when: 'Use it for in-page jumps in a long scrolling view. Show each one only when it applies, and give it an aria-label that names the target.',
  how: "Set aui color \"secondary\", paint \"text\" and scale \"sm\", with Button.Icon arrow-up or arrow-down before the label. In context they are the first two items of the Output header action group, before Print Output, shown as they are once the results are scrolled: the app reveals Back to top after 80px of scroll (hides below 20px) and Table Notes while the notes heading is below the pane, and turns both icon-only when the labels do not fit the header row (this scene shows the labelled state; Configure columns, the toolbar and the table are left out).",
});
