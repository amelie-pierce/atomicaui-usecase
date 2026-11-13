import { defineUsecase } from '../../../define';

export default defineUsecase({
  title: 'Panel icon button',
  summary: 'Transparent IconButtons with a black glyph open, expand and close panels.',
  where: 'Panel headers (contained), a collapsed side rail (square) and a popover close (square-compact). Real site source: HCS Button-011, Button-012 and Button-013.',
  when: 'Use it for an icon-only control in a panel chrome. The profile sets the size: contained is the header standard, square suits a rail trigger. Always set aria-label.',
  how: 'Set aui color "secondary", paint "text", scale "sm" and shape "soft", and choose profile "contained", "square" or "square-compact". IconButton is a kit part and needs the Font Awesome font to show its glyph.',
});
