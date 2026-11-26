# Tabs-002: Phone workspace tabs

Component family: **Tabs**

UI type: **Segmented tabs**

Source: `src/usecase-gallery/usecases/tabs/Tabs-002/usecase.ts`

## What it is

The one top-level switch of a phone workspace: a full-width row of tab chips at the top, one tab per pane with short labels on one line.

## When to choose it

Use it as the one top-level switch of a phone workspace, one tab per pane. Use Tabs-001 in a pane header on desktop and tablet; use Tabs-003 when each tab reports a pass or fail.

## Where it belongs

The full-width workspace row at the top of the phone layout (below 768px) in PFD, HS, AGPD, FD, ADM, ACE and PBS, above the one visible panel; HCS and RWS have no phone tab row.

## Usage guidance

The same chips as the pane tabs (a Tabs root with a Tabs.List of Tabs.Tab chips, each Tab color "surface-alt", paint "solid", shape "soft", selected { color: "overlay", paint: "solid" }), as a full-width row (fill) at the top of the phone column, edge to edge. PFD, HS, AGPD, FD: one group. The Tabs.List has overflow "shrink" and aui sx gap "0" and flex "none", the Tab chips an aui sx whiteSpace "nowrap", inside a View.ScrollArea with no scrollbar (measured at 300px: selected 160px, others 64px, no gap). FD gives the List flex "fill" and a span around each label, which render the same; HS adds 3D VIEWER and JOB LIST tabs and AGPD disables its tabs until the licence is accepted, which is content and state; FD writes a trailing Reset IconButton beside the row, left out here. ADM, ACE: the same row with a Tabs.AddButton at the end of the List (name "rotate-right", aria-label Reset, a 28x28 square chip) that opens the Reset confirmation, so the button set differs; each label is a span. ACE leaves the List gap at the 6px default where ADM sets "0", an app-side deviation merged into the ADM standard (measured 6px against 0px). PBS: the width differs, fit instead of fill. The List has no overflow "shrink", so every tab keeps its natural width and the wrapping View scrolls the row (measured at 300px: the row stays 435px wide instead of shrinking the tabs to 64px), with the 6px List gap; PBS also puts a Refresh IconButton before the tabs, left out here. Left out of the scenes: the panel bodies and every disabled state.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Tabs`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `profile`: `no-padding`
- `paint`: `text`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Tabs** — Top-level phone switch with no padding, spanning the viewport width (390px in the scenes). ADM, PBS and PFD start on Input. Selector: `[class~="aui-tabs"]`.
2. **List** — One-line row of pane chips; in the ADM and PFD scenes it uses overflow="shrink" with gap 0 and scrolls horizontally when the labels do not fit. Selector: `[class~="aui-tabs-list"]`.
3. **Tab** — One chip per pane with a short label (Summary and Result, or Input and Output in the scenes), kept on one line with whiteSpace nowrap. Selector: `[class~="aui-tabs-tab"]`.
4. **Reset button** — ADM only: a trailing rotate-right icon button labelled "Reset" at the end of the list. Selector: `[class~="aui-tabs-add-button"]`.
5. **Panel** — The pane shown for the selected tab, "Summary content" or "Result content". Selector: `[class~="aui-tabs-panel"]`.

## Apps

- PFD (`pfd`)
- HS (`hs`)
- AGPD (`agpd`)
- FD (`fd`)
- ADM (`adm`)
- ACE (`ace`)
- PBS (`pbs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Phone workspace tabs (`pfd-phone-tabs`)

Apps: PFD, HS, AGPD, FD

In context source: PFD: `src/pfd/Workspace.tsx`; HS: `src/App.tsx`; AGPD: `src/App.tsx`; FD: `src/App.jsx`

Note: The row fills the phone width and shrinks its tabs.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/tabs/Tabs-002/example.tsx`

```tsx
import { Tabs, View } from '../../../kit';

