# Tooltip-003: Card button tooltip

Component family: **Tooltip**

UI type: **Tooltip on a button**

Source: `src/usecase-gallery/usecases/tooltip/Tooltip-003/usecase.ts`

## What it is

A selection card or an image button explains itself in a text tooltip.

## When to choose it

Use it for a note that belongs to one card or image and is too long for its label. Do not hide required information in it.

## Where it belongs

The option cards of the PFD input (the Embedded Strap note) and the product image toggle of the RWS output ("Show in 3D").

## Usage guidance

PFD: the card (a View as button, min 96px, a ContainedImage over its label) is the Tooltip.Trigger and the Provider has delay 0, so the note opens at once; the popup is the kit default at the default side, 4px offset, up to 384px wide. RWS: the image Button (color surface, paint text, soft, 96 by 80, 4px padding, aria-pressed) is the trigger; its popup, the kit default, opens to the right (right, 4px offset) with "Show in 3D" and is not mounted once the product is shown. The scenes use a representative connection image and show one card or button with the tooltip open, leaving out the other cards and the output row.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Tooltip`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `surface`
- `paint`: `fixed`, `text`
- `shape`: `soft`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Trigger** — The selection target: a 96 by 80 surface image Button labelled "Show in 3D" in the example and RWS, or the PFD "Embedded Strap" card (a View as button, at least 96px square). Part marker: `data-ug-part="trigger"`.
2. **Thumbnail** — The connection image drawn inside the trigger as an aria-hidden svg (72px wide in the example, 64px in the PFD card). Selector: `[data-ug-part="trigger"] > svg`.
3. **Card label** — The PFD card caption "Embedded Strap" under the image. Part marker: `data-ug-part="card-label"`. Direct text is highlighted.
4. **Positioner** — Opens the note to the right of the image button with a 4px offset (side="right"); PFD uses the default side. Selector: `[class~="aui-tooltip-positioner"]`.
5. **Popup** — The text tooltip surface; in PFD it is allowed to grow to 384px for the longer note. Selector: `[class~="aui-tooltip-popup"]`.
6. **Note** — The explanation text: "Show in 3D" in the example and RWS, "Use with a continuous strap along the plate." in PFD. Selector: `[class~="aui-tooltip-popup"]`. Direct text is highlighted.

## Component layer steps

1. **Trigger** — The selection target: a 96 by 80 surface image Button labelled "Show in 3D" in the example and RWS, or the PFD "Embedded Strap" card (a View as button, at least 96px square). Selector: `[data-ug-part="trigger"]`.
2. **Thumbnail** — The connection image drawn inside the trigger as an aria-hidden svg (72px wide in the example, 64px in the PFD card). Selector: `[data-ug-part="trigger"] > svg`.
3. **Positioner** — Opens the note to the right of the image button with a 4px offset (side="right"); PFD uses the default side. Selector: `[class~="aui-tooltip-positioner"]`.
4. **Popup** — The text tooltip surface; in PFD it is allowed to grow to 384px for the longer note. Selector: `[class~="aui-tooltip-popup"]`.

## Apps

- PFD (`pfd`)
- RWS (`rws`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Selection card tooltip (`pfd-card-note`)

Apps: PFD

In context source: PFD: `src/pfd/SelectionCards.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/tooltip/Tooltip-003/example.tsx`

```tsx
import { Button, Tooltip } from '../../../kit';

