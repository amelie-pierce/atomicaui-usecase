import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: "section-heading", name: "Related products heading", description: "The \"Related products\" h3 (Type l3 semi-bold) above the cards." },
  { id: "card-row", name: "Card row", description: "The wrapping flex row (8px gap) that lays the related-product cards out side by side." },
];

export default defineUsecase({
  uiType: 'Card',
  title: 'Product card',
  apps: ['ace'],
options: [
    { id: "ace-related-products", contextAnatomy: CONTEXT_ANATOMY, name: "Related products", source: {"ace":"src/features/calculation/ui/CalculationOutput.tsx"} ,
     contextAnatomyOverrides: [{"id":"section-heading","lesson":{"explanation":"Related products heading introduces this row of product cards.","selector":"[data-ug-part=\"section-heading\"]","scope":"context"}},{"id":"card-row","lesson":{"explanation":"Wrapping row places related product cards side by side with gaps.","selector":"[data-ug-part=\"card-row\"]","scope":"context"}}]},
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
     lesson: {"explanation":"Fixed 128-by-160 soft card centres product content with even padding."}},
    {
      id: 'image-container',
      name: 'Image container',
      selector: '[class~="aui-card-image-container"]',
      description: '96 by 96 box that holds the product picture above the title.',
     lesson: {"explanation":"96-by-96 frame holds the product picture above its name."}},
    {
      id: 'image',
      name: 'Image',
      selector: '[class~="aui-card-image"]',
      description: 'The product image, decorative (alt empty) and shown whole with fit="contain".',
     lesson: {"explanation":"Decorative product image fits whole inside its reserved frame."}},
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-card-body"]',
      description: 'Full-width centred column under the image that carries the title.',
     lesson: {"explanation":"Full-width centred column places the product title below image."}},
    {
      id: 'title',
      name: 'Title',
      selector: '[class~="aui-card-title"]',
      description: 'Centred, wrapping semi-bold p2 label reading "Related product"; ACE places these cards under a Related products heading.',
     lesson: {"explanation":"Wrapping semi-bold label names each related product inside its card."}},
  ],
});
