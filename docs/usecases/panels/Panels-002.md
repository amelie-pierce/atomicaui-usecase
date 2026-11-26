# Panels-002: Stacked

Component family: **Panels**

UI type: **Resizable split**

Source: `src/usecase-gallery/usecases/panels/Panels-002/usecase.ts`

## What it is

A Panels group stacks the workspace into surface panes, Input above and the results below, that the user resizes by dragging the horizontal handle between them.

## When to choose it

Use it for panes that share one workspace and that the user may want taller or shorter: a Panels group with a ResizeHandle between each pair of Panels.Panel. Stacked is the Grid layout, where Input sits above the workbench; the wide-width default is the side by side split (Panels-001). Do not use it for a fixed layout (a View row or column is enough) or for a pane that only opens and closes (a collapsible Panels.Panel, Panels-003).

## Where it belongs

The Grid (engineering) layout of HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS: the Input pane sits above the workbench (two panes and one handle). ADC has no stacked split. The collapse of the Input pane into a top rail is Panels-003; the header and rail buttons are Button-033 and Button-036.

## Usage guidance

The example is the split itself: a Panels (orientation "vertical", aui scale "sm") holding two Panels.Panel and a Panels.ResizeHandle between them. Each Panels.Panel has an id, a defaultSize on the first one and a minSize of 40px, and takes the pane frame props (profile "block-padding", scale "sm", color "surface-alt", paint "fixed", shape "soft", a flex column with minHeight "0" so it can shrink). The Panels.ResizeHandle has color "primary" and width "6px" and an aria-label that names the two panes; being in a vertical group it is a 6px horizontal line (measured 560 x 6 in the scene). All nine apps (HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS) write the same two soft surface-alt panes and the primary handle; the scene is HCS, cut to the two panes with their semi-bold titles. The scene leaves out the 200px minimum sizes of the app, the collapse props of the Input panel (Panels-003), the pane headers and contents, and the splitter drag.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Panels`, `Type`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `profile`: `block-padding`
- `color`: `surface-alt`
- `paint`: `fixed`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Panels** — Vertical split group that stacks the panes, 560px wide and 160px tall at most. Selector: `[class~="aui-panels"]`.
2. **Panel** — Input on top (50% default height) and Output below, both surface-alt soft panes that may shrink to 40px high. Selector: `[class~="aui-panels-panel"]`.
3. **Resize handle** — 6px primary horizontal bar between Input and Output; its label is "Resize Input and Output panels" in the example and "Resize Input and results panels" in the HCS scene. Selector: `[class~="aui-panels-resize-handle"]`.

## Component layer steps

1. **Panels** — Vertical split stacks both panes within a bounded workspace. Selector: `[class~="aui-panels"]`.
2. **Panel** — Input sits above Output; both soft panes can shrink independently. Selector: `[class~="aui-panels-panel"]`.
3. **Resize handle** — Six-pixel bar separates Input and Output; dragging reallocates height. Selector: `[class~="aui-panels-resize-handle"]`.

## Apps

- HCS (`hcs`)
- ACE (`ace`)
- ADM (`adm`)
- PFD (`pfd`)
- PBS (`pbs`)
- HS (`hs`)
- FD (`fd`)
- AGPD (`agpd`)
- RWS (`rws`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Stacked (`hcs-stacked`)

Apps: HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS

In context source: HCS: `src/components/HcsSplitLayout.tsx`; ACE: `src/pages/estimator/EstimatorPage.tsx`; ADM: `src/app/layout/AppLayout.tsx`; PFD: `src/pfd/Workspace.tsx`; PBS: `src/App.tsx`; HS: `src/App.tsx`; FD: `src/App.jsx`; AGPD: `src/App.tsx`; RWS: `src/rws/Shell.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/panels/Panels-002/example.tsx`

```tsx
import { Panels, Type } from '../../../kit';

export default function Example() {
  return (
    <Panels orientation="vertical" aui={{ scale: 'sm' }} style={{ inlineSize: 'min(100%, 560px)', blockSize: 160 }}>
      <Panels.Panel
        id="input"
        defaultSize="50%"
        minSize="40px"
        aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      >
        <Type as="h2" role="l3" weight="semi-bold">Input</Type>
      </Panels.Panel>
      <Panels.ResizeHandle aria-label="Resize Input and Output panels" color="primary" width="6px" />
      <Panels.Panel
        id="output"
        minSize="40px"
        aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      >
        <Type as="h2" role="l3" weight="semi-bold">Output</Type>
      </Panels.Panel>
    </Panels>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/panels/Panels-002/options/hcs-stacked/scene.tsx`

```tsx
import { Panels, Type } from '../../../../../kit';

// The Grid (engineering) layout of HcsSplitLayout.tsx cut to its two panes: the same panes and handle as the side-by-side split in a
// vertical Panels group, Input above and the results below, the handle a 6px horizontal line. The 200px minimum sizes and the Input
// panel's collapse props (Panels-003) are left out; the splitter is not draggable in the scene.
export default function Scene() {
  return (
    <div style={{ inlineSize: 'min(100%, 560px)', blockSize: 160 }}>
      <Panels orientation="vertical" className="ug-split" aui={{ scale: 'sm' }}>
        <Panels.Panel
          id="hcs-input"
          defaultSize="50%"
          minSize="40px"
          className="ug-split__panel"
          aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
        >
          <Type as="h2" role="l3" weight="semi-bold">Input</Type>
        </Panels.Panel>
        <Panels.ResizeHandle aria-label="Resize Input and results panels" color="primary" width="6px" />
        <Panels.Panel
          id="hcs-results"
          minSize="40px"
          className="ug-split__panel"
          aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
        >
          <Type as="h2" role="l3" weight="semi-bold">Output</Type>
        </Panels.Panel>
      </Panels>
    </div>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
