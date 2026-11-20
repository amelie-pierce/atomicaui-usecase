import type { ContextProps } from '../../../../types';
import { Spinner, Type, View } from '../../../../kit';

// PFD OutputPane (src/pfd/OutputPane.tsx; HCS F01Results shows the Spinner alone, without the caption): while the results update, the pane centres a scale "sm" Spinner over a l4 caption, 8px apart, in a 128px minimum height.
export default function PfdUpdatingScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8', minHeight: '128' } }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      {children}
      <Type as="div" role="l4">Updating Results</Type>
    </View>
  );
}
