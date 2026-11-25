import type { ContextProps } from '../../../../../types';
import { Button, Table, View } from '../../../../../kit';

// F01Results cut to the Model column, with mock model names (FD's Results.jsx shows the same chevron through Table.ExpandTrigger, without the error colour): a header and two rows, one passed (the expander is the example) and one failed (the expander in the
// error color). Each row composes its own Model cell: expander, model name. The chevron turns 90 degrees on the icon only (`.ug-results`,
// as `.hcs-why-not-toggle` in the app); the scene is static, so nothing responds to clicks.
export default function ResultsScene({ children }: ContextProps) {
  return (
    <View className="ug-results" aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Connector calculation results" aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }}>Model</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {[
            { model: 'Model A-100', passed: true },
            { model: 'Model C-300', passed: false },
          ].map((row, rowIndex) => (
            <Table.Row key={row.model}>
              <Table.Cell>
                <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '12', minWidth: '0' } }}>
                  {rowIndex === 0 ? (
                    children
                  ) : (
                    <Button
                      aria-label={`Why Not for ${row.model}`}
                      aria-expanded={false}
                      aui={{ scale: 'sm', profile: 'square-compact', color: 'error', paint: 'text', sx: { minWidth: '24', minHeight: '24' } }}
                    >
                      <Button.Icon name="angle-right" weight="solid" aui={{ scale: 'sm' }} />
                    </Button>
                  )}
                  {row.model}
                </View>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </View>
  );
}
