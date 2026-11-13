import { defineUsecase } from '../../../define';

export default defineUsecase({
  title: 'Dialog cancel',
  summary: 'The gray solid Button dismisses a dialog without acting.',
  where: 'The footer of a dialog, left of the confirm Button: Cancel, Do Not Accept. Real site source: HCS Button-002. Popovers use a ghost Cancel instead (Button-003).',
  when: 'Use it for the neutral way out of a dialog. In brand atomic gray is color "surface-alt" (the Button default), not "secondary". Inside a popover the real site drops the fill; see Button-003.',
  how: 'Set aui scale "sm", color "surface-alt", paint "solid" and shape "soft". Color, paint and shape are the Button defaults, so aui={{ scale: "sm" }} gives the same look.',
});
