import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Output header',
  contextVariant: 'helpers',
  title: 'Scroll helpers',
  apps: ['hcs'],
  summary: 'Text Buttons with an arrow jump to the top of a long table or down to its notes.',
  where: 'The first two items of the Output pane header action group, shown only while the pane is scrolled; they do not float over the table. Real site source: HCS Button-009 (Back to top, Table Notes).',
  when: 'Use it for in-page jumps in a long scrolling view. Show each one only when it applies, and give it an aria-label that names the target.',
  how: 'Set aui color "secondary", paint "text" and scale "sm", with Button.Icon arrow-up or arrow-down before the label. In context they sit left of the Configure columns icon and Print Output in the same right-aligned group.',
});
