import type { ContextProps } from '../../../../types';
import { Checkbox, Field, View } from '../../../../kit';

// ADM joint distance fields (src/features/design-inputs/components/GeometrySection/JointDistanceFields.tsx): the Checkbox is a bare control of a Field row, so Field.Label comes first and the box last, the row right-aligned with an 8px gap (Checkbox.Label cannot put the label first). The box carries an aria-label and the duotone mark. Left out: the joint distance number field above the row.
export default function AdmLabelFirstScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'end', width: 'fill', gap: '8' } }}>
        <Field.Label>Center to joint</Field.Label>
        <Checkbox
          aria-label="Center to joint"
          defaultSelected
          aui={{
            states: {
              unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } },
              selected: { paint: 'solid', color: 'primary' },
            },
          }}
        >
          <Checkbox.Icon name="check" layer="duotone" />
        </Checkbox>
      </Field>
    </View>
  );
}
