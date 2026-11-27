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
options: [
    { id: "ace-template-groups", contextAnatomy: TEMPLATES_CONTEXT, name: "Styled template groups", apps: ["ace"], source: {"ace":"src/features/templates/ui/NewFromTemplateDialog.tsx"} ,
     contextAnatomyOverrides: [{"id":"templates-dialog","lesson":{"explanation":"Templates popup frames grouped choices as one selection task.","scope":"context"}},{"id":"templates-title","lesson":{"explanation":"Raised Templates title names the task beside its close control.","scope":"context"}},{"id":"templates-close","lesson":{"explanation":"Close Templates exits selection without choosing a row.","scope":"context"}},{"id":"templates-body","lesson":{"explanation":"Scrollable dialog body holds both template groups above the footer.","scope":"context"}}]},
    { id: "hs-template-groups", contextAnatomy: TEMPLATES_CONTEXT, name: "Plain template groups", apps: ["hs","fd"], source: {"hs":"src/hs/TemplateDialogs.tsx","fd":"src/components/TemplatesDialog.jsx"} ,
     contextAnatomyOverrides: [{"id":"templates-dialog","lesson":{"explanation":"Templates popup frames grouped choices for this app's selection task.","scope":"context"}},{"id":"templates-title","lesson":{"explanation":"Raised Templates title keeps its close control beside the heading.","scope":"context"}},{"id":"templates-close","lesson":{"explanation":"Close Templates leaves the picker without changing selected template.","scope":"context"}},{"id":"templates-body","lesson":{"explanation":"Scrollable dialog body holds both template groups above the footer.","scope":"context"}}]},
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
     lesson: {"explanation":"Template picker opens both Default Templates and My Templates groups."}},
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-accordion-item"]',
      description: 'One template group, Default Templates or My Templates.',
     lesson: {"explanation":"One collapsible category holds its own template choices."}},
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-accordion-trigger"]',
      description: 'Plain title row with no icon; ACE sets the name as an l4 Type, HS as bare text.',
     lesson: {"explanation":"Plain title row opens the group without a leading icon."}},
    {
      id: 'chevron',
      name: 'Chevron',
      selector: '[class~="aui-accordion-trigger"] > [class~="aui-accordion-chevron"]',
      description: 'Chevron on the right of each group title.',
     lesson: {"explanation":"Chevron on the right of each group title."}},
    {
      id: 'panel',
      name: 'Panel',
      selector: '[class~="aui-accordion-panel"]',
      description: 'Rows of the group: Two-beam connection under Default Templates, and "Create your own template." (Header hanger in the dialogs) under My Templates.',
     lesson: {"explanation":"Panel lists each group's templates, including Create your own."}},
    {
      id: 'radio',
      name: 'Template radio',
      selector: '[class~="aui-accordion-panel"] [class~="aui-radio"]',
      description: 'Dialog scenes only: each template row is a radio with its name as Radio.Label, with one selected through RadioGroup defaultValue="2".',
     lesson: {"explanation":"Each dialog row uses Radio.Label; template two starts selected."}},
  ],
});
