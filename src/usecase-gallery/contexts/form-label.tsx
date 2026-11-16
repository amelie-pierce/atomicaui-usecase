import type { ContextProps } from '../types';
import { Accordion, Field, View } from '../kit';
import { MockSelectField } from '../mock-data';

// A field label row: the label text, then the help trigger inline after it, above the select.
export default function FormLabelContext({ children }: ContextProps) {
  return (
    <View
      as="section"
      aria-label="Input"
      aui={{ scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default' }}
      style={{ inlineSize: 'min(100%, 420px)' }}
    >
      <Accordion defaultValue={['load']} aui={{ scale: 'sm' }}>
        <Accordion.Item value="load">
          <Accordion.Header>
            <Accordion.Trigger>
              Load Properties
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }}>
              <MockSelectField label="Load type" value="Uniform" />
              <Field aui={{ scale: 'sm' }}>
                <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center' } }}>
                  <Field.Label>Download Duration</Field.Label>
                  {children}
                </View>
                <Field.Select defaultValue="Normal" items={[{ value: 'Normal', label: 'Normal' }]}>
                  <Field.SelectTrigger />
                </Field.Select>
              </Field>
            </View>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </View>
  );
}
