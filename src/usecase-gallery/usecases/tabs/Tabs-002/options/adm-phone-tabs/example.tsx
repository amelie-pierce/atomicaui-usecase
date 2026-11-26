import { Tabs, View } from '../../../../../kit';

export default function Example() {
  return (
    <Tabs defaultValue="input" aui={{ profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 390px)' }}>
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', flex: 'none', width: 'fill', overflowX: 'auto', overflowY: 'hidden' } }}>
        <Tabs.List overflow="shrink" aui={{ sx: { gap: '0', flex: 'none' } }}>
          <Tabs.Tab value="input" aui={{ sx: { whiteSpace: 'nowrap' } }}><span>Input</span></Tabs.Tab>
          <Tabs.Tab value="output" aui={{ sx: { whiteSpace: 'nowrap' } }}><span>Output</span></Tabs.Tab>
          <Tabs.AddButton name="rotate-right" aria-label="Reset" />
        </Tabs.List>
      </View>
      <Tabs.Panel value="input">Input content</Tabs.Panel>
      <Tabs.Panel value="output">Output content</Tabs.Panel>
    </Tabs>
  );
}
