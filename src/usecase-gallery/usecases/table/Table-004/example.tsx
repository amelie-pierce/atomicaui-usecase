import { Table } from '../../../kit';

export default function Example() {
  return (
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
  );
}
