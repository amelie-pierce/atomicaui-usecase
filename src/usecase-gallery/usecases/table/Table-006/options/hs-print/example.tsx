import { Table, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Connection"
        a11y="table"
        border="all-cells"
        aui={{ scale: 'xs', profile: 'compact', sx: { width: 'fill', fontSize: '10', lineHeight: '12' } }}
        headerCellAui={{ color: 'secondary', paint: 'solid', sx: { textAlign: 'start', whiteSpace: 'nowrap', borderColor: 'secondary' } }}
        cellAui={{ sx: { textAlign: 'center', borderColor: 'secondary' } }}
      >
        <Table.Head>
          <Table.Row data-aui-header-row selectable={false} expandable={false}>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row selectable={false} expandable={false}>
            <Table.Cell>Model B-200</Table.Cell>
            <Table.Cell>2,210</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
