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
  anatomy: [
    { id: 'previous', name: 'Previous', token: 'Button', selector: '[class~="aui-button"][aria-label="Previous"]', description: 'The 28px square transparent button with arrow-left that steps the input pane carousel back; the FD scene shows it disabled on the first pane.',
      code: `<Button aria-label="Previous" aui={{ paint: 'text', profile: 'square' }}>
  <Icon name="arrow-left" />
</Button>` },
    { id: 'previous-icon', name: 'Arrow-left icon', token: 'Icon', selector: '[class~="aui-button"][aria-label="Previous"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])', description: 'The arrow-left glyph that is the button only visible content.',
      code: `<Icon name="arrow-left" />` },
    { id: 'next', name: 'Next', token: 'Button', selector: '[class~="aui-button"][aria-label="Next"]', description: 'The matching 28px square button with arrow-right that moves forward to the next input pane.',
      code: `<Button aria-label="Next" aui={{ paint: 'text', profile: 'square' }}>
  <Icon name="arrow-right" />
</Button>` },
    { id: 'next-icon', name: 'Arrow-right icon', token: 'Icon', selector: '[class~="aui-button"][aria-label="Next"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])', description: 'The arrow-right glyph mirroring the previous arrow.',
      code: `<Icon name="arrow-right" />` },
  ],
});
