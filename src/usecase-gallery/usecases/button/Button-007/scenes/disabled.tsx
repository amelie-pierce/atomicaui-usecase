import type { ContextProps } from '../../../../types';
import { Button, Type, View } from '../../../../kit';

// While the inputs are invalid the app disables Print Output (the native disabled attribute).
export default function DisabledScene(_props: ContextProps) {
  return (
    <View
      as="section"
      aria-label="Output, inputs invalid"
      aui={{ scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default' }}
      style={{ inlineSize: 'min(100%, 560px)' }}
    >
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', gap: '8' } }} style={{ minBlockSize: 28 }}>
        <Type as="h2" role="l3" weight="bold">Output</Type>
        <Button disabled aui={{ scale: 'sm', color: 'surface', paint: 'tonal', sx: { flex: 'none' } }}>
          <Button.Icon name="print" aui={{ scale: 'sm' }} />
          Print Output
        </Button>
      </View>
    </View>
  );
}
