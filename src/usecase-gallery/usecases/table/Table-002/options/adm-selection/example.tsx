import { Table } from '../../../../../kit';

export default function Example() {
  return (
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
          <Table.Cell><Table.SelectionToggle />A-100</Table.Cell>
          <Table.Cell aui={{ sx: { textAlign: 'end' } }}>2,210</Table.Cell>
        </Table.Row>
        <Table.Row selectionLabel="B-200">
          <Table.Cell><Table.SelectionToggle />B-200</Table.Cell>
          <Table.Cell aui={{ sx: { textAlign: 'end' } }}>1,180</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
