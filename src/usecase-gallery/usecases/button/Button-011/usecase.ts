import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Start tutorial topic button',
  look: 'Outlined full-width row',
  apps: ['ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  cases: [
    { id: 'hs-topic-row', name: 'Topic row', apps: ['hs', 'agpd', 'rws'], source: { hs: 'src/hs/Tutorials.tsx', agpd: 'src/agpd/Tutorials.tsx', rws: 'src/rws/Tutorials.tsx' } },
    { id: 'ace-topic-row', name: 'Topic row', apps: ['ace'], source: { ace: 'src/features/top-navigation/ui/TutorialsDialog.tsx' } },
    { id: 'adm-topic-row', name: 'Topic row', apps: ['adm', 'pfd'], source: { adm: 'src/features/top-navigation/components/Tutorials.tsx', pfd: 'src/pfd/ShellDialogs.tsx' } },
    { id: 'pbs-topic-row', name: 'Topic row', apps: ['pbs', 'fd'], source: { pbs: 'src/PbsHelpTutorials.tsx', fd: 'src/components/HelpCenter.jsx' } },
  ],
  source: { ace: 'src/features/top-navigation/ui/TutorialsDialog.tsx', adm: 'src/features/top-navigation/components/Tutorials.tsx', pfd: 'src/pfd/ShellDialogs.tsx', pbs: 'src/PbsHelpTutorials.tsx', hs: 'src/hs/Tutorials.tsx', fd: 'src/components/HelpCenter.jsx', agpd: 'src/agpd/Tutorials.tsx', rws: 'src/rws/Tutorials.tsx' },
  summary: 'A full-width text Button with an outlined border is one tutorial topic in the Help & Tutorials list; pressing it starts that guided tour.',
  where: 'The body of the Help & Tutorials dialog or dock, one row per topic in a vertical nav. Real site source: the tutorials list of each app (the paths are in source). '
    + 'HCS has no such Button: its Help Center lists the tutorial as a menu item. ADC has no tutorials.',
  when: 'Use it to start one guided tour from a list of tours. Do not use it for a single-action footer; the tour itself steps with Previous and Next (Button-023).',
  how: 'Set aui scale "sm" and paint "text" with sx width "fill", justifyContent "between", textAlign "start", whiteSpace "normal" and a 1px solid outlined border on every side (the kit has no outlined text profile, so the border comes from sx). '
    + 'The apps write four UIs, one scene each, and the preview has a toggle of the four groups: HS, AGPD and RWS (a 384px Dialog; the label then an arrow-right), ACE (the same dialog, each row stacks the name in semi-bold over a muted description, no arrow), ADM and PFD (a non-modal Help & Tutorials dock, the label only) and PBS and FD (the dock, the label then an arrow-right). '
    + 'ADM and PBS style the row with a class (.adm-help-link, .pbs-help-link); the scenes write the same border and layout as sx, as PFD and FD do. '
    + 'The docks are pinned bottom-right (420px) with a centred title by local CSS in the apps; the scenes show the plain dock Popup. '
    + 'Each scene keeps the Title with its close X and one topic row; the real lists hold one to nine topics.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      token: "Button",
      description: "One tutorial topic row: a full-width small text Button, label at the start and arrow at the end (justifyContent \"between\"), outlined by a 1px border on all four sides from sx.",
      selector: "[class~=\"aui-button\"]",
      code: "<Button\n  aui={{\n    scale: 'sm',\n    paint: 'text',\n    sx: {\n      width: 'fill',\n      justifyContent: 'between',\n      textAlign: 'start',\n      whiteSpace: 'normal',\n      borderStyle: 'solid',\n      borderColor: 'outlined',\n      …\n    },\n  }}\n>\n  …\n</Button>",
    },
    {
      id: "label",
      name: "Label",
      token: "Button",
      description: "The topic name, \"HS: General Tutorial\" in the example, wrapping onto several lines when long.",
      selector: "[class~=\"aui-button\"]",
      text: true,
      code: "HS: General Tutorial",
    },
    {
      id: "icon",
      name: "Icon",
      token: "Button.Icon",
      description: "The right arrow at the end of the row that signals starting the tour, at scale \"sm\".",
      selector: "[class~=\"aui-button\"] > :is([class~=\"aui-contained-icon\"], [class~=\"aui-icon\"])",
      code: "<Button.Icon name=\"arrow-right\" aui={{ scale: 'sm' }} />",
    },
  ],
});
