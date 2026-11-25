import type { ContextProps } from '../../../../../types';
import { Tabs, View } from '../../../../../kit';

// ADM and ACE phone workspace (ADM MobileWorkbench.tsx:88-116, ACE EstimatorPage.tsx:688-710 with ResetInputsAction.tsx): the same shrinking row as Tabs-001's phone workspace with a Tabs.AddButton at the end of the List,
// the rotate-right glyph labelled Reset, which the app opens a confirmation from. Each label is a span so the shrink overflow can ellipsize it. The row sits in a View that scrolls sideways (the apps hide its scrollbar with one class).
// Width: fill (the row spans the phone column and shrinks its tabs). ADM sets the List gap to "0", ACE leaves the 6px default (an app-side deviation); the scene is ADM's. The panels, the Reset dialog and the app headers are left out. The phone column is 390px wide.
export default function AdmPhoneTabsScene(_props: ContextProps) {
  return (
    <Tabs defaultValue="input" aui={{ profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 390px)' }}>
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', flex: 'none', width: 'fill', overflowX: 'auto', overflowY: 'hidden' } }}>
        <Tabs.List overflow="shrink" aui={{ sx: { gap: '0', flex: 'none' } }}>
          <Tabs.Tab value="input" aui={{ sx: { whiteSpace: 'nowrap' } }}><span>Input</span></Tabs.Tab>
          <Tabs.Tab value="output" aui={{ sx: { whiteSpace: 'nowrap' } }}><span>Output</span></Tabs.Tab>
          <Tabs.AddButton name="rotate-right" aria-label="Reset" />
        </Tabs.List>
      </View>
    </Tabs>
  );
}
