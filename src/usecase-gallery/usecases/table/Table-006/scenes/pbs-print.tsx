import type { ContextProps } from '../../../../types';
import { Table, View } from '../../../../kit';

// PBS print table (PrintView.tsx 61-80), also AGPD (App.tsx 763) and PFD (PrintView.tsx 66): the bare xs table with all-cells borders and the library's default header and cell.
export default function PbsPrintScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Connection"
        aui={{ scale: 'xs' }}
        border="all-cells"
        borderStyle="tonal"
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Model B-200</Table.Cell>
            <Table.Cell>2,210</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
