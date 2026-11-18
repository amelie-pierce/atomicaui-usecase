import type { ContextProps } from '../../../../types';
import { Table, View } from '../../../../kit';

// RWS Output (output.tsx 527-560): no radio and no indicator column; the Show in 3D control selects, and the row only paints the selected look
// (a 4px secondary bar at its start). Two columns and two rows.
export default function RwsSelectionScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Results"
        aui={{ scale: 'sm', shape: 'soft', sx: { gap: '0', minHeight: '0', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1' } }}
        border="all-cells"
        borderStyle="tonal"
        selection="row"
        indicatorColumn={false}
        hoverable={false}
        rowAui={{ color: 'surface', paint: 'solid', states: { unselected: { color: 'surface', paint: 'solid' }, selected: { color: 'surface', paint: 'solid', sx: { borderColor: 'secondary', borderInlineStartWidth: '4' } } } }}
        headerCellAui={{ color: 'raised' }}
      >
        <Table.Head>
          <Table.Row data-aui-header-row selectable={false}>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row selectable selected selectionLabel="Model B-200">
            <Table.Cell>
              Model B-200
            </Table.Cell>
            <Table.Cell>2,210</Table.Cell>
          </Table.Row>
          <Table.Row selectable selectionLabel="Model C-300">
            <Table.Cell>
              Model C-300
            </Table.Cell>
            <Table.Cell>1,180</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
