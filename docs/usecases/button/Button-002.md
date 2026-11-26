# Button-002: Download CSV button

Component family: **Button**

UI type: **Single button**

Source: `src/usecase-gallery/usecases/button/Button-002/usecase.ts`

## What it is

A quiet text Button with a leading icon runs one action in a toolbar: a CSV icon downloads the rows.

## When to choose it

Use it for one-click export of the rows the table shows. Keep Download CSV last in the toolbar so the filters read first, and disable it while the table has no rows (HS and RWS do; PFD always enables it).

## Where it belongs

The last item of the toolbar row above the Output table, after the search field and the result count. Real site source: PFD src/pfd/ResultsTable.tsx, HS src/hs/ResultsTable.tsx and RWS src/rws/output.tsx (ResultToolbar), the same Button in all three; HCS only has an export in dead code, and ACE, ADM, PBS, FD, AGPD and ADC have none. The scroll helpers that share this look sit as a pair in the Output header: see the Button group Button-027.

## Usage guidance

Set aui color "secondary", paint "text", scale "sm" and shape "soft" (profile "default"), with a Button.Icon "file-csv" before the label, and sx flex "none" so it never shrinks in the wrapping row (RWS writes the label in capitals, DOWNLOAD CSV, and the Button is the same). The example and the scene render this one Button. The scene shows the toolbar row of PFD, HS and RWS: sm controls with gap 8 that wrap, the search field filling the line, the muted count, then the button. Left out: Reset filters (PFD, HS), the Show Optimized Models switch (RWS), the product filter, the table and the notes.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Field`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `secondary`
- `paint`: `text`
- `scale`: `sm`
- `shape`: `soft`
- `profile`: `default`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Container** — The Download CSV Button: secondary text paint, scale "sm", soft shape and flex "none" so it never shrinks in the wrapping toolbar row after the search field and count. Selector: `[class~="aui-button"]`.
2. **Icon** — The CSV file glyph that sits before the label and tells the export format. Selector: `[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])`.
3. **Label** — The label "Download CSV" (written in capitals in RWS) that exports the rows the table shows. Selector: `[class~="aui-button"]`. Direct text is highlighted.

## Component layer steps

1. **Container** — Small secondary Download CSV stays fixed after search and count. Selector: `[class~="aui-button"]`.
2. **Icon** — CSV glyph identifies the downloaded file format for users. Selector: `[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])`.

## Apps

- PFD (`pfd`)
- HS (`hs`)
- RWS (`rws`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Table toolbar (`pfd-toolbar`)

Apps: PFD, HS, RWS

In context source: PFD: `src/pfd/ResultsTable.tsx`; HS: `src/hs/ResultsTable.tsx`; RWS: `src/rws/output.tsx`

In context view: Shown.

#### In context structure additions

1. **Output toolbar** — The wrapping row of small controls (8px gap) with the search field first, the count next and Download CSV last. Part marker: `data-ug-part="toolbar"`.
2. **Search field** — The Search Table Field with a magnifying-glass icon that fills the line. Part marker: `data-ug-part="search"`.
3. **Result count** — The muted "Showing 1 entry" status text before Download CSV. Part marker: `data-ug-part="count"`.

#### In context layer steps

1. **Output toolbar** — Wrapping toolbar places search, count, and Download CSV with 8px gaps. Selector: `[data-ug-part="toolbar"]`.
2. **Search field** — The Search Table Field with a magnifying-glass icon that fills the line. Selector: `[data-ug-part="search"]`.
3. **Result count** — The muted "Showing 1 entry" status text before Download CSV. Selector: `[data-ug-part="count"]`.
4. **Container** — Small secondary Download CSV stays fixed after search and count. Selector: `[class~="aui-button"]`.
5. **Icon** — CSV glyph identifies the downloaded file format for users. Selector: `[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-002/example.tsx`

```tsx
import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button aui={{ color: 'secondary', paint: 'text', scale: 'sm', shape: 'soft', sx: { flex: 'none' } }}>
      <Button.Icon name="file-csv" />
      Download CSV
    </Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-002/options/pfd-toolbar/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, Type, View } from '../../../../../kit';

// The Output toolbar of PFD (ResultsTable.tsx), HS (ResultsTable.tsx) and RWS (output.tsx ResultToolbar): one wrapping row of sm controls (gap 8), the search field filling
// the line, the muted count, then Download CSV last. HS and RWS render it disabled while the table has no rows (the native disabled attribute). PFD and HS also hold Reset filters
// before the count, RWS a Show Optimized Models switch; both, and the table, are left out.
export default function PfdToolbarScene({ children }: ContextProps) {
  return (
    <View data-ug-part="toolbar" aui={{ scale: 'sm', profile: 'default', paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', flexWrap: 'wrap' } }} style={{ inlineSize: 'min(100%, 560px)' }}>
      <Field data-ug-part="search" style={{ minWidth: 112 }} aui={{ scale: 'sm', sx: { flex: 'fill' } }}>
        <Field.Control>
          <Field.Icon name="magnifying-glass" />
          <Field.Input aria-label="Search Table" placeholder="Search Table" />
        </Field.Control>
      </Field>
      <Type color="muted" aui={{ sx: { margin: '0', fontSize: '12', flex: 'none' } }}>
        <View data-ug-part="count" as="span" role="status" aui={{ paint: 'text', sx: { display: 'inline' } }}>Showing 1 entry</View>
      </Type>
      {children}
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
