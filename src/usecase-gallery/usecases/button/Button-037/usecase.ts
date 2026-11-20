import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Step carousel buttons',
  look: 'Ghost, 28px',
  apps: ['fd'],
  cases: [
    { id: 'fd-carousel-arrows', name: 'Carousel arrows', apps: ['fd'], source: { fd: 'src/components/InputPane.jsx' } },
  ],
  source: { fd: 'src/components/InputPane.jsx' },
  summary: 'Two square transparent Buttons, 28px, step an input pane carousel back and forward.',
  where: 'The footer of the FD input pane carousel (the connection type cards). Real site source: FD src/components/InputPane.jsx. No other app has a carousel.',
  when: 'Use the pair to step a carousel page by page; disable Previous on the first page and Next on the last, and set an aria-label on each.',
  how: 'Buttons with aui paint "text" and profile "square" around an Icon arrow-left or arrow-right; measured 28px square, transparent, 4px radius, the same box as the other ghost 28px buttons. '
    + 'The scene disables the first, as on the first page; the card row and the pager (Button-020) are left out. One group, FD only.',
});
