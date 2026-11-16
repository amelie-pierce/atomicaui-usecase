import type { ContextProps } from '../types';
import { Button, Chip, Radio, RadioGroup, Table, Type, View } from '../kit';

// The Output results table. The expander is the first element of the Model cell (gap 12), before the
// selection radio, a thumbnail and the model name. The rotation of an expanded chevron is local CSS in the
// app; here an inline transform.
export default function TableContext({ children }: ContextProps) {
  return (
    <Table aria-label="Results" aui={{ scale: 'sm', shape: 'soft' }} style={{ inlineSize: 'min(100%, 720px)' }}>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell aui={{ color: 'raised' }}>Model</Table.HeaderCell>
          <Table.HeaderCell aui={{ color: 'raised' }}>Maker</Table.HeaderCell>
          <Table.HeaderCell aui={{ color: 'raised' }}>Capacity</Table.HeaderCell>
          <Table.HeaderCell aui={{ color: 'raised' }}>Status</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '12' } }}>
              {children}
              <RadioGroup aria-label="Selected model" defaultValue="a">
                <Radio value="a" aria-label="Select Model A-100" />
              </RadioGroup>
              <View aui={{ color: 'raised', shape: 'soft', profile: 'no-padding' }} style={{ inlineSize: 32, blockSize: 32, flex: 'none' }} aria-hidden="true" />
              <Type as="span" role="p3" style={{ whiteSpace: 'nowrap' }}>Model A-100</Type>
            </View>
          </Table.Cell>
          <Table.Cell>Maker One</Table.Cell>
          <Table.Cell>2,450 lb</Table.Cell>
          <Table.Cell><Chip aui={{ scale: 'sm', color: 'success' }}>Pass</Chip></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '12' } }}>
              <Button
                aria-label="Why Not for failing model"
                aria-expanded
                aui={{ scale: 'sm', profile: 'square-compact', color: 'error', paint: 'text', sx: { minWidth: '24', minHeight: '24' } }}
                style={{ transform: 'rotate(90deg)' }}
              >
                <Button.Icon name="angle-right" aui={{ scale: 'sm' }} />
              </Button>
              <RadioGroup aria-label="Selected model" defaultValue="a">
                <Radio value="c" disabled aria-label="Model C-300 failed" />
              </RadioGroup>
              <View aui={{ color: 'raised', shape: 'soft', profile: 'no-padding' }} style={{ inlineSize: 32, blockSize: 32, flex: 'none' }} aria-hidden="true" />
              <Type as="span" role="p3" style={{ whiteSpace: 'nowrap' }}>Model C-300</Type>
            </View>
          </Table.Cell>
          <Table.Cell>Maker Three</Table.Cell>
          <Table.Cell>1,180 lb</Table.Cell>
          <Table.Cell><Chip aui={{ scale: 'sm', color: 'error' }}>Fail</Chip></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell colSpan={4}>
            <Type as="p" role="p3">Why not: bearing length is below the minimum for this beam size.</Type>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
