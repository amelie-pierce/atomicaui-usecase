import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Card',
  title: 'Product card',
  apps: ['ace'],
  cases: [{ id: 'ace-related-products', name: 'Related products', source: { ace: 'src/features/calculation/ui/CalculationOutput.tsx' } }],
  source: { ace: 'src/features/calculation/ui/CalculationOutput.tsx' },
  summary: 'A fixed 128 by 160 card with a contained image above a centred, wrapping title.',
  where: 'The related products row at the end of the ACE calculation output (src/features/calculation/ui/CalculationOutput.tsx).',
  when: 'Use it to show an item the user can open, as image plus name. Use the image tile (Card-002) when the image says it all, and the preview card (Card-003) for a popup.',
  how: '`Card` with `paint: "text"`, `profile: "equal-padding"`, `scale: "sm"`, `shape: "soft"` and `sx` of a centred flex column, 128 wide and 160 high; `Card.ImageContainer` (96 by 96, no padding) holding `Card.Image` with `fit="contain"`, then `Card.Body` (no padding, centred) with `Card.Title` as a span at `role="p2"`, semi-bold. The image is a placeholder here.',
  anatomy: [
    {
      id: 'card',
      name: 'Card',
      token: 'Card',
      selector: '[class~="aui-card"]',
      description: 'Fixed 128 by 160 soft card on scale "sm" with equal padding; its content is a centred column.',
      code: `<Card aui={{ paint: 'text', profile: 'equal-padding', scale: 'sm', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none', width: '128', height: '160' } }}>`,
    },
    {
      id: 'image-container',
      name: 'Image container',
      token: 'Card.ImageContainer',
      selector: '[class~="aui-card-image-container"]',
      description: '96 by 96 box that holds the product picture above the title.',
      code: `<Card.ImageContainer aui={{ paint: 'text', profile: 'no-padding', sx: { width: '96', height: '96', flex: 'none' } }}>
  <Card.Image … />
</Card.ImageContainer>`,
    },
    {
      id: 'image',
      name: 'Image',
      token: 'Card.Image',
      selector: '[class~="aui-card-image"]',
      description: 'The product image, decorative (alt empty) and shown whole with fit="contain".',
      code: `<Card.Image src={MOCK_IMAGE_SRC} alt="" fit="contain" />`,
    },
    {
      id: 'body',
      name: 'Body',
      token: 'Card.Body',
      selector: '[class~="aui-card-body"]',
      description: 'Full-width centred column under the image that carries the title.',
      code: `<Card.Body aui={{ profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'fill', textAlign: 'center' } }}>`,
    },
    {
      id: 'title',
      name: 'Title',
      token: 'Card.Title',
      selector: '[class~="aui-card-title"]',
      description: 'Centred, wrapping semi-bold p2 label reading "Related product"; ACE places these cards under a Related products heading.',
      code: `<Card.Title as="span" role="p2" weight="semi-bold" aui={{ sx: { textAlign: 'center', whiteSpace: 'normal' } }}>
  Related product
</Card.Title>`,
    },
  ],
});
