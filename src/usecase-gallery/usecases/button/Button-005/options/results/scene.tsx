import type { ContextProps } from '../../../../../types';
import { Type, View } from '../../../../../kit';

// The Output error state of F01Results.tsx (lines 462-480): a solid error View with the message, then the button. The View sets no flex
// props, so the message div is a block and the button follows it on the next line, as in the app.
export default function ResultsScene({ children }: ContextProps) {
  return (
    <View
      role="alert"
      data-ug-part="error-strip"
      aui={{ scale: 'sm', profile: 'default', color: 'error', paint: 'solid', shape: 'soft' }}
      style={{ inlineSize: 'min(100%, 480px)' }}
    >
      <Type data-ug-part="error-message" as="div" role="l4">We couldn't check products right now. Please try again.</Type>
      {children}
    </View>
  );
}
