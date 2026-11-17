import type { ContextProps } from '../../../../types';
import { IconButton, Table, View } from '../../../../kit';

// HS Job List (OutputPane.tsx) and PBS Connection List (ResultsSection.tsx): the last cell of each row is one trash IconButton, secondary text sm, named by an aria-label that
// carries the row id (HS: Delete <job>, PBS: Remove <connection>). The app opens a confirm dialog from it. This scene writes its own Button; the other columns are left out.
export default function HsRemoveScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Jobs" aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }}>Job</Table.HeaderCell>
            <Table.HeaderCell aui={{ color: 'raised' }} aria-label="Remove" />
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Job 1</Table.Cell>
            <Table.Cell>
              <IconButton name="trash" aria-label="Remove Job 1" aui={{ color: 'secondary', paint: 'text', scale: 'sm' }} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
