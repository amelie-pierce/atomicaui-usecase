import { useState } from 'react';
import type { ContextProps } from '../types';
import { Field, IconButton, Popover, Radio, RadioGroup, Table, View } from '../kit';
import { MOCK_OUTPUT_ROWS_BY_LOAD } from '../mock-data';

// F01Results header + ColumnMenu: every header cell takes its kebab through `actions`; the Load (lb) menu is open,
// anchored under its kebab (bottom, end, 4px offset) and floating over the rows. Load sorts A to Z, so the table
// rows follow that choice. The scene shows the first four Output columns; the app shows all nine and scrolls.
export default function TableHeaderContext({ children, host }: ContextProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 720px)', minBlockSize: 'calc(var(--p-px-16) * 22)' }}>
      <Table aria-label="Connector calculation results" aui={{ scale: 'sm', shape: 'soft' }} sortable style={{ inlineSize: '100%' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }} actions={<IconButton name="ellipsis-vertical" aria-label="Model column options" aui={{ color: 'surface', paint: 'text', profile: 'square-compact', shape: 'soft', scale: 'xs' }} />}>Model</Table.HeaderCell>
            <Table.HeaderCell aui={{ color: 'raised' }} actions={<IconButton name="ellipsis-vertical" aria-label="Status column options" aui={{ color: 'surface', paint: 'text', profile: 'square-compact', shape: 'soft', scale: 'xs' }} />}>Status</Table.HeaderCell>
            <Table.HeaderCell aui={{ color: 'raised' }} sortDirection="asc" actions={<span ref={setAnchor}>{children}</span>}>Load (lb)</Table.HeaderCell>
            <Table.HeaderCell aui={{ color: 'raised' }} actions={<IconButton name="ellipsis-vertical" aria-label="Lateral (Tension) (lb) column options" aui={{ color: 'surface', paint: 'text', profile: 'square-compact', shape: 'soft', scale: 'xs' }} />}>Lateral (Tension) (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {MOCK_OUTPUT_ROWS_BY_LOAD.map((row) => (
            <Table.Row key={row.model}>
              <Table.Cell>{row.model}</Table.Cell>
              <Table.Cell>{row.status}</Table.Cell>
              <Table.Cell>{row.load}</Table.Cell>
              <Table.Cell>{row.lateral}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Popover open>
        <Popover.Portal container={host}>
          <Popover.Positioner anchor={anchor} side="bottom" align="end" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Load (lb) column options"
              render={
                <View
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', minHeight: '0', minWidth: '0', gap: '12', width: '256' } }}
                />
              }
            >
              <RadioGroup defaultValue="asc">
                <RadioGroup.Label>Sort</RadioGroup.Label>
                <Radio value="asc" aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}><Radio.Label>Sort A to Z (Smallest to Largest)</Radio.Label></Radio>
                <Radio value="desc" aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}><Radio.Label>Sort Z to A (Largest to Smallest)</Radio.Label></Radio>
                <Radio value="none" aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}><Radio.Label>None</Radio.Label></Radio>
              </RadioGroup>
              <Field aui={{ scale: 'sm', sx: { gap: '4', minWidth: '0' } }}>
                <Field.Label>Search by text</Field.Label>
                <Field.Control>
                  <Field.Input placeholder="Search load (lb)..." />
                </Field.Control>
              </Field>
              <Field aui={{ scale: 'sm', sx: { gap: '4', minWidth: '0' } }}>
                <Field.Label>Search by option</Field.Label>
                <Field.Select defaultValue="Select all" items={[{ value: 'Select all', label: 'Select all' }]}>
                  <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', shape: 'soft', sx: { width: 'fill' } }}>
                    <Field.SelectValue>Select all</Field.SelectValue>
                    <Field.SelectChevron />
                  </Field.SelectTrigger>
                </Field.Select>
              </Field>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
