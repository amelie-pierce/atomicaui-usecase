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
        {"id":"card","partId":"card","title":"Walkthrough card","explanation":"The 328px coach-mark card (solid, sm, soft, elevation 4) with the step title, one line of copy and the footer navigation row.","keyIdea":"The 328px coach-mark card (solid, sm, soft, elevation 4) with the step title, one line of copy and the footer navigation row.","selector":"[role=\"region\"][aria-label=\"Walkthrough\"]"},
        {"id":"close","partId":"close","title":"Close","explanation":"The corner xmark that dismisses the tour from the top end of the card; it is a separate action from the step buttons.","keyIdea":"The corner xmark that dismisses the tour from the top end of the card; it is a separate action from the step buttons.","selector":"[class~=\"aui-button\"][aria-label=\"Close walkthrough\"]"},
        {"id":"step-nav","partId":"step-nav","title":"Navigation row","explanation":"The footer row of the last-step card that holds Previous and End; the step counter (4 / 4, 12 / 12 or 6 / 6) sits at its far end.","keyIdea":"The footer row of the last-step card that holds Previous and End; the step counter (4 / 4, 12 / 12 or 6 / 6) sits at its far end.","selector":"[data-ug-part=\"step-nav\"]"},
        {"id":"previous","partId":"previous","title":"Previous","explanation":"Borderless secondary text button with arrow-left that steps back from the last step; the label is Previous or PREVIOUS depending on the app.","keyIdea":"Borderless secondary text button with arrow-left that steps back from the last step; the label is Previous or PREVIOUS depending on the app.","selector":"[class~=\"aui-button\"]:not([aria-label]):first-of-type"},
        {"id":"previous-icon","partId":"previous-icon","title":"Arrow-left icon","explanation":"The arrow-left glyph before the label, pointing the way the tour goes back.","keyIdea":"The arrow-left glyph before the label, pointing the way the tour goes back.","selector":"[class~=\"aui-button\"]:not([aria-label]):first-of-type > [class~=\"aui-icon\"], [class~=\"aui-button\"]:not([aria-label]):first-of-type > [class~=\"aui-contained-icon\"]"},
        {"id":"forward","partId":"forward","title":"End","explanation":"The closing button that replaces Next on the final step and ends the tour; it is typed END in ACE, HS, RWS, AGPD, ADM and FD.","keyIdea":"The closing button that replaces Next on the final step and ends the tour; it is typed END in ACE, HS, RWS, AGPD, ADM and FD.","selector":"[class~=\"aui-button\"]:not([aria-label]):last-of-type"},
        {"id":"forward-icon","partId":"forward-icon","title":"Check icon","explanation":"The check glyph after End that HCS, PBS and PFD add to mark completion; ACE, HS, RWS, AGPD, ADM and FD show no icon.","keyIdea":"The check glyph after End that HCS, PBS and PFD add to mark completion; ACE, HS, RWS, AGPD, ADM and FD show no icon.","selector":"[class~=\"aui-button\"]:not([aria-label]):last-of-type > [class~=\"aui-icon\"], [class~=\"aui-button\"]:not([aria-label]):last-of-type > [class~=\"aui-contained-icon\"]"},
      ],
