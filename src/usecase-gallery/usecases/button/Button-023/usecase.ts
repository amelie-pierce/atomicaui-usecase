import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Button group',
  title: 'Walkthrough step navigation buttons',

  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  options: [
    { id: "hcs-step-nav", name: "Step navigation", apps: ["hcs"], source: {"hcs":"src/components/F01Walkthrough.tsx"} },
    { id: "ace-step-nav", name: "Step navigation — UI variant 2", apps: ["ace","hs","rws","agpd"], source: {"ace":"src/features/top-navigation/ui/TutorialWalkthrough.tsx","hs":"src/hs/Tutorials.tsx","rws":"src/rws/Tutorials.tsx","agpd":"src/agpd/Tutorials.tsx"} },
    { id: "adm-step-nav", name: "Step navigation — UI variant 3", apps: ["adm","pbs","pfd","fd"], source: {"adm":"src/features/top-navigation/components/TutorialWalkthrough.tsx","pbs":"src/PbsWalkthrough.tsx","pfd":"src/pfd/Walkthrough.tsx","fd":"src/components/Walkthrough.jsx"} },
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
    { id: 'card', name: 'Walkthrough card', token: 'View', selector: '[role="region"][aria-label="Walkthrough"]', description: 'The 328px coach-mark card (solid, sm, soft, elevation 4) with the step title, one line of copy and the footer navigation row.',
      code: `<View
  role="region"
  aria-label="Walkthrough"
  className="ug-tour__card"
  aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { … } }}
>
  …
</View>` },
    { id: 'close', name: 'Close', token: 'IconButton', selector: '[class~="aui-button"][aria-label="Close walkthrough"]', description: 'The corner xmark that dismisses the tour from the top end of the card; it is a separate action from the step buttons.',
      code: `<IconButton
  name="xmark"
  aria-label="Close walkthrough"
  aui={{ scale: 'sm', paint: 'text', color: 'surface' }}
  style={{ position: 'absolute', insetBlockStart: 4, insetInlineEnd: 4 }}
/>` },
    { id: 'step-nav', name: 'Navigation row', token: 'View', selector: '[data-ug-part="step-nav"]', description: 'The footer row of the card that holds Previous and Next; ACE, HS, RWS and AGPD nest the two buttons in their own group and put the 2 / 4 counter at the far end, while ADM, PBS, PFD, FD and HCS push the counter right with an auto margin.',
      code: `<View data-ug-part="step-nav" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
  …
</View>` },
    { id: 'previous', name: 'Previous', token: 'Button', selector: '[class~="aui-button"]:not([aria-label]):first-of-type', description: 'Borderless secondary text button with arrow-left before the label; ACE, HS, RWS and AGPD type it as PREVIOUS, HCS keeps mixed case.',
      code: `<Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
  <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
  Previous
</Button>` },
    { id: 'previous-icon', name: 'Arrow-left icon', token: 'Button.Icon', selector: '[class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-contained-icon"]', description: 'The arrow-left glyph before the label, pointing the way the tour goes back.',
      code: `<Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />` },
    { id: 'forward', name: 'Next', token: 'Button', selector: '[class~="aui-button"]:not([aria-label]):last-of-type', description: 'Borderless secondary text button that advances to the next step; its arrow-right trails the label so the pair reads as back and forward.',
      code: `<Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
  Next
  <Button.Icon name="arrow-right" aui={{ scale: 'sm' }} />
</Button>` },
    { id: 'forward-icon', name: 'Trailing icon', token: 'Button.Icon', selector: '[class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-contained-icon"]', description: 'The arrow-right glyph after Next, the mirror of the arrow-left before Previous.',
      code: `<Button.Icon name="arrow-right" aui={{ scale: 'sm' }} />` },
  ],
});
