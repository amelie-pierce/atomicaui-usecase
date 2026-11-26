import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Start tutorial topic button',

  apps: ['ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
    layers: [
        {"id":"container","partId":"container","title":"Container","explanation":"Full-width tutorial row puts its topic left and arrow right.","keyIdea":"A full-row text control gives each tutorial a generous activation target.","selector":"[data-ug-part=\"container\"]"},
        {"id":"icon","partId":"icon","title":"Icon","explanation":"Trailing arrow signals that the tutorial tour starts.","keyIdea":"The trailing arrow marks the topic row as an entry point to a guided tour.","selector":"[data-ug-part=\"icon\"]"},
      ],
options: [
    { id: "hs-topic-row", name: "Topic row", apps: ["hs","agpd","rws"], contextAnatomy: [
      { id: "dialog", name: "Help & Tutorials dialog", description: "The open dialog that lists the tutorial topics." },
      { id: "dialog-title", name: "Dialog title", description: "The title bar \"Help & Tutorials\" with the close X." },
      { id: "dialog-close", name: "Close button", description: "The X in the title that closes the dialog." },
      { id: "topic-list", name: "Topic list", description: "The nav column that holds one outlined row per tutorial." },
    ], source: {"hs":"src/hs/Tutorials.tsx","agpd":"src/agpd/Tutorials.tsx","rws":"src/rws/Tutorials.tsx"} ,
      contextLayers: [
        {"id":"context-dialog","partId":"dialog","title":"Help & Tutorials dialog","explanation":"The open dialog that lists the tutorial topics.","keyIdea":"The HS dialog gathers tutorials in one browsable help surface.","selector":"[data-ug-part=\"dialog\"]","scope":"context"},
        {"id":"context-dialog-title","partId":"dialog-title","title":"Dialog title","explanation":"The title bar \"Help & Tutorials\" with the close X.","keyIdea":"The title bar names the tutorial directory and its close route.","selector":"[data-ug-part=\"dialog-title\"]","scope":"context"},
        {"id":"context-dialog-close","partId":"dialog-close","title":"Close button","explanation":"The X in the title that closes the dialog.","keyIdea":"The close control exits the help list without opening a topic.","selector":"[data-ug-part=\"dialog-close\"]","scope":"context"},
        {"id":"context-topic-list","partId":"topic-list","title":"Topic list","explanation":"The nav column that holds one outlined row per tutorial.","keyIdea":"The navigation column keeps the available walkthrough choices together.","selector":"[data-ug-part=\"topic-list\"]","scope":"context"},
      ],
    },
    { id: "ace-topic-row", name: "Outlined topic row", apps: ["ace"], contextAnatomy: [
      { id: "dialog", name: "Help & Tutorials dialog", description: "The open dialog that lists the tutorial topics." },
      { id: "dialog-title", name: "Dialog title", description: "The title bar \"Help & Tutorials\" with the close X." },
      { id: "dialog-close", name: "Close button", description: "The X in the title that closes the dialog." },
      { id: "topic-list", name: "Topic list", description: "The nav column that holds one outlined row per tutorial." },
      { id: "topic-name", name: "Topic name", description: "The semi-bold topic name (\"ACE: General Tutorial\") stacked above the description." },
      { id: "topic-description", name: "Topic description", description: "The muted description under the topic name." },
    ], source: {"ace":"src/features/top-navigation/ui/TutorialsDialog.tsx"} ,
      contextLayers: [
        {"id":"context-dialog","partId":"dialog","title":"Help & Tutorials dialog","explanation":"The open dialog that lists the tutorial topics.","keyIdea":"ACE presents the same tutorial directory as a distinct app-context variant.","selector":"[data-ug-part=\"dialog\"]","scope":"context"},
        {"id":"context-dialog-title","partId":"dialog-title","title":"Dialog title","explanation":"The title bar \"Help & Tutorials\" with the close X.","keyIdea":"The ACE title confirms which help surface the selected topic belongs to.","selector":"[data-ug-part=\"dialog-title\"]","scope":"context"},
        {"id":"context-dialog-close","partId":"dialog-close","title":"Close button","explanation":"The X in the title that closes the dialog.","keyIdea":"The ACE close control dismisses the directory from its title bar.","selector":"[data-ug-part=\"dialog-close\"]","scope":"context"},
        {"id":"context-topic-list","partId":"topic-list","title":"Topic list","explanation":"The nav column that holds one outlined row per tutorial.","keyIdea":"The ACE topic column keeps each available walkthrough in a single list.","selector":"[data-ug-part=\"topic-list\"]","scope":"context"},
        {"id":"context-topic-name","partId":"topic-name","title":"Topic name","explanation":"The semi-bold topic name (\"ACE: General Tutorial\") stacked above the description.","keyIdea":"The topic name identifies the selected ACE walkthrough before its summary.","selector":"[data-ug-part=\"topic-name\"]","scope":"context"},
        {"id":"context-topic-description","partId":"topic-description","title":"Topic description","explanation":"Muted line explains the selected tutorial topic below.","keyIdea":"The muted copy previews what the ACE tutorial will cover.","selector":"[data-ug-part=\"topic-description\"]","scope":"context"},
      ],
    },
    { id: "adm-topic-row", name: "Icon topic row", apps: ["adm","pfd"], contextAnatomy: [
      { id: "dialog", name: "Help & Tutorials dialog", description: "The open dialog that lists the tutorial topics." },
      { id: "dialog-title", name: "Dialog title", description: "The title bar \"Help & Tutorials\" with the close X." },
      { id: "dialog-close", name: "Close button", description: "The X in the title that closes the dialog." },
      { id: "topic-list", name: "Topic list", description: "The nav column that holds one outlined row per tutorial." },
    ], source: {"adm":"src/features/top-navigation/components/Tutorials.tsx","pfd":"src/pfd/ShellDialogs.tsx"} ,
      contextLayers: [
        {"id":"context-dialog","partId":"dialog","title":"Help & Tutorials dialog","explanation":"The open dialog that lists the tutorial topics.","keyIdea":"ADM and PFD group the tutorial choices inside their help dialog.","selector":"[data-ug-part=\"dialog\"]","scope":"context"},
        {"id":"context-dialog-title","partId":"dialog-title","title":"Dialog title","explanation":"The title bar \"Help & Tutorials\" with the close X.","keyIdea":"The ADM and PFD title labels the list of available walkthroughs.","selector":"[data-ug-part=\"dialog-title\"]","scope":"context"},
        {"id":"context-dialog-close","partId":"dialog-close","title":"Close button","explanation":"The X in the title that closes the dialog.","keyIdea":"The close icon leaves the ADM or PFD tutorial directory.","selector":"[data-ug-part=\"dialog-close\"]","scope":"context"},
        {"id":"context-topic-list","partId":"topic-list","title":"Topic list","explanation":"The nav column that holds one outlined row per tutorial.","keyIdea":"The topic navigation column lets users scan available guidance.","selector":"[data-ug-part=\"topic-list\"]","scope":"context"},
      ],
    },
    { id: "pbs-topic-row", name: "Compact topic row", apps: ["pbs","fd"], contextAnatomy: [
      { id: "dialog", name: "Help & Tutorials dialog", description: "The open dialog that lists the tutorial topics." },
      { id: "dialog-title", name: "Dialog title", description: "The title bar \"Help & Tutorials\" with the close X." },
      { id: "dialog-close", name: "Close button", description: "The X in the title that closes the dialog." },
      { id: "topic-list", name: "Topic list", description: "The nav column that holds one outlined row per tutorial." },
    ], source: {"pbs":"src/PbsHelpTutorials.tsx","fd":"src/components/HelpCenter.jsx"} ,
      contextLayers: [
        {"id":"context-dialog","partId":"dialog","title":"Help & Tutorials dialog","explanation":"The open dialog that lists the tutorial topics.","keyIdea":"PBS and FD place the tutorial rows in a shared help dialog.","selector":"[data-ug-part=\"dialog\"]","scope":"context"},
        {"id":"context-dialog-title","partId":"dialog-title","title":"Dialog title","explanation":"The title bar \"Help & Tutorials\" with the close X.","keyIdea":"The shared title distinguishes the tutorial directory from its selected content.","selector":"[data-ug-part=\"dialog-title\"]","scope":"context"},
        {"id":"context-dialog-close","partId":"dialog-close","title":"Close button","explanation":"The X in the title that closes the dialog.","keyIdea":"The close action returns users to the app without starting a walkthrough.","selector":"[data-ug-part=\"dialog-close\"]","scope":"context"},
        {"id":"context-topic-list","partId":"topic-list","title":"Topic list","explanation":"The nav column that holds one outlined row per tutorial.","keyIdea":"The list keeps each tutorial entry available for selection.","selector":"[data-ug-part=\"topic-list\"]","scope":"context"},
      ],
    },
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
      description: "One tutorial topic row: a full-width small text Button, label at the start and arrow at the end (justifyContent \"between\"), outlined by a 1px border on all four sides from sx.",
      selector: "[data-ug-part=\"container\"]",
    },
    {
      id: "label",
      name: "Label",
      description: "The topic name, \"HS: General Tutorial\" in the example, wrapping onto several lines when long.",
      selector: "[data-ug-part=\"container\"]",
      text: true,
    },
    {
      id: "icon",
      name: "Icon",
      description: "The right arrow at the end of the row that signals starting the tour, at scale \"sm\".",
      selector: "[data-ug-part=\"icon\"]",
    },
  ],
});
