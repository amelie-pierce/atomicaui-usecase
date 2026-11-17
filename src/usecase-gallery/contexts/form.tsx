import type { ContextProps } from '../types';
import { Accordion, Symbol, Type, View } from '../kit';
import { MockNumberField } from '../mock-data';

// The Beam Properties section of the Input pane (App.tsx lines 1131-1320) cut to one beam column and the one field Reset to default
// belongs to: the Fc perp number field with Reset to default below it (left-aligned, as wide as its label: the app's
// `.hcs-material-strength > button` rule, here an alignSelf start wrapper). The app has the button in both beam columns.
export default function FormContext({ children }: ContextProps) {
  return (
    <View
      as="aside"
      aria-label="Input"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', gap: '0' } }}
      style={{ inlineSize: 'min(100%, 280px)' }}
    >
      <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', overflow: 'hidden', gap: '0' } }}>
        <Accordion defaultValue={['Beam Properties']} aui={{ scale: 'sm' }}>
          <Accordion.Item value="Beam Properties" aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>
            <Accordion.Header>
              <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                <Accordion.Icon name="layer-group" weight="regular" aria-hidden />
                <Type role="l4" weight="semi-bold">Beam Properties</Type>
                <Accordion.Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel aui={{ profile: 'default' }}>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '4', minWidth: '0' } }}>
                <MockNumberField label={<span><Type as="span">Fc</Type><Symbol script="subscript">perp</Symbol></span>} value="650" unit="psi" />
                <View aui={{ paint: 'text', profile: 'no-padding', sx: { alignSelf: 'start' } }}>
                  {children}
                </View>
              </View>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </View>
    </View>
  );
}
