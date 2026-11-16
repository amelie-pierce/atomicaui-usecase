import type { ContextProps } from '../../../../types';
import { Button, Chip, ContainedImage, Radio, Symbol, Table, Tabs, Type, View } from '../../../../kit';
import { MOCK_OUTPUT_COLUMNS, MOCK_RESULT_ROWS, MOCK_WHY_NOT_TABS } from '../../../../mock-data';
import connectorThumbnail from '../connector-thumbnail.svg';

// F01Results: the Output table with all-cell borders, the Model column frozen and single selection by radio. Every row
// composes its own Model cell: expander, selection radio, thumbnail, model name. A failed row has a disabled radio in the
// error color of its expander and opens the Why Not panel under the row. The scene shows all nine Output columns (the table
// scrolls sideways in a narrow pane), the first row selected, the third row failed and open. The chevron turns 90 degrees
// on the icon only (`.ug-results`, as `.hcs-why-not-toggle` in the app); the scene is static, so nothing responds to clicks.
const columnWidths = ['384', '128', '128', '192', '192', '192', '192', '192', '288'] as const;
const columnPx = [384, 128, 128, 192, 192, 192, 192, 192, 288];
const selectionAppearance = {
  scale: 'sm',
  sx: { minWidth: '24', minHeight: '24' },
  states: {
    unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
    selected: { color: 'primary', paint: 'solid' },
  },
} as const;
const headerLines: Record<string, [string, string]> = {
  load: ['Load', '(lb)'],
  lateral: ['Lateral (Tension)', '(lb)'],
  plateThickness: ['Plate Thickness', '(PT) (in.)'],
  plateDepth: ['Plate Depth', '(PD) (in.)'],
  rotationBolt: ['Rotation Bolt', '(Qty) (Total)'],
  lateralBolt: ['Lateral Bolt', '(Qty) (Total)'],
  machineBoltSize: ['Machine Bolt Size', '(Dia x Length) (in.)'],
};
const failed = MOCK_RESULT_ROWS.find((row) => !row.passed)!;

