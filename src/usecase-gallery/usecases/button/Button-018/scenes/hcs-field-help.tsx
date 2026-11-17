import type { ContextProps } from '../../../../types';
import { Field, Select, View } from '../../../../kit';

// The Load Properties section of the Input pane (App.tsx lines 1131-1170) cut to the one field that carries the trigger: the Download
// Duration label row (HcsSelectbox `labelAccessory`) is a flex row, the label then the help trigger inline after it, above the select.
// The open help popover is Button-003.
export default function HcsFieldHelpScene({ children }: ContextProps) {
  return (
    <View
      as="aside"
      aria-label="Input"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', gap: '0' } }}
      style={{ inlineSize: 'min(100%, 280px)' }}
    >
      <View aui={{ color: 'surface', shape: 'soft', profile: 'default', sx: { display: 'flex', flexDirection: 'column', width: 'fill', gap: '0' } }}>
        <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
          <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text', sx: { display: 'flex', alignItems: 'center' } }}>
            <Field.Label aui={{ scale: 'sm' }}>Download Duration</Field.Label>
            {children}
          </View>
          <Select aui={{ scale: 'sm' }} defaultValue="Snow (115)" items={[{ label: 'Snow (115)', value: 'Snow (115)' }]}>
            <Select.Trigger aria-label="Download Duration" aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { minHeight: '28', height: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20' } }} style={{ inlineSize: '100%', minInlineSize: 0 }}>
              <Select.Value />
              <Select.Chevron aui={{ scale: 'sm' }} />
            </Select.Trigger>
          </Select>
        </Field>
      </View>
    </View>
  );
}
