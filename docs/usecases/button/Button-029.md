# Button-029: Close popover button

Component family: **Button**

UI type: **Icon button**

Source: `src/usecase-gallery/usecases/button/Button-029/usecase.ts`

## What it is

A transparent icon-only IconButton, 20px square, closes a popover from its corner.

## When to choose it

Use it to dismiss a popover without acting. Always set aria-label.

## Where it belongs

The corner or title end of a popover: the help popover that opens from the circle-question trigger of a field (HCS, PFD, PBS, AGPD, RWS) and the FD apps popover. The trigger that opens the help is Button-032.

## Usage guidance

The example is the shared part: an IconButton with paint "text", profile "contained" and an aria-label; the apps differ only in the glyph, the props they set and where the button sits. The Popover is the supporting part the In context scene writes around it; IconButton needs the Font Awesome font to show its glyph. Help popover close: HCS (an IconButton at scale "sm", profile "square-compact", color "secondary", paint "text", shape "soft", sx flex "none", at the end of an intro row in a View card, surface, solid, soft, elevation 4, up to 34rem, above the circle-question trigger; top, start, 8px offset). PFD: a Button (not an IconButton) with a ContainedIcon xmark at profile "square", scale "sm", secondary, text, alone in its own row at the end above the text, in a column up to 384px. PBS: an IconButton at scale "xs", paint "text", profile "square-compact", shape "soft" and no color, at the end of a row beside the help text, in a 320px popup. AGPD and RWS: an IconButton with only scale "xs", right-aligned in its own row above the text, in a 320px column. The optional image or diagram of the PFD, AGPD and RWS popups is left out. Apps popover close: FD only (a Button with an xmark Icon child, color "secondary", paint "text", scale "sm", at the end of the title row "Explore More Applications" in the 288px apps popover opened from the top bar grip; the grid of app links is left out).

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `ContainedIcon`, `Icon`, `IconButton`, `Menubar`, `Popover`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `solid`, `text`
- `profile`: `contained`, `default`, `no-padding`, `square`, `square-compact`
- `scale`: `sm`, `xs`
- `color`: `secondary`, `surface`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Close** — The transparent xmark button that dismisses the popover; it is the 20px contained one in the example, and the scenes place it at the corner (AGPD, HCS, PBS) or use a Button with an icon (FD Close applications, PFD). Selector: `[class~="aui-button"][aria-label^="Close"]`. Layer step: **Close** — Transparent X dismisses the popover; apps place it in different corners.
2. **Close icon** — The xmark glyph centred in the close button. Selector: `[class~="aui-button"][aria-label^="Close"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`. Layer step: **Close icon** — The xmark glyph centred in the close button. Code target: `IconButton`, `ContainedIcon`.
3. **Popover popup** — The floating surface (solid, soft, elevation 4) that holds the help text or the Explore More Applications list with the close button in its corner. Selector: `[data-aui-popup-motion][role="dialog"]`. Layer step: **Popover popup** — Floating soft surface holds help text or the app list and Close. Code target: `Popover.Popup`.
4. **Help trigger** — The circle-question button (Material help, Help with Download Duration) that anchors the popover in the help scenes. Selector: `[class~="aui-button"][aria-label*="elp"]:not([aria-label^="Close"])`. Layer step: **Help trigger** — Circle-question button anchors help to its related control.
5. **Apps trigger** — FD only: the grip button in the top bar that opens Explore More Applications. Selector: `[class~="aui-button"][aria-label="Apps"]`. Layer step: **Apps trigger** — FD grip in the top bar opens the application list.

## Apps

