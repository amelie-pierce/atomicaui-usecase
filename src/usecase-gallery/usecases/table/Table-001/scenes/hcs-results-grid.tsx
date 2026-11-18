import type { ContextProps } from '../../../../types';
import { Table, View } from '../../../../kit';

// The Output results table of HCS (F01Results.tsx 536-626), shared by HS, PFD, AGPD, PBS, RWS and FD: an all-cells tonal grid in a soft outlined frame,
// raised centred sortable header, first column pinned and left-aligned, other columns centred. Cut to two columns and two rows; the selection radio,
// expander and column menu are Table-002 and Button-008/009.
export default function HcsResultsGridScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Results"
        aui={{
          scale: 'sm',
          shape: 'soft',
          sx: { gap: '0', minHeight: '0', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1' },
        }}
        border="all-cells"
        borderStyle="tonal"
        scroll="self"
        bodyFit="content"
        fit="fill"
        minInlineSize={256}
        frozenColumns={1}
        sortable
        headerCellAui={{ color: 'raised', sx: { textAlign: 'center' } }}
      >
        <Table.Head>
          <Table.Row data-aui-header-row>
            <Table.HeaderCell aui={{ scale: 'sm', color: 'raised', sx: { width: '128', textAlign: 'center' } }} title="Sort by Model" sortDirection={false} onSortToggle={() => {}}>
              <span>Model</span>
            </Table.HeaderCell>
            <Table.HeaderCell aui={{ scale: 'sm', color: 'raised', sx: { width: '128', textAlign: 'center' } }} title="Sort by Load" sortDirection={false} onSortToggle={() => {}}>
              <span>Load (lb)</span>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ scale: 'sm', sx: { width: '128', textAlign: 'left' } }}>Model B-200</Table.Cell>
            <Table.Cell aui={{ scale: 'sm', sx: { width: '128', textAlign: 'center' } }}>2,210</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell aui={{ scale: 'sm', sx: { width: '128', textAlign: 'left' } }}>Model C-300</Table.Cell>
            <Table.Cell aui={{ scale: 'sm', sx: { width: '128', textAlign: 'center' } }}>1,180</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
