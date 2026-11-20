import type { ContextProps } from '../../../../types';
import { Chip, Type, View } from '../../../../kit';

// HcsAboutDialog release notes (src/components/HcsAboutDialog.tsx): each change is a row, a 160px start column holding the solid Chip (success for a feature, warning for an improvement) next to the p3 text, with an outlined bottom border between rows. One row and one more Chip colour are shown.
export default function HcsReleaseNoteScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 28))' }}>
      <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', paddingBlockStart: '8', paddingBlockEnd: '8', borderColor: 'outlined', borderBlockEndWidth: '1' } }}>
        <View aui={{ scale: 'sm', paint: 'text', sx: { width: '160', flex: 'none' } }}>
          {children}
        </View>
        <Type as="p" role="p3" aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0' } }}>
          Added the Download Duration help.
        </Type>
      </View>
      <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', paddingBlockStart: '8', paddingBlockEnd: '8' } }}>
        <View aui={{ scale: 'sm', paint: 'text', sx: { width: '160', flex: 'none' } }}>
          <Chip aui={{ scale: 'sm', color: 'warning', paint: 'solid' }}>
            <Chip.Label>IMPROVEMENT</Chip.Label>
          </Chip>
        </View>
        <Type as="p" role="p3" aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0' } }}>
          Faster results table.
        </Type>
      </View>
    </View>
  );
}
