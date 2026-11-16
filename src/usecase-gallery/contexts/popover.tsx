import type { ContextProps } from '../types';
import { Field, Popover, Switch, View } from '../kit';

// The Configure columns popover: search, a list of columns with a switch each, Group by model, then the footer
// row, justifyContent: between: the reset icon at the left, Cancel and Save grouped at the right. Shown open
// and static; the popup surface is a View (surface, solid, soft, elevation 4) as in the app.
export default function PopoverContext({ children, host }: ContextProps) {
  return (
    <Popover open>
      <Popover.Portal container={host}>
        <Popover.Positioner anchor={host}>
          <Popover.Popup initialFocus={false}>
            <View
              aria-label="Configure columns"
              aui={{ scale: 'sm', color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '8', width: '320' } }}
            >
              <Field aui={{ scale: 'sm' }}>
                <Field.Control>
                  <Field.Icon name="magnifying-glass" />
                  <Field.Input aria-label="Search columns" placeholder="Search columns" />
                </Field.Control>
              </Field>
              <Switch defaultChecked aui={{ scale: 'sm' }}><Switch.Label>Model</Switch.Label></Switch>
              <Switch defaultChecked aui={{ scale: 'sm' }}><Switch.Label>Maker</Switch.Label></Switch>
              <Switch defaultChecked aui={{ scale: 'sm' }}><Switch.Label>Capacity</Switch.Label></Switch>
              <Switch aui={{ scale: 'sm' }}><Switch.Label>Status</Switch.Label></Switch>
              <Switch aui={{ scale: 'sm' }}><Switch.Label>Group by model</Switch.Label></Switch>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between' } }}>
                {children}
              </View>
            </View>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover>
  );
}
