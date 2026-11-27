import { Accordion, Chip, Type, View } from '../../../../../kit';

function Trigger({ label, count }: { label: string; count: string }) {
  return (
    <Accordion.Header>
      <Accordion.Trigger>
        <span data-ug-part="section-label">
          <Type as="span" role="l3" weight="semi-bold">{label}</Type>{' '}
          <Type as="span" role="l5" color="muted">({count})</Type>
        </span>
        <Accordion.Chevron />
      </Accordion.Trigger>
    </Accordion.Header>
  );
}

export default function Example() {
  return (
    <Accordion aui={{ scale: 'sm' }} openMultiple defaultValue={['other']}>
      <Accordion.Item value="other">
        <Trigger label="Updates for other regions" count="1 update" />
        <Accordion.Panel>
          <Accordion aui={{ scale: 'sm' }} openMultiple defaultValue={['eu']}>
            <Accordion.Item value="eu">
              <Trigger label="Europe" count="1 update" />
              <Accordion.Panel>
                <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', alignItems: 'start', gap: '12', paddingBlockStart: '8', paddingBlockEnd: '8' } }}>
                  <View aui={{ scale: 'sm', paint: 'text', sx: { width: '160', flex: 'none' } }}>
                    <Chip aui={{ scale: 'sm', color: 'success', paint: 'solid' }}>
                      <Chip.Label>FEATURE</Chip.Label>
                    </Chip>
                  </View>
                  <Type as="p" role="p3" aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0' } }}>
                    Design to Eurocode 2.
                  </Type>
                </View>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
