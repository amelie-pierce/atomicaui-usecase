import { defineUsecase } from '../../../define';

export default defineUsecase({
  title: 'Floating scroll helper',
  summary: 'Text Buttons with an arrow jump to the top of a long table or down to its notes.',
  where: 'A floating bar over a scrolling results table: Back to top, Table Notes. Real site source: HCS Button-009.',
  when: 'Use it for in-page jumps in a long scrolling view. Show each one only when it applies, and give it an aria-label that names the target.',
  how: 'Set aui color "secondary", paint "text" and scale "sm", with Button.Icon arrow-up or arrow-down before the label.',
});
