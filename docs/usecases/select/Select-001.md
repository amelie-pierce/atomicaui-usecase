# Select-001: Single select

Component family: **Select**

UI type: **Field select**

Source: `src/usecase-gallery/usecases/select/Select-001/usecase.ts`

## What it is

A labelled field whose outlined trigger shows the chosen value and a chevron and opens a list of single-choice rows.

## When to choose it

Use it for one value out of a list too long for radios, where the current value must stay visible in the field. Use the label above in a narrow stacked pane and the label beside where the rows of the pane run label then control (ADM, ADC, ACE). The kit Field.Select keeps the label, the trigger and the popup in one control. A select that filters a table column is Select-002.

## Where it belongs

The input panel of all ten apps: every design input that picks one value from a fixed list (a duration, a standard, a material, a unit). HCS writes it as the HcsSelectbox of its Input pane.

## Usage guidance

Label above (HCS, HS, PBS, PFD, FD, RWS): a Field at scale "sm" with a 3 gap holds a Field.Label and a Field.Select. The Field.SelectTrigger is color "surface", paint "fixed", width "fill", 28px high with 16/20 text (HCS, HS, PBS, PFD and FD state the height and the type; RWS leaves them to the scale and measures the same 28px, with 3px block padding instead of 2px). It holds Field.SelectValue and Field.SelectChevron. Field.SelectPortal > Field.SelectPositioner (side "bottom", sideOffset 4) > Field.SelectPopup with matchTriggerWidth > Field.SelectList holds the rows, each a Field.SelectItem with Field.SelectItemText and an empty Field.SelectItemIndicator (the chosen row shows by its raised fill). Label above, check (AGPD): the same field, but the chosen row ends with a check icon in its indicator (a 16px icon the first group does not draw). Label beside (ADM, ADC): the Field is a row with the label (nowrap, ellipsis, flex fill, flex-basis half) and the same trigger filling the other half (137px each in a 280px row), rows as in the first group. Label beside, check (ACE): the same row, with the check icon on the chosen row; ACE grows the label and trigger by flex-grow (129 and 145px in the same row), a size difference only. The apps disable the field when it has one option or none; the scenes show it enabled and leave out the help trigger, lock, unit symbol, error line, option notes, plate images and thumbnails.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Field`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`, `xs`
- `color`: `surface`
- `paint`: `fixed`, `text`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Field** — Field at scale "sm" with a 3 gap that stacks the label above the select; the ADM, ADC and ACE scenes lay it out as a row with the label beside the trigger. Selector: `[class~="aui-field"]`.
2. **Label** — The "Download Duration" label at scale "sm". In the label-beside scenes it is nowrap with an ellipsis and shares the row with the trigger. Selector: `[class~="aui-field-label"]`.
3. **Trigger** — Outlined trigger (color "surface", paint "fixed") filling the field width, 28px high with 16/20 text; it opens the Dead, Snow and Roof choices. Selector: `[class~="aui-select-trigger"]`.
4. **Value** — Shows the chosen "Snow (115)" in the trigger; Field.SelectValue reads it from the items list. Selector: `[class~="aui-select-value"]`. Direct text is highlighted.
5. **Chevron** — The chevron at the end of the trigger that marks it as a list opener. Selector: `[class~="aui-select-chevron"]`.
6. **Popup** — Popup that matches the trigger width and sits 4px below it, listing Dead (90), Snow (115) and Roof (125). Selector: `[class~="aui-select-popup"]`.
7. **List** — The scrolling list inside the popup that holds the three duration rows. Selector: `[class~="aui-select-list"]`.
8. **Item** — One duration row; the chosen one is marked by a raised fill rather than a glyph. Selector: `[class~="aui-select-item"]`.
9. **Item text** — The row label, for example "Dead (90)" or "Roof (125)". Selector: `[class~="aui-select-item-text"]`.
10. **Indicator** — The empty indicator slot at the end of a row; the AGPD and ACE scenes draw a check icon in it for the chosen row. Selector: `[class~="aui-select-item-indicator"]`.
11. **Check icon** — The 16px check on the chosen row in the AGPD and ACE scenes; the base example leaves the indicator empty. Selector: `[class~="aui-select-item-indicator"] [class~="aui-contained-icon"]`.

## Apps

