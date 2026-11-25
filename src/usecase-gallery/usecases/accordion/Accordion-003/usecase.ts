import { defineUsecase } from '../../../define';

const TEMPLATES_CONTEXT = [
  { id: "templates-dialog", name: "Templates dialog", selector: "[class~=\"aui-dialog-popup\"]", description: "The Dialog popup titled Templates that lists the template groups." },
  { id: "templates-title", name: "Templates title bar", selector: "[class~=\"aui-dialog-title\"]", description: "The raised Dialog.Title reading \"Templates\", with the Close Templates button at its end." },
  { id: "templates-close", name: "Close button", selector: "[class~=\"aui-dialog-close\"]", description: "The X Dialog.Close (aria-label \"Close Templates\") that dismisses the dialog." },
  { id: "templates-body", name: "Templates body", selector: "[class~=\"aui-dialog-body\"]", description: "The scrollable Dialog.Body holding the RadioGroup that wraps the Default Templates and My Templates groups (the Cancel and Create footer is left out)." },
];

export default defineUsecase({
  uiType: 'Titled accordion',
  title: 'Plain title',
  apps: ['ace', 'hs', 'fd'],
    layers: [
        {"id":"accordion","partId":"accordion","title":"Accordion","explanation":"Template picker that opens both groups by default (openMultiple, defaultValue default and mine); the ACE and HS scenes wrap it in a RadioGroup in a Templates dialog.","keyIdea":"The picker root coordinates multiple open template groups without nesting separate disclosure widgets.","selector":"[class~=\"aui-accordion\"]"},
        {"id":"item","partId":"item","title":"Item","explanation":"One template group, Default Templates or My Templates.","keyIdea":"Each item binds a template category heading to just its own choices.","selector":"[class~=\"aui-accordion-item\"]"},
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"Plain title row with no icon; ACE sets the name as an l4 Type, HS as bare text.","keyIdea":"A plain title row keeps group disclosure focused on the category name rather than decoration.","selector":"[class~=\"aui-accordion-trigger\"]"},
        {"id":"chevron","partId":"chevron","title":"Chevron","explanation":"Chevron on the right of each group title.","keyIdea":"The right-side chevron exposes whether templates in that category are available to scan.","selector":"[class~=\"aui-accordion-trigger\"] > [class~=\"aui-accordion-chevron\"]"},
        {"id":"panel","partId":"panel","title":"Panel","explanation":"Rows of the group: Two-beam connection under Default Templates, and \"Create your own template.\" (Header hanger in the dialogs) under My Templates.","keyIdea":"The panel reveals the actual template rows only after its category is open.","selector":"[class~=\"aui-accordion-panel\"]"},
        {"id":"radio","partId":"radio","title":"Template radio","explanation":"Dialog scenes only: each template row is a radio with its name as Radio.Label, with one selected through RadioGroup defaultValue=\"2\".","keyIdea":"The radio control marks one template as the current choice in the dialog scene.","selector":"[class~=\"aui-accordion-panel\"] [class~=\"aui-radio\"]"},
      ],
options: [
    { id: "ace-template-groups", contextAnatomy: TEMPLATES_CONTEXT, name: "Template groups", apps: ["ace"], source: {"ace":"src/features/templates/ui/NewFromTemplateDialog.tsx"} ,
      contextLayers: [
        {"id":"context-templates-dialog","partId":"templates-dialog","title":"Templates dialog","explanation":"The Dialog popup titled Templates that lists the template groups.","keyIdea":"The ACE Templates popup frames the grouped choices as one selection task.","selector":"[class~=\"aui-dialog-popup\"]","scope":"context"},
        {"id":"context-templates-title","partId":"templates-title","title":"Templates title bar","explanation":"The raised Dialog.Title reading \"Templates\", with the Close Templates button at its end.","keyIdea":"The raised Templates heading names the task before users compare available groups.","selector":"[class~=\"aui-dialog-title\"]","scope":"context"},
        {"id":"context-templates-close","partId":"templates-close","title":"Close button","explanation":"The X Dialog.Close (aria-label \"Close Templates\") that dismisses the dialog.","keyIdea":"The labelled close button lets users leave template selection without choosing a row.","selector":"[class~=\"aui-dialog-close\"]","scope":"context"},
        {"id":"context-templates-body","partId":"templates-body","title":"Templates body","explanation":"The scrollable Dialog.Body holding the RadioGroup that wraps the Default Templates and My Templates groups (the Cancel and Create footer is left out).","keyIdea":"The scrollable body keeps the radio choices reachable while the dialog shell stays fixed.","selector":"[class~=\"aui-dialog-body\"]","scope":"context"},
      ],
    },
    { id: "hs-template-groups", contextAnatomy: TEMPLATES_CONTEXT, name: "Template groups — UI variant 2", apps: ["hs","fd"], source: {"hs":"src/hs/TemplateDialogs.tsx","fd":"src/components/TemplatesDialog.jsx"} ,
      contextLayers: [
        {"id":"context-templates-dialog","partId":"templates-dialog","title":"Templates dialog","explanation":"The Dialog popup titled Templates that lists the template groups.","keyIdea":"The HS family popup places template selection inside its app-specific dialog frame.","selector":"[class~=\"aui-dialog-popup\"]","scope":"context"},
        {"id":"context-templates-title","partId":"templates-title","title":"Templates title bar","explanation":"The raised Dialog.Title reading \"Templates\", with the Close Templates button at its end.","keyIdea":"Its title bar labels the dialog while reserving a consistent close target at the end.","selector":"[class~=\"aui-dialog-title\"]","scope":"context"},
        {"id":"context-templates-close","partId":"templates-close","title":"Close button","explanation":"The X Dialog.Close (aria-label \"Close Templates\") that dismisses the dialog.","keyIdea":"The HS close affordance exits the picker without changing the selected template.","selector":"[class~=\"aui-dialog-close\"]","scope":"context"},
        {"id":"context-templates-body","partId":"templates-body","title":"Templates body","explanation":"The scrollable Dialog.Body holding the RadioGroup that wraps the Default Templates and My Templates groups (the Cancel and Create footer is left out).","keyIdea":"The body scroll region contains both template groups while the footer remains outside it.","selector":"[class~=\"aui-dialog-body\"]","scope":"context"},
      ],
    },
  ],
  source: {
    ace: 'src/features/templates/ui/NewFromTemplateDialog.tsx',
    hs: 'src/hs/TemplateDialogs.tsx',
    fd: 'src/components/TemplatesDialog.jsx',
  },
  summary: 'A pick-one list split into two collapsible groups, Default Templates and My Templates, each a plain title with a chevron over its rows.',
  where: 'The New from template dialog in ACE, HS and FD: one Accordion over a RadioGroup, one item per owner (built-in and the user\'s own). ADM groups the same list with plain headings instead of an Accordion (Dialog-004). Real site source: the template dialog of each app (the paths are in source). The dialog shell and the radio rows are Dialog-004.',
  when: 'Use it to fold a long pick-one list into a few named groups, both open at first. Do not use it for input sections (Accordion-001) or release notes (Accordion-002).',
  how: 'An Accordion with openMultiple and both items open by default (defaultValue the two item values), no aui props: plain Accordion.Items, each Accordion.Header holding an Accordion.Trigger with the group title and Accordion.Chevron, and an Accordion.Panel with the rows. The example is that Accordion with a line of text per panel; In context sets it over a RadioGroup in the Templates dialog Body, each row a Radio (an outlined tonal surface when unselected, a solid primary when selected) in place of the text. The apps write two UIs, measured in the gallery: ACE sets the title as Type role "l4" (trigger label 14px on an 18px line); HS and FD write the title as plain trigger text (16px bold on a 20px line). The scenes leave out the user row actions (download, delete, edit), the empty state, more rows, the Cancel and Create footer and the delete confirm.',
  anatomy: [
    {
      id: 'accordion',
      name: 'Accordion',
      selector: '[class~="aui-accordion"]',
      description: 'Template picker that opens both groups by default (openMultiple, defaultValue default and mine); the ACE and HS scenes wrap it in a RadioGroup in a Templates dialog.',
    },
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-accordion-item"]',
      description: 'One template group, Default Templates or My Templates.',
    },
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-accordion-trigger"]',
      description: 'Plain title row with no icon; ACE sets the name as an l4 Type, HS as bare text.',
    },
    {
      id: 'chevron',
      name: 'Chevron',
      selector: '[class~="aui-accordion-trigger"] > [class~="aui-accordion-chevron"]',
      description: 'Chevron on the right of each group title.',
    },
    {
      id: 'panel',
      name: 'Panel',
      selector: '[class~="aui-accordion-panel"]',
      description: 'Rows of the group: Two-beam connection under Default Templates, and "Create your own template." (Header hanger in the dialogs) under My Templates.',
    },
    {
      id: 'radio',
      name: 'Template radio',
      selector: '[class~="aui-accordion-panel"] [class~="aui-radio"]',
      description: 'Dialog scenes only: each template row is a radio with its name as Radio.Label, with one selected through RadioGroup defaultValue="2".',
    },
  ],
});
