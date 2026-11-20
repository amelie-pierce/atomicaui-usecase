import type { ContextProps } from '../../../../types';
import { Button, Icon, View } from '../../../../kit';

// FD input pane carousel (src/components/InputPane.jsx): the previous and next arrows are Buttons with paint "text" and profile "square" around an Icon; the first is disabled on the first page. Left out: the cards and the pager.
export default function FdCarouselArrowsScene(_: ContextProps) {
  return (
    <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8' } }}>
      <Button aria-label="Previous" disabled aui={{ paint: 'text', profile: 'square' }}>
        <Icon name="arrow-left" />
      </Button>
      <Button aria-label="Next" aui={{ paint: 'text', profile: 'square' }}>
        <Icon name="arrow-right" />
      </Button>
    </View>
  );
}
