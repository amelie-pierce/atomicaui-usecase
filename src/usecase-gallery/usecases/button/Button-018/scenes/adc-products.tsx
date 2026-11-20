import type { ContextProps } from '../../../../types';
import { Button, View } from '../../../../kit';

// ADC input section Products (src/adc/components/ProductsPicker.tsx, shown from Workspace.tsx): while the picker is not active it is one full-width fixed surface xs Button that holds the selected products;
// hover or focus swaps it for the picker field. Left out: the active picker and the other fields.
export default function AdcProductsScene(_: ContextProps) {
  return (
    <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', width: 'fill' } }} style={{ inlineSize: 'min(100%, 288px)' }}>
      <Button aui={{ scale: 'xs', color: 'surface', paint: 'fixed', shape: 'soft', sx: { width: 'fill', justifyContent: 'between' } }}>
        Select products
      </Button>
    </View>
  );
}
