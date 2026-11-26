# Button-036: Expand panel button

Component family: **Button**

UI type: **Icon button**

Source: `src/usecase-gallery/usecases/button/Button-036/usecase.ts`

## What it is

A square transparent IconButton, 28px, expands a collapsed side panel from its rail.

## When to choose it

Use it as the single trigger of a collapsed panel; the expanded panel switches to the 20px header controls of Button-033. Always set aria-label.

## Where it belongs

A collapsed side rail that stands in for a panel (angle-right expands a horizontal one, angle-down a vertical one). Real site source: HCS src/components/HcsSplitLayout.tsx and panelSpec.ts (the rail and its sizes). No other app has a panel rail.

## Usage guidance

Set aui color "secondary", paint "text", scale "sm", shape "soft" and profile "square" (28px, unlike the 20px contained header icons) on an IconButton, with a Tooltip carrying the aria-label text. The trigger is a Panels.Trigger, the kit trigger that renders the IconButton, whose targetId is the panel id, and a real Panels group holds the Input panel at its 40px collapsed size: the rail is a column that fills the panel height with the trigger at the top centre, beside the viewer pane, which is cut to its title (no canvas); the Input panel holds only its title; the vertical rail of the engineering layout (angle-down, trigger at the start corner) is not shown. One group, HCS only.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `IconButton`, `Panels`, `Tooltip`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `secondary`, `surface-alt`
- `paint`: `fixed`, `text`
- `scale`: `sm`
- `profile`: `block-padding`, `default`, `no-padding`, `square`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Expand Input** — The 28px square transparent secondary angle-right button that reopens the collapsed Input panel. Selector: `[class~="aui-button"][aria-label="Expand Input"]:not([class~="aui-panels-trigger"])`.
2. **Panel trigger** — HCS rail: the same button rendered as a Panels.Trigger that targets the hcs-input panel from the 40px collapsed rail. Selector: `[class~="aui-panels-trigger"]`.
3. **Tooltip** — The Expand Input label shown below the button. Selector: `[class~="aui-tooltip-popup"]`.
4. **Panel** — The Input panel, collapsible to 40px (minSize 400px when open), next to the 3D Viewer panel. Selector: `[class~="aui-panels-panel"]`.
5. **Resize handle** — The 8px primary handle between the Input and 3D Viewer panels. Selector: `[class~="aui-panels-resize-handle"]`.

## Component layer steps

1. **Expand Input** — 28px transparent angle-right reopens the collapsed Input pane. Selector: `[class~="aui-button"][aria-label="Expand Input"]:not([class~="aui-panels-trigger"])`.
2. **Panel trigger** — HCS rail uses Panels.Trigger to reopen Input from 40px. Selector: `[class~="aui-panels-trigger"]`.
3. **Tooltip** — The Expand Input label shown below the button. Selector: `[class~="aui-tooltip-popup"]`.
4. **Panel** — Input panel collapses to 40px beside the 3D Viewer. Selector: `[class~="aui-panels-panel"]`.
5. **Resize handle** — The 8px primary handle between the Input and 3D Viewer panels. Selector: `[class~="aui-panels-resize-handle"]`.

## Apps

- HCS (`hcs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Collapsed rail (`hcs-rail`)

Apps: HCS

In context source: HCS: `src/components/HcsSplitLayout.tsx`

In context view: Shown.

#### In context structure additions

1. **Collapsed rail** — The 40px column of the collapsed Input panel that keeps only the expand trigger at its top centre. Selector: `[data-ug-part="rail"]`.
2. **3D Viewer pane** — The neighbouring 3D Viewer section that keeps the rest of the width, reduced to its header. Selector: `[data-ug-part="viewer-pane"]`.

#### In context layer steps

1. **Collapsed rail** — 40px collapsed rail keeps the expand trigger at its top. Selector: `[data-ug-part="rail"]`.
2. **3D Viewer pane** — 3D Viewer pane keeps its header as the Input rail expands. Selector: `[data-ug-part="viewer-pane"]`.
3. **Expand Input** — 28px transparent angle-right reopens the collapsed Input pane. Selector: `[class~="aui-button"][aria-label="Expand Input"]:not([class~="aui-panels-trigger"])`.
4. **Panel trigger** — HCS rail uses Panels.Trigger to reopen Input from 40px. Selector: `[class~="aui-panels-trigger"]`.
5. **Tooltip** — The Expand Input label shown below the button. Selector: `[class~="aui-tooltip-popup"]`.
6. **Panel** — Input panel collapses to 40px beside the 3D Viewer. Selector: `[class~="aui-panels-panel"]`.
7. **Resize handle** — The 8px primary handle between the Input and 3D Viewer panels. Selector: `[class~="aui-panels-resize-handle"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-036/example.tsx`

```tsx
import { IconButton, Tooltip } from '../../../kit';

export default function Example() {
  return (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger
          render={
            <IconButton
              name="angle-right"
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
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-036/options/hcs-rail/scene.tsx`

```tsx
import { Panels, Tooltip, Type, View } from '../../../../../kit';

// The collapsed Input panel as HcsSplitLayout.tsx builds it: a Panels group whose Input panel is collapsible and rests at its 40px
// collapsedSize. The rail is a transparent column that fills the panel height (`.hcs-input-rail`, height 100%) with the 28px square
// Panels.Trigger (a kit trigger that renders the IconButton, with its tooltip) at the top centre; the Input pane itself is a Panels.Content the collapse hides. The viewer
// pane beside it keeps the rest of the width, reduced to its title (no canvas). The splitter is not draggable in the scene.
export default function HcsRailScene() {
  return (
    <div style={{ inlineSize: 'min(100%, 560px)', blockSize: 160 }}>
      <Panels orientation="horizontal" className="ug-split" aui={{ scale: 'sm' }}>
        <Panels.Panel
          id="hcs-input"
          collapsible
          collapsedSize="40px"
          defaultSize="40px"
          minSize="400px"
          className="ug-split__panel"
          aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
        >
          <View data-ug-part="rail" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none' } }} style={{ height: '100%', boxSizing: 'border-box' }}>
            <Tooltip.Provider>
              <Tooltip>
                <Tooltip.Trigger
                  render={
                    <Panels.Trigger
                      targetId="hcs-input"
                      name="angle-right"
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
        <Panels.ResizeHandle aria-label="Resize Input and 3D Viewer panels" color="primary" width="8px" />
        <Panels.Panel id="hcs-viewer" minSize="200px" className="ug-split__panel" aui={{ scale: 'sm' }}>
          <View
            data-ug-part="viewer-pane"
            as="section"
            aria-label="3D Viewer"
            aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', height: 'fill' } }}
          >
            <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', height: '28', flex: 'none' } }}>
              <Type as="h2" role="l3" weight="semi-bold">3D Viewer</Type>
            </View>
          </View>
        </Panels.Panel>
      </Panels>
    </div>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
