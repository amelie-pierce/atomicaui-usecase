import { Tabs } from '../../../kit';

export default function Example() {
  return (
    <Tabs defaultValue="input" aui={{ profile: 'no-padding' }}>
      <Tabs.List overflow="shrink" aui={{ sx: { gap: '0', flex: 'none' } }}>
        <Tabs.Tab value="input" aui={{ sx: { whiteSpace: 'nowrap' } }}>
          Input
        </Tabs.Tab>
        <Tabs.Tab value="output" aui={{ sx: { whiteSpace: 'nowrap' } }}>
          Output
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="input">Input content</Tabs.Panel>
      <Tabs.Panel value="output">Output content</Tabs.Panel>
    </Tabs>
  );
}
