# Switch-002: Switch with label

Component family: **Switch**

UI type: **Switch**

Source: `src/usecase-gallery/usecases/switch/Switch-002/usecase.ts`

## What it is

A switch with its own text beside it that turns one option on or off.

## When to choose it

Use it for one setting that applies at once and has a name of its own, with Switch.Label as the text so a click on the text toggles it. For a row of a list that names the switch, leave the label out (Switch-001); for a label at the start of a row and the switch at the far end, see Switch-001.

## Where it belongs

HCS and HS: Group by model in the Configure columns popover. ADM: the draft switches of the Base plate editor. PBS and RWS: Show Optimized Models in the table toolbar. ACE: the dialog option Send me a copy (feedback form), and Download in Save as template, which writes the same switch.

## Usage guidance

Compound Switch with a Switch.Label child; the gallery scene measured in headless Chromium has a 16px, 400 weight label 8px from the 44 by 22px track. The apps were not run; their props and states are read from the app source, and the groups follow the states each app writes. HCS, HS: states selected { color "primary", paint "solid" }; the scene measures on as rgb(255,83,8) with a white thumb at x=26, off as rgb(241,245,249) with no border and an rgb(18,18,18) thumb at x=4. ADM (TOGGLE_STATE_AUI): the same on, and off as rgb(255,255,255) with a 1px rgb(148,163,184) border and the thumb at x=5. PBS, RWS, ACE: no states, so the scene measures on and off both as rgb(241,245,249) and only the thumb moves (x=26 on, 4 off); PBS and RWS write scale "sm", which the scene measures at the same size as the default. The scenes show the switch enabled and on; RWS disables it when no optimized models exist. PBS and RWS share a toolbar scene; ACE has a separate feedback dialog scene. The scenes leave out the help trigger and other fields and controls of each container.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Dialog`, `IconButton`, `Popover`, `Switch`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `primary`, `raised`, `secondary`, `surface`
- `paint`: `solid`, `text`, `tonal`
- `profile`: `contained`, `default`, `no-padding`
- `scale`: `sm`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Switch** — The on/off control, on by default, with a solid primary track when selected; each app places it in a popover, a table toolbar or a dialog. Selector: `[class~="aui-switch"]`.
2. **Thumb** — The thumb that slides to the end of the track when Group by model is on. Selector: `[class~="aui-switch-thumb"]`.
3. **Label** — The option text "Group by model" beside the switch; the scenes swap it for Show Optimized Models, Send me a copy or the ADM draft switches. Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.

## Apps

- HCS (`hcs`)
- HS (`hs`)
- ADM (`adm`)
- PBS (`pbs`)
- RWS (`rws`)
- ACE (`ace`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Labelled switch (`hcs-labelled`)

Apps: HCS, HS

In context source: HCS: `src/components/ColumnVisibility.tsx`; HS: `src/hs/ColumnVisibility.tsx`

In context view: Shown.

#### In context structure additions

1. **Configure columns trigger** — The table-columns IconButton, labelled Configure columns, that opens the popover under it. Part marker: `data-ug-part="columns-trigger"`.
2. **Configure columns popover** — The elevated popover, 320px wide, anchored under the trigger that holds the column list. Part marker: `data-ug-part="columns-popover"`.

#### Component UI source — `src/usecase-gallery/usecases/switch/Switch-002/example.tsx`

```tsx
import { Switch } from '../../../kit';

export default function Example() {
  return (
    <Switch defaultSelected aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}>
      <Switch.Label>Group by model</Switch.Label>
    </Switch>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/switch/Switch-002/options/hcs-labelled/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { IconButton, Popover, View } from '../../../../../kit';

export default function HcsLabelledScene({ children, host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', justifyContent: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open>
        <Popover.Trigger render={<IconButton data-ug-part="columns-trigger" name="table-columns" aria-label="Configure columns" aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'contained', shape: 'soft' }} />} />
        <Popover.Portal container={host}>
          <Popover.Positioner side="bottom" align="end" style={{ paddingBlock: 'var(--p-px-4)' }} className="ug-anchored">
            <Popover.Popup data-ug-part="columns-popover" initialFocus={false} aria-label="Configure columns" render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '8', width: '320' } }} />}>
              {children}
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
```

### 2. Labelled switch — UI variant 2 (`adm-labelled`)

Apps: ADM

In context source: ADM: `src/features/viewer/components/EditModals/BasePlateModal.tsx`

In context view: Shown.

#### In context structure additions

1. **Base plate dialog** — The Dialog popup, titled Base plate, that hosts the switch. Part marker: `data-ug-part="dialog"`.
2. **Dialog title** — The raised title bar with the Base plate heading and a Close button at the end. Part marker: `data-ug-part="dialog-title"`.
3. **Dialog body** — The body area that holds the Include base plate switch in a column. Part marker: `data-ug-part="dialog-body"`.

#### Component UI source — `src/usecase-gallery/usecases/switch/Switch-002/options/adm-labelled/example.tsx`

```tsx
import { Switch } from '../../../../../kit';

