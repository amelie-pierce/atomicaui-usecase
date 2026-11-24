import type { ContextProps } from '../../../../../types';
import { Select, View } from '../../../../../kit';

// The Hef cell of the Products table of ADC (src/adc/components/ProductsPicker.tsx, HefSelect): a bare Select with no Field and no label, a compact (scale "xs") outlined trigger that fills its table cell and a popup
// the width of the trigger. Built open and non-modal (container={host}, positioner ug-anchored); the cell is a fixed-width wrapper. Left out: the table, its other columns, the expand toggles and the metric
// display of the Hef values; the app opens the list on mount for the row being edited, the scene opens it the same way.
export default function AdcTableCellScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 120px)' }}>
      <Select open
        defaultValue="6"
        items={[
          { label: '4.500', value: '4.5' },
          { label: '6.000', value: '6' },
          { label: '7.500', value: '7.5' },
        ]}
      >
        <Select.Trigger aria-label="Hef" aui={{ scale: 'xs', color: 'surface', paint: 'fixed', sx: { width: 'fill' } }}>
          <Select.Value />
          <Select.Chevron />
        </Select.Trigger>
        <Select.Portal container={host}>
          <Select.Positioner side="bottom" sideOffset={4} className="ug-anchored">
            <Select.Popup matchTriggerWidth>
              <Select.List>
                <Select.Item value="4.5">
                  <Select.ItemText>4.500</Select.ItemText>
                  <Select.ItemIndicator>{null}</Select.ItemIndicator>
                </Select.Item>
                <Select.Item value="6">
                  <Select.ItemText>6.000</Select.ItemText>
                  <Select.ItemIndicator>{null}</Select.ItemIndicator>
                </Select.Item>
                <Select.Item value="7.5">
                  <Select.ItemText>7.500</Select.ItemText>
                  <Select.ItemIndicator>{null}</Select.ItemIndicator>
                </Select.Item>
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select>
    </View>
  );
}
