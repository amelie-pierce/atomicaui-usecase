import type { ContextProps } from '../../../../types';
import { Table, View } from '../../../../kit';

// ACE Job Tally (src/features/calculation/ui/CalculationOutput.tsx 626-731): the results table with a Table.Foot of one Total row under the body (first cell left aligned, a total per product column);
// with scroll "self" the foot stays fixed while the body scrolls. One job row and one product column; the Edit and Delete job buttons, the user-input column and the Add New Job button are left out.
export default function AceTallyScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Job tally"
        aui={{ scale: 'sm', shape: 'soft', sx: { gap: '0', minHeight: '0', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1' } }}
        border="all-cells"
        borderStyle="tonal"
        scroll="self"
        bodyFit="content"
        striped
        headerCellAui={{ color: 'raised', sx: { textAlign: 'center' } }}
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Job</Table.HeaderCell>
            <Table.HeaderCell>Model B-200</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ sx: { textAlign: 'left' } }}>Job 1</Table.Cell>
            <Table.Cell>4</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Foot>
          <Table.Row>
            <Table.Cell aui={{ sx: { textAlign: 'left' } }}>Total</Table.Cell>
            <Table.Cell>4</Table.Cell>
          </Table.Row>
        </Table.Foot>
      </Table>
    </View>
  );
}
