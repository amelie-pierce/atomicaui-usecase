# Radio-002: Camera projection radio group

Component family: **Radio**

UI type: **Radio**

Source: `src/usecase-gallery/usecases/radio/Radio-002/usecase.ts`

## What it is

The camera projection radios of the 3D viewer, Perspective and Orthographic, with no label, next to the other view controls.

## When to choose it

Use it for the camera choice that sits next to the other view controls, where the group needs no label. Add a tooltip per radio when the label alone does not say what the choice does (PBS). Do not use it for an input of a form (Radio-001) or for the Object Visibility checkboxes (Checkbox-004).

## Where it belongs

The viewer controls of HCS (the desktop controls and the View options popover), FD and ADC (the radios alone) and PBS (the view mode radios, each with a tooltip). Real site source: the viewer file of each app (the paths are in source).

## Usage guidance

One RadioGroup at scale "sm" with no padding. HCS and FD: an aria-label "Camera projection" on the group and a surface solid frame with a 1 outlined border unselected and a solid primary selected; the scene puts the group in the column the controls stack in (start-aligned, gap 4). ADC writes the group at scale "xs" with a 4 gap and the tonal outlined selection look; its measured labels are 14px/500 versus 16px/400 in HCS and FD (20px versus 22px dots), so it has its own app group. PBS (the tooltip group, written as another group of the same case): a row with gap 8 and aria-label "View mode"; each Radio sits in a Tooltip.Trigger rendered as a span with closeOnClick off (the trigger props would otherwise land on the inner dot, and the group checks a radio on arrow keys with a click that would block the tooltip on focus); the Tooltip.Positioner is on top, 4px off, and each popup is one sentence. The scenes leave out the lock hint of the label row, the per-radio disabled rule, the drawer around the settings popover, the Reset view button, the orientation cube and the Object Visibility checkboxes; the viewer canvas is a stand-in; the apps show the group enabled and the tooltip scene shows the Perspective tooltip open.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Radio`, `RadioGroup`, `Tooltip`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`, `xs`
- `profile`: `default`, `no-padding`
- `color`: `primary`, `surface`, `surface-alt`
- `paint`: `fixed`, `solid`, `text`, `tonal`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Radio group** — The projection group named by aria-label "Camera projection", Perspective selected by default; it sits among the 3D viewer controls. Selector: `[class~="aui-radio-group"]`.
2. **Radio** — Perspective or Orthographic: a solid surface circle with a 1px outlined border when off and solid primary when chosen. Selector: `[class~="aui-radio"]`.
3. **Indicator** — The circle that marks the active camera projection. Selector: `[class~="aui-radio-indicator"]`.
4. **Label** — The projection name, Perspective or Orthographic; PBS wraps each radio in a tooltip. Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.

## Component layer steps

1. **Radio group** — Camera projection group defaults to Perspective in viewer controls. Selector: `[class~="aui-radio-group"]`.
2. **Radio** — Perspective and Orthographic circles switch from outlined to solid primary. Selector: `[class~="aui-radio"]`.
3. **Indicator** — The circle that marks the active camera projection. Selector: `[class~="aui-radio-indicator"]`.
4. **Label** — Projection name appears beside each radio; PBS adds a tooltip. Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.

## Apps

