import type { ContextProps } from '../../../../../types';
import { Checkbox, Field, Type, View } from '../../../../../kit';

// FD viewer (src/components/Viewer.jsx, ControlRow): the same Field rows as ADM under an "Object visibility" title (Type l5 semi-bold, 12px), column gap 4 and Field gap 6, but the Checkbox is `scale "sm"` with the solid check (Checkbox.Icon name "check"). The scene leaves out the Reset view and the radios.
export default function FdVisibilityScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '4' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Type role="l5" weight="semi-bold">
        Object visibility
      </Type>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6', width: 'fill' } }}>
        <Checkbox aria-label="Base plate" defaultSelected aui={{
          scale: 'sm',
          states: {
            unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
            selected: { color: 'primary', paint: 'solid' },
          },
        }}>
          <Checkbox.Icon name="check" />
        </Checkbox>
        <Field.Label>Base plate</Field.Label>
      </Field>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6', width: 'fill' } }}>
        <Checkbox aria-label="Fasteners" aui={{
          scale: 'sm',
          states: {
            unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
            selected: { color: 'primary', paint: 'solid' },
          },
        }}>
          <Checkbox.Icon name="check" />
        </Checkbox>
        <Field.Label>Fasteners</Field.Label>
      </Field>
    </View>
  );
}
