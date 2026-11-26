# Dropdown-001: Outlined text trigger

Component family: **Dropdown**

UI type: **Dropdown with text trigger**

Source: `src/usecase-gallery/usecases/dropdown/Dropdown-001/usecase.ts`

## What it is

A text trigger with a chevron opens a short list of radio rows; the chosen row names the trigger and closes the list.

## When to choose it

Use it to pick one value from a short fixed list where the current value must stay visible in the trigger. The trigger is the outlined text form (surface, fixed, a 1px outlined border), not an icon button, and the chosen row is marked by the selected fill.

## Where it belongs

The HCS output toolbar, at the end of the row beside the "Showing N of M results" text: the Product filter that narrows the results to Passed, Failed or All Products.

## Usage guidance

HCS: a Dropdown at scale "sm" whose Dropdown.Trigger shows the chosen option label with its count (for example "Passed Products (9)") and a Dropdown.Chevron, with aria-label "Product filter", color "surface", paint "fixed" and a 1px border on all four sides in the "outlined" colour (sx whiteSpace "nowrap"). The popup is a Dropdown.Popup with matchTriggerWidth at scale "sm", placed 4px below the trigger and aligned to its start. It holds one Dropdown.RadioGroup of three RadioItems (Passed Products, Failed Products, All Products), each with closeOnClick, its label and count, and a composed Dropdown.RadioItemIndicator (the kit draws it as an empty transparent span, so the chosen row is marked by its raised fill, not a glyph). The app drops the counts and disables the trigger while the design is invalid; the scene shows the enabled state with counts. The scene is shown open and keeps only the filter: the search field, Reset filters button and results count of the toolbar are left out.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Dropdown`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `surface`
- `paint`: `fixed`, `text`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Trigger** — Outlined text trigger (color "surface", paint "fixed", 1px "outlined" border on all four sides, nowrap) labelled "Product filter" for assistive tech. Selector: `[class~="aui-dropdown-trigger"]`.
2. **Trigger label** — The chosen option with its count, "Passed Products (9)", written as the trigger text. Selector: `[class~="aui-dropdown-trigger"]`. Direct text is highlighted.
3. **Chevron** — The chevron at the end of the trigger at scale "sm". Selector: `[class~="aui-dropdown-chevron"]`.
4. **Popup** — Popup at scale "sm" that matches the trigger width, 4px below it and aligned to its start. Selector: `[class~="aui-dropdown-popup"]`.
5. **Radio group** — The group with value "passed" that makes exactly one of the three filters current. Selector: `[class~="aui-dropdown-radio-group"]`.
6. **Radio item** — A filter row with its label and count (Passed Products (9), Failed Products (3), All Products (12)); closeOnClick closes the list after a choice. Selector: `[class~="aui-dropdown-radio-item"]`.
7. **Indicator** — Empty transparent span at the row end; the chosen row shows by its raised fill, not a glyph. Selector: `[class~="aui-dropdown-radio-item-indicator"]`.

## Apps

- HCS (`hcs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Radio value filter (`hcs-product-filter`)

Apps: HCS

In context source: HCS: `src/components/HcsProductFilter.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/dropdown/Dropdown-001/example.tsx`

```tsx
import { Dropdown } from '../../../kit';

export default function Example() {
  return (
    <Dropdown aui={{ scale: 'sm' }}>
      <Dropdown.Trigger
        aria-label="Product filter"
        aui={{
          scale: 'sm',
          color: 'surface',
          paint: 'fixed',
          sx: {
            whiteSpace: 'nowrap',
            borderColor: 'outlined',
            borderBlockStartWidth: '1',
            borderBlockEndWidth: '1',
            borderInlineStartWidth: '1',
            borderInlineEndWidth: '1',
          },
        }}
      >
        Passed Products (9)
        <Dropdown.Chevron aui={{ scale: 'sm' }} />
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Positioner sideOffset={4} align="start">
          <Dropdown.Popup matchTriggerWidth aui={{ scale: 'sm' }}>
            <Dropdown.RadioGroup value="passed">
              <Dropdown.RadioItem value="passed" closeOnClick aui={{ scale: 'sm' }}>
                Passed Products (9)
                <Dropdown.RadioItemIndicator />
              </Dropdown.RadioItem>
              <Dropdown.RadioItem value="failed" closeOnClick aui={{ scale: 'sm' }}>
                Failed Products (3)
                <Dropdown.RadioItemIndicator />
              </Dropdown.RadioItem>
              <Dropdown.RadioItem value="all" closeOnClick aui={{ scale: 'sm' }}>
                All Products (12)
                <Dropdown.RadioItemIndicator />
              </Dropdown.RadioItem>
            </Dropdown.RadioGroup>
          </Dropdown.Popup>
        </Dropdown.Positioner>
      </Dropdown.Portal>
    </Dropdown>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dropdown/Dropdown-001/options/hcs-product-filter/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dropdown, View } from '../../../../../kit';

// HCS HcsProductFilter (src/components/HcsProductFilter.tsx), mounted at the end of the output toolbar row (src/App.tsx): the outlined text trigger shows the chosen option and a chevron,
// the popup matches the trigger width and holds a radio group with the indicator shown. Built open and non-modal (container={host}, positioner ug-anchored).
// The search field, the Reset filters button and the "Showing N of M results" text beside it are left out; the app disables the trigger while the design is invalid, the scene shows it enabled.
export default function HcsProductFilterScene({ host }: ContextProps) {
  return (
    <View
      aui={{ scale: 'sm', profile: 'no-padding', paint: 'text', sx: { display: 'flex', alignItems: 'center', justifyContent: 'end', gap: '8', flex: 'none' } }}
      style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, 720px)' }}
    >
      <Dropdown open aui={{ scale: 'sm' }}>
        <Dropdown.Trigger
          aria-label="Product filter"
          aui={{
            scale: 'sm',
            color: 'surface',
            paint: 'fixed',
            sx: {
              whiteSpace: 'nowrap',
              borderColor: 'outlined',
              borderBlockStartWidth: '1',
              borderBlockEndWidth: '1',
              borderInlineStartWidth: '1',
              borderInlineEndWidth: '1',
            },
          }}
        >
          Passed Products (9)
          <Dropdown.Chevron aui={{ scale: 'sm' }} />
        </Dropdown.Trigger>
        <Dropdown.Portal container={host}>
          <Dropdown.Positioner sideOffset={4} align="start" className="ug-anchored">
            <Dropdown.Popup matchTriggerWidth aui={{ scale: 'sm' }}>
              <Dropdown.RadioGroup value="passed">
                <Dropdown.RadioItem value="passed" closeOnClick aui={{ scale: 'sm' }}>
                  Passed Products (9)
                  <Dropdown.RadioItemIndicator />
                </Dropdown.RadioItem>
                <Dropdown.RadioItem value="failed" closeOnClick aui={{ scale: 'sm' }}>
                  Failed Products (3)
                  <Dropdown.RadioItemIndicator />
                </Dropdown.RadioItem>
                <Dropdown.RadioItem value="all" closeOnClick aui={{ scale: 'sm' }}>
                  All Products (12)
                  <Dropdown.RadioItemIndicator />
                </Dropdown.RadioItem>
              </Dropdown.RadioGroup>
            </Dropdown.Popup>
          </Dropdown.Positioner>
        </Dropdown.Portal>
      </Dropdown>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
