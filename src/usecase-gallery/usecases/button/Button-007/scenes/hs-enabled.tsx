import type { ContextProps } from '../../../../types';
import { Button, Tabs, View } from '../../../../kit';

// HS and FD Output header (HS OutputTabs.tsx, FD Results.jsx): the 28px tabbed header of the panel standard, tab list first, then the action group, which grows
// and right-aligns itself. Print Output is a secondary solid soft sm Button with the print icon. Enabled.
// Configure columns, the scroll helpers, Fullscreen, the toolbar and the table are left out.

const TAB_AUI = { color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'overlay', paint: 'solid' } } } as const;

export default function HsEnabledScene(_props: ContextProps) {
  return (
    <View
      as="section"
      aria-label="Output"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 720px)' }}
    >
      <Tabs defaultValue="output" aui={{ profile: 'no-padding' }}>
        <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', minHeight: '28', flex: 'none', paddingBlockStart: '0', paddingBlockEnd: '0' } }}>
          <Tabs.List>
            <Tabs.Tab value="output" aui={TAB_AUI}>Output</Tabs.Tab>
            <Tabs.Tab value="jobs" aui={TAB_AUI}>Job List</Tabs.Tab>
          </Tabs.List>
          <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', justifyContent: 'end', flexWrap: 'wrap', gap: '6', flex: 'auto' } }}>
            <Button aui={{ color: 'secondary', paint: 'solid', scale: 'sm', shape: 'soft' }}>
              <Button.Icon name="print" aui={{ scale: 'sm' }} />
              Print Output
            </Button>
          </View>
        </View>
      </Tabs>
    </View>
  );
}
