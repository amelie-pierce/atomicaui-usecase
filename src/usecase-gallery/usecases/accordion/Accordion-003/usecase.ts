import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Titled accordion',
  title: 'Plain title',
  apps: ['ace', 'hs', 'fd'],
  options: [
    { id: "ace-template-groups", name: "Template groups", apps: ["ace"], source: {"ace":"src/features/templates/ui/NewFromTemplateDialog.tsx"} },
    { id: "hs-template-groups", name: "Template groups — UI variant 2", apps: ["hs","fd"], source: {"hs":"src/hs/TemplateDialogs.tsx","fd":"src/components/TemplatesDialog.jsx"} },
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
      token: 'Accordion',
      selector: '[class~="aui-accordion"]',
      description: 'Template picker that opens both groups by default (openMultiple, defaultValue default and mine); the ACE and HS scenes wrap it in a RadioGroup in a Templates dialog.',
      code: `<Accordion openMultiple defaultValue={['default', 'mine']}>`,
    },
    {
      id: 'item',
      name: 'Item',
      token: 'Accordion.Item',
      selector: '[class~="aui-accordion-item"]',
      description: 'One template group, Default Templates or My Templates.',
      code: `<Accordion.Item value="default">`,
    },
    {
      id: 'trigger',
      name: 'Trigger',
      token: 'Accordion.Trigger',
      selector: '[class~="aui-accordion-trigger"]',
      description: 'Plain title row with no icon; ACE sets the name as an l4 Type, HS as bare text.',
      code: `<Accordion.Trigger>
  Default Templates
  <Accordion.Chevron />
</Accordion.Trigger>`,
    },
    {
      id: 'chevron',
      name: 'Chevron',
      token: 'Accordion.Chevron',
      selector: '[class~="aui-accordion-trigger"] > [class~="aui-accordion-chevron"]',
      description: 'Chevron on the right of each group title.',
      code: `<Accordion.Chevron />`,
    },
    {
      id: 'panel',
      name: 'Panel',
      token: 'Accordion.Panel',
      selector: '[class~="aui-accordion-panel"]',
      description: 'Rows of the group: Two-beam connection under Default Templates, and "Create your own template." (Header hanger in the dialogs) under My Templates.',
      code: `<Accordion.Panel>
  <Type as="p" role="p3">Two-beam connection</Type>
</Accordion.Panel>`,
    },
    {
      id: 'radio',
      name: 'Template radio',
      token: 'Radio',
      selector: '[class~="aui-accordion-panel"] [class~="aui-radio"]',
      description: 'Dialog scenes only: each template row is a radio with its name as Radio.Label, with one selected through RadioGroup defaultValue="2".',
      code: `<Radio value="2" aui={{ ...SELECTION, sx: { flex: 'fill' } }}>
  <Radio.Label>Header hanger</Radio.Label>
</Radio>`,
    },
  ],
});
