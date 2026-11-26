# Field-004: Search field

Component family: **Field**

UI type: **Single-line field**

Source: `src/usecase-gallery/usecases/field/Field-004/usecase.ts`

## What it is

A search box with a magnifying-glass icon at the start and, in some apps, a clear button at the end.

## When to choose it

Use it to filter a table or a list by text as the user types. Add the clear button where the box is a table toolbar and the user may want to reset in one click; leave it off a short list search.

## Where it belongs

The table toolbar of HCS, HS, PFD, FD, PBS and RWS. The same icon-only box sits above the column list popovers (HS, HCS, FD) and the release notes of the About dialogs (HCS, HS, PBS, PFD, RWS).

## Usage guidance

Clear button (HCS, HS, PFD, FD): a Field at scale "sm" holds a Field.Control (28px outlined row) with a Field.Icon name "magnifying-glass", a Field.Input (placeholder "Search Table") and a Field.Button with aria-label "Clear search" holding a Field.ButtonIcon name "xmark" (20px, no fill). The kit shows the button only while the box has text, in every app, so the scene starts with a search term; an empty box looks like the icon-only group. The apps give the Field minWidth 112px and flex fill to share the toolbar row; the scene takes the host width. Icon only (PBS, RWS): the same field without the Field.Button; the input fills the row to its end. The apps show the field enabled. The scenes leave out the Reset filters button and the other toolbar controls (Button-008 and the table use cases cover them).

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Field`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `profile`: `no-padding`
- `paint`: `text`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Field** — The search wrapper at scale "sm"; the apps give it a minWidth of 112px and flex fill so it shares a toolbar row. Selector: `[class~="aui-field"]`.
2. **Control** — The 28px outlined row that holds the magnifying glass, the input and, in HCS, HS, PFD and FD, the clear button. Selector: `[class~="aui-field-control"]`.
3. **Search icon** — The leading magnifying-glass icon that marks the box as a search. Selector: `[class~="aui-field-control"] > [class~="aui-contained-icon"]`.
4. **Input** — The text input with the "Search Table" placeholder and aria-label, filling the rest of the row. Selector: `[class~="aui-field-control"] > [class~="aui-input"]`.
5. **Clear button** — The xmark button labelled "Clear search" at the end of the box; it only appears once the box has text, and PBS and RWS leave it out. Selector: `[class~="aui-field-button"]`.

## Component layer steps

1. **Field** — Small flexible search field shares the toolbar row; apps set 112px minimum. Selector: `[class~="aui-field"]`.
2. **Control** — Outlined 28px row holds search icon, input, and optional clear button. Selector: `[class~="aui-field-control"]`.
3. **Search icon** — The leading magnifying-glass icon that marks the box as a search. Selector: `[class~="aui-field-control"] > [class~="aui-contained-icon"]`.
4. **Input** — Search Table input fills remaining width and keeps its accessible name. Selector: `[class~="aui-field-control"] > [class~="aui-input"]`.
5. **Clear button** — End xmark appears after typing; PBS and RWS omit this clear action. Selector: `[class~="aui-field-button"]`.

## Apps

- HCS (`hcs`)
- HS (`hs`)
- PFD (`pfd`)
- FD (`fd`)
- PBS (`pbs`)
- RWS (`rws`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Search field (`hs-search`)

Apps: HCS, HS, PFD, FD

In context source: HCS: `src/App.tsx`; HS: `src/hs/ResultsTable.tsx`; PFD: `src/pfd/ResultsTable.tsx`; FD: `src/components/Results.jsx`

Note: The box ends with a clear button.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/field/Field-004/example.tsx`

```tsx
import { Field, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { flex: 'fill' } }}>
        <Field.Control>
          <Field.Icon name="magnifying-glass" />
          <Field.Input aria-label="Search Table" placeholder="Search Table" defaultValue="Plate" />
          <Field.Button aria-label="Clear search">
            <Field.ButtonIcon name="xmark" />
          </Field.Button>
        </Field.Control>
      </Field>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/field/Field-004/options/hs-search/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The table search of HS (src/hs/ResultsTable.tsx), the same field of HCS (src/App.tsx), PFD (src/pfd/ResultsTable.tsx) and FD (src/components/Results.jsx): a Field with one outlined control holding a Field.Icon (magnifying-glass), a Field.Input and a Field.Button with a Field.ButtonIcon (xmark) that clears the search.
// The kit shows the clear button only while the box has text (Field.Control stamps data-aui-filled; an empty box hides the button with visibility), so the scene starts with a mock search term and the button is visible; empty, this box looks like the second group. The apps set minWidth 112px and flex fill on the Field to share the toolbar row; the scene takes the host width instead.
// Left out: the Reset filters button and the other toolbar controls beside the field (Button-008 and the table use cases); the apps show the field enabled.
export default function HsSearchScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { flex: 'fill' } }}>
        <Field.Control>
          <Field.Icon name="magnifying-glass" />
          <Field.Input aria-label="Search Table" placeholder="Search Table" defaultValue="Plate" />
          <Field.Button aria-label="Clear search">
            <Field.ButtonIcon name="xmark" />
          </Field.Button>
        </Field.Control>
      </Field>
    </View>
  );
}
```

### 2. Icon-only search (`pbs-search`)

Apps: PBS, RWS

In context source: PBS: `src/ResultsSection.tsx`; RWS: `src/rws/output.tsx`

Note: Icon only: the box has no clear button.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/field/Field-004/options/pbs-search/example.tsx`

```tsx
import { Field, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { flex: 'fill' } }}>
        <Field.Control>
          <Field.Icon name="magnifying-glass" />
          <Field.Input aria-label="Search Table" placeholder="Search Table" />
        </Field.Control>
      </Field>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/field/Field-004/options/pbs-search/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The table search of PBS (src/ResultsSection.tsx), the same field of RWS (src/rws/output.tsx): the same Field with a Field.Icon (magnifying-glass) and a Field.Input, and no clear button.
// The icon-only field is also the search of the column list popovers (HS, HCS, FD) and of the release notes in the About dialogs (HCS, HS, PBS, PFD, RWS); those boxes render the same way.
// Left out: the Optimized switch and the other toolbar controls beside the field; the apps show the field enabled.
export default function PbsSearchScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { flex: 'fill' } }}>
        <Field.Control>
          <Field.Icon name="magnifying-glass" />
          <Field.Input aria-label="Search Table" placeholder="Search Table" />
        </Field.Control>
      </Field>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
