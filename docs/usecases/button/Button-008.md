# Button-008: Reset filters button

Component family: **Button**

UI type: **Single button**

Source: `src/usecase-gallery/usecases/button/Button-008/usecase.ts`

## What it is

A neutral default Button clears the active filters of a results table; FD draws it as a quiet text Button.

## When to choose it

Use it beside filter controls, shown only while a filter is active (a search, a status filter or a custom sort in FD). Prefer the plain default Button where clearing filters is a quiet action; FD keeps it as a borderless text Button to match its other toolbar actions.

## Where it belongs

The toolbar row above the Output table, after the search field and before the result count and the product or status filter (left out of the scene). Real site source: HCS (Reset filters, App.tsx); PFD ResultsTable.tsx and HS ResultsTable.tsx write the same Button in the same row; FD Results.jsx writes a text Button in its toolbar. ACE, ADM, PBS, AGPD, RWS and ADC have no Reset filters Button.

## Usage guidance

The example is the HCS Button: set only aui scale "sm" (color "surface-alt" and paint "solid" are the defaults), with Button.Icon filter-circle-xmark (scale "sm") before the label. The preview groups the apps by distinct UI and the Document lists the same groups. HCS, PFD, HS: the Output toolbar is one wrapping row, the search field fills the line, then the button (rendered only while a filter is active); the three write the same Button and row. FD: the same row, but the Button is aui color "secondary", paint "text", scale "sm", shape "soft" with a plain filter-circle-xmark icon. The pane header actions, the muted result count, the product filter, the results table and Table Notes are left out.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Field`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `profile`: `block-padding`, `default`
- `color`: `secondary`, `surface-alt`
- `paint`: `fixed`, `text`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Container** — The Reset filters Button in the table toolbar: small and default gray in HCS, a borderless secondary text Button in FD. Selector: `[class~="aui-button"]`. Layer step: **Container** — Small Reset filters button removes the active table filters.
2. **Icon** — The filter glyph with a cross that signals removing the active filters, at scale "sm". Selector: `[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])`. Layer step: **Icon** — Filter glyph with a cross signals that active filters will clear.
3. **Label** — The text "Reset filters" shown while a search or status filter is active. Selector: `[class~="aui-button"]`. Direct text is highlighted.

## Apps

- HCS (`hcs`)
- PFD (`pfd`)
- HS (`hs`)
- FD (`fd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Toolbar (`hcs-toolbar`)

Apps: HCS, PFD, HS

In context source: HCS: `src/App.tsx`; PFD: `src/pfd/ResultsTable.tsx`; HS: `src/hs/ResultsTable.tsx`

In context view: Shown.

#### In context structure additions

1. **Output pane** — The Output pane frame, a surface-alt section cut to its title and toolbar. Part marker: `data-ug-part="output-pane"`. Layer step: **Output pane** — Surface-alt Output pane includes its title and toolbar.
2. **Output title** — The "Output" heading at the start of the pane header. Part marker: `data-ug-part="output-title"`. Layer step: **Output title** — The "Output" heading at the start of the pane header.
3. **Output toolbar** — The wrapping row of small controls (8px gap) with the search field filling the line and Reset filters after it. Part marker: `data-ug-part="toolbar"`. Layer step: **Output toolbar** — Toolbar row places search before Reset filters with 8px gaps.
4. **Search field** — The Field with a magnifying-glass icon, the entered text "Model" and a clear (x) button. Part marker: `data-ug-part="search"`. Layer step: **Search field** — Magnifier Field contains Model and a clear X button.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-008/example.tsx`

```tsx
import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button aui={{ scale: 'sm' }}>
      <Button.Icon name="filter-circle-xmark" aui={{ scale: 'sm' }} />
      Reset filters
    </Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-008/options/hcs-toolbar/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, Type, View } from '../../../../../kit';

