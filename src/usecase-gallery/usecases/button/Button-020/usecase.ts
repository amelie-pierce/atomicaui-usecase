import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Go to carousel page button',
  look: 'Pager dot',
  apps: ['fd'],
  cases: [
    { id: 'fd-carousel-dots', name: 'Carousel footer', apps: ['fd'], source: { fd: 'src/components/InputPane.jsx' } },
  ],
  source: { fd: 'src/components/InputPane.jsx' },
  summary: 'An empty solid Button is one dot of a carousel pager; the current page is the primary one.',
  where: 'The footer of the FD input pane carousel: one dot per page of cards.',
  when: 'Use it only as a page indicator that also jumps to its page. It has no label, so always set aria-label ("1 / 3") and aria-current on the current dot.',
  how: 'Set aui paint "solid" and color "primary" for the current page, "surface-alt" for the others, on a Button with no children. '
    + 'Measured with no size class: 16px by 10px, orange rgb(255, 83, 8) when current; the app sizes the dot with its own carousel-dot CSS class, which the kit cannot state, so the scene shows the kit box. '
    + 'A Button with no label and a solid fill is not an icon button, so it stays a Single button.',
});
