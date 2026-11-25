import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: "project-dialog", name: "New Project dialog", selector: "[class~=\"aui-dialog-popup\"]", description: "The Dialog popup titled New Project that hosts the template picker." },
  { id: "project-title", name: "New Project title bar", selector: "[class~=\"aui-dialog-title\"]", description: "The raised Dialog.Title reading \"New Project\", with the Close button at its end." },
  { id: "project-close", name: "Close button", selector: "[class~=\"aui-dialog-close\"]", description: "The X Dialog.Close (aria-label \"Close\") that dismisses the dialog." },
  { id: "project-body", name: "New Project body", selector: "[class~=\"aui-dialog-body\"]", description: "The Dialog.Body that ends with the User Templates card group (the import dropzone and clear-designs warning above it are left out)." },
];

export default defineUsecase({
  uiType: 'CardGroup',
  title: 'Selectable template cards',
  apps: ['adc'],
  options: [
    { id: "adc-new-project", contextAnatomy: CONTEXT_ANATOMY, name: "New project templates", source: {"adc":"src/adc/components/NewProjectDialog.tsx"} },
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
      selector: '[class~="aui-card-group"]',
      description: 'Selection group of template cards with template-1 selected through defaultValue; the ADC scene hosts it in the New Project dialog body.',
    },
    {
      id: 'label',
      name: 'Label',
      selector: '[class~="aui-card-group"] [class~="aui-label"]',
      description: 'Semi-bold heading "User Templates" above the toolbar.',
    },
    {
      id: 'toolbar',
      name: 'Toolbar',
      selector: '[class~="aui-card-group-toolbar"]',
      description: 'Row above the cards that holds the search and the view toggle.',
    },
    {
      id: 'search',
      name: 'Search',
      selector: '[class~="aui-card-group-search"]',
      description: 'Search field with the placeholder "Search template".',
    },
    {
      id: 'view-toggle',
      name: 'View toggle',
      selector: '[class~="aui-card-group-view-toggle"]',
      description: 'Switch between card and list view of the templates.',
    },
    {
      id: 'items',
      name: 'Items',
      selector: '[class~="aui-card-group-items"]',
      description: 'Two-column grid with no gap that lays out Template 1 and Template 2.',
    },
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-card-group-item"]',
      description: 'A selectable template card with shape "none"; the selected one is primary tonal on a surface background, the others a tonal surface with an outlined border.',
    },
    {
      id: 'item-image',
      name: 'Item image',
      selector: '[class~="aui-card-group-item-image"]',
      description: '4:3 thumbnail at the top of each template card.',
    },
    {
      id: 'item-body',
      name: 'Item body',
      selector: '[class~="aui-card-group-item-body"]',
      description: 'Area under the thumbnail that carries the template name.',
    },
    {
      id: 'item-title',
      name: 'Item title',
      selector: '[class~="aui-card-group-item-title"]',
      description: 'Centred template name, Template 1 or Template 2.',
    },
    {
      id: 'empty',
      name: 'Empty',
      selector: '[class~="aui-card-group-empty"]',
      description: 'Message "No templates match your search" shown over the grid when the search filters everything out.',
    },
  ],
});
