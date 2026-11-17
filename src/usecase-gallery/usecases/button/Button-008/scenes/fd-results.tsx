import type { ContextProps } from '../../../../types';
import { Table, Type, View } from '../../../../kit';

// FD results table (Results.jsx modelCell), cut to the Model column and one row: the Model cell is a flex row (gap 8) that starts with the library's own Table.ExpandTrigger
// (a chevron-right IconButton at the table density, square-compact, soft, text; the DS turns it 90 degrees when the row is expanded), then the model name. FD sets no Button
// props and no error colour for a failed row. The scene is static: the row is expandable but nothing is wired to it.
export default function FdResultsScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Design results" expandable indicatorColumn={false} aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }}>Model</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row expandable expansionLabel="Show Why Not for Model A-100">
            <Table.Cell>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '8', minWidth: '0' } }}>
                <Table.ExpandTrigger />
                <Type as="span" role="l4">Model A-100</Type>
              </View>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
