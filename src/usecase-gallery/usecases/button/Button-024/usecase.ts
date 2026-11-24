import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Button group',
  title: 'End walkthrough buttons',

  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  options: [
    { id: "hcs-last-step", name: "Last step", apps: ["hcs"], source: {"hcs":"src/components/F01Walkthrough.tsx"} },
    { id: "ace-last-step", name: "Last step — UI variant 2", apps: ["ace","hs","rws","agpd"], source: {"ace":"src/features/top-navigation/ui/TutorialWalkthrough.tsx","hs":"src/hs/Tutorials.tsx","rws":"src/rws/Tutorials.tsx","agpd":"src/agpd/Tutorials.tsx"} },
    { id: "adm-last-step", name: "Last step — UI variant 3", apps: ["adm","fd"], source: {"adm":"src/features/top-navigation/components/TutorialWalkthrough.tsx","fd":"src/components/Walkthrough.jsx"} },
    { id: "pbs-last-step", name: "Last step — UI variant 4", apps: ["pbs","pfd"], source: {"pbs":"src/PbsWalkthrough.tsx","pfd":"src/pfd/Walkthrough.tsx"} },
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
    { id: 'step-nav', name: 'Navigation row', token: 'View', selector: '[data-ug-part="step-nav"]', description: 'The footer row of the last-step card that holds Previous and End; the step counter (4 / 4, 12 / 12 or 6 / 6) sits at its far end.',
      code: `<View data-ug-part="step-nav" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
  …
</View>` },
    { id: 'previous', name: 'Previous', token: 'Button', selector: '[class~="aui-button"]:not([aria-label]):first-of-type', description: 'Borderless secondary text button with arrow-left that steps back from the last step; the label is Previous or PREVIOUS depending on the app.',
      code: `<Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
  <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
  Previous
</Button>` },
    { id: 'previous-icon', name: 'Arrow-left icon', token: 'Button.Icon', selector: '[class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-contained-icon"]', description: 'The arrow-left glyph before the label, pointing the way the tour goes back.',
      code: `<Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />` },
    { id: 'forward', name: 'End', token: 'Button', selector: '[class~="aui-button"]:not([aria-label]):last-of-type', description: 'The closing button that replaces Next on the final step and ends the tour; it is typed END in ACE, HS, RWS, AGPD, ADM and FD.',
      code: `<Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>End</Button>` },
    { id: 'forward-icon', name: 'Check icon', token: 'Button.Icon', selector: '[class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-contained-icon"]', description: 'The check glyph after End that HCS, PBS and PFD add to mark completion; ACE, HS, RWS, AGPD, ADM and FD show no icon.',
      code: `<Button.Icon name="check" aui={{ scale: 'sm' }} />` },
  ],
});
