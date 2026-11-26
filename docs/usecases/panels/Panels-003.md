# Panels-003: Top rail

Component family: **Panels**

UI type: **Collapsible panel**

Source: `src/usecase-gallery/usecases/panels/Panels-003/usecase.ts`

## What it is

A collapsible Panels.Panel rests at a 40px rail and carries a Panels.Trigger that expands it again.

## When to choose it

Use it for a pane the user may need out of the way: mark the Panels.Panel collapsible with a collapsedSize, and give the rail a Panels.Trigger whose targetId is the panel id; the same trigger toggles it. Keep Output and viewer panes non-collapsible. Always set aria-label on the trigger.

## Where it belongs

The Input pane of the Grid (stacked) layout: HCS (engineering), ACE (stacked), ADM (grid), HS, FD and AGPD collapse it upward into a 40px row at the top; the Output and viewer panes are fixed. The Input pane of the side by side layout collapses into a 40px column instead, which is Button-036 (the rail trigger and its rail); the header collapse button of the expanded pane is Button-033. PBS, RWS and PFD keep their Input pane open in the Grid layout, so they have no top rail.

## Usage guidance

The example is the collapsible panel: a vertical Panels group whose first Panels.Panel is collapsible with collapsedSize "40px", a defaultSize and a minSize, then a Panels.ResizeHandle and a fixed second panel; the Panels.Trigger is a wrapper kit part that the In context scene writes. Top rail: HCS, ACE, ADM, HS, FD and AGPD. In context the Input panel rests at its 40px collapsedSize; the rail is a View row (flex row, alignItems "start", no padding, paddingInlineStart "4") holding the 28px square Panels.Trigger (angle-down, color "secondary", paint "text", scale "sm", profile "square", shape "soft") with a Tooltip carrying its aria-label, measured at 525 px, 4px in from the 1px panel border and 4px down; the Input content is a Panels.Content the collapse hides and the Output panel below keeps the rest of the height, cut to its title. FD sets paddingInlineStart "8" on its rail (the standard is 4, as HCS, ACE, ADM, HS and AGPD), which puts the trigger 4px further in (529 vs 525 measured); that is an app-side deviation, so FD is in the group and the scene is the standard. The 200px minimum size the apps set is replaced by a 120px minSize so the Trigger can expand the panel; the splitter drag and the pane contents are left out.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Panels`, `Tooltip`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `profile`: `block-padding`, `no-padding`, `square`
- `color`: `secondary`, `surface-alt`
- `paint`: `fixed`, `text`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Panels** — Vertical split group, 560px wide and 200px tall at most, whose top pane can fold to a rail. Selector: `[class~="aui-panels"]`.
2. **Collapsible panel** — The Input pane is collapsible with a 40px collapsedSize (starts at 40px in the HCS scene) and minSize 120px; the Output pane below stays open. Selector: `[class~="aui-panels-panel"]`.
3. **Content** — HCS scene: the pane body that holds the Input heading beside the rail, hidden when the panel is collapsed. Selector: `[class~="aui-panels-content"]`.
4. **Expand trigger** — HCS scene: angle-down icon button labelled "Expand Input" on the 40px rail, with a bottom tooltip, that reopens the Input pane. Selector: `[class~="aui-panels-trigger"]`.
5. **Resize handle** — 6px primary horizontal bar between Input and the results pane. Selector: `[class~="aui-panels-resize-handle"]`.

## Component layer steps

1. **Panels** — Vertical split lets the upper pane fold into a narrow rail. Selector: `[class~="aui-panels"]`.
2. **Collapsible panel** — Input collapses to a 40px rail while Output stays open below. Selector: `[class~="aui-panels-panel"]`.
3. **Content** — Open pane body holds the Input heading beside its collapsed rail. Selector: `[class~="aui-panels-content"]`.
4. **Expand trigger** — Angle-down button on the rail reopens Input with a tooltip. Selector: `[class~="aui-panels-trigger"]`.
5. **Resize handle** — Six-pixel horizontal grip adjusts the boundary above the results pane. Selector: `[class~="aui-panels-resize-handle"]`.

## Apps

- HCS (`hcs`)
- ACE (`ace`)
- ADM (`adm`)
- HS (`hs`)
- FD (`fd`)
- AGPD (`agpd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Top rail (`hcs-top-rail`)

