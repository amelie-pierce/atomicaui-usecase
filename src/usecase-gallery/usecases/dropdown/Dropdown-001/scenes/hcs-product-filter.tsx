import type { ContextProps } from '../../../../types';
import { Dropdown, View } from '../../../../kit';

// HCS HcsProductFilter (src/components/HcsProductFilter.tsx), mounted at the end of the output toolbar row (src/App.tsx): the outlined text trigger shows the chosen option and a chevron,
// the popup matches the trigger width and holds a radio group with the indicator shown. Built open and non-modal (container={host}, positioner ug-anchored).
// The search field, the Reset filters button and the "Showing N of M results" text beside it are left out; the app disables the trigger while the design is invalid, the scene shows it enabled.
export default function HcsProductFilterScene({ host }: ContextProps) {
  return (
    <View
      aui={{ scale: 'sm', profile: 'no-padding', paint: 'text', sx: { display: 'flex', alignItems: 'center', justifyContent: 'end', gap: '8', flex: 'none' } }}
      style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, 720px)' }}
    >
      <Dropdown open aui={{ scale: 'sm' }}>
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
        <Dropdown.Portal container={host}>
          <Dropdown.Positioner sideOffset={4} align="start" className="ug-anchored">
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
    </View>
  );
}
