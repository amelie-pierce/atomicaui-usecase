import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Walkthrough',
  contextVariant: 'last',
  title: 'Last step: End',
  apps: ['hcs'],
  source: { hcs: 'src/components/F01Walkthrough.tsx' },
  summary: 'A borderless text Button with a check after the label finishes the guided tour.',
  where: 'The card of a coach-mark walkthrough, on the last step, where it replaces Next. Real site source: HCS Button-003 (End). Earlier steps use Previous and Next (Button-004). Built from F01Walkthrough.tsx, F01Walkthrough.css and F01Experience.tsx.',
  when: 'Use it to close a flow that has been walked through, not to dismiss it early; for that use the close icon (Button-006).',
  how: "Set aui scale \"sm\", paint \"text\" and color \"secondary\", with Button.Icon check after the label (the arrow of Next becomes the check). In context this is step 6 of 6 (File): the target is the File menu at the right edge, so the card sits to the left of the spotlight, as the app places it when it does not fit on the right. Previous and End are at the start and the counter reads 6 / 6; the positions are fixed numbers in a stage frame.",
});
