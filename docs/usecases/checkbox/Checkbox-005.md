# Checkbox-005: Print summary checkbox

Component family: **Checkbox**

UI type: **Checkbox group**

Source: `src/usecase-gallery/usecases/checkbox/Checkbox-005/usecase.ts`

## What it is

A read-only Checkbox under a Fieldset legend in the print report that repeats an input option of the input panel.

## When to choose it

Use it in a printed or read-only summary when the report must show the same on and off choice as the input panel. Do not use it to show a result value (a Table cell or text) or to toggle parts of a drawing (Checkbox-004, the Object visibility group).

## Where it belongs

The print reports of ACE (src/features/print/ui/CrackPrintReport.tsx, paste over both sides) and PBS (src/PrintView.tsx, Rotate Post Orientation and Rough Sawn).

## Usage guidance

The Checkbox keeps the input look (scale "sm", 22px box, 16px label, selected color "primary" paint "solid", unselected color "surface" paint "tonal" with borderColor "outlined"). ACE: a Fieldset with a Fieldset.Legend over the box, with `readOnly` so it cannot be toggled and looks normal (a click leaves aria-checked true). PBS: a column (gap 8) under a Type l4 title (14px, weight 600) with a smaller gap, only a spacing difference from ACE; the source Checkbox is `disabled`, which paints it grey (the box rgb(224, 224, 224), the mark rgb(100, 116, 139)), while the scene keeps it enabled. The scenes leave out the other selections and the results tables of the print report.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Checkbox`, `Fieldset`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `solid`, `text`, `tonal`
- `profile`: `default`, `no-padding`
- `scale`: `sm`
- `color`: `primary`, `surface`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Fieldset** — The print-report group, without padding, that ties the legend to the read-only option below it. Selector: `[class~="aui-fieldset"]`.
2. **Legend** — The legend "Paste over both sides of crack" that repeats the input panel option the checkbox mirrors. Selector: `[class~="aui-fieldset-legend"]`.
3. **Checkbox** — A read-only, selected checkbox that cannot be toggled in the printed report, drawn with the primary solid selected style. Selector: `[class~="aui-checkbox"]`.
4. **Indicator** — The box showing the repeated input as checked in the report. Selector: `[class~="aui-checkbox-indicator"]`.
5. **Label** — The answer "Yes" next to the box, matching the value chosen in the input panel (ACE and PBS reports). Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.

## Component layer steps

1. **Fieldset** — The print-report group, without padding, that ties the legend to the read-only option below it. Selector: `[class~="aui-fieldset"]`.
2. **Legend** — The legend "Paste over both sides of crack" that repeats the input panel option the checkbox mirrors. Selector: `[class~="aui-fieldset-legend"]`.
3. **Checkbox** — A read-only, selected checkbox that cannot be toggled in the printed report, drawn with the primary solid selected style. Selector: `[class~="aui-checkbox"]`.
4. **Indicator** — The box showing the repeated input as checked in the report. Selector: `[class~="aui-checkbox-indicator"]`.
5. **Label** — The answer "Yes" next to the box, matching the value chosen in the input panel (ACE and PBS reports). Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.

## Apps

- ACE (`ace`)
- PBS (`pbs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Print summary (`ace-print`)

Apps: ACE, PBS

In context source: ACE: `src/features/print/ui/CrackPrintReport.tsx`; PBS: `src/PrintView.tsx`

Note: A title sits above the checkbox; PBS uses a smaller gap than ACE.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/checkbox/Checkbox-005/example.tsx`

```tsx
import { Checkbox, Fieldset } from '../../../kit';

export default function Example() {
  return (
    <Fieldset aui={{ paint: 'text', profile: 'no-padding' }}>
      <Fieldset.Legend>Paste over both sides of crack</Fieldset.Legend>
      <Checkbox defaultSelected readOnly aui={{
        scale: 'sm',
        states: {
          unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
          selected: { color: 'primary', paint: 'solid' },
        },
      }}>
        <Checkbox.Label>Yes</Checkbox.Label>
      </Checkbox>
    </Fieldset>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/checkbox/Checkbox-005/options/ace-print/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Checkbox, Fieldset, View } from '../../../../../kit';

// ACE print report (src/features/print/ui/CrackPrintReport.tsx): the product selections repeat the input as a Fieldset, a Legend over one read-only Checkbox (`readOnly`, so the box looks as in the input panel and cannot be toggled).
// PBS (src/PrintView.tsx) writes a column under a Type l4 title with a smaller gap and a `disabled` Checkbox (grey); the scene keeps it enabled. This scene writes its own control; the other selections and the results tables are left out.
export default function AcePrintScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <Fieldset aui={{ paint: 'text', profile: 'no-padding' }}>
        <Fieldset.Legend>Paste over both sides of crack</Fieldset.Legend>
        <Checkbox defaultSelected readOnly aui={{
          scale: 'sm',
          states: {
            unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
            selected: { color: 'primary', paint: 'solid' },
          },
        }}>
          <Checkbox.Label>Yes</Checkbox.Label>
        </Checkbox>
      </Fieldset>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
