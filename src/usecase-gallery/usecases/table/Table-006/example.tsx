import { Field, Symbol, Table } from '../../../kit';

export default function Example() {
  return (
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
  );
}
