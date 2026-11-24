import type { ContextProps } from '../../../../../types';
import { Tabs, View } from '../../../../../kit';

// PFD, HS, AGPD and FD phone workspace (PFD Workspace.tsx:201-221, HS App.tsx:876-919, AGPD App.tsx:555-593, FD App.jsx:954-1012): the tab row sits first in the phone column, edge to edge, in a ScrollArea whose viewport
// scrolls sideways with no scrollbar. Width: fill (the row spans the phone column and shrinks its tabs). The List keeps the built-in shrink overflow and no gap, every tab never wraps. AGPD disables the tabs until the licence is accepted and HS adds a fourth tab; the panels,
// FD's trailing Reset IconButton and the app headers are left out. The phone column is 390px wide.
export default function PfdPhoneTabsScene(_props: ContextProps) {
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
    </Tabs>
  );
}