// HCS, PFD and HS Output pane cut to its toolbar (HCS App.tsx, PFD ResultsTable.tsx, HS ResultsTable.tsx): one wrapping row, the search field filling the line and Reset filters after
// it (only while a filter is active). The header actions, count, product filter, table and notes are left out.
export default function HcsToolbarScene({ children }: ContextProps) {
  return (
    <View
      as="section"
      data-ug-part="output-pane"
      aria-label="Output"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 560px)' }}
    >
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', alignItems: 'center', minHeight: '28', flex: 'none', paddingBlockStart: '0', paddingBlockEnd: '0' } }}>
        <Type data-ug-part="output-title" as="h2" role="l3" weight="semi-bold">Output</Type>
      </View>
      <View data-ug-part="toolbar" aui={{ scale: 'sm', profile: 'default', paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', flexWrap: 'wrap' } }}>
        <Field data-ug-part="search" style={{ minWidth: 112 }} aui={{ scale: 'sm', sx: { flex: 'fill' } }}>
          <Field.Control>
            <Field.Icon name="magnifying-glass" />
            <Field.Input aria-label="Search connector models" placeholder="Search connector models..." defaultValue="Model" />
            <Field.Button aria-label="Clear search">
              <Field.ButtonIcon name="xmark" />
            </Field.Button>
          </Field.Control>
        </Field>
        {children}
      </View>
    </View>
  );
}
```

### 2. Text reset button (`fd-toolbar`)

Apps: FD

In context source: FD: `src/components/Results.jsx`

In context view: Shown.

#### In context structure additions

1. **Output pane** — The Output pane frame, a surface-alt section cut to its title and toolbar. Part marker: `data-ug-part="output-pane"`. Layer step: **Output pane** — Surface-alt Output pane includes its title and toolbar.
2. **Output title** — The "Output" heading at the start of the pane header. Part marker: `data-ug-part="output-title"`. Layer step: **Output title** — The "Output" heading at the start of the pane header.
3. **Output toolbar** — The wrapping row of small controls (8px gap) with the search field filling the line and Reset filters after it. Part marker: `data-ug-part="toolbar"`. Layer step: **Output toolbar** — Toolbar row places search before Reset filters with 8px gaps.
4. **Search field** — The Field with a magnifying-glass icon, the entered text "Model" and a clear (x) button. Part marker: `data-ug-part="search"`. Layer step: **Search field** — Magnifier Field contains Model and a clear X button.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-008/options/fd-toolbar/example.tsx`

```tsx
import { Button } from '../../../../../kit';

export default function Example() {
  return (
    <Button aui={{ color: 'secondary', paint: 'text', scale: 'sm', shape: 'soft' }}>
      <Button.Icon name="filter-circle-xmark" />
      Reset filters
    </Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-008/options/fd-toolbar/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Field, Type, View } from '../../../../../kit';

// The FD Output toolbar (Results.jsx): the same wrapping row, search field filling the line, but Reset filters is a secondary text Button (soft, sm, no icon scale)
// instead of the default gray solid one, and the app renders it while a search, a status filter or a custom sort is active. This scene writes its own Button, so the
// example is not spliced in. The header actions, the status select, the count, the table and the notes are left out.
export default function FdToolbarScene(_props: ContextProps) {
  return (
    <View
      as="section"
      data-ug-part="output-pane"
      aria-label="Output"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 560px)' }}
    >
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', alignItems: 'center', minHeight: '28', flex: 'none', paddingBlockStart: '0', paddingBlockEnd: '0' } }}>
        <Type data-ug-part="output-title" as="h2" role="l3" weight="semi-bold">Output</Type>
      </View>
      <View data-ug-part="toolbar" aui={{ scale: 'sm', profile: 'default', paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', flexWrap: 'wrap' } }}>
        <Field data-ug-part="search" style={{ minWidth: 112 }} aui={{ scale: 'sm', sx: { flex: 'fill' } }}>
          <Field.Control>
            <Field.Icon name="magnifying-glass" />
            <Field.Input aria-label="Search solutions" placeholder="Search" defaultValue="Model" />
            <Field.Button aria-label="Clear search">
              <Field.ButtonIcon name="xmark" />
            </Field.Button>
          </Field.Control>
        </Field>
        <Button aui={{ color: 'secondary', paint: 'text', scale: 'sm', shape: 'soft' }}>
          <Button.Icon name="filter-circle-xmark" />
          Reset filters
        </Button>
      </View>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
