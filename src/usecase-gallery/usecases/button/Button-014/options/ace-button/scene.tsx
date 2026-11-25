import type { ContextProps } from '../../../../../types';
import { Button, Table, Type, View } from '../../../../../kit';

// ACE Job tally (CalculationOutput.tsx): a section (default profile, no shape) whose title, table and Add job Button stack in a column; the Button sits under the table and stretches
// across it, with the plus icon before the label. It is secondary solid like HS's, but placed below the table instead of in the toolbar. This scene writes its own Button. The Job and quantity columns, the row
// actions, the totals row and the other output sections are left out.
export default function AceButtonScene(_props: ContextProps) {
  return (
    <View
      as="section"
      data-ug-part="tally-section"
      aria-labelledby="ug-job-tally-title"
      aui={{ scale: 'sm', profile: 'default', shape: 'none', paint: 'text', sx: { display: 'flex', flexDirection: 'column', width: 'fill' } }}
      style={{ inlineSize: 'min(100%, 480px)' }}
    >
      <Type data-ug-part="tally-title" id="ug-job-tally-title" as="h3" role="l4" weight="semi-bold">Job tally</Type>
      <Table data-ug-part="tally-table" aria-label="Job tally" aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }}>Job</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Job 1</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button aui={{ color: 'secondary', paint: 'solid', scale: 'sm' }}>
        <Button.Icon name="plus" aria-hidden />
        Add job
      </Button>
    </View>
  );
}
