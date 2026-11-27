import { Accordion, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', overflow: 'hidden', gap: '0' } }}>
      <Accordion openMultiple defaultValue={['Connection Type']} aui={{ scale: 'sm' }}>
        <View aui={{ paint: 'text', profile: 'no-padding', sx: { width: 'fill' } }} style={{ display: 'flex', flexDirection: 'column', rowGap: 6 }}>
        <Accordion.Item value="Connection Type" aui={{ color: 'surface', scale: 'sm', shape: 'soft', sx: { overflow: 'hidden', radiusStartStart: 'soft', radiusStartEnd: 'soft', radiusEndStart: 'soft', radiusEndEnd: 'soft' } }}>
          <Accordion.Header>
            <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
              <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Connection Type</Type>
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel aui={{ profile: 'default' }}>
            <Type as="p" role="p3">Section fields</Type>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="Load Properties" aui={{ color: 'surface', scale: 'sm', shape: 'soft', sx: { overflow: 'hidden', radiusStartStart: 'soft', radiusStartEnd: 'soft', radiusEndStart: 'soft', radiusEndEnd: 'soft' } }}>
          <Accordion.Header>
            <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
              <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Load Properties</Type>
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
        </Accordion.Item>
        </View>
      </Accordion>
    </View>
  );
}
