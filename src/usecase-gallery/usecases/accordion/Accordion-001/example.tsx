import { Accordion, Type, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', overflow: 'hidden', gap: '0' } }}>
      <Accordion openMultiple defaultValue={['Connection Type']} aui={{ scale: 'sm' }}>
        <Accordion.Item value="Connection Type" aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>
          <Accordion.Header>
            <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
              <Accordion.Icon name="link" weight="regular" aria-hidden />
              <Type as="span" role="l4" weight="semi-bold">Connection Type</Type>
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel aui={{ profile: 'default' }}>
            <Type as="p" role="p3">Section fields</Type>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="Load Properties" aui={{ color: 'surface', scale: 'sm', shape: 'none', sx: { borderColor: 'outlined', borderStyle: 'solid', borderBlockStartWidth: '1' } }}>
          <Accordion.Header>
            <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
              <Accordion.Icon name="arrow-down" weight="regular" aria-hidden />
              <Type as="span" role="l4" weight="semi-bold">Load Properties</Type>
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
        </Accordion.Item>
      </Accordion>
    </View>
  );
}
