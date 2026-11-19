import type { ContextProps } from '../../../../types';
import { Tabs, View } from '../../../../kit';

// PBS phone workspace (src/App.tsx:982-1056): the List has no overflow="shrink", so every tab keeps its natural width and the wrapping View (overflowX auto, scrollbar hidden by a class) scrolls the row sideways;
// the 6px List gap stays. The leading Refresh IconButton, the panels and the app header are left out. The phone column is 390px wide.
export default function PbsPhoneTabsScene(_props: ContextProps) {
  return (
    <Tabs defaultValue="input" aui={{ profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 390px)' }}>
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flex: 'fill', minWidth: '0', overflowX: 'auto', overflowY: 'hidden' } }}>
        <Tabs.List aui={{ sx: { flex: 'none' } }}>
          <Tabs.Tab value="input" aui={{ sx: { whiteSpace: 'nowrap' } }}>Input</Tabs.Tab>
          <Tabs.Tab value="output" aui={{ sx: { whiteSpace: 'nowrap' } }}>Output</Tabs.Tab>
        </Tabs.List>
      </View>
    </Tabs>
  );
}
