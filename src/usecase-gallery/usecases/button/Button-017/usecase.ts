import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Show all connection types button',
  look: 'Accent text',
  apps: ['fd'],
  cases: [
    { id: 'fd-carousel-footer', name: 'Carousel footer', apps: ['fd'], source: { fd: 'src/components/InputPane.jsx' } },
  ],
  source: { fd: 'src/components/InputPane.jsx' },
  summary: 'A text Button in the primary colour opens the full list from the footer of a carousel.',
  where: 'The footer of the FD input pane carousel (the connection type cards), after the pager dots.',
  when: 'Use it for a quiet link-like action that widens the view: the carousel shows a few cards and this Button opens all of them. A neutral text action is Button-012; the small accent text in a popup is Button-010.',
  how: 'Set aui paint "text" and color "primary" on a Button at the default scale. '
    + 'Measured in the gallery: 28px high, 4px 8px padding, 16px regular text, no fill and no border, orange text rgb(255, 83, 8), so it differs from Button-012 (text colour dark) and from Button-010 (26px, 14px medium, scale "xs"). '
    + 'In context it is the last item of the carousel footer after the two pager dots (Button-021). The cards, the arrows (Button-039) and the dialog it opens are left out.',
});
