import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Walkthrough',
  title: 'Step navigation: Previous and Next',
  apps: ['hcs'],
  summary: 'Borderless text Buttons step back and forward through a guided tour, with arrow-left before Previous and arrow-right after Next.',
  where: 'The card of a coach-mark walkthrough, on every step that is not the last. Real site source: HCS Button-003 (Previous and Next). The last step swaps Next for End (Button-005).',
  when: 'Use it for step navigation where no single step is the primary action, so neither Button is filled. Do not use it for form submission.',
  how: 'Set aui scale "sm", paint "text" and color "secondary" on both. Place Button.Icon before the label for backwards (arrow-left) and after it for forwards (arrow-right). Icons need the Font Awesome font to show. In context the card is static: the app places it fixed beside its target with a spotlight (local CSS, no kit part), and pushes the counter to the end with margin-inline-start: auto, here an inline style; the close X is placed the same way.',
});
