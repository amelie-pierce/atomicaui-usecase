import type { ContextProps } from '../../../../../types';
import { Button, Type, View } from '../../../../../kit';

// Print Output while the inputs are invalid: the same header as the Enabled case, with the native disabled attribute on Print Output.

export default function DisabledScene(_props: ContextProps) {
  return (
    <View
      as="section"
      data-ug-part="output-pane"
      aria-label="Output, inputs invalid"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 720px)' }}
    >
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', minHeight: '28', flex: 'none', paddingBlockStart: '0', paddingBlockEnd: '0' } }}>
        <Type data-ug-part="output-title" as="h2" role="l3" weight="semi-bold" aui={{ sx: { display: 'flex', alignItems: 'center', minHeight: '28' } }}>Output</Type>
        <View data-ug-part="header-actions" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', justifyContent: 'end', flexWrap: 'wrap', gap: '6', minHeight: '28' } }} style={{ marginInlineStart: 'auto' }}>
          <Button disabled aui={{ scale: 'sm', color: 'surface', paint: 'tonal', sx: { flex: 'none' } }}>
            <Button.Icon name="print" aui={{ scale: 'sm' }} />
            Print Output
          </Button>
        </View>
      </View>
    </View>
  );
}
