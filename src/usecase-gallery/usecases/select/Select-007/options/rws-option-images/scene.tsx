import type { ContextProps } from '../../../../../types';
import { ContainedIcon, Field, View } from '../../../../../kit';

// The option list with images of RWS (src/rws/inputs.tsx, the option.image branch of SelectField): the label-above 28px outlined field, and rows that lead with the option's picture in a primary tonal soft tile
// before the text. The app draws a picture; the scene draws a kit icon in the same tile, since the gallery uses kit icons only. Built open and non-modal (container={host}, positioner ug-anchored).
// Left out: the help trigger beside the label, the note under the field and the other fields of the pane; the app's closed trigger never shows the picture.
export default function RwsOptionImagesScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Base plate</Field.Label>
        <Field.Select open
          defaultValue="plate-a"
          items={[
            { label: 'Plate A', value: 'plate-a' },
            { label: 'Plate B', value: 'plate-b' },
            { label: 'Plate C', value: 'plate-c' },
          ]}
        >
          <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed' }}>
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
                    <Field.SelectItemIndicator />
                  </Field.SelectItem>
                  <Field.SelectItem value="plate-b">
                    <View as="span" aui={{ color: 'primary', paint: 'tonal', shape: 'soft', sx: { paddingBlockStart: '4', paddingBlockEnd: '4', paddingInlineStart: '4', paddingInlineEnd: '4' } }}>
                    <ContainedIcon name="image" aria-hidden />
                  </View>
                    <Field.SelectItemText>Plate B</Field.SelectItemText>
                    <Field.SelectItemIndicator />
                  </Field.SelectItem>
                  <Field.SelectItem value="plate-c">
                    <View as="span" aui={{ color: 'primary', paint: 'tonal', shape: 'soft', sx: { paddingBlockStart: '4', paddingBlockEnd: '4', paddingInlineStart: '4', paddingInlineEnd: '4' } }}>
                    <ContainedIcon name="image" aria-hidden />
                  </View>
                    <Field.SelectItemText>Plate C</Field.SelectItemText>
                    <Field.SelectItemIndicator />
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
