# Button-027: Back to top and Table Notes buttons

Component family: **Button**

UI type: **Button group**

Source: `src/usecase-gallery/usecases/button/Button-027/usecase.ts`

## What it is

Two quiet text Buttons with a leading icon sit together in a header: an arrow jumps to the top of a long table and another down to its notes.

## When to choose it

Use it for in-page jumps in a long scrolling view, showing each one only when it applies with an aria-label that names the target.

## Where it belongs

The first two items of the Output pane header action group, shown only while the pane is scrolled (they do not float over the table). Real site source: HCS (Back to top, Table Notes), built from src/useOutputNavigation.tsx (thresholds, labels) and the Output pane header in src/App.tsx; PFD, PBS, HS, FD, AGPD and RWS write the same pair in their own useOutputNavigation / outputNavigation file and place it first in their Output header action group (PFD: the only items of its plain header; the others: the start of the action group at the end of their header). ACE, ADM and ADC have no scroll helpers. The lone Download CSV Button of the table toolbar is the Single button Button-002.

## Usage guidance

Set aui color "secondary", paint "text" and scale "sm" (profile "default") on both Buttons, each with a Button.Icon before the label: arrow-up for Back to top and arrow-down for Table Notes. HCS, PFD, PBS, HS, FD, AGPD and RWS write the same Buttons. They are the first two items of the Output header action group, shown as they are once the results are scrolled: the apps reveal Back to top after 80px of scroll (hides below 20px) and Table Notes while the notes heading is below the pane, and all seven turn both into square icon Buttons with a Tooltip carrying the same label when the labels do not fit the header row (this scene shows the labelled state). The Print Output Button after them in the scene is HCS's neighbour (PFD, PBS, AGPD and RWS print from the menubar, and HS and FD put Configure columns (HS also Fullscreen) between them and Print); Configure columns and the table are left out.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `secondary`, `surface`, `surface-alt`
- `paint`: `fixed`, `text`, `tonal`
- `scale`: `sm`
- `profile`: `block-padding`, `default`, `no-padding`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Back to top** — Secondary text button that scrolls to the top of the long table; its accessible name matches the visible label. Selector: `[class~="aui-button"][aria-label="Back to top"]`.
2. **Arrow-up icon** — The arrow-up glyph that shows the direction of the jump. Selector: `[class~="aui-button"][aria-label="Back to top"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
3. **Table Notes** — Secondary text button that jumps down to the table notes; its accessible name "Jump to table notes" is longer than the visible Table Notes label. Selector: `[class~="aui-button"][aria-label="Jump to table notes"]`.
4. **Arrow-down icon** — The arrow-down glyph that points toward the notes below the table. Selector: `[class~="aui-button"][aria-label="Jump to table notes"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
5. **Print Output** — HCS Output header only: the tonal surface Print Output button with a print icon that sits right after the two jump buttons. Selector: `[class~="aui-button"]:not([aria-label])`.

## Component layer steps

1. **Back to top** — Secondary text button that scrolls to the top of the long table; its accessible name matches the visible label. Selector: `[class~="aui-button"][aria-label="Back to top"]`.
2. **Arrow-up icon** — The arrow-up glyph that shows the direction of the jump. Selector: `[class~="aui-button"][aria-label="Back to top"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
3. **Table Notes** — Secondary text button that jumps down to the table notes; its accessible name "Jump to table notes" is longer than the visible Table Notes label. Selector: `[class~="aui-button"][aria-label="Jump to table notes"]`.
4. **Arrow-down icon** — The arrow-down glyph that points toward the notes below the table. Selector: `[class~="aui-button"][aria-label="Jump to table notes"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
5. **Print Output** — HCS Output header only: the tonal surface Print Output button with a print icon that sits right after the two jump buttons. Selector: `[class~="aui-button"]:not([aria-label])`.

## Apps

- HCS (`hcs`)
- PFD (`pfd`)
- PBS (`pbs`)
- HS (`hs`)
- FD (`fd`)
- AGPD (`agpd`)
- RWS (`rws`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Output header (`hcs-output-header`)

Apps: HCS, PFD, PBS, HS, FD, AGPD, RWS

In context source: HCS: `src/useOutputNavigation.tsx`; PFD: `src/pfd/useOutputNavigation.tsx`; PBS: `src/useOutputNavigation.tsx`; HS: `src/hs/useOutputNavigation.tsx`; FD: `src/components/useOutputNavigation.jsx`; AGPD: `src/agpd/outputNavigation.tsx`; RWS: `src/rws/outputNavigation.tsx`

In context view: Shown.

#### In context structure additions

1. **Output pane** — The surface-alt Output section that frames the header row. Selector: `[data-ug-part="output-pane"]`.
2. **Output title** — The semi-bold Output heading at the start of the header row. Selector: `[data-ug-part="output-title"]`.
3. **Header actions** — The end-aligned group with the two scroll helpers followed by the tonal Print Output button, wrapping when space runs out. Selector: `[data-ug-part="header-actions"]`.

#### In context layer steps

1. **Output pane** — The surface-alt Output section that frames the header row. Selector: `[data-ug-part="output-pane"]`.
2. **Output title** — The semi-bold Output heading at the start of the header row. Selector: `[data-ug-part="output-title"]`.
3. **Header actions** — The end-aligned group with the two scroll helpers followed by the tonal Print Output button, wrapping when space runs out. Selector: `[data-ug-part="header-actions"]`.
4. **Back to top** — Secondary text button that scrolls to the top of the long table; its accessible name matches the visible label. Selector: `[class~="aui-button"][aria-label="Back to top"]`.
5. **Arrow-up icon** — The arrow-up glyph that shows the direction of the jump. Selector: `[class~="aui-button"][aria-label="Back to top"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
6. **Table Notes** — Secondary text button that jumps down to the table notes; its accessible name "Jump to table notes" is longer than the visible Table Notes label. Selector: `[class~="aui-button"][aria-label="Jump to table notes"]`.
7. **Arrow-down icon** — The arrow-down glyph that points toward the notes below the table. Selector: `[class~="aui-button"][aria-label="Jump to table notes"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
8. **Print Output** — HCS Output header only: the tonal surface Print Output button with a print icon that sits right after the two jump buttons. Selector: `[class~="aui-button"]:not([aria-label])`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-027/example.tsx`

```tsx
import { Button } from '../../../kit';

export default function Example() {
  return (
    <>
      <Button
        aria-label="Back to top"
        aui={{ color: 'secondary', paint: 'text', scale: 'sm' }}
      >
        <Button.Icon name="arrow-up" />
        Back to top
      </Button>
      <Button
        aria-label="Jump to table notes"
        aui={{ color: 'secondary', paint: 'text', scale: 'sm' }}
      >
        <Button.Icon name="arrow-down" />
        Table Notes
      </Button>
    </>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-027/options/hcs-output-header/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Type, View } from '../../../../../kit';

// The Output header with the scroll helpers shown: both appear only past their scroll thresholds (Back to top from 80px of scroll,
// Table Notes while the notes heading is below the pane) and are the first items of the action group, before Print Output.
// In the app they turn icon-only when the labels do not fit the header row.

export default function HcsOutputHeaderScene({ children }: ContextProps) {
  return (
    <View
      data-ug-part="output-pane"
      as="section"
      aria-label="Output"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 720px)' }}
    >
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', minHeight: '28', flex: 'none', paddingBlockStart: '0', paddingBlockEnd: '0' } }}>
        <Type data-ug-part="output-title" as="h2" role="l3" weight="semi-bold" aui={{ sx: { display: 'flex', alignItems: 'center', minHeight: '28' } }}>Output</Type>
        <View data-ug-part="header-actions" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', justifyContent: 'end', flexWrap: 'wrap', gap: '6', minHeight: '28' } }} style={{ marginInlineStart: 'auto' }}>
          {children}
          <Button aui={{ scale: 'sm', color: 'surface', paint: 'tonal', sx: { flex: 'none' } }}>
            <Button.Icon name="print" aui={{ scale: 'sm' }} />
            Print Output
          </Button>
        </View>
      </View>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
