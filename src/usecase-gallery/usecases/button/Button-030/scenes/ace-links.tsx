import type { ContextProps } from '../../../../types';
import { Button, Table, View } from '../../../../kit';

// ACE Job tally (CalculationOutput.tsx): the first cell of each job row stacks Edit and Delete in a column, start-aligned. Both are secondary text sm Buttons with profile
// no-padding, so they read as links. The app hides Edit on the selected row and Delete while only one job exists. This scene writes its own Buttons; the other columns and the totals row are left out.
export default function AceLinksScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Job tally" aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }} aria-label="Actions" />
            <Table.HeaderCell aui={{ color: 'raised' }}>Job</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ sx: { textAlign: 'left' } }}>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start' } }}>
                <Button aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'no-padding' }}>Edit</Button>
                <Button aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'no-padding' }}>Delete</Button>
              </View>
            </Table.Cell>
            <Table.Cell>Job 1</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
