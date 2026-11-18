import type { ContextProps } from '../../../../types';
import { Table, View } from '../../../../kit';

// ADM Multi design table (MultiDesignTable.tsx 49-60, 94-111): rows separated by lines, the radio in the first cell, and the selected row painted raised with a 4px
// primary bar at its start. The family group rows (Button-008) and the Pass or fail and value columns are left out.
export default function AdmSelectionScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Multi design"
        aui={{ color: 'surface', paint: 'solid', shape: 'soft', scale: 'sm', sx: { borderColor: 'outlined', gap: '0', width: 'fill' } }}
        selectionMode="single"
        selection="row"
        indicatorColumn={false}
        indicatorType="radio"
        border="between-rows"
        borderStyle="tonal"
        hoverable
        rowAui={{ states: { selected: { color: 'raised', sx: { borderColor: 'primary', borderInlineStartWidth: '4' } } } }}
      >
        <Table.Head>
          <Table.Row data-aui-header-row selectable={false} expandable={false}>
            <Table.HeaderCell aui={{ color: 'raised', sx: { textAlign: 'start' } }}>Product</Table.HeaderCell>
            <Table.HeaderCell aui={{ color: 'raised', sx: { textAlign: 'end' } }}>Tension (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row selected selectionLabel="A-100">
            <Table.Cell>
              <Table.SelectionToggle />
              A-100
            </Table.Cell>
            <Table.Cell aui={{ sx: { textAlign: 'end' } }}>2,210</Table.Cell>
          </Table.Row>
          <Table.Row selectionLabel="B-200">
            <Table.Cell>
              <Table.SelectionToggle />
              B-200
            </Table.Cell>
            <Table.Cell aui={{ sx: { textAlign: 'end' } }}>1,180</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
