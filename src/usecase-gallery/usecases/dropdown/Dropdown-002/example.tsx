import { Dropdown } from '../../../kit';

export default function Example() {
  return (
    <Dropdown>
      <Dropdown.Trigger
        aria-label="Show hidden designs"
        aui={{ color: 'surface-alt', paint: 'solid', scale: 'sm', profile: 'square', shape: 'soft', sx: { flex: 'none', borderColor: 'default' } }}
      >
        <Dropdown.Icon name="ellipsis-vertical" />
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Positioner align="start" sideOffset={4}>
          <Dropdown.Popup aui={{ scale: 'sm', sx: { maxHeight: '256', overflowY: 'auto' } }}>
            <Dropdown.Item>Design 3</Dropdown.Item>
            <Dropdown.Item>Design 4</Dropdown.Item>
            <Dropdown.Item>Design 5</Dropdown.Item>
          </Dropdown.Popup>
        </Dropdown.Positioner>
      </Dropdown.Portal>
    </Dropdown>
  );
}
