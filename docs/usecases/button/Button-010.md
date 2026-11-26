# Button-010: Show locked field option button

Component family: **Button**

UI type: **Single button**

Source: `src/usecase-gallery/usecases/button/Button-010/usecase.ts`

## What it is

A small primary text Button in a lock popover reveals the option that controls a locked field.

## When to choose it

Use it when a field is locked by another setting and the user needs a way to reach that setting: the text names the controlling option and this Button jumps to it.

## Where it belongs

The popover of the lock icon after a field label in the AGPD input pane (LockHint). It exists only in AGPD; the lock trigger is a square label-row Button like Button-032 and the popover has no close X.

## Usage guidance

Set aui paint "text", color "primary" and scale "xs"; it is the only action in the popup, at the start under the explanatory line. In context the lock trigger (profile "square", secondary text) opens a 288px View column (surface, solid, soft, elevation 4, gap 8) above it, shown open: the line "Controlled by Plate Option, currently ...", then this Button. The hover and focus open, the 250 ms hide delay and the rest of the field are left out.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `ContainedIcon`, `Popover`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `solid`, `text`
- `color`: `primary`, `secondary`, `surface`
- `scale`: `sm`, `xs`
- `profile`: `default`, `no-padding`, `square`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Container** — The Show Plate Option Button at the start of the lock popup: extra small, primary text paint, with no fill so it reads as an accent link under the explanatory line. Selector: `[class~="aui-button"]:not([aria-label="Thickness is locked"])`.
2. **Label** — The text "Show Plate Option" that reveals the option controlling the locked field. Selector: `[class~="aui-button"]:not([aria-label="Thickness is locked"])`. Direct text is highlighted.
3. **Popup** — The 288px popup that opens from the lock icon, holding the line "Controlled by Plate Option, currently ..." above this Button. Selector: `[data-aui-popup-motion][role="dialog"]`.

## Component layer steps

1. **Container** — The Show Plate Option Button at the start of the lock popup: extra small, primary text paint, with no fill so it reads as an accent link under the explanatory line. Selector: `[class~="aui-button"]:not([aria-label="Thickness is locked"])`.
2. **Popup** — The 288px popup that opens from the lock icon, holding the line "Controlled by Plate Option, currently ..." above this Button. Selector: `[data-aui-popup-motion][role="dialog"]`.

## Apps

- AGPD (`agpd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Lock hint (`agpd-lock-hint`)

Apps: AGPD

In context source: AGPD: `src/agpd/inputs.tsx`

In context view: Shown.

#### In context structure additions

1. **Lock trigger** — The square lock button after the field label (aria-label "Thickness is locked") that opens the hint on hover or focus. Part marker: `data-ug-part="lock-trigger"`.
2. **Hint text** — The line "Controlled by Plate Option" and its current value "All Plates based on the stock model". Part marker: `data-ug-part="hint-text"`.

#### In context layer steps

1. **Lock trigger** — The square lock button after the field label (aria-label "Thickness is locked") that opens the hint on hover or focus. Selector: `[data-ug-part="lock-trigger"]`.
2. **Hint text** — The line "Controlled by Plate Option" and its current value "All Plates based on the stock model". Selector: `[data-ug-part="hint-text"]`.
3. **Container** — The Show Plate Option Button at the start of the lock popup: extra small, primary text paint, with no fill so it reads as an accent link under the explanatory line. Selector: `[class~="aui-button"]:not([aria-label="Thickness is locked"])`.
4. **Popup** — The 288px popup that opens from the lock icon, holding the line "Controlled by Plate Option, currently ..." above this Button. Selector: `[data-aui-popup-motion][role="dialog"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-010/example.tsx`

```tsx
import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button aui={{ paint: 'text', color: 'primary', scale: 'xs' }}>
      Show Plate Option
    </Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-010/options/agpd-lock-hint/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, ContainedIcon, Popover, Type, View } from '../../../../../kit';

// AGPD LockHint (src/agpd/inputs.tsx): the lock trigger (a Button at profile "square") after a field label opens a 288px popup above it (top, 4px offset) on hover or focus.
// The popup is a View column: a line saying which option controls the field, then the action, an xs primary text Button at the start. Shown open.
export default function AgpdLockHintScene({ children, host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open>
        <Popover.Trigger render={<Button data-ug-part="lock-trigger" aria-label="Thickness is locked" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft' }} />}>
          <ContainedIcon name="lock" />
        </Popover.Trigger>
        <Popover.Portal container={host}>
          <Popover.Positioner side="top" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Thickness is locked"
              data-ug-part="hint-popup"
              render={
                <View
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '8', width: '288' } }}
                />
              }
            >
              <Type data-ug-part="hint-text" as="p" role="p3">
                Controlled by <Type as="strong" weight="semi-bold">Plate Option</Type> — currently “All Plates based on the stock model”.
              </Type>
              <View aui={{ paint: 'text', profile: 'no-padding' }}>{children}</View>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
