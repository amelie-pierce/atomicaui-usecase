# Popover-001: Help popover

Component family: **Popover**

UI type: **Popover**

Source: `src/usecase-gallery/usecases/popover/Popover-001/usecase.ts`

## What it is

A short text popover opened from a circle-question trigger beside a field label, closed by an X or an outside click.

## When to choose it

Use it for help text the user opens on purpose and may need to read for a while, or that holds a link or a diagram. Use a Tooltip for one short hover hint. Do not use it for a form or menu (Popover-002, Popover-003).

## Where it belongs

After the label of an input field in PFD, PBS, AGPD and RWS (HCS, ACE, ADM and HS use a Tooltip for field help). Real source: the help popover of each app (the paths are in the cases).

## Usage guidance

The Popover opens from `Popover.Trigger` (a text `Button` with `ContainedIcon` circle-question) above it (`side="top"`, `sideOffset={4}`); the Popup renders a `View` (color surface, solid, profile default, soft, elevation 4). Field help has three groups: PBS (a row, the text fills it and an xs `IconButton` X sits at its end, 320px), PFD (a column, a square Button X in its own row above the text, up to 384px) and AGPD and RWS (a 320px column, an xs `IconButton` X in its own row above the text). The close X itself is Button-029. The scenes leave out the optional image or diagram, and PBS's link parser.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `ContainedIcon`, `IconButton`, `Popover`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `solid`, `text`
- `profile`: `default`, `no-padding`, `square`, `square-compact`
- `scale`: `sm`, `xs`
- `color`: `secondary`, `surface`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Trigger** — The text circle-question button labelled "Material help" beside the field label; it is a compact square in PBS and the example and a square in PFD and AGPD. Selector: `[data-base-ui-click-trigger]`.
2. **Trigger icon** — The circle-question glyph inside the help trigger. Selector: `[data-base-ui-click-trigger] [class~="aui-contained-icon"]`.
3. **Popup** — The elevated soft surface (surface colour, solid, elevation 4) that opens above the trigger with a 4px offset: 320px wide, and up to 384px in PFD. Selector: `[data-aui-popup-motion][role="dialog"]`.
4. **Help text** — The p3 sentence "Select the base material of the member."; in PBS and the example it fills the row beside the close X, in the other apps it sits under it. Part marker: `data-ug-part="help-text"`. Direct text is highlighted.
5. **Close row** — The end-aligned row above the text in AGPD that holds only the close X. Part marker: `data-ug-part="close-row"`.
6. **Close** — The X that closes the popover: an xs icon button at the end of the row in PBS, in its own row in AGPD, and a square Button in PFD. Part marker: `data-ug-part="close"`.

## Apps

