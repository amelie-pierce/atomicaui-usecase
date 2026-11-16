import type { ContextProps } from '../types';
import { Button, IconButton, Type, View } from '../kit';
import { MockResultsBody } from '../mock-data';

// The same Output header: the scroll helpers are the first two items of the right-aligned group, shown
// only while the pane is scrolled; the columns icon and Print Output follow. They are not floating.
export default function OutputHeaderHelpersContext({ children }: ContextProps) {
  return (
    <View
      as="section"
      aria-label="Output"
      aui={{ scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }}
      style={{ inlineSize: 'min(100%, 560px)' }}
    >
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'between', gap: '8' } }} style={{ minBlockSize: 28 }}>
        <Type as="h2" role="l3" weight="bold">Output</Type>
        <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'end', gap: '6' } }}>
          {children}
          <IconButton name="table-columns" aria-label="Configure columns" aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'contained', shape: 'soft' }} />
          <Button aui={{ scale: 'sm', color: 'surface', paint: 'tonal', sx: { flex: 'none' } }}>
            <Button.Icon name="print" aui={{ scale: 'sm' }} />
            Print Output
          </Button>
        </View>
      </View>
      <MockResultsBody />
    </View>
  );
}
