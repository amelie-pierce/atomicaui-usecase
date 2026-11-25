import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// PBS Connection List (ResultsSection.tsx): the first cell of each row stacks Edit above Duplicate (a column, gap 8, centred), the same tonal secondary sm Buttons as HS.
// The Connection, Models and Quantity columns, the remove column and the editing banner are left out.
export default function PbsEditScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Connection List" aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }} aria-label="Edit or duplicate" />
            <Table.HeaderCell aui={{ color: 'raised' }}>Connection</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ sx: { textAlign: 'center' } }}>
              <View data-ug-part="row-actions" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8', alignItems: 'center' } }}>
                {children}
              </View>
            </Table.Cell>
            <Table.Cell aui={{ sx: { textAlign: 'start' } }}>Connection 1</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
