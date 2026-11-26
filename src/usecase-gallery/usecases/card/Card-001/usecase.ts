import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: "section-heading", name: "Related products heading", description: "The \"Related products\" h3 (Type l3 semi-bold) above the cards." },
  { id: "card-row", name: "Card row", description: "The wrapping flex row (8px gap) that lays the related-product cards out side by side." },
];

export default defineUsecase({
  uiType: 'Card',
  title: 'Product card',
  apps: ['ace'],
    layers: [
        {"id":"card","partId":"card","title":"Card","explanation":"Fixed 128 by 160 soft card on scale \"sm\" with equal padding; its content is a centred column.","keyIdea":"One fixed card boundary makes each related product a single item to compare.","selector":"[class~=\"aui-card\"]"},
        {"id":"image-container","partId":"image-container","title":"Image container","explanation":"96 by 96 box that holds the product picture above the title.","keyIdea":"A reserved image box keeps product names aligned when pictures have different proportions.","selector":"[class~=\"aui-card-image-container\"]"},
        {"id":"image","partId":"image","title":"Image","explanation":"The product image, decorative (alt empty) and shown whole with fit=\"contain\".","keyIdea":"Contain fitting preserves the full product artwork instead of cropping its identifying details.","selector":"[class~=\"aui-card-image\"]"},
        {"id":"body","partId":"body","title":"Body","explanation":"Full-width centred column under the image that carries the title.","keyIdea":"A full-width body separates the product identity from the picture above it.","selector":"[class~=\"aui-card-body\"]"},
        {"id":"title","partId":"title","title":"Title","explanation":"Centred, wrapping semi-bold p2 label reading \"Related product\"; ACE places these cards under a Related products heading.","keyIdea":"The centered label names the product even when it wraps on a narrow card.","selector":"[class~=\"aui-card-title\"]"},
      ],
options: [
    { id: "ace-related-products", contextAnatomy: CONTEXT_ANATOMY, name: "Related products", source: {"ace":"src/features/calculation/ui/CalculationOutput.tsx"} ,
      contextLayers: [
        {"id":"context-section-heading","partId":"section-heading","title":"Related products heading","explanation":"The \"Related products\" h3 (Type l3 semi-bold) above the cards.","keyIdea":"The section heading explains why these products appear together before shoppers scan the row.","selector":"[data-ug-part=\"section-heading\"]","scope":"context"},
        {"id":"context-card-row","partId":"card-row","title":"Card row","explanation":"The wrapping flex row (8px gap) that lays the related-product cards out side by side.","keyIdea":"A wrapping row lets related choices continue naturally when the viewport cannot fit them side by side.","selector":"[data-ug-part=\"card-row\"]","scope":"context"},
      ],
    },
  ],
  source: { ace: 'src/features/calculation/ui/CalculationOutput.tsx' },
  summary: 'A fixed 128 by 160 card with a contained image above a centred, wrapping title.',
  where: 'The related products row at the end of the ACE calculation output (src/features/calculation/ui/CalculationOutput.tsx).',
  when: 'Use it to show an item the user can open, as image plus name. Use the image tile (Card-002) when the image says it all, and the preview card (Card-003) for a popup.',
  how: '`Card` with `paint: "text"`, `profile: "equal-padding"`, `scale: "sm"`, `shape: "soft"` and `sx` of a centred flex column, 128 wide and 160 high; `Card.ImageContainer` (96 by 96, no padding) holding `Card.Image` with `fit="contain"`, then `Card.Body` (no padding, centred) with `Card.Title` as a span at `role="p2"`, semi-bold. The image is a placeholder here.',
  anatomy: [
    {
      id: 'card',
      name: 'Card',
      selector: '[class~="aui-card"]',
      description: 'Fixed 128 by 160 soft card on scale "sm" with equal padding; its content is a centred column.',
    },
    {
      id: 'image-container',
      name: 'Image container',
      selector: '[class~="aui-card-image-container"]',
      description: '96 by 96 box that holds the product picture above the title.',
    },
    {
      id: 'image',
      name: 'Image',
      selector: '[class~="aui-card-image"]',
      description: 'The product image, decorative (alt empty) and shown whole with fit="contain".',
    },
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-card-body"]',
      description: 'Full-width centred column under the image that carries the title.',
    },
    {
      id: 'title',
      name: 'Title',
      selector: '[class~="aui-card-title"]',
      description: 'Centred, wrapping semi-bold p2 label reading "Related product"; ACE places these cards under a Related products heading.',
    },
  ],
});
