import type { ContextProps } from '../../../../../types';
import { Dropdown, Tabs, View } from '../../../../../kit';

// ADC design tab rail (src/adc/Workspace.tsx): the ellipsis-vertical trigger sits at the start of the rail, before the Tabs, and appears only when designs do not fit as tabs;
// its popup lists the hidden designs. Built open and non-modal (container={host}, positioner ug-anchored). The chip look is CHIP_AUI of src/adc/ui.ts.
// The app disables the trigger and tabs while a report is running, the scene shows them enabled. Drag reorder, rename and the tab context menu are left out; one visible tab stands for the rail.

const CHIP_AUI = { color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'raised', paint: 'tonal' } } } as const;

export default function AdcHiddenDesignsScene({ host }: ContextProps) {
  return (
    <View
      aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '8' } }}
      style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 480px)', alignItems: 'start' }}
    >
      <Dropdown open>
        <Dropdown.Trigger
          aria-label="Show hidden designs"
          aui={{ color: 'surface-alt', paint: 'solid', scale: 'sm', profile: 'square', shape: 'soft', sx: { flex: 'none', borderColor: 'default' } }}
        >
          <Dropdown.Icon name="ellipsis-vertical" />
        </Dropdown.Trigger>
        <Dropdown.Portal container={host}>
          <Dropdown.Positioner align="start" sideOffset={4} className="ug-anchored">
            <Dropdown.Popup aui={{ scale: 'sm', sx: { maxHeight: '256', overflowY: 'auto' } }}>
              <Dropdown.Item>Design 3</Dropdown.Item>
              <Dropdown.Item>Design 4</Dropdown.Item>
              <Dropdown.Item>Design 5</Dropdown.Item>
            </Dropdown.Popup>
          </Dropdown.Positioner>
        </Dropdown.Portal>
      </Dropdown>
      <Tabs defaultValue="d1" aui={{ profile: 'no-padding' }}>
        <Tabs.List>
          <Tabs.Tab value="d1" aui={CHIP_AUI}>Design 1</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </View>
  );
}
