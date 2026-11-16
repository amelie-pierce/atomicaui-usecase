import type { ContextProps } from '../types';
import { Field, Icon, IconButton, List, Popover, Switch, Type, View } from '../kit';
import { MOCK_OUTPUT_COLUMNS } from '../mock-data';

// ColumnVisibility: the Configure columns popover opened from its table-columns trigger in the Output header.
// Search, a reorderable List (Model locked, Load sorted ascending), Group by model, then the footer row,
// justifyContent: between: the reset icon at the start, Cancel and Save grouped at the end. Shown open; the
// wrapper keeps stage room (inline min-block-size) for the popup to open below the trigger.
export default function PopoverContext({ children, host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 32)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', gap: '8' } }}>
        <Type as="h2" role="l3" weight="semi-bold">Output</Type>
      <Popover open>
        <Popover.Trigger
          render={
            <IconButton
              name="table-columns"
              aria-label="Configure columns"
              aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'contained', shape: 'soft' }}
            />
          }
        />
        <Popover.Portal container={host}>
          <Popover.Positioner side="bottom" align="end" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Configure columns"
              render={
                <View
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', minHeight: '0', minWidth: '0', gap: '8', width: '320' } }}
                />
              }
            >
              <Field aui={{ scale: 'sm', sx: { minWidth: '0' } }}>
                <Field.Control>
                  <Field.Icon name="magnifying-glass" />
                  <Field.Input aria-label="Search columns" placeholder="Search columns..." />
                </Field.Control>
              </Field>
              <List aria-label="Columns" reorderable>
                {MOCK_OUTPUT_COLUMNS.map((column) => (
                  <List.Item key={column.id} id={column.id} locked={!column.hideable}>
                    <List.ItemIndicator />
                    <List.ItemText>
                      <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '4', minWidth: '0' } }}>
                        <Type as="span">{column.header}</Type>
                        {column.id === 'load' && <Icon name="arrow-up" aria-label="Sorted ascending" aui={{ color: 'primary' }} />}
                      </View>
                    </List.ItemText>
                    <List.ItemActions>
                      <Switch
                        aria-label={`Show ${column.header}`}
                        defaultSelected
                        disabled={!column.hideable}
                        aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}
                      />
                      <List.DragHandle label={`Reorder ${column.header}`} />
                    </List.ItemActions>
                  </List.Item>
                ))}
              </List>
              <Switch aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}>
                <Switch.Label>Group by model</Switch.Label>
              </Switch>
              <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', minWidth: '0', justifyContent: 'between' } }}>
                {children}
              </View>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
      </View>
    </View>
  );
}
