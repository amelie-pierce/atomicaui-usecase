# Checkbox-003: Show passed checks filter

Component family: **Checkbox**

UI type: **Single checkbox**

Source: `src/usecase-gallery/usecases/checkbox/Checkbox-003/usecase.ts`

## What it is

A Checkbox with its label that turns an on and off filter of the table right below it: Show passed validations above a results table.

## When to choose it

Use it for an on and off filter that applies to the table right below it. Do not use it for a column filter (Dropdown-001), an exclusive choice (a RadioGroup) or an on and off setting that applies at once (a Switch).

## Where it belongs

FD only: the Why not details of an expanded result row (src/components/RowExpansion.jsx, SolutionDetails), the first child of the details column above the checks Table.

## Usage guidance

The Checkbox has aui scale "sm" (22px box, a 14px mark, radius 4px) and per-state appearance in states: unselected color "surface" paint "tonal" with sx borderColor "outlined" (a white box with a 1px border), selected color "primary" paint "solid" (no border). Checkbox.Icon name "check" is the mark and Checkbox.Label is the caption on its right with an 8px gap: 16px regular. The Checkbox is the first child of a View (profile "default", scale "sm", flex column, gap 8) above the checks table, and starts unselected (the white box with the 1px border), so the app lists only the failed and warning checks until the reader turns it on and the passed ones appear too. It is the same bare Checkbox as the input panel option with a different label. The scene leaves out the checks table below.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Checkbox`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `primary`, `surface`
- `paint`: `solid`, `text`, `tonal`
- `profile`: `default`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Checkbox** — The filter toggle, checked by default so passed validations are listed in the checks table right below it; selected is solid primary. Selector: `[class~="aui-checkbox"]`. Layer step: **Checkbox** — Checked filter keeps passed validations listed in the table below.
2. **Indicator** — The box that shows whether passed rows are filtered in, outlined and surface-tonal while off. Selector: `[class~="aui-checkbox-indicator"]`. Layer step: **Indicator** — Box turns solid when passed validations are shown in table. Code target: `Checkbox`.
3. **Icon** — The "check" mark inside the box while "Show passed validations" is on. Selector: `[class~="aui-checkbox-indicator"] [class~="aui-contained-icon"]`. Layer step: **Icon** — Check mark appears while Show passed validations is enabled. Code target: `Checkbox.Icon`.
4. **Label** — The caption "Show passed validations" that names the filter in the Why not details column of FD. Selector: `[class~="aui-control-row"] > [class~="aui-label"]`. Layer step: **Label** — Caption names the passed-validation filter in the FD details column.

## Apps

- FD (`fd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Table filter (`fd-filter`)

Apps: FD

In context source: FD: `src/components/RowExpansion.jsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/checkbox/Checkbox-003/example.tsx`

```tsx
import { Checkbox } from '../../../kit';

export default function Example() {
  return (
    <Checkbox defaultSelected aui={{
      scale: 'sm',
      states: {
        unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
        selected: { color: 'primary', paint: 'solid' },
      },
    }}>
      <Checkbox.Icon name="check" />
      <Checkbox.Label>Show passed validations</Checkbox.Label>
    </Checkbox>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/checkbox/Checkbox-003/options/fd-filter/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Checkbox, View } from '../../../../../kit';

// FD Why not details (src/components/RowExpansion.jsx, SolutionDetails): the details of an expanded result row are a column (default padding, gap 8) whose first child is the Checkbox, above the checks table; it starts unselected. Left out: the checks table, which the Checkbox filters (the app shows only failed and warning checks until it is selected).
export default function FdFilterScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'default', scale: 'sm', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <Checkbox
        aui={{
          scale: 'sm',
          states: {
            unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
            selected: { color: 'primary', paint: 'solid' },
          },
        }}
      >
        <Checkbox.Label>Show passed validations</Checkbox.Label>
      </Checkbox>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
