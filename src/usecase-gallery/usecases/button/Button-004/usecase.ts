import { defineUsecase } from '../../../define';

export default defineUsecase({
  title: 'Walkthrough navigation',
  summary: 'Borderless text Buttons step through a guided tour, with the icon before Previous and after Next.',
  where: 'The card of a coach-mark walkthrough: Previous, Next, and End (a check icon after the label on the last step). Real site source: HCS Button-003.',
  when: 'Use it for step navigation where no single step is the primary action, so neither Button is filled. Do not use it for form submission.',
  how: 'Set aui scale "sm", paint "text" and color "secondary" on both. Place Button.Icon before the label for backwards, after it for forwards. Icons need the Font Awesome font to show.',
});
