import type { ContextProps } from '../../../../types';
import { Icon, Tabs, View } from '../../../../kit';

// FD row expansion (src/components/RowExpansion.jsx:105-125): one Tabs.Tab per check category, led by a plain Icon, circle-check for a passed category and circle-exclamation for a failed one, with no gap on the List.
// The app colours the failed icon "danger", which is not a colour of the kit and renders in the text colour; the scene uses the standard "error". The scene keeps one passed and one failed tab; the panels are left out.
export default function FdCheckTabsScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <Tabs defaultValue="connection" aui={{ profile: 'no-padding' }}>
        <Tabs.List aui={{ sx: { gap: '0' } }}>
          <Tabs.Tab value="connection">
            <Icon name="circle-check" aui={{ color: 'success' }} />
            Connection
          </Tabs.Tab>
          <Tabs.Tab value="weld">
            <Icon name="circle-exclamation" aui={{ color: 'error' }} />
            Weld
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </View>
  );
}
