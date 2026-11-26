import { Tabs, View } from '../../../kit';

export default function Example() {
  return (
    <Tabs defaultValue="input" aui={{ profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 390px)' }}>
      <View.ScrollArea aui={{ paint: 'text', profile: 'no-padding', sx: { flex: 'none' } }}>
        <View.ScrollAreaViewport style={{ overflowY: 'hidden' }}>
          <Tabs.List overflow="shrink" aui={{ sx: { gap: '0', flex: 'none' } }}>
            <Tabs.Tab value="input" aui={{ sx: { whiteSpace: 'nowrap' } }}>Input</Tabs.Tab>
            <Tabs.Tab value="output" aui={{ sx: { whiteSpace: 'nowrap' } }}>Output</Tabs.Tab>
          </Tabs.List>
        </View.ScrollAreaViewport>
      </View.ScrollArea>
      <Tabs.Panel value="input">Input content</Tabs.Panel>
      <Tabs.Panel value="output">Output content</Tabs.Panel>
    </Tabs>
  );
}
