import { Table, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
    <Table
      aria-label="Governing ratios"
      border="between-rows"
      aui={{ shape: 'soft', sx: { textAlign: 'right', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1', overflow: 'hidden' } }}
      headerCellAui={{ color: 'raised' }}
    >
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell aui={{ color: 'raised', sx: { textAlign: 'left' } }}>Limit state</Table.HeaderCell>
          <Table.HeaderCell>Demand (lb)</Table.HeaderCell>
          <Table.HeaderCell>Capacity (lb)</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell aui={{ sx: { textAlign: 'left' } }}>Steel tension</Table.Cell>
          <Table.Cell>2,210</Table.Cell>
          <Table.Cell>5,400</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell aui={{ sx: { textAlign: 'left' } }}>Concrete breakout</Table.Cell>
          <Table.Cell>1,180</Table.Cell>
          <Table.Cell>3,060</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    </View>
  );
}
