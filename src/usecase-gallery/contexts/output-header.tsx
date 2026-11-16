import type { ContextProps } from '../types';
import { Button, IconButton, Type, View } from '../kit';
import { MockResultsBody } from '../mock-data';

// The Output pane: a bordered pane, a 28px header (title left, action group right) and a body card.
// Print Output is the last item of the group, after Back to top, Table Notes and Configure columns.
// The group's push to the end is justifyContent: between on the header row (the app uses a local margin).
export default function OutputHeaderContext({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16' } }} style={{ inlineSize: 'min(100%, 560px)' }}>
    <View
      as="section"
      aria-label="Output"
      aui={{ scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }}
      style={{ inlineSize: '100%' }}
    >
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'between', gap: '8' } }} style={{ minBlockSize: 28 }}>
        <Type as="h2" role="l3" weight="bold">Output</Type>
        <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'end', gap: '6' } }}>
          <Button aria-label="Back to top" aui={{ color: 'secondary', paint: 'text', scale: 'sm' }}>
            <Button.Icon name="arrow-up" />
            Back to top
          </Button>
          <Button aria-label="Jump to table notes" aui={{ color: 'secondary', paint: 'text', scale: 'sm' }}>
            <Button.Icon name="arrow-down" />
            Table Notes
          </Button>
          <IconButton name="table-columns" aria-label="Configure columns" aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'contained', shape: 'soft' }} />
          {children}
        </View>
      </View>
      <MockResultsBody />
    </View>
    <View
      as="section"
      aria-label="Output, inputs invalid"
      aui={{ scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default' }}
      style={{ inlineSize: '100%' }}
    >
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', gap: '8' } }} style={{ minBlockSize: 28 }}>
        <Type as="h2" role="l3" weight="bold">Output</Type>
        <Button disabled aui={{ scale: 'sm', color: 'surface', paint: 'tonal', sx: { flex: 'none' } }}>
          <Button.Icon name="print" aui={{ scale: 'sm' }} />
          Print Output
        </Button>
      </View>
    </View>
    </View>
  );
}
