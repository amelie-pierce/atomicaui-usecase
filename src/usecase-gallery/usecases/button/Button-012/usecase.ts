import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Launch general tutorial button',

  apps: ['hs'],
options: [
    { id: "hs-launch", name: "Launch general tutorial", apps: ["hs"], contextAnatomy: [
      { id: "walkthrough-card", name: "Walkthrough card", description: "The elevated Walkthrough region over the tour target that holds the step text and the launch button." , lesson: {"explanation":"Elevated walkthrough card pairs step text with its launch action.","selector":"[data-ug-part=\"walkthrough-card\"]","scope":"context"}},
      { id: "walkthrough-close", name: "Close button", description: "The X IconButton in the card corner (aria-label \"Close walkthrough\")." , lesson: {"explanation":"The X IconButton in the card corner (aria-label \"Close walkthrough\").","selector":"[data-ug-part=\"walkthrough-close\"]","scope":"context"}},
      { id: "step-text", name: "Step text", description: "The body \"Find a solution. See the General tutorial for more information on the Results Table.\" with 24px kept at its end for the close X." , lesson: {"explanation":"Find a solution note leaves 24px at its end for Close.","selector":"[data-ug-part=\"step-text\"]","scope":"context"}},
    ], source: {"hs":"src/hs/Tutorials.tsx"} ,
    },
  ],
  source: { hs: 'src/hs/Tutorials.tsx' },
  summary: 'A borderless text Button on the last step of a topic tour starts the General Tutorial.',
  where: 'The coach-mark card of an HS tour, on the last step of every topic except the General Tutorial, between the step text and the Previous / End row. Real site source: HS Tutorials.tsx (launchGeneral). Only HS has it.',
  when: 'Use it to send a reader who finished a focused tour to the general one. Do not use it as the tour exit; that is End (Button-024).',
  how: 'Set aui scale "sm", paint "text", color "secondary" and sx alignSelf "start", so the label sits at the start of the card instead of stretching. The label is typed in capitals (LAUNCH GENERAL TUTORIAL). '
    + 'The scene keeps the card, its close X and the one-line step text; the Previous / End row and counter are left out (Button-024 shows them), and the target is the gallery\'s shared stand-in.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      description: "The Launch General Tutorial Button on the last step of an HS tour: small secondary text paint with alignSelf \"start\" so it hugs the start of the coach-mark card.",
      selector: "[class~=\"aui-button\"]:not([aria-label=\"Close walkthrough\"])",
     lesson: {"explanation":"Small secondary Launch General Tutorial link sits at the final step’s start."}},
    {
      id: "label",
      name: "Label",
      description: "The capitalised text \"LAUNCH GENERAL TUTORIAL\" that starts the HS General Tutorial.",
      selector: "[class~=\"aui-button\"]:not([aria-label=\"Close walkthrough\"])",
      text: true,
    },
  ],
});
