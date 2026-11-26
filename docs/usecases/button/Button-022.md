# Button-022: Save edited value buttons

Component family: **Button**

UI type: **Button group**

Source: `src/usecase-gallery/usecases/button/Button-022/usecase.ts`

## What it is

A filled Cancel and a solid secondary Save close the in-place editor popover of a value chip.

## When to choose it

Use it for the commit of a small in-place edit; ADC fills the popover Cancel like a dialog Cancel (the unfilled text Cancel of Button-021 is for column configuration).

## Where it belongs

The in-place editor popover opened from a value chip: a row with a number Field, then Cancel and Save. Real site source: ADC src/adc/components/InPlaceEditor.tsx. No other app has this popover.

## Usage guidance

Cancel sets color "surface-alt" and paint "solid", Save color "secondary" and paint "solid", both scale "sm" with a soft shape and a 4px gap; there is no reset icon. The popup opens to the right of the value chip (surface solid xs, compact; right, center, 8px offset). The chip stands alone here instead of floating over the 3D model. One group, ADC only.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Popover`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`, `xs`
- `color`: `secondary`, `surface`, `surface-alt`
- `paint`: `solid`, `text`
- `shape`: `soft`
- `profile`: `compact`, `default`, `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Value chip** — The 12 in value chip (aria-label "Edit Width, 12 in") that opens the editor popover; it stands alone here rather than floating over the 3D model. Selector: `[data-base-ui-click-trigger]`.
2. **Editor popup** — The surface (solid, sm, soft, elevation 4) opened 8px to the right of the chip, holding the Width number field and the Cancel and Save buttons in one row. Selector: `[data-aui-popup-motion][role="dialog"]`.
3. **Button row** — The row at the end of the popup that keeps Cancel and Save together with a 4px gap and no growth, so the Width field takes the remaining width. Selector: `[data-ug-part="edit-actions"]`.
4. **Cancel** — The filled gray surface-alt Cancel that abandons the edit; ADC fills it like a dialog Cancel. Selector: `[class~="aui-button"]:not([aria-label]):first-of-type`.
5. **Save** — The solid secondary Save that commits the new Width value; it follows Cancel and is the only emphasised action. Selector: `[class~="aui-button"]:not([aria-label]):last-of-type`.

## Apps

- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Edit value (`adc-edit-value`)

Apps: ADC

In context source: ADC: `src/adc/components/InPlaceEditor.tsx`

In context view: Shown.

#### In context structure additions

1. **Width field** — The labelled Width number field (12 with an in unit) at the start of the popup, which Cancel and Save commit or discard. Selector: `[data-aui-popup-motion][role="dialog"] [class~="aui-field"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-022/example.tsx`

```tsx
import { Button } from '../../../kit';

export default function Example() {
  return (
    <>
      <Button aui={{ scale: 'sm', color: 'surface-alt', paint: 'solid', shape: 'soft' }}>Cancel</Button>
      <Button aui={{ scale: 'sm', color: 'secondary', paint: 'solid', shape: 'soft' }}>Save</Button>
    </>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-022/options/adc-edit-value/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Popover, View } from '../../../../../kit';
import { MockNumberField } from '../../../../../mock-data';

// ADC InPlaceEditor: the value chip (surface solid, xs, compact) opens a popover to its right (center, 8px offset): the number Field, then Cancel and Save in a row at the end.
// Cancel is the gray surface-alt solid Button (HCS draws it as text) and both sit at scale "sm" with a soft shape; there is no reset icon. The chip floats over the 3D model in the app; here it stands alone.
export default function AdcEditValueScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 8)', inlineSize: 'min(100%, calc(var(--p-px-16) * 36))' }}>
      <Popover open>
        <Popover.Trigger render={<Button aria-label="Edit Width, 12 in" aui={{ color: 'surface', paint: 'solid', scale: 'xs', shape: 'soft', profile: 'compact' }} />}>
          12 in
        </Popover.Trigger>
        <Popover.Portal container={host}>
          <Popover.Positioner side="right" align="center" sideOffset={8} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Edit Width"
              render={
                <View
                  as="section"
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', scale: 'sm', shape: 'soft', elevation: 4, sx: { display: 'flex', alignItems: 'end', gap: '8' } }}
                />
              }
            >
              <MockNumberField label="Width" value="12" unit="in" />
              <View data-ug-part="edit-actions" aui={{ paint: 'text', profile: 'no-padding', scale: 'sm', sx: { display: 'flex', gap: '4', alignItems: 'center', flex: 'none' } }}>
                <Button aui={{ color: 'surface-alt', paint: 'solid', scale: 'sm', shape: 'soft' }}>Cancel</Button>
                <Button aui={{ color: 'secondary', paint: 'solid', scale: 'sm', shape: 'soft' }}>Save</Button>
              </View>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
