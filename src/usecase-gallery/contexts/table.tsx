import type { ContextProps } from '../types';
import { Table } from '../kit';

export default function TableContext({ children }: ContextProps) {
  return (
    <Table aria-label="Results">
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Product</Table.HeaderCell>
          <Table.HeaderCell>Result</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            {children}
          </Table.Cell>
          <Table.Cell>Pass</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
