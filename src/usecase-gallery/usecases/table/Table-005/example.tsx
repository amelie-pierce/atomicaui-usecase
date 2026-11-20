import { Chip, Table } from '../../../kit';

export default function Example() {
  return (
    <Table a11y="table" border="all-cells" borderStyle="tonal" aui={{ scale: 'sm', shape: 'soft' }}>
      <Table.Body>
        <Table.Row>
          <Table.Cell aui={{ sx: { width: '96' } }}>
            <Chip aui={{ color: 'danger', paint: 'tonal', scale: 'xs' }}>
              <Chip.Label>Fail</Chip.Label>
            </Chip>
          </Table.Cell>
          <Table.Cell>Edge distance is below the minimum.</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
