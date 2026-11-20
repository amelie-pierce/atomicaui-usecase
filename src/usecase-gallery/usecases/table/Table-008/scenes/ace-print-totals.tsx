import type { ContextProps } from '../../../../types';
import { Table, View } from '../../../../kit';

const CELL = { profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center' } } as const;

// ACE report table with its footer (print/ui/report-primitives.tsx 213-262): the dense print grid of Table-006 plus a Table.Foot row of bold cells (typographyStyle "bold", same 4px by 6px padding), used for the totals line of a printed table.
export default function AcePrintTotalsScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Connection" aui={{ profile: 'no-padding', scale: 'xs', shape: 'none', sx: { width: 'fill', borderColor: 'text' } }} border="all-cells" scroll="parent" selectionMode="none">
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ ...CELL, sx: { ...CELL.sx, background: 'muted', foreground: 'surface', whiteSpace: 'normal' } }}>Model</Table.HeaderCell>
            <Table.HeaderCell aui={{ ...CELL, sx: { ...CELL.sx, background: 'muted', foreground: 'surface', whiteSpace: 'normal' } }}>Qty</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={CELL}>Model B-200</Table.Cell>
            <Table.Cell aui={CELL}>4</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Foot>
          <Table.Row>
            <Table.Cell aui={{ ...CELL, sx: { ...CELL.sx, typographyStyle: 'bold' } }}>Total</Table.Cell>
            <Table.Cell aui={{ ...CELL, sx: { ...CELL.sx, typographyStyle: 'bold' } }}>4</Table.Cell>
          </Table.Row>
        </Table.Foot>
      </Table>
    </View>
  );
}
