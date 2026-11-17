import type { ContextProps } from '../../../../types';
import { Button, Popover, View } from '../../../../kit';
import { MockNumberField } from '../../../../mock-data';

// ADC InPlaceEditor: the value chip (surface solid, xs, compact) opens a popover to its right (center, 8px offset): the number Field, then Cancel and Save in a row at the end.
// Cancel is the gray surface-alt solid Button (HCS draws it as text) and both sit at scale "sm" with a soft shape; there is no reset icon. The chip floats over the 3D model in the app; here it stands alone.
export default function AdcEditValueScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 8)', inlineSize: 'min(100%, calc(var(--p-px-16) * 36))' }}>
      <Popover open>
        <Popover.Trigger render={<Button aria-label="Edit Width, 12 in" aui={{ color: 'surface', paint: 'solid', scale: 'xs', shape: 'soft', profile: 'compact' }} />}>
          12 in
        </Popover.Trigger>
        <Popover.Portal container={host}>
          <Popover.Positioner side="right" align="center" sideOffset={8} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Edit Width"
              render={
                <View
                  as="section"
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', scale: 'sm', shape: 'soft', elevation: 4, sx: { display: 'flex', alignItems: 'end', gap: '8' } }}
                />
              }
            >
              <MockNumberField label="Width" value="12" unit="in" />
              <View aui={{ paint: 'text', profile: 'no-padding', scale: 'sm', sx: { display: 'flex', gap: '4', alignItems: 'center', flex: 'none' } }}>
                <Button aui={{ color: 'surface-alt', paint: 'solid', scale: 'sm', shape: 'soft' }}>Cancel</Button>
                <Button aui={{ color: 'secondary', paint: 'solid', scale: 'sm', shape: 'soft' }}>Save</Button>
              </View>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
