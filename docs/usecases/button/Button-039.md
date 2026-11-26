# Button-039: Reset view button

Component family: **Button**

UI type: **Icon button**

Source: `src/usecase-gallery/usecases/button/Button-039/usecase.ts`

## What it is

An orange icon with a thin outline floats over a 3D viewer to reset the camera.

## When to choose it

Use it for a control that sits over busy content, where the outline keeps it findable. The outline comes from sx, not from a color axis.

## Where it belongs

A corner of a 3D viewer: Reset view. Real site source: HCS, the only live icon button in the primary color. Built from the viewer pane in src/App.tsx (lines 1403-1651) and index.css (.scene, .f02-controls).

## Usage guidance

Set aui scale "sm", color "primary", paint "text" and shape "soft", plus sx borderWidth "1", borderStyle "solid" and borderColor "outlined". In context the scene is the 3D Viewer pane with Reset view overlaid at the top end, 62px down and 12px in (the app's `.f02-controls-desktop`, here a gallery rule, since the kit sx has no inset axis); the projection radios and the Object Visibility checkboxes under it are left out. The canvas is a framed stand-in: the app draws a live three.js scene.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `IconButton`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `primary`, `surface`, `surface-alt`
- `paint`: `fixed`, `text`
- `shape`: `soft`
- `profile`: `block-padding`, `default`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Reset view** — The small soft-shaped IconButton with primary orange color and a 1px outlined border that floats over the 3D viewer to reset the camera. Selector: `[class~="aui-button"]`.
2. **Bullseye icon** — The bullseye glyph, drawn in the primary color on a transparent surface. Selector: `[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])`.

## Component layer steps

1. **Reset view** — The small soft-shaped IconButton with primary orange color and a 1px outlined border that floats over the 3D viewer to reset the camera. Selector: `[class~="aui-button"]`.
2. **Bullseye icon** — The bullseye glyph, drawn in the primary color on a transparent surface. Selector: `[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])`.

## Apps

- HCS (`hcs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Outlined accent, 28px (`default`)

Apps: HCS

In context source: HCS: `src/App.tsx`

In context view: Shown.

#### In context structure additions

1. **3D Viewer pane** — The surface-alt 3D Viewer section that frames the header and the scene. Selector: `[data-ug-part="viewer-pane"]`.
2. **Viewer title** — The semi-bold 3D Viewer heading in the 28px header. Selector: `[data-ug-part="viewer-title"]`.
3. **Scene canvas** — The framed stand-in for the live 3D canvas, with Reset view overlaid at its top end. Selector: `[data-ug-part="viewer-canvas"]`.

#### In context layer steps

1. **3D Viewer pane** — The surface-alt 3D Viewer section that frames the header and the scene. Selector: `[data-ug-part="viewer-pane"]`.
2. **Viewer title** — The semi-bold 3D Viewer heading in the 28px header. Selector: `[data-ug-part="viewer-title"]`.
3. **Scene canvas** — The framed stand-in for the live 3D canvas, with Reset view overlaid at its top end. Selector: `[data-ug-part="viewer-canvas"]`.
4. **Reset view** — The small soft-shaped IconButton with primary orange color and a 1px outlined border that floats over the 3D viewer to reset the camera. Selector: `[class~="aui-button"]`.
5. **Bullseye icon** — The bullseye glyph, drawn in the primary color on a transparent surface. Selector: `[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-039/example.tsx`

```tsx
import { IconButton } from '../../../kit';

export default function Example() {
  return (
    <IconButton
      name="bullseye"
      aria-label="Reset view"
      aui={{
        scale: 'sm',
        color: 'primary',
        paint: 'text',
        shape: 'soft',
        sx: {
          borderWidth: '1',
          borderStyle: 'solid',
          borderColor: 'outlined',
        },
      }}
    />
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-039/options/default/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Type, View } from '../../../../../kit';
import { MockViewerCanvas } from '../../../../../mock-data';

// The 3D Viewer pane cut to its header and scene: pane frame, the 28px header, and a body card holding the live canvas (a three.js scene
// the kit has no part for, so a framed stand-in) with Reset view overlaid at the top end, 62px down and 12px in (the app's
// `.f02-controls-desktop`, here the `ug-scene__controls` rule). The projection radios and visibility checkboxes under it are left out.
export default function ViewerContext({ children }: ContextProps) {
  return (
    <View
      data-ug-part="viewer-pane"
      as="section"
      aria-label="3D Viewer"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 560px)' }}
    >
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', height: '28', flex: 'none' } }}>
        <Type data-ug-part="viewer-title" as="h2" role="l3" weight="semi-bold">3D Viewer</Type>
      </View>
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flex: 'fill', width: 'fill', minHeight: '0' } }}>
        <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', gap: '0', flex: 'fill', minHeight: '0', overflow: 'hidden' } }}>
          <div data-ug-part="viewer-canvas" className="ug-scene">
            <MockViewerCanvas />
            <div className="ug-scene__controls">
              {children}
            </div>
          </div>
        </View>
      </View>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
