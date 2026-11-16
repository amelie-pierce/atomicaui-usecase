import type { ContextProps } from '../../../../types';
import { Chip, Type, View } from '../../../../kit';

// Illustrative case: the HCS app has no error page (its only retry is the Output error strip), so this screen and its copy are not
// taken from the HCS source. It shows the same Retry button as the sole recovery action on a page.
export default function PageScene({ children }: ContextProps) {
  return (
    <View
      as="main"
      aui={{ scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '12' } }}
      style={{ inlineSize: 'min(100%, 420px)' }}
    >
      <Chip aui={{ scale: 'sm', color: 'info', paint: 'tonal' }}>Illustrative: no HCS equivalent</Chip>
      <Type as="h1" role="h5">The app could not load</Type>
      <Type as="p" role="p3">Something went wrong while loading the page.</Type>
      {children}
    </View>
  );
}
