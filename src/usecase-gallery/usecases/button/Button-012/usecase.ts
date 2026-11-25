import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Launch general tutorial button',

  apps: ['hs'],
    layers: [
        {"id":"container","partId":"container","title":"Container","explanation":"The Launch General Tutorial Button on the last step of an HS tour: small secondary text paint with alignSelf \"start\" so it hugs the start of the coach-mark card.","keyIdea":"The Launch General Tutorial Button on the last step of an HS tour: small secondary text paint with alignSelf \"start\" so it hugs the start of the coach-mark card.","selector":"[class~=\"aui-button\"]:not([aria-label=\"Close walkthrough\"])"},
      ],
options: [
    { id: "hs-launch", name: "Launch general tutorial", apps: ["hs"], contextAnatomy: [
      { id: "walkthrough-card", name: "Walkthrough card", description: "The elevated Walkthrough region over the tour target that holds the step text and the launch button." },
      { id: "walkthrough-close", name: "Close button", description: "The X IconButton in the card corner (aria-label \"Close walkthrough\")." },
      { id: "step-text", name: "Step text", description: "The body \"Find a solution. See the General tutorial for more information on the Results Table.\" with 24px kept at its end for the close X." },
    ], source: {"hs":"src/hs/Tutorials.tsx"} ,
      contextLayers: [
        {"id":"context-walkthrough-card","partId":"walkthrough-card","title":"Walkthrough card","explanation":"The elevated Walkthrough region over the tour target that holds the step text and the launch button.","keyIdea":"The elevated Walkthrough region over the tour target that holds the step text and the launch button.","selector":"[data-ug-part=\"walkthrough-card\"]","scope":"context"},
        {"id":"context-walkthrough-close","partId":"walkthrough-close","title":"Close button","explanation":"The X IconButton in the card corner (aria-label \"Close walkthrough\").","keyIdea":"The X IconButton in the card corner (aria-label \"Close walkthrough\").","selector":"[data-ug-part=\"walkthrough-close\"]","scope":"context"},
        {"id":"context-step-text","partId":"step-text","title":"Step text","explanation":"The body \"Find a solution. See the General tutorial for more information on the Results Table.\" with 24px kept at its end for the close X.","keyIdea":"The body \"Find a solution.","selector":"[data-ug-part=\"step-text\"]","scope":"context"},
      ],
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
    },
    {
      id: "label",
      name: "Label",
      description: "The capitalised text \"LAUNCH GENERAL TUTORIAL\" that starts the HS General Tutorial.",
      selector: "[class~=\"aui-button\"]:not([aria-label=\"Close walkthrough\"])",
      text: true,
    },
  ],
});
