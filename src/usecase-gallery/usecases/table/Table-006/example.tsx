import { Table } from '../../../kit';

export default function Example() {
  return (
    <Table
      aria-label="Data preview"
      border="all-cells"
      borderStyle="tonal"
      aui={{
        color: 'surface',
        paint: 'solid',
        shape: 'soft',
        scale: 'sm',
        sx: { borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1', borderColor: 'outlined' },
      }}
      headerCellAui={{ color: 'raised' }}
    >
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>FIELD</Table.HeaderCell>
          <Table.HeaderCell>VALUE</Table.HeaderCell>
          <Table.HeaderCell>STATUS</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Design Method</Table.Cell>
          <Table.Cell>ACI 318</Table.Cell>
          <Table.Cell>Supported</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
