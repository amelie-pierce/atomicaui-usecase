# Tooltip-004: Radio option tooltip

Component family: **Tooltip**

UI type: **Tooltip on a radio**

Source: `src/usecase-gallery/usecases/tooltip/Tooltip-004/usecase.ts`

## What it is

A radio option of a group, with its label beside it, shows a short note about the option in a small tooltip on hover or keyboard focus.

## When to choose it

Use it for a radio option whose effect is not obvious from its short label. Do not use it for an icon-only button (Tooltip-001) and not for long help text.

## Where it belongs

The view and member radios floating over the 3D viewer in PBS and RWS (the tooltip helper of Viewer).

## Usage guidance

Compose Tooltip.Provider, a RadioGroup, Tooltip and Tooltip.Trigger with a span as render and closeOnClick off, so the arrow-key check does not close it; the Radio with its Radio.Label is the trigger child. Then Tooltip.Portal, Tooltip.Positioner and Tooltip.Popup. PBS and RWS are one group; from the tooltip source, the popup is the kit default and opens above (top) with a 4px offset and a one-line note, and RWS requests the bottom side. The app code was not run. The scene shows one radio of the group with the tooltip open and leaves out the other viewer controls and the canvas.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Radio`, `RadioGroup`, `Tooltip`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `profile`: `no-padding`
- `paint`: `text`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Radio group** — The "Camera projection" RadioGroup (scale "sm", no padding) whose options each carry their own tooltip. Selector: `[class~="aui-radio-group"]`.
2. **Trigger** — The span, with closeOnClick off, that wraps the Perspective radio so the tooltip does not close on arrow-key selection. Part marker: `data-ug-part="trigger"`.
3. **Radio** — The "Perspective" radio at scale "sm", selected by default. Selector: `[class~="aui-radio"]`.
4. **Radio label** — The visible option name "Perspective" beside the radio. Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.
5. **Positioner** — Places the note above the radio with a 4px offset (side="top"); RWS requests the bottom side. Selector: `[class~="aui-tooltip-positioner"]`.
6. **Popup** — The default tooltip surface for the one-line note. Selector: `[class~="aui-tooltip-popup"]`.
7. **Note** — The note "Show the model in perspective" that explains what the option does. Selector: `[class~="aui-tooltip-popup"]`. Direct text is highlighted.

## Component layer steps

1. **Radio group** — The "Camera projection" RadioGroup (scale "sm", no padding) whose options each carry their own tooltip. Selector: `[class~="aui-radio-group"]`.
2. **Trigger** — The span, with closeOnClick off, that wraps the Perspective radio so the tooltip does not close on arrow-key selection. Selector: `[data-ug-part="trigger"]`.
3. **Radio** — The "Perspective" radio at scale "sm", selected by default. Selector: `[class~="aui-radio"]`.
4. **Radio label** — The visible option name "Perspective" beside the radio. Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.
5. **Positioner** — Places the note above the radio with a 4px offset (side="top"); RWS requests the bottom side. Selector: `[class~="aui-tooltip-positioner"]`.
6. **Popup** — The default tooltip surface for the one-line note. Selector: `[class~="aui-tooltip-popup"]`.

## Apps

- PBS (`pbs`)
- RWS (`rws`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Viewer control (`pbs-viewer-radio`)

Apps: PBS, RWS

In context source: PBS: `src/Viewer.tsx`; RWS: `src/rws/Viewer.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/tooltip/Tooltip-004/example.tsx`

```tsx
import { Radio, RadioGroup, Tooltip } from '../../../kit';

export default function Example() {
  return (
    <Tooltip.Provider>
      <RadioGroup aria-label="Camera projection" defaultValue="perspective" aui={{ scale: 'sm', profile: 'no-padding' }}>
        <Tooltip>
          <Tooltip.Trigger closeOnClick={false} render={<span data-ug-part="trigger" />}>
            <Radio value="perspective" aui={{ scale: 'sm' }}>
              <Radio.Label>Perspective</Radio.Label>
            </Radio>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner side="top" sideOffset={4}>
              <Tooltip.Popup>Show the model in perspective</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </RadioGroup>
    </Tooltip.Provider>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/tooltip/Tooltip-004/options/pbs-viewer-radio/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Radio, RadioGroup, Tooltip, View } from '../../../../../kit';

// PBS Viewer (src/Viewer.tsx, the `tooltip` helper at line 373) and RWS Viewer (src/rws/Viewer.tsx line 461): the viewer's view or member radio is the trigger, wrapped in a span (`render={<span />}`, closeOnClick off so a
// keyboard check does not close it); the popup is the kit default (surface, scale sm) and opens above (top, 4px offset) with a one-line note.
// Shown open; the scene keeps one radio of the group.
export default function PbsViewerRadioScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 8)', paddingBlockStart: 'calc(var(--p-px-16) * 4)' }}>
      <RadioGroup aria-label="Camera projection" defaultValue="perspective" aui={{ scale: 'sm', profile: 'no-padding' }}>
        <Tooltip open>
          <Tooltip.Trigger closeOnClick={false} render={<span data-ug-part="trigger" />}>
            <Radio value="perspective" aui={{ scale: 'sm' }}>
              <Radio.Label>Perspective</Radio.Label>
            </Radio>
          </Tooltip.Trigger>
          <Tooltip.Portal container={host}>
            <Tooltip.Positioner side="top" sideOffset={4} className="ug-anchored">
              <Tooltip.Popup>Show the model in perspective</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </RadioGroup>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
