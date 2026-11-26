import { Table, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Connection"
        aui={{ profile: 'no-padding', scale: 'xs', shape: 'none', sx: { width: 'fill', borderColor: 'text', textAlign: 'left' } }}
        border="all-cells"
        scroll="parent"
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ profile: 'compact', scale: 'xs', sx: { textAlign: 'left', background: 'muted', foreground: 'surface' } }}>Model</Table.HeaderCell>
            <Table.HeaderCell aui={{ profile: 'compact', scale: 'xs', sx: { textAlign: 'left', background: 'muted', foreground: 'surface' } }}>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ profile: 'compact', scale: 'xs', sx: { textAlign: 'left' } }}>Model B-200</Table.Cell>
            <Table.Cell aui={{ profile: 'compact', scale: 'xs', sx: { textAlign: 'left' } }}>2,210</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
