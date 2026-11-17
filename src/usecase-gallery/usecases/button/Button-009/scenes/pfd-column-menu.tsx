import { useState } from 'react';
import type { ContextProps } from '../../../../types';
import { Button, ContainedIcon, IconButton, Popover, Radio, RadioGroup, Table, View } from '../../../../kit';
import { MOCK_OUTPUT_ROWS_BY_LOAD } from '../../../../mock-data';

// PFD ColumnMenu (src/pfd/ColumnMenu.tsx): the trigger is the horizontal ellipsis and turns "secondary" while its column is sorted (a filter swaps in the filter glyph); the 256px menu opens
// under it, towards the next column (bottom, start, 4px offset), and starts with a Close Button at profile "square" at its end. The scene shows two columns, two rows and the Sort radios; the search fields are left out.
export default function PfdColumnMenuScene({ host }: ContextProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)', minBlockSize: 'calc(var(--p-px-16) * 14)' }}>
      <Table aria-label="Connector calculation results" aui={{ scale: 'sm', shape: 'soft' }} sortable style={{ inlineSize: '100%' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }} actions={<IconButton name="ellipsis" aria-label="Model column options" aui={{ color: 'surface', paint: 'text', profile: 'square-compact', shape: 'soft', scale: 'xs' }} />}>Model</Table.HeaderCell>
            <Table.HeaderCell aui={{ color: 'raised' }} sortDirection="asc" actions={<span ref={setAnchor}><IconButton name="ellipsis" aria-label="Load (lb) column options" aui={{ color: 'secondary', paint: 'text', profile: 'square-compact', shape: 'soft', scale: 'xs' }} /></span>}>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {MOCK_OUTPUT_ROWS_BY_LOAD.map((row) => (
            <Table.Row key={row.model}>
              <Table.Cell>{row.model}</Table.Cell>
              <Table.Cell>{row.load}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Popover open>
        <Popover.Portal container={host}>
          <Popover.Positioner anchor={anchor} side="bottom" align="start" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Load (lb) column options"
              render={
                <View
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', minHeight: '0', minWidth: '0', gap: '12', width: '256' } }}
                />
              }
            >
              <Button aria-label="Close" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft', sx: { alignSelf: 'end' } }}>
                <ContainedIcon name="xmark" />
              </Button>
              <RadioGroup defaultValue="asc">
                <RadioGroup.Label>Sort</RadioGroup.Label>
                <Radio value="asc" aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}><Radio.Label>Sort A to Z (Smallest to Largest)</Radio.Label></Radio>
                <Radio value="desc" aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}><Radio.Label>Sort Z to A (Largest to Smallest)</Radio.Label></Radio>
                <Radio value="none" aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}><Radio.Label>None</Radio.Label></Radio>
              </RadioGroup>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
