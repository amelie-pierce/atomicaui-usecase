import { Tabs, View } from '../../../../../kit';

export default function Example() {
  return (
    <Tabs defaultValue="input" aui={{ profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 390px)' }}>
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flex: 'fill', minWidth: '0', overflowX: 'auto', overflowY: 'hidden' } }}>
        <Tabs.List aui={{ sx: { flex: 'none' } }}>
          <Tabs.Tab value="input" aui={{ sx: { whiteSpace: 'nowrap' } }}>Input</Tabs.Tab>
          <Tabs.Tab value="output" aui={{ sx: { whiteSpace: 'nowrap' } }}>Output</Tabs.Tab>
        </Tabs.List>
      </View>
      <Tabs.Panel value="input">Input content</Tabs.Panel>
      <Tabs.Panel value="output">Output content</Tabs.Panel>
    </Tabs>
  );
}
