import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Close walkthrough button',

  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  options: [
    { id: "hcs-walkthrough-close", name: "Walkthrough close", apps: ["hcs","ace","adm","pfd","pbs","hs","fd","agpd","rws"], source: {"hcs":"src/components/F01Walkthrough.tsx","ace":"src/features/top-navigation/ui/TutorialWalkthrough.tsx","adm":"src/features/top-navigation/components/TutorialWalkthrough.tsx","pfd":"src/pfd/Walkthrough.tsx","pbs":"src/PbsWalkthrough.tsx","hs":"src/hs/Tutorials.tsx","fd":"src/components/Walkthrough.jsx","agpd":"src/agpd/Tutorials.tsx","rws":"src/rws/Tutorials.tsx"} },
  ],
  source: { hcs: 'src/components/F01Experience.tsx', ace: 'src/features/file-persistence/ui/OpenFromDeviceDialog.tsx', adm: 'src/features/top-navigation/components/FeedbackDialog.tsx', pfd: 'src/pfd/ShellDialogs.tsx', pbs: 'src/ResultsSection.tsx', hs: 'src/hs/ShellDialog.tsx', fd: 'src/components/ui.jsx', agpd: 'src/agpd/ShellDialogs.tsx', rws: 'src/rws/ShellDialogs.tsx' },
  summary: 'A transparent icon-only IconButton, 20px square, dismisses the coach-mark card of a walkthrough from its corner.',
  where: 'The corner of the coach-mark card of a walkthrough. Real site source: the walkthrough card of the nine apps with a tour (the paths are in source); ADC has none.',
  when: 'Use it to dismiss a tour early; to finish a tour use End (Button-024). Always set aria-label.',
  how: 'All nine apps write the same IconButton with scale "sm", paint "text" and color "surface"; the glyph is xmark (the apps pass family classic and layer duotone, which is the provider default here). '
    + 'In context the X sits in the corner of the step 1 card (HCS Connection Type, so only Next in the footer), 4px in, through an inline style (the apps use a local class such as .hcs-tour-close because the kit sx has no inset axis); the title reserves 24px at its end so its text stops short of it. '
    + 'RWS hides the X on one step of its tour (a step with close set to false); that is a rule of its steps, not another UI. The footer of the scene is HCS\'s; the other apps\' footers are in Button-023.',
  anatomy: [
    { id: 'card', name: 'Walkthrough card', token: 'View', selector: '[role="region"][aria-label="Walkthrough"]', description: 'The 328px coach-mark card for the Connection Type step with its text and footer navigation.' },
    { id: 'close', name: 'Close', token: 'IconButton', selector: '[class~="aui-button"][aria-label^="Close"]', description: 'The 20px transparent xmark button pinned to the card corner (4px inset) that dismisses the HCS walkthrough; HCS wraps it in an absolute span.' },
    { id: 'close-icon', name: 'Close icon', token: 'IconButton', selector: '[class~="aui-button"][aria-label^="Close"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])', description: 'The xmark glyph inside the close button.' },
    { id: 'next', name: 'Next', token: 'Button', selector: '[class~="aui-button"]:not([aria-label])', description: 'The step button that is the only navigation on step 1 / 6 (Next with arrow-right); Close is the way out without finishing.' },
  ],
});
