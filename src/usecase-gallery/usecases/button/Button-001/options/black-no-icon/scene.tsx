import type { ContextProps } from '../../../../../types';
import { Button, Tabs, View } from '../../../../../kit';

// ADM Output header (Workbench.tsx): the same tabbed header, but the action group is pushed to the end by the app's `.adm-header-actions` margin (here an inline one)
// and Print is text only (the label follows the tab: Print Summary or Print Result). Enabled.
// The tab bodies, the toolbar and the table are left out.

const TAB_AUI = { color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'overlay', paint: 'solid' } } } as const;

export default function AdmEnabledScene(_props: ContextProps) {
  return (
    <View
      as="section"
      data-ug-part="output-pane"
      aria-label="Output"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 720px)' }}
    >
      <Tabs defaultValue="summary" aui={{ profile: 'no-padding' }}>
        <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', minHeight: '28', flex: 'none', paddingBlockStart: '0', paddingBlockEnd: '0' } }}>
          <Tabs.List data-ug-part="output-tabs">
            <Tabs.Tab value="summary" aui={TAB_AUI}>Summary</Tabs.Tab>
            <Tabs.Tab value="result" aui={TAB_AUI}>Result</Tabs.Tab>
          </Tabs.List>
          <View data-ug-part="header-actions" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '6', height: '28' } }} style={{ marginInlineStart: 'auto' }}>
            <Button aui={{ color: 'secondary', paint: 'solid', scale: 'sm', shape: 'soft' }}>
              Print Summary
            </Button>
          </View>
        </View>
      </Tabs>
    </View>
  );
}
