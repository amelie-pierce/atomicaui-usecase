import type { ContextProps } from '../../../../types';
import { Checkbox, Type, View } from '../../../../kit';

// ADC connection model viewer (src/adc/components/ConnectionModel.tsx): the viewer controls list the toggles in a column (gap 4) under an "Object Visibility" title (Type l5 bold, 12px, 4px above). The Checkboxes are the smallest in the gallery: scale "xs" with shape "soft" (a 20px box, a 12px mark and a 14px medium label). Left out: the Reset view and Projection radios, the other toggles and the disabled Base Plate toggle (the scene shows it enabled).
export default function AdcVisibilityScene(_props: ContextProps) {
  const selection = {
    scale: 'xs',
    shape: 'soft',
    states: {
      unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } },
      selected: { paint: 'solid', color: 'primary' },
    },
  } as const;
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '4' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Type role="l5" weight="bold" aui={{ sx: { paddingBlockStart: '4' } }}>
        Object Visibility
      </Type>
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '4' } }}>
        <Checkbox defaultSelected aui={selection}>
          <Checkbox.Label>Concrete</Checkbox.Label>
        </Checkbox>
        <Checkbox defaultSelected aui={selection}>
          <Checkbox.Label>Anchors</Checkbox.Label>
        </Checkbox>
      </View>
    </View>
  );
}
