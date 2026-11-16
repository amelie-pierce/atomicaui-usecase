import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Body text',
  title: 'Inline link Button',
  apps: ['hcs'],
  summary: 'A Button styled as an underlined warning-colored link inside body copy.',
  where: 'Sentences of body text where an action reads as a link: All Products, Form. Real site source: HCS Button-008.',
  when: 'Use it for an action, not navigation, that belongs inside a sentence. For real navigation use a link. The real site underlines a phone link in the default color, so the two differ.',
  how: 'Set aui scale "sm", profile "no-padding", color "warning" and paint "text", plus sx display "inline-flex" and textDecoration "underline". Set type="button". In context the example is the first sentence under "You can try:" in the No Output Results warning card, and a second inline button (Form) ends the Need help sentence; the app\'s bulleted list is shown without bullets.',
});
