import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// ADC ProductsPicker.tsx: the active Hef editor inside its product row. Neighboring values and column headings show why this bare Select has no visible Field label.
export default function AdcTableCellScene({ children }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <div data-ug-part="products-table">
        <Table aria-label="Products" aui={{ scale: 'sm', shape: 'soft', sx: { gap: '0', minHeight: '0' } }} border="all-cells" borderStyle="tonal" scroll="self" bodyFit="content" fit="fill" minInlineSize={384}>
          <Table.Head>
            <Table.Row data-ug-part="column-headings">
              <Table.HeaderCell aui={{ scale: 'sm' }}>Product</Table.HeaderCell>
              <Table.HeaderCell aui={{ scale: 'sm' }}>Hef</Table.HeaderCell>
              <Table.HeaderCell aui={{ scale: 'sm' }}>Weight</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell aui={{ scale: 'sm' }}>Anchor A-120</Table.Cell>
              <Table.Cell aui={{ scale: 'sm' }}>4.500</Table.Cell>
              <Table.Cell aui={{ scale: 'sm' }}>2.4 kg</Table.Cell>
            </Table.Row>
            <Table.Row data-ug-part="active-product-row">
              <Table.Cell aui={{ scale: 'sm' }}>Anchor A-240</Table.Cell>
              <Table.Cell aui={{ scale: 'sm' }}><span data-ug-part="edited-hef-cell">{children}</span></Table.Cell>
              <Table.Cell aui={{ scale: 'sm' }}>3.1 kg</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell aui={{ scale: 'sm' }}>Anchor A-360</Table.Cell>
              <Table.Cell aui={{ scale: 'sm' }}>7.500</Table.Cell>
              <Table.Cell aui={{ scale: 'sm' }}>4.0 kg</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </View>
  );
}