- HCS (`hcs`)
- HS (`hs`)
- PBS (`pbs`)
- PFD (`pfd`)
- FD (`fd`)
- RWS (`rws`)
- AGPD (`agpd`)
- ADM (`adm`)
- ADC (`adc`)
- ACE (`ace`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Field select (`hcs-field-select`)

Apps: HCS, HS, PBS, PFD, FD, RWS

In context source: HCS: `src/components/HcsSelectbox.tsx`; HS: `src/hs/InputFields.tsx`; PBS: `src/InputFields.tsx`; PFD: `src/pfd/fields.tsx`; FD: `src/components/ui.jsx`; RWS: `src/rws/inputs.tsx`

Note: Label above.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/select/Select-001/example.tsx`

```tsx
import { Field } from '../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
      <Field.Label aui={{ scale: 'sm' }}>Download Duration</Field.Label>
      <Field.Select
        defaultValue="snow"
        items={[
          { label: 'Dead (90)', value: 'dead' },
          { label: 'Snow (115)', value: 'snow' },
          { label: 'Roof (125)', value: 'roof' },
        ]}
      >
        <Field.SelectTrigger aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { width: 'fill', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20' } }}>
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" sideOffset={4}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectItem value="dead">
                  <Field.SelectItemText>Dead (90)</Field.SelectItemText>
                  <Field.SelectItemIndicator />
                </Field.SelectItem>
                <Field.SelectItem value="snow">
                  <Field.SelectItemText>Snow (115)</Field.SelectItemText>
                  <Field.SelectItemIndicator />
                </Field.SelectItem>
                <Field.SelectItem value="roof">
                  <Field.SelectItemText>Roof (125)</Field.SelectItemText>
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

#### In context source — `src/usecase-gallery/usecases/select/Select-001/options/hcs-field-select/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The Input pane field of HCS (src/components/HcsSelectbox.tsx, mounted in src/App.tsx), the same label-above field of HS, PBS, PFD, FD and RWS: a Field with the label stacked over a
// full-width 28px outlined trigger (surface, fixed) and a matchTriggerWidth popup placed 4px below. Built open and non-modal (container={host}, positioner ug-anchored).
// HS, PBS, PFD and FD write the same props; RWS leaves out the 28px height and 16/20 type and renders the same 28px trigger (padding 3px instead of 2px), so it joins this group.
// Left out: the help trigger and lock beside the label, the invalid state, the not applicable placeholder and the other fields of the pane; the app disables the field when it has one option, the scene shows it enabled.
export default function HcsFieldSelectScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Download Duration</Field.Label>
        <Field.Select open
          defaultValue="snow"
          items={[
            { label: 'Dead (90)', value: 'dead' },
            { label: 'Snow (115)', value: 'snow' },
            { label: 'Roof (125)', value: 'roof' },
          ]}
        >
          <Field.SelectTrigger aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { width: 'fill', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20' } }}>
            <Field.SelectValue />
            <Field.SelectChevron />
          </Field.SelectTrigger>
          <Field.SelectPortal container={host}>
            <Field.SelectPositioner side="bottom" sideOffset={4} className="ug-anchored">
              <Field.SelectPopup matchTriggerWidth>
                <Field.SelectList>
                  <Field.SelectItem value="dead">
                    <Field.SelectItemText>Dead (90)</Field.SelectItemText>
                    <Field.SelectItemIndicator />
                  </Field.SelectItem>
                  <Field.SelectItem value="snow">
                    <Field.SelectItemText>Snow (115)</Field.SelectItemText>
                    <Field.SelectItemIndicator />
                  </Field.SelectItem>
                  <Field.SelectItem value="roof">
                    <Field.SelectItemText>Roof (125)</Field.SelectItemText>
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

### 2. Field select — UI variant 2 (`agpd-field-select`)

Apps: AGPD

In context source: AGPD: `src/agpd/controls.tsx`

Note: Label above; the chosen row ends with a check icon.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/select/Select-001/options/agpd-field-select/example.tsx`

```tsx
import { Field } from '../../../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
      <Field.Label aui={{ scale: 'sm' }}>Download Duration</Field.Label>
      <Field.Select
        defaultValue="snow"
        items={[
          { label: 'Dead (90)', value: 'dead' },
          { label: 'Snow (115)', value: 'snow' },
          { label: 'Roof (125)', value: 'roof' },
        ]}
      >
        <Field.SelectTrigger aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { width: 'fill', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20' } }}>
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" sideOffset={4}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectItem value="dead">
                  <Field.SelectItemText>Dead (90)</Field.SelectItemText>
                  <Field.SelectItemIndicator><Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} /></Field.SelectItemIndicator>
                </Field.SelectItem>
                <Field.SelectItem value="snow">
                  <Field.SelectItemText>Snow (115)</Field.SelectItemText>
                  <Field.SelectItemIndicator><Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} /></Field.SelectItemIndicator>
                </Field.SelectItem>
                <Field.SelectItem value="roof">
                  <Field.SelectItemText>Roof (125)</Field.SelectItemText>
                  <Field.SelectItemIndicator><Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} /></Field.SelectItemIndicator>
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

#### In context source — `src/usecase-gallery/usecases/select/Select-001/options/agpd-field-select/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The Choice field of AGPD (src/agpd/controls.tsx): the label-above field of the first group (a 28px outlined trigger, popup of the trigger width, 4px below), but the chosen row ends with a check icon in its indicator,
// where the first group's rows hold none. Built open and non-modal (container={host}, positioner ug-anchored). Left out: the help trigger and lock beside the label, the plate images of some options (Select-007)
// and the other fields of the pane; the app disables the field when it has one option, the scene shows it enabled.
export default function AgpdFieldSelectScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm' }}>
        <Field.Label>Download Duration</Field.Label>
        <Field.Select open
          defaultValue="snow"
          items={[
            { label: 'Dead (90)', value: 'dead' },
            { label: 'Snow (115)', value: 'snow' },
            { label: 'Roof (125)', value: 'roof' },
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
                  <Field.SelectItem value="dead">
                    <Field.SelectItemText>Dead (90)</Field.SelectItemText>
                    <Field.SelectItemIndicator>
                      <Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} />
                    </Field.SelectItemIndicator>
                  </Field.SelectItem>
                  <Field.SelectItem value="snow">
                    <Field.SelectItemText>Snow (115)</Field.SelectItemText>
                    <Field.SelectItemIndicator>
                      <Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} />
                    </Field.SelectItemIndicator>
                  </Field.SelectItem>
                  <Field.SelectItem value="roof">
                    <Field.SelectItemText>Roof (125)</Field.SelectItemText>
                    <Field.SelectItemIndicator>
                      <Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} />
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

