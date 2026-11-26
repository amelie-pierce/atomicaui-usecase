# Tooltip-002: Text button tooltip

Component family: **Tooltip**

UI type: **Tooltip on a button**

Source: `src/usecase-gallery/usecases/tooltip/Tooltip-002/usecase.ts`

## What it is

Hovering or focusing a link, cell or mark opens a tooltip that holds a larger image instead of text.

## When to choose it

Use it to preview an image the row or label already links to, without leaving the page. Not for text that explains a control (Tooltip-001, 005).

## Where it belongs

Result tables and drawings: the Model cell of the PFD results table, the image links of the RWS output and the hanger marks of the HS slope calculator.

## Usage guidance

The trigger is the element the user already points at, written with `render`: PFD a flex View (thumbnail plus product link), RWS the Type anchor itself, HS a Button (scale sm, color secondary, paint solid) with a short mark label. The popup is the kit default; its content is a View of fixed width holding the image: 96px (PFD, above, 4px offset), 192px (RWS) and 160px with a bold title (HS), the last two at the default side with a 4px offset. The scenes use a representative connection image. The scenes show one trigger with the tooltip open and leave out the table, the other rows and marks and the drawing.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Tooltip`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `paint`: `solid`, `text`
- `profile`: `no-padding`
- `color`: `secondary`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Trigger** — The element the user already points at: a "Preview" Button in the example, a thumbnail-and-link View in PFD, the "Connection detail" link in RWS, and the solid secondary "A" mark Button in HS. Part marker: `data-ug-part="trigger"`.
2. **Product link** — The PFD underlined secondary link "Model C-300" beside the thumbnail. Part marker: `data-ug-part="product-link"`. Direct text is highlighted.
3. **Popup** — The default tooltip surface, which here holds an image instead of text: 192px wide in the example and RWS, 96px in PFD, 160px in HS. Selector: `[class~="aui-tooltip-popup"]`.
4. **Preview image** — The representative connection drawing (an svg with role="img") that the tooltip shows, such as "Connection detail" or "Model C-300 connection preview". Selector: `[class~="aui-tooltip-popup"] svg`.
5. **Preview title** — The HS-only bold l4 title "Hanger A" above the image. Part marker: `data-ug-part="preview-title"`. Direct text is highlighted.

## Component layer steps

1. **Trigger** — Hovering or focusing the existing action reveals its image preview. Selector: `[data-ug-part="trigger"]`.
2. **Popup** — Image tooltip widths vary by app: 96px, 160px, or 192px. Selector: `[class~="aui-tooltip-popup"]`.
3. **Preview image** — Connection drawing previews the named detail without adding another control. Selector: `[class~="aui-tooltip-popup"] svg`.

## Apps

- PFD (`pfd`)
- RWS (`rws`)
- HS (`hs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Image preview (`pfd-image-preview`)

Apps: PFD

In context source: PFD: `src/pfd/ResultsTable.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/tooltip/Tooltip-002/example.tsx`

