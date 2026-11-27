import { Accordion, Icon, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <Accordion defaultValue={['initial']}>
      <Accordion.Item value="initial" aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>
        <Accordion.Header>
          <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
            <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">1.0 Released on Jan 01, 2027 (TBD)</Type>
            <Accordion.Chevron />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel aui={{ profile: 'default' }}>
          <View aui={{ paint: 'text', profile: 'no-padding', scale: 'sm', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '8' } }}>
            <View aui={{ color: 'warning', paint: 'solid', shape: 'soft', scale: 'sm', profile: 'default', sx: { display: 'flex', alignItems: 'center', gap: '4' } }}>
              <Icon name="wand-magic-sparkles" aria-hidden="true" style={{ color: 'inherit' }} />
              <Type role="l4">Initial</Type>
            </View>
            <Type role="l4">Initial release of the application</Type>
          </View>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
