import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Walkthrough',
  title: 'Walkthrough close',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
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
  contextVariant: 'close',
  summary: 'A transparent X IconButton closes the walkthrough card.',
  where: 'The top corner of a coach-mark card. Real site source: the walkthrough card of each app (the paths are in source); all nine write the same IconButton, so the preview has no app toggle. ADC has no walkthrough.',
  when: 'Use it to dismiss a card without acting. Unlike the panel icon buttons it uses the surface color.',
  how: "Set aui scale \"sm\", paint \"text\" and color \"surface\". The glyph is xmark (the apps pass family classic and layer duotone, which is the provider default here). In context the X sits in the corner of the step 1 card (HCS Connection Type, so only Next in the footer), 4px in, through an inline style (the apps use a local class such as .hcs-tour-close because the kit sx has no inset axis); the title reserves 24px at its end so its text stops short of it. RWS hides the X on one step of its tour (a step with close set to false); that is a rule of its steps, not another UI. The footer of the scene is HCS's; the other apps' footers are in Button-004.",
});
