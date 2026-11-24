import type { ContextProps } from '../../../../../types';
import { Field, Symbol, Table, View } from '../../../../../kit';

// ADM Anchor Spacing table (AnchorSpacingTable.tsx 20-150): a fixed-layout table in a soft frame with an index column pinned at 32 and two numeric cells that
// each hold a number field with a trailing unit. One row; the app disables cells beyond the pattern count and renders one row per anchor.
export default function AdmCellInputScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
    <Table aria-label="Anchor spacing" scroll="self" aui={{ scale: 'sm', shape: 'soft', sx: { width: 'fill' } }}>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell aui={{ sx: { width: '32' } }}>#</Table.HeaderCell>
          <Table.HeaderCell>Column Spacing</Table.HeaderCell>
          <Table.HeaderCell>Row Spacing</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell aui={{ sx: { width: '32' } }}>1</Table.Cell>
          <Table.Cell>
            <Field.NumberField aria-label="X Spacing 1" defaultValue={6} min={1} aui={{ sx: { width: 'fill', minWidth: '0' } }}>
              <Field.NumberFieldGroup aui={{ color: 'surface', paint: 'fixed' }}>
                <Field.NumberFieldInput aui={{ sx: { minWidth: '0', textAlign: 'end' } }} />
                <Field.NumberFieldUnit>
                  <Symbol>in</Symbol>
                </Field.NumberFieldUnit>
              </Field.NumberFieldGroup>
            </Field.NumberField>
          </Table.Cell>
          <Table.Cell>
            <Field.NumberField aria-label="Y Spacing 1" defaultValue={8} min={1} aui={{ sx: { width: 'fill', minWidth: '0' } }}>
              <Field.NumberFieldGroup aui={{ color: 'surface', paint: 'fixed' }}>
                <Field.NumberFieldInput aui={{ sx: { minWidth: '0', textAlign: 'end' } }} />
                <Field.NumberFieldUnit>
                  <Symbol>in</Symbol>
                </Field.NumberFieldUnit>
              </Field.NumberFieldGroup>
            </Field.NumberField>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    </View>
  );
}
