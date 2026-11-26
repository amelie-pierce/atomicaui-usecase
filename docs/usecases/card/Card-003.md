# Card-003: Preview card

Component family: **Card**

UI type: **Card**

Source: `src/usecase-gallery/usecases/card/Card-003/usecase.ts`

## What it is

A raised surface card with a title above an illustration, shown beside an option list to preview the highlighted option.

## When to choose it

Use it to explain a choice with a picture before the user commits. Do not use it as a persistent panel.

## Where it belongs

The Type and Supported type selects of HCS (src/components/HcsBeamTypeSelect.tsx): hovering or arrowing to an option previews it.

## Usage guidance

`Card` with `color: "surface"`, `paint: "solid"`, `shape: "soft"`, `elevation: 4`, `sx: { width: "224" }`, `Card.Body` holding `Card.Title` and a `ContainedImage` (`fit="contain"`, `ratio="4:3"`). In the app it is the content of a `Popover` anchored to the open list (`side` right, or left for Supported types, `sideOffset={8}`, `initialFocus={false}`). The scene anchors it to a stand-in for the field; the real list is Combobox-002.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Card`, `ContainedImage`, `Popover`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `surface`
- `paint`: `solid`, `text`
- `shape`: `soft`
- `profile`: `default`, `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Card** — 224px wide raised surface card with elevation 4 that floats beside the option list in a popover. Selector: `[class~="aui-card"]`.
2. **Body** — Stacks the option name above its illustration. Selector: `[class~="aui-card-body"]`.
3. **Title** — Name of the highlighted option, "Glulam". Selector: `[class~="aui-card-title"]`.
4. **Illustration** — 4:3 generic illustration of Glulam, fitted whole with fit="contain". Selector: `[class~="aui-contained-image"]`.

## Component layer steps

1. **Card** — 224px wide raised surface card with elevation 4 that floats beside the option list in a popover. Selector: `[class~="aui-card"]`.
2. **Body** — Stacks the option name above its illustration. Selector: `[class~="aui-card-body"]`.
3. **Title** — Name of the highlighted option, "Glulam". Selector: `[class~="aui-card-title"]`.
4. **Illustration** — 4:3 generic illustration of Glulam, fitted whole with fit="contain". Selector: `[class~="aui-contained-image"]`.

## Apps

- HCS (`hcs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Option preview (`hcs-preview`)

Apps: HCS

In context source: HCS: `src/components/HcsBeamTypeSelect.tsx`

In context view: Shown.

#### In context structure additions

1. **Select field stand-in** — The surface field showing the highlighted option "Glulam" that the popover is anchored to; the real option list is Combobox-002. Part marker: `data-ug-part="option-trigger"`.
2. **Preview popover** — The open Popover, placed to the right of the field with an 8px offset, that holds the preview card. Part marker: `data-ug-part="preview-popover"`.

#### In context layer steps

1. **Select field stand-in** — The surface field showing the highlighted option "Glulam" that the popover is anchored to; the real option list is Combobox-002. Selector: `[data-ug-part="option-trigger"]`.
2. **Preview popover** — The open Popover, placed to the right of the field with an 8px offset, that holds the preview card. Selector: `[data-ug-part="preview-popover"]`.
3. **Card** — 224px wide raised surface card with elevation 4 that floats beside the option list in a popover. Selector: `[class~="aui-card"]`.
4. **Body** — Stacks the option name above its illustration. Selector: `[class~="aui-card-body"]`.
5. **Title** — Name of the highlighted option, "Glulam". Selector: `[class~="aui-card-title"]`.
6. **Illustration** — 4:3 generic illustration of Glulam, fitted whole with fit="contain". Selector: `[class~="aui-contained-image"]`.

#### Component UI source — `src/usecase-gallery/usecases/card/Card-003/example.tsx`

```tsx
import { Card, ContainedImage } from '../../../kit';
import { MOCK_IMAGE_SRC } from '../../../mock-data';

export default function Example() {
  return (
    <Card aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { width: '224' } }}>
      <Card.Body aui={{ scale: 'sm' }}>
        <Card.Title>Glulam</Card.Title>
        <ContainedImage src={MOCK_IMAGE_SRC} alt="Generic illustration of Glulam" fit="contain" ratio="4:3" />
      </Card.Body>
    </Card>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/card/Card-003/options/hcs-preview/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Popover, View } from '../../../../../kit';

// HCS HcsBeamTypeSelect (src/components/HcsBeamTypeSelect.tsx): while the option list is open, a Popover opened to the side of the highlighted option holds the preview Card (title, then the illustration). The list itself is Combobox-002; the Popover is anchored to a stand-in for it.
export default function HcsPreviewScene({ children, host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 18)', inlineSize: 'min(100%, calc(var(--p-px-16) * 28))' }}>
      <Popover open>
        <Popover.Trigger nativeButton={false} render={<View data-ug-part="option-trigger" aui={{ color: 'surface', paint: 'solid', profile: 'default', scale: 'sm', shape: 'soft', sx: { width: '160' } }} />}>Glulam</Popover.Trigger>
        <Popover.Portal container={host}>
          <Popover.Positioner side="right" align="start" sideOffset={8} className="ug-anchored">
            <Popover.Popup data-ug-part="preview-popover" initialFocus={false}>
              {children}
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
