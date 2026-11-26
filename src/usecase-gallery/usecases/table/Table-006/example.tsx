import { Table, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Connection"
        aui={{ profile: 'no-padding', scale: 'xs', shape: 'none', sx: { width: 'fill', borderColor: 'text' } }}
        border="all-cells"
        scroll="parent"
        selectionMode="none"
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center', background: 'muted', foreground: 'surface', whiteSpace: 'normal' } }}>Model</Table.HeaderCell>
            <Table.HeaderCell aui={{ profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center', background: 'muted', foreground: 'surface', whiteSpace: 'normal' } }}>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center' } }}>Model B-200</Table.Cell>
            <Table.Cell aui={{ profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center' } }}>2,210</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
