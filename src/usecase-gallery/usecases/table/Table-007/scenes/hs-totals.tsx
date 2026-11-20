import type { ContextProps } from '../../../../types';
import { Table, Type, View } from '../../../../kit';

// HS job list (src/hs/OutputPane.tsx 520-560, JobList.jsx 266-287): the Table.Foot holds two rows whose cells span columns: a "Fastener Totals" label (semi-bold Type) and under it the totals, one Type per line.
// One job row; the row buttons, the other columns and the Duplicate and Delete job dialogs are left out.
export default function HsTotalsScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Job list"
        aui={{ scale: 'sm', shape: 'soft', sx: { gap: '0', minHeight: '0', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1' } }}
        border="all-cells"
        borderStyle="tonal"
        scroll="self"
        bodyFit="content"
        headerCellAui={{ color: 'raised', sx: { textAlign: 'center' } }}
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Job</Table.HeaderCell>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Qty</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>J1</Table.Cell>
            <Table.Cell>Model B-200</Table.Cell>
            <Table.Cell>4</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Foot>
          <Table.Row>
            <Table.Cell colSpan={1} />
            <Table.Cell colSpan={2}>
              <Type as="strong" role="l4" weight="semi-bold">
                Fastener Totals
              </Type>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell colSpan={1} />
            <Table.Cell colSpan={2}>
              <Type as="div" role="l4">
                16 nails, 8d
              </Type>
            </Table.Cell>
          </Table.Row>
        </Table.Foot>
      </Table>
    </View>
  );
}
