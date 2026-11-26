import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: "section-heading", name: "Explore More Applications heading", description: "The \"Explore More Applications\" h3 (Type l3 semi-bold) above the tiles." },
  { id: "app-grid", name: "Application grid", description: "The three-column grid (8px gap) that holds the image-only application cards." },
];

export default defineUsecase({
  uiType: 'Card',
  title: 'Image tile',
  apps: ['adm'],
    layers: [
        {"id":"card","partId":"card","title":"Card","explanation":"Square 96-pixel soft tile gives each application an image-led target.","keyIdea":"A square tile turns each application into one image-led discovery target.","selector":"[class~=\"aui-card\"]"},
        {"id":"image-container","partId":"image-container","title":"Image container","explanation":"Full-card image frame lets artwork fill the square tile.","keyIdea":"The full-bleed container lets the application artwork define the tile rather than an inset frame.","selector":"[class~=\"aui-card-image-container\"]"},
        {"id":"image","partId":"image","title":"Image","explanation":"One-to-one application image fits whole with its Application alt text.","keyIdea":"Contain fitting keeps the whole application mark visible inside its square tile.","selector":"[class~=\"aui-card-image\"]"},
      ],
options: [
    { id: "adm-related-apps", contextAnatomy: CONTEXT_ANATOMY, name: "Related applications", source: {"adm":"src/features/applications/components/RelatedAppsGrid.tsx"} ,
      contextLayers: [
        {"id":"context-section-heading","partId":"section-heading","title":"Explore More Applications heading","explanation":"Explore More Applications introduces the image-only discovery tiles.","keyIdea":"The heading distinguishes application discovery from the current design controls.","selector":"[data-ug-part=\"section-heading\"]","scope":"context"},
        {"id":"context-app-grid","partId":"app-grid","title":"Application grid","explanation":"Three-column grid arranges image-only application cards with even gaps.","keyIdea":"A three-column grid makes the available application choices easy to scan as peers.","selector":"[data-ug-part=\"app-grid\"]","scope":"context"},
      ],
    },
  ],
  source: { adm: 'src/features/applications/components/RelatedAppsGrid.tsx' },
  summary: 'An image-only card, 96 by 96, used as the visual of a link in a grid.',
  where: 'The Explore More Applications dialog and the phone drawer of ADM (src/features/applications/components/RelatedAppsGrid.tsx).',
  when: 'Use it when the image is the whole content and a link around it is the control. Use the product card (Card-001) when the item needs a name.',
  how: '`Card` with `paint: "text"`, `profile: "no-padding"`, `shape: "soft"`, `sx: { width: "96", height: "96" }` (`width: "fill"` on the phone drawer), `Card.ImageContainer` filling it and `Card.Image` with `fit="contain"` and `ratio="1:1"`. The card is display-only; the link around it is the interactive element. The scene shows one tile of the three-column grid.',
  anatomy: [
    {
      id: 'card',
      name: 'Card',
      selector: '[class~="aui-card"]',
      description: 'Square 96 by 96 soft tile with no padding; ADM lays three of them across under Explore More Applications.',
    },
    {
      id: 'image-container',
      name: 'Image container',
      selector: '[class~="aui-card-image-container"]',
      description: 'Fills the whole card (width and height "fill"), so the picture is the entire tile.',
    },
    {
      id: 'image',
      name: 'Image',
      selector: '[class~="aui-card-image"]',
      description: 'The application picture with alt "Application", a 1:1 ratio and fit="contain".',
    },
  ],
});