Apps: HCS, ACE, ADM, HS, FD, AGPD

In context source: HCS: `src/components/HcsSplitLayout.tsx`; ACE: `src/pages/estimator/EstimatorPage.tsx`; ADM: `src/features/design-inputs/components/InputsPanel/InputsPanel.tsx`; HS: `src/App.tsx`; FD: `src/components/InputPane.jsx`; AGPD: `src/App.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/panels/Panels-003/example.tsx`

```tsx
import { Panels, Type } from '../../../kit';

export default function Example() {
  return (
    <Panels orientation="vertical" aui={{ scale: 'sm' }} style={{ inlineSize: 'min(100%, 560px)', blockSize: 200 }}>
      <Panels.Panel
        id="input"
        collapsible
        collapsedSize="40px"
        defaultSize="50%"
        minSize="120px"
        aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      >
        <Type as="h2" role="l3" weight="semi-bold">Input</Type>
      </Panels.Panel>
      <Panels.ResizeHandle aria-label="Resize Input and results panels" color="primary" width="6px" />
      <Panels.Panel
        id="results"
        minSize="40px"
        aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      >
        <Type as="h2" role="l3" weight="semi-bold">Output</Type>
      </Panels.Panel>
    </Panels>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/panels/Panels-003/options/hcs-top-rail/scene.tsx`

```tsx
import { Panels, Tooltip, Type, View } from '../../../../../kit';

// The Grid (engineering) layout of HcsSplitLayout.tsx with the Input panel collapsed: a vertical Panels group whose Input panel is collapsible and
// rests at its 40px collapsedSize. The rail is a transparent row that holds the 28px square Panels.Trigger (angle-down, with its tooltip) at the
// start corner, 4px in from the start edge (paddingInlineStart "4"); the Input content is a Panels.Content the collapse hides. The results panel
// below keeps the rest of the height, reduced to its title. The 120px minSize gives the Trigger room to expand it. The 200px minimum size, the splitter drag and the contents are left out.
export default function HcsTopRailScene() {
  return (
    <div style={{ inlineSize: 'min(100%, 560px)', blockSize: 200 }}>
      <Panels orientation="vertical" className="ug-split" aui={{ scale: 'sm' }}>
        <Panels.Panel
          id="hcs-input"
          collapsible
          collapsedSize="40px"
          defaultSize="40px"
          minSize="120px"
          className="ug-split__panel"
          aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
        >
          <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'row', alignItems: 'start', flex: 'none', paddingInlineStart: '4' } }}>
            <Tooltip.Provider>
              <Tooltip>
                <Tooltip.Trigger
                  render={
                    <Panels.Trigger
                      targetId="hcs-input"
                      name="angle-down"
                      aria-label="Expand Input"
                      aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'square', shape: 'soft' }}
                    />
                  }
                />
                <Tooltip.Portal>
                  <Tooltip.Positioner side="bottom" sideOffset={4}>
                    <Tooltip.Popup aui={{ scale: 'sm' }}>Expand Input</Tooltip.Popup>
                  </Tooltip.Positioner>
                </Tooltip.Portal>
              </Tooltip>
            </Tooltip.Provider>
          </View>
          <Panels.Content
            aui={{ paint: 'text', profile: 'no-padding', sx: { position: 'relative', display: 'flex', flexDirection: 'column', flex: 'fill', overflow: 'hidden', minWidth: '0', minHeight: '0' } }}
          >
            <Type as="h2" role="l3" weight="semi-bold">Input</Type>
          </Panels.Content>
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
