import type { ContextProps } from '../../../../../types';
import { Button, IconButton, List, Popover, Switch, Type, View } from '../../../../../kit';
import { MOCK_OUTPUT_COLUMNS } from '../../../../../mock-data';

// HS ColumnVisibility: the Configure columns popover opened from its table-columns trigger (secondary text, no contained profile) at the end of the Output header.
// Its footer is the same row as HCS, but Save keeps the default scale (HCS sets "sm"). The search field and Group by model are left out.
export default function HsConfigureColumnsScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 18)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', gap: '8' } }}>
        <Type as="h2" role="l3" weight="semi-bold">Output</Type>
        <Popover open>
          <Popover.Trigger
            render={<IconButton name="table-columns" aria-label="Configure columns" aui={{ color: 'secondary', paint: 'text', scale: 'sm', shape: 'soft' }} />}
          />
          <Popover.Portal container={host}>
            <Popover.Positioner side="bottom" align="end" sideOffset={4} className="ug-anchored">
              <Popover.Popup
                data-ug-part="popover"
                initialFocus={false}
                aria-label="Configure columns"
                render={
                  <View
                    aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', minHeight: '0', minWidth: '0', gap: '8', width: '320' } }}
                  />
                }
              >
                <List data-ug-part="columns" aria-label="Columns" reorderable>
                  {MOCK_OUTPUT_COLUMNS.map((column) => (
                    <List.Item key={column.id} id={column.id} locked={!column.hideable}>
                      <List.ItemIndicator />
                      <List.ItemText>{column.header}</List.ItemText>
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
                <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', minWidth: '0', justifyContent: 'between' } }}>
                  <IconButton data-ug-part="reset" name="rotate-left" aria-label="Reset columns to default" aui={{ paint: 'text' }} />
                  <View data-ug-part="actions" aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', minWidth: '0' } }}>
                    <Button data-ug-part="cancel" aui={{ paint: 'text' }}>Cancel</Button>
                    <Button data-ug-part="save" aui={{ color: 'secondary', paint: 'solid' }}>Save</Button>
                  </View>
                </View>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover>
      </View>
    </View>
  );
}
