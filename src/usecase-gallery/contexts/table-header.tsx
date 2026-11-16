import type { ContextProps } from '../types';
import { Field, IconButton, Radio, RadioGroup, Table, Type, View } from '../kit';

// The Output table header: each header cell takes the kebab through its `actions` slot, after the label.
// The column menu is a floating popover in the app; here it is a static card under the header.
export default function TableHeaderContext({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '4', alignItems: 'end' } }} style={{ inlineSize: 'min(100%, 720px)' }}>
      <Table aria-label="Results" aui={{ scale: 'sm', shape: 'soft' }} style={{ inlineSize: '100%' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }} actions={<IconButton name="ellipsis-vertical" aria-label="Model column options" aui={{ color: 'surface', paint: 'text', profile: 'square-compact', shape: 'soft', scale: 'xs' }} />}>Model</Table.HeaderCell>
            <Table.HeaderCell aui={{ color: 'raised' }} actions={children}>Maker</Table.HeaderCell>
            <Table.HeaderCell aui={{ color: 'raised' }} actions={<IconButton name="ellipsis-vertical" aria-label="Capacity column options" aui={{ color: 'surface', paint: 'text', profile: 'square-compact', shape: 'soft', scale: 'xs' }} />}>Capacity</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Model A-100</Table.Cell>
            <Table.Cell>Maker One</Table.Cell>
            <Table.Cell>2,450 lb</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Model B-200</Table.Cell>
            <Table.Cell>Maker Two</Table.Cell>
            <Table.Cell>2,210 lb</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <View
        aria-label="Maker column options"
        aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '12', width: '256' } }}
      >
        <RadioGroup aria-label="Sort" defaultValue="asc">
          <Radio value="asc"><Radio.Label>Sort A to Z</Radio.Label></Radio>
          <Radio value="desc"><Radio.Label>Sort Z to A</Radio.Label></Radio>
        </RadioGroup>
        <Field aui={{ scale: 'sm' }}>
          <Field.Label>Search by text</Field.Label>
          <Field.Control>
            <Field.Input placeholder="Maker" />
          </Field.Control>
        </Field>
      </View>
    </View>
  );
}
