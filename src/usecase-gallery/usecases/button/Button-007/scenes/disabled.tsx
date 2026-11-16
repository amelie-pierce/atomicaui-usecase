import type { ContextProps } from '../../../../types';
import { Button, Type, View } from '../../../../kit';
import { MockOutputBody } from '../../../../mock-data';

// Print Output while the inputs are invalid: the app still composes the whole header and action group, but Configure columns and the
// scroll helpers are not rendered, Print Output takes the native disabled attribute, the toolbar loses the result count and the
// product filter is disabled, and the body is the placeholder line.

export default function DisabledScene(_props: ContextProps) {
  return (
    <View
      as="section"
      aria-label="Output, inputs invalid"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 720px)' }}
    >
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', minHeight: '28', flex: 'none', paddingBlockStart: '0', paddingBlockEnd: '0' } }}>
        <Type as="h2" role="l3" weight="semi-bold" aui={{ sx: { display: 'flex', alignItems: 'center', minHeight: '28' } }}>Output</Type>
        <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', justifyContent: 'end', flexWrap: 'wrap', gap: '6', minHeight: '28' } }} style={{ marginInlineStart: 'auto' }}>
          <Button disabled aui={{ scale: 'sm', color: 'surface', paint: 'tonal', sx: { flex: 'none' } }}>
            <Button.Icon name="print" aui={{ scale: 'sm' }} />
            Print Output
          </Button>
        </View>
      </View>
      <MockOutputBody invalid />
    </View>
  );
}