```tsx
import { Button, Tooltip } from '../../../kit';

export default function Example() {
  return (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger render={<Button data-ug-part="trigger" aui={{ scale: 'sm' }} />}>Preview</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={4}>
            <Tooltip.Popup><svg viewBox="0 0 192 128" role="img" aria-label="Connection detail" style={{ width: 'var(--p-px-192)', aspectRatio: '4 / 3' }}>
              <rect width="192" height="128" fill="var(--theme-surface-alt)" />
              <path d="M24 20h144v18H24zM36 38h120v18H36z" fill="var(--theme-muted)" stroke="var(--theme-secondary)" strokeWidth="2" />
              <path d="M66 56v46h60V56M75 56v37h42V56" fill="var(--theme-surface)" stroke="var(--theme-secondary)" strokeWidth="3" />
              <path d="M48 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M138 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M82 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M104 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="var(--theme-secondary)" />
            </svg></Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </Tooltip.Provider>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/tooltip/Tooltip-002/options/pfd-image-preview/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Tooltip, Type, View } from '../../../../../kit';

// PFD ResultsTable ProductCell (src/pfd/ResultsTable.tsx line 59): the Model cell (a thumbnail and the product link, in a flex View) is the trigger; hover or focus opens the popup, kit default (surface, scale sm), above it (top, 4px offset),
// holding the larger image 96px wide (shown with a representative connection image). Shown open; the scene keeps one cell.
export default function PfdImagePreviewScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', paddingBlockStart: 'calc(var(--p-px-16) * 8)' }}>
      <Tooltip open>
        <Tooltip.Trigger render={<View data-ug-part="trigger" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '8', minHeight: '32' } }} />}>
          <svg viewBox="0 0 192 128" aria-hidden="true" style={{ width: 'var(--p-px-32)', aspectRatio: '4 / 3' }}>
              <rect width="192" height="128" fill="var(--theme-surface-alt)" />
              <path d="M24 20h144v18H24zM36 38h120v18H36z" fill="var(--theme-muted)" stroke="var(--theme-secondary)" strokeWidth="2" />
              <path d="M66 56v46h60V56M75 56v37h42V56" fill="var(--theme-surface)" stroke="var(--theme-secondary)" strokeWidth="3" />
              <path d="M48 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M138 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M82 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M104 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="var(--theme-secondary)" />
            </svg>
          <Type data-ug-part="product-link" as="a" role="l4" color="secondary" href="#" onClick={(event) => event.preventDefault()} aui={{ sx: { textDecoration: 'underline' } }}>Model C-300</Type>
        </Tooltip.Trigger>
        <Tooltip.Portal container={host}>
          <Tooltip.Positioner side="top" sideOffset={4} className="ug-anchored">
            <Tooltip.Popup>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { width: '96', height: '64', display: 'flex', alignItems: 'center', justifyContent: 'center' } }}>
                <svg viewBox="0 0 192 128" role="img" aria-label="Model C-300 connection preview" style={{ width: '100%', aspectRatio: '4 / 3' }}>
              <rect width="192" height="128" fill="var(--theme-surface-alt)" />
              <path d="M24 20h144v18H24zM36 38h120v18H36z" fill="var(--theme-muted)" stroke="var(--theme-secondary)" strokeWidth="2" />
              <path d="M66 56v46h60V56M75 56v37h42V56" fill="var(--theme-surface)" stroke="var(--theme-secondary)" strokeWidth="3" />
              <path d="M48 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M138 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M82 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M104 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="var(--theme-secondary)" />
            </svg>
              </View>
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </View>
  );
}
```

### 2. Linked image preview (`rws-image-link`)

Apps: RWS

In context source: RWS: `src/rws/output.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/tooltip/Tooltip-002/options/rws-image-link/example.tsx`

```tsx
import { Button, Tooltip } from '../../../../../kit';

export default function Example() {
  return (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger render={<Button data-ug-part="trigger" aui={{ scale: 'sm' }} />}>Preview</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={4}>
            <Tooltip.Popup><svg viewBox="0 0 192 128" role="img" aria-label="Connection detail" style={{ width: 'var(--p-px-192)', aspectRatio: '4 / 3' }}>
              <rect width="192" height="128" fill="var(--theme-surface-alt)" />
              <path d="M24 20h144v18H24zM36 38h120v18H36z" fill="var(--theme-muted)" stroke="var(--theme-secondary)" strokeWidth="2" />
              <path d="M66 56v46h60V56M75 56v37h42V56" fill="var(--theme-surface)" stroke="var(--theme-secondary)" strokeWidth="3" />
              <path d="M48 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M138 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M82 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M104 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="var(--theme-secondary)" />
            </svg></Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </Tooltip.Provider>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/tooltip/Tooltip-002/options/rws-image-link/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Tooltip, Type, View } from '../../../../../kit';

// RWS ImageLink (src/rws/output.tsx line 678): a text link is the trigger (the link itself, `render` of the Type anchor); hover or focus opens the popup, kit default, at the default side with a 4px offset,
// holding an image 192px wide (shown with a representative connection image). Shown open; the scene keeps one link.
export default function RwsImageLinkScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', paddingBlockStart: 'calc(var(--p-px-16) * 10)' }}>
      <Tooltip.Provider>
        <Tooltip open>
          <Tooltip.Trigger render={<Type data-ug-part="trigger" as="a" href="#" onClick={(event) => event.preventDefault()} role="l4" color="secondary" aui={{ sx: { textDecoration: 'underline', whiteSpace: 'nowrap' } }} />}>Connection detail</Tooltip.Trigger>
          <Tooltip.Portal container={host}>
            <Tooltip.Positioner sideOffset={4} className="ug-anchored">
              <Tooltip.Popup>
                <View aui={{ paint: 'text', profile: 'no-padding', sx: { width: '192', height: '128', display: 'flex', alignItems: 'center', justifyContent: 'center' } }}>
                  <svg viewBox="0 0 192 128" role="img" aria-label="Connection detail preview" style={{ width: '100%', aspectRatio: '4 / 3' }}>
              <rect width="192" height="128" fill="var(--theme-surface-alt)" />
              <path d="M24 20h144v18H24zM36 38h120v18H36z" fill="var(--theme-muted)" stroke="var(--theme-secondary)" strokeWidth="2" />
              <path d="M66 56v46h60V56M75 56v37h42V56" fill="var(--theme-surface)" stroke="var(--theme-secondary)" strokeWidth="3" />
              <path d="M48 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M138 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M82 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M104 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="var(--theme-secondary)" />
            </svg>
                </View>
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </Tooltip.Provider>
    </View>
  );
}
```

