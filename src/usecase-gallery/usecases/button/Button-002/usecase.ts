import { defineUsecase } from '../../../define';

export default defineUsecase({
  title: 'Secondary action',
  summary: 'A tonal Button offers the less important choice beside a primary action.',
  where: 'Next to a primary Button in a form, dialog or card footer: Cancel, Back, Skip.',
  when: 'Use it for an alternative that should stay visible without competing with the primary action. Do not use it as the only action in a view.',
  how: 'Set aui color to "secondary" and paint to "tonal". The softer fill keeps the hierarchy clear.',
});