- PFD (`pfd`)
- PBS (`pbs`)
- AGPD (`agpd`)
- RWS (`rws`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Field help (`pbs-help`)

Apps: PBS

In context source: PBS: `src/InputFields.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/popover/Popover-001/example.tsx`

```tsx
import { useStageHost } from '../../../hooks/use-stage-host';
import { Button, ContainedIcon, IconButton, Popover, Type, View } from '../../../kit';

export default function Example() {
  const host = useStageHost();
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open>
        <Popover.Trigger
          render={<Button aria-label="Material help" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square-compact', shape: 'soft' }} />}
        >
          <ContainedIcon name="circle-question" />
        </Popover.Trigger>
        <Popover.Portal container={host}>
          <Popover.Positioner side="top" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Material help"
              render={
                <View
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', alignItems: 'start', gap: '8', width: '320' } }}
                />
              }
            >
              <Type data-ug-part="help-text" as="p" role="p3" aui={{ sx: { flex: 'fill' } }}>Select the base material of the member.</Type>
              <IconButton data-ug-part="close" name="xmark" aria-label="Close" aui={{ scale: 'xs', paint: 'text', profile: 'square-compact', shape: 'soft' }} />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/popover/Popover-001/options/pbs-help/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, ContainedIcon, IconButton, Popover, Type, View } from '../../../../../kit';

// PBS HelpPopover (src/InputFields.tsx): the circle-question trigger (a Button at profile "square-compact") opens a 320px popup above it (top, 4px offset).
// The popup is a row: the help text fills it and the close X sits at its end, a scale "xs" IconButton with no color of its own.
export default function PbsHelpScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open>
        <Popover.Trigger
          render={<Button aria-label="Material help" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square-compact', shape: 'soft' }} />}
        >
          <ContainedIcon name="circle-question" />
        </Popover.Trigger>
        <Popover.Portal container={host}>
          <Popover.Positioner side="top" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Material help"
              render={
                <View
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', alignItems: 'start', gap: '8', width: '320' } }}
                />
              }
            >
              <Type data-ug-part="help-text" as="p" role="p3" aui={{ sx: { flex: 'fill' } }}>Select the base material of the member.</Type>
              <IconButton data-ug-part="close" name="xmark" aria-label="Close" aui={{ scale: 'xs', paint: 'text', profile: 'square-compact', shape: 'soft' }} />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
```

### 2. Field help — UI variant 2 (`pfd-help`)

Apps: PFD

In context source: PFD: `src/pfd/fields.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/popover/Popover-001/options/pfd-help/example.tsx`

```tsx
import { useStageHost } from '../../../../../hooks/use-stage-host';
import { Button, ContainedIcon, Popover, Type, View } from '../../../../../kit';

export default function Example() {
  const host = useStageHost();
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open>
        <Popover.Trigger
          render={<Button aria-label="Material help" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft' }} />}
        >
          <ContainedIcon name="circle-question" />
        </Popover.Trigger>
        <Popover.Portal container={host}>
          <Popover.Positioner side="top" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Material help"
              render={
                <View
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '8', maxWidth: '384' } }}
                />
              }
            >
              <Button data-ug-part="close" aria-label="Close" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft', sx: { alignSelf: 'end' } }}>
                <ContainedIcon name="xmark" />
              </Button>
              <Type data-ug-part="help-text" as="div" role="p3">Select the base material of the member.</Type>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/popover/Popover-001/options/pfd-help/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, ContainedIcon, Popover, Type, View } from '../../../../../kit';

// PFD Help (src/pfd/fields.tsx): the circle-question trigger opens the popup above it (top, 4px offset); the popup is a View column (surface, solid, soft, elevation 4, gap 8, up to 384px).
// The close is a Button at profile "square" (not square-compact), alone in its own row at the end, above the help text. The optional image is left out.
export default function PfdHelpScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open>
        <Popover.Trigger
          render={<Button aria-label="Material help" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft' }} />}
        >
          <ContainedIcon name="circle-question" />
        </Popover.Trigger>
        <Popover.Portal container={host}>
          <Popover.Positioner side="top" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Material help"
              render={
                <View
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '8', maxWidth: '384' } }}
                />
              }
            >
              <Button data-ug-part="close" aria-label="Close" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft', sx: { alignSelf: 'end' } }}>
                <ContainedIcon name="xmark" />
              </Button>
              <Type data-ug-part="help-text" as="div" role="p3">Select the base material of the member.</Type>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
```

### 3. Field help — UI variant 3 (`agpd-help`)

Apps: AGPD, RWS

In context source: AGPD: `src/agpd/inputs.tsx`; RWS: `src/rws/inputs.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/popover/Popover-001/options/agpd-help/example.tsx`

```tsx
import { useStageHost } from '../../../../../hooks/use-stage-host';
import { Button, ContainedIcon, IconButton, Popover, Type, View } from '../../../../../kit';

export default function Example() {
  const host = useStageHost();
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open>
        <Popover.Trigger
          render={<Button aria-label="Material help" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft' }} />}
        >
          <ContainedIcon name="circle-question" />
        </Popover.Trigger>
        <Popover.Portal container={host}>
          <Popover.Positioner side="top" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Material help"
              render={
                <View
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '8', width: '320' } }}
                />
              }
            >
              <View data-ug-part="close-row" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', justifyContent: 'end' } }}>
                <IconButton data-ug-part="close" name="xmark" aria-label="Close" aui={{ scale: 'xs' }} />
              </View>
              <Type data-ug-part="help-text" as="div" role="p3">Select the base material of the member.</Type>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/popover/Popover-001/options/agpd-help/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, ContainedIcon, IconButton, Popover, Type, View } from '../../../../../kit';

// AGPD Help (src/agpd/inputs.tsx; RWS writes the same popup in src/rws/inputs.tsx): the circle-question trigger (a Button at profile "square") opens a 320px popup above it (top, 4px offset).
// The popup is a View column; the close X is an IconButton at scale "xs" with no other props, in its own row at the end above the help text. The optional diagram is left out.
export default function AgpdHelpScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open>
        <Popover.Trigger
          render={<Button aria-label="Material help" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft' }} />}
        >
          <ContainedIcon name="circle-question" />
        </Popover.Trigger>
        <Popover.Portal container={host}>
          <Popover.Positioner side="top" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Material help"
              render={
                <View
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '8', width: '320' } }}
                />
              }
            >
              <View data-ug-part="close-row" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', justifyContent: 'end' } }}>
                <IconButton data-ug-part="close" name="xmark" aria-label="Close" aui={{ scale: 'xs' }} />
              </View>
              <Type data-ug-part="help-text" as="div" role="p3">Select the base material of the member.</Type>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
