import { Accordion, Chip, Type, View } from '../../../kit';

export default function Example() {
  return (
    <Accordion aui={{ scale: 'sm' }} openMultiple defaultValue={['global']}>
      <Accordion.Item value="global">
        <Accordion.Header>
          <Accordion.Trigger>
            <span data-ug-part="section-label">
              <Type as="span" role="l3" weight="semi-bold">Global changes</Type>{' '}
              <Type as="span" role="l5" color="muted">(1 update)</Type>
            </span>
            <Accordion.Chevron />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', alignItems: 'start', gap: '12', paddingBlockStart: '8', paddingBlockEnd: '8' } }}>
            <View aui={{ scale: 'sm', paint: 'text', sx: { width: '160', flex: 'none' } }}>
              <Chip aui={{ scale: 'sm', color: 'warning', paint: 'solid' }}>
                <Chip.Label>IMPROVEMENT</Chip.Label>
              </Chip>
            </View>
            <Type as="p" role="p3" aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0' } }}>
              Resize the Input, 3D Viewer, and Output panels to suit your workspace.
            </Type>
          </View>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
