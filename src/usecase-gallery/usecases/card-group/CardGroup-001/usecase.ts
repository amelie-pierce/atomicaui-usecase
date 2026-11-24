import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'CardGroup',
  title: 'Selectable template cards',
  apps: ['adc'],
  options: [
    { id: "adc-new-project", name: "New project templates", source: {"adc":"src/adc/components/NewProjectDialog.tsx"} },
  ],
  source: { adc: 'src/adc/components/NewProjectDialog.tsx' },
  summary: 'A labelled grid of image cards with a search and a view toggle, where one card is selected.',
  where: 'The User Templates section of the ADC New Project dialog (src/adc/components/NewProjectDialog.tsx).',
  when: 'Use it to choose one item from a set that is recognised by picture, with search for a long set. Use a RadioGroup for a short text list.',
  how: '`CardGroup` with `value` and `onValueChange` (a string or null), a `CardGroup.Label`, a `CardGroup.Toolbar` holding `CardGroup.Search` and `CardGroup.ViewToggle`, `CardGroup.Items` (`columns`, `maxHeight`) of `CardGroup.Item`s (`value`, `textValue`, `shape: "none"`, per-state `aui`: unselected surface tonal with an outlined border, selected primary tonal that returns the surface fill) each with `CardGroup.ItemImage` (`ratio="4:3"`) and `CardGroup.ItemBody` > `CardGroup.ItemTitle`, and `CardGroup.Empty` for no match. The example shows two columns; the app shows four with a fixed section height. The scene leaves out the dropzone and the warning.',
  anatomy: [
    {
      id: 'group',
      name: 'Card group',
      token: 'CardGroup',
      selector: '[class~="aui-card-group"]',
      description: 'Selection group of template cards with template-1 selected through defaultValue; the ADC scene hosts it in the New Project dialog body.',
      code: `<CardGroup defaultValue="template-1">`,
    },
    {
      id: 'label',
      name: 'Label',
      token: 'CardGroup.Label',
      selector: '[class~="aui-card-group"] [class~="aui-label"]',
      description: 'Semi-bold heading "User Templates" above the toolbar.',
      code: `<CardGroup.Label aui={{ sx: { typographyStyle: 'semi-bold' } }}>User Templates</CardGroup.Label>`,
    },
    {
      id: 'toolbar',
      name: 'Toolbar',
      token: 'CardGroup.Toolbar',
      selector: '[class~="aui-card-group-toolbar"]',
      description: 'Row above the cards that holds the search and the view toggle.',
      code: `<CardGroup.Toolbar>
  <CardGroup.Search placeholder="Search template" />
  <CardGroup.ViewToggle />
</CardGroup.Toolbar>`,
    },
    {
      id: 'search',
      name: 'Search',
      token: 'CardGroup.Search',
      selector: '[class~="aui-card-group-search"]',
      description: 'Search field with the placeholder "Search template".',
      code: `<CardGroup.Search placeholder="Search template" />`,
    },
    {
      id: 'view-toggle',
      name: 'View toggle',
      token: 'CardGroup.ViewToggle',
      selector: '[class~="aui-card-group-view-toggle"]',
      description: 'Switch between card and list view of the templates.',
      code: `<CardGroup.ViewToggle />`,
    },
    {
      id: 'items',
      name: 'Items',
      token: 'CardGroup.Items',
      selector: '[class~="aui-card-group-items"]',
      description: 'Two-column grid with no gap that lays out Template 1 and Template 2.',
      code: `<CardGroup.Items columns={2} aui={{ scale: 'sm', profile: 'no-padding', sx: { gap: '0' } }}>`,
    },
    {
      id: 'item',
      name: 'Item',
      token: 'CardGroup.Item',
      selector: '[class~="aui-card-group-item"]',
      description: 'A selectable template card with shape "none"; the selected one is primary tonal on a surface background, the others a tonal surface with an outlined border.',
      code: `<CardGroup.Item
  key={name}
  value={\`template-\${index + 1}\`}
  textValue={name}
  aui={{ shape: 'none', states: { unselected: { … }, selected: { … } } }}
>`,
    },
    {
      id: 'item-image',
      name: 'Item image',
      token: 'CardGroup.ItemImage',
      selector: '[class~="aui-card-group-item-image"]',
      description: '4:3 thumbnail at the top of each template card.',
      code: `<CardGroup.ItemImage src={MOCK_IMAGE_SRC} alt="" ratio="4:3" />`,
    },
    {
      id: 'item-body',
      name: 'Item body',
      token: 'CardGroup.ItemBody',
      selector: '[class~="aui-card-group-item-body"]',
      description: 'Area under the thumbnail that carries the template name.',
      code: `<CardGroup.ItemBody>
  <CardGroup.ItemTitle … />
</CardGroup.ItemBody>`,
    },
    {
      id: 'item-title',
      name: 'Item title',
      token: 'CardGroup.ItemTitle',
      selector: '[class~="aui-card-group-item-title"]',
      description: 'Centred template name, Template 1 or Template 2.',
      code: `<CardGroup.ItemTitle aui={{ sx: { textAlign: 'center' } }}>{name}</CardGroup.ItemTitle>`,
    },
    {
      id: 'empty',
      name: 'Empty',
      token: 'CardGroup.Empty',
      selector: '[class~="aui-card-group-empty"]',
      description: 'Message "No templates match your search" shown over the grid when the search filters everything out.',
      code: `<CardGroup.Empty>No templates match your search</CardGroup.Empty>`,
    },
  ],
});
