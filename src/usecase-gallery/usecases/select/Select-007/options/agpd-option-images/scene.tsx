import type { ContextProps } from '../../../../../types';
import { ContainedIcon, Field, View } from '../../../../../kit';

// The plate select of AGPD (src/agpd/controls.tsx, the o.image branch of Choice): the same picture rows as RWS, but the chosen row ends with a check icon in its indicator. The app shows a small picture on touch
// and the tile on desktop hover, the scene shows the tile. Built open and non-modal (container={host}, positioner ug-anchored). Left out: the help trigger and lock beside the label, the light-theme island around the picture and the other fields of the pane.
export default function AgpdOptionImagesScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm' }}>
        <Field.Label aui={{ scale: 'sm' }}>Base plate</Field.Label>
        <Field.Select open
          defaultValue="plate-a"
          items={[
            { label: 'Plate A', value: 'plate-a' },
            { label: 'Plate B', value: 'plate-b' },
            { label: 'Plate C', value: 'plate-c' },
          ]}
        >
          <Field.SelectTrigger aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { width: 'fill' } }}>
            <Field.SelectValue />
            <Field.SelectChevron />
          </Field.SelectTrigger>
          <Field.SelectPortal container={host}>
            <Field.SelectPositioner side="bottom" sideOffset={4} className="ug-anchored">
              <Field.SelectPopup matchTriggerWidth>
                <Field.SelectList>
                  <Field.SelectItem value="plate-a">
                    <View as="span" aui={{ color: 'primary', paint: 'tonal', shape: 'soft', sx: { paddingBlockStart: '4', paddingBlockEnd: '4', paddingInlineStart: '4', paddingInlineEnd: '4' } }}>
                    <ContainedIcon name="image" aria-hidden />
                  </View>
                    <Field.SelectItemText>Plate A</Field.SelectItemText>
                    <Field.SelectItemIndicator>
                      <Field.SelectIcon name="check" aria-hidden />
                    </Field.SelectItemIndicator>
                  </Field.SelectItem>
                  <Field.SelectItem value="plate-b">
                    <View as="span" aui={{ color: 'primary', paint: 'tonal', shape: 'soft', sx: { paddingBlockStart: '4', paddingBlockEnd: '4', paddingInlineStart: '4', paddingInlineEnd: '4' } }}>
                    <ContainedIcon name="image" aria-hidden />
                  </View>
                    <Field.SelectItemText>Plate B</Field.SelectItemText>
                    <Field.SelectItemIndicator>
                      <Field.SelectIcon name="check" aria-hidden />
                    </Field.SelectItemIndicator>
                  </Field.SelectItem>
                  <Field.SelectItem value="plate-c">
                    <View as="span" aui={{ color: 'primary', paint: 'tonal', shape: 'soft', sx: { paddingBlockStart: '4', paddingBlockEnd: '4', paddingInlineStart: '4', paddingInlineEnd: '4' } }}>
                    <ContainedIcon name="image" aria-hidden />
                  </View>
                    <Field.SelectItemText>Plate C</Field.SelectItemText>
                    <Field.SelectItemIndicator>
                      <Field.SelectIcon name="check" aria-hidden />
                    </Field.SelectItemIndicator>
                  </Field.SelectItem>
                </Field.SelectList>
              </Field.SelectPopup>
            </Field.SelectPositioner>
          </Field.SelectPortal>
        </Field.Select>
      </Field>
    </View>
  );
}
