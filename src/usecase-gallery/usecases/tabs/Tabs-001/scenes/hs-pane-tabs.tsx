import type { ContextProps } from '../../../../types';
import { Tabs, View } from '../../../../kit';

// HS, PBS, FD, RWS and ADM Output pane (HS OutputTabs.tsx, PBS ResultsSection.tsx, FD Results.jsx, RWS output.tsx, ADM Workbench.tsx): the tab list takes the title spot of the 28px tabbed header,
// chips with the TAB_IN_PANE_AUI props of the panel standard (ADM's pane-standard.ts; HS writes no aui and computes the same fill). The tab list is the only header item; the action group
// that follows it (Print, Back to top), the body panels, the disabled Job List / Calculation Result tab and PBS's wrap rule are left out.
const TAB_AUI = { color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'overlay', paint: 'solid' } } } as const;

export default function HsPaneTabsScene(_props: ContextProps) {
  return (
    <View
      as="section"
      aria-label="Output"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 480px)' }}
    >
      <Tabs defaultValue="summary" aui={{ profile: 'no-padding' }}>
        <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', minHeight: '28', flex: 'none', paddingBlockStart: '0', paddingBlockEnd: '0' } }}>
          <Tabs.List>
            <Tabs.Tab value="summary" aui={TAB_AUI}>Summary</Tabs.Tab>
            <Tabs.Tab value="result" aui={TAB_AUI}>Result</Tabs.Tab>
          </Tabs.List>
        </View>
      </Tabs>
    </View>
  );
}
