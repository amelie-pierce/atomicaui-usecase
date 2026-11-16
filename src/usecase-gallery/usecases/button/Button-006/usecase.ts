import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Walkthrough',
  title: 'Walkthrough close',
  apps: ['hcs'],
  contextVariant: 'close',
  summary: 'A transparent X IconButton closes the walkthrough card.',
  where: 'The top corner of a coach-mark card. Real site source: HCS Button-017.',
  when: 'Use it to dismiss a card without acting. Unlike the panel icon buttons it uses the surface color.',
  how: 'Set aui scale "sm", paint "text" and color "surface". The glyph is xmark.',
});