export default function Example() {
  return (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger render={<Button data-ug-part="trigger" aria-label="Show in 3D" aui={{ color: 'surface', paint: 'text', shape: 'soft', sx: { width: '96', height: '80' } }} />}>
          <svg viewBox="0 0 192 128" aria-hidden="true" style={{ width: 'var(--p-px-72)', aspectRatio: '4 / 3' }}>
              <rect width="192" height="128" fill="var(--theme-surface-alt)" />
              <path d="M24 20h144v18H24zM36 38h120v18H36z" fill="var(--theme-muted)" stroke="var(--theme-secondary)" strokeWidth="2" />
              <path d="M66 56v46h60V56M75 56v37h42V56" fill="var(--theme-surface)" stroke="var(--theme-secondary)" strokeWidth="3" />
              <path d="M48 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M138 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M82 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M104 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="var(--theme-secondary)" />
            </svg>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner side="right" sideOffset={4}>
            <Tooltip.Popup>Show in 3D</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </Tooltip.Provider>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/tooltip/Tooltip-003/options/pfd-card-note/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Tooltip, Type, View } from '../../../../../kit';

// PFD CardTooltip (src/pfd/SelectionCards.tsx line 118): a selection card (a View as button, min 96px, an image over its label) is the trigger; the Provider has delay 0 so the note opens at once. The popup is the kit default,
// at the default side with a 4px offset, up to 384px wide. The image is representative. Shown open; the scene keeps one card.
export default function PfdCardNoteScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', paddingBlockStart: 'calc(var(--p-px-16) * 8)' }}>
      <Tooltip.Provider delay={0}>
        <Tooltip open>
          <Tooltip.Trigger
            render={<View data-ug-part="trigger" as="button" aria-label="Embedded Strap" aui={{ color: 'surface', paint: 'fixed', shape: 'soft', sx: { display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minHeight: '96', minWidth: '96', gap: '4' } }} {...{ type: 'button' }} />}
          >
            <svg viewBox="0 0 192 128" aria-hidden="true" style={{ width: 'var(--p-px-64)', aspectRatio: '4 / 3' }}>
              <rect width="192" height="128" fill="var(--theme-surface-alt)" />
              <path d="M24 20h144v18H24zM36 38h120v18H36z" fill="var(--theme-muted)" stroke="var(--theme-secondary)" strokeWidth="2" />
              <path d="M66 56v46h60V56M75 56v37h42V56" fill="var(--theme-surface)" stroke="var(--theme-secondary)" strokeWidth="3" />
              <path d="M48 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M138 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M82 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M104 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="var(--theme-secondary)" />
            </svg>
            <Type data-ug-part="card-label" as="span" role="p3">Embedded Strap</Type>
          </Tooltip.Trigger>
          <Tooltip.Portal container={host}>
            <Tooltip.Positioner sideOffset={4} className="ug-anchored">
              <Tooltip.Popup aui={{ sx: { maxWidth: '384' } }}>Use with a continuous strap along the plate.</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </Tooltip.Provider>
    </View>
  );
}
```

### 2. 3D image tooltip (`rws-show-in-3d`)

Apps: RWS

In context source: RWS: `src/rws/output.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/tooltip/Tooltip-003/options/rws-show-in-3d/example.tsx`

```tsx
import { Button, Tooltip } from '../../../../../kit';

export default function Example() {
  return (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger render={<Button data-ug-part="trigger" aria-label="Show in 3D" aui={{ color: 'surface', paint: 'text', shape: 'soft', sx: { width: '96', height: '80' } }} />}>
          <svg viewBox="0 0 192 128" aria-hidden="true" style={{ width: 'var(--p-px-72)', aspectRatio: '4 / 3' }}>
              <rect width="192" height="128" fill="var(--theme-surface-alt)" />
              <path d="M24 20h144v18H24zM36 38h120v18H36z" fill="var(--theme-muted)" stroke="var(--theme-secondary)" strokeWidth="2" />
              <path d="M66 56v46h60V56M75 56v37h42V56" fill="var(--theme-surface)" stroke="var(--theme-secondary)" strokeWidth="3" />
              <path d="M48 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M138 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M82 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M104 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="var(--theme-secondary)" />
            </svg>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner side="right" sideOffset={4}>
            <Tooltip.Popup>Show in 3D</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </Tooltip.Provider>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/tooltip/Tooltip-003/options/rws-show-in-3d/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Tooltip, View } from '../../../../../kit';

// RWS output (src/rws/output.tsx line 664): the product image toggle, a Button (color surface, paint text, soft, 96 by 80, 4px padding) holding the image, is the Tooltip.Trigger; the popup is the kit default and opens to the right
// (right, 4px offset) with "Show in 3D" while the product is not yet shown. The image is representative. Shown open; the scene keeps one toggle.
export default function RwsShowIn3dScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 8)' }}>
      <Tooltip.Provider>
        <Tooltip open>
          <Tooltip.Trigger render={<Button data-ug-part="trigger" aria-label="Show in 3D" aria-pressed={false} aui={{ color: 'surface', paint: 'text', shape: 'soft', sx: { width: '96', height: '80', paddingBlockStart: '4', paddingBlockEnd: '4', paddingInlineStart: '4', paddingInlineEnd: '4' } }} />}>
            <svg viewBox="0 0 192 128" aria-hidden="true" style={{ width: '100%', aspectRatio: '4 / 3' }}>
              <rect width="192" height="128" fill="var(--theme-surface-alt)" />
              <path d="M24 20h144v18H24zM36 38h120v18H36z" fill="var(--theme-muted)" stroke="var(--theme-secondary)" strokeWidth="2" />
              <path d="M66 56v46h60V56M75 56v37h42V56" fill="var(--theme-surface)" stroke="var(--theme-secondary)" strokeWidth="3" />
              <path d="M48 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M138 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M82 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M104 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="var(--theme-secondary)" />
            </svg>
          </Tooltip.Trigger>
          <Tooltip.Portal container={host}>
            <Tooltip.Positioner side="right" sideOffset={4} className="ug-anchored">
              <Tooltip.Popup>Show in 3D</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </Tooltip.Provider>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
