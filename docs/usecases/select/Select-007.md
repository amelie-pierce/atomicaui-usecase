# Select-007: Options with images

Component family: **Select**

UI type: **Field select**

Source: `src/usecase-gallery/usecases/select/Select-007/usecase.ts`

## What it is

A field select whose rows lead with a picture of the option in a tonal tile, so the user picks by sight.

## When to choose it

Use it when the options are shapes or parts the user recognises faster by picture than by name. The closed trigger shows the text only. Use the field select (Select-001) when the options have no picture.

## Where it belongs

The input panel of RWS and AGPD where an option has a drawing: the base plate and fastener choices.

## Usage guidance

RWS: a Field at scale "sm" with the label above a Field.Select whose trigger is color "surface", paint "fixed" (28px). Each Field.SelectItem leads with a View (as span) at color "primary", paint "tonal", shape "soft" and 4 padding on every side, which holds the option picture, then Field.SelectItemText and an empty Field.SelectItemIndicator. AGPD: the same field and tile, but the Field.SelectItemIndicator of the chosen row holds a check icon (a 16px icon RWS does not draw). The apps draw a picture, and AGPD swaps it for a small image on touch; the scenes draw a kit icon in the tile and leave out the help trigger, the lock, the note and the other fields.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `ContainedIcon`, `Field`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `primary`, `surface`
- `paint`: `fixed`, `text`, `tonal`
- `shape`: `soft`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Field** — Field at scale "sm" with a 3 gap and a fixed 224px width, so the picture rows have room. Selector: `[class~="aui-field"]`. Layer step: **Field** — Small field stays 224px wide for picture choices.
2. **Label** — The "Base plate" label above the trigger. Selector: `[class~="aui-field-label"]`. Layer step: **Label** — Base plate label sits above the picture-select trigger.
3. **Trigger** — Full-width outlined trigger showing the chosen plate name only; the picture appears in the rows, not in the trigger. Selector: `[class~="aui-select-trigger"]`. Layer step: **Trigger** — Full-width outlined trigger shows the chosen plate name.
4. **Value** — Shows "Plate A", the default base plate. Selector: `[class~="aui-select-value"]`. Direct text is highlighted.
5. **Chevron** — The chevron at the trigger end. Selector: `[class~="aui-select-chevron"]`. Layer step: **Chevron** — End chevron marks the plate trigger as a dropdown.
6. **Popup** — Popup of the trigger width listing Plate A, Plate B and Plate C. Selector: `[class~="aui-select-popup"]`. Layer step: **Popup** — Popup lists Plate A, Plate B, and Plate C.
7. **List** — The list of the three plate rows. Selector: `[class~="aui-select-list"]`. Layer step: **List** — Popup list holds exactly three available plate rows.
8. **Item** — A plate row that leads with a picture tile, then the name and an indicator slot. Selector: `[class~="aui-select-item"]`. Layer step: **Item** — Plate row starts with a picture tile, name, and indicator.
9. **Image tile** — The tonal primary tile with soft corners and 4 padding that frames the option picture. Selector: `[class~="aui-select-item"] > [class~="aui-view"]`. Layer step: **Image tile** — Soft primary tile frames each plate picture with 4px padding.
10. **Image** — The image glyph standing in for the plate drawing; the apps show a real picture. Selector: `[class~="aui-select-item"] > [class~="aui-view"] > [class~="aui-contained-icon"]`. Layer step: **Image** — Image glyph stands in for the real plate pictures.
11. **Item text** — The plate name next to the picture. Selector: `[class~="aui-select-item-text"]`. Layer step: **Item text** — Plate name appears beside the option picture in each row.
12. **Indicator** — End-of-row slot; the AGPD scene draws a check icon here on the chosen plate. Selector: `[class~="aui-select-item-indicator"]`. Layer step: **Indicator** — AGPD places a check in the chosen plate’s end slot.

## Apps

- RWS (`rws`)
- AGPD (`agpd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Options with images (`rws-option-images`)

Apps: RWS

In context source: RWS: `src/rws/inputs.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/select/Select-007/example.tsx`

```tsx
import { ContainedIcon, Field, View } from '../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { gap: '3', width: '224' } }}>
      <Field.Label aui={{ scale: 'sm' }}>Base plate</Field.Label>
      <Field.Select
        defaultValue="plate-a"
        items={[
          { label: 'Plate A', value: 'plate-a' },
          { label: 'Plate B', value: 'plate-b' },
          { label: 'Plate C', value: 'plate-c' },
        ]}
      >
        <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', sx: { width: 'fill' } }}>
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" sideOffset={4}>
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
  );
}
```

#### In context source — `src/usecase-gallery/usecases/select/Select-007/options/rws-option-images/scene.tsx`

```tsx
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
```

### 2. Checked image rows (`agpd-option-images`)

Apps: AGPD

In context source: AGPD: `src/agpd/controls.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/select/Select-007/options/agpd-option-images/example.tsx`

```tsx
import { ContainedIcon, Field, View } from '../../../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { gap: '3', width: '224' } }}>
      <Field.Label aui={{ scale: 'sm' }}>Base plate</Field.Label>
      <Field.Select
        defaultValue="plate-a"
        items={[
          { label: 'Plate A', value: 'plate-a' },
          { label: 'Plate B', value: 'plate-b' },
          { label: 'Plate C', value: 'plate-c' },
        ]}
      >
        <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', sx: { width: 'fill' } }}>
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" sideOffset={4}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectItem value="plate-a">
                  <View as="span" aui={{ color: 'primary', paint: 'tonal', shape: 'soft', sx: { paddingBlockStart: '4', paddingBlockEnd: '4', paddingInlineStart: '4', paddingInlineEnd: '4' } }}>
                  <ContainedIcon name="image" aria-hidden />
                </View>
                  <Field.SelectItemText>Plate A</Field.SelectItemText>
                    <Field.SelectItemIndicator><Field.SelectIcon name="check" aria-hidden /></Field.SelectItemIndicator>
                </Field.SelectItem>
                <Field.SelectItem value="plate-b">
                  <View as="span" aui={{ color: 'primary', paint: 'tonal', shape: 'soft', sx: { paddingBlockStart: '4', paddingBlockEnd: '4', paddingInlineStart: '4', paddingInlineEnd: '4' } }}>
                  <ContainedIcon name="image" aria-hidden />
                </View>
                  <Field.SelectItemText>Plate B</Field.SelectItemText>
                    <Field.SelectItemIndicator><Field.SelectIcon name="check" aria-hidden /></Field.SelectItemIndicator>
                </Field.SelectItem>
                <Field.SelectItem value="plate-c">
                  <View as="span" aui={{ color: 'primary', paint: 'tonal', shape: 'soft', sx: { paddingBlockStart: '4', paddingBlockEnd: '4', paddingInlineStart: '4', paddingInlineEnd: '4' } }}>
                  <ContainedIcon name="image" aria-hidden />
                </View>
                  <Field.SelectItemText>Plate C</Field.SelectItemText>
                    <Field.SelectItemIndicator><Field.SelectIcon name="check" aria-hidden /></Field.SelectItemIndicator>
                </Field.SelectItem>
              </Field.SelectList>
            </Field.SelectPopup>
          </Field.SelectPositioner>
        </Field.SelectPortal>
      </Field.Select>
    </Field>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/select/Select-007/options/agpd-option-images/scene.tsx`

```tsx
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
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
