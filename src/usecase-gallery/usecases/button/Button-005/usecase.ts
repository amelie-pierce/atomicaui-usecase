import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Walkthrough',
  title: 'Last step: End',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  cases: [
    { id: 'hcs-last-step', name: 'Last step', apps: ['hcs'], source: { hcs: 'src/components/F01Walkthrough.tsx' } },
    {
      id: 'ace-last-step',
      name: 'Last step',
      apps: ['ace', 'hs', 'rws', 'agpd'],
      source: {
        ace: 'src/features/top-navigation/ui/TutorialWalkthrough.tsx',
        hs: 'src/hs/Tutorials.tsx',
        rws: 'src/rws/Tutorials.tsx',
        agpd: 'src/agpd/Tutorials.tsx',
      },
    },
    {
      id: 'adm-last-step',
      name: 'Last step',
      apps: ['adm', 'fd'],
      source: { adm: 'src/features/top-navigation/components/TutorialWalkthrough.tsx', fd: 'src/components/Walkthrough.jsx' },
    },
    {
      id: 'pbs-last-step',
      name: 'Last step',
      apps: ['pbs', 'pfd'],
      source: { pbs: 'src/PbsWalkthrough.tsx', pfd: 'src/pfd/Walkthrough.tsx' },
    },
  ],
  source: {
    hcs: 'src/components/F01Walkthrough.tsx',
    ace: 'src/features/top-navigation/ui/TutorialWalkthrough.tsx',
    adm: 'src/features/top-navigation/components/TutorialWalkthrough.tsx',
    pfd: 'src/pfd/Walkthrough.tsx',
    pbs: 'src/PbsWalkthrough.tsx',
    hs: 'src/hs/Tutorials.tsx',
    fd: 'src/components/Walkthrough.jsx',
    agpd: 'src/agpd/Tutorials.tsx',
    rws: 'src/rws/Tutorials.tsx',
  },
  summary: 'A borderless text Button finishes the guided tour; in some apps a check follows the label.',
  where: 'The card of a coach-mark walkthrough, on the last step, where it replaces Next. Real site source: the walkthrough card of each app (the paths are in source). Earlier steps use Previous and Next (Button-004). ADC has no walkthrough.',
  when: 'Use it to close a flow that has been walked through, not to dismiss it early; for that use the close icon (IconButton-001).',
  how: "Set aui scale \"sm\", paint \"text\" and color \"secondary\"; the icon decides the variant, so there are four UIs, one scene each, and the preview has a toggle of the four groups: HCS (End with a check, mixed case, regular weight), ACE, HS, RWS and AGPD (END in capitals, regular weight, no icon), ADM and FD (END in capitals, bold, no icon) and PBS and PFD (END in capitals, bold, with the check). The bold capitals are CSS on the row's buttons in ADM, PBS and PFD. In context this is the last step of the app's tour; the target is the File menu at the right edge, so the card sits to the left of the spotlight, as the app places it when it does not fit on the right. The scenes keep Previous, End, the counter, the title and one tip line, with the app's own step copy, and use the gallery's shared stand-in as the spotlight target.",
});
