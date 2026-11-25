import type { ContextProps } from '../../../../../types';
import { Type, View } from '../../../../../kit';

// ADM RelatedAppsGrid (src/features/applications/components/RelatedAppsGrid.tsx): the Explore More Applications dialog body is a three-column grid (display grid) of image-only 96px cards, each the visual of a link. The scene shows one tile of the grid.
export default function AdmRelatedAppsScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Type data-ug-part="section-heading" as="h3" role="l3" weight="semi-bold">Explore More Applications</Type>
      <View data-ug-part="app-grid" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'grid', gridTemplateColumns: '3', gap: '8' } }}>
        {children}
      </View>
    </View>
  );
}
