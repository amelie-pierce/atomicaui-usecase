import type { ContextProps } from '../../../../types';
import { Symbol, Table, View } from '../../../../kit';

// ADM Result tab detail table (shared/ResultTable.tsx 20-200, LimitStateTable.tsx, StatusCell.tsx): rows separated by lines in a soft outlined frame, a full-width title band
// above the raised column headers, headers and cells centred with the first column left-aligned, and a Ratio cell that leads with a coloured status dot. Two columns
// and one row; the pass or fail colour of the dot follows the 100% threshold.
export default function AdmSummaryScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Limit states"
        border="between-rows"
        aui={{ shape: 'soft', sx: { borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1', overflow: 'hidden', width: 'fill', flex: 'none', textAlign: 'center' } }}
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell colSpan={3} aui={{ sx: { textAlign: 'left' } }}>Limit states</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised', sx: { textAlign: 'left' } }}>Limit state</Table.HeaderCell>
            <Table.HeaderCell aui={{ color: 'raised' }}>Demand (lb)</Table.HeaderCell>
            <Table.HeaderCell aui={{ color: 'raised' }}>Ratio</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ sx: { textAlign: 'left' } }}>Steel tension</Table.Cell>
            <Table.Cell>2,210</Table.Cell>
            <Table.Cell>
              <Symbol color="success" aria-hidden>●</Symbol> 41%
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
