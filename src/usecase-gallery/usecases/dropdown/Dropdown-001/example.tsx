import { Dropdown } from '../../../kit';

export default function Example() {
  return (
    <Dropdown aui={{ scale: 'sm' }}>
      <Dropdown.Trigger
        aria-label="Product filter"
        aui={{
          scale: 'sm',
          color: 'surface',
          paint: 'fixed',
          sx: {
            whiteSpace: 'nowrap',
            borderColor: 'outlined',
            borderBlockStartWidth: '1',
            borderBlockEndWidth: '1',
            borderInlineStartWidth: '1',
            borderInlineEndWidth: '1',
          },
        }}
      >
        Passed Products (9)
        <Dropdown.Chevron aui={{ scale: 'sm' }} />
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Positioner sideOffset={4} align="start">
          <Dropdown.Popup matchTriggerWidth aui={{ scale: 'sm' }}>
            <Dropdown.RadioGroup value="passed">
              <Dropdown.RadioItem value="passed" closeOnClick aui={{ scale: 'sm' }}>
                Passed Products (9)
                <Dropdown.RadioItemIndicator />
              </Dropdown.RadioItem>
              <Dropdown.RadioItem value="failed" closeOnClick aui={{ scale: 'sm' }}>
                Failed Products (3)
                <Dropdown.RadioItemIndicator />
              </Dropdown.RadioItem>
              <Dropdown.RadioItem value="all" closeOnClick aui={{ scale: 'sm' }}>
                All Products (12)
                <Dropdown.RadioItemIndicator />
              </Dropdown.RadioItem>
            </Dropdown.RadioGroup>
          </Dropdown.Popup>
        </Dropdown.Positioner>
      </Dropdown.Portal>
    </Dropdown>
  );
}
