import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// RWS print table (legacy PrintTable.jsx 1-60): the HS table (compact xs cells at 10/12 type, header cells painted secondary solid, secondary cell borders and centred cells),
// but the header labels are centred, not start-aligned.
export default function RwsPrintScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Connection"
        a11y="table"
        border="all-cells"
        aui={{ scale: 'xs', profile: 'compact', sx: { width: 'fill', fontSize: '10', lineHeight: '12' } }}
        headerCellAui={{ color: 'secondary', paint: 'solid', sx: { textAlign: 'center', borderColor: 'secondary' } }}
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
