import type { ContextProps } from '../../../../../types';
import { Tabs, View } from '../../../../../kit';

// HCS product result card (src/components/F01Results.tsx:114-138): under the model name, one Tabs.Tab per check, led by a Tabs.Icon that is a green check for a passed check and a red xmark for a failed one (scale "sm" throughout, 12px between the list and the panel).
// The scene keeps one passed and one failed tab; the card's title, the extra checks and the panels are left out.
export default function HcsCheckTabsScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <Tabs defaultValue="connection" aui={{ scale: 'sm', sx: { gap: '12' } }}>
        <Tabs.List aui={{ scale: 'sm' }}>
          <Tabs.Tab value="connection" aui={{ scale: 'sm' }}>
            <Tabs.Icon name="check" aui={{ scale: 'sm', color: 'success' }} />
            Connection
          </Tabs.Tab>
          <Tabs.Tab value="weld" aui={{ scale: 'sm' }}>
            <Tabs.Icon name="xmark" aui={{ scale: 'sm', color: 'error' }} />
            Weld
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </View>
  );
}
