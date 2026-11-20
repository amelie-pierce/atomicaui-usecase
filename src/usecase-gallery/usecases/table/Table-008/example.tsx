import { Table } from '../../../kit';

const CELL = { profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center' } } as const;

export default function Example() {
  return (
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
  );
}