### 3. Hanger mark preview (`hs-hanger-mark`)

Apps: HS

In context source: HS: `src/hs/SlopeCalculator.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/tooltip/Tooltip-002/options/hs-hanger-mark/example.tsx`

```tsx
import { Button, Tooltip } from '../../../../../kit';

export default function Example() {
  return (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger render={<Button data-ug-part="trigger" aui={{ scale: 'sm' }} />}>Preview</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={4}>
            <Tooltip.Popup><svg viewBox="0 0 192 128" role="img" aria-label="Connection detail" style={{ width: 'var(--p-px-192)', aspectRatio: '4 / 3' }}>
              <rect width="192" height="128" fill="var(--theme-surface-alt)" />
              <path d="M24 20h144v18H24zM36 38h120v18H36z" fill="var(--theme-muted)" stroke="var(--theme-secondary)" strokeWidth="2" />
              <path d="M66 56v46h60V56M75 56v37h42V56" fill="var(--theme-surface)" stroke="var(--theme-secondary)" strokeWidth="3" />
              <path d="M48 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M138 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M82 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M104 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="var(--theme-secondary)" />
            </svg></Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </Tooltip.Provider>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/tooltip/Tooltip-002/options/hs-hanger-mark/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Tooltip, Type, View } from '../../../../../kit';

// HS SlopeCalculator (src/hs/SlopeCalculator.tsx line 158): a mark on the drawing is a Button (scale sm, color secondary, paint solid) with a short label; it is the trigger and its popup, kit default, at the default side with a 4px offset,
// holds a bold title and an image 150px wide in a 160px View (shown with a representative connection image). Shown open; the scene keeps one mark.
export default function HsHangerMarkScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', paddingBlockStart: 'calc(var(--p-px-16) * 10)' }}>
      <Tooltip.Provider>
        <Tooltip open>
          <Tooltip.Trigger render={<Button data-ug-part="trigger" aria-label="Hanger mark A" aui={{ scale: 'sm', color: 'secondary', paint: 'solid' }} />}>A</Tooltip.Trigger>
          <Tooltip.Portal container={host}>
            <Tooltip.Positioner sideOffset={4} className="ug-anchored">
              <Tooltip.Popup>
                <View aui={{ paint: 'text', sx: { width: '160' } }}>
                  <Type data-ug-part="preview-title" as="strong" role="l4" weight="bold">Hanger A</Type>
                  <svg viewBox="0 0 192 128" role="img" aria-label="Hanger A connection preview" style={{ width: 'calc(var(--p-px-96) + var(--p-px-48) + var(--p-px-6))', aspectRatio: '4 / 3' }}>
              <rect width="192" height="128" fill="var(--theme-surface-alt)" />
              <path d="M24 20h144v18H24zM36 38h120v18H36z" fill="var(--theme-muted)" stroke="var(--theme-secondary)" strokeWidth="2" />
              <path d="M66 56v46h60V56M75 56v37h42V56" fill="var(--theme-surface)" stroke="var(--theme-secondary)" strokeWidth="3" />
              <path d="M48 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M138 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M82 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M104 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="var(--theme-secondary)" />
            </svg>
                </View>
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </Tooltip.Provider>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
