import type { ContextProps } from '../types';
import { Accordion, Symbol, Type, View } from '../kit';
import { MockChoice, MockInputGalvanized, MockInputHeader, MockInputSection, MockNumberField } from '../mock-data';

// The Beam Properties section of the Input pane (App.tsx lines 1131-1320): two beam columns in a two-column grid, each with the beam type
// and species selects, the locked SG field, the Fc perp number field with Reset to default below it (left-aligned, as wide as its label: the app's
// `.hcs-material-strength > button` rule, here an alignSelf start wrapper), then Width and Depth. Reset to default is in both columns. The other sections are
// collapsed so this one is in view.
export default function FormContext({ children }: ContextProps) {
  return (
    <View
      as="aside"
      aria-label="Input"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', gap: '0' } }}
      style={{ inlineSize: 'min(100%, 560px)' }}
    >
      <MockInputHeader />
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flex: 'fill', width: 'fill', minHeight: '0' } }}>
        <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', overflow: 'hidden', gap: '0' } }}>
          <Accordion openMultiple defaultValue={['Beam Properties']} aui={{ scale: 'sm' }}>
            <MockInputSection name="Connection Type" />
            <MockInputSection name="Load Properties" divider />
            <Accordion.Item value="Beam Properties" aui={{ color: 'surface', scale: 'sm', shape: 'none', sx: { borderColor: 'outlined', borderStyle: 'solid', borderBlockStartWidth: '1' } }}>
              <Accordion.Header>
                <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                  <Accordion.Icon name="layer-group" weight="regular" aria-hidden />
                  <Type role="l4" weight="semi-bold">Beam Properties</Type>
                  <Accordion.Chevron />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel aui={{ profile: 'default' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--p-px-8)' }}>
                  {['Supporting', 'Supported'].map((beam) => (
                    <View key={beam} aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8', minWidth: '0' } }}>
                      <Type as="h3" weight="semi-bold" aui={{ sx: { fontSize: '14', margin: '0' } }}>{beam} Beam</Type>
                      <MockChoice label={`${beam} Beam Type`} value="Glulam" options={['Glulam', 'Solid Sawn']} />
                      <MockChoice label="Species" value="DF/SP (Douglas fir or Southern Pine)" options={['DF/SP (Douglas fir or Southern Pine)']} />
                      <MockNumberField label="SG" value="0.50" unit="" disabled />
                      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '4', minWidth: '0' } }}>
                        <MockNumberField label={<span><Type as="span">Fc</Type><Symbol script="subscript">perp</Symbol></span>} value="650" unit="psi" />
                        <View aui={{ paint: 'text', profile: 'no-padding', sx: { alignSelf: 'start' } }}>
                          {children}
                        </View>
                      </View>
                      <MockChoice label="Width" value="3 1/2″" options={['3 1/2″']} disabled={beam === 'Supported'} />
                      <MockNumberField label="Depth" value="11.875" unit="in" />
                    </View>
                  ))}
                </div>
              </Accordion.Panel>
            </Accordion.Item>
            <MockInputGalvanized />
          </Accordion>
        </View>
      </View>
    </View>
  );
}
