import type { ContextProps } from '../../../../../types';
import { Chip, Table } from '../../../../../kit';

// HCS F01Results Status cell (src/components/F01Results.tsx): the Status column of the results table renders a tonal Chip with a leading icon, success with circle-check for Passed and error with circle-xmark for Failed. Two rows show both.
export default function HcsResultsStatusScene({ children }: ContextProps) {
  return (
    <Table aria-label="Connector calculation results" aui={{ scale: 'sm', shape: 'soft' }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell aui={{ color: 'raised' }}>Model</Table.HeaderCell>
          <Table.HeaderCell aui={{ color: 'raised' }}>Status</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Model B-200</Table.Cell>
          <Table.Cell>
            {children}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Model C-300</Table.Cell>
          <Table.Cell>
            <Chip aui={{ scale: 'sm', color: 'error', paint: 'tonal' }}>
              <Chip.Icon name="circle-xmark" aui={{ scale: 'sm' }} />
              Failed
            </Chip>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
