import type { ContextProps } from '../../../../../types';
import { Button, View } from '../../../../../kit';

// FD input pane carousel footer (src/components/InputPane.jsx): the "View all" text Button (paint "text", color "primary", default scale) after the pager dots.
// Left out: the cards, the arrows and the picker dialog it opens.
export default function FdCarouselFooterScene(_: ContextProps) {
  return (
    <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8' } }}>
      <Button aui={{ paint: 'solid', color: 'primary' }} aria-label="1 / 2" />
      <Button aui={{ paint: 'solid', color: 'surface-alt' }} aria-label="2 / 2" />
      <Button aui={{ paint: 'text', color: 'primary' }}>View all</Button>
    </View>
  );
}
