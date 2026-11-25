import type { ContextProps } from '../../../../../types';
import { Type, View } from '../../../../../kit';

// Print Output enabled, as the HCS Output pane composes it, cut to the header: pane frame, wrapping header (title, then the action group
// pushed to the end by the app's `.hcs-output-actions` margin, here an inline one). The toolbar, table and notes are left out.

export default function EnabledScene({ children }: ContextProps) {
  return (
    <View
      as="section"
      data-ug-part="output-pane"
      aria-label="Output"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 720px)' }}
    >
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', minHeight: '28', flex: 'none', paddingBlockStart: '0', paddingBlockEnd: '0' } }}>
        <Type data-ug-part="output-title" as="h2" role="l3" weight="semi-bold" aui={{ sx: { display: 'flex', alignItems: 'center', minHeight: '28' } }}>Output</Type>
        <View data-ug-part="header-actions" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', justifyContent: 'end', flexWrap: 'wrap', gap: '6', minHeight: '28' } }} style={{ marginInlineStart: 'auto' }}>
          {children}
        </View>
      </View>
    </View>
  );
}
