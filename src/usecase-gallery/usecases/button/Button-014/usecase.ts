import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Body text',
  title: 'Inline link Button',
  apps: ['hcs'],
  source: { hcs: 'src/components/HcsNoOutputResults.tsx' },
  summary: 'A Button styled as an underlined warning-colored link inside body copy.',
  where: 'Sentences of body text where an action reads as a link: All Products, Form. Real site source: HCS Button-008. Built from src/components/HcsNoOutputResults.tsx.',
  when: 'Use it for an action, not navigation, that belongs inside a sentence. For real navigation use a link. The real site underlines a phone link in the default color, so the two differ.',
  how: 'Set aui scale "sm", profile "no-padding", color "warning" and paint "text", plus sx display "inline-flex" and textDecoration "underline". Set type="button". In context the example is the end of the second bullet of "You can try:" in the No Output Results warning card (tonal warning View, triangle icon, heading, bulleted list with disc markers), ; the app adds a one-line explanation and a Need help paragraph with a second inline button (Form), left out here. In the app the card is sticky inside the table scroll area; here it stands alone.',
});
