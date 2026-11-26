# Select-005: Licence gate country select

Component family: **Select**

UI type: **Field select**

Source: `src/usecase-gallery/usecases/select/Select-005/usecase.ts`

## What it is

The country select of the licence gate: the same flag-led trigger and rows, with a check on the chosen row.

## When to choose it

Use it to ask for the country in a gate the user must pass before working, where the chosen option must show its glyph in the closed field. Use Select-004 for the same field in the app settings.

## Where it belongs

ACE only: the licence gate that asks for the country before the licence is accepted (src/features/eula/ui/EulaGate.tsx), a repeat of the country field of the App Configuration dialog.

## Usage guidance

The same flag-led trigger and rows as the configuration select, but the trigger states no scale or height and the chosen row ends with a check icon in its indicator (an indicator holding a 16px icon, where the configuration rows hold none). The scene shows the enabled state and leaves out the licence text, the Accept button and the other gate fields.

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

1. **Field** — Field at scale "sm", full width, laid out for the ACE licence gate dialog above the accept checkbox. Selector: `[class~="aui-field"]`.
2. **Label** — The "Country" label above the licence gate trigger. Selector: `[class~="aui-field-label"]`.
3. **Trigger** — The flag-led outlined trigger in the licence gate; unlike the configuration panel the ACE scene states no scale or height. Selector: `[class~="aui-select-trigger"]`.
4. **Trigger icon** — The flag icon that leads the trigger and mirrors the chosen row. Selector: `[class~="aui-select-trigger"] > [class~="aui-contained-icon"]:not([class~="aui-select-chevron"])`.
5. **Value** — Shows "United States" as the pre-filled country before the licence is accepted. Selector: `[class~="aui-select-value"]`. Direct text is highlighted.
6. **Chevron** — The chevron at the end of the trigger. Selector: `[class~="aui-select-chevron"]`.
7. **Popup** — Popup of the trigger width, 4px below the trigger, listing the three countries. Selector: `[class~="aui-select-popup"]`.
8. **List** — The list of Canada, United States and Mexico rows. Selector: `[class~="aui-select-list"]`.
9. **Item** — A country row with flag, name and a trailing check slot for the chosen country. Selector: `[class~="aui-select-item"]`.
10. **Item icon** — The flag icon at the start of each row, before the country name. Selector: `[class~="aui-select-item"] > [class~="aui-contained-icon"]`.
11. **Item text** — The country name: Canada, United States or Mexico. Selector: `[class~="aui-select-item-text"]`.
12. **Indicator** — In the ACE licence gate scene this slot holds a check icon on the chosen row; the base example keeps it empty. Selector: `[class~="aui-select-item-indicator"]`.
13. **Check icon** — The check drawn at the end of the chosen country row in the ACE scene. Selector: `[class~="aui-select-item-indicator"] [class~="aui-contained-icon"]`.

## Apps

- ACE (`ace`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Licence gate country (`ace-licence-country`)

Apps: ACE

In context source: ACE: `src/features/eula/ui/EulaGate.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/select/Select-005/example.tsx`

```tsx
import { Field } from '../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { width: 'fill', minWidth: '0' } }}>
      <Field.Label>Country</Field.Label>
      <Field.Select
        defaultValue="us"
        items={[
          { label: 'Canada', value: 'ca' },
          { label: 'United States', value: 'us' },
          { label: 'Mexico', value: 'mx' },
        ]}
      >
        <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', scale: 'sm', sx: { width: 'fill', height: '28' } }}>
          <Field.SelectIcon name="flag" aria-hidden />
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" sideOffset={4}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectItem value="ca">
                  <Field.SelectIcon name="flag" aria-hidden />
                  <Field.SelectItemText>Canada</Field.SelectItemText>
                  <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                </Field.SelectItem>
                <Field.SelectItem value="us">
                  <Field.SelectIcon name="flag" aria-hidden />
                  <Field.SelectItemText>United States</Field.SelectItemText>
                  <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                </Field.SelectItem>
                <Field.SelectItem value="mx">
                  <Field.SelectIcon name="flag" aria-hidden />
                  <Field.SelectItemText>Mexico</Field.SelectItemText>
                  <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
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

#### In context source — `src/usecase-gallery/usecases/select/Select-005/options/ace-licence-country/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The country select of the ACE licence gate (src/features/eula/ui/EulaGate.tsx): the same flag-led trigger and rows, but it states no scale or height and each row ends with a check icon for the chosen one.
// Built open and non-modal (container={host}, positioner ug-anchored). Left out: the licence text, the accept checkbox and the buttons of the gate.
export default function AceLicenceCountryScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field>
        <Field.Label>Country</Field.Label>
        <Field.Select open
          defaultValue="us"
          items={[
            { label: 'Canada', value: 'ca' },
            { label: 'United States', value: 'us' },
            { label: 'Mexico', value: 'mx' },
          ]}
        >
          <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed' }}>
            <Field.SelectIcon name="flag" aria-hidden />
            <Field.SelectValue />
            <Field.SelectChevron />
          </Field.SelectTrigger>
          <Field.SelectPortal container={host}>
            <Field.SelectPositioner side="bottom" sideOffset={4} className="ug-anchored">
              <Field.SelectPopup matchTriggerWidth>
                <Field.SelectList>
                  <Field.SelectItem value="ca">
                    <Field.SelectIcon name="flag" aria-hidden />
                    <Field.SelectItemText>Canada</Field.SelectItemText>
                    <Field.SelectItemIndicator>
                      <Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} />
                    </Field.SelectItemIndicator>
                  </Field.SelectItem>
                  <Field.SelectItem value="us">
                    <Field.SelectIcon name="flag" aria-hidden />
                    <Field.SelectItemText>United States</Field.SelectItemText>
                    <Field.SelectItemIndicator>
                      <Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} />
                    </Field.SelectItemIndicator>
                  </Field.SelectItem>
                  <Field.SelectItem value="mx">
                    <Field.SelectIcon name="flag" aria-hidden />
                    <Field.SelectItemText>Mexico</Field.SelectItemText>
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

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
