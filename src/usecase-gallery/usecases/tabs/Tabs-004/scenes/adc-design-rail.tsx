import type { ContextProps } from '../../../../types';
import { Tabs, View } from '../../../../kit';

// ADC design tab rail (src/adc/Workspace.tsx:859-1095): the Tabs.List shrinks (overflow "shrink") and holds one chip per open design, each a Tabs.Tab with a Tabs.CloseButton and, on a design with an error, a Tabs.PinButton
// used as the error dot (a circle-exclamation in the error colour, in a Tooltip in the app), then a Tabs.AddButton for a new design. CHIP_AUI is src/adc/ui.ts. The context menu on each tab is ContextMenu-001 and the hidden-designs
// dropdown before the rail is Dropdown-002. Left out: drag reorder (reorderable, onReorder), double-click rename, the error Tooltip, the disabled states while a report runs and the design panels.
const CHIP_AUI = { color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'raised', paint: 'tonal' } } } as const;

export default function AdcDesignRailScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Tabs defaultValue="d1" aui={{ profile: 'no-padding' }}>
        <Tabs.List overflow="shrink">
          <Tabs.Tab value="d1" nativeButton={false} render={<div />} aui={CHIP_AUI}>
            <span>Design 1</span>
            <Tabs.PinButton name="circle-exclamation" aria-label="The design has an error" aui={{ color: 'error', profile: 'contained' }} />
            <Tabs.CloseButton aria-label="Close Design 1" />
          </Tabs.Tab>
          <Tabs.Tab value="d2" nativeButton={false} render={<div />} aui={CHIP_AUI}>
            <span>Design 2</span>
            <Tabs.CloseButton aria-label="Close Design 2" />
          </Tabs.Tab>
          <Tabs.AddButton name="file-circle-plus" aria-label="Add new design" />
        </Tabs.List>
      </Tabs>
    </View>
  );
}
