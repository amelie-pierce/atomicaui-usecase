import { Accordion, Type } from '../../../kit';

export default function Example() {
  return (
    <Accordion openMultiple defaultValue={['default', 'mine']}>
      <Accordion.Item value="default">
        <Accordion.Header>
          <Accordion.Trigger>
            <Type as="span" role="l4" weight="semi-bold">Default Templates</Type>
            <Accordion.Chevron />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <Type as="p" role="p3">Two-beam connection</Type>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="mine">
        <Accordion.Header>
          <Accordion.Trigger>
            <Type as="span" role="l4" weight="semi-bold">My Templates</Type>
            <Accordion.Chevron />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <Type as="p" role="p3">Create your own template.</Type>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
