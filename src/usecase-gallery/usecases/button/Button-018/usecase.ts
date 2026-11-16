import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Form',
  contextVariant: 'label',
  title: 'Field help trigger',
  apps: ['hcs'],
  source: { hcs: 'src/App.tsx' },
  summary: 'A transparent contained circle-question IconButton sits right after a field label and opens its help.',
  where: 'The label row above the Download Duration select in Load Properties. Real site source: HCS Button-013 (the help trigger; its popover close is Button-003). Built from the Load Properties section in src/App.tsx (lines 1131-1170) and src/components/HcsDownloadDurationHelp.tsx (the trigger).',
  when: 'Use it to explain one field without adding permanent text. Always set aria-label; the popup it opens holds the long explanation.',
  how: 'Set aui scale "sm", profile "contained", color "secondary", paint "text" and shape "soft", with the circle-question glyph. In context it is the Load Properties section of the Input pane: Download (ASD), Download Duration with the label row (label text, then the icon, a flex row) above its five-choice select, Lateral Load and the locked Lateral Load Duration. The open popover is Button-003; the other sections are collapsed.',
});