- HCS (`hcs`)
- PFD (`pfd`)
- PBS (`pbs`)
- FD (`fd`)
- AGPD (`agpd`)
- RWS (`rws`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Help popover close (`hcs-help-close`)

Apps: HCS

In context source: HCS: `src/components/HcsDownloadDurationHelp.tsx`

In context view: Shown.

#### In context structure additions

1. **Help intro** — The line "Duration of load adjustments as specified by the code are as follows:" that fills the popup row and leaves the close X at its end. Selector: `[data-ug-part="help-intro"]`.
2. **Duration notes** — The plain list of five load-duration notes under the intro, each with a quoted bold label and its description. Selector: `[data-ug-part="duration-notes"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-029/example.tsx`

```tsx
import { IconButton } from '../../../kit';

export default function Example() {
  return <IconButton name="xmark" aria-label="Close" aui={{ paint: 'text', profile: 'contained' }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-029/options/hcs-help-close/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { IconButton, Popover, Type, View } from '../../../../../kit';
import { MOCK_DURATION_NOTES } from '../../../../../mock-data';

// HcsDownloadDurationHelp: the circle-question trigger opens a popup above it (top, start, 8px offset). The popup is a
// View column: an intro row with the close X at its end, then a plain list of the five duration notes. HCS sets its
// width to min(34rem, viewport - 16px); the scene keeps min(34rem, stage) inline, since sx has no min() token.
// The wrapper keeps stage room (inline min-block-size) above the trigger for the popup.
export default function HcsHelpCloseScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 18)', inlineSize: 'min(100%, calc(var(--p-px-16) * 40))' }}>
    <Popover open>
      <Popover.Trigger
        render={
          <IconButton
            name="circle-question"
            aria-label="Help with Download Duration"
            aui={{ scale: 'sm', profile: 'contained', color: 'secondary', paint: 'text', shape: 'soft' }}
          />
        }
      />
      <Popover.Portal container={host}>
        <Popover.Positioner side="top" align="start" sideOffset={8} collisionPadding={8} className="ug-anchored">
          <Popover.Popup
            initialFocus={false}
            aria-label="Download Duration help"
            style={{ inlineSize: 'min(34rem, 100%)', overflowY: 'auto' }}
            render={
              <View
                aui={{ scale: 'sm', profile: 'default', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column' } }}
              />
            }
          >
            <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text', sx: { display: 'flex', alignItems: 'start' } }}>
              <Type data-ug-part="help-intro" aui={{ sx: { flex: 'fill' } }}>
                Duration of load adjustments as specified by the code are as follows:
              </Type>
              <span data-ug-component-root style={{ display: 'contents' }}>
                <IconButton
                  name="xmark"
                  aria-label="Close help"
                  aui={{ scale: 'sm', profile: 'square-compact', color: 'secondary', paint: 'text', shape: 'soft', sx: { flex: 'none' } }}
                />
              </span>
            </View>
            <View
              data-ug-part="duration-notes"
              as="ul"
              aui={{ scale: 'sm', profile: 'no-padding', paint: 'text', sx: { display: 'flex', flexDirection: 'column' } }}
              style={{ listStyle: 'none', margin: 0, padding: 0 }}
            >
              {MOCK_DURATION_NOTES.map(([label, description]) => (
                <li key={label}>
                  <strong>"{label}"</strong> – {description}
                </li>
              ))}
            </View>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover>
    </View>
  );
}
```

### 2. Popover close icon (`pfd-help-close`)

Apps: PFD

In context source: PFD: `src/pfd/fields.tsx`

In context view: Shown.

#### In context structure additions

1. **Help text** — The "Select the base material of the member." text under the close button in the popup. Selector: `[data-ug-part="help-text"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-029/options/pfd-help-close/example.tsx`

```tsx
import { IconButton } from '../../../../../kit';

export default function Example() {
  return <IconButton name="xmark" aria-label="Close" aui={{ paint: 'text', profile: 'contained' }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-029/options/pfd-help-close/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, ContainedIcon, Popover, Type, View } from '../../../../../kit';

// PFD Help (src/pfd/fields.tsx): the circle-question trigger opens the popup above it (top, 4px offset); the popup is a View column (surface, solid, soft, elevation 4, gap 8, up to 384px).
// The close is a Button at profile "square" (not square-compact), alone in its own row at the end, above the help text. The optional image is left out.
export default function PfdHelpCloseScene({ host }: ContextProps) {
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
              <span data-ug-component-root style={{ display: 'contents' }}>
                <Button aria-label="Close" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft', sx: { alignSelf: 'end' } }}>
                  <ContainedIcon name="xmark" />
                </Button>
              </span>
              <Type data-ug-part="help-text" as="div" role="p3">Select the base material of the member.</Type>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
```

### 3. Help popover X (`pbs-help-close`)

Apps: PBS

In context source: PBS: `src/InputFields.tsx`

In context view: Shown.

#### In context structure additions

1. **Help text** — The "Select the base material of the member." text that fills the popup row beside the close X. Selector: `[data-ug-part="help-text"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-029/options/pbs-help-close/example.tsx`

```tsx
import { IconButton } from '../../../../../kit';

export default function Example() {
  return <IconButton name="xmark" aria-label="Close" aui={{ paint: 'text', profile: 'contained' }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-029/options/pbs-help-close/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, ContainedIcon, IconButton, Popover, Type, View } from '../../../../../kit';

// PBS HelpPopover (src/InputFields.tsx): the circle-question trigger (a Button at profile "square-compact") opens a 320px popup above it (top, 4px offset).
// The popup is a row: the help text fills it and the close X sits at its end, a scale "xs" IconButton with no color of its own.
export default function PbsHelpCloseScene({ host }: ContextProps) {
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
              <span data-ug-component-root style={{ display: 'contents' }}>
                <IconButton name="xmark" aria-label="Close" aui={{ scale: 'xs', paint: 'text', profile: 'square-compact', shape: 'soft' }} />
              </span>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
```

### 4. Field help close icon (`agpd-help-close`)

Apps: AGPD, RWS

In context source: AGPD: `src/agpd/inputs.tsx`; RWS: `src/rws/inputs.tsx`

In context view: Shown.

#### In context structure additions

1. **Close row** — The end-aligned row that holds only the close X above the help text. Selector: `[data-ug-part="close-row"]`.
2. **Help text** — The "Select the base material of the member." text under the close row. Selector: `[data-ug-part="help-text"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-029/options/agpd-help-close/example.tsx`

```tsx
import { IconButton } from '../../../../../kit';

export default function Example() {
  return <IconButton name="xmark" aria-label="Close" aui={{ paint: 'text', profile: 'contained' }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-029/options/agpd-help-close/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, ContainedIcon, IconButton, Popover, Type, View } from '../../../../../kit';

// AGPD Help (src/agpd/inputs.tsx; RWS writes the same popup in src/rws/inputs.tsx): the circle-question trigger (a Button at profile "square") opens a 320px popup above it (top, 4px offset).
// The popup is a View column; the close X is an IconButton at scale "xs" with no other props, in its own row at the end above the help text. The optional diagram is left out.
export default function AgpdHelpCloseScene({ host }: ContextProps) {
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
                <span data-ug-component-root style={{ display: 'contents' }}>
                  <IconButton name="xmark" aria-label="Close" aui={{ scale: 'xs' }} />
                </span>
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

### 5. Apps popover close (`fd-apps-close`)

Apps: FD

In context source: FD: `src/App.jsx`

In context view: Shown.

#### In context structure additions

1. **Top bar** — The Menubar with the grip Apps button that opens this popover. Selector: `[class~="aui-menubar"]`.
2. **Popover title** — The semi-bold "Explore More Applications" heading at the start of the title row, opposite the close button. Selector: `[data-ug-part="apps-title"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-029/options/fd-apps-close/example.tsx`

```tsx
import { IconButton } from '../../../../../kit';

export default function Example() {
  return <IconButton name="xmark" aria-label="Close" aui={{ paint: 'text', profile: 'contained' }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-029/options/fd-apps-close/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Icon, Menubar, Popover, Type, View } from '../../../../../kit';

// FD AppsPopover (src/App.jsx): the grip button of the top bar opens a 288px popup below it (bottom, end, 8px offset), a View section (scale xs, surface, solid, soft, elevation 4).
// The close X is a Button with an xmark Icon child (not an IconButton), color secondary, paint text, scale sm, in the title row at the end. The grid of app links is left out.
export default function FdAppsCloseScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', justifyContent: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Menubar aria-label="Top bar">
        <Popover open modal={false}>
          <span data-ug-component-root style={{ display: 'contents' }}>
            <Popover.Trigger render={<Menubar.IconButton name="grip" aria-label="Apps" />} />
          </span>
          <Popover.Portal container={host}>
            <Popover.Positioner side="bottom" align="end" sideOffset={8} className="ug-anchored">
              <Popover.Popup
                initialFocus={false}
                aria-label="Explore More Applications"
                style={{ inlineSize: 'min(calc(var(--p-px-16) * 18), 100%)' }}
                render={
                  <View
                    as="section"
                    aui={{ color: 'surface', paint: 'solid', profile: 'default', scale: 'xs', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '8' } }}
                  />
                }
              >
                <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', gap: '8' } }}>
                  <Type data-ug-part="apps-title" as="h2" role="l3" weight="semi-bold">Explore More Applications</Type>
                  <span data-ug-component-root style={{ display: 'contents' }}>
                    <Button aria-label="Close applications" aui={{ color: 'secondary', paint: 'text', scale: 'sm' }}>
                      <Icon name="xmark" />
                    </Button>
                  </span>
                </View>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover>
      </Menubar>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
