import type { ContextProps } from '../../../../../types';
import { Tabs, View } from '../../../../../kit';

// ADC model viewer column (src/adc/Workspace.tsx:1351-1403): the tab strip sits outside a bordered pane, so the chips use CHIP_AUI of src/adc/ui.ts (the selected tab is a raised tonal chip with a 1px border).
// The strip wraps (Tabs.List flexWrap) so the Save action drops to a right-aligned second row when narrow; Save, the panels and the second tab's content are left out.
const CHIP_AUI = { color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'raised', paint: 'tonal' } } } as const;

export default function AdcPaneTabsScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Tabs defaultValue="model" aui={{ sx: { display: 'flex', flexDirection: 'column' } }}>
        <Tabs.List aui={{ sx: { flexWrap: 'wrap' } }}>
          <Tabs.Tab value="model" aui={CHIP_AUI}>Model</Tabs.Tab>
          <Tabs.Tab value="info" aui={CHIP_AUI}>Information</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </View>
  );
}
