import { defineUsecase } from '../../../define';

const TOUR_CONTEXT = [
  { id: 'tour-target', name: 'Spotlight target', selector: '[class~="ug-tour__target"]', description: 'The Connection Type section header that the first step points at, beside the card (a stand-in for the app page).' },
  { id: 'step-title', name: 'Step title', selector: '[data-ug-part="step-title"]', description: 'The medium-weight Connection Type heading with room reserved at its end so its text stops short of the close X.' },
  { id: 'step-counter', name: 'Step counter', selector: '[data-ug-part="step-counter"]', description: 'The muted 1 / 6 step count at the end of the footer row, beside Next.' },
];

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Close walkthrough button',

  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
    layers: [
        {"id":"card","partId":"card","title":"Walkthrough card","explanation":"The 328px coach-mark card for the Connection Type step with its text and footer navigation.","keyIdea":"The coach mark combines its first instruction with tour controls.","selector":"[role=\"region\"][aria-label=\"Walkthrough\"]"},
        {"id":"close","partId":"close","title":"Close","explanation":"The 20px transparent xmark button pinned to the card corner (4px inset) that dismisses the HCS walkthrough; HCS wraps it in an absolute span.","keyIdea":"The corner xmark dismisses this walkthrough without advancing it.","selector":"[class~=\"aui-button\"][aria-label^=\"Close\"]"},
        {"id":"close-icon","partId":"close-icon","title":"Close icon","explanation":"The xmark glyph inside the close button.","keyIdea":"The close icon remains visually separate from the card navigation.","selector":"[class~=\"aui-button\"][aria-label^=\"Close\"] > :is([class~=\"aui-icon\"], [class~=\"aui-contained-icon\"])"},
        {"id":"next","partId":"next","title":"Next","explanation":"The step button that is the only navigation on step 1 / 6 (Next with arrow-right); Close is the way out without finishing.","keyIdea":"Next advances from the first Connection Type instruction.","selector":"[class~=\"aui-button\"]:not([aria-label])"},
      ],
options: [
    { id: "hcs-walkthrough-close", contextAnatomy: TOUR_CONTEXT, name: "Walkthrough close", apps: ["hcs","ace","adm","pfd","pbs","hs","fd","agpd","rws"], source: {"hcs":"src/components/F01Walkthrough.tsx","ace":"src/features/top-navigation/ui/TutorialWalkthrough.tsx","adm":"src/features/top-navigation/components/TutorialWalkthrough.tsx","pfd":"src/pfd/Walkthrough.tsx","pbs":"src/PbsWalkthrough.tsx","hs":"src/hs/Tutorials.tsx","fd":"src/components/Walkthrough.jsx","agpd":"src/agpd/Tutorials.tsx","rws":"src/rws/Tutorials.tsx"} ,
      contextLayers: [
        {"id":"context-tour-target","partId":"tour-target","title":"Spotlight target","explanation":"The Connection Type section header that the first step points at, beside the card (a stand-in for the app page).","keyIdea":"The spotlight ties the card to the Connection Type section it describes.","selector":"[class~=\"ug-tour__target\"]","scope":"context"},
        {"id":"context-step-title","partId":"step-title","title":"Step title","explanation":"The medium-weight Connection Type heading with room reserved at its end so its text stops short of the close X.","keyIdea":"The heading names the current Connection Type step beside the close control.","selector":"[data-ug-part=\"step-title\"]","scope":"context"},
        {"id":"context-step-counter","partId":"step-counter","title":"Step counter","explanation":"The muted 1 / 6 step count at the end of the footer row, beside Next.","keyIdea":"The counter marks the first of six walkthrough instructions.","selector":"[data-ug-part=\"step-counter\"]","scope":"context"},
      ],
    },
  ],
  source: { hcs: 'src/components/F01Experience.tsx', ace: 'src/features/file-persistence/ui/OpenFromDeviceDialog.tsx', adm: 'src/features/top-navigation/components/FeedbackDialog.tsx', pfd: 'src/pfd/ShellDialogs.tsx', pbs: 'src/ResultsSection.tsx', hs: 'src/hs/ShellDialog.tsx', fd: 'src/components/ui.jsx', agpd: 'src/agpd/ShellDialogs.tsx', rws: 'src/rws/ShellDialogs.tsx' },
  summary: 'A transparent icon-only IconButton, 20px square, dismisses the coach-mark card of a walkthrough from its corner.',
  where: 'The corner of the coach-mark card of a walkthrough. Real site source: the walkthrough card of the nine apps with a tour (the paths are in source); ADC has none.',
  when: 'Use it to dismiss a tour early; to finish a tour use End (Button-024). Always set aria-label.',
  how: 'All nine apps write the same IconButton with scale "sm", paint "text" and color "surface"; the glyph is xmark (the apps pass family classic and layer duotone, which is the provider default here). '
    + 'In context the X sits in the corner of the step 1 card (HCS Connection Type, so only Next in the footer), 4px in, through an inline style (the apps use a local class such as .hcs-tour-close because the kit sx has no inset axis); the title reserves 24px at its end so its text stops short of it. '
    + 'RWS hides the X on one step of its tour (a step with close set to false); that is a rule of its steps, not another UI. The footer of the scene is HCS\'s; the other apps\' footers are in Button-023.',
  anatomy: [
    { id: 'card', name: 'Walkthrough card', selector: '[role="region"][aria-label="Walkthrough"]', description: 'The 328px coach-mark card for the Connection Type step with its text and footer navigation.' },
    { id: 'close', name: 'Close', selector: '[class~="aui-button"][aria-label^="Close"]', description: 'The 20px transparent xmark button pinned to the card corner (4px inset) that dismisses the HCS walkthrough; HCS wraps it in an absolute span.' },
    { id: 'close-icon', name: 'Close icon', selector: '[class~="aui-button"][aria-label^="Close"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])', description: 'The xmark glyph inside the close button.' },
    { id: 'next', name: 'Next', selector: '[class~="aui-button"]:not([aria-label])', description: 'The step button that is the only navigation on step 1 / 6 (Next with arrow-right); Close is the way out without finishing.' },
  ],
});
