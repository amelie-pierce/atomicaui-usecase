import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Button group',
  title: 'End walkthrough buttons',
  look: 'Text with icons',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  cases: [
    { id: 'hcs-last-step', name: 'Last step', apps: ['hcs'], source: { hcs: 'src/components/F01Walkthrough.tsx' } },
    { id: 'ace-last-step', name: 'Last step', apps: ['ace', 'hs', 'rws', 'agpd'], source: { ace: 'src/features/top-navigation/ui/TutorialWalkthrough.tsx', hs: 'src/hs/Tutorials.tsx', rws: 'src/rws/Tutorials.tsx', agpd: 'src/agpd/Tutorials.tsx' } },
    { id: 'adm-last-step', name: 'Last step', apps: ['adm', 'fd'], source: { adm: 'src/features/top-navigation/components/TutorialWalkthrough.tsx', fd: 'src/components/Walkthrough.jsx' } },
    { id: 'pbs-last-step', name: 'Last step', apps: ['pbs', 'pfd'], source: { pbs: 'src/PbsWalkthrough.tsx', pfd: 'src/pfd/Walkthrough.tsx' } },
  ],
  source: { hcs: 'src/components/F01Walkthrough.tsx', ace: 'src/features/top-navigation/ui/TutorialWalkthrough.tsx', adm: 'src/features/top-navigation/components/TutorialWalkthrough.tsx', pfd: 'src/pfd/Walkthrough.tsx', pbs: 'src/PbsWalkthrough.tsx', hs: 'src/hs/Tutorials.tsx', fd: 'src/components/Walkthrough.jsx', agpd: 'src/agpd/Tutorials.tsx', rws: 'src/rws/Tutorials.tsx' },
  summary: 'Borderless text Buttons close a guided tour on its last step: Previous with arrow-left before it, and End in place of Next.',
  where: 'The navigation row in the footer of the walkthrough card on the last step. Real site source: the walkthrough card of each app (the paths are in source). ADC has no walkthrough.',
  when: 'Use End to close a flow that has been walked through; do not use it to dismiss a tour early, for that use the close icon (Button-030). The steps before the last use Button-023.',
  how: 'aui scale "sm", paint "text" and color "secondary" on every Button; Previous keeps Button.Icon arrow-left, End replaces Next. '
    + 'Four groups, told apart by the End icon and the label style: HCS (End with a check, mixed case, regular weight), ACE, HS, RWS and AGPD (END in capitals, regular weight, no icon), ADM and FD (END in capitals, bold, no icon) and PBS and PFD (END in capitals, bold, with the check). '
    + 'The bold capitals are CSS on the row\'s buttons in ADM, PBS and PFD. '
    + 'On the last step the target is the File menu at the right edge, so the card sits to the left of the spotlight, as the app places it when it does not fit on the right.',
});