export default function Example() {
  return (
    <Tabs defaultValue="input" aui={{ profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 390px)' }}>
      <View.ScrollArea aui={{ paint: 'text', profile: 'no-padding', sx: { flex: 'none' } }}>
        <View.ScrollAreaViewport style={{ overflowY: 'hidden' }}>
          <Tabs.List overflow="shrink" aui={{ sx: { gap: '0', flex: 'none' } }}>
            <Tabs.Tab value="input" aui={{ sx: { whiteSpace: 'nowrap' } }}>Input</Tabs.Tab>
            <Tabs.Tab value="output" aui={{ sx: { whiteSpace: 'nowrap' } }}>Output</Tabs.Tab>
          </Tabs.List>
        </View.ScrollAreaViewport>
      </View.ScrollArea>
      <Tabs.Panel value="input">Input content</Tabs.Panel>
      <Tabs.Panel value="output">Output content</Tabs.Panel>
    </Tabs>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/tabs/Tabs-002/options/pfd-phone-tabs/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Tabs, View } from '../../../../../kit';

// PFD, HS, AGPD and FD phone workspace (PFD Workspace.tsx:201-221, HS App.tsx:876-919, AGPD App.tsx:555-593, FD App.jsx:954-1012): the tab row sits first in the phone column, edge to edge, in a ScrollArea whose viewport
// scrolls sideways with no scrollbar. Width: fill (the row spans the phone column and shrinks its tabs). The List keeps the built-in shrink overflow and no gap, every tab never wraps. AGPD disables the tabs until the licence is accepted and HS adds a fourth tab; the panels,
// FD's trailing Reset IconButton and the app headers are left out. The phone column is 390px wide.
export default function PfdPhoneTabsScene(_props: ContextProps) {
  return (
    <Tabs defaultValue="input" aui={{ profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 390px)' }}>
      <View.ScrollArea aui={{ paint: 'text', profile: 'no-padding', sx: { flex: 'none' } }}>
        <View.ScrollAreaViewport style={{ overflowY: 'hidden' }}>
          <Tabs.List overflow="shrink" aui={{ sx: { gap: '0', flex: 'none' } }}>
            <Tabs.Tab value="input" aui={{ sx: { whiteSpace: 'nowrap' } }}>Input</Tabs.Tab>
            <Tabs.Tab value="output" aui={{ sx: { whiteSpace: 'nowrap' } }}>Output</Tabs.Tab>
          </Tabs.List>
        </View.ScrollAreaViewport>
      </View.ScrollArea>
    </Tabs>
  );
}
```

### 2. Fitted phone tabs (`adm-phone-tabs`)

Apps: ADM, ACE

In context source: ADM: `src/app/layout/MobileWorkbench/MobileWorkbench.tsx`; ACE: `src/pages/estimator/EstimatorPage.tsx`

Note: The row fills the phone width and shrinks its tabs; a Reset button ends the row.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/tabs/Tabs-002/options/adm-phone-tabs/example.tsx`

```tsx
import { Tabs, View } from '../../../../../kit';

export default function Example() {
  return (
    <Tabs defaultValue="input" aui={{ profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 390px)' }}>
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', flex: 'none', width: 'fill', overflowX: 'auto', overflowY: 'hidden' } }}>
        <Tabs.List overflow="shrink" aui={{ sx: { gap: '0', flex: 'none' } }}>
          <Tabs.Tab value="input" aui={{ sx: { whiteSpace: 'nowrap' } }}><span>Input</span></Tabs.Tab>
          <Tabs.Tab value="output" aui={{ sx: { whiteSpace: 'nowrap' } }}><span>Output</span></Tabs.Tab>
          <Tabs.AddButton name="rotate-right" aria-label="Reset" />
        </Tabs.List>
      </View>
      <Tabs.Panel value="input">Input content</Tabs.Panel>
      <Tabs.Panel value="output">Output content</Tabs.Panel>
    </Tabs>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/tabs/Tabs-002/options/adm-phone-tabs/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Tabs, View } from '../../../../../kit';

// ADM and ACE phone workspace (ADM MobileWorkbench.tsx:88-116, ACE EstimatorPage.tsx:688-710 with ResetInputsAction.tsx): the same shrinking row as Tabs-001's phone workspace with a Tabs.AddButton at the end of the List,
// the rotate-right glyph labelled Reset, which the app opens a confirmation from. Each label is a span so the shrink overflow can ellipsize it. The row sits in a View that scrolls sideways (the apps hide its scrollbar with one class).
// Width: fill (the row spans the phone column and shrinks its tabs). ADM sets the List gap to "0", ACE leaves the 6px default (an app-side deviation); the scene is ADM's. The panels, the Reset dialog and the app headers are left out. The phone column is 390px wide.
export default function AdmPhoneTabsScene(_props: ContextProps) {
  return (
    <Tabs defaultValue="input" aui={{ profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 390px)' }}>
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', flex: 'none', width: 'fill', overflowX: 'auto', overflowY: 'hidden' } }}>
        <Tabs.List overflow="shrink" aui={{ sx: { gap: '0', flex: 'none' } }}>
          <Tabs.Tab value="input" aui={{ sx: { whiteSpace: 'nowrap' } }}><span>Input</span></Tabs.Tab>
          <Tabs.Tab value="output" aui={{ sx: { whiteSpace: 'nowrap' } }}><span>Output</span></Tabs.Tab>
          <Tabs.AddButton name="rotate-right" aria-label="Reset" />
        </Tabs.List>
      </View>
    </Tabs>
  );
}
```

### 3. Scrollable phone tabs (`pbs-phone-tabs`)

Apps: PBS

In context source: PBS: `src/App.tsx`

Note: Every tab keeps its natural width (fit) and the row scrolls sideways.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/tabs/Tabs-002/options/pbs-phone-tabs/example.tsx`

```tsx
import { Tabs, View } from '../../../../../kit';

export default function Example() {
  return (
    <Tabs defaultValue="input" aui={{ profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 390px)' }}>
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flex: 'fill', minWidth: '0', overflowX: 'auto', overflowY: 'hidden' } }}>
        <Tabs.List aui={{ sx: { flex: 'none' } }}>
          <Tabs.Tab value="input" aui={{ sx: { whiteSpace: 'nowrap' } }}>Input</Tabs.Tab>
          <Tabs.Tab value="output" aui={{ sx: { whiteSpace: 'nowrap' } }}>Output</Tabs.Tab>
        </Tabs.List>
      </View>
      <Tabs.Panel value="input">Input content</Tabs.Panel>
      <Tabs.Panel value="output">Output content</Tabs.Panel>
    </Tabs>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/tabs/Tabs-002/options/pbs-phone-tabs/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Tabs, View } from '../../../../../kit';

// PBS phone workspace (src/App.tsx:982-1056): the List has no overflow="shrink", so every tab keeps its natural width and the wrapping View (overflowX auto, scrollbar hidden by a class) scrolls the row sideways;
// the 6px List gap stays. Width: fit (natural tab widths), where the other phone rows fill the width. The leading Refresh IconButton, the panels and the app header are left out. The phone column is 390px wide.
export default function PbsPhoneTabsScene(_props: ContextProps) {
  return (
    <Tabs defaultValue="input" aui={{ profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 390px)' }}>
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flex: 'fill', minWidth: '0', overflowX: 'auto', overflowY: 'hidden' } }}>
        <Tabs.List aui={{ sx: { flex: 'none' } }}>
          <Tabs.Tab value="input" aui={{ sx: { whiteSpace: 'nowrap' } }}>Input</Tabs.Tab>
          <Tabs.Tab value="output" aui={{ sx: { whiteSpace: 'nowrap' } }}>Output</Tabs.Tab>
        </Tabs.List>
      </View>
    </Tabs>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
