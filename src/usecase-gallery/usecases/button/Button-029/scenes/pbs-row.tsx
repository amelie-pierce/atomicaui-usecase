import type { ContextProps } from '../../../../types';
import { IconButton, Table, Tooltip, View } from '../../../../kit';

// PBS results table (ResultsSection.tsx): the first cell of each result row is one tonal secondary plus IconButton that adds the row to the Connection List, labelled by a top Tooltip
// (the app replaces it with a selection radio in edit mode). The scene keeps one row and one other column; the tooltip is closed. This scene writes its own Button.
export default function PbsRowScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Connection results" aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }} aria-label="Add" />
            <Table.HeaderCell aui={{ color: 'raised' }}>Model</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ sx: { textAlign: 'center' } }}>
              <Tooltip.Provider>
                <Tooltip>
                  <Tooltip.Trigger render={<IconButton name="plus" aria-label="Add to Connection List" aui={{ color: 'secondary', paint: 'tonal', scale: 'sm', shape: 'soft' }} />} />
                  <Tooltip.Portal>
                    <Tooltip.Positioner side="top" sideOffset={4}>
                      <Tooltip.Popup>Add to Connection List</Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip>
              </Tooltip.Provider>
            </Table.Cell>
            <Table.Cell>Model A-100</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