- HCS (`hcs`)
- FD (`fd`)
- ADC (`adc`)
- PBS (`pbs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Projection (`hcs-projection`)

Apps: HCS, FD

In context source: HCS: `src/App.tsx`; FD: `src/components/Viewer.jsx`

In context view: Shown.

#### In context structure additions

1. **3D Viewer pane** — The soft surface-alt section labelled "3D Viewer" that holds the model view and its controls. Part marker: `data-ug-part="viewer-pane"`.
2. **Pane title** — The semi-bold "3D Viewer" heading at the top of the pane. Part marker: `data-ug-part="viewer-title"`.
3. **Viewer canvas** — The soft model canvas that the camera controls float over. Part marker: `data-ug-part="viewer-stage"`.
4. **Viewer controls** — The control cluster over the canvas that holds the camera projection group. Part marker: `data-ug-part="viewer-controls"`.

#### In context layer steps

1. **3D Viewer pane** — Soft 3D Viewer pane holds the model and controls. Selector: `[data-ug-part="viewer-pane"]`.
2. **Pane title** — The semi-bold "3D Viewer" heading at the top of the pane. Selector: `[data-ug-part="viewer-title"]`.
3. **Viewer canvas** — The soft model canvas that the camera controls float over. Selector: `[data-ug-part="viewer-stage"]`.
4. **Viewer controls** — The control cluster over the canvas that holds the camera projection group. Selector: `[data-ug-part="viewer-controls"]`.
5. **Radio group** — Camera projection group defaults to Perspective in viewer controls. Selector: `[class~="aui-radio-group"]`.
6. **Radio** — Perspective and Orthographic circles switch from outlined to solid primary. Selector: `[class~="aui-radio"]`.
7. **Indicator** — The circle that marks the active camera projection. Selector: `[class~="aui-radio-indicator"]`.
8. **Label** — Projection name appears beside each radio; PBS adds a tooltip. Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.

#### Component UI source — `src/usecase-gallery/usecases/radio/Radio-002/example.tsx`

```tsx
import { Radio, RadioGroup } from '../../../kit';

export default function Example() {
  return (
    <RadioGroup aria-label="Camera projection" defaultValue="perspective" aui={{ scale: 'sm', profile: 'no-padding' }}>
      <Radio value="perspective" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'solid', sx: { borderWidth: '1', borderStyle: 'solid', borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Radio.Label>Perspective</Radio.Label>
      </Radio>
      <Radio value="orthographic" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'solid', sx: { borderWidth: '1', borderStyle: 'solid', borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Radio.Label>Orthographic</Radio.Label>
      </Radio>
    </RadioGroup>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/radio/Radio-002/options/hcs-projection/scene.tsx`

```tsx
import { MockViewerCanvas } from '../../../../../mock-data';
import type { ContextProps } from '../../../../../types';
import { Radio, RadioGroup, Type, View } from '../../../../../kit';

// The viewer controls of HCS (src/App.tsx, the f02-controls column), FD (src/components/Viewer.jsx, the viewer-controls cluster): the projection group on its own, in the column the controls stack in.
// Left out: the Reset view button, the Object Visibility checkboxes; the apps show the group enabled.
export default function HcsProjectionScene(_: ContextProps) {
  return (
    <View data-ug-part="viewer-pane" as="section" aria-label="3D Viewer" aui={{ color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default' }}>
      <Type data-ug-part="viewer-title" as="h2" role="l3" weight="semi-bold">3D Viewer</Type>
      <View aui={{ color: 'surface', shape: 'soft', profile: 'no-padding' }}>
        <div data-ug-part="viewer-stage" className="ug-scene">
          <MockViewerCanvas />
          <div data-ug-part="viewer-controls" className="ug-scene__controls">
            <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '4' } }}>
              <RadioGroup aria-label="Camera projection" defaultValue="perspective" aui={{ scale: 'sm', profile: 'no-padding' }}>
                <Radio value="perspective" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'solid', sx: { borderWidth: '1', borderStyle: 'solid', borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
                  <Radio.Label>Perspective</Radio.Label>
                </Radio>
                <Radio value="orthographic" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'solid', sx: { borderWidth: '1', borderStyle: 'solid', borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
                  <Radio.Label>Orthographic</Radio.Label>
                </Radio>
              </RadioGroup>
            </View>
          </div>
        </div>
      </View>
    </View>
  );
}
```

### 2. Plain projection radios (`adc-projection`)

Apps: ADC

In context source: ADC: `src/adc/components/ConnectionModel.tsx`

In context view: Shown.

#### In context structure additions

1. **3D Viewer pane** — The soft surface-alt section labelled "3D Viewer" that holds the model view and its controls. Part marker: `data-ug-part="viewer-pane"`.
2. **Pane title** — The semi-bold "3D Viewer" heading at the top of the pane. Part marker: `data-ug-part="viewer-title"`.
3. **Viewer canvas** — The soft model canvas that the camera controls float over. Part marker: `data-ug-part="viewer-stage"`.
4. **Viewer controls** — The control cluster over the canvas that holds the camera projection group. Part marker: `data-ug-part="viewer-controls"`.

#### In context layer steps

1. **3D Viewer pane** — Soft 3D Viewer pane holds the model and controls. Selector: `[data-ug-part="viewer-pane"]`.
2. **Pane title** — The semi-bold "3D Viewer" heading at the top of the pane. Selector: `[data-ug-part="viewer-title"]`.
3. **Viewer canvas** — The soft model canvas that the camera controls float over. Selector: `[data-ug-part="viewer-stage"]`.
4. **Viewer controls** — The control cluster over the canvas that holds the camera projection group. Selector: `[data-ug-part="viewer-controls"]`.
5. **Radio group** — Camera projection group defaults to Perspective in viewer controls. Selector: `[class~="aui-radio-group"]`.
6. **Radio** — Perspective and Orthographic circles switch from outlined to solid primary. Selector: `[class~="aui-radio"]`.
7. **Indicator** — The circle that marks the active camera projection. Selector: `[class~="aui-radio-indicator"]`.
8. **Label** — Projection name appears beside each radio; PBS adds a tooltip. Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.

#### Component UI source — `src/usecase-gallery/usecases/radio/Radio-002/options/adc-projection/example.tsx`

```tsx
import { Radio, RadioGroup } from '../../../../../kit';

export default function Example() {
  return (
    <RadioGroup aria-label="Camera projection" defaultValue="perspective" aui={{ scale: 'sm', profile: 'no-padding' }}>
      <Radio value="perspective" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'solid', sx: { borderWidth: '1', borderStyle: 'solid', borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Radio.Label>Perspective</Radio.Label>
      </Radio>
      <Radio value="orthographic" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'solid', sx: { borderWidth: '1', borderStyle: 'solid', borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Radio.Label>Orthographic</Radio.Label>
      </Radio>
    </RadioGroup>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/radio/Radio-002/options/adc-projection/scene.tsx`

```tsx
import { MockViewerCanvas } from '../../../../../mock-data';
import type { ContextProps } from '../../../../../types';
import { Radio, RadioGroup, Type, View } from '../../../../../kit';

// The ADC viewer radios (src/adc/components/ConnectionModel.tsx): scale "xs", 4 gap, tonal outlined selection look.
export default function AdcProjectionScene(_: ContextProps) {
  return (
    <View data-ug-part="viewer-pane" as="section" aria-label="3D Viewer" aui={{ color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default' }}>
      <Type data-ug-part="viewer-title" as="h2" role="l3" weight="semi-bold">3D Viewer</Type>
      <View aui={{ color: 'surface', shape: 'soft', profile: 'no-padding' }}>
        <div data-ug-part="viewer-stage" className="ug-scene">
          <MockViewerCanvas />
          <div data-ug-part="viewer-controls" className="ug-scene__controls">
            <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '4' } }}>
              <RadioGroup aria-label="Camera projection" defaultValue="perspective" aui={{ scale: 'xs', profile: 'no-padding', sx: { gap: '4' } }}>
                <Radio value="perspective" aui={{ scale: 'xs', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
                  <Radio.Label>Perspective</Radio.Label>
                </Radio>
                <Radio value="orthographic" aui={{ scale: 'xs', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
                  <Radio.Label>Orthographic</Radio.Label>
                </Radio>
              </RadioGroup>
            </View>
          </div>
        </div>
      </View>
    </View>
  );
}
```

### 3. Projection tooltip radios (`pbs-projection-tooltip`)

Apps: PBS

In context source: PBS: `src/Viewer.tsx`

In context view: Shown.

#### In context structure additions

1. **3D Viewer pane** — The soft surface-alt section labelled "3D Viewer" that holds the model view and its controls. Part marker: `data-ug-part="viewer-pane"`.
2. **Pane title** — The semi-bold "3D Viewer" heading at the top of the pane. Part marker: `data-ug-part="viewer-title"`.
3. **Viewer canvas** — The soft model canvas that the camera controls float over. Part marker: `data-ug-part="viewer-stage"`.
4. **Viewer controls** — The control cluster over the canvas that holds the camera projection group. Part marker: `data-ug-part="viewer-controls"`.
5. **Radio tooltip** — The tooltip above the Perspective radio that explains the view mode: "Realistic 3D view with depth and perspective." Part marker: `data-ug-part="radio-tooltip"`.

#### In context layer steps

1. **3D Viewer pane** — Soft 3D Viewer pane holds the model and controls. Selector: `[data-ug-part="viewer-pane"]`.
2. **Pane title** — The semi-bold "3D Viewer" heading at the top of the pane. Selector: `[data-ug-part="viewer-title"]`.
3. **Viewer canvas** — The soft model canvas that the camera controls float over. Selector: `[data-ug-part="viewer-stage"]`.
4. **Viewer controls** — The control cluster over the canvas that holds the camera projection group. Selector: `[data-ug-part="viewer-controls"]`.
5. **Radio tooltip** — Tooltip explains the Perspective view’s realistic depth and projection mode. Selector: `[data-ug-part="radio-tooltip"]`.
6. **Radio group** — Camera projection group defaults to Perspective in viewer controls. Selector: `[class~="aui-radio-group"]`.
7. **Radio** — Perspective and Orthographic circles switch from outlined to solid primary. Selector: `[class~="aui-radio"]`.
8. **Indicator** — The circle that marks the active camera projection. Selector: `[class~="aui-radio-indicator"]`.
9. **Label** — Projection name appears beside each radio; PBS adds a tooltip. Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.

#### Component UI source — `src/usecase-gallery/usecases/radio/Radio-002/options/pbs-projection-tooltip/example.tsx`

```tsx
import { Radio, RadioGroup } from '../../../../../kit';

export default function Example() {
  return (
    <RadioGroup aria-label="Camera projection" defaultValue="perspective" aui={{ scale: 'sm', profile: 'no-padding' }}>
      <Radio value="perspective" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'solid', sx: { borderWidth: '1', borderStyle: 'solid', borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Radio.Label>Perspective</Radio.Label>
      </Radio>
      <Radio value="orthographic" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'solid', sx: { borderWidth: '1', borderStyle: 'solid', borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Radio.Label>Orthographic</Radio.Label>
      </Radio>
    </RadioGroup>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/radio/Radio-002/options/pbs-projection-tooltip/scene.tsx`

```tsx
import { MockViewerCanvas } from '../../../../../mock-data';
import type { ContextProps } from '../../../../../types';
import { Radio, RadioGroup, Tooltip, Type, View } from '../../../../../kit';

// The view mode radios of the PBS viewer (src/Viewer.tsx): a row RadioGroup (gap 8) whose radios are each wrapped in a Tooltip trigger (a span, closeOnClick off), top, 4px offset.
// Shown with the Perspective tooltip open; left out: the Reset View button, the Object Visibility checkboxes; the app shows the group enabled.
export default function PbsProjectionScene({ host }: ContextProps) {
  return (
    <View data-ug-part="viewer-pane" as="section" aria-label="3D Viewer" aui={{ color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default' }}>
      <Type data-ug-part="viewer-title" as="h2" role="l3" weight="semi-bold">3D Viewer</Type>
      <View aui={{ color: 'surface', shape: 'soft', profile: 'no-padding' }}>
        <div data-ug-part="viewer-stage" className="ug-scene">
          <MockViewerCanvas />
          <div data-ug-part="viewer-controls" className="ug-scene__controls">
            <View aui={{ paint: 'text', profile: 'no-padding' }}>
              <RadioGroup defaultValue="perspective" aria-label="View mode" aui={{ scale: 'sm', profile: 'no-padding', sx: { flexDirection: 'row', gap: '8' } }}>
                <Tooltip.Provider>
                  <Tooltip open>
                    <Tooltip.Trigger closeOnClick={false} render={<span />}>
                      <Radio value="perspective" aui={{ scale: 'sm', states: { unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } }, selected: { paint: 'solid', color: 'primary' } } }}>
                        <Radio.Label>Perspective</Radio.Label>
                      </Radio>
                    </Tooltip.Trigger>
                    <Tooltip.Portal container={host}>
                      <Tooltip.Positioner side="top" sideOffset={4} className="ug-anchored">
                        <Tooltip.Popup data-ug-part="radio-tooltip">Realistic 3D view with depth and perspective.</Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip>
                  <Tooltip>
                    <Tooltip.Trigger closeOnClick={false} render={<span />}>
                      <Radio value="ortho" aui={{ scale: 'sm', states: { unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } }, selected: { paint: 'solid', color: 'primary' } } }}>
                        <Radio.Label>Orthographic</Radio.Label>
                      </Radio>
                    </Tooltip.Trigger>
                    <Tooltip.Portal container={host}>
                      <Tooltip.Positioner side="top" sideOffset={4} className="ug-anchored">
                        <Tooltip.Popup>True-scale view with no perspective distortion.</Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip>
                </Tooltip.Provider>
              </RadioGroup>
            </View>
          </div>
        </div>
      </View>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
