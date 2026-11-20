import type { ContextProps } from '../../../../types';
import { Button, Popover, Table, View } from '../../../../kit';

// FD FastenerPatternInfo (src/components/Results.jsx): not a field label but a table column header: a Button (color secondary, paint text, scale xs, soft) with a circle-info Button.Icon sits in the header cell and opens a popover below it (bottom, 4px offset, 384px).
// Its click is stopped so it does not sort the column. The scene keeps one header cell and the first line of the popover.
export default function FdHeaderInfoScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Table aria-label="Results" aui={{ scale: 'sm', shape: 'soft' }} style={{ inlineSize: '100%' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }}>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '4' } }}>
                Fastener Pattern
                <Popover open>
                  <Popover.Trigger render={<Button aria-label="Fastener Pattern" aui={{ color: 'secondary', paint: 'text', scale: 'xs', shape: 'soft' }} />}>
                    <Button.Icon name="circle-info" />
                  </Popover.Trigger>
                  <Popover.Portal container={host}>
                    <Popover.Positioner side="bottom" sideOffset={4} className="ug-anchored">
                      <Popover.Popup initialFocus={false} aria-label="Fastener Pattern" render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { width: '384' } }} />}>
                        Fasteners are counted per row.
                      </Popover.Popup>
                    </Popover.Positioner>
                  </Popover.Portal>
                </Popover>
              </View>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
      </Table>
    </View>
  );
}
