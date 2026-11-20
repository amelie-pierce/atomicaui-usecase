import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Button group',
  title: 'Previous and Next, text with icons',
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
  summary: 'Borderless text Buttons step back and forward through a guided tour, with arrow-left before Previous and arrow-right after Next.',
  where: 'The card of a coach-mark walkthrough, on every step that is not the last. Real site source: the walkthrough card of each app (the paths are in source). The last step swaps Next for End (Button-005). ADC has no walkthrough.',
  when: 'Use it for step navigation where no single step is the primary action, so neither Button is filled. Do not use it for form submission.',
  how: "The props are the same in every app: aui scale \"sm\", paint \"text\" and color \"secondary\" on both, Button.Icon arrow-left before the label of Previous (only when step > 0) and arrow-right after the label of Next. The apps differ in how the labels look, so there are three UIs, one scene each, and the preview has a toggle of the three groups: HCS (mixed case Previous and Next, regular weight, counter pushed to the end by a CSS margin), ACE, HS, RWS and AGPD (PREVIOUS and NEXT typed in capitals, regular weight, counter at the end by justify between) and ADM, PBS, PFD and FD (capitals at the bold weight, which the apps set by CSS on the row's buttons, counter pushed by a CSS margin). The scenes keep the card, its close X, the title, one tip line, the navigation row and the counter, with the app's own step copy; the spotlight target is the gallery's shared stand-in, not the app's page, and the card and spotlight sit at fixed numbers where the app measures them. Icons need the Font Awesome font to show.",
});
