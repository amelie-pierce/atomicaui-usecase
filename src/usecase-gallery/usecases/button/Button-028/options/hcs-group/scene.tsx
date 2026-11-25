import type { ContextProps } from '../../../../../types';
import { Table, Type, View } from '../../../../../kit';

// HCS results table grouped by model (F01Results.tsx), with mock data; ADC's ProductsPicker parent row is the same UI (it sets the trigger to scale xs and gap 6, a size difference only): the group row is not selectable and spans every column; its cell is a flex row (gap 4) of the library's
// Table.ExpandTrigger (a chevron-right IconButton at the table density, rotated 90 degrees by the DS when open) and the model number with the member count in
// semi-bold. The scene keeps the Model header and the closed group row; the member rows and the other columns are left out.
export default function HcsGroupScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Connector calculation results" expandable indicatorColumn={false} aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }}>Model</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row selectable={false} expandable expansionLabel="Expand A-100 group">
            <Table.Cell>
              <View aui={{ paint: 'text', scale: 'sm', sx: { display: 'flex', alignItems: 'center', gap: '4' } }}>
                <Table.ExpandTrigger />
                <Type data-ug-part="group-label" as="span" weight="semi-bold">A-100 (2)</Type>
              </View>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
