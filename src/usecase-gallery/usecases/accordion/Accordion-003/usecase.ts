import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Titled accordion',
  title: 'Plain title',
  apps: ['ace', 'hs', 'fd'],
  cases: [
    { id: 'ace-template-groups', name: 'Template groups', apps: ['ace'], source: { ace: 'src/features/templates/ui/NewFromTemplateDialog.tsx' } },
    { id: 'hs-template-groups', name: 'Template groups', apps: ['hs', 'fd'], source: { hs: 'src/hs/TemplateDialogs.tsx', fd: 'src/components/TemplatesDialog.jsx' } },
  ],
  source: {
    ace: 'src/features/templates/ui/NewFromTemplateDialog.tsx',
    hs: 'src/hs/TemplateDialogs.tsx',
    fd: 'src/components/TemplatesDialog.jsx',
  },
  summary: 'A pick-one list split into two collapsible groups, Default Templates and My Templates, each a plain title with a chevron over its rows.',
  where: 'The New from template dialog in ACE, HS and FD: one Accordion over a RadioGroup, one item per owner (built-in and the user\'s own). ADM groups the same list with plain headings instead of an Accordion (Dialog-003). Real site source: the template dialog of each app (the paths are in source). The dialog shell and the radio rows are Dialog-003.',
  when: 'Use it to fold a long pick-one list into a few named groups, both open at first. Do not use it for input sections (Accordion-001) or release notes (Accordion-002).',
  how: 'An Accordion with openMultiple and both items open by default (defaultValue the two item values), no aui props: plain Accordion.Items, each Accordion.Header holding an Accordion.Trigger with the group title and Accordion.Chevron, and an Accordion.Panel with the rows. The example is that Accordion with a line of text per panel; In context sets it over a RadioGroup in the Templates dialog Body, each row a Radio (an outlined tonal surface when unselected, a solid primary when selected) in place of the text. The apps write two UIs, measured in the gallery: ACE sets the title as Type role "l4" (trigger label 14px on an 18px line); HS and FD write the title as plain trigger text (16px bold on a 20px line). The scenes leave out the user row actions (download, delete, edit), the empty state, more rows, the Cancel and Create footer and the delete confirm.',
});
