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
});
