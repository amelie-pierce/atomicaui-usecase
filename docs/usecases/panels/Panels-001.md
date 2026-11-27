# Panels-001: Side by side

Component family: **Panels**

UI type: **Resizable split**

Source: `src/usecase-gallery/usecases/panels/Panels-001/usecase.ts`

## What it is

A Panels group splits the workspace into surface panes side by side that the user resizes by dragging the vertical handle between them.

## When to choose it

Use it for panes that share one workspace and that the user may want wider or narrower: a Panels group with a ResizeHandle between each pair of Panels.Panel. Side by side is the default at wide widths; at narrow widths the Grid layout stacks the panes (Panels-002). Do not use it for a fixed layout (a View row or column is enough) or for a pane that only opens and closes (a collapsible Panels.Panel, Panels-003).

## Where it belongs

The workspace of every app: the Input pane beside the 3D Viewer or illustration and the Output (two panes and one handle), and a second split inside the workbench (viewer and Output). ADC splits three panes with two handles (inputs, model, summary). The stacked direction is Panels-002; the collapse of the Input pane is Button-036 (side rail) and Panels-003 (top rail); the header and rail buttons are Button-033 and Button-036.

## Usage guidance

The example is the split itself: a Panels (orientation "horizontal", aui scale "sm") holding two Panels.Panel and a Panels.ResizeHandle between them. Each Panels.Panel has an id, a defaultSize on the first one and a minSize, and takes the pane frame props (profile "block-padding", scale "sm", color "surface-alt", paint "fixed", shape "soft", a flex column with minHeight "0" so it can shrink). The Panels.ResizeHandle has color "primary" and width "6px" and an aria-label that names the two panes; being in a horizontal group it is a 6px vertical line (measured 6 x 160 in the scene). All ten apps (HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS, ADC) write the same two soft surface-alt panes and the primary 6px handle; the scene is HCS, cut to the two panes with their semi-bold titles. Measured in the browser from each app's Panels and Panel props, the panes (4px radius, rgb(241, 245, 249)) and the handle (6px, primary line) match in every app; only the root differs: HCS sets scale "sm" (no padding), HS, ADM, RWS and AGPD (inner groups) a no-padding profile with gap "6", and PFD, PBS, ACE, FD and AGPD (outer group) the default profile, which adds the page gutter (4px block, 8px inline) around the group; ADC adds 8px inline and 4px at the end. That gutter is the app page around the split, not the split, so it is left out and the scene is the standard. ADC's split has two handles (inputs, model, summary); each handle is the same part. The scene leaves out the minimum sizes of the app (400px and 200px), the collapse props of the Input panel (Panels-003), the pane headers and contents, and the splitter drag.

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

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Panels** — Horizontal split group, 560px wide and 160px tall at most, that places the panes side by side. Selector: `[class~="aui-panels"]`. Layer step: **Panels** — Horizontal split places two panes side by side in a bounded workspace.
2. **Panel** — Two surface-alt soft panes, Input (id "input", 50% default width) and 3D Viewer, each at least 120px wide with a semi-bold l3 heading. Selector: `[class~="aui-panels-panel"]`. Layer step: **Panel** — Soft Input and 3D Viewer panes share width, headings, and content.
3. **Resize handle** — 6px primary vertical bar between Input and 3D Viewer that the user drags to change the widths. Selector: `[class~="aui-panels-resize-handle"]`. Layer step: **Resize handle** — Six-pixel primary grip drags between Input and 3D Viewer panes.

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
- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Side by side (`hcs-side-by-side`)

Apps: HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS, ADC

In context source: HCS: `src/components/HcsSplitLayout.tsx`; ACE: `src/pages/estimator/EstimatorPage.tsx`; ADM: `src/app/layout/AppLayout.tsx`; PFD: `src/pfd/Workspace.tsx`; PBS: `src/App.tsx`; HS: `src/App.tsx`; FD: `src/App.jsx`; AGPD: `src/App.tsx`; RWS: `src/rws/Shell.tsx`; ADC: `src/adc/Workspace.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/panels/Panels-001/example.tsx`

```tsx
import { Panels, Type } from '../../../kit';

export default function Example() {
  return (
    <Panels orientation="horizontal" aui={{ scale: 'sm' }} style={{ inlineSize: 'min(100%, 560px)', blockSize: 160 }}>
      <Panels.Panel
        id="input"
        defaultSize="50%"
        minSize="120px"
        aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      >
        <Type as="h2" role="l3" weight="semi-bold">Input</Type>
      </Panels.Panel>
      <Panels.ResizeHandle aria-label="Resize Input and 3D Viewer panels" color="primary" width="6px" />
      <Panels.Panel
        id="viewer"
        minSize="120px"
        aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      >
        <Type as="h2" role="l3" weight="semi-bold">3D Viewer</Type>
      </Panels.Panel>
    </Panels>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/panels/Panels-001/options/hcs-side-by-side/scene.tsx`

```tsx
import { Panels, Type } from '../../../../../kit';

// The default split of HcsSplitLayout.tsx cut to its two panes: a horizontal Panels group (scale sm) of two soft surface-alt panes, each reduced to its
// semi-bold title, and the Panels.ResizeHandle between them (primary colour, 6px). The app's 400px and 200px minimum sizes, the collapse
// props of the Input panel (Panels-003) and the pane contents are left out; the splitter is not draggable in the scene. Written the same
// in all ten apps; ADC has three panes and two handles.
export default function Scene() {
  return (
    <div style={{ inlineSize: 'min(100%, 560px)', blockSize: 160 }}>
      <Panels orientation="horizontal" className="ug-split" aui={{ scale: 'sm' }}>
        <Panels.Panel
          id="hcs-input"
          defaultSize="50%"
          minSize="120px"
          className="ug-split__panel"
          aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
        >
          <Type as="h2" role="l3" weight="semi-bold">Input</Type>
        </Panels.Panel>
        <Panels.ResizeHandle aria-label="Resize Input and 3D Viewer panels" color="primary" width="6px" />
        <Panels.Panel
          id="hcs-viewer"
          minSize="120px"
          className="ug-split__panel"
          aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
        >
          <Type as="h2" role="l3" weight="semi-bold">3D Viewer</Type>
        </Panels.Panel>
      </Panels>
    </div>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
