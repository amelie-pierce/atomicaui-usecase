import { Tabs } from '../../../kit';

export default function Example() {
  return (
    <Tabs defaultValue="summary" aui={{ profile: 'no-padding' }}>
      <Tabs.List>
        <Tabs.Tab value="summary" aui={{ color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'overlay', paint: 'solid' } } }}>
          Summary
        </Tabs.Tab>
        <Tabs.Tab value="result" aui={{ color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'overlay', paint: 'solid' } } }}>
          Result
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="summary">Summary content</Tabs.Panel>
      <Tabs.Panel value="result">Result content</Tabs.Panel>
    </Tabs>
  );
}