options: [
    { id: "hcs-last-step", contextAnatomy: TOUR_CONTEXT, name: "Last step", apps: ["hcs"], source: {"hcs":"src/components/F01Walkthrough.tsx"} ,
      contextLayers: [
        {"id":"context-tour-target","partId":"tour-target","title":"Spotlight target","explanation":"The File menu in the main navigation that the last step points at; the card sits to its left (a stand-in for the app page).","keyIdea":"The File menu in the main navigation that the last step points at; the card sits to its left (a stand-in for the app page).","selector":"[class~=\"ug-tour__target\"]","scope":"context"},
        {"id":"context-step-title","partId":"step-title","title":"Step title","explanation":"The medium-weight heading of the last step (File, Step #1, 3D Viewer or Product Notes) with room reserved at its end for the close X.","keyIdea":"The medium-weight heading of the last step (File, Step #1, 3D Viewer or Product Notes) with room reserved at its end for the close X.","selector":"[data-ug-part=\"step-title\"]","scope":"context"},
        {"id":"context-step-counter","partId":"step-counter","title":"Step counter","explanation":"The muted step count at the end of the navigation row on the last step (for example 4 / 4).","keyIdea":"The muted step count at the end of the navigation row on the last step (for example 4 / 4).","selector":"[data-ug-part=\"step-counter\"]","scope":"context"},
      ],
    },
    { id: "ace-last-step", contextAnatomy: TOUR_CONTEXT, name: "Last step — UI variant 2", apps: ["ace","hs","rws","agpd"], source: {"ace":"src/features/top-navigation/ui/TutorialWalkthrough.tsx","hs":"src/hs/Tutorials.tsx","rws":"src/rws/Tutorials.tsx","agpd":"src/agpd/Tutorials.tsx"} ,
      contextLayers: [
        {"id":"context-tour-target","partId":"tour-target","title":"Spotlight target","explanation":"The File menu in the main navigation that the last step points at; the card sits to its left (a stand-in for the app page).","keyIdea":"The File menu in the main navigation that the last step points at; the card sits to its left (a stand-in for the app page).","selector":"[class~=\"ug-tour__target\"]","scope":"context"},
        {"id":"context-step-title","partId":"step-title","title":"Step title","explanation":"The medium-weight heading of the last step (File, Step #1, 3D Viewer or Product Notes) with room reserved at its end for the close X.","keyIdea":"The medium-weight heading of the last step (File, Step #1, 3D Viewer or Product Notes) with room reserved at its end for the close X.","selector":"[data-ug-part=\"step-title\"]","scope":"context"},
        {"id":"context-step-counter","partId":"step-counter","title":"Step counter","explanation":"The muted step count at the end of the navigation row on the last step (for example 4 / 4).","keyIdea":"The muted step count at the end of the navigation row on the last step (for example 4 / 4).","selector":"[data-ug-part=\"step-counter\"]","scope":"context"},
      ],
    },
    { id: "adm-last-step", contextAnatomy: TOUR_CONTEXT, name: "Last step — UI variant 3", apps: ["adm","fd"], source: {"adm":"src/features/top-navigation/components/TutorialWalkthrough.tsx","fd":"src/components/Walkthrough.jsx"} ,
      contextLayers: [
        {"id":"context-tour-target","partId":"tour-target","title":"Spotlight target","explanation":"The File menu in the main navigation that the last step points at; the card sits to its left (a stand-in for the app page).","keyIdea":"The File menu in the main navigation that the last step points at; the card sits to its left (a stand-in for the app page).","selector":"[class~=\"ug-tour__target\"]","scope":"context"},
        {"id":"context-step-title","partId":"step-title","title":"Step title","explanation":"The medium-weight heading of the last step (File, Step #1, 3D Viewer or Product Notes) with room reserved at its end for the close X.","keyIdea":"The medium-weight heading of the last step (File, Step #1, 3D Viewer or Product Notes) with room reserved at its end for the close X.","selector":"[data-ug-part=\"step-title\"]","scope":"context"},
        {"id":"context-step-counter","partId":"step-counter","title":"Step counter","explanation":"The muted step count at the end of the navigation row on the last step (for example 4 / 4).","keyIdea":"The muted step count at the end of the navigation row on the last step (for example 4 / 4).","selector":"[data-ug-part=\"step-counter\"]","scope":"context"},
      ],
    },
    { id: "pbs-last-step", contextAnatomy: TOUR_CONTEXT, name: "Last step — UI variant 4", apps: ["pbs","pfd"], source: {"pbs":"src/PbsWalkthrough.tsx","pfd":"src/pfd/Walkthrough.tsx"} ,
      contextLayers: [
        {"id":"context-tour-target","partId":"tour-target","title":"Spotlight target","explanation":"The File menu in the main navigation that the last step points at; the card sits to its left (a stand-in for the app page).","keyIdea":"The File menu in the main navigation that the last step points at; the card sits to its left (a stand-in for the app page).","selector":"[class~=\"ug-tour__target\"]","scope":"context"},
        {"id":"context-step-title","partId":"step-title","title":"Step title","explanation":"The medium-weight heading of the last step (File, Step #1, 3D Viewer or Product Notes) with room reserved at its end for the close X.","keyIdea":"The medium-weight heading of the last step (File, Step #1, 3D Viewer or Product Notes) with room reserved at its end for the close X.","selector":"[data-ug-part=\"step-title\"]","scope":"context"},
        {"id":"context-step-counter","partId":"step-counter","title":"Step counter","explanation":"The muted step count at the end of the navigation row on the last step (for example 4 / 4).","keyIdea":"The muted step count at the end of the navigation row on the last step (for example 4 / 4).","selector":"[data-ug-part=\"step-counter\"]","scope":"context"},
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
