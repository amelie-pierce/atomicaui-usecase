# Button-009: Open view options button

Component family: **Button**

UI type: **Single button**

Source: `src/usecase-gallery/usecases/button/Button-009/usecase.ts`

## What it is

A tonal text Button in the corner of the 3D viewer opens the camera and visibility controls in a popover.

## When to choose it

Use it when the controls would crowd a small canvas. It has no icon; the popover holds the same stack as the desktop overlay (Button-039).

## Where it belongs

The top-right corner of the 3D Viewer canvas, 8px in, in compact layouts where the floating controls are hidden. It is not in the Output toolbar. ADM writes the same Button as Save image in the Thickness Calculator dialog (secondary tonal, scale "sm", shape "soft"; measured 28px high, 3px 7px padding, white fill, 1px dark border, the same as View options), a place of this variant that the preview does not draw. Real site source: HCS (View options); Print Output, its sibling tonal button, is Button-001. Built from the viewer pane in src/App.tsx (lines 1522-1651) and index.css (.f02-mobile-options, .f02-popover).

## Usage guidance

Set aui scale "sm", color "surface" and paint "tonal". In the app it is the trigger of a Popover (side bottom, align end, offset 4). In context the scene is the compact 3D Viewer: the button sits in the top end corner of the scene, 8px in (a gallery rule for the app's `.f02-mobile-options`), and the popup is open below it on a surface card (12px padding, 4px radius, shadow) holding Reset view and the projection radios (the Object Visibility checkboxes are left out). The canvas is a framed stand-in.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `IconButton`, `Popover`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `primary`, `surface`, `surface-alt`
- `paint`: `fixed`, `text`, `tonal`
- `profile`: `block-padding`, `default`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Container** — The View options Button in the corner of the 3D viewer: small, surface color with tonal paint, acting as the trigger of the camera and visibility popover. Selector: `[class~="aui-button"]`.
2. **Label** — The text "View options" that names the popover of camera and visibility controls. Selector: `[class~="aui-button"]`. Direct text is highlighted.

## Apps

- HCS (`hcs`)
- ADM (`adm`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Tonal outlined (`default`)

Apps: HCS, ADM

In context source: HCS: `src/App.tsx`; ADM: `src/features/base-plate/components/ThicknessCalculatorDialog.tsx`

In context view: Shown.

#### In context structure additions

1. **3D Viewer pane** — The 3D Viewer section with its heading and the viewer canvas that the controls float over. Part marker: `data-ug-part="viewer-pane"`.
2. **Options corner** — The top-end corner of the scene, 8px in, that holds the View options trigger. Part marker: `data-ug-part="corner"`.
3. **View options popover** — The open popover under the trigger (bottom, end, 4px offset) that holds the viewer controls. Part marker: `data-ug-part="options-popover"`.
4. **Reset view button** — The outlined bullseye IconButton in the popover that resets the camera. Part marker: `data-ug-part="reset-view"`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-009/example.tsx`

```tsx
import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button aui={{ scale: 'sm', color: 'surface', paint: 'tonal' }}>View options</Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-009/options/default/scene.tsx`

```tsx
import { useRef } from 'react';
import type { ContextProps } from '../../../../../types';
import { IconButton, Popover, Type, View } from '../../../../../kit';
import { MockViewerCanvas, MockViewerControls } from '../../../../../mock-data';

// The compact 3D Viewer (side-by-side and engineering layouts, narrow screens), where the floating controls give way to one View options
// button in the top-end corner of the scene, 8px in (the app's `.f02-mobile-options`, the `ug-scene__options` rule). The button is the
// trigger of a Popover (side bottom, align end, offset 4) whose popup is the Reset view and the projection radios, on a surface card
// (`.f02-popover`: 12px padding, 4px radius, shadow). It is shown open and floats over the canvas.
export default function ViewerOptionsContext({ children, host }: ContextProps) {
  const anchor = useRef<HTMLSpanElement>(null);
  return (
    <View
      as="section"
      data-ug-part="viewer-pane"
      aria-label="3D Viewer"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 560px)' }}
    >
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', height: '28', flex: 'none' } }}>
        <Type as="h2" role="l3" weight="semi-bold">3D Viewer</Type>
      </View>
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flex: 'fill', width: 'fill', minHeight: '0' } }}>
        <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', gap: '0', flex: 'fill', minHeight: '0', overflow: 'hidden' } }}>
          <div className="ug-scene">
            <MockViewerCanvas />
            <Popover open>
              <span ref={anchor} data-ug-part="corner" className="ug-scene__options">
                {children}
              </span>
              <Popover.Portal container={host}>
                <Popover.Positioner anchor={anchor} side="bottom" align="end" sideOffset={4} className="ug-anchored">
                  <Popover.Popup data-ug-part="options-popover" initialFocus={false} aria-label="View options" className="ug-scene__popover">
                    <div className="ug-scene__controls" style={{ position: 'static', maxInlineSize: 'none' }}>
                      <IconButton
                        data-ug-part="reset-view"
                        name="bullseye"
                        aria-label="Reset view"
                        title="Reset view"
                        aui={{ scale: 'sm', color: 'primary', paint: 'text', shape: 'soft', sx: { borderWidth: '1', borderStyle: 'solid', borderColor: 'outlined' } }}
                      />
                      <MockViewerControls />
                    </div>
                  </Popover.Popup>
                </Popover.Positioner>
              </Popover.Portal>
            </Popover>
          </div>
        </View>
      </View>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
