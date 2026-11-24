import type { ContextProps } from '../../../../../types';
import { Table, Type, View } from '../../../../../kit';

// HS results table grouped by model (ResultsTable.tsx): the same group row as HCS (Table.ExpandTrigger, then the model with its member count in semi-bold, gap 4), but
// the row and its first cell are painted surface-alt solid, so the group reads as a band above its members. The member rows and the other columns are left out.
export default function HsGroupScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Results" expandable indicatorColumn={false} aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }}>Model</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row aui={{ color: 'surface-alt', paint: 'solid' }} selectable={false} expandable expansionLabel="Expand A-100 group">
            <Table.Cell aui={{ color: 'surface-alt', paint: 'solid' }}>
              <View aui={{ paint: 'text', scale: 'sm', sx: { display: 'flex', alignItems: 'center', gap: '4' } }}>
                <Table.ExpandTrigger />
                <Type as="span" weight="semi-bold">A-100 (2)</Type>
              </View>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
