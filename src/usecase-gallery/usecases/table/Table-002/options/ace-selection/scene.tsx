import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// ACE Output table (CalculationOutput.tsx 945-1010): the radio sits in the Model cell above the model name, and a selected row gets no edge bar (no rowAui).
// Two columns and two rows.
export default function AceSelectionScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Results"
        aui={{ scale: 'sm', shape: 'soft', sx: { width: 'fill', gap: '0', minHeight: '0', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1' } }}
        border="all-cells"
        borderStyle="tonal"
        selectionMode="single"
        indicatorType="radio"
        indicatorColumn={false}
        selectionToggleAui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}
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
