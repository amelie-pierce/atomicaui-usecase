import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Button',
  apps: ['hcs'],
  title: 'Walkthrough navigation',
  summary: 'Borderless text Buttons step through a guided tour, with arrow-left before Previous, arrow-right after Next and check after End.',
  where: 'The card of a coach-mark walkthrough: Previous, Next, and End (the check icon replaces the arrow after the label on the last step). Real site source: HCS Button-003.',
  when: 'Use it for step navigation where no single step is the primary action, so neither Button is filled. Do not use it for form submission.',
  how: 'Set aui scale "sm", paint "text" and color "secondary" on both. Place Button.Icon before the label for backwards (arrow-left), after it for forwards (arrow-right, or check on the last step). Icons need the Font Awesome font to show.',
});
