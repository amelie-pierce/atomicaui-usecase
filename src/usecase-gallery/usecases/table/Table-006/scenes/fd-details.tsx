import type { ContextProps } from '../../../../types';
import { Chip, Table, View } from '../../../../kit';

// FD Why Not details (RowExpansion.jsx 36-95): a header-less all-cells tonal grid of two columns, a 96px status Chip cell (tonal, xs) and the check message. One row.
export default function FdDetailsScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table a11y="table" border="all-cells" borderStyle="tonal" aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ sx: { width: '96' } }}>
              <Chip aui={{ color: 'danger', paint: 'tonal', scale: 'xs' }}>
                <Chip.Label>Fail</Chip.Label>
              </Chip>
            </Table.Cell>
            <Table.Cell>Edge distance is below the minimum.</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
