import type { ContextProps } from '../../../../types';
import { Checkbox, Field, Type, View } from '../../../../kit';

// ADM viewer chrome (src/features/viewer/components/ViewerChrome.tsx): a compact column (gap 4, aligned to the start) with an "Object visibility" title in Type l5 semi-bold (12px). Each row is a Field (scale "sm", gap 6) holding an icon-only Checkbox (aria-label, duotone mark) and a Field.Label after it. Left out: the Reset view icon button with its tooltip, the Flat view row and the other members.
export default function AdmVisibilityScene(_props: ContextProps) {
  const selection = {
    states: {
      unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } },
      selected: { paint: 'solid', color: 'primary' },
    },
  } as const;
  const row = { scale: 'sm', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6', width: 'fill' } } as const;
  return (
    <View aui={{ paint: 'text', elevation: 0, profile: 'compact', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '4' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Type role="l5" weight="semi-bold">
        Object visibility
      </Type>
      <Field aui={row}>
        <Checkbox aria-label="Base plate" defaultSelected aui={selection}>
          <Checkbox.Icon name="check" layer="duotone" />
        </Checkbox>
        <Field.Label>Base plate</Field.Label>
      </Field>
      <Field aui={row}>
        <Checkbox aria-label="Anchors" defaultSelected aui={selection}>
          <Checkbox.Icon name="check" layer="duotone" />
        </Checkbox>
        <Field.Label>Anchors</Field.Label>
      </Field>
    </View>
  );
}
