import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Card',
  title: 'Image tile',
  apps: ['adm'],
  cases: [{ id: 'adm-related-apps', name: 'Related applications', source: { adm: 'src/features/applications/components/RelatedAppsGrid.tsx' } }],
  source: { adm: 'src/features/applications/components/RelatedAppsGrid.tsx' },
  summary: 'An image-only card, 96 by 96, used as the visual of a link in a grid.',
  where: 'The Explore More Applications dialog and the phone drawer of ADM (src/features/applications/components/RelatedAppsGrid.tsx).',
  when: 'Use it when the image is the whole content and a link around it is the control. Use the product card (Card-001) when the item needs a name.',
  how: '`Card` with `paint: "text"`, `profile: "no-padding"`, `shape: "soft"`, `sx: { width: "96", height: "96" }` (`width: "fill"` on the phone drawer), `Card.ImageContainer` filling it and `Card.Image` with `fit="contain"` and `ratio="1:1"`. The card is display-only; the link around it is the interactive element. The scene shows one tile of the three-column grid.',
});
