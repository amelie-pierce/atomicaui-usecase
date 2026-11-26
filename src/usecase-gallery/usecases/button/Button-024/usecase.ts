import { defineUsecase } from '../../../define';

const TOUR_CONTEXT = [
  { id: 'tour-target', name: 'Spotlight target', selector: '[class~="ug-tour__target"]', description: 'The File menu in the main navigation that the last step points at; the card sits to its left (a stand-in for the app page).' },
  { id: 'step-title', name: 'Step title', selector: '[data-ug-part="step-title"]', description: 'The medium-weight heading of the last step (File, Step #1, 3D Viewer or Product Notes) with room reserved at its end for the close X.' },
  { id: 'step-counter', name: 'Step counter', selector: '[data-ug-part="step-counter"]', description: 'The muted step count at the end of the navigation row on the last step (for example 4 / 4).' },
];

export default defineUsecase({
  uiType: 'Button group',
  title: 'End walkthrough buttons',

  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
    layers: [
        {"id":"card","partId":"card","title":"Walkthrough card","explanation":"328px elevated coach mark pairs step copy with footer navigation.","keyIdea":"The last-step coach mark presents completion in the same card as its guidance.","selector":"[role=\"region\"][aria-label=\"Walkthrough\"]"},
        {"id":"close","partId":"close","title":"Close","explanation":"Corner X dismisses the tour independently of step navigation.","keyIdea":"The corner control exits the tour even at its final instruction.","selector":"[class~=\"aui-button\"][aria-label=\"Close walkthrough\"]"},
        {"id":"step-nav","partId":"step-nav","title":"Navigation row","explanation":"Last-step footer pairs Previous, End, and a far-end counter.","keyIdea":"The footer pairs a backward route with the tour-ending action.","selector":"[data-ug-part=\"step-nav\"]"},
        {"id":"previous","partId":"previous","title":"Previous","explanation":"Arrow-left text action returns to the previous tour step.","keyIdea":"Previous lets users review the instruction before completing the walkthrough.","selector":"[class~=\"aui-button\"]:not([aria-label]):first-of-type"},
        {"id":"previous-icon","partId":"previous-icon","title":"Arrow-left icon","explanation":"Arrow-left glyph marks the Previous action in the footer.","keyIdea":"The left arrow marks the route back from the final step.","selector":"[class~=\"aui-button\"]:not([aria-label]):first-of-type > [class~=\"aui-icon\"], [class~=\"aui-button\"]:not([aria-label]):first-of-type > [class~=\"aui-contained-icon\"]"},
        {"id":"forward","partId":"forward","title":"End","explanation":"End replaces Next to finish the last tour step.","keyIdea":"End closes the completed tour in place of another Next action.","selector":"[class~=\"aui-button\"]:not([aria-label]):last-of-type"},
        {"id":"forward-icon","partId":"forward-icon","title":"Check icon","explanation":"Check glyph follows End in three app scenes.","keyIdea":"The check glyph marks completion for apps that show a final-state icon.","selector":"[class~=\"aui-button\"]:not([aria-label]):last-of-type > [class~=\"aui-icon\"], [class~=\"aui-button\"]:not([aria-label]):last-of-type > [class~=\"aui-contained-icon\"]"},
      ],
options: [
    { id: "hcs-last-step", contextAnatomy: TOUR_CONTEXT, name: "Last step", apps: ["hcs"], source: {"hcs":"src/components/F01Walkthrough.tsx"} ,
      contextLayers: [
        {"id":"context-tour-target","partId":"tour-target","title":"Spotlight target","explanation":"File menu target sits beside the final coach mark.","keyIdea":"The spotlight points to the final feature named by the tour.","selector":"[class~=\"ug-tour__target\"]","scope":"context"},
        {"id":"context-step-title","partId":"step-title","title":"Step title","explanation":"Final step heading leaves room at its end for Close.","keyIdea":"The heading names the last instruction while reserving room for Close.","selector":"[data-ug-part=\"step-title\"]","scope":"context"},
        {"id":"context-step-counter","partId":"step-counter","title":"Step counter","explanation":"Muted count marks the last tour step, for example 4 / 4.","keyIdea":"The counter confirms that the user has reached the end of this tour.","selector":"[data-ug-part=\"step-counter\"]","scope":"context"},
      ],
    },
    { id: "ace-last-step", contextAnatomy: TOUR_CONTEXT, name: "Arrow End buttons", apps: ["ace","hs","rws","agpd"], source: {"ace":"src/features/top-navigation/ui/TutorialWalkthrough.tsx","hs":"src/hs/Tutorials.tsx","rws":"src/rws/Tutorials.tsx","agpd":"src/agpd/Tutorials.tsx"} ,
      contextLayers: [
        {"id":"context-tour-target","partId":"tour-target","title":"Spotlight target","explanation":"File menu target sits beside the final coach mark.","keyIdea":"The File menu is the destination highlighted by this app variant.","selector":"[class~=\"ug-tour__target\"]","scope":"context"},
        {"id":"context-step-title","partId":"step-title","title":"Step title","explanation":"Final step heading leaves room at its end for Close.","keyIdea":"The variant heading identifies its final tour topic.","selector":"[data-ug-part=\"step-title\"]","scope":"context"},
        {"id":"context-step-counter","partId":"step-counter","title":"Step counter","explanation":"Muted count marks the last tour step, for example 4 / 4.","keyIdea":"The final count makes the end of the sequence explicit.","selector":"[data-ug-part=\"step-counter\"]","scope":"context"},
      ],
    },
    { id: "adm-last-step", contextAnatomy: TOUR_CONTEXT, name: "Previous and End", apps: ["adm","fd"], source: {"adm":"src/features/top-navigation/components/TutorialWalkthrough.tsx","fd":"src/components/Walkthrough.jsx"} ,
      contextLayers: [
        {"id":"context-tour-target","partId":"tour-target","title":"Spotlight target","explanation":"File menu target sits beside the final coach mark.","keyIdea":"The spotlight connects the last instruction to the app navigation target.","selector":"[class~=\"ug-tour__target\"]","scope":"context"},
        {"id":"context-step-title","partId":"step-title","title":"Step title","explanation":"Final step heading leaves room at its end for Close.","keyIdea":"The final-step target gives the walkthrough a concrete destination.","selector":"[data-ug-part=\"step-title\"]","scope":"context"},
        {"id":"context-step-counter","partId":"step-counter","title":"Step counter","explanation":"Muted count marks the last tour step, for example 4 / 4.","keyIdea":"The heading identifies the closing topic before the user ends the tour.","selector":"[data-ug-part=\"step-counter\"]","scope":"context"},
      ],
    },
    { id: "pbs-last-step", contextAnatomy: TOUR_CONTEXT, name: "Compact End buttons", apps: ["pbs","pfd"], source: {"pbs":"src/PbsWalkthrough.tsx","pfd":"src/pfd/Walkthrough.tsx"} ,
      contextLayers: [
        {"id":"context-tour-target","partId":"tour-target","title":"Spotlight target","explanation":"File menu target sits beside the final coach mark.","keyIdea":"The counter confirms completion of the selected instruction sequence.","selector":"[class~=\"ug-tour__target\"]","scope":"context"},
        {"id":"context-step-title","partId":"step-title","title":"Step title","explanation":"Final step heading leaves room at its end for Close.","keyIdea":"The last spotlight points to the feature introduced in the final card.","selector":"[data-ug-part=\"step-title\"]","scope":"context"},
        {"id":"context-step-counter","partId":"step-counter","title":"Step counter","explanation":"Muted count marks the last tour step, for example 4 / 4.","keyIdea":"The contextual title names the last topic while keeping its close affordance clear.","selector":"[data-ug-part=\"step-counter\"]","scope":"context"},
      ],
    },
  ],
  source: { hcs: 'src/components/F01Walkthrough.tsx', ace: 'src/features/top-navigation/ui/TutorialWalkthrough.tsx', adm: 'src/features/top-navigation/components/TutorialWalkthrough.tsx', pfd: 'src/pfd/Walkthrough.tsx', pbs: 'src/PbsWalkthrough.tsx', hs: 'src/hs/Tutorials.tsx', fd: 'src/components/Walkthrough.jsx', agpd: 'src/agpd/Tutorials.tsx', rws: 'src/rws/Tutorials.tsx' },
  summary: 'Borderless text Buttons close a guided tour on its last step: Previous with arrow-left before it, and End in place of Next.',
  where: 'The navigation row in the footer of the walkthrough card on the last step. Real site source: the walkthrough card of each app (the paths are in source). ADC has no walkthrough.',
  when: 'Use End to close a flow that has been walked through; do not use it to dismiss a tour early, for that use the close icon (Button-030). The steps before the last use Button-023.',
  how: 'aui scale "sm", paint "text" and color "secondary" on every Button; Previous keeps Button.Icon arrow-left, End replaces Next. '
    + 'Four groups, told apart by the End icon and the label style: HCS (End with a check, mixed case, regular weight), ACE, HS, RWS and AGPD (END in capitals, regular weight, no icon), ADM and FD (END in capitals, bold, no icon) and PBS and PFD (END in capitals, bold, with the check). '
    + 'The bold capitals are CSS on the row\'s buttons in ADM, PBS and PFD. '
    + 'On the last step the target is the File menu at the right edge, so the card sits to the left of the spotlight, as the app places it when it does not fit on the right.',
  anatomy: [
    { id: 'card', name: 'Walkthrough card', selector: '[role="region"][aria-label="Walkthrough"]', description: 'The 328px coach-mark card (solid, sm, soft, elevation 4) with the step title, one line of copy and the footer navigation row.' },
    { id: 'close', name: 'Close', selector: '[class~="aui-button"][aria-label="Close walkthrough"]', description: 'The corner xmark that dismisses the tour from the top end of the card; it is a separate action from the step buttons.' },
    { id: 'step-nav', name: 'Navigation row', selector: '[data-ug-part="step-nav"]', description: 'The footer row of the last-step card that holds Previous and End; the step counter (4 / 4, 12 / 12 or 6 / 6) sits at its far end.' },
    { id: 'previous', name: 'Previous', selector: '[class~="aui-button"]:not([aria-label]):first-of-type', description: 'Borderless secondary text button with arrow-left that steps back from the last step; the label is Previous or PREVIOUS depending on the app.' },
    { id: 'previous-icon', name: 'Arrow-left icon', selector: '[class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-contained-icon"]', description: 'The arrow-left glyph before the label, pointing the way the tour goes back.' },
    { id: 'forward', name: 'End', selector: '[class~="aui-button"]:not([aria-label]):last-of-type', description: 'The closing button that replaces Next on the final step and ends the tour; it is typed END in ACE, HS, RWS, AGPD, ADM and FD.' },
    { id: 'forward-icon', name: 'Check icon', selector: '[class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-contained-icon"]', description: 'The check glyph after End that HCS, PBS and PFD add to mark completion; ACE, HS, RWS, AGPD, ADM and FD show no icon.' },
  ],
});