export default function ResultsScene({ children }: ContextProps) {
  return (
    <View className="ug-results" aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 720px)', overflow: 'hidden' }}>
      <Table
        aria-label="Connector calculation results"
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
        minInlineSize={columnPx.reduce((sum, px) => sum + px, 0)}
        frozenColumns={1}
        sortable
        expandable
        rowAui={{
          color: 'surface-alt',
          paint: 'solid',
          states: {
            unselected: { color: 'surface-alt', paint: 'solid' },
            selected: { color: 'surface-alt', paint: 'solid', sx: { borderColor: 'secondary', borderInlineStartWidth: '4' } },
          },
        }}
        selectionMode="single"
        indicatorType="radio"
        indicatorColumn={false}
        selectionToggleAui={selectionAppearance}
        headerCellAui={{ color: 'raised', sx: { textAlign: 'center' } }}
      >
        <Table.Head>
          <Table.Row selectable={false} expandable={false}>
            {MOCK_OUTPUT_COLUMNS.map((column, index) => (
              <Table.HeaderCell key={column.id} aui={{ scale: 'sm', color: 'raised', sx: { width: columnWidths[index], textAlign: 'center' } }} sortDirection={false}>
                <span>
                  {headerLines[column.id] ? (
                    <>
                      {headerLines[column.id][0]}
                      <br />
                      {headerLines[column.id][1]}
                    </>
                  ) : (
                    column.header
                  )}
                </span>
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {MOCK_RESULT_ROWS.map((row, rowIndex) => {
            const open = !row.passed;
            return (
              <Table.Row
                key={row.id}
                selected={rowIndex === 0}
                selectable={row.passed}
                expandable
                expanded={open}
                expansionLabel={`${open ? 'Hide' : 'Show'} Why Not for ${row.model}`}
                expandedContent={
                  open && (
                    <View
                      aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', gap: '12', borderWidth: '0', paddingInlineStart: '16', paddingInlineEnd: '16', paddingBlockStart: '16', paddingBlockEnd: '16' } }}
                    >
                      <Type as="h3" role="l3" weight="semi-bold">{failed.model}</Type>
                      <Tabs defaultValue="Depth" aui={{ scale: 'sm', sx: { gap: '12' } }}>
                        <Tabs.List aui={{ scale: 'sm' }}>
                          {MOCK_WHY_NOT_TABS.map((tab) => (
                            <Tabs.Tab key={tab.name} value={tab.name} aui={{ scale: 'sm' }}>
                              <Tabs.Icon name={tab.passed ? 'check' : 'xmark'} aui={{ scale: 'sm', color: tab.passed ? 'success' : 'error' }} />
                              {tab.name}
                            </Tabs.Tab>
                          ))}
                        </Tabs.List>
                        {MOCK_WHY_NOT_TABS.map((tab) => (
                          <Tabs.Panel
                            key={tab.name}
                            value={tab.name}
                            aui={{ scale: 'sm', color: 'surface-alt', paint: 'solid', shape: 'soft', sx: { borderWidth: '0', paddingInlineStart: '12', paddingInlineEnd: '12', paddingBlockStart: '12', paddingBlockEnd: '12' } }}
                          >
                            <Type role="p2">{tab.text}</Type>
                            {tab.values.map((value) => (
                              <Type key={value.script} role="p3" color="muted">
                                P<Symbol script="subscript">{value.script}</Symbol> (<Symbol>{value.unit}</Symbol>): {value.value}
                              </Type>
                            ))}
                          </Tabs.Panel>
                        ))}
                      </Tabs>
                    </View>
                  )
                }
                selectionLabel={row.model}
              >
                <Table.Cell aui={{ scale: 'sm', sx: { width: columnWidths[0], whiteSpace: 'nowrap', textAlign: 'left' } }}>
                  <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '12', minWidth: '0', textAlign: 'left', justifyContent: 'flex-start' } }}>
                    {rowIndex === 0 ? (
                      children
                    ) : (
                      <Button
                        aria-label={`Why Not for ${row.model}`}
                        aria-expanded={open}
                        aui={{ scale: 'sm', profile: 'square-compact', color: row.passed ? 'surface' : 'error', paint: 'text', sx: { minWidth: '24', minHeight: '24' } }}
                      >
                        <Button.Icon name="angle-right" weight="solid" aui={{ scale: 'sm' }} />
                      </Button>
                    )}
                    {row.passed ? (
                      <Table.SelectionToggle aui={selectionAppearance} />
                    ) : (
                      <Radio disabled selected={false} tabIndex={-1} aria-label={row.model} aui={selectionAppearance} />
                    )}
                    <ContainedImage src={connectorThumbnail} alt="" fit="contain" style={{ inlineSize: 32, blockSize: 32, flex: 'none' }} />
                    <span title={row.model} style={{ flex: '1 1 auto', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.model}</span>
                  </View>
                </Table.Cell>
                <Table.Cell aui={{ scale: 'sm', sx: { width: columnWidths[1], whiteSpace: 'nowrap', textAlign: 'center' } }}>
                  <Chip aui={{ scale: 'sm', color: row.passed ? 'success' : 'error', paint: 'tonal' }}>
                    <Chip.Icon name={row.passed ? 'circle-check' : 'circle-xmark'} aui={{ scale: 'sm' }} />
                    {row.passed ? 'Passed' : 'Failed'}
                  </Chip>
                </Table.Cell>
                {row.cells.map((value, cellIndex) => (
                  <Table.Cell key={cellIndex} aui={{ scale: 'sm', sx: { width: columnWidths[cellIndex + 2], whiteSpace: 'nowrap', textAlign: 'center' } }}>{value}</Table.Cell>
                ))}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </View>
  );
}
