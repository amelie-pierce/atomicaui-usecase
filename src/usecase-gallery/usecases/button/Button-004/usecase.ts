import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Walkthrough',
  title: 'Step navigation: Previous and Next',
  apps: ['hcs'],
  source: { hcs: 'src/components/F01Walkthrough.tsx' },
  summary: 'Borderless text Buttons step back and forward through a guided tour, with arrow-left before Previous and arrow-right after Next.',
  where: 'The card of a coach-mark walkthrough, on every step that is not the last. Real site source: HCS F01Walkthrough (Previous and Next). The last step swaps Next for End (Button-005). Built from F01Walkthrough.tsx (card), F01Walkthrough.css (spotlight) and F01Experience.tsx (step titles and tips).',
  when: 'Use it for step navigation where no single step is the primary action, so neither Button is filled. Do not use it for form submission.',
  how: "Set aui scale \"sm\", paint \"text\" and color \"secondary\" on both. Place Button.Icon before the label for backwards (arrow-left) and after it for forwards (arrow-right). Icons need the Font Awesome font to show. In context the scene is step 3 of 6 (Beam Properties) as F01Walkthrough renders it: a spotlight ring around the collapsed target, the 328px card to its right with the step title in medium weight, a one-line tip, and Previous, Next and the counter in one row. The app measures the spotlight and card from the target at run time and pins them with position: fixed; here they sit at fixed numbers in a stage frame, and the counter's push to the end is an inline margin.",
});
