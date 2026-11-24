import type { ContextProps } from '../../../../../types';
import { Type, View } from '../../../../../kit';

// ACE CalculationOutput related products (src/features/calculation/ui/CalculationOutput.tsx): the output ends with a wrapping row of 128 x 160 cards, each the image above its centred title; the card is the link's visual. One extra card shows the row.
export default function AceRelatedProductsScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Type as="h3" role="l3" weight="semi-bold">Related products</Type>
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexWrap: 'wrap', gap: '8' } }}>
        {children}
      </View>
    </View>
  );
}