export default function Example() {
  return (
    <Switch defaultSelected aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}>
      <Switch.Label>Group by model</Switch.Label>
    </Switch>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/switch/Switch-002/options/adm-labelled/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, Switch, View } from '../../../../../kit';

export default function AdmLabelledScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup data-ug-part="dialog" initialFocus={false}>
            <Dialog.Title data-ug-part="dialog-title" aui={{ color: 'raised' }}>Base plate<Dialog.Spacer /><Dialog.Close aria-label="Close" /></Dialog.Title>
            <Dialog.Body data-ug-part="dialog-body">
              <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '12' } }}>
                <Switch defaultSelected aui={{ states: { unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } }, selected: { paint: 'solid', color: 'primary' } } }}>
                  <Switch.Label>Include base plate</Switch.Label>
                </Switch>
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 3. Labelled switch — UI variant 3 (`pbs-labelled`)

Apps: PBS, RWS

In context source: PBS: `src/ResultsSection.tsx`; RWS: `src/rws/output.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/switch/Switch-002/options/pbs-labelled/example.tsx`

```tsx
import { Switch } from '../../../../../kit';

export default function Example() {
  return (
    <Switch defaultSelected aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}>
      <Switch.Label>Group by model</Switch.Label>
    </Switch>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/switch/Switch-002/options/pbs-labelled/scene.tsx`

```tsx
import { Switch, View } from '../../../../../kit';

// PBS and RWS Show Optimized Models (src/ResultsSection.tsx, src/rws/output.tsx): a labelled Switch with no states, so the default look. PBS and RWS write aui scale "sm" and sit in the table toolbar row (flex, centred, gap 4) with a help trigger. The scene draws the toolbar row and leaves out the help trigger, the search field and the row count.
export default function PbsLabelledScene() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '4' } }}>
      <Switch defaultSelected aui={{ scale: 'sm' }}>
        <Switch.Label>Show Optimized Models</Switch.Label>
      </Switch>
    </View>
  );
}
```

### 4. Labelled switch — UI variant 4 (`ace-labelled`)

Apps: ACE

In context source: ACE: `src/features/top-navigation/ui/FeedbackDialog.tsx`

In context view: Shown.

#### In context structure additions

1. **Feedback dialog** — The Dialog popup, titled Feedback Form, that hosts the switch. Part marker: `data-ug-part="dialog"`.
2. **Dialog title** — The raised title bar with the Feedback Form heading and a Cancel close button at the end. Part marker: `data-ug-part="dialog-title"`.
3. **Dialog body** — The body area that holds the Send me a copy switch. Part marker: `data-ug-part="dialog-body"`.
4. **Dialog actions** — The footer with a Cancel button and a solid secondary Send button. Part marker: `data-ug-part="dialog-actions"`.

#### Component UI source — `src/usecase-gallery/usecases/switch/Switch-002/options/ace-labelled/example.tsx`

```tsx
import { Switch } from '../../../../../kit';

export default function Example() {
  return (
    <Switch defaultSelected aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}>
      <Switch.Label>Group by model</Switch.Label>
    </Switch>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/switch/Switch-002/options/ace-labelled/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, Switch } from '../../../../../kit';

export default function AceLabelledScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup data-ug-part="dialog" initialFocus={false}>
            <Dialog.Title data-ug-part="dialog-title" aui={{ color: 'raised' }}>Feedback Form<Dialog.Spacer /><Dialog.Close aria-label="Cancel" /></Dialog.Title>
            <Dialog.Body data-ug-part="dialog-body">
              <Switch defaultSelected><Switch.Label>Send me a copy</Switch.Label></Switch>
            </Dialog.Body>
            <Dialog.Actions data-ug-part="dialog-actions">
              <Dialog.Button dismiss={false}>Cancel</Dialog.Button>
              <Dialog.Button dismiss={false} aui={{ color: 'secondary', paint: 'solid' }}>Send</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