### 3. Field select — UI variant 3 (`adm-field-select`)

Apps: ADM, ADC

In context source: ADM: `src/features/design-inputs/components/MasonryWallDetailsSection/FieldSelectRow.tsx`; ADC: `src/adc/components/DesignField.tsx`

Note: Label beside: label and trigger share the row, half each.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/select/Select-001/options/adm-field-select/example.tsx`

```tsx
import { Field } from '../../../../../kit';

export default function Example() {
  return (
    <Field aui={{ sx: { flexDirection: 'row', alignItems: 'center', width: 'fill' } }}>
      <Field.Label aui={{ sx: { flex: 'fill', flexBasis: 'half', minWidth: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>Download Duration</Field.Label>
      <Field.Select
        defaultValue="snow"
        items={[
          { label: 'Dead (90)', value: 'dead' },
          { label: 'Snow (115)', value: 'snow' },
          { label: 'Roof (125)', value: 'roof' },
        ]}
      >
        <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', sx: { flex: 'fill', flexBasis: 'half', minWidth: '0' } }}>
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" sideOffset={4}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectItem value="dead">
                  <Field.SelectItemText>Dead (90)</Field.SelectItemText>
                  <Field.SelectItemIndicator />
                </Field.SelectItem>
                <Field.SelectItem value="snow">
                  <Field.SelectItemText>Snow (115)</Field.SelectItemText>
                  <Field.SelectItemIndicator />
                </Field.SelectItem>
                <Field.SelectItem value="roof">
                  <Field.SelectItemText>Roof (125)</Field.SelectItemText>
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

#### In context source — `src/usecase-gallery/usecases/select/Select-001/options/adm-field-select/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The label-beside field of ADM (src/features/design-inputs/components/MasonryWallDetailsSection/FieldSelectRow.tsx), the same row of ADC
// (src/adc/components/DesignField.tsx): a Field row with the label at the start and a 28px outlined trigger sharing the row half and half, popup the width of the trigger, placed 4px below.
// Built open and non-modal (container={host}, positioner ug-anchored).
// Left out: the unit symbol after the value, the error line, the display nodes of ADM and the grouped options and thumbnails of ADC; the app disables the field when it has one option, the scene shows it enabled.
export default function AdmFieldSelectScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ sx: { display: 'flex', flexDirection: 'column', width: 'fill', gap: '4' } }}>
        <View aui={{ sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fill' } }}>
          <Field.Label aui={{ sx: { flex: 'fill', flexBasis: 'half', minWidth: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>Download Duration</Field.Label>
          <Field.Select open
            defaultValue="snow"
            items={[
              { label: 'Dead (90)', value: 'dead' },
              { label: 'Snow (115)', value: 'snow' },
              { label: 'Roof (125)', value: 'roof' },
            ]}
          >
            <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', sx: { flex: 'fill', flexBasis: 'half', minWidth: '0' } }}>
              <Field.SelectValue />
              <Field.SelectChevron />
            </Field.SelectTrigger>
            <Field.SelectPortal container={host}>
              <Field.SelectPositioner side="bottom" sideOffset={4} className="ug-anchored">
                <Field.SelectPopup matchTriggerWidth>
                  <Field.SelectList>
                    <Field.SelectItem value="dead">
                      <Field.SelectItemText>Dead (90)</Field.SelectItemText>
                      <Field.SelectItemIndicator />
                    </Field.SelectItem>
                    <Field.SelectItem value="snow">
                      <Field.SelectItemText>Snow (115)</Field.SelectItemText>
                      <Field.SelectItemIndicator />
                    </Field.SelectItem>
                    <Field.SelectItem value="roof">
                      <Field.SelectItemText>Roof (125)</Field.SelectItemText>
                      <Field.SelectItemIndicator />
                    </Field.SelectItem>
                  </Field.SelectList>
                </Field.SelectPopup>
              </Field.SelectPositioner>
            </Field.SelectPortal>
          </Field.Select>
        </View>
      </Field>
    </View>
  );
}
```

### 4. Field select — UI variant 4 (`ace-field-select`)

Apps: ACE

In context source: ACE: `src/features/estimator/ui/EstimatorInputPanel.tsx`

Note: Label beside; the chosen row ends with a check icon.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/select/Select-001/options/ace-field-select/example.tsx`

```tsx
import { Field } from '../../../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fill', gap: '3' } }}>
      <Field.Label aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>Download Duration</Field.Label>
      <Field.Select
        defaultValue="snow"
        items={[
          { label: 'Dead (90)', value: 'dead' },
          { label: 'Snow (115)', value: 'snow' },
          { label: 'Roof (125)', value: 'roof' },
        ]}
      >
        <Field.SelectTrigger aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { flex: 'fill', minWidth: '0', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20', textAlign: 'start' } }}>
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" sideOffset={4}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectItem value="dead">
                  <Field.SelectItemText>Dead (90)</Field.SelectItemText>
                  <Field.SelectItemIndicator><Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} /></Field.SelectItemIndicator>
                </Field.SelectItem>
                <Field.SelectItem value="snow">
                  <Field.SelectItemText>Snow (115)</Field.SelectItemText>
                  <Field.SelectItemIndicator><Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} /></Field.SelectItemIndicator>
                </Field.SelectItem>
                <Field.SelectItem value="roof">
                  <Field.SelectItemText>Roof (125)</Field.SelectItemText>
                  <Field.SelectItemIndicator><Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} /></Field.SelectItemIndicator>
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

#### In context source — `src/usecase-gallery/usecases/select/Select-001/options/ace-field-select/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The estimator select of ACE (src/features/estimator/ui/EstimatorInputPanel.tsx): the label-beside row of ADM and ADC (the label at the start, a 28px outlined trigger, popup of the trigger width, 4px below),
// but the chosen row ends with a check icon in its indicator, where theirs hold none, and the label and trigger share the row by flex-grow (129 and 145px in a 280px row, ADM and ADC 137 and 137).
// Built open and non-modal (container={host}, positioner ug-anchored). Left out: the option note and display node, the description under the field; the app disables the field with one option, the scene shows it enabled.
export default function AceFieldSelectScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'column', width: 'fill', gap: '3' } }}>
        <View aui={{ sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fill' } }}>
          <Field.Label aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>Download Duration</Field.Label>
          <Field.Select open
            defaultValue="snow"
            items={[
              { label: 'Dead (90)', value: 'dead' },
              { label: 'Snow (115)', value: 'snow' },
              { label: 'Roof (125)', value: 'roof' },
            ]}
          >
            <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', scale: 'sm', sx: { flex: 'fill', minWidth: '0', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20', textAlign: 'start' } }}>
              <Field.SelectValue />
              <Field.SelectChevron />
            </Field.SelectTrigger>
            <Field.SelectPortal container={host}>
              <Field.SelectPositioner side="bottom" sideOffset={4} className="ug-anchored">
                <Field.SelectPopup matchTriggerWidth>
                  <Field.SelectList>
                    <Field.SelectItem value="dead">
                      <Field.SelectItemText>Dead (90)</Field.SelectItemText>
                      <Field.SelectItemIndicator>
                        <Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} />
                      </Field.SelectItemIndicator>
                    </Field.SelectItem>
                    <Field.SelectItem value="snow">
                      <Field.SelectItemText>Snow (115)</Field.SelectItemText>
                      <Field.SelectItemIndicator>
                        <Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} />
                      </Field.SelectItemIndicator>
                    </Field.SelectItem>
                    <Field.SelectItem value="roof">
                      <Field.SelectItemText>Roof (125)</Field.SelectItemText>
                      <Field.SelectItemIndicator>
                        <Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} />
                      </Field.SelectItemIndicator>
                    </Field.SelectItem>
                  </Field.SelectList>
                </Field.SelectPopup>
              </Field.SelectPositioner>
            </Field.SelectPortal>
          </Field.Select>
        </View>
      </Field>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
