import { Select } from '../../../kit';

export default function Example() {
  return (
    <Select
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
      <Select.Portal>
        <Select.Positioner side="bottom" sideOffset={4}>
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
  );
}
