import type { ContextProps } from '../../../../types';
import { Table, View } from '../../../../kit';

// ACE report table (print/ui/report-primitives.tsx 11-46, 213-262): an all-cells grid with a text-coloured border and no corner radius, 4px by 6px cells
// centred, and a header band painted muted with surface text. One header row and one data row; the footer row (bold) is left out.
export default function AcePrintScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Connection"
        aui={{ profile: 'no-padding', scale: 'xs', shape: 'none', sx: { width: 'fill', borderColor: 'text' } }}
        border="all-cells"
        scroll="parent"
        selectionMode="none"
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center', background: 'muted', foreground: 'surface', whiteSpace: 'normal' } }}>Model</Table.HeaderCell>
            <Table.HeaderCell aui={{ profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center', background: 'muted', foreground: 'surface', whiteSpace: 'normal' } }}>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center' } }}>Model B-200</Table.Cell>
            <Table.Cell aui={{ profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center' } }}>2,210</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
