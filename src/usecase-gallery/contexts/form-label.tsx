import type { ContextProps } from '../types';
import { Accordion, Field, Select, Type, View } from '../kit';
import { MockChoice, MockInputGalvanized, MockInputHeader, MockInputSection, MockNumberField } from '../mock-data';

// The Load Properties section of the Input pane (App.tsx lines 1131-1170): a two-column grid of Download (ASD), Download Duration, Lateral Load
// and the locked Lateral Load Duration. The Download Duration label row (HcsSelectbox `labelAccessory`) is a flex row: the label, then the help
// trigger inline after it, above the select. The open help popover is Button-003. The other sections are collapsed.
export default function FormLabelContext({ children }: ContextProps) {
  return (
    <View
      as="aside"
      aria-label="Input"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', gap: '0' } }}
      style={{ inlineSize: 'min(100%, 420px)' }}
    >
      <MockInputHeader />
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flex: 'fill', width: 'fill', minHeight: '0' } }}>
        <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', overflow: 'hidden', gap: '0' } }}>
          <Accordion openMultiple defaultValue={['Load Properties']} aui={{ scale: 'sm' }}>
            <MockInputSection name="Connection Type" />
            <Accordion.Item value="Load Properties" aui={{ color: 'surface', scale: 'sm', shape: 'none', sx: { borderColor: 'outlined', borderStyle: 'solid', borderBlockStartWidth: '1' } }}>
              <Accordion.Header>
                <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                  <Accordion.Icon name="arrow-down" weight="regular" aria-hidden />
                  <Type role="l4" weight="semi-bold">Load Properties</Type>
                  <Accordion.Chevron />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel aui={{ profile: 'default' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--p-px-8)' }}>
                  <MockNumberField label="Download (ASD)" value="2,000" unit="lb" />
                  <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
                    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text', sx: { display: 'flex', alignItems: 'center' } }}>
                      <Field.Label aui={{ scale: 'sm' }}>Download Duration</Field.Label>
                      {children}
                    </View>
                    <Select
                      aui={{ scale: 'sm' }}
                      defaultValue="Snow (115)"
                      items={['Dead (90)', 'Floor (100)', 'Snow (115)', 'Roof (125)', 'Quake/Wind (160)'].map((option) => ({ label: option, value: option }))}
                    >
                      <Select.Trigger aria-label="Download Duration" aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { minHeight: '28', height: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20' } }} style={{ inlineSize: '100%', minInlineSize: 0 }}>
                        <Select.Value />
                        <Select.Chevron aui={{ scale: 'sm' }} />
                      </Select.Trigger>
                    </Select>
                  </Field>
                  <MockNumberField label="Lateral Load (Tension) (ASD)" value="500" unit="lb" />
                  <MockChoice label="Lateral Load Duration" value="Quake/Wind (160)" options={['Quake/Wind (160)']} disabled />
                </div>
              </Accordion.Panel>
            </Accordion.Item>
            <MockInputSection name="Beam Properties" divider />
            <MockInputGalvanized />
          </Accordion>
        </View>
      </View>
    </View>
  );
}
