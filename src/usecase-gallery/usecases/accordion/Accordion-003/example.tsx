import { Accordion, Type } from '../../../kit';

export default function Example() {
  return (
    <Accordion openMultiple defaultValue={['default', 'mine']}>
      <Accordion.Item value="default">
        <Accordion.Header>
          <Accordion.Trigger>
            Default Templates
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
            My Templates
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
