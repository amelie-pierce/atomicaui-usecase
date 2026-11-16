import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Walkthrough',
  title: 'Walkthrough close',
  apps: ['hcs'],
  source: { hcs: 'src/components/F01Walkthrough.tsx' },
  contextVariant: 'close',
  summary: 'A transparent X IconButton closes the walkthrough card.',
  where: 'The top corner of a coach-mark card. Real site source: HCS Button-017. Built from F01Walkthrough.tsx, F01Walkthrough.css and F01Experience.tsx.',
  when: 'Use it to dismiss a card without acting. Unlike the panel icon buttons it uses the surface color.',
  how: "Set aui scale \"sm\", paint \"text\" and color \"surface\". The glyph is xmark. In context the X sits in the corner of the step 1 card (Connection Type, so only Next in the footer), 4px in, through an inline style (the app uses local CSS because the kit sx has no inset axis); the title reserves 24px at its end so its text stops short of it.",
});
