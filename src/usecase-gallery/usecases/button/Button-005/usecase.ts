import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Walkthrough',
  contextVariant: 'last',
  title: 'Last step: End',
  apps: ['hcs'],
  summary: 'A borderless text Button with a check after the label finishes the guided tour.',
  where: 'The card of a coach-mark walkthrough, on the last step, where it replaces Next. Real site source: HCS Button-003 (End). Earlier steps use Previous and Next (Button-004).',
  when: 'Use it to close a flow that has been walked through, not to dismiss it early; for that use the close icon (Button-006).',
  how: 'Set aui scale "sm", paint "text" and color "secondary", with Button.Icon check after the label (the arrow of Next becomes the check). In context this is the last-step card: Previous and End at the start, the counter at the end, placed with the same inline styles as Button-004.',
});
