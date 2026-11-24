import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// HS Job List (OutputPane.tsx): the first cell of each job row holds Edit and Duplicate, two tonal secondary sm Buttons side by side (the cell's own text flow, no stack), left-aligned
// (outputFirstCellAui). The Job, Model, quantity and fastener columns, the trash column and the totals row are left out.
export default function HsEditScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Job List" aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }} aria-label="Edit or duplicate" />
            <Table.HeaderCell aui={{ color: 'raised' }}>Job</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ sx: { textAlign: 'left' } }}>
              {children}
            </Table.Cell>
            <Table.Cell>Job 1</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
