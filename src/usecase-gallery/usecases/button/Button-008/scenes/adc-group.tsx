import type { ContextProps } from '../../../../types';
import { Table, Type, View } from '../../../../kit';

// ADC Products picker (ProductsPicker.tsx): a parent row of the anchor tree. Its Anchor Name cell is a flex row (gap 6) of the library's Table.ExpandTrigger, here set to
// aui scale xs, profile square-compact, shape soft, paint text (smaller than the table density), and the semi-bold name. The product rows under it and the other columns are left out.
export default function AdcGroupScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Anchor products" expandable indicatorColumn={false} aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }}>Anchor Name</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row selectable={false} expandable>
            <Table.Cell>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '6' } }}>
                <Table.ExpandTrigger aria-label="Expand Set 3G" aui={{ scale: 'xs', profile: 'square-compact', shape: 'soft', paint: 'text' }} />
                <Type as="span" weight="semi-bold">Set 3G</Type>
              </View>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
