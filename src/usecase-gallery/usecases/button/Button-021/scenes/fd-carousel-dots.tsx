import type { ContextProps } from '../../../../types';
import { Button, View } from '../../../../kit';

// FD input pane carousel footer (src/components/InputPane.jsx): one empty solid Button per page, primary for the current page and surface-alt for the others; the app's own carousel-dot class sets the dot size.
// Left out: the cards, the arrows and the View all button (Button-017).
export default function FdCarouselDotsScene(_: ContextProps) {
  return (
    <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8' } }}>
      <Button aria-label="1 / 3" aria-current aui={{ paint: 'solid', color: 'primary' }} />
      <Button aria-label="2 / 3" aui={{ paint: 'solid', color: 'surface-alt' }} />
      <Button aria-label="3 / 3" aui={{ paint: 'solid', color: 'surface-alt' }} />
    </View>
  );
}
