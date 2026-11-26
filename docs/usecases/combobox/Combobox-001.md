# Combobox-001: Searchable select

Component family: **Combobox**

UI type: **Combobox**

Source: `src/usecase-gallery/usecases/combobox/Combobox-001/usecase.ts`

## What it is

A select you can type into: the text field filters the list, a chevron opens it, and the chosen option is ticked.

## When to choose it

Use it for a long list the user can search. Use a Select for a short list and a Field for free text.

## Where it belongs

The country picker of the FD licence gate (src/components/LicenseGate.jsx).

## Usage guidance

`Combobox` with `items`, `value`, `itemToStringLabel` and `onValueChange`; `Combobox.InputGroup` (`scale: "sm"`, `width: "fill"`) holds `Combobox.Input` and `Combobox.Trigger` with `Combobox.Icon` chevron-down; `Combobox.Portal` > `Combobox.Positioner` (`side="bottom"`, `sideOffset={4}`) > `Combobox.Popup` (`matchTriggerWidth`) with `Combobox.Empty` and a `Combobox.List` of `Combobox.Item`s ending in `Combobox.ItemIndicator`. FD groups the list by region with `Combobox.Group`, `GroupLabel` and `Collection`, and shows a flag before each label; the example keeps a flat list. A `Field.Label` sits above.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Combobox`, `Dialog`, `Field`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `raised`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Field** — Field at scale "sm" with a 3 gap that stacks the Country label over the combobox. Selector: `[class~="aui-field"]`.
2. **Label** — The "Country" label above the input group. Selector: `[class~="aui-field-label"]`.
3. **Input group** — Row at scale "sm", full width, that joins the text field and the chevron button into one control. Selector: `[class~="aui-combobox-input-group"]`.
4. **Input** — The search field with placeholder "Search"; typing filters Canada, Mexico and United States, and the chosen "Canada" fills it. Selector: `[class~="aui-combobox-input"]`.
5. **Trigger** — The button at the end of the group that opens or closes the country list. Selector: `[class~="aui-combobox-trigger"]`.
6. **Icon** — The chevron-down glyph inside the trigger button. Selector: `[class~="aui-combobox-icon"]`.
7. **Popup** — Popup of the trigger width, 4px below the group; this example is built open and non-modal inside the stage. Selector: `[class~="aui-combobox-popup"]`.
8. **Empty** — The "No result found" message shown when the typed text matches no country. Selector: `[class~="aui-combobox-empty"]`.
9. **List** — The list that renders one row per matching country. Selector: `[class~="aui-combobox-list"]`.
10. **Item** — A country row; its label is the item text and the chosen row is highlighted. Selector: `[class~="aui-combobox-item"]`.
11. **Item indicator** — The tick that marks the chosen country row. Selector: `[class~="aui-combobox-item-indicator"]`.

## Apps

- FD (`fd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Country picker (`fd-license-country`)

Apps: FD

In context source: FD: `src/components/LicenseGate.jsx`

In context view: Shown.

#### In context structure additions

1. **License Agreement dialog** — The non-modal Dialog that hosts the picker in the FD licence gate: a raised "License Agreement" title and a body about 14 rows tall that holds the Country field. Selector: `[class~="aui-dialog-popup"]`.
2. **Dialog body** — The body of the licence dialog; the whole Country combobox sits inside it. Selector: `[class~="aui-dialog-body"]`.

#### Component UI source — `src/usecase-gallery/usecases/combobox/Combobox-001/example.tsx`

```tsx
import { Combobox, Field } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
      <Field.Label aui={{ scale: 'sm' }}>Country</Field.Label>
      <Combobox items={['Canada', 'Mexico', 'United States']} defaultValue="Canada" open modal={false}>
        <Combobox.InputGroup aui={{ scale: 'sm', sx: { width: 'fill' } }}>
          <Combobox.Input placeholder="Search" aria-label="Country" />
          <Combobox.Trigger>
            <Combobox.Icon name="chevron-down" />
          </Combobox.Trigger>
        </Combobox.InputGroup>
        <Combobox.Portal container={host}>
          <Combobox.Positioner side="bottom" sideOffset={4} className="ug-anchored">
            <Combobox.Popup matchTriggerWidth aui={{ scale: 'sm' }}>
              <Combobox.Empty>No result found</Combobox.Empty>
              <Combobox.List>
                {(option: string) => (
                  <Combobox.Item key={option} value={option}>
                    {option}
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox>
    </Field>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/combobox/Combobox-001/options/fd-license-country/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog } from '../../../../../kit';

// FD LicenseGate (src/components/LicenseGate.jsx): the licence dialog asks for the country with a searchable Combobox (a Field.Label above, the list matching the trigger width, grouped by region with flags in the app). The scene shows the Combobox in the dialog body with a flat list.
export default function FdLicenseCountryScene({ children, host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>License Agreement</Dialog.Title>
            <Dialog.Body style={{ minBlockSize: 'calc(var(--p-px-16) * 14)' }}>
              {children}
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
