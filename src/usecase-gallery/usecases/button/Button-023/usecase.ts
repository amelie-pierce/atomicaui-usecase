import { defineUsecase } from '../../../define';

const TOUR_CONTEXT = [
  { id: 'tour-target', name: 'Spotlight target', selector: '[class~="ug-tour__target"]', description: 'The page element the tour is pointing at, here the Beam Properties section header that the card sits beside (a stand-in for the app page).' },
  { id: 'step-title', name: 'Step title', selector: '[data-ug-part="step-title"]', description: 'The medium-weight heading of the step (Split-Pane Slider, Multi Design or Beam Properties) with room reserved at its end for the close X.' },
  { id: 'step-counter', name: 'Step counter', selector: '[data-ug-part="step-counter"]', description: 'The muted step count at the end of the navigation row (for example 2 / 4) that tells where the user is in the tour.' },
];

export default defineUsecase({
  uiType: 'Button group',
  title: 'Walkthrough step navigation buttons',

  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
options: [
    { id: "hcs-step-nav", contextAnatomy: TOUR_CONTEXT, name: "Step navigation", apps: ["hcs"], source: {"hcs":"src/components/F01Walkthrough.tsx"} ,
     contextAnatomyOverrides: [{"id":"tour-target","lesson":{"explanation":"Beam Properties header is the target beside this coach mark.","code":["MockTourTarget"],"scope":"context"}},{"id":"step-title","lesson":{"explanation":"Step heading leaves room at its end for Close.","scope":"context"}},{"id":"step-counter","lesson":{"explanation":"Muted count shows the current position within the tour steps.","scope":"context"}}]},
    { id: "ace-step-nav", contextAnatomy: TOUR_CONTEXT, name: "Arrow step buttons", apps: ["ace","hs","rws","agpd"], source: {"ace":"src/features/top-navigation/ui/TutorialWalkthrough.tsx","hs":"src/hs/Tutorials.tsx","rws":"src/rws/Tutorials.tsx","agpd":"src/agpd/Tutorials.tsx"} ,
     contextAnatomyOverrides: [{"id":"tour-target","lesson":{"explanation":"Beam Properties header is the target beside this coach mark.","code":["MockTourTarget"],"scope":"context"}},{"id":"step-title","lesson":{"explanation":"Step heading leaves room at its end for Close.","scope":"context"}},{"id":"step-counter","lesson":{"explanation":"Muted count shows the current position within the tour steps.","scope":"context"}}]},
    { id: "adm-step-nav", contextAnatomy: TOUR_CONTEXT, name: "Text step buttons", apps: ["adm","pbs","pfd","fd"], source: {"adm":"src/features/top-navigation/components/TutorialWalkthrough.tsx","pbs":"src/PbsWalkthrough.tsx","pfd":"src/pfd/Walkthrough.tsx","fd":"src/components/Walkthrough.jsx"} ,
     contextAnatomyOverrides: [{"id":"tour-target","lesson":{"explanation":"Beam Properties header is the target beside this coach mark.","code":["MockTourTarget"],"scope":"context"}},{"id":"step-title","lesson":{"explanation":"Step heading leaves room at its end for Close.","scope":"context"}},{"id":"step-counter","lesson":{"explanation":"Muted count shows the current position within the tour steps.","scope":"context"}}]},
  ],
  source: { hcs: 'src/components/F01Walkthrough.tsx', ace: 'src/features/top-navigation/ui/TutorialWalkthrough.tsx', adm: 'src/features/top-navigation/components/TutorialWalkthrough.tsx', pfd: 'src/pfd/Walkthrough.tsx', pbs: 'src/PbsWalkthrough.tsx', hs: 'src/hs/Tutorials.tsx', fd: 'src/components/Walkthrough.jsx', agpd: 'src/agpd/Tutorials.tsx', rws: 'src/rws/Tutorials.tsx' },
  summary: 'Borderless text Buttons step back and forward through a guided tour: Previous with arrow-left before it, then Next with arrow-right after it.',
  where: 'The navigation row in the footer of the card of a coach-mark walkthrough, on every step that is not the last. Real site source: the walkthrough card of each app (the paths are in source). ADC has no walkthrough.',
  when: 'Use it for step navigation where no single step is the primary action, so neither Button is filled. '
    + 'Do not use it for form submission; to end the tour use Button-024, and to dismiss a tour early use the close icon (Button-030).',
  how: 'The props are the same in every app: aui scale "sm", paint "text" and color "secondary" on every Button, Button.Icon arrow-left before the label of Previous (only when step > 0) and arrow-right after the label of Next. '
    + 'Three groups: HCS (mixed case Previous and Next, regular weight, counter pushed to the end by a CSS margin), ACE, HS, RWS and AGPD (PREVIOUS and NEXT typed in capitals, regular weight, counter at the end by justify between) and ADM, PBS, PFD and FD (capitals at the bold weight, which the apps set by CSS on the row\'s buttons, counter pushed by a CSS margin). '
    + 'The scenes keep the card, its close X, the title, one tip line, the navigation row and the counter, with the app\'s own step copy; the spotlight target is the gallery\'s shared stand-in, and the card and spotlight sit at fixed numbers where the app measures them. '
    + 'Icons need the Font Awesome font to show.',
  anatomy: [
    { id: 'card', name: 'Walkthrough card', selector: '[role="region"][aria-label="Walkthrough"]', description: 'The 328px coach-mark card (solid, sm, soft, elevation 4) with the step title, one line of copy and the footer navigation row.' , lesson: {"explanation":"328px elevated coach mark pairs step copy with footer navigation."}},
    { id: 'close', name: 'Close', selector: '[class~="aui-button"][aria-label="Close walkthrough"]', description: 'The corner xmark that dismisses the tour from the top end of the card; it is a separate action from the step buttons.' , lesson: {"explanation":"Corner X dismisses the tour independently of step navigation."}},
    { id: 'step-nav', name: 'Navigation row', selector: '[data-ug-part="step-nav"]', description: 'The footer row of the card that holds Previous and Next; ACE, HS, RWS and AGPD nest the two buttons in their own group and put the 2 / 4 counter at the far end, while ADM, PBS, PFD, FD and HCS push the counter right with an auto margin.' , lesson: {"explanation":"Footer places Previous and Next with the counter at the far end."}},
    { id: 'previous', name: 'Previous', selector: '[class~="aui-button"]:not([aria-label]):first-of-type', description: 'Borderless secondary text button with arrow-left before the label; ACE, HS, RWS and AGPD type it as PREVIOUS, HCS keeps mixed case.' , lesson: {"explanation":"Arrow-left text action moves back; some apps capitalize the label."}},
    { id: 'previous-icon', name: 'Arrow-left icon', selector: '[class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-contained-icon"]', description: 'The arrow-left glyph before the label, pointing the way the tour goes back.' , lesson: {"explanation":"Arrow-left glyph marks the Previous action in the footer."}},
    { id: 'forward', name: 'Next', selector: '[class~="aui-button"]:not([aria-label]):last-of-type', description: 'Borderless secondary text button that advances to the next step; its arrow-right trails the label so the pair reads as back and forward.' , lesson: {"explanation":"Arrow-right after Next marks the forward navigation action."}},
    { id: 'forward-icon', name: 'Trailing icon', selector: '[class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-contained-icon"]', description: 'The arrow-right glyph after Next, the mirror of the arrow-left before Previous.' , lesson: {"explanation":"The arrow-right glyph after Next, the mirror of the arrow-left before Previous."}},
  ],
});
