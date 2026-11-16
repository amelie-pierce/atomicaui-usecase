import type { ContextProps } from '../types';
import { Accordion, Button, Field, Type, View } from '../kit';
import { MockSelectField } from '../mock-data';

// The Beam Properties section of the Input pane: two beam columns side by side. In each, Reset to default sits
// below the Fc-perp number field, left-aligned and as wide as its label (the app does this with a local flex
// column, here alignSelf: start).
export default function FormContext({ children }: ContextProps) {
  return (
    <View
      as="section"
      aria-label="Input"
      aui={{ scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default' }}
      style={{ inlineSize: 'min(100%, 560px)' }}
    >
      <Accordion defaultValue={['beam']} aui={{ scale: 'sm' }}>
        <Accordion.Item value="beam">
          <Accordion.Header>
            <Accordion.Trigger>
              Beam Properties
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'start', gap: '8' } }}>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8', flex: 'fill' } }}>
                <Type as="h3" role="l4" weight="bold">Supporting Beam</Type>
                <MockSelectField label="Species" value="Species A" />
                <MockSelectField label="Specific gravity" value="0.50" disabled />
                <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '4' } }}>
                  <Field aui={{ scale: 'sm' }}>
                    <Field.Label>Fc perp</Field.Label>
                    <Field.NumberField defaultValue={565}>
                      <Field.NumberFieldGroup>
                        <Field.NumberFieldInput />
                        <Field.NumberFieldUnit>psi</Field.NumberFieldUnit>
                      </Field.NumberFieldGroup>
                    </Field.NumberField>
                  </Field>
                  <View aui={{ paint: 'text', profile: 'no-padding', sx: { alignSelf: 'start' } }}>
                    {children}
                  </View>
                </View>
                <MockSelectField label="Width" value="3.5 in" />
              </View>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8', flex: 'fill' } }}>
                <Type as="h3" role="l4" weight="bold">Supported Beam</Type>
                <MockSelectField label="Species" value="Species A" />
                <MockSelectField label="Specific gravity" value="0.50" disabled />
                <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '4' } }}>
                  <Field aui={{ scale: 'sm' }}>
                    <Field.Label>Fc perp</Field.Label>
                    <Field.NumberField defaultValue={565}>
                      <Field.NumberFieldGroup>
                        <Field.NumberFieldInput />
                        <Field.NumberFieldUnit>psi</Field.NumberFieldUnit>
                      </Field.NumberFieldGroup>
                    </Field.NumberField>
                  </Field>
                  <View aui={{ paint: 'text', profile: 'no-padding', sx: { alignSelf: 'start' } }}>
                    <Button aui={{ scale: 'sm', paint: 'solid', color: 'raised', shape: 'soft' }}>
                      <Button.Icon name="arrow-rotate-left" />
                      Reset to default
                    </Button>
                  </View>
                </View>
                <MockSelectField label="Width" value="3.5 in" />
              </View>
            </View>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </View>
  );
}
