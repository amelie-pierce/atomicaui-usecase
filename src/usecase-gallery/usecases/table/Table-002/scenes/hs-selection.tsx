import type { ContextProps } from '../../../../types';
import { Table, View } from '../../../../kit';

// HS Output table row (ResultsTable.tsx 34-57, 120-150), the same radio and bar on a surface row as FD (Results.jsx 72-83) and PBS in edit mode
// (ResultsSection.tsx 69-97, 530-570). The thumbnail and the other columns are left out.
export default function HsSelectionScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Results"
        aui={{ scale: 'sm', shape: 'soft', sx: { gap: '0', minHeight: '0', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1' } }}
        border="all-cells"
        borderStyle="tonal"
        selectionMode="single"
        indicatorType="radio"
        indicatorColumn={false}
        selectionToggleAui={{ scale: 'sm', sx: { minWidth: '24', minHeight: '24' }, states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}
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
          <Table.Row selected selectionLabel="Model B-200">
            <Table.Cell>
              <Table.SelectionToggle />
              Model B-200
            </Table.Cell>
            <Table.Cell>2,210</Table.Cell>
          </Table.Row>
          <Table.Row selectionLabel="Model C-300">
            <Table.Cell>
              <Table.SelectionToggle />
              Model C-300
            </Table.Cell>
            <Table.Cell>1,180</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
