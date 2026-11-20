import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Text only',
  apps: ['hs'],
  cases: [
    { id: 'hs-launch', name: 'Launch general tutorial', apps: ['hs'], source: { hs: 'src/hs/Tutorials.tsx' } },
  ],
  source: { hs: 'src/hs/Tutorials.tsx' },
  summary: 'A borderless text Button on the last step of a topic tour starts the General Tutorial.',
  where: 'The coach-mark card of an HS tour, on the last step of every topic except the General Tutorial, between the step text and the Previous / End row. Real site source: HS Tutorials.tsx (launchGeneral). Only HS has it.',
  when: 'Use it to send a reader who finished a focused tour to the general one. Do not use it as the tour exit; that is End (Button-005).',
  how: "Set aui scale \"sm\", paint \"text\", color \"secondary\" and sx alignSelf \"start\", so the label sits at the start of the card instead of stretching. The label is typed in capitals (LAUNCH GENERAL TUTORIAL). The scene keeps the card, its close X and the one-line step text; the Previous / End row and counter are left out (Button-004 and 005 show them), and the target is the gallery's shared stand-in.",
});
