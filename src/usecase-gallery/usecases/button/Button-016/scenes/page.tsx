import type { ContextProps } from '../../../../types';
import { Type, View } from '../../../../kit';

// The full error page: heading, one paragraph, and the button left-aligned beneath them.
export default function PageScene({ children }: ContextProps) {
  return (
    <View
      as="main"
      aui={{ scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '12' } }}
      style={{ inlineSize: 'min(100%, 420px)' }}
    >
      <Type as="h1" role="h5">The app could not load</Type>
      <Type as="p" role="p3">Something went wrong while loading the page.</Type>
      {children}
    </View>
  );
}
