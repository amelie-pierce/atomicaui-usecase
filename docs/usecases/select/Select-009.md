# Select-009: Status filter

Component family: **Select**

UI type: **Filled select**

Source: `src/usecase-gallery/usecases/select/Select-009/usecase.ts`

## What it is

A label-less select in the output toolbar that narrows the results by status.

## When to choose it

Use it as a toolbar filter where the visible value names the filter and no label fits. Name it with aria-label on the trigger. Use the field select (Select-001) for a design input.

## Where it belongs

The FD output toolbar, beside the search field: the Product status filter, shown when the design has failed products.

## Usage guidance

FD: a Field at scale "sm" (class "status-filter") around a Field.Select; the Field.SelectTrigger carries aria-label "Product status" and only `sx: { width: "full" }`, so it keeps the default kit colour and paint and fills the toolbar slot, with Field.SelectValue and Field.SelectChevron. The Field.SelectPositioner uses sideOffset 5 and the Field.SelectPopup matchTriggerWidth; each row is a Field.SelectItem with Field.SelectItemText and an empty Field.SelectItemIndicator. The scene shows the filter alone and leaves out the search field, the reset filter button and the solution count.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Field`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `profile`: `no-padding`
- `paint`: `text`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Field** — Label-less Field at scale "sm" with the "status-filter" class that places the select in the output toolbar. Selector: `[class~="aui-field"]`.
2. **Trigger** — Full-width trigger labelled "Product status" for assistive tech only, in the kit default style (no surface or fixed colour). Selector: `[class~="aui-select-trigger"]`.
3. **Value** — Shows "Passed products", the default status filter. Selector: `[class~="aui-select-value"]`. Direct text is highlighted.
4. **Chevron** — The chevron at the trigger end. Selector: `[class~="aui-select-chevron"]`.
5. **Popup** — Popup of the trigger width placed 5px below it, offering Passed, Failed and All products. Selector: `[class~="aui-select-popup"]`.
6. **List** — The list of the three status rows. Selector: `[class~="aui-select-list"]`.
7. **Item** — A status row; the chosen one is marked by a raised fill. Selector: `[class~="aui-select-item"]`.
8. **Item text** — The status wording, such as "Failed products". Selector: `[class~="aui-select-item-text"]`.
9. **Indicator** — Empty indicator slot at the row end. Selector: `[class~="aui-select-item-indicator"]`.

## Component layer steps

1. **Field** — Label-less Field at scale "sm" with the "status-filter" class that places the select in the output toolbar. Selector: `[class~="aui-field"]`.
2. **Trigger** — Full-width trigger labelled "Product status" for assistive tech only, in the kit default style (no surface or fixed colour). Selector: `[class~="aui-select-trigger"]`.
3. **Chevron** — The chevron at the trigger end. Selector: `[class~="aui-select-chevron"]`.
4. **Popup** — Popup of the trigger width placed 5px below it, offering Passed, Failed and All products. Selector: `[class~="aui-select-popup"]`.
5. **List** — The list of the three status rows. Selector: `[class~="aui-select-list"]`.
6. **Item** — A status row; the chosen one is marked by a raised fill. Selector: `[class~="aui-select-item"]`.
7. **Item text** — The status wording, such as "Failed products". Selector: `[class~="aui-select-item-text"]`.
8. **Indicator** — Empty indicator slot at the row end. Selector: `[class~="aui-select-item-indicator"]`.

## Apps

- FD (`fd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Status filter (`fd-status-filter`)

Apps: FD

In context source: FD: `src/components/Results.jsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/select/Select-009/example.tsx`

```tsx
import { Field } from '../../../kit';

export default function Example() {
  return (
    <Field className="status-filter" aui={{ scale: 'sm' }}>
      <Field.Select
        defaultValue="passed"
        items={[
          { label: 'Passed products', value: 'passed' },
          { label: 'Failed products', value: 'failed' },
          { label: 'All products', value: 'all' },
        ]}
      >
        <Field.SelectTrigger aria-label="Product status" aui={{ sx: { width: 'full' } }}>
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner sideOffset={5}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectItem value="passed">
                  <Field.SelectItemText>Passed products</Field.SelectItemText>
                  <Field.SelectItemIndicator />
                </Field.SelectItem>
                <Field.SelectItem value="failed">
                  <Field.SelectItemText>Failed products</Field.SelectItemText>
                  <Field.SelectItemIndicator />
                </Field.SelectItem>
                <Field.SelectItem value="all">
                  <Field.SelectItemText>All products</Field.SelectItemText>
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

#### In context source — `src/usecase-gallery/usecases/select/Select-009/options/fd-status-filter/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The product status filter of the FD output toolbar (src/components/Results.jsx, the status-filter Field, shown when a design has failed products): a label-less Field with a full-width trigger in the kit's default
// style (no surface or fixed colour) and a popup matching its width, placed 5px below. Built open and non-modal (container={host}, positioner ug-anchored).
// Left out: the search field, the reset filter button and the solution count of the toolbar.
export default function FdStatusFilterScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field className="status-filter" aui={{ scale: 'sm' }}>
        <Field.Select open
          defaultValue="passed"
          items={[
            { label: 'Passed products', value: 'passed' },
            { label: 'Failed products', value: 'failed' },
            { label: 'All products', value: 'all' },
          ]}
        >
          <Field.SelectTrigger aria-label="Product status" aui={{ sx: { width: 'full' } }}>
            <Field.SelectValue />
            <Field.SelectChevron />
          </Field.SelectTrigger>
          <Field.SelectPortal container={host}>
            <Field.SelectPositioner sideOffset={5} className="ug-anchored">
              <Field.SelectPopup matchTriggerWidth>
                <Field.SelectList>
                  <Field.SelectItem value="passed">
                    <Field.SelectItemText>Passed products</Field.SelectItemText>
                    <Field.SelectItemIndicator />
                  </Field.SelectItem>
                  <Field.SelectItem value="failed">
                    <Field.SelectItemText>Failed products</Field.SelectItemText>
                    <Field.SelectItemIndicator />
                  </Field.SelectItem>
                  <Field.SelectItem value="all">
                    <Field.SelectItemText>All products</Field.SelectItemText>
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

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
