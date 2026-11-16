import type { ContextProps } from '../../../../types';
import { Type, View } from '../../../../kit';

// The results error strip in the Output body: a solid error View with the message, then the button.
export default function ResultsScene({ children }: ContextProps) {
  return (
    <View
      role="alert"
      aui={{ scale: 'sm', profile: 'default', color: 'error', paint: 'solid', shape: 'soft', sx: { display: 'flex', alignItems: 'center', gap: '8' } }}
      style={{ inlineSize: 'min(100%, 480px)' }}
    >
      <Type as="div" role="l4" style={{ flex: '1 1 auto' }}>We couldn't check products right now. Please try again.</Type>
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { flex: 'none' } }}>
        {children}
      </View>
    </View>
  );
}
