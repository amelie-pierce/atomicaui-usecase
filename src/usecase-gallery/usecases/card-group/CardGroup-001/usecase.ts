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
    layers: [
        {"id":"group","partId":"group","title":"Card group","explanation":"Selection group keeps one template active with template-1 selected.","keyIdea":"The group gives template cards one selection model so only one starter can be active.","selector":"[class~=\"aui-card-group\"]"},
        {"id":"label","partId":"label","title":"Label","explanation":"Semi-bold User Templates heading names the current collection.","keyIdea":"The heading names the collection before users search or change its presentation.","selector":"[class~=\"aui-card-group\"] [class~=\"aui-label\"]"},
        {"id":"toolbar","partId":"toolbar","title":"Toolbar","explanation":"Toolbar groups search and view controls above the cards.","keyIdea":"The toolbar gathers filtering and layout controls before the template choices.","selector":"[class~=\"aui-card-group-toolbar\"]"},
        {"id":"search","partId":"search","title":"Search","explanation":"Search field narrows templates from its Search template placeholder.","keyIdea":"Search narrows the available templates without changing the card selection model.","selector":"[class~=\"aui-card-group-search\"]"},
        {"id":"view-toggle","partId":"view-toggle","title":"View toggle","explanation":"View toggle switches template choices between cards and list.","keyIdea":"The view switch lets users trade visual scanning for a denser list.","selector":"[class~=\"aui-card-group-view-toggle\"]"},
        {"id":"items","partId":"items","title":"Items","explanation":"Two-column grid aligns Template 1 and Template 2 without gaps.","keyIdea":"A two-column grid keeps the template choices aligned as one collection.","selector":"[class~=\"aui-card-group-items\"]"},
        {"id":"item","partId":"item","title":"Item","explanation":"Selected card uses primary tonal color; other cards stay surface-tonal and outlined.","keyIdea":"Each card owns one template choice and exposes which choice is selected.","selector":"[class~=\"aui-card-group-item\"]"},
        {"id":"item-image","partId":"item-image","title":"Item image","explanation":"Each card starts with a 4:3 template thumbnail.","keyIdea":"The thumbnail gives users a visual cue before they open the template.","selector":"[class~=\"aui-card-group-item-image\"]"},
        {"id":"item-body","partId":"item-body","title":"Item body","explanation":"Card body places the template name beneath its thumbnail.","keyIdea":"The body keeps the template label attached to its preview image.","selector":"[class~=\"aui-card-group-item-body\"]"},
        {"id":"item-title","partId":"item-title","title":"Item title","explanation":"Template 1 or Template 2 appears centred inside each card.","keyIdea":"A centered name distinguishes the template while staying readable within the card width.","selector":"[class~=\"aui-card-group-item-title\"]"},
        {"id":"empty","partId":"empty","title":"Empty","explanation":"No templates match your search appears when filtering removes every card.","keyIdea":"The empty state explains that the filter removed every available template.","selector":"[class~=\"aui-card-group-empty\"]"},
      ],
options: [
    { id: "adc-new-project", contextAnatomy: CONTEXT_ANATOMY, name: "New project templates", source: {"adc":"src/adc/components/NewProjectDialog.tsx"} ,
      contextLayers: [
        {"id":"context-project-dialog","partId":"project-dialog","title":"New Project dialog","explanation":"New Project popup hosts the template picker inside its creation flow.","keyIdea":"The ADC dialog places template selection inside the New Project task rather than the page shell.","selector":"[class~=\"aui-dialog-popup\"]","scope":"context"},
        {"id":"context-project-title","partId":"project-title","title":"New Project title bar","explanation":"Raised New Project heading keeps the dialog close control within reach.","keyIdea":"The raised title bar identifies the project-creation dialog and keeps its exit reachable.","selector":"[class~=\"aui-dialog-title\"]","scope":"context"},
        {"id":"context-project-close","partId":"project-close","title":"Close button","explanation":"Close button exits project creation without selecting a template.","keyIdea":"The close action dismisses the project chooser without selecting a template.","selector":"[class~=\"aui-dialog-close\"]","scope":"context"},
        {"id":"context-project-body","partId":"project-body","title":"New Project body","explanation":"Dialog body ends with User Templates after the project controls above.","keyIdea":"The body scroll region contains the template picker while preserving the surrounding dialog frame.","selector":"[class~=\"aui-dialog-body\"]","scope":"context"},
      ],
    },
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
