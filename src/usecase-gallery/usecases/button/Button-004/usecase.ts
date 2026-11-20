import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Button group',
  title: 'Walkthrough navigation, text with icons',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  cases: [
    { id: 'hcs-step-nav', name: 'Step navigation', apps: ['hcs'], source: { hcs: 'src/components/F01Walkthrough.tsx' } },
    {
      id: 'ace-step-nav',
      name: 'Step navigation',
      apps: ['ace', 'hs', 'rws', 'agpd'],
      source: {
        ace: 'src/features/top-navigation/ui/TutorialWalkthrough.tsx',
        hs: 'src/hs/Tutorials.tsx',
        rws: 'src/rws/Tutorials.tsx',
        agpd: 'src/agpd/Tutorials.tsx',
      },
    },
    {
      id: 'adm-step-nav',
      name: 'Step navigation',
      apps: ['adm', 'pbs', 'pfd', 'fd'],
      source: {
        adm: 'src/features/top-navigation/components/TutorialWalkthrough.tsx',
        pbs: 'src/PbsWalkthrough.tsx',
        pfd: 'src/pfd/Walkthrough.tsx',
        fd: 'src/components/Walkthrough.jsx',
      },
    },
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
  summary: 'Borderless text Buttons step back and forward through a guided tour: Previous with arrow-left before it, then Next with arrow-right after it, or End on the last step.',
  where: 'The navigation row in the footer of the card of a coach-mark walkthrough. Two places: Step navigation, on every step that is not the last (Previous and Next), and Last step, where End replaces Next. Real site source: the walkthrough card of each app (the paths are in source). ADC has no walkthrough.',
  when: 'Use it for step navigation where no single step is the primary action, so neither Button is filled, and to close a flow that has been walked through with End. Do not use it for form submission, and do not use End to dismiss a tour early; for that use the close icon (Button-031).',
  how: "The props are the same in every app and place: aui scale \"sm\", paint \"text\" and color \"secondary\" on every Button, Button.Icon arrow-left before the label of Previous (only when step > 0). Step navigation puts Next with arrow-right after its label; Last step replaces Next with End, which is a place, not another variant. The preview has a radio group of the two places and, under each, a toggle of the app groups. Step navigation has three groups: HCS (mixed case Previous and Next, regular weight, counter pushed to the end by a CSS margin), ACE, HS, RWS and AGPD (PREVIOUS and NEXT typed in capitals, regular weight, counter at the end by justify between) and ADM, PBS, PFD and FD (capitals at the bold weight, which the apps set by CSS on the row's buttons, counter pushed by a CSS margin). Last step has four groups: HCS (End with a check, mixed case, regular weight), ACE, HS, RWS and AGPD (END in capitals, regular weight, no icon), ADM and FD (END in capitals, bold, no icon) and PBS and PFD (END in capitals, bold, with the check); the End icon and the label style tell them apart. The bold capitals are CSS on the row's buttons in ADM, PBS and PFD. The scenes keep the card, its close X, the title, one tip line, the navigation row and the counter, with the app's own step copy; the spotlight target is the gallery's shared stand-in, not the app's page, and the card and spotlight sit at fixed numbers where the app measures them. On the last step the target is the File menu at the right edge, so the card sits to the left of the spotlight, as the app places it when it does not fit on the right. Icons need the Font Awesome font to show.",
});
